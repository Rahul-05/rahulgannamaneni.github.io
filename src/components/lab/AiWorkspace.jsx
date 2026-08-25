import { useEffect, useRef, useState } from 'react';
import BrowserFrame from './frames/BrowserFrame.jsx';
import './AiWorkspace.css';

// One assistant that answers in whatever shape the answer wants: prose when
// prose is enough, a chart when the question is really about a comparison,
// and a document off to the side when the output is too long to live in a
// message list. Three surfaces, one conversation, because splitting them into
// three products is how you end up copying between them.
//
// Three things are load-bearing:
//
//  · The wait is staged. Between enter and the first token there are a couple
//    of seconds of nothing, and what fills them decides whether this feels
//    like it is working or hanging -- so it says what it is reading, then
//    what it looked up, then streams.
//  · Choosing the encoding is part of answering. A ranking question gets
//    sorted bars with the answer coloured out of its own context; a question
//    about composition gets stacked bars. Same chart for both would be a
//    chart library, not an answer.
//  · Long output leaves the thread. A draft in a message list cannot be
//    edited, cannot be seen whole, and a revision means re-reading from the
//    top to find what moved.

const DOC = [
  {
    id: 'p1',
    text: 'We are changing how activation works. From next week new accounts reach their workspace before verifying an email address, and verification is requested from inside the product rather than in front of it.',
    short:
      'From next week, new accounts reach their workspace first and verify from inside the product.',
  },
  {
    id: 'p2',
    text: 'The reason is straightforward. Since the March onboarding change, sixty-one percent of everyone who fails to activate is failing on the verification step alone, and support volume for missing verification emails has more than tripled in the same period.',
    short:
      'Since March, 61% of activation failures are on the verification step alone, and related tickets have tripled.',
  },
  {
    id: 'p3',
    text: 'Invites and billing will continue to require a verified address, so this does not open a new path for abuse. Everything else about the onboarding rewrite stays as it is.',
    short: 'Invites and billing still require verification, so no new abuse path opens.',
  },
];

const TURNS = {
  root: {
    q: 'Why did our activation rate drop in March?',
    tool: ['Searched 3 internal sources', 'analytics · changelog · support'],
    a: `Activation fell from 42% to 31% between 4 and 11 March, and it tracks one change almost exactly.

The onboarding rewrite shipped on the 4th [1] moved email verification ahead of the first workspace screen. Support saw a 3.4× rise in "never got the email" tickets that week [2], and 61% of the drop-off is now on that single step [3].

Worth saying the rewrite improved everything after that point, day-7 retention is up 8 points for people who make it through. The problem is a gate, not the redesign.`,
    cites: ['changelog #4821', 'support digest, wk 10', 'funnel breakdown'],
    next: ['Chart it week by week', 'Which month lost the most users?'],
  },
  'Chart it week by week': {
    tool: ['Queried the warehouse', '6 weeks · 4 steps'],
    a: `Sign-up is flat all six weeks. Verification is where it breaks, 94% down to 71% in week 10, and it never recovers.`,
    chart: {
      kind: 'stack',
      why: 'Composition over time → stacked bars',
      x: ['w8', 'w9', 'w10', 'w11', 'w12', 'w13'],
      series: [
        {
          label: 'Verified',
          tint: 'linear-gradient(180deg,#8ab4ff,#4d7cff)',
          v: [94, 93, 71, 70, 69, 71],
        },
        {
          label: 'Dropped here',
          tint: 'linear-gradient(180deg,#ff9d6e,#e0562d)',
          v: [6, 7, 29, 30, 31, 29],
        },
      ],
    },
    next: ['Which month lost the most users?', 'Draft the internal note'],
  },
  'Which month lost the most users?': {
    tool: ['Aggregated churn', '6 months'],
    a: `March, and not narrowly, 2,140 accounts against a six-month average of 810.`,
    chart: {
      kind: 'rank',
      why: 'Ranking → sorted bars, the answer coloured out of its own context',
      bars: [
        ['Mar', 2140, true],
        ['Feb', 980, false],
        ['Jun', 870, false],
        ['Apr', 740, false],
        ['Jan', 620, false],
        ['May', 510, false],
      ],
    },
    next: ['Draft the internal note'],
  },
  'Draft the internal note': {
    tool: ['Opened a canvas', '3 paragraphs'],
    a: `Put it on the right, what changes, why, and the abuse question, since that is the first thing anyone will ask.`,
    canvas: true,
    next: [],
  },
};

export default function AiWorkspace() {
  // The conversation is a list of turn keys, not a list of rendered messages.
  // Appending the previous answer at click time meant reading it out of a
  // closure, which duplicated entries the moment a render landed in between.
  // Derived state cannot get out of step with itself.
  const [history, setHistory] = useState(['root']);
  const key = history[history.length - 1];
  const [phase, setPhase] = useState('thinking');
  const [shown, setShown] = useState(0);
  const [written, setWritten] = useState(0);
  const [sel, setSel] = useState(null);
  const [edited, setEdited] = useState({});
  const [busy, setBusy] = useState(false);
  const timers = useRef([]);
  const scroller = useRef(null);

  const turn = TURNS[key];
  const canvasOpen = Boolean(turn.canvas);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => {
    clear();
    setPhase('thinking');
    setShown(0);
    timers.current.push(setTimeout(() => setPhase('tool'), 780));
    timers.current.push(setTimeout(() => setPhase('streaming'), 1520));
    if (TURNS[key].canvas) {
      setWritten(0);
      DOC.forEach((_, i) =>
        timers.current.push(setTimeout(() => setWritten(i + 1), 2100 + i * 620)),
      );
    }
    return clear;
  }, [key]);

  // Reveal by elapsed time rather than one word per tick. Browsers clamp
  // background-tab intervals to about a second, and a counter that increments
  // per tick would crawl instead of streaming -- the same reason a progress
  // bar driven by tick count desyncs the moment the tab loses focus.
  useEffect(() => {
    if (phase !== 'streaming') return undefined;
    const total = turn.a.split(' ').length;
    const started = performance.now();
    const id = setInterval(() => {
      const n = Math.floor((performance.now() - started) / 24);
      if (n >= total) {
        clearInterval(id);
        setShown(total);
        setPhase('done');
      } else setShown(n);
    }, 24);
    return () => clearInterval(id);
  }, [phase, turn]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, phase, history]);

  const ask = (q) => setHistory((h) => (h[h.length - 1] === q ? h : [...h, q]));

  const shorten = () => {
    setBusy(true);
    setTimeout(() => {
      setEdited((e) => ({ ...e, [sel]: true }));
      setBusy(false);
      setSel(null);
    }, 620);
  };

  return (
    <BrowserFrame url="workspace.ai/t/activation" tab="Activation drop" tint="#0d0f12">
      <div className={`aiw ${canvasOpen ? 'is-split' : ''}`}>
        <span className="aiw-glow" aria-hidden="true" />

        <aside className="aiw-rail">
          <span className="aiw-new">
            <i aria-hidden="true">+</i> New
          </span>
          {['Activation drop', 'Pricing page copy', 'Q2 planning', 'Churn cohorts'].map((t, i) => (
            <span key={t} className={`aiw-thread ${i === 0 ? 'is-on' : ''}`}>
              {t}
            </span>
          ))}
        </aside>

        <div className="aiw-main">
          <div className="aiw-scroll" ref={scroller}>
            {/* every turn but the last is settled; the last one is live */}
            {history.slice(0, -1).map((k, i) => {
              const t = TURNS[k];
              return (
                <div key={k}>
                  <p className="aiw-user">{i === 0 ? TURNS.root.q : k}</p>
                  <Answer text={t.a} cites={t.cites} past />
                  {t.chart && <Chart c={t.chart} />}
                </div>
              );
            })}

            <p className="aiw-user">{history.length === 1 ? TURNS.root.q : key}</p>

            {phase === 'thinking' && (
              <p className="aiw-wait">
                <span className="aiw-orb" />
                Reading the question
              </p>
            )}

            {phase !== 'thinking' && (
              <div className="aiw-tool">
                <span className="aiw-tool-dot" />
                <strong>{turn.tool[0]}</strong>
                <em>{turn.tool[1]}</em>
              </div>
            )}

            {(phase === 'streaming' || phase === 'done') && (
              <>
                <Answer
                  text={turn.a.split(' ').slice(0, shown).join(' ')}
                  cites={turn.cites}
                  streaming={phase === 'streaming'}
                />
                {phase === 'done' && turn.chart && <Chart c={turn.chart} />}
              </>
            )}
          </div>

          {phase === 'done' && turn.next.length > 0 && (
            <div className="aiw-next">
              {turn.next.map((n) => (
                <button key={n} onClick={() => ask(n)}>
                  {n}
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
          )}

          <div className="aiw-composer">
            <span>Ask a follow-up…</span>
            <kbd>↵</kbd>
          </div>
        </div>

        {/* the third surface: long output moves out of the thread */}
        <div className="aiw-canvas" aria-hidden={!canvasOpen}>
          <header>
            <strong>Activation change, internal note</strong>
            <span>{written < DOC.length ? 'Writing…' : 'Draft'}</span>
          </header>

          <article>
            {DOC.map((p, i) => (
              <p
                key={p.id}
                className={`aiw-para ${i < written ? 'is-in' : ''} ${sel === p.id ? 'is-sel' : ''} ${
                  edited[p.id] ? 'is-edited' : ''
                }`}
                onClick={() => written >= DOC.length && setSel(sel === p.id ? null : p.id)}
              >
                {edited[p.id] ? p.short : p.text}
              </p>
            ))}
          </article>

          {sel && (
            <div className="aiw-inline">
              <span>Paragraph {DOC.findIndex((d) => d.id === sel) + 1}</span>
              <button onClick={shorten} disabled={busy}>
                {busy ? 'Rewriting…' : 'Make it shorter'}
              </button>
            </div>
          )}
        </div>
      </div>
    </BrowserFrame>
  );
}

function Answer({ text, cites = [], streaming, past }) {
  return (
    <div className={`aiw-answer ${past ? 'is-past' : ''}`}>
      {text.split(/(\[\d\])/g).map((p, i) => {
        const m = p.match(/^\[(\d)\]$/);
        if (!m) return <span key={i}>{p}</span>;
        return (
          <span className="aiw-cite" key={i} title={cites[+m[1] - 1]}>
            {m[1]}
          </span>
        );
      })}
      {streaming && <span className="aiw-caret" />}
    </div>
  );
}

function Chart({ c }) {
  return (
    <figure className="aiw-chart">
      <figcaption>{c.why}</figcaption>

      {c.kind === 'stack' && (
        <div className="aiw-stack">
          {c.x.map((label, i) => (
            <div className="aiw-col" key={label}>
              <div className="aiw-col-bars">
                {c.series.map((s, si) => (
                  <span
                    key={s.label}
                    style={{
                      height: `${s.v[i]}%`,
                      background: s.tint,
                      animationDelay: `${i * 60 + si * 40}ms`,
                    }}
                  />
                ))}
              </div>
              <em>{label}</em>
            </div>
          ))}
        </div>
      )}

      {c.kind === 'rank' &&
        c.bars.map(([label, v, hot], i) => {
          const max = Math.max(...c.bars.map((b) => b[1]));
          return (
            <div className="aiw-row" key={label}>
              <em>{label}</em>
              <span className="aiw-track">
                <span
                  className={`aiw-fill ${hot ? 'is-hot' : ''}`}
                  style={{ width: `${(v / max) * 100}%`, animationDelay: `${i * 55}ms` }}
                />
              </span>
              <strong>{v.toLocaleString()}</strong>
            </div>
          );
        })}
    </figure>
  );
}
