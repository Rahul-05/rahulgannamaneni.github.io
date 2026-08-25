import { useCallback, useRef, useState } from 'react';
import PhoneFrame from './frames/PhoneFrame.jsx';
import { scaleOf } from './frames/scale.js';
import capture from './capture.js';
import './ScrollStack.css';

// Cards that scroll up and do not leave. As each one reaches the top of the
// viewport it stops, compresses to a header height, and the next card slides
// underneath it -- so scrolling builds a stack of everything you have passed
// instead of throwing it off screen.
//
// The interesting part is that a card is never "pinned" by position: sticky.
// Every card computes its own state from one scroll value, which means the
// compression, the header stacking and the depth scaling of the cards still
// below all stay in step with each other and with a rubber-banded overscroll.

const CARDS = [
  {
    id: 'inbox',
    label: 'Inbox',
    tint: '#0059BC',
    ink: '#fff',
    n: '12',
    rows: ['Design review moved to Thursday', 'Tokens PR is ready for you', 'Weekly digest'],
  },
  {
    id: 'today',
    label: 'Today',
    tint: '#F4BB5C',
    ink: '#5c3200',
    n: '3',
    rows: ['Ship the case study page', 'Call with the studio at 4', 'Rework the deck ending'],
  },
  {
    id: 'reading',
    label: 'Reading',
    tint: '#E05D2D',
    ink: '#fff',
    n: '8',
    rows: ['On the design of everyday things', 'Interface as material', 'Notes on motion'],
  },
  {
    id: 'archive',
    label: 'Archive',
    tint: '#1f8a5c',
    ink: '#fff',
    n: '41',
    rows: ['Q2 retrospective', 'Old brand explorations', 'Shipped: onboarding v2'],
  },
  {
    id: 'later',
    label: 'Later',
    tint: '#6a4bd0',
    ink: '#fff',
    n: '5',
    rows: ['Learn the shader pipeline', 'Rebuild the portfolio (again)', 'Read the spec properly'],
  },
];

const TOP = 108; // where the first header parks, below the status bar
const HEAD = 62; // a compressed card
const CARD_H = 268;
const GAP = 16;

export default function ScrollStack() {
  const [y, setY] = useState(0);
  const drag = useRef(null);

  const max = CARDS.length * (CARD_H + GAP) - (844 - TOP - HEAD * CARDS.length) + 120;

  const clamp = useCallback(
    (v) => {
      // rubber band past both ends rather than a hard stop
      if (v < 0) return v * 0.32;
      if (v > max) return max + (v - max) * 0.32;
      return v;
    },
    [max],
  );

  const onDown = (e) => {
    drag.current = {
      startY: e.clientY,
      from: y,
      t: performance.now(),
      lastY: e.clientY,
      v: 0,
      scale: scaleOf(e.currentTarget),
    };
    capture(e);
  };

  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    d.v = ((d.lastY - e.clientY) / d.scale / Math.max(1, now - d.t)) * 1000;
    d.lastY = e.clientY;
    d.t = now;
    setY(clamp(d.from + (d.startY - e.clientY) / d.scale));
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    // fling, then settle back inside the bounds
    let v = d.v;
    let pos = y;
    const step = () => {
      v *= 0.94;
      pos += v * 0.016;
      if (pos < 0 || pos > max) {
        pos += (Math.max(0, Math.min(max, pos)) - pos) * 0.18;
        v *= 0.5;
      }
      setY(pos);
      if (Math.abs(v) > 8 || pos < -0.5 || pos > max + 0.5) requestAnimationFrame(step);
      else setY(Math.max(0, Math.min(max, pos)));
    };
    if (Math.abs(v) > 20 || y < 0 || y > max) requestAnimationFrame(step);
  };

  return (
    <PhoneFrame screenTint="#0e100f">
      <div
        className="sstack"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <header className="sstack-top" style={{ opacity: Math.max(0, 1 - y / 60) }}>
          <p>Tuesday</p>
          <h4>Five things</h4>
        </header>

        {CARDS.map((card, i) => {
          const natural = TOP + 96 + i * (CARD_H + GAP) - y;
          const parked = TOP + i * HEAD;
          // A card holds its full height until it would rise above its
          // parking slot. From that point it stops moving and starts
          // compressing instead, over exactly the distance it has to give up
          // -- so it reaches header height at the moment the next card's own
          // parking slot arrives, and the stack never has a gap in it.
          const top = Math.max(parked, natural);
          const t = Math.max(0, Math.min(1, (parked - natural) / (CARD_H - HEAD)));
          const h = CARD_H - (CARD_H - HEAD) * t;

          return (
            <article
              key={card.id}
              className={`sstack-card ${t > 0.9 ? 'is-parked' : ''}`}
              style={{
                zIndex: i + 1,
                top,
                height: h,
                background: card.tint,
                color: card.ink,
              }}
            >
              <div className="sstack-head">
                <h5>{card.label}</h5>
                <span className="sstack-n">{card.n}</span>
              </div>

              {/* the body fades as the card compresses, so the header is all
                  that remains rather than the text being clipped mid-line */}
              <div className="sstack-body" style={{ opacity: Math.max(0, 1 - t * 2.2) }}>
                {card.rows.map((r) => (
                  <p key={r}>{r}</p>
                ))}
              </div>
            </article>
          );
        })}

        <span className="sstack-hint" style={{ opacity: y > 40 ? 0 : 1 }}>
          Drag up
        </span>
      </div>
    </PhoneFrame>
  );
}
