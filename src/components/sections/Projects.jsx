import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PROJECTS } from '../../data.js';
import { IMAGE_SIZES } from '../../imageSizes.js';
import Wordmark from '../Wordmark.jsx';
import CardArt from '../CardArt.jsx';
import TechIcon, { TECH_LABEL } from '../TechIcon.jsx';
import './projects.css';

const DWELL_MS = 700; // beat at each end before the section hands over

// Work: a centred kicker over a giant wordmark, with the six projects as a
// two-up grid of cards beneath it. Each card leads with the cover image,
// because a list of titles and role chips asks people to imagine the work --
// two columns is as many as the covers can take before they stop being
// readable at a glance. Scrolling pans the grid rather than swapping pages,
// and each end holds for a beat before the scroll passes to the next section.
const Projects = forwardRef(function Projects({ onOpen }, ref) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const pos = useRef({ y: 0, max: 0, hitAt: 0 });
  const slideTo = useRef(null);

  const measure = () => {
    const track = trackRef.current;
    const view = track?.parentElement;
    if (!track || !view) return;
    pos.current.max = Math.max(0, track.scrollHeight - view.clientHeight);
    pos.current.y = gsap.utils.clamp(-pos.current.max, 0, pos.current.y);
    slideTo.current?.(pos.current.y);
  };

  useGSAP(
    () => {
      slideTo.current = gsap.quickTo(trackRef.current, 'y', {
        duration: 0.5,
        ease: 'power3',
      });
      measure();
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    },
    { scope: rootRef },
  );

  useImperativeHandle(ref, () => ({
    el: () => rootRef.current,

    // the scroll cue only appears once there is nothing left to pan
    atEnd: () => pos.current.y <= -pos.current.max + 1,

    onDelta(dy) {
      const s = pos.current;
      const atEnd = (dy > 0 && s.y <= -s.max + 1) || (dy < 0 && s.y >= -1);

      if (atEnd) {
        // Hold briefly on first arriving at an end, so the last (or first)
        // project is actually readable before the page moves on. A second
        // deliberate scroll after the beat hands over.
        if (!s.hitAt) {
          s.hitAt = performance.now();
          return 'consumed';
        }
        if (performance.now() - s.hitAt < DWELL_MS) return 'consumed';
        return 'pass';
      }

      s.hitAt = 0;
      s.y = gsap.utils.clamp(-s.max, 0, s.y - dy * 1.15);
      slideTo.current?.(s.y);
      return 'consumed';
    },

    onEnter(dir) {
      measure();
      pos.current.hitAt = 0;
      // arriving from below starts at the bottom of the stack
      pos.current.y = dir < 0 ? -pos.current.max : 0;
      gsap.set(trackRef.current, { y: pos.current.y });

      const q = gsap.utils.selector(rootRef);
      gsap.fromTo(
        q('.proj-kicker'),
        { y: -18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 },
      );
      gsap.fromTo(
        q('.proj-word'),
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.95, ease: 'power4.out', delay: 0.35 },
      );
      gsap.fromTo(
        q('.proj-script'),
        { scale: 0.4, rotation: -18, autoAlpha: 0 },
        { scale: 1, rotation: -7, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.6)', delay: 0.75 },
      );
      gsap.fromTo(
        q('.proj-card'),
        { y: 44, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out', delay: 0.55 },
      );
    },
  }));

  return (
    <section className="section proj" ref={rootRef}>
      <p className="proj-kicker">Selected Work &amp; Case Studies</p>

      <div className="proj-headline">
        <Wordmark text="PROJECTS" className="proj-word" vary={false} />
        <span className="proj-script">my</span>
      </div>

      <div className="proj-viewport">
        <div className="proj-track" ref={trackRef}>
          <div className="proj-grid">
            {PROJECTS.map((p) => {
              // The cover is no longer a control. The whole card is the target
              // now, via a stretched hit area on the Open button, so a second
              // button inside it would just be a nested control that does the
              // same thing.

              return (
                <article className={`proj-card ${p.soon ? 'proj-card--soon' : ''}`} key={p.n}>
                  {/* The cover leads. Intrinsic dimensions come from the
                      manifest so the grid never reflows as images arrive --
                      with eight landing at once the shift would be violent. */}
                  <div className={`proj-cover ${p.cover ? '' : 'proj-cover--art'}`}>
                    {p.cover ? (
                      <img
                        src={p.cover}
                        alt={`${p.title} cover`}
                        loading="lazy"
                        width={IMAGE_SIZES[p.cover]?.[0]}
                        height={IMAGE_SIZES[p.cover]?.[1]}
                      />
                    ) : (
                      // generated art rather than a grey box, so a card with
                      // no photograph still reads as a designed frame
                      <span className="proj-cover-art">
                        <CardArt shape={p.heroShape} seed={p.n} />
                      </span>
                    )}

                    <span className="proj-n">{p.n}</span>
                  </div>

                  <div className="proj-meta">
                    <div className="proj-head">
                      <h3 className="proj-title-lg">{p.title}</h3>
                      <div className="proj-org">
                        <span className="proj-year">{p.year}</span>
                        {p.company && (
                          <span className="proj-company">
                            {p.logo && (
                              <img
                                className={`proj-logo ${p.logoInvert ? 'is-flat' : ''}`}
                                src={p.logo}
                                alt=""
                                loading="lazy"
                              />
                            )}
                            {!p.logo && p.company}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="proj-kind">{p.kicker}</p>

                    <p className="proj-summary">{p.summary}</p>

                    <div className="proj-chips">
                      <div className="proj-chip-set">
                        {/* industry first and marked, because it is the one
                            chip that says who the work was for rather than
                            what was done on it */}
                        <span className="proj-chip proj-chip--industry">{p.industry}</span>

                        {p.roles.slice(0, p.soon ? 2 : 3).map((r) => (
                          <span className="proj-chip" key={r.label}>
                            <TechIcon name={r.icon} />
                            {r.label}
                          </span>
                        ))}

                        {p.tags.slice(0, p.soon ? 1 : 3).map((t) => (
                          <span className="proj-chip proj-chip--topic" key={t}>
                            {t}
                          </span>
                        ))}

                        {(() => {
                          const shown = 1 + (p.soon ? 2 : 3) + (p.soon ? 1 : 3);
                          const total = 1 + p.roles.length + p.tags.length;
                          return total > shown ? (
                            <span className="proj-chip proj-chip--more">+{total - shown}</span>
                          ) : null;
                        })()}
                      </div>

                      {/* The action sits on the chip row rather than over the
                          cover. On the image it was competing with the
                          artwork for the same corner and had to be tinted
                          dark to survive it; down here it reads at a glance
                          and the cover is left alone to do its job. */}
                      {p.soon ? (
                        <span className="proj-soon">
                          <i className="proj-soon-dot" />
                          Coming soon
                        </span>
                      ) : (
                        <button className="proj-open" onClick={() => onOpen?.(p)}>
                          Open
                          <svg className="proj-open-arrow" viewBox="0 0 14 14" aria-hidden="true">
                            <path d="M4 10 10 4M4.6 4H10v5.4" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {/* clears the floating Contact button and gives the grid a
              breath before the section hands the scroll over */}
          <div className="proj-tail" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
});

export default Projects;
