import { useEffect, useRef, useState } from 'react';
import BrowserFrame from './frames/BrowserFrame.jsx';
import './TurnItIn.css';

// Turning in an assignment, where the whole window plays rather than a
// button changing colour.
//
// It is worth being clear about why this is not just decoration. Handing work
// in is a moment with real weight -- it is the end of days of effort and it
// is irreversible-feeling even when it is not. A state change from "Turn in"
// to "Turned in" is technically complete information and emotionally nothing.
// The celebration is the acknowledgement, and it is sized to the moment: it
// plays once, it takes under two seconds, and it leaves a permanent receipt
// with an undo behind it.

const FILES = [
  ['Final essay.pdf', '2.4 MB'],
  ['Sources.docx', '340 KB'],
  ['Notes and outline.md', '18 KB'],
];

// deterministic streamers -- a random spray looks different every reload and
// makes the piece impossible to tune
const RIBBONS = Array.from({ length: 26 }, (_, i) => {
  const t = i / 25;
  return {
    x: 6 + t * 88 + Math.sin(i * 2.7) * 5,
    delay: (i % 7) * 0.045,
    rise: 190 + ((i * 53) % 150),
    drift: Math.sin(i * 1.9) * 90,
    spin: ((i * 71) % 300) - 150,
    tint: ['#0059BC', '#F4BB5C', '#E05D2D', '#1f8a5c', '#6a4bd0'][i % 5],
    tall: 10 + ((i * 31) % 16),
  };
});

export default function TurnItIn() {
  const [state, setState] = useState('ready'); // ready | playing | done
  const timer = useRef(null);

  const submit = () => {
    if (state !== 'ready') return;
    setState('playing');
    timer.current = setTimeout(() => setState('done'), 1750);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <BrowserFrame url="class.app/assignments/essay-3" tab="Essay 3, Turn in">
      <div className={`turn turn--${state}`}>
        <div className="turn-top">
          <span className="turn-crumb">Literature 204 · Essay 3</span>
          <span className={`turn-pill ${state === 'done' ? 'is-done' : ''}`}>
            {state === 'done' ? 'Turned in' : 'Due today, 11:59 PM'}
          </span>
        </div>

        <div className="turn-card">
          <h4>The unreliable narrator in post-war fiction</h4>
          <p className="turn-meta">Draft saved 4 minutes ago · 2,140 words</p>

          <ul className="turn-files">
            {FILES.map(([n, s]) => (
              <li key={n}>
                <span className="turn-doc" aria-hidden="true" />
                <span className="turn-name">{n}</span>
                <span className="turn-size">{s}</span>
              </li>
            ))}
          </ul>

          <div className="turn-actions">
            {state === 'done' ? (
              <>
                <span className="turn-stamp">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  Turned in at 4:12 PM
                </span>
                <button className="turn-undo" onClick={() => setState('ready')}>
                  Undo turn in
                </button>
              </>
            ) : (
              <button className="turn-go" onClick={submit} disabled={state === 'playing'}>
                {state === 'playing' ? 'Turning in…' : 'Turn in'}
              </button>
            )}
          </div>
        </div>

        {/* the celebration layer: streamers from both bottom corners, a wash
            across the window, and the card lifting off the page */}
        {state !== 'ready' && (
          <div className="turn-party" aria-hidden="true">
            <span className="turn-wash" />
            {RIBBONS.map((r, i) => (
              <span
                key={i}
                className="turn-ribbon"
                style={{
                  left: `${r.x}%`,
                  height: r.tall,
                  background: r.tint,
                  animationDelay: `${r.delay}s`,
                  '--rise': `${-r.rise}px`,
                  '--drift': `${r.drift}px`,
                  '--spin': `${r.spin}deg`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}
