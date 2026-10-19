import { useEffect, useRef, useState } from 'react';
import BrowserFrame from './lab/frames/BrowserFrame.jsx';
import PhoneFrame from './lab/frames/PhoneFrame.jsx';
import './liveFrame.css';

// A real, running build inside a device frame instead of a screenshot of it.
// The page is an iframe authored at true device size (1180x740 or 390x844);
// the frame scales the whole window to fit, so it stays fully interactive.
//
// Nothing loads until the frame is close to the viewport: each of these is a
// whole app, some with a WebGL scene, and a study stacks several of them.
export default function LiveFrame({ src, frame = 'browser', url, tab, tint = '#fbf3e8', label, className = '' }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const iframe = on ? (
    <iframe
      key={run}
      className="live-iframe"
      src={src}
      title={label || url || 'mise'}
      loading="lazy"
      allow="fullscreen"
    />
  ) : (
    <span className="live-wait">Loading…</span>
  );

  return (
    <figure className={`live live--${frame} ${className}`} ref={ref}>
      <div className="live-device">
        {frame === 'phone' ? (
          <PhoneFrame screenTint={tint}>
            <div className="live-phone-screen">{iframe}</div>
          </PhoneFrame>
        ) : (
          <BrowserFrame url={url} tab={tab} tint={tint}>
            {iframe}
          </BrowserFrame>
        )}
      </div>
      <figcaption className="live-bar">
        <span className="live-label">{label}</span>
        <button type="button" className="live-act" onClick={() => setRun((n) => n + 1)}>
          Restart
        </button>
        <a className="live-act" href={src} target="_blank" rel="noreferrer">
          Open ↗
        </a>
      </figcaption>
    </figure>
  );
}
