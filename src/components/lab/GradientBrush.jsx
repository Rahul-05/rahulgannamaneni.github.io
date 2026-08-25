import { useEffect, useRef, useState } from 'react';
import BrowserFrame from './frames/BrowserFrame.jsx';
import capture from './capture.js';
import { scaleOf } from './frames/scale.js';
import './GradientBrush.css';

// A button you have to paint before it will fire.
//
// The idea underneath the silliness is deliberate friction. A destructive or
// expensive action wants an act of intent, and a confirm dialog is the lazy
// version -- people click through those without reading. Painting the button
// takes about a second of continuous attention and cannot happen by accident,
// and unlike a hold-to-confirm ring it leaves something behind that shows how
// far you got.
//
// Coverage is measured on a coarse grid rather than by reading pixels back:
// getImageData on every pointer move would be the slowest possible way to ask
// a question this rough.

const COLS = 26;
const ROWS = 6;
const NEED = 0.68; // fraction of cells that must be touched

export default function GradientBrush() {
  const canvas = useRef(null);
  const cells = useRef(new Set());
  const last = useRef(null);
  const phase = useRef(0);
  const [covered, setCovered] = useState(0);
  const [done, setDone] = useState(false);

  const reset = () => {
    const c = canvas.current;
    c?.getContext('2d').clearRect(0, 0, c.width, c.height);
    cells.current = new Set();
    setCovered(0);
    setDone(false);
  };

  useEffect(() => {
    const c = canvas.current;
    if (c) {
      c.width = 520;
      c.height = 108;
    }
  }, []);

  const paint = (e) => {
    if (!last.current || done) return;
    const c = canvas.current;
    const r = c.getBoundingClientRect();
    const s = scaleOf(c);
    const x = ((e.clientX - r.left) / s) * (c.width / (r.width / s));
    const y = ((e.clientY - r.top) / s) * (c.height / (r.height / s));
    const ctx = c.getContext('2d');

    // the curl: the brush wanders off the pointer's own line on a sine, so
    // the stroke has a wrist in it rather than being a straight swipe
    phase.current += 0.35;
    const curl = Math.sin(phase.current) * 13;
    const p = last.current;

    const g = ctx.createLinearGradient(p.x, p.y, x, y + curl);
    const h = (x / c.width) * 300 + 20;
    g.addColorStop(0, `hsl(${h} 92% 58%)`);
    g.addColorStop(1, `hsl(${h + 48} 88% 52%)`);

    ctx.strokeStyle = g;
    ctx.lineWidth = 46;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(p.x, p.y + (p.curl ?? 0));
    ctx.quadraticCurveTo((p.x + x) / 2, (p.y + y) / 2 - curl, x, y + curl);
    ctx.stroke();

    last.current = { x, y, curl };

    // mark every grid cell the segment passed near
    const col = Math.floor((x / c.width) * COLS);
    const row = Math.floor((y / c.height) * ROWS);
    for (let dc = -1; dc <= 1; dc += 1) {
      for (let dr = -1; dr <= 1; dr += 1) {
        const cc = col + dc;
        const rr = row + dr;
        if (cc >= 0 && cc < COLS && rr >= 0 && rr < ROWS) cells.current.add(`${cc}.${rr}`);
      }
    }

    const frac = cells.current.size / (COLS * ROWS);
    setCovered(frac);
    if (frac >= NEED) {
      setDone(true);
      last.current = null;
    }
  };

  const start = (e) => {
    if (done) {
      reset();
      return;
    }
    const c = canvas.current;
    const r = c.getBoundingClientRect();
    const s = scaleOf(c);
    last.current = {
      x: ((e.clientX - r.left) / s) * (c.width / (r.width / s)),
      y: ((e.clientY - r.top) / s) * (c.height / (r.height / s)),
      curl: 0,
    };
    capture(e);
  };

  return (
    <BrowserFrame url="studio.app/publish" tab="Publish release">
      <div className="brush">
        <p className="brush-eyebrow">Release 4.2 · 138 changes</p>
        <h4 className="brush-title">Ship it to everyone</h4>
        <p className="brush-sub">
          This goes out to 2.4 million people and cannot be rolled back for an hour.
        </p>

        <div
          className={`brush-btn ${done ? 'is-done' : ''}`}
          onPointerDown={start}
          onPointerMove={paint}
          onPointerUp={() => {
            last.current = null;
          }}
          onPointerLeave={() => {
            last.current = null;
          }}
        >
          <canvas ref={canvas} className="brush-canvas" />
          <span className="brush-label">{done ? 'Shipped' : 'Paint to ship'}</span>
          <span
            className="brush-meter"
            style={{ transform: `scaleX(${Math.min(1, covered / NEED)})` }}
          />
        </div>

        <p className="brush-note">
          {done ? (
            <button className="brush-again" onClick={reset}>
              Reset
            </button>
          ) : (
            'Drag across the button. A dialog you can dismiss by reflex is not consent.'
          )}
        </p>
      </div>
    </BrowserFrame>
  );
}
