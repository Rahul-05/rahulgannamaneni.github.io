import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { PROJECTS } from '../data.js';
import { pushOverlay } from '../overlay.js';
import './casePeek.css';

/**
 * One case study opened over another, scrolled to the part being referenced.
 *
 * The four CPP studies are four halves of the same platform, so each keeps
 * reaching for a definition another one owns. Linking out would cost the
 * reader their place in the argument they are already in, and the back button
 * is a poor answer to "what is a data product".
 *
 * The panel frames the real page in an iframe rather than re-rendering the
 * blocks itself. Re-rendering meant a second copy of the case study layout
 * that had to be kept in step with the first, and it drifted immediately --
 * inherited colours and spacing were wrong because the blocks were no longer
 * inside .pp. Framing the page means there is only ever one case study
 * layout, and whatever the real page does, this does.
 */
export default function CasePeek({ link, onClose, onOpenFull }) {
  const panelRef = useRef(null);
  const [ready, setReady] = useState(false);

  const project = PROJECTS.find((p) => p.sections === link?.to);

  // release the virtual scroll engine for as long as this is up
  useEffect(() => pushOverlay(), []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { y: 26, autoAlpha: 0, scale: 0.985 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.42, ease: 'power3.out' },
    );
  }, []);

  if (!project) return null;

  const src = `/${project.slug}?embed=1${link.section ? `#${link.section}` : ''}`;

  return createPortal(
    <div className="peek" role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="peek-scrim" onClick={onClose} aria-label="Close" />

      <div
        className="peek-panel"
        ref={panelRef}
        style={project.accent ? { '--accent': project.accent } : undefined}
      >
        <header className="peek-bar">
          <span className="peek-id">
            <span className="peek-n">{project.n}</span>
            <span className="peek-titles">
              <span className="peek-kicker">{project.kicker}</span>
              <span className="peek-title">{project.title}</span>
            </span>
          </span>

          <span className="peek-actions">
            <button
              className="peek-full"
              onClick={() => {
                onClose();
                onOpenFull?.(project);
              }}
            >
              Open full case study <span aria-hidden="true">↗</span>
            </button>
            <button className="peek-close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </span>
        </header>

        <div className="peek-frame">
          {!ready && <span className="peek-loading">Loading {project.title}…</span>}
          <iframe
            src={src}
            title={project.title}
            loading="eager"
            onLoad={() => setReady(true)}
            style={{ opacity: ready ? 1 : 0 }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
