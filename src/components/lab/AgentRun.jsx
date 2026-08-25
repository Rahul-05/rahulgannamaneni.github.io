import { useEffect, useRef, useState } from 'react';
import BrowserFrame from './frames/BrowserFrame.jsx';
import './AgentRun.css';

// An agent working on a task for a minute, which is the interaction problem
// nobody had before 2024: what does a product look like while it is thinking
// for longer than a person will sit still?
//
// The answer here is that it shows its plan and then edits it. Steps arrive
// as they are decided rather than being declared up front, each one names the
// thing it actually touched, and one of them fails and is retried in public.
// That last part is deliberate -- an agent that only ever shows success is
// asking to be trusted, whereas one that shows a dead end and recovers is
// giving you the evidence to decide for yourself.
//
// Every step stays expandable after the run so the answer can be audited
// backwards, which is the only reason to watch a progress list at all.

const STEPS = [
  {
    t: 'Read the brief',
    d: 'Three competitors, pricing pages only, and the plan names have to match ours.',
    ms: 700,
  },
  {
    t: 'Found 3 pricing pages',
    d: 'linear.app/pricing · height.app/pricing · shortcut.com/pricing',
    ms: 1500,
  },
  {
    t: 'Extracted 11 plans',
    d: 'Per-seat monthly and annual, seat minimums, and what each one gates.',
    ms: 1400,
  },
  {
    t: 'Hit a paywall on one',
    d: 'Enterprise tier is quote-only. Fell back to their public docs for the feature list.',
    ms: 1200,
    warn: true,
  },
  {
    t: 'Normalised to our plan names',
    d: 'Mapped 11 tiers onto Free / Team / Business. Two did not map and are listed separately.',
    ms: 1300,
  },
];

const ANSWER = `All three price the middle tier between $10 and $14 per seat monthly, and all three put SSO in it rather than in enterprise, we are the outlier at $19 with SSO gated above.

Two of them have no seat minimum on the middle tier. Ours starts at five. That is the difference most likely to be losing small teams at the comparison stage.`;

export default function AgentRun() {
  const [at, setAt] = useState(-1);
  const [open, setOpen] = useState(null);
  const [done, setDone] = useState(false);
  const timers = useRef([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const run = () => {
    clear();
    setAt(0);
    setDone(false);
    setOpen(null);
    let t = 0;
    STEPS.forEach((s, i) => {
      t += s.ms;
      timers.current.push(setTimeout(() => setAt(i + 1), t));
    });
    timers.current.push(setTimeout(() => setDone(true), t + 500));
  };

  useEffect(() => {
    run();
    return clear;
  }, []);

  const running = at >= 0 && !done;

  return (
    <BrowserFrame url="agent.app/run/8f21" tab="Competitor pricing">
      <div className="agr">
        {/* the gradient is the running state -- it stops when the work does */}
        <div className={`agr-task ${running ? 'is-running' : ''}`}>
          <div className="agr-task-in">
            <span className="agr-spark" aria-hidden="true" />
            <p>
              Compare our pricing to the three closest competitors and tell me where we are the
              outlier.
            </p>
            {done && (
              <button className="agr-redo" onClick={run}>
                Run again
              </button>
            )}
          </div>
        </div>

        <ol className="agr-steps">
          {STEPS.map((s, i) => {
            const state = i < at ? 'done' : i === at ? 'live' : 'wait';
            if (state === 'wait') return null;
            return (
              <li key={s.t} className={`agr-step is-${state} ${s.warn ? 'is-warn' : ''}`}>
                <span className="agr-mark">
                  {state === 'live' ? (
                    <span className="agr-spin" />
                  ) : s.warn ? (
                    '!'
                  ) : (
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3.5 8.5l3 3 6-6.5" />
                    </svg>
                  )}
                </span>

                <button
                  className="agr-head"
                  onClick={() => setOpen(open === i ? null : i)}
                  disabled={state === 'live'}
                >
                  {s.t}
                  {state !== 'live' && <em aria-hidden="true">{open === i ? '−' : '+'}</em>}
                </button>

                {(open === i || state === 'live') && <p className="agr-detail">{s.d}</p>}
              </li>
            );
          })}
        </ol>

        {done && (
          <div className="agr-answer">
            <span className="agr-answer-k">Answer</span>
            <p>{ANSWER}</p>
            <span className="agr-foot">5 steps · 3 sources · 1 fallback</span>
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}
