import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PROJECTS } from '../data.js';
import { CASE_SECTIONS } from '../caseStudy.js';
import { CASE_CONTENT } from '../caseContent.js';
import SectionTag from './SectionTag.jsx';
import CaseIcon from './CaseIcon.jsx';
import TechIcon, { TECH_LABEL } from './TechIcon.jsx';
import Lightbox from './Lightbox.jsx';
import CardArt from './CardArt.jsx';
import Block, { Media } from './caseBlocks.jsx';
import CasePeek from './CasePeek.jsx';
import './projectPage.css';
// ── the page ─────────────────────────────────────────────────────────
// Rendered inside the peek iframe as well as at the top level. In embed mode
// it drops its own bar and footer -- the panel around it supplies those --
// and skips the slide-up, which only makes sense when it covers the page.
const MIN_SUMMARY = 112; // three lines; below this it is not worth the panel

const isEmbed = () => new URLSearchParams(window.location.search).has('embed');

export default function ProjectPage({ project, onClose, onOpen }) {
  const embed = isEmbed();
  const rootRef = useRef(null);
  const scrollRef = useRef(null);
  const indexNavRef = useRef(null);
  const [zoom, setZoom] = useState(null);
  const [peek, setPeek] = useState(null);
  const pinnedRef = useRef(null);
  const asideRef = useRef(null);
  // whether the summary has room to be worth reading in the panel
  const [summaryInline, setSummaryInline] = useState(false);
  const [active, setActive] = useState((CASE_CONTENT[project.sections] || CASE_SECTIONS)[0].id);

  const sections = CASE_CONTENT[project.sections] || CASE_SECTIONS;
  const idx = PROJECTS.findIndex((p) => p.n === project.n);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      gsap
        .timeline()
        .fromTo(
          rootRef.current,
          { yPercent: embed ? 0 : 100 },
          { yPercent: 0, duration: embed ? 0 : 0.75, ease: 'power3.inOut' },
        )
        .fromTo(
          q('.pp-tag, .pp-title-line, .pp-lede'),
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out' },
          '-=0.35',
        )
        .fromTo(
          q('.pp-art'),
          { scale: 0.7, autoAlpha: 0, rotation: -12 },
          { scale: 1, autoAlpha: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.5)' },
          '-=0.5',
        );
    },
    { scope: rootRef },
  );

  // ── scroll spy ──────────────────────────────────────────────────────
  // A plain DOM listener driving React state, deliberately NOT inside the
  // useGSAP callback: that body runs inside a gsap.context, whose revert()
  // (which React's StrictMode double-invoke triggers) tears down anything
  // the callback returned, so the listener never survived to fire.
  //
  // Position is measured against a reading line a third of the way down the
  // scroller. IntersectionObserver was tried first, but these sections are
  // tall and unevenly sized, so a rootMargin band matched several at once
  // or none at all.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return undefined;
    const sections = Array.from(root.querySelectorAll('.cs-section'));
    if (!sections.length) return undefined;

    const syncActive = () => {
      const line = root.getBoundingClientRect().top + root.clientHeight * 0.3;
      let current = sections[0];
      sections.forEach((el) => {
        if (el.getBoundingClientRect().top <= line) current = el;
      });
      if (current) setActive(current.id);
    };

    syncActive();
    root.addEventListener('scroll', syncActive, { passive: true });
    window.addEventListener('resize', syncActive);
    return () => {
      root.removeEventListener('scroll', syncActive);
      window.removeEventListener('resize', syncActive);
    };
  }, [project.slug]);

  // switching studies from the peek must land at the top of the new one
  useEffect(() => {
    setPeek(null);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [project.slug]);

  // The peek asks for a section through the hash. Jumping after layout, not
  // on mount, because the images above set their own height first.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    const t = setTimeout(() => {
      const el = rootRef.current?.querySelector(`#${CSS.escape(id)}`);
      const root = scrollRef.current;
      if (!el || !root) return;
      root.scrollTop += el.getBoundingClientRect().top - root.getBoundingClientRect().top - 12;
      setActive(id);
    }, 60);
    return () => clearTimeout(t);
  }, [project.slug]);

  // The directory is never allowed to shrink and the stack sits below it, so
  // on a short window the summary is left with whatever is over -- sometimes
  // two lines, which is worse than not being there. A height breakpoint
  // cannot decide this: a study with ten sections runs out of room long
  // before one with eight. So measure what is actually left and, when it is
  // not enough to read, move the summary inline at the top of the study
  // where it has the width to be short instead of cramped.
  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return undefined;

    const decide = () => {
      const nav = aside.querySelector('nav');
      const label = aside.querySelector(':scope > .pp-index-k');
      const stack = aside.querySelector('.pp-index-meta:not(.pp-pinned)');
      if (!nav || !stack) return;
      const cs = getComputedStyle(aside);
      const gap = parseFloat(cs.rowGap) || 18;
      // label + nav + stack + the gaps between them, plus the summary's own
      // heading and the rule above it
      const used =
        (label?.offsetHeight || 0) + nav.offsetHeight + stack.offsetHeight + gap * 3 + 37;
      // Against the cap, not the rendered height: once the summary moves out
      // the panel shrinks to fit what is left, and measuring that would say
      // there is no room for the thing whose absence created the room.
      const cap = parseFloat(cs.maxHeight) || aside.clientHeight;
      setSummaryInline(cap - used < MIN_SUMMARY);
    };

    decide();
    const ro = new ResizeObserver(decide);
    ro.observe(aside);
    // the panel is capped in vh, so the viewport changing is what matters
    ro.observe(document.documentElement);
    window.addEventListener('resize', decide);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', decide);
    };
  }, [project.slug]);

  // Flags whichever edge of the summary still has content, so the fade can
  // say there is more to read. Re-run on resize because the list's height is
  // whatever the panel has left over, which changes with the window.
  useEffect(() => {
    const el = pinnedRef.current;
    if (!el) return undefined;
    const sync = () => {
      const more = el.scrollHeight - el.clientHeight;
      el.classList.toggle('has-more', more > 2 && el.scrollTop < more - 2);
      el.classList.toggle('has-prev', el.scrollTop > 2);
    };
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', sync);
      ro.disconnect();
    };
  }, [project.slug, summaryInline]);

  const close = () => {
    gsap.to(rootRef.current, {
      yPercent: 100,
      duration: 0.55,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  // step the section strip sideways by roughly one screen of chips
  const nudgeIndex = (dir) => {
    const el = indexNavRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.72, behavior: 'smooth' });
  };

  const jumpTo = (id) => {
    const el = rootRef.current?.querySelector(`#${id}`);
    const root = scrollRef.current;
    if (!el || !root) return;
    // delta from the element to the scroller's own top, so this is correct
    // regardless of which ancestor happens to be the offsetParent
    const delta = el.getBoundingClientRect().top - root.getBoundingClientRect().top;
    root.scrollTo({ top: root.scrollTop + delta - 20, behavior: 'smooth' });
    setActive(id);
  };

  return (
    <div
      className={`pp ${embed ? 'pp--embed' : ''} ${summaryInline ? 'pp--summary-inline' : ''}`}
      ref={rootRef}
      style={project.accent ? { '--accent': project.accent } : undefined}
    >
      {!embed && (
        <header className="pp-bar">
          <button className="pp-back" onClick={close}>
            <span className="pp-back-arrow">←</span> All work
          </button>
          <span className="pp-count">
            {project.n} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
        </header>
      )}

      <div className="pp-scroll" ref={scrollRef}>
        {/* ── hero ── */}
        <section className="pp-hero">
          <SectionTag className="pp-tag">{project.kicker}</SectionTag>
          <h1 className="pp-title">
            <span className="pp-title-line">{project.title}</span>
            <span className="pp-title-line pp-title-line--alt">
              {project.tagline || project.outcome}
              <CardArt shape={project.heroShape} seed={idx} className="pp-art" />
            </span>
          </h1>

          <div className="pp-hero-foot">
            <p className="pp-lede">{project.summary}</p>
          </div>
        </section>

        <section className="pp-cover">
          <Media
            src={project.cover}
            label={`${project.title} cover`}
            ratio="16 / 8"
            onOpen={setZoom}
          />
        </section>

        {/* On a phone the sticky directory collapses to a section strip and
            its panels are hidden -- there is no room to pin anything. Rather
            than lose the stack and the summary entirely, they run once here,
            at the top, where a reader meets them before the long scroll. */}
        <div className="pp-topmeta">
          {project.pinned?.length > 0 && (
            <div className="pp-topmeta-block pp-topmeta-block--summary">
              <span className="pp-index-k">The short version</span>
              <ul className="pp-pinned-list">
                {project.pinned.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="pp-topmeta-block pp-topmeta-block--stack">
            <span className="pp-index-k">Stack</span>
            <div className="pp-chips">
              {project.stack.map((t) => (
                <span className="pp-chip" key={t}>
                  <TechIcon name={t} />
                  {TECH_LABEL[t]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── case study: content left, sticky directory right ── */}
        <div className="pp-body">
          <main className="pp-content">
            {sections.map((sec) => (
              <section className="cs-section" id={sec.id} key={sec.id}>
                <SectionTag icon={sec.icon}>{sec.label}</SectionTag>
                {sec.blocks.map((b, i) => (
                  <Block
                    block={b}
                    key={i}
                    onOpen={setZoom}
                    onPeek={
                      embed
                        ? (l) => {
                            const t = PROJECTS.find((x) => x.sections === l.to);
                            if (t) window.location.href = `/${t.slug}?embed=1#${l.section}`;
                          }
                        : setPeek
                    }
                  />
                ))}
              </section>
            ))}
          </main>

          <aside className="pp-index" ref={asideRef}>
            <span className="pp-index-k">Sections</span>

            {/* On narrow screens the list becomes a horizontal strip. The
                arrows are there so it reads as scrollable rather than as a
                list that happens to be cut off. */}
            <button
              className="pp-index-arrow pp-index-arrow--prev"
              onClick={() => nudgeIndex(-1)}
              aria-label="Previous sections"
            >
              ←
            </button>
            <button
              className="pp-index-arrow pp-index-arrow--next"
              onClick={() => nudgeIndex(1)}
              aria-label="More sections"
            >
              →
            </button>

            <nav ref={indexNavRef}>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  className={`pp-index-item ${active === sec.id ? 'is-on' : ''}`}
                  onClick={() => jumpTo(sec.id)}
                >
                  <CaseIcon name={sec.icon} />
                  <span className="pp-index-label">{sec.label}</span>
                </button>
              ))}
            </nav>

            {/* What the study actually claims, kept in view for the whole
                scroll -- the stats at the top say what this was, this says
                why it mattered. It sits above the stack and takes the
                leftover height, so it is the only thing that ever scrolls
                and the stack below it stays put. */}
            {project.pinned?.length > 0 && (
              <div className="pp-index-meta pp-pinned">
                <span className="pp-index-k">The short version</span>
                <ul className="pp-pinned-list" ref={pinnedRef}>
                  {project.pinned.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pp-index-meta">
              <span className="pp-index-k">Stack</span>
              <div className="pp-chips">
                {project.stack.map((t) => (
                  <span className="pp-chip" key={t}>
                    <TechIcon name={t} />
                    {TECH_LABEL[t]}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {!embed && (
          <button className="pp-next" onClick={() => onOpen(next)}>
            <span className="pp-next-k">Next project</span>
            <span className="pp-next-title">{next.title}</span>
            <span className="pp-next-arrow" aria-hidden="true">
              →
            </span>
          </button>
        )}
      </div>

      <Lightbox image={zoom} onClose={() => setZoom(null)} />
      {peek && <CasePeek link={peek} onClose={() => setPeek(null)} onOpenFull={onOpen} />}
    </div>
  );
}
