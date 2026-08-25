import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import PhoneFrame from './frames/PhoneFrame.jsx';
import { scaleOf } from './frames/scale.js';
import capture from './capture.js';
import './MaticDeck.css';

// A port of a SwiftUI prototype I built, running in the browser at the same
// device size, so the numbers below are the ones from the Xcode project
// rather than a re-approximation: 342pt cards, 97pt collapsed, 558pt
// expanded, the deck's -4/0/-2 degree rest rotations, and the sub-pixel x
// offsets the original carried out of Figma.
//
// The whole layout is one interpolation. Every card has a rest placement and
// a target placement, and a single `progress` value moves the deck between
// them, so the focused card growing and the other two tucking into the
// bottom strip are the same animation rather than three that have to agree.

const CARDS = [
  {
    id: 'daily-focus',
    title: 'Daily Focus',
    subtitle: '3 tasks left',
    agenda: "Review sprint goals, check blockers, and set priorities for today's work session.",
    participants: [],
    color: '#F4BB5C',
    border: '#E79721',
    ink: '#B44300',
    lines: null,
  },
  {
    id: 'design-sync',
    title: 'Design Sync',
    subtitle: 'Today 2:00 PM',
    agenda: 'Discuss about the north star ver. of our current product',
    participants: ['John Lee', 'Jane Doe', 'Amanda Le', 'Tony Muller'],
    color: '#0059BC',
    border: '#00408F',
    ink: '#FFFFFF',
    lines: ['Today', '2:00 PM'],
  },
  {
    id: 'inspiration',
    title: 'Inspiration',
    subtitle: '12 new items',
    agenda: 'New design references, motion studies, and color explorations added to the board.',
    participants: [],
    color: '#E05D2D',
    border: '#CD421F',
    ink: '#FFFFFF',
    lines: null,
  },
];

// device-point layout, lifted from PrototypeLayout
const L = {
  centerX: 195,
  cardW: 342,
  collapsedH: 97,
  expandedH: 558,
  stackTop: 292,
  stackRow: 97,
  expandedTop: 110,
  stripTop: 794,
  stripOverlap: 27,
};
const REST_ROT = [-4, 0, -2];
const STACK_X = [-2.1149559, 0, -1.1485583];
const STRIP_X = [0.8370358, 0.4187926];
const DISMISS = 180;

const lerp = (a, b, t) => a + (b - a) * t;

const stackAt = (i) => ({
  x: L.centerX + (STACK_X[i] ?? 0),
  y: L.stackTop + i * L.stackRow + L.collapsedH / 2,
  rot: REST_ROT[i] ?? 0,
  w: L.cardW,
  h: L.collapsedH,
});

const stripAt = (j) => ({
  x: L.centerX + (STRIP_X[j] ?? 0),
  y: L.stripTop + j * L.stripOverlap + L.collapsedH / 2,
  rot: 0,
  w: L.cardW,
  h: L.collapsedH,
});

const expandedAt = (drag) => ({
  x: L.centerX + drag.x * 0.18,
  y: L.expandedTop + L.expandedH / 2,
  rot: Math.max(-6, Math.min(6, drag.y / 43)),
  w: L.cardW,
  h: L.expandedH,
});

export default function MaticDeck() {
  const [focused, setFocused] = useState(null);
  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const [pressing, setPressing] = useState(null);
  // expanding and collapsing cross-fade the two content layers on different
  // curves; without the distinction the collapse flashes the small title
  const [phase, setPhase] = useState('expanding');

  const tween = useRef(null);
  const pointer = useRef(null);

  const run = useCallback(
    (to, duration, ease) => {
      tween.current?.kill();
      const box = { p: progress };
      tween.current = gsap.to(box, {
        p: to,
        duration,
        ease,
        onUpdate: () => setProgress(box.p),
      });
    },
    [progress],
  );

  useEffect(() => () => tween.current?.kill(), []);

  const focus = (card) => {
    if (progress > 0.001 && focused === card.id) return;
    setPhase('expanding');
    setFocused(card.id);
    setDrag({ x: 0, y: 0 });
    run(1, 0.62, 'back.out(1.15)');
  };

  const collapse = () => {
    if (progress <= 0.001) return;
    setPhase('collapsing');
    setDrag({ x: 0, y: 0 });
    run(0, 0.52, 'power3.out');
  };

  // ── drag to dismiss, downward only ──
  const onDown = (e, card, isOpen) => {
    // captured per gesture: the frame can be resized between two drags
    const scale = scaleOf(e.currentTarget);
    if (!isOpen) {
      setPressing(card.id);
      pointer.current = { startX: e.clientX, startY: e.clientY, moved: 0, card, tap: true, scale };
      capture(e);
      return;
    }
    pointer.current = {
      startX: e.clientX,
      startY: e.clientY,
      t: performance.now(),
      vy: 0,
      lastY: e.clientY,
      drag: true,
      scale,
    };
    capture(e);
  };

  const onMove = (e) => {
    const p = pointer.current;
    if (!p) return;
    // pointer deltas arrive in scaled pixels; the thresholds below are in
    // device points, so everything converts back through the frame scale
    const dx = (e.clientX - p.startX) / p.scale;
    const dy = (e.clientY - p.startY) / p.scale;

    if (p.tap) {
      p.moved = Math.hypot(dx, dy);
      if (p.moved > 12) setPressing(null);
      return;
    }
    if (!p.drag || dy <= 0) return;

    const now = performance.now();
    p.vy = ((e.clientY - p.lastY) / p.scale / Math.max(1, now - p.t)) * 1000;
    p.lastY = e.clientY;
    p.t = now;
    setDrag({ x: dx * 0.18, y: dy });
  };

  const onUp = () => {
    const p = pointer.current;
    pointer.current = null;
    if (!p) return;

    if (p.tap) {
      setPressing(null);
      if (p.moved < 12) {
        if (progress > 0.001) collapse();
        else focus(p.card);
      }
      return;
    }

    // SwiftUI dismisses on predictedEndTranslation; velocity projection is
    // the same idea -- a fast flick commits from further up the screen
    const projected = drag.y + p.vy * 0.15;
    if (Math.max(drag.y, projected) > DISMISS) collapse();
    else {
      const box = { x: drag.x, y: drag.y };
      gsap.to(box, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.6)',
        onUpdate: () => setDrag({ x: box.x, y: box.y }),
      });
    }
  };

  const open = progress > 0.001;
  const rest = CARDS.filter((c) => c.id !== focused);

  return (
    <PhoneFrame screenTint="#f2f2f7">
      <div className="matic" onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        {open && <button className="matic-scrim" onClick={collapse} aria-label="Close card" />}

        {CARDS.map((card, i) => {
          const isFocused = focused === card.id;
          const stripIndex = rest.findIndex((c) => c.id === card.id);
          const from = stackAt(i);
          const to = open ? (isFocused ? expandedAt(drag) : stripAt(stripIndex)) : from;
          const pl = {
            x: lerp(from.x, to.x, progress),
            y: lerp(from.y, to.y, progress),
            rot: lerp(from.rot, to.rot, progress),
            w: lerp(from.w, to.w, progress),
            h: lerp(from.h, to.h, progress),
          };

          // while dragging down, the focused card passes behind the strip
          // rather than over it -- the original does this so the deck reads
          // as one object being put back
          let z;
          if (open) {
            if (isFocused) z = drag.y > 0 ? ([5, 15, 9999][i] ?? 5) : 300;
            else z = (stripIndex + 1) * 10;
          } else z = (CARDS.length - i) * 10;

          const fp = isFocused && open ? progress : 0;
          const collapsedOpacity = !isFocused
            ? 1
            : phase === 'expanding'
              ? Math.max(0, 1 - fp / 0.14)
              : Math.max(0, (0.1 - fp) / 0.1);
          const expandedOpacity = !isFocused
            ? 0
            : phase === 'expanding'
              ? Math.max(0, (fp - 0.2) / 0.8)
              : fp ** 3.2;

          const held = pressing === card.id;
          const lift = isFocused && open ? drag.y : 0;
          const shift = isFocused && open ? drag.x : 0;

          return (
            <div
              key={card.id}
              className="matic-slot"
              style={{
                zIndex: z,
                width: pl.w,
                height: pl.h,
                transform: `translate(${pl.x - pl.w / 2 + shift}px, ${pl.y - pl.h / 2 + lift}px) rotate(${pl.rot}deg)`,
              }}
              onPointerDown={(e) => onDown(e, card, isFocused && open)}
            >
              <div
                className={`matic-card ${held ? 'is-held' : ''}`}
                style={{ background: card.color, borderColor: card.border, color: card.ink }}
              >
                {isFocused && open && (
                  <span className="matic-grab" style={{ opacity: Math.max(0, 1 - drag.y / 35) }} />
                )}

                <div className="matic-collapsed" style={{ opacity: collapsedOpacity }}>
                  <h4>{card.title}</h4>
                  <p>{card.subtitle}</p>
                </div>

                <div className="matic-expanded" style={{ opacity: expandedOpacity }}>
                  <div className="matic-head">
                    <h4>{card.title}</h4>
                    <div className="matic-when">
                      {(card.lines ?? [card.subtitle]).map((l) => (
                        <span key={l}>{l}</span>
                      ))}
                    </div>
                  </div>

                  <span className="matic-rule" style={{ background: card.border }} />

                  <div className="matic-body">
                    {card.agenda && (
                      <section>
                        <h5>Agenda</h5>
                        <p>{card.agenda}</p>
                      </section>
                    )}
                    {card.participants.length > 0 && (
                      <section>
                        <h5>Participants</h5>
                        <p>{card.participants.join(', ')}</p>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PhoneFrame>
  );
}
