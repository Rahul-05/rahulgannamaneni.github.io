import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { PROJECTS } from '../data.js';
import { CASE_CONTENT } from '../caseContent.js';
import { pushOverlay } from '../overlay.js';
import SectionTag from './SectionTag.jsx';
import Block from './caseBlocks.jsx';
import './casePeek.css';

/**
 * One case study opened over another, scrolled to the part being referenced.
 *
 * The four CPP studies are four halves of the same platform, so each one
 * keeps reaching for a definition another one owns. Linking out to the full
 * page would cost the reader their place in the argument they are already in,
 * and the back button is a poor answer to "what is a data product". This
 * opens the referenced section on top instead: read the two paragraphs, close
 * it, carry on from the same sentence.
 *
 * Rendered through a portal because each section is its own stacking context,
 * and announced to the overlay store because the page has no native scroll --
 * the window Observer has to stand down or the panel cannot be scrolled.
 */
export default function CasePeek({ link, onClose, onOpenFull }) {
  const panelRef = useRef(null);
  const scrollRef = useRef(null);

  const project = PROJECTS.find((p) => p.sections === link?.to);
  const sections = CASE_CONTENT[link?.to] || [];

  // release the virtual scroll engine for as long as this is up
  useEffect(() => pushOverlay(), []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Jump to the referenced section, then flag it. Without the flag the panel
  // opens mid-document with no sign of why it landed there.
  useEffect(() => {
    const root = scrollRef.current;
    const target = link?.section && root?.querySelector(`#peek-${link.section}`);
    if (!root) return;
    if (!target) {
      root.scrollTop = 0;
      return;
    }
    // delta from the section to the scroller's own top, not offsetTop: the
    // scroller is not the offsetParent here, so offsetTop is measured from
    // the panel and lands short by the height of the bar
    root.scrollTop =
      root.scrollTop + target.getBoundingClientRect().top - root.getBoundingClientRect().top - 12;
    gsap.fromTo(
      target,
      { backgroundColor: 'rgba(255, 252, 225, 0.09)' },
      { backgroundColor: 'rgba(255, 252, 225, 0)', duration: 1.6, delay: 0.35, ease: 'power2.out' },
    );
  }, [link]);

  useEffect(() => {
    gsap.fromTo(
      panelRef.current,
      { y: 26, autoAlpha: 0, scale: 0.985 },
      { y: 0, autoAlpha: 1, scale: 1, duration: 0.42, ease: 'power3.out' },
    );
  }, []);

  if (!project) return null;

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

        <div className="peek-scroll" ref={scrollRef}>
          {sections.map((sec) => (
            <section className="peek-section" id={`peek-${sec.id}`} key={sec.id}>
              <SectionTag icon={sec.icon}>{sec.label}</SectionTag>
              {sec.blocks.map((b, i) => (
                <Block block={b} key={i} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
