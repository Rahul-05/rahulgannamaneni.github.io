import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PROJECTS } from '../data.js';
import { CASE_SECTIONS } from '../caseStudy.js';
import { CASE_CONTENT } from '../caseContent.js';
import { IMAGE_SIZES } from '../imageSizes.js';
import SectionTag from './SectionTag.jsx';
import CaseIcon from './CaseIcon.jsx';
import TechIcon, { TECH_LABEL } from './TechIcon.jsx';
import TempImg from './TempImg.jsx';
import Lightbox from './Lightbox.jsx';
import CardArt from './CardArt.jsx';
import './projectPage.css';

// A media slot. Real image when the block supplies one, otherwise the
// labelled placeholder.
//
// No forced aspect ratio: these assets range from tall phone screens to very
// wide flow boards, and boxing them to a fixed ratio letterboxed most of them
// into bands of dead space. The figure hugs the image instead, so the layout
// follows the artwork rather than the other way round.
function Media({ src, label, ratio = '4 / 3', tone = '#1c1c1c', onOpen }) {
  if (!src) return <TempImg label={label} ratio={ratio} tone={tone} />;
  const [w, h] = IMAGE_SIZES[src] || [];
  return (
    <figure className="cs-media">
      <img src={src} alt={label} loading="lazy" width={w} height={h} />
      <button className="cs-expand" onClick={() => onOpen({ src, label })}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            d="M9 3H3v6M15 21h6v-6M21 9V3h-6M3 15v6h6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Expand
      </button>
      <figcaption className="cs-caption">{label}</figcaption>
    </figure>
  );
}

// Loose geometric marks for the highlight panels. Purely decorative, drawn
// in the page accent so each case study's asides feel like its own.
function Figure({ name = 'blob' }) {
  const shapes = {
    blob: <path d="M18 44c-8-14 2-32 18-34 14-2 26 8 28 22 2 16-10 28-24 28C28 60 22 54 18 44Z" />,
    arc: <path d="M8 60a36 36 0 0 1 72 0" />,
    steps: <path d="M8 62h20V42h20V22h20" />,
    orbit: (
      <>
        <circle cx="44" cy="40" r="24" />
        <circle cx="44" cy="40" r="9" />
      </>
    ),
    spark: <path d="M44 8l7 24 24 7-24 7-7 24-7-24-24-7 24-7z" />,
  };
  return (
    <svg
      className="cs-figure"
      viewBox="0 0 88 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {shapes[name] || shapes.blob}
    </svg>
  );
}

// ── block renderers ──────────────────────────────────────────────────
function Block({ block, onOpen }) {
  switch (block.type) {
    case 'prose':
      return (
        <div className="cs-prose">
          <p className="cs-lead">{block.lead}</p>
          {block.body?.map((t) => (
            <p className="cs-body" key={t}>
              {t}
            </p>
          ))}
        </div>
      );

    case 'split':
      return (
        <div className={`cs-split ${block.flip ? 'cs-split--flip' : ''}`}>
          <div className="cs-split-media">
            <Media
              src={block.src}
              label={block.media}
              ratio={block.ratio || '4 / 3'}
              onOpen={onOpen}
            />
          </div>
          <div className="cs-split-text">
            <h4 className="cs-h4">{block.title}</h4>
            <p className="cs-body">{block.body}</p>
          </div>
        </div>
      );

    case 'list':
      return (
        <div className="cs-list">
          <h4 className="cs-h4">{block.title}</h4>
          <ul>
            {block.items.map((t) => (
              <li key={t}>
                <span className="cs-bullet" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      );

    case 'stats':
      return (
        <dl className="cs-stats">
          {block.items.map((s) => (
            <div key={s.k}>
              <dt>{s.k}</dt>
              <dd>{s.v}</dd>
            </div>
          ))}
        </dl>
      );

    case 'quote':
      return (
        <figure className="cs-quote">
          <blockquote>{block.quote}</blockquote>
          <figcaption>{block.by}</figcaption>
        </figure>
      );

    case 'steps':
      return (
        <ol className="cs-steps">
          {block.items.map((s, i) => (
            <li key={s.k}>
              <span className="cs-step-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="cs-step-k">{s.k}</span>
              <span className="cs-step-v">{s.v}</span>
            </li>
          ))}
        </ol>
      );

    // full-bleed image with the commentary held alongside it
    case 'feature':
      return (
        <div className="cs-feature">
          <div className="cs-feature-media">
            <Media src={block.src} label={block.media} onOpen={onOpen} />
          </div>
          <aside className="cs-feature-note">
            <h4 className="cs-h4">{block.title}</h4>
            <p className="cs-body">{block.body}</p>
            {block.points && (
              <ul className="cs-feature-points">
                {block.points.map((t) => (
                  <li key={t}>
                    <span className="cs-bullet" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      );

    // a tinted panel that breaks the reading rhythm on purpose
    case 'highlight':
      return (
        <aside className="cs-highlight">
          <Figure name={block.figure} />
          <div className="cs-highlight-body">
            <span className="cs-highlight-k">{block.k}</span>
            <p className="cs-highlight-text">{block.text}</p>
          </div>
        </aside>
      );

    case 'gallery':
      return (
        <div className={`cs-gallery cs-gallery--${block.items.length}`}>
          {block.items.map((it) => {
            const item = typeof it === 'string' ? { label: it } : it;
            return (
              <Media
                key={item.label}
                src={item.src}
                label={item.label}
                ratio={item.ratio || '4 / 3'}
                tone="#191919"
                onOpen={onOpen}
              />
            );
          })}
        </div>
      );

    default:
      return null;
  }
}

// ── the page ─────────────────────────────────────────────────────────
export default function ProjectPage({ project, onClose, onOpen }) {
  const rootRef = useRef(null);
  const scrollRef = useRef(null);
  const indexNavRef = useRef(null);
  const [zoom, setZoom] = useState(null);
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
          { yPercent: 100 },
          { yPercent: 0, duration: 0.75, ease: 'power3.inOut' },
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
      className="pp"
      ref={rootRef}
      style={project.accent ? { '--accent': project.accent } : undefined}
    >
      <header className="pp-bar">
        <button className="pp-back" onClick={close}>
          <span className="pp-back-arrow">←</span> All work
        </button>
        <span className="pp-count">
          {project.n} / {String(PROJECTS.length).padStart(2, '0')}
        </span>
      </header>

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

        {/* ── case study: content left, sticky directory right ── */}
        <div className="pp-body">
          <main className="pp-content">
            {sections.map((sec) => (
              <section className="cs-section" id={sec.id} key={sec.id}>
                <SectionTag icon={sec.icon}>{sec.label}</SectionTag>
                {sec.blocks.map((b, i) => (
                  <Block block={b} key={i} onOpen={setZoom} />
                ))}
              </section>
            ))}
          </main>

          <aside className="pp-index">
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

        <button className="pp-next" onClick={() => onOpen(next)}>
          <span className="pp-next-k">Next project</span>
          <span className="pp-next-title">{next.title}</span>
          <span className="pp-next-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>

      <Lightbox image={zoom} onClose={() => setZoom(null)} />
    </div>
  );
}
