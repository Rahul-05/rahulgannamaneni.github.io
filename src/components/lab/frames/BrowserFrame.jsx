import useFitScale from './useFitScale.js';
import './BrowserFrame.css';

export const WEB_W = 1180;
export const WEB_H = 740;
const CHROME = 38;

// A desktop window. Same contract as the phone: children are authored at
// 1180x740 and the frame scales the whole thing down to the card.
export default function BrowserFrame({
  children,
  url = 'app.local',
  tab = 'Untitled',
  tint = '#ffffff',
}) {
  const [fitRef, scale] = useFitScale(WEB_W, WEB_H + CHROME, 6);

  return (
    <div className="web-fit" ref={fitRef}>
      <div className="web" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <div className="web-chrome">
          <span className="web-lights">
            <i />
            <i />
            <i />
          </span>
          <span className="web-tab">{tab}</span>
          <span className="web-url">
            <svg viewBox="0 0 12 14" aria-hidden="true">
              <path
                d="M3 6V4a3 3 0 0 1 6 0v2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect x="1.5" y="6" width="9" height="7" rx="2" />
            </svg>
            {url}
          </span>
        </div>

        <div className="web-viewport" style={{ background: tint }}>
          {children}
        </div>
      </div>
    </div>
  );
}
