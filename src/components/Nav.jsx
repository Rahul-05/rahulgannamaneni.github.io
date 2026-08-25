import { useEffect, useState } from 'react';
import { NAV_LINKS, RESUME_URL } from '../data.js';
import TechIcon from './TechIcon.jsx';
import './nav.css';

// Top bar: identity, section links, availability and the resume action.
// Below the phone breakpoint the links collapse into a hamburger panel
// rather than a row of bare numbers, which read as meaningless on their own.
export default function Nav({ onNavigate, dark = false, index = 0, total = 5 }) {
  const [open, setOpen] = useState(false);

  // never leave the panel open across a resize into the desktop layout
  useEffect(() => {
    const onResize = () => window.innerWidth > 720 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // escape closes it, and the page behind should not scroll while it is up
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (i) => {
    setOpen(false);
    onNavigate(i);
  };

  return (
    <header className={`nav ${dark ? 'nav--dark' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav-row">
        <button className="nav-brand" onClick={() => go(0)}>
          <span className="nav-brand-title">RAHUL RAO</span>
          <span className="nav-brand-sub">Product Designer · UX Engineer</span>
        </button>

        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              className={`nav-link ui-label ${index === l.index ? 'is-current' : ''}`}
              onClick={() => go(l.index)}
            >
              <span className="nav-link-label">{l.label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-side">
          <span className="nav-status">
            <span className="nav-dot" />
            Open to work
          </span>
          <a className="nav-resume" href={RESUME_URL} target="_blank" rel="noreferrer">
            <TechIcon name="resume" />
            Resume
          </a>

          <button
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav-rule">
        <span className="nav-rule-fill" style={{ transform: `scaleX(${(index + 1) / total})` }} />
      </div>

      {/* phone panel */}
      <div className="nav-panel" hidden={!open}>
        <nav className="nav-panel-links">
          {NAV_LINKS.map((l) => (
            <button
              key={l.label}
              className={`nav-panel-link ${index === l.index ? 'is-current' : ''}`}
              onClick={() => go(l.index)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="nav-panel-foot">
          <span className="nav-status">
            <span className="nav-dot" />
            Open to work
          </span>
          <a className="nav-resume" href={RESUME_URL} target="_blank" rel="noreferrer">
            <TechIcon name="resume" />
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
