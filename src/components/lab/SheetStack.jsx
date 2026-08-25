import { useCallback, useRef, useState } from 'react';
import PhoneFrame from './frames/PhoneFrame.jsx';
import { scaleOf } from './frames/scale.js';
import capture from './capture.js';
import './SheetStack.css';

// Sheets that stack. Pushing a new one does not cover the last -- it pushes
// it back in depth, rounds its corners and dims it, so the sheet you came
// from is still legible behind the one you are in and the way back is obvious.
//
// The part worth building properly is the dismissal. Dragging the front sheet
// down drives the whole stack backwards at once: the sheet behind comes
// forward by exactly the amount the front one has travelled, so releasing
// halfway leaves the stack coherent instead of mid-way between two states.

const SHEETS = [
  {
    id: 'share',
    title: 'Share',
    rows: [
      ['Copy link', 'anyone with the link'],
      ['Invite people', 'by email'],
      ['Publish to web', 'off'],
    ],
    cta: 'Manage access',
  },
  {
    id: 'access',
    title: 'Access',
    rows: [
      ['Viewers', '14 people'],
      ['Commenters', '3 people'],
      ['Editors', 'you and 1 other'],
    ],
    cta: 'Link settings',
  },
  {
    id: 'link',
    title: 'Link settings',
    rows: [
      ['Expiry', 'in 30 days'],
      ['Password', 'not set'],
      ['Allow download', 'on'],
    ],
    cta: 'Set a password',
  },
  {
    id: 'pw',
    title: 'Password',
    rows: [
      ['Required to open', 'off'],
      ['Rotate monthly', 'off'],
    ],
    cta: null,
  },
];

// Each sheet is its own height, as they really are, and each declares a
// detent -- a half-height stop the drag can rest at instead of only being
// open or gone. Sheets that can only be one size force every one of them to
// be as tall as its worst case.
const H = [430, 500, 380, 300];
const DETENT = [232, 268, 0, 0]; // 0 = no half stop, this one is small enough

export default function SheetStack() {
  const [depth, setDepth] = useState(1); // how many sheets are up
  const [drag, setDrag] = useState(0);
  const p = useRef(null);

  const frontH = H[Math.min(depth, SHEETS.length) - 1] ?? 0;

  const push = () => setDepth((d) => Math.min(SHEETS.length, d + 1));

  const pop = useCallback(() => {
    setDrag(0);
    setDepth((d) => Math.max(0, d - 1));
  }, []);

  const onDown = (e) => {
    p.current = {
      y: e.clientY,
      t: performance.now(),
      last: e.clientY,
      v: 0,
      scale: scaleOf(e.currentTarget),
    };
    capture(e);
  };

  const onMove = (e) => {
    const d = p.current;
    if (!d) return;
    const now = performance.now();
    d.v = ((e.clientY - d.last) / d.scale / Math.max(1, now - d.t)) * 1000;
    d.last = e.clientY;
    d.t = now;
    setDrag(Math.max(0, (e.clientY - d.y) / d.scale));
  };

  const onUp = () => {
    const d = p.current;
    p.current = null;
    if (!d) return;
    // project the flick, then land on the nearest of three places: back to
    // full, the half stop if this sheet has one, or gone. Deciding by
    // projected position rather than by raw distance is what makes a fast
    // short flick dismiss and a slow long drag rest.
    const end = drag + d.v * 0.12;
    const stop = DETENT[Math.min(depth, SHEETS.length) - 1] || 0;

    if (end > frontH * 0.55) pop();
    else if (stop && end > stop * 0.5) setDrag(stop);
    else setDrag(0);
  };

  // how far the front sheet has been dragged, as a fraction of dismissal
  const back = depth > 0 ? Math.min(1, drag / frontH) : 0;

  return (
    <PhoneFrame screenTint="#0e100f">
      <div className="sheets">
        <div
          className="sheets-base"
          style={{ transform: `scale(${1 - Math.min(depth, 1) * 0.06 * (1 - back)})` }}
        >
          <p className="sheets-eyebrow">Project</p>
          <h4>North star deck</h4>
          <p className="sheets-meta">Edited 12 minutes ago · 41 slides</p>
          <p className="sheets-hint">
            {depth === 0
              ? 'Open the sheet, then push deeper or drag it down'
              : `${depth} sheet${depth > 1 ? 's' : ''} deep · drag the front one`}
          </p>
          <button className="sheets-open" onClick={() => setDepth(1)}>
            Share
          </button>
        </div>

        <div
          className="sheets-scrim"
          style={{
            opacity: Math.min(1, depth * 0.55) * (1 - back * 0.9),
            pointerEvents: depth ? 'auto' : 'none',
          }}
          onClick={pop}
        />

        {SHEETS.slice(0, depth).map((s, i) => {
          const fromTop = depth - 1 - i; // 0 = front sheet
          // each sheet behind the front sits back one step; a drag on the
          // front unwinds every step at once so the stack moves as one
          const step = Math.max(0, fromTop - back);
          const y = fromTop === 0 ? drag : 0;

          return (
            <section
              key={s.id}
              className="sheets-sheet"
              style={{
                zIndex: 10 + i,
                height: H[i],
                transform: `translateY(${y - step * 12}px) scale(${1 - step * 0.055})`,
                filter: `brightness(${1 - step * 0.14})`,
              }}
              onPointerDown={fromTop === 0 ? onDown : undefined}
              onPointerMove={fromTop === 0 ? onMove : undefined}
              onPointerUp={fromTop === 0 ? onUp : undefined}
              onPointerCancel={fromTop === 0 ? onUp : undefined}
            >
              <span className={`sheets-grab ${fromTop === 0 && DETENT[i] ? 'has-stop' : ''}`} />
              <h5>{s.title}</h5>

              <ul>
                {s.rows.map(([k, v]) => (
                  <li key={k}>
                    <span>{k}</span>
                    <em>{v}</em>
                  </li>
                ))}
              </ul>

              {s.cta && fromTop === 0 && (
                <button className="sheets-cta" onClick={push}>
                  {s.cta}
                  <span aria-hidden="true">›</span>
                </button>
              )}
            </section>
          );
        })}
      </div>
    </PhoneFrame>
  );
}
