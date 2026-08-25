import { useMemo, useRef, useState } from 'react';
import BrowserFrame from './frames/BrowserFrame.jsx';
import { scaleOf } from './frames/scale.js';
import capture from './capture.js';
import './BlockReorder.css';

// Dragging a block in a document editor. The list is the easy half; the part
// that makes it feel like a real editor is that the gap opens where the block
// will land, continuously, rather than a line appearing between two rows.
//
// No library and no FLIP pass: blocks have different heights, so on pointer
// down the layout is measured once into a table of offsets, and from then on
// every block's displacement is arithmetic on that table. That keeps the
// neighbours' motion tied to the pointer instead of to a re-render, so the
// document reflows at exactly the speed of the hand.

const BLOCKS = [
  { id: 'h', kind: 'h2', text: 'What we are actually shipping' },
  {
    id: 'p1',
    kind: 'p',
    text: 'The rewrite touches three surfaces. Each one has its own owner, and none of them ship independently, which is the whole problem with the current plan.',
  },
  {
    id: 'q',
    kind: 'quote',
    text: 'If it cannot ship on its own, it is not a milestone. It is a hope.',
  },
  { id: 'l1', kind: 'li', text: 'Editor: block model and the drag affordance' },
  { id: 'l2', kind: 'li', text: 'Sync: conflict resolution on reorder' },
  { id: 'l3', kind: 'li', text: 'Mobile: the same gestures, one thumb' },
  { id: 'img', kind: 'img', text: 'Flow · v4' },
  {
    id: 'p2',
    kind: 'p',
    text: 'Everything below the fold is out of scope until the three above are done.',
  },
];

export default function BlockReorder() {
  const [order, setOrder] = useState(BLOCKS);
  const [dragId, setDragId] = useState(null);
  const [drop, setDrop] = useState(0);
  const [dy, setDy] = useState(0);
  const rig = useRef(null);
  const listRef = useRef(null);

  const dragIndex = useMemo(() => order.findIndex((b) => b.id === dragId), [order, dragId]);

  const onDown = (e, id) => {
    const rows = [...listRef.current.querySelectorAll('.blk')];
    const scale = scaleOf(listRef.current);
    const from = order.findIndex((b) => b.id === id);
    // one measurement, reused for the whole gesture
    rig.current = {
      startY: e.clientY,
      from,
      scale,
      heights: rows.map((r) => r.getBoundingClientRect().height / scale),
      tops: rows.map((r) => r.getBoundingClientRect().top / scale),
    };
    setDragId(id);
    setDrop(from);
    setDy(0);
    capture(e);
  };

  const onMove = (e) => {
    const r = rig.current;
    if (!r) return;
    const delta = (e.clientY - r.startY) / r.scale;
    setDy(delta);

    // where the block's own centre now sits, in the original layout
    const centre = r.tops[r.from] + r.heights[r.from] / 2 + delta;
    let target = 0;
    for (let i = 0; i < r.tops.length; i += 1) {
      if (centre > r.tops[i] + r.heights[i] / 2) target = i;
    }
    setDrop(target);
  };

  const onUp = () => {
    if (!rig.current) return;
    const { from } = rig.current;
    rig.current = null;
    setOrder((list) => {
      const next = [...list];
      const [moved] = next.splice(from, 1);
      next.splice(drop, 0, moved);
      return next;
    });
    setDragId(null);
    setDy(0);
  };

  return (
    <BrowserFrame url="workspace.app/plan" tab="Shipping plan">
      <div className="blocks">
        <div
          className="blocks-doc"
          ref={listRef}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <p className="blocks-eyebrow">Draft · only you</p>
          <h3 className="blocks-title">Shipping plan</h3>

          {order.map((b, i) => {
            const dragging = b.id === dragId;
            let shift = 0;
            if (dragId && !dragging && rig.current) {
              // a block moves by exactly the dragged block's height, and only
              // if the drop slot has crossed it
              const h = rig.current.heights[rig.current.from];
              if (i > dragIndex && i <= drop) shift = -h;
              else if (i < dragIndex && i >= drop) shift = h;
            }

            return (
              <div
                key={b.id}
                className={`blk blk--${b.kind} ${dragging ? 'is-dragging' : ''}`}
                style={{
                  transform: dragging ? `translateY(${dy}px)` : `translateY(${shift}px)`,
                  zIndex: dragging ? 20 : 1,
                }}
              >
                <button
                  className="blk-grip"
                  onPointerDown={(e) => onDown(e, b.id)}
                  aria-label={`Reorder ${b.text.slice(0, 24)}`}
                >
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </button>

                {b.kind === 'h2' && <h4>{b.text}</h4>}
                {b.kind === 'p' && <p>{b.text}</p>}
                {b.kind === 'quote' && <blockquote>{b.text}</blockquote>}
                {b.kind === 'li' && (
                  <p className="blk-li">
                    <i aria-hidden="true" />
                    {b.text}
                  </p>
                )}
                {b.kind === 'img' && (
                  <figure>
                    <span className="blk-img" />
                    <figcaption>{b.text}</figcaption>
                  </figure>
                )}
              </div>
            );
          })}
        </div>

        <p className="blocks-hint">Grab a handle on the left</p>
      </div>
    </BrowserFrame>
  );
}
