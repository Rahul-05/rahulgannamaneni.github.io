import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { LAB_FILTERS } from '../../data.js';
import { pushOverlay } from '../../overlay.js';
import { DEMOS } from './index.js';
import './LabModal.css';

// The popup for one lab piece. The piece itself is the hero and gets the
// bulk of the panel; the written sections sit underneath it, three at most.
//
// Rendered into the body rather than in place: each section sits in its own
// stacking context (the panel transitions transform them), so a popup left
// inside one would land underneath the nav and the floating contact chip
// however high its z-index went.
export default function LabModal({ item, onClose }) {
  const bodyRef = useRef(null);
  const Demo = item ? DEMOS[item.id] : null;

  useEffect(() => {
    if (!item) return undefined;
    // stands the page's scroll engine down for as long as this is up
    const release = pushOverlay();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    bodyRef.current?.focus();
    return () => {
      release();
      window.removeEventListener('keydown', onKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  return createPortal(
    <div className="labmodal" role="dialog" aria-modal="true" aria-label={item.title}>
      <button className="labmodal-scrim" onClick={onClose} aria-label="Close" />

      {/* data-native-input keeps the page's scroll engine out of this panel,
          so the popup scrolls and the piece keeps its own gestures */}
      <div className="labmodal-panel" data-native-input ref={bodyRef} tabIndex={-1}>
        <header className="labmodal-head">
          <div>
            <h2 className="labmodal-title">{item.title}</h2>
            <p className="labmodal-note">{item.note}</p>
          </div>
          <button className="labmodal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="labmodal-hero">{Demo ? <Demo /> : null}</div>

        <div className="labmodal-chips">
          {item.kinds.map((k) => (
            <span className="lab-chip" key={k}>
              {LAB_FILTERS.find((f) => f.id === k)?.label || k}
            </span>
          ))}
          {item.tools.map((t) => (
            <span className="lab-chip lab-chip--tool" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="labmodal-sections">
          {item.sections.map((s) => (
            <section className="labmodal-section" key={s.k}>
              <h3>{s.k}</h3>
              <p>{s.v}</p>
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
