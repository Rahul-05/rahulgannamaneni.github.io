import { useMemo, useRef, useState } from 'react';
import BrowserFrame from './frames/BrowserFrame.jsx';
import { scaleOf } from './frames/scale.js';
import capture from './capture.js';
import './TimelineEditor.css';

// An edit timeline where the clips snap. Everything here exists because
// dragging a clip to a frame-exact position with a mouse is impossible, so
// the tool has to guess and then say what it guessed.
//
//  · candidate snap points are every other clip's edges, the playhead and 0
//  · the winner is the nearest one inside a threshold measured in pixels, not
//    seconds, so the magnet strength is constant however far you are zoomed
//  · a guide is drawn at whatever it locked to, because a snap you cannot see
//    reads as the clip refusing to go where you put it

const PPS = 42; // pixels per second at this zoom
const SNAP_PX = 9; // magnet radius, in screen pixels
const TRACKS = [
  { id: 'v', label: 'V1', kind: 'video' },
  { id: 'b', label: 'V2', kind: 'title' },
  { id: 'a', label: 'A1', kind: 'audio' },
];

const START = [
  { id: 'c1', track: 'v', start: 0, dur: 4.2, label: 'Opening wide', tint: '#0059BC' },
  { id: 'c2', track: 'v', start: 4.6, dur: 3.4, label: 'Close on hands', tint: '#0059BC' },
  { id: 'c3', track: 'v', start: 8.6, dur: 4.8, label: 'Reverse', tint: '#0059BC' },
  { id: 't1', track: 'b', start: 1.2, dur: 2.6, label: 'Lower third', tint: '#E05D2D' },
  { id: 't2', track: 'b', start: 9.4, dur: 2.2, label: 'End card', tint: '#E05D2D' },
  { id: 'a1', track: 'a', start: 0, dur: 8.4, label: 'Room tone', tint: '#1f8a5c' },
  { id: 'a2', track: 'a', start: 8.6, dur: 4.8, label: 'Music bed', tint: '#1f8a5c' },
];

export default function TimelineEditor() {
  const [clips, setClips] = useState(START);
  const [playhead, setPlayhead] = useState(6.1);
  const [dragId, setDragId] = useState(null);
  const [guide, setGuide] = useState(null);
  const [selected, setSelected] = useState('c2');
  const rig = useRef(null);

  const duration = useMemo(() => Math.max(16, ...clips.map((c) => c.start + c.dur)) + 2, [clips]);

  // every edge that a dragged clip is allowed to land on
  const snapPoints = (movingId) => {
    const pts = [0, playhead];
    clips.forEach((c) => {
      if (c.id === movingId) return;
      pts.push(c.start, c.start + c.dur);
    });
    return pts;
  };

  const onClipDown = (e, clip) => {
    setSelected(clip.id);
    setDragId(clip.id);
    rig.current = {
      x: e.clientX,
      start: clip.start,
      pts: snapPoints(clip.id),
      dur: clip.dur,
      scale: scaleOf(e.currentTarget),
    };
    capture(e);
  };

  const onMove = (e) => {
    const r = rig.current;
    if (!r) return;
    const raw = Math.max(0, r.start + (e.clientX - r.x) / r.scale / PPS);

    // test both the clip's head and its tail against every candidate, and
    // keep the closest lock in screen pixels
    let best = null;
    r.pts.forEach((p) => {
      [
        { at: p, edge: 'head', pos: raw },
        { at: p - r.dur, edge: 'tail', pos: raw },
      ].forEach(({ at, edge }) => {
        const px = Math.abs(at - raw) * PPS;
        if (at >= 0 && px < SNAP_PX && (!best || px < best.px)) {
          best = { px, start: at, line: edge === 'head' ? at : at + r.dur };
        }
      });
    });

    setGuide(best ? best.line : null);
    const next = best ? best.start : raw;
    setClips((cs) => cs.map((c) => (c.id === dragId ? { ...c, start: next } : c)));
  };

  const onUp = () => {
    rig.current = null;
    setDragId(null);
    setGuide(null);
  };

  const onScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = scaleOf(e.currentTarget);
    setPlayhead(Math.max(0, (e.clientX - rect.left) / scale / PPS));
  };

  const sel = clips.find((c) => c.id === selected);

  return (
    <BrowserFrame url="cut.app/project/reel" tab="Reel, rough cut">
      <div className="tl">
        <div className="tl-stage">
          <div className="tl-monitor">
            <span className="tl-frame" />
            <span className="tl-tc">
              {String(Math.floor(playhead / 60)).padStart(2, '0')}:
              {String(Math.floor(playhead % 60)).padStart(2, '0')}:
              {String(Math.floor((playhead % 1) * 24)).padStart(2, '0')}
            </span>
          </div>

          <aside className="tl-inspector">
            <p className="tl-insp-k">Selected</p>
            <h5>{sel?.label ?? ''}</h5>
            <dl>
              <div>
                <dt>In</dt>
                <dd>{sel ? sel.start.toFixed(2) : ''}s</dd>
              </div>
              <div>
                <dt>Out</dt>
                <dd>{sel ? (sel.start + sel.dur).toFixed(2) : ''}s</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{sel ? sel.dur.toFixed(2) : ''}s</dd>
              </div>
            </dl>
            <p className="tl-insp-note">
              Drag a clip. It magnets to nearby edges and to the playhead.
            </p>
          </aside>
        </div>

        <div
          className="tl-timeline"
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div
            className="tl-ruler"
            onPointerDown={onScrub}
            onPointerMove={(e) => e.buttons && onScrub(e)}
          >
            {Array.from({ length: Math.ceil(duration) }, (_, s) => (
              <span key={s} className={s % 5 === 0 ? 'is-major' : ''} style={{ left: s * PPS }}>
                {s % 5 === 0 ? `${s}s` : ''}
              </span>
            ))}
          </div>

          <div className="tl-tracks" style={{ width: duration * PPS }}>
            {TRACKS.map((t) => (
              <div className="tl-track" key={t.id}>
                <span className="tl-track-label">{t.label}</span>
                {clips
                  .filter((c) => c.track === t.id)
                  .map((c) => (
                    <div
                      key={c.id}
                      className={`tl-clip tl-clip--${t.kind} ${dragId === c.id ? 'is-dragging' : ''} ${selected === c.id ? 'is-selected' : ''}`}
                      style={{ left: c.start * PPS, width: c.dur * PPS, background: c.tint }}
                      onPointerDown={(e) => onClipDown(e, c)}
                    >
                      <span className="tl-clip-name">{c.label}</span>
                      {t.kind === 'audio' && (
                        <svg
                          className="tl-wave"
                          viewBox="0 0 100 18"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <path d={waveform(c.id)} />
                        </svg>
                      )}
                    </div>
                  ))}
              </div>
            ))}

            {/* the guide is drawn only while a lock is active */}
            {guide !== null && <span className="tl-guide" style={{ left: guide * PPS }} />}

            <span className="tl-playhead" style={{ left: playhead * PPS }}>
              <i />
            </span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

// deterministic pseudo-waveform, so a clip looks the same every render
function waveform(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 997;
  let d = 'M0 9';
  for (let x = 0; x <= 100; x += 2.5) {
    h = (h * 1103515245 + 12345) % 2147483648;
    const a = 1 + (h / 2147483648) * 7.4;
    d += `L${x} ${9 - a}L${x + 1.25} ${9 + a}`;
  }
  return d;
}
