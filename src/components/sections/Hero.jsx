import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RING_CARDS, WORDMARK } from '../../data.js';
import CardArt from '../CardArt.jsx';
import { pinToBaseline, restingHeight } from '../baseline.js';
import { ArrowDown } from '../Scribbles.jsx';
import './hero.css';

const CARD_STEP = 360 / RING_CARDS.length;
const DRIFT_SPEED = 2.2; // deg/sec idle rotation

// Hero, giant wordmark sitting INSIDE the 3D scene at z=0, so the front
// half of the card ring passes over the text and the back half goes behind
// it. The ring spins only from user drag (with inertia) plus a slow idle
// drift; the page wheel scrolls the page.
const Hero = forwardRef(function Hero(_, ref) {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const titleRef = useRef(null);
  const spin = useRef({ base: 0, drag: 0 });

  useImperativeHandle(ref, () => ({
    el: () => rootRef.current,
    // wheel never spins the ring, page scroll takes over immediately
    onDelta: () => 'pass',
    onEnter() {},

    playIntro() {
      const q = gsap.utils.selector(rootRef);
      // synchronous reveal, the preloader word is unmounting this frame,
      // the real title must take over with no gap
      gsap.set(q('.hero-title'), { autoAlpha: 1 });
      const tl = gsap.timeline();
      tl.fromTo(
        q('.ring-tilt'),
        { scale: 0.55, autoAlpha: 0, y: 140 },
        { scale: 1, autoAlpha: 1, y: 0, duration: 1.4, ease: 'power3.out' },
        0.05,
      )
        .from(
          ringRef.current,
          {
            rotationY: '-=150',
            duration: 1.9,
            ease: 'power3.out',
          },
          0.05,
        )
        .fromTo(
          q('.hero-tagline .mask-inner, .hero-role .mask-inner'),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out' },
          0.7,
        )
        .fromTo(
          q('.hero-arrow'),
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)' },
          1,
        );
      return tl;
    },
  }));

  useGSAP(
    () => {
      // Fit the wordmark by driving the variable font's own width axis
      // (see FitText.jsx) so the letters are redrawn at the right width
      // rather than stretched out of shape.
      const fitTitle = () => {
        const fit = titleRef.current?.querySelector('.hero-title-fit');
        if (!fit) return;
        const avail = titleRef.current.clientWidth;
        if (!avail) return;
        gsap.set(fit, { scaleX: 1 });

        const widthAt = (wdth) => {
          fit.style.fontVariationSettings = `"wdth" ${wdth}, "wght" 900`;
          return fit.getBoundingClientRect().width;
        };

        let lo = 50;
        let hi = 150;
        if (widthAt(150) <= avail) lo = 150;
        else if (widthAt(50) >= avail) lo = 50;
        else {
          for (let i = 0; i < 14; i += 1) {
            const mid = (lo + hi) / 2;
            if (widthAt(mid) <= avail) lo = mid;
            else hi = mid;
          }
        }
        const natural = widthAt(lo);
        if (natural > 0) gsap.set(fit, { scaleX: avail / natural, transformOrigin: 'left bottom' });
      };
      fitTitle();
      document.fonts?.ready.then(fitTitle);
      window.addEventListener('resize', fitTitle);

      // ── per-letter heights ──────────────────────────────────────────
      // Every glyph sits on the shared baseline but gets its own vertical
      // scale, so the wordmark has an uneven top edge instead of reading as
      // one solid slab. Moving the cursor stretches whichever letters are
      // nearest it and lets the rest fall back, so the skyline keeps
      // shifting under the pointer.
      const letters = gsap.utils.toArray(
        titleRef.current.querySelectorAll('.hero-title-fit .mask-inner'),
      );
      // shared with the loader (see baseline.js) so the wordmark keeps the
      // same silhouette when the loader hands over
      const restH = letters.map((_, i) => restingHeight(i));
      // grow from the text baseline so the letters' feet stay planted
      pinToBaseline(gsap, letters);
      document.fonts?.ready.then(() => pinToBaseline(gsap, letters));

      const setH = letters.map((el, i) => {
        gsap.set(el, { scaleY: restH[i] });
        return gsap.quickTo(el, 'scaleY', { duration: 0.55, ease: 'power3' });
      });

      // touch devices have no cursor, so the wordmark animates itself
      const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const REACH = 0.34; // how far the pointer's influence spreads
      const LIFT = 0.78; // how much taller a letter gets right under it

      let autoTween;
      if (!FINE_POINTER) {
        // NOTE: sets scaleY directly rather than through the quickTo setters.
        // Driving a quickTo from inside another tween's onUpdate nests one
        // tween's update inside the root update loop, the deltas go unstable
        // and the values diverge (scaleY ran to six figures). The wave tween
        // already interpolates, so no second smoothing layer is wanted.
        const head = { at: -0.2 };
        autoTween = gsap.to(head, {
          at: 1.2,
          duration: 3.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          onUpdate: () => {
            letters.forEach((_, i) => {
              const pos = letters.length > 1 ? i / (letters.length - 1) : 0;
              const d = Math.abs(head.at - pos) / REACH;
              const pull = Math.max(0, 1 - d);
              gsap.set(letters[i], { scaleY: restH[i] + LIFT * pull * pull });
            });
          },
        });
      }

      const onPointer = (e) => {
        if (!FINE_POINTER) return;
        const box = titleRef.current.getBoundingClientRect();
        letters.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const d = Math.abs(e.clientX - cx) / (box.width * REACH);
          const pull = Math.max(0, 1 - d);
          setH[i](restH[i] + LIFT * pull * pull); // squared = tighter peak
        });
      };
      const onLeave = () => letters.forEach((_, i) => setH[i](restH[i]));

      if (FINE_POINTER) {
        window.addEventListener('pointermove', onPointer);
        rootRef.current.addEventListener('pointerleave', onLeave);
      }

      const ring = ringRef.current;
      const s = spin.current;

      // slow idle drift, drag offset layered on top
      const driftTicker = () => {
        s.base += (DRIFT_SPEED * gsap.ticker.deltaRatio(60)) / 60;
        gsap.set(ring, { rotationY: -(s.base + s.drag) });
      };
      gsap.ticker.add(driftTicker);

      // drag to spin, with inertia on release
      let dragging = false;
      let lastX = 0;
      let velocity = 0;
      const scene = rootRef.current.querySelector('.ring-scene');
      const inertia = { v: 0 };

      const onDown = (e) => {
        e.preventDefault(); // stop the drag turning into a text selection
        dragging = true;
        lastX = e.clientX;
        velocity = 0;
        gsap.killTweensOf(inertia);
        scene.classList.add('is-dragging');
      };
      const onMove = (e) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        velocity = dx;
        s.drag += dx * 0.35;
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        scene.classList.remove('is-dragging');
        // fling, decay the last velocity into extra rotation
        inertia.v = velocity * 0.35;
        gsap.to(inertia, {
          v: 0,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => {
            s.drag += inertia.v;
          },
        });
      };

      scene.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);

      // idle float, the whole band gently bobs and sways
      gsap.to('.ring-tilt', {
        y: '+=14',
        rotation: '+=1.2',
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Each card drifts on its own so the band never reads as one rigid
      // ring, staggered offsets and durations keep them out of sync.
      gsap.utils.toArray('.ring-card-float').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 ? 26 : -26,
          duration: 2.1 + (i % 4) * 0.55,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.28,
        });
        gsap.to(card, {
          rotationZ: i % 3 === 0 ? 2.4 : -2.4,
          duration: 3.1 + (i % 3) * 0.7,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.19,
        });
      });

      return () => {
        window.removeEventListener('resize', fitTitle);
        window.removeEventListener('pointermove', onPointer);
        rootRef.current?.removeEventListener('pointerleave', onLeave);
        autoTween?.kill();
        gsap.ticker.remove(driftTicker);
        scene.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
    },
    { scope: rootRef },
  );

  return (
    <section className="section hero" ref={rootRef}>
      <div className="ring-scene">
        {/* title lives at z=0 inside the 3D context, cards interleave it */}
        <h1 className="hero-title display" aria-label="Rahul Rao" ref={titleRef}>
          <span className="hero-title-fit">
            {WORDMARK.split('').map((ch, i) => (
              <span className="mask-line" key={i}>
                <span className="mask-inner">
                  {ch === "'" ? <em className="hero-tick">'</em> : ch}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <div className="ring-shadow" aria-hidden="true" />
        <div className="ring-tilt">
          <div className="ring" ref={ringRef}>
            {RING_CARDS.map((card, i) => (
              <article
                className="ring-card"
                key={card.title}
                style={{ '--ry': `${i * CARD_STEP}deg` }}
              >
                <div className="ring-card-float">
                  <div className="ring-card-back" aria-hidden="true" />
                  <div className="ring-card-face">
                    <CardArt shape={card.shape} seed={i} />
                    <div className="ring-card-body">
                      <span className="ring-card-kind">{card.kind}</span>
                      <h3 className="ring-card-name">{card.title}</h3>
                      <p className="ring-card-note">{card.note}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <p className="hero-tagline">
        <span className="mask-line">
          <span className="mask-inner">
            Product Design, Engineering and Design Systems <ArrowDown className="hero-arrow" />
          </span>
        </span>
      </p>

      {/* Where he is now, under what he does. Small, because the line above
          is the claim and this is the evidence for it. */}
      <p className="hero-role">
        <span className="mask-line">
          <span className="mask-inner">
            UX Designer Engineer II at
            <img src="/work/shared/cpp-investments.webp" alt="CPP Investments" />
          </span>
        </span>
      </p>
    </section>
  );
});

export default Hero;
