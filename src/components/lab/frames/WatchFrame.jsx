import useFitScale from './useFitScale.js';
import './WatchFrame.css';

export const WATCH_W = 198;
export const WATCH_H = 242;
const BEZEL = 13;

// A 45mm Apple Watch. Same contract as the other frames: children are
// authored at 198x242 and the frame scales. The band is drawn because a
// watch screen floating on its own reads as a phone with rounded corners --
// the strap is what tells you how small this thing actually is.
export default function WatchFrame({ children, tint = '#000' }) {
  const [fitRef, scale] = useFitScale(WATCH_W + BEZEL * 2 + 30, WATCH_H + BEZEL * 2 + 210, 6);

  return (
    <div className="watch-fit" ref={fitRef}>
      <div className="watch" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <span className="watch-band watch-band--top" />

        <div className="watch-body">
          <span className="watch-crown" />
          <span className="watch-side" />
          <div className="watch-screen" style={{ background: tint }}>
            {children}
          </div>
        </div>

        <span className="watch-band watch-band--bottom" />
      </div>
    </div>
  );
}
