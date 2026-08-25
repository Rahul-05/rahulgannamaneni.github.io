import { useEffect, useRef, useState } from 'react';
import PhoneFrame from './frames/PhoneFrame.jsx';
import ClaudeMark from './ClaudeMark.jsx';
import './ClaudeMark.css';
import './ClaudeActivity.css';

// A long-running agent reported as a Live Activity, on a lock screen built to
// iOS proportions rather than approximated.
//
// The island is the right home for this and almost nobody uses it that way.
// An agent that runs for four minutes has exactly the shape Apple designed
// Live Activities for: something you started, that is still going, that you
// want to glance at without opening anything. A notification per step would
// be unusable; a spinner inside an app you have to open is worse.
//
// The design constraint that shapes everything: the compact island is about
// 110 points wide. That is one number and one word. So the entire run has to
// compress to "which step, how far", and everything else has to earn its way
// into the expanded state.
//
// Three runs, because a status shape that only works for one kind of work is
// not a shape. A routine that mostly succeeds, a code task that finds real
// failures, and research whose steps are all different lengths.

const CLAY = '#D97757';

const RUNS = [
  {
    id: 'routine',
    name: 'Morning routine',
    sub: 'Scheduled · 7:00',
    steps: [
      ['Read 14 unread threads', 'ok'],
      ['Drafted 3 replies', 'ok'],
      ['Moved 6 to follow-up', 'ok'],
      ['Flagged 1 for you', 'warn'],
      ['Built the digest', 'ok'],
    ],
    done: 'Digest ready · 1 needs you',
  },
  {
    id: 'code',
    name: 'Refactor auth',
    sub: 'rao/portfolio · main',
    steps: [
      ['Read 41 files', 'ok'],
      ['Rewrote session handling', 'ok'],
      ['Ran the suite · 4 failed', 'warn'],
      ['Fixed all 4', 'ok'],
      ['Opened PR #1284', 'ok'],
    ],
    done: 'PR open · 214 lines changed',
  },
  {
    id: 'research',
    name: 'Competitor pricing',
    sub: '3 sources',
    steps: [
      ['Found 3 pricing pages', 'ok'],
      ['Extracted 11 plans', 'ok'],
      ['Hit a paywall on one', 'warn'],
      ['Fell back to their docs', 'ok'],
      ['Normalised to our tiers', 'ok'],
    ],
    done: 'We are the outlier on SSO',
  },
];

const STEP_MS = 1600;

export default function ClaudeActivity() {
  const [runIdx, setRunIdx] = useState(0);
  const [step, setStep] = useState(0);
  // Starts compact. A Live Activity that is already open has skipped the
  // only interesting thing it does; this one arrives as a pill and opens
  // itself once, which is also what iOS does when an activity first updates.
  const [big, setBig] = useState(false);
  const timers = useRef([]);

  const run = RUNS[runIdx];
  const total = run.steps.length;
  const finished = step >= total;
  const pct = Math.min(1, step / total);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    setStep(0);
    setBig(false);
    timers.current = run.steps.map((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * STEP_MS));
    timers.current.push(setTimeout(() => setBig(true), 1250));
    return () => timers.current.forEach(clearTimeout);
  }, [runIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  const log = run.steps.slice(Math.max(0, step - 2), step);

  return (
    <PhoneFrame screenTint="#000" island={false}>
      <div className={`cla ${big ? 'is-open' : ''}`}>
        {/* A wallpaper with a horizon in it, not a gradient. Lock screen type
            is judged against a photograph -- light sky above, dark land below
            -- and a flat field makes the clock look pasted on. */}
        <svg
          className="cla-paper"
          viewBox="0 0 390 844"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cla-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#171230" />
              <stop offset="0.33" stopColor="#463155" />
              <stop offset="0.55" stopColor="#a35b53" />
              <stop offset="0.67" stopColor="#e0915c" />
              <stop offset="0.79" stopColor="#bd6746" />
            </linearGradient>
            <linearGradient id="cla-face" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0" stopColor="#dd9066" />
              <stop offset="0.5" stopColor="#8a4f45" />
              <stop offset="1" stopColor="#3a2233" />
            </linearGradient>
            <linearGradient id="cla-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#704c5f" />
              <stop offset="1" stopColor="#3b2a3e" />
            </linearGradient>
          </defs>

          <rect width="390" height="844" fill="url(#cla-sky)" />
          <circle cx="286" cy="410" r="120" fill="#eda672" opacity="0.2" />

          <path
            d="M0 596 L64 548 L128 578 L196 520 L262 566 L330 528 L390 560 V844 H0 Z"
            fill="url(#cla-far)"
          />

          {/* the dome, lit on one face and dark on the other */}
          <path
            d="M96 648 C104 524 168 452 232 452 C296 452 338 532 346 648 Z"
            fill="url(#cla-face)"
          />
          <path d="M232 452 C296 452 338 532 346 648 L264 648 Z" fill="#2c1d2d" opacity="0.5" />

          <path
            d="M0 704 L26 666 L44 702 L70 658 L96 702 L124 670 L150 706 L182 662 L212 704 L244 666 L272 706 L304 664 L332 704 L362 670 L390 708 V844 H0 Z"
            fill="#150e1b"
          />
          <rect y="744" width="390" height="100" fill="#0b070f" />
        </svg>
        <span className="cla-vignette" aria-hidden="true" />

        {/* ── lock screen ── */}
        <div className="cla-lock" aria-hidden="true">
          <p className="cla-date">Tuesday 24 September</p>
          <p className="cla-time">9:41</p>
        </div>

        {/* ── the Live Activity ── */}
        <button
          className={`cla-island ${big ? 'is-big' : ''} ${finished ? 'is-done' : ''}`}
          onClick={() => setBig((v) => !v)}
          aria-label={big ? 'Collapse activity' : 'Expand activity'}
        >
          <span className="cla-mark">
            <ClaudeMark size={big ? 26 : 19} busy={!finished} tint={CLAY} />
          </span>

          {/* compact: one number and one word, which is all that fits */}
          <span className="cla-compact">{finished ? 'Done' : `${step}/${total}`}</span>

          <span className="cla-title">{run.name}</span>
          <span className="cla-sub">
            {finished ? run.done : `Step ${Math.min(step + 1, total)} of ${total} · ${run.sub}`}
          </span>

          <span className="cla-track">
            <span className="cla-fill" style={{ transform: `scaleX(${pct})` }} />
          </span>

          {/* the log pushes: new lines arrive from below and the older ones
              recede rather than being overwritten, so the run reads as a
              stack of things that happened. Two kept -- a scrolling list
              inside an island would be a joke. */}
          <span className="cla-log">
            {log.map(([t, kind], i) => (
              <span key={t} className={`cla-line is-${kind}`} data-age={log.length - 1 - i}>
                <i className="cla-dot" />
                {t}
              </span>
            ))}

            {!finished ? (
              <span className="cla-line is-live">
                <i className="cla-dot">
                  <span className="cla-spin" />
                </i>
                {run.steps[Math.min(step, total - 1)][0]}
              </span>
            ) : (
              <span className="cla-line is-final">
                <i className="cla-dot" />
                {run.done}
              </span>
            )}
          </span>
        </button>

        {/* ── notification-style run picker, in the iOS vibrancy style ── */}
        <div className="cla-picker">
          {RUNS.map((r, i) => (
            <button key={r.id} className={i === runIdx ? 'is-on' : ''} onClick={() => setRunIdx(i)}>
              <ClaudeMark size={17} tint={i === runIdx ? CLAY : 'rgba(255,255,255,.5)'} />
              <span>
                <strong>{r.name}</strong>
                <em>{r.sub}</em>
              </span>
              <b>{i === runIdx ? 'now' : 'tap'}</b>
            </button>
          ))}
        </div>

        {/* the two lock-screen controls, because their absence is noticeable */}
        <div className="cla-quick" aria-hidden="true">
          <span>
            <svg viewBox="0 0 24 24">
              <path d="M9 3h6v3.6l-1.4 1.4v3.4l3.4 3.4a2 2 0 0 1 .6 1.4V21H6.4v-4.8a2 2 0 0 1 .6-1.4l3.4-3.4V8L9 6.6Z" />
            </svg>
          </span>
          <span>
            <svg viewBox="0 0 24 24">
              <path d="M4 8h3.2l1.6-2.4h6.4L16.8 8H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
              <circle cx="12" cy="13.6" r="3.6" className="cla-lens" />
            </svg>
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}
