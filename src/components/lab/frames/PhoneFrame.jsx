import useFitScale from './useFitScale.js';
import './PhoneFrame.css';

export const PHONE_W = 390;
export const PHONE_H = 844;
const BEZEL = 11;

// An iPhone-sized surface. Children are authored at 390x844 and get scaled to
// fit; the status bar and home indicator are drawn by the frame so a piece
// only has to build its own screen.
export default function PhoneFrame({
  children,
  screenTint = '#f2f2f7',
  light = false,
  time = '9:41',
  island = true,
}) {
  const [fitRef, scale] = useFitScale(PHONE_W + BEZEL * 2, PHONE_H + BEZEL * 2, 6);

  return (
    <div className="phone-fit" ref={fitRef}>
      <div
        className={`phone ${light ? 'phone--light' : ''}`}
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <div className="phone-screen" style={{ background: screenTint }}>
          <div className="phone-status">
            <span className="phone-time">{time}</span>
            <span className="phone-status-right">
              <svg viewBox="0 0 18 12" className="phone-ico" aria-hidden="true">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                <rect x="10" y="3" width="3" height="9" rx="1" />
                <rect x="15" y="0" width="3" height="12" rx="1" opacity=".3" />
              </svg>
              <svg viewBox="0 0 26 13" className="phone-ico phone-ico--batt" aria-hidden="true">
                <rect
                  x="0.6"
                  y="0.6"
                  width="21"
                  height="11.8"
                  rx="3.4"
                  fill="none"
                  strokeWidth="1.2"
                  opacity=".4"
                />
                <rect x="2.2" y="2.2" width="15" height="8.6" rx="2" />
                <path d="M23.4 4.4v4.2a2.6 2.6 0 0 0 0-4.2Z" opacity=".4" />
              </svg>
            </span>
          </div>

          {/* drawn over the screen the way it actually is -- a piece that
              animates the island itself turns this off and draws its own */}
          {island && <div className="phone-island" />}

          <div className="phone-canvas">{children}</div>

          <div className="phone-home" />
        </div>
      </div>
    </div>
  );
}
