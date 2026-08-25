import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import BrowserFrame from './frames/BrowserFrame.jsx';
import { scaleOf } from './frames/scale.js';
import './FigmaCanvas.css';

// An assistant that works *in* the canvas, with a cursor, instead of
// replacing the canvas with a progress bar.
//
// Every generative design tool I have used has the same tell: you ask for
// something, the artboard is taken away from you, a shimmer plays, and a
// finished result appears. You cannot see what it decided, you cannot stop it
// halfway, and you have no idea which of your frames it touched. It is a
// slot machine with a spinner.
//
// So here the assistant gets a second cursor on the same board. You select
// what you want it to work on, it takes over, and then you watch it work:
// it moves to a frame, selects it, drags it into place, draws the connector,
// and moves on. Everything it does is a thing you could have done, which
// means everything it does is a thing you can undo.
//
// The motion is the argument. A cursor that teleports reads as a script; one
// that eases in with a slight overshoot, pauses before it commits, and rests
// a beat between actions reads as somebody working. That pause before each
// grab is doing the most work of anything here.

const NODES = [
  { id: 'a', label: 'Sign up', kind: 'screen', x: 96, y: 118, w: 132, h: 92 },
  { id: 'b', label: 'Verify email', kind: 'screen', x: 372, y: 262, w: 132, h: 92 },
  { id: 'c', label: 'Workspace', kind: 'screen', x: 176, y: 402, w: 132, h: 92 },
  { id: 'd', label: 'First invite', kind: 'screen', x: 520, y: 118, w: 132, h: 92 },
  { id: 'e', label: 'Cover', kind: 'image', x: 640, y: 372, w: 150, h: 104 },
];

// where the assistant is going to put them: one row, evenly spaced
const TIDY = { a: [88, 250], b: [258, 250], c: [428, 250], d: [598, 250], e: [768, 244] };
const ORDER = ['a', 'b', 'c', 'd', 'e'];

export default function FigmaCanvas() {
  const [nodes, setNodes] = useState(NODES);
  const [mine, setMine] = useState(null);
  const [aiAt, setAiAt] = useState(null); // node the assistant holds
  const [aiPos, setAiPos] = useState({ x: 760, y: 540 });
  const [aiOn, setAiOn] = useState(false);
  const [links, setLinks] = useState(0);
  const [say, setSay] = useState('');
  const [myCursor, setMyCursor] = useState(null);
  const surface = useRef(null);
  const grab = useRef(null);
  const tl = useRef(null);

  const local = (e) => {
    const r = surface.current.getBoundingClientRect();
    const s = scaleOf(surface.current);
    return { x: (e.clientX - r.left) / s, y: (e.clientY - r.top) / s };
  };

  // ── my own pointer ──
  const onMove = (e) => {
    const p = local(e);
    setMyCursor(p);
    const g = grab.current;
    if (!g) return;
    setNodes((ns) => ns.map((n) => (n.id === g.id ? { ...n, x: p.x - g.dx, y: p.y - g.dy } : n)));
  };

  const onDown = (e, n) => {
    if (aiOn) return;
    const p = local(e);
    grab.current = { id: n.id, dx: p.x - n.x, dy: p.y - n.y };
    setMine(n.id);
  };

  // The timeline's .call() closures run long after the render that created
  // them, so the held-node setter goes through a ref rather than being
  // captured from state.
  const aiAtRef = useRef(null);
  const setAiAtSafe = (v) => {
    aiAtRef.current = v;
    setAiAt(v);
  };

  // ── the assistant's turn ──
  const run = () => {
    if (aiOn) return;
    setAiOn(true);
    setLinks(0);
    setMine(null);

    const cur = { x: aiPos.x, y: aiPos.y };
    const t = gsap.timeline({
      onUpdate: () => setAiPos({ x: cur.x, y: cur.y }),
      onComplete: () => {
        setAiAtSafe(null);
        setSay('Done, five frames, one row, connectors drawn.');
        setAiOn(false);
      },
    });
    tl.current = t;

    t.call(() => setSay('Reading the board'));
    t.to(cur, { x: 430, y: 300, duration: 0.7, ease: 'power2.inOut' });
    t.to({}, { duration: 0.45 }); // a beat to look at it

    ORDER.forEach((id, i) => {
      const node = NODES.find((n) => n.id === id);
      const [tx, ty] = TIDY[id];

      // travel to the frame
      t.call(() => setSay(`Moving ${node.label}`));
      t.to(cur, {
        x: node.x + node.w / 2,
        y: node.y + node.h / 2,
        duration: 0.52,
        // slight overshoot: a cursor that arrives dead-on reads as a script
        ease: 'back.out(1.4)',
      });

      // pause before committing, the way a hand hesitates
      t.to({}, { duration: 0.22 });
      t.call(() => setAiAtSafe(id));

      // drag it into the row, the node following the cursor exactly
      const held = { x: node.x, y: node.y };
      t.to(
        cur,
        { x: tx + node.w / 2, y: ty + node.h / 2, duration: 0.68, ease: 'power2.inOut' },
        '<',
      );
      t.to(
        held,
        {
          x: tx,
          y: ty,
          duration: 0.68,
          ease: 'power2.inOut',
          onUpdate: () =>
            setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, x: held.x, y: held.y } : n))),
        },
        '<',
      );

      t.call(() => setAiAtSafe(null));
      if (i > 0) t.call(() => setLinks((l) => l + 1));
      t.to({}, { duration: 0.18 });
    });

    t.call(() => setSay('Drawing the connectors'));
    t.to(cur, { x: 470, y: 150, duration: 0.6, ease: 'power2.inOut' });
  };

  const reset = () => {
    tl.current?.kill();
    setAiOn(false);
    setNodes(NODES);
    setLinks(0);
    setAiAt(null);
    setSay('');
    setMine(null);
  };

  useEffect(() => () => tl.current?.kill(), []);

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <BrowserFrame url="figma.com/file/flow-v4" tab="Activation flow, v4">
      <div className="fig">
        {/* ── toolbar ── */}
        <div className="fig-bar">
          <span className="fig-tool is-on" title="Move">
            ▣
          </span>
          <span className="fig-tool" title="Frame">
            ⌗
          </span>
          <span className="fig-tool" title="Pen">
            ✎
          </span>
          <span className="fig-tool" title="Text">
            T
          </span>
          <span className="fig-gap" />
          <span className="fig-zoom">72%</span>
          <span className="fig-faces">
            <i className="fig-me">You</i>
            <i className="fig-ai" style={{ opacity: aiOn ? 1 : 0.45 }}>
              AI
            </i>
          </span>
        </div>

        <div className="fig-body">
          {/* ── layers ── */}
          <aside className="fig-layers">
            <p>Layers</p>
            {nodes.map((n) => (
              <span
                key={n.id}
                className={`fig-layer ${mine === n.id ? 'is-mine' : ''} ${aiAt === n.id ? 'is-ai' : ''}`}
              >
                <i aria-hidden="true">{n.kind === 'image' ? '▨' : '▢'}</i>
                {n.label}
              </span>
            ))}
          </aside>

          {/* ── the board ── */}
          <div
            className="fig-surface"
            ref={surface}
            onPointerMove={onMove}
            onPointerUp={() => {
              grab.current = null;
            }}
            onPointerLeave={() => setMyCursor(null)}
          >
            <svg className="fig-wires" aria-hidden="true">
              {ORDER.slice(1).map((id, i) => {
                const from = byId[ORDER[i]];
                const to = byId[id];
                if (!from || !to || i >= links) return null;
                const x1 = from.x + from.w;
                const y1 = from.y + from.h / 2;
                const x2 = to.x;
                const y2 = to.y + to.h / 2;
                return (
                  <path
                    key={id}
                    d={`M${x1} ${y1} C${x1 + 26} ${y1} ${x2 - 26} ${y2} ${x2} ${y2}`}
                    className="fig-wire"
                  />
                );
              })}
            </svg>

            {nodes.map((n) => (
              <div
                key={n.id}
                className={`fig-node fig-node--${n.kind} ${mine === n.id ? 'is-mine' : ''} ${
                  aiAt === n.id ? 'is-ai' : ''
                }`}
                style={{ left: n.x, top: n.y, width: n.w, height: n.h }}
                onPointerDown={(e) => onDown(e, n)}
              >
                <span className="fig-node-name">{n.label}</span>
                {n.kind === 'image' ? (
                  <span className="fig-thumb" />
                ) : (
                  <span className="fig-wire-ui" />
                )}
                {aiAt === n.id && <span className="fig-tag">AI</span>}
              </div>
            ))}

            {/* the assistant's cursor: same shape as yours, different colour */}
            <span
              className={`fig-cursor fig-cursor--ai ${aiOn ? 'is-live' : ''}`}
              style={{ left: aiPos.x, top: aiPos.y }}
            >
              <svg viewBox="0 0 14 18" aria-hidden="true">
                <path d="M1 1l11 7-5 1.2L4.6 16Z" />
              </svg>
              <em>AI</em>
            </span>

            {myCursor && !aiOn && (
              <span
                className="fig-cursor fig-cursor--me"
                style={{ left: myCursor.x, top: myCursor.y }}
              >
                <svg viewBox="0 0 14 18" aria-hidden="true">
                  <path d="M1 1l11 7-5 1.2L4.6 16Z" />
                </svg>
                <em>You</em>
              </span>
            )}
          </div>
        </div>

        {/* ── the ask ── */}
        <div className={`fig-ask ${aiOn ? 'is-running' : ''}`}>
          <div className="fig-ask-in">
            <span className="fig-spark" aria-hidden="true" />
            <p>
              {say ||
                (mine
                  ? `Selected ${byId[mine]?.label}, ask for anything`
                  : 'Arrange these into one flow, left to right')}
            </p>
            {aiOn ? (
              <button onClick={reset}>Stop</button>
            ) : links > 0 ? (
              <button onClick={reset}>Undo</button>
            ) : (
              <button className="is-go" onClick={run}>
                Ask AI
              </button>
            )}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
