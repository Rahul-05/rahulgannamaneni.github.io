import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import BrowserFrame from './frames/BrowserFrame.jsx';
import { scaleOf } from './frames/scale.js';
import capture from './capture.js';
import './PresenceCanvas.css';

// Three other people on the same canvas. The thing that makes multiplayer
// read as live is not the cursors -- it is that everything a peer does is
// attributed and slightly ahead of you: their selection ring appears before
// the shape moves, their name rides the cursor, and their edits land as
// motion rather than as new state.
//
// Peers are driven by GSAP timelines rather than raw rAF, so each one has its
// own eased path with pauses in it. A peer that moves at constant speed and
// never hesitates reads as a bot immediately.

const PEERS = [
  {
    id: 'a',
    name: 'Amanda',
    color: '#e0592d',
    path: [
      [220, 180],
      [430, 300],
      [520, 190],
      [300, 420],
      [180, 300],
    ],
    grabs: 'card',
  },
  {
    id: 'b',
    name: 'Tony',
    color: '#0059bc',
    path: [
      [760, 420],
      [640, 250],
      [820, 180],
      [900, 380],
      [700, 480],
    ],
    grabs: 'pill',
  },
  {
    id: 'c',
    name: 'Jane',
    color: '#1f8a5c',
    path: [
      [520, 560],
      [720, 600],
      [880, 520],
      [640, 430],
      [430, 540],
    ],
    grabs: null,
  },
];

const SHAPES = [
  { id: 'card', x: 250, y: 150, w: 210, h: 140, r: 14, fill: '#F4BB5C', label: 'Hero card' },
  { id: 'pill', x: 620, y: 210, w: 250, h: 62, r: 31, fill: '#0059BC', label: 'Nav pill' },
  { id: 'panel', x: 300, y: 380, w: 300, h: 190, r: 14, fill: '#E05D2D', label: 'Detail panel' },
  { id: 'chip', x: 720, y: 470, w: 130, h: 130, r: 20, fill: '#6a4bd0', label: 'Avatar' },
];

export default function PresenceCanvas() {
  const [peers, setPeers] = useState(() =>
    PEERS.map((p) => ({ ...p, x: p.path[0][0], y: p.path[0][1], holding: false })),
  );
  const [shapes, setShapes] = useState(SHAPES);
  const [mine, setMine] = useState(null);
  const [myCursor, setMyCursor] = useState(null);
  const surface = useRef(null);
  const grab = useRef(null);

  // ── peer motion ──
  useEffect(() => {
    const tls = PEERS.map((peer, i) => {
      const state = { x: peer.path[0][0], y: peer.path[0][1] };
      const tl = gsap.timeline({ repeat: -1, delay: i * 0.7 });

      peer.path.forEach(([x, y], k) => {
        tl.to(state, {
          x,
          y,
          duration: 1.5 + (k % 3) * 0.45,
          ease: 'power2.inOut',
          onUpdate: () =>
            setPeers((ps) =>
              ps.map((p) => (p.id === peer.id ? { ...p, x: state.x, y: state.y } : p)),
            ),
        });
        // a pause where a person would stop to look at something
        if (k % 2 === 1) tl.to(state, { duration: 0.5 + (k % 2) * 0.4 });
      });

      // the peer that grabs a shape drags it along for one leg of the loop
      if (peer.grabs) {
        tl.eventCallback('onRepeat', () => {
          setPeers((ps) => ps.map((p) => (p.id === peer.id ? { ...p, holding: !p.holding } : p)));
        });
      }
      return tl;
    });
    return () => tls.forEach((t) => t.kill());
  }, []);

  // a held shape follows its peer, which is the only way an edit reads as
  // theirs rather than as the canvas moving on its own
  useEffect(() => {
    setShapes((ss) =>
      ss.map((s) => {
        const owner = peers.find((p) => p.grabs === s.id && p.holding);
        if (!owner) return s;
        return { ...s, x: owner.x - s.w / 2, y: owner.y - s.h / 2 };
      }),
    );
  }, [peers]);

  // ── my own pointer ──
  const toLocal = (e) => {
    const r = surface.current.getBoundingClientRect();
    const scale = scaleOf(surface.current);
    return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale };
  };

  const onMove = (e) => {
    const pt = toLocal(e);
    setMyCursor(pt);
    const g = grab.current;
    if (!g) return;
    setShapes((ss) =>
      ss.map((s) => (s.id === g.id ? { ...s, x: pt.x - g.dx, y: pt.y - g.dy } : s)),
    );
  };

  const onDown = (e, s) => {
    const pt = toLocal(e);
    grab.current = { id: s.id, dx: pt.x - s.x, dy: pt.y - s.y };
    setMine(s.id);
    capture(e);
  };

  const owners = Object.fromEntries(peers.filter((p) => p.grabs).map((p) => [p.grabs, p]));

  return (
    <BrowserFrame url="canvas.app/board/aX9" tab="Untitled board">
      <div className="pres">
        <div className="pres-bar">
          <span className="pres-tool is-on">▣</span>
          <span className="pres-tool">◯</span>
          <span className="pres-tool">⌗</span>
          <span className="pres-tool">✎</span>
          <span className="pres-spacer" />
          <span className="pres-faces">
            {peers.map((p) => (
              <i key={p.id} style={{ background: p.color }} title={p.name}>
                {p.name[0]}
              </i>
            ))}
            <i className="pres-me">You</i>
          </span>
        </div>

        <div
          className="pres-surface"
          ref={surface}
          onPointerMove={onMove}
          onPointerUp={() => {
            grab.current = null;
          }}
          onPointerLeave={() => setMyCursor(null)}
        >
          {shapes.map((s) => {
            const owner = owners[s.id];
            const held = owner?.holding;
            const selected = mine === s.id;
            return (
              <div
                key={s.id}
                className={`pres-shape ${held ? 'is-remote' : ''} ${selected ? 'is-mine' : ''}`}
                style={{
                  left: s.x,
                  top: s.y,
                  width: s.w,
                  height: s.h,
                  borderRadius: s.r,
                  background: s.fill,
                  outlineColor: held ? owner.color : '#0e100f',
                  transition: held ? 'none' : 'outline-color .2s ease',
                }}
                onPointerDown={(e) => onDown(e, s)}
              >
                {held && (
                  <span className="pres-owner" style={{ background: owner.color }}>
                    {owner.name} is editing
                  </span>
                )}
              </div>
            );
          })}

          {peers.map((p) => (
            <span key={p.id} className="pres-cursor" style={{ left: p.x, top: p.y }}>
              <svg viewBox="0 0 14 18" aria-hidden="true">
                <path
                  d="M1 1l11 7-5 1.2L4.6 16Z"
                  fill={p.color}
                  stroke="#fff"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              <em style={{ background: p.color }}>{p.name}</em>
            </span>
          ))}

          {myCursor && (
            <span
              className="pres-cursor pres-cursor--me"
              style={{ left: myCursor.x, top: myCursor.y }}
            >
              <svg viewBox="0 0 14 18" aria-hidden="true">
                <path
                  d="M1 1l11 7-5 1.2L4.6 16Z"
                  fill="#0e100f"
                  stroke="#fff"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              <em>You</em>
            </span>
          )}
        </div>
      </div>
    </BrowserFrame>
  );
}
