import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TESTIMONIALS } from '../../data.js';
import Wordmark from '../Wordmark.jsx';
import './testimonials.css';

const STEP_THRESHOLD = 70;
// Testimonials. The quotes sit on a horizontal rail, so the next one is
// always visible to the right of the current.
//
// The rail renders the set TWICE. Advancing past the last quote slides into
// the duplicate copy, then silently snaps back a full set once the tween
// lands, so the cycle is endless and there is never empty space to the
// right. Nothing moves on its own; page scroll passes straight through to
// the next section. Only Prev/Next, dragging or clicking a card moves it.
const Testimonials = forwardRef(function Testimonials(_, ref) {
  const rootRef = useRef(null);
  const railRef = useRef(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const virtRef = useRef(0);
  const slideTo = useRef(null);

  // Slide to virtual position `v` on the doubled rail. Once the tween lands
  // beyond the first set, rebase by one set with no animation, so the next
  // move always has real cards ahead of it.
  function go(v) {
    const n = TESTIMONIALS.length;
    const rail = railRef.current;
    if (!rail) return;

    let virt = v;
    if (virt < 0) {
      // stepping back off the front: jump forward a set first, invisibly
      virt += n;
      const from = rail.children[virt + 1];
      if (from) gsap.set(rail, { x: -from.offsetLeft });
    }

    const card = rail.children[virt];
    if (!card || !Number.isFinite(card.offsetLeft)) return;

    virtRef.current = virt;
    indexRef.current = virt % n;
    setIndex(virt % n);

    slideTo.current?.(-card.offsetLeft, () => {
      // rebase once we have slid into the duplicate half
      if (virtRef.current >= n) {
        virtRef.current -= n;
        const rebased = rail.children[virtRef.current];
        if (rebased) gsap.set(rail, { x: -rebased.offsetLeft });
      }
    });
  }

  useGSAP(
    () => {
      slideTo.current = (x, onDone) =>
        gsap.to(railRef.current, {
          x,
          duration: 0.7,
          ease: 'power3',
          overwrite: true,
          onComplete: onDone,
        });

      // drag the rail directly
      let dragging = false;
      let startX = 0;
      let startIdx = 0;
      const rail = railRef.current;

      const onDown = (e) => {
        dragging = true;
        startX = e.clientX;
        startIdx = virtRef.current;
        rail.classList.add('is-dragging');
      };
      const onMove = (e) => {
        if (!dragging) return;
        const card = rail.children[startIdx];
        const base = card ? -card.offsetLeft : 0;
        const last = rail.children[rail.children.length - 1];
        const min = last ? -last.offsetLeft - 80 : 0;
        gsap.set(rail, {
          x: gsap.utils.clamp(min, 80, base + (e.clientX - startX)),
        });
      };
      const onUp = (e) => {
        if (!dragging) return;
        dragging = false;
        rail.classList.remove('is-dragging');
        const moved = e.clientX - startX;
        const w = rail.children[0]?.offsetWidth || 400;
        const shift = Math.round(-moved / (w * 0.5));
        go(startIdx + gsap.utils.clamp(-1, 1, shift));
      };

      rail.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);

      return () => {
        rail.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
    },
    { scope: rootRef },
  );

  useImperativeHandle(ref, () => ({
    el: () => rootRef.current,

    // the rail is user-driven only, let the page scroll straight past
    onDelta: () => 'pass',

    onEnter(dir) {
      virtRef.current = dir < 0 ? TESTIMONIALS.length - 1 : 0;
      go(virtRef.current);

      const q = gsap.utils.selector(rootRef);
      gsap.fromTo(
        q('.testi-word'),
        { y: 70, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.95, ease: 'power4.out', delay: 0.3 },
      );
      gsap.fromTo(
        q('.testi-card'),
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.5 },
      );
    },
  }));

  return (
    <section className="section testi" ref={rootRef}>
      <Wordmark text="TESTIMONIALS" className="testi-word" vary={false} />

      <div className="testi-stage">
        <div className="testi-rail" ref={railRef}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <article
              className={`testi-card ${i % TESTIMONIALS.length === index ? 'is-current' : ''}`}
              key={`${t.name}-${i}`}
              onClick={() => go(i % TESTIMONIALS.length)}
            >
              <p className="testi-quote">{t.quote}</p>
              <div className="testi-person">
                <div className="testi-person-meta">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>

                {/* the mark stands in for the flag: where someone worked with
                    him says more than which country they were in */}
                {t.logo ? (
                  <img className="testi-logo" src={t.logo} alt={t.place} loading="lazy" />
                ) : (
                  <span className="testi-mark" title={t.place} aria-label={t.place}>
                    {t.place
                      .split(' ')
                      .filter((w) => w[0] === w[0].toUpperCase())
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join('')}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="testi-controls">
        <button
          className="testi-btn"
          onClick={() => go(virtRef.current - 1)}
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <span className="testi-count">
          {String(index + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
        </span>
        <button
          className="testi-btn"
          onClick={() => go(virtRef.current + 1)}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </section>
  );
});

export default Testimonials;
