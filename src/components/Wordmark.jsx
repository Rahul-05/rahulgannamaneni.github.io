import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { pinToBaseline, restingHeight } from './baseline.js';
import './wordmark.css';

// A giant display line that spans its container exactly and gives every
// letter its own height, so the top edge is uneven rather than a solid slab.
//
// Width is fitted by driving the variable font's own `wdth` axis (Anybody
// runs 50–150) rather than stretching with scaleX, so the letterforms stay
// undistorted. Heights scale about each glyph's measured baseline, so the
// feet stay planted while the tops move. With `cursor`, letters near the
// pointer stretch and settle back as it passes.
const AXIS_MIN = 50;
const AXIS_MAX = 150;

export default function Wordmark({
  text,
  className = '',
  cursor = false,
  // `vary` off gives plain, even letters, still fitted edge to edge, just
  // without the uneven top edge. Use it where the type should stay calm.
  vary = true,
  reach = 0.34,
  lift = 0.78,
}) {
  const rootRef = useRef(null);
  const chars = [...text];

  useGSAP(
    () => {
      const root = rootRef.current;
      const fit = root.querySelector('.wm-fit');
      const letters = gsap.utils.toArray(root.querySelectorAll('.wm-ch'));

      const contentWidth = () => {
        const cs = getComputedStyle(root);
        return (
          root.clientWidth - parseFloat(cs.paddingLeft || 0) - parseFloat(cs.paddingRight || 0)
        );
      };

      const fitWidth = () => {
        const avail = contentWidth();
        if (!avail) return;
        gsap.set(fit, { scaleX: 1 });
        const widthAt = (wdth) => {
          fit.style.fontVariationSettings = `"wdth" ${wdth}, "wght" 900`;
          return fit.getBoundingClientRect().width;
        };
        let lo = AXIS_MIN;
        let hi = AXIS_MAX;
        if (widthAt(AXIS_MAX) <= avail) lo = AXIS_MAX;
        else if (widthAt(AXIS_MIN) >= avail) lo = AXIS_MIN;
        else {
          for (let i = 0; i < 14; i += 1) {
            const mid = (lo + hi) / 2;
            if (widthAt(mid) <= avail) lo = mid;
            else hi = mid;
          }
        }
        const natural = widthAt(lo);
        if (natural > 0) {
          gsap.set(fit, { scaleX: avail / natural, transformOrigin: 'left bottom' });
        }
      };

      // 9 letters (the wordmark this was tuned on) keeps the full swing;
      // longer words get progressively less so the glyphs stay legible
      const amp = vary ? gsap.utils.clamp(0.42, 1, 9 / letters.length) : 0;
      const restH = letters.map((_, i) => 1 + (restingHeight(i) - 1) * amp);
      const seat = () => {
        pinToBaseline(gsap, letters);
        letters.forEach((el, i) => gsap.set(el, { scaleY: restH[i] }));
      };

      fitWidth();
      seat();
      document.fonts?.ready.then(() => {
        fitWidth();
        seat();
      });

      const onResize = () => {
        fitWidth();
        seat();
      };
      window.addEventListener('resize', onResize);

      // A touch device has no cursor to follow, so the skyline drives itself:
      // a peak travels back and forth across the word on a loop, giving the
      // same shifting-height read that hovering gives on desktop.
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      let onMove;
      let onLeave;
      let autoTween;

      if (cursor && vary && !finePointer) {
        // Sets scaleY directly: driving quickTo setters from inside another
        // tween's onUpdate nests updates within the root loop and the values
        // diverge. This tween already interpolates on its own.
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
              const d = Math.abs(head.at - pos) / reach;
              const pull = Math.max(0, 1 - d);
              gsap.set(letters[i], { scaleY: restH[i] + lift * amp * pull * pull });
            });
          },
        });
      } else if (cursor && vary) {
        const setH = letters.map((el) =>
          gsap.quickTo(el, 'scaleY', { duration: 0.55, ease: 'power3' }),
        );
        onMove = (e) => {
          const box = root.getBoundingClientRect();
          letters.forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const d = Math.abs(e.clientX - cx) / (box.width * reach);
            const pull = Math.max(0, 1 - d);
            setH[i](restH[i] + lift * amp * pull * pull);
          });
        };
        onLeave = () => letters.forEach((_, i) => setH[i](restH[i]));
        window.addEventListener('pointermove', onMove);
        root.addEventListener('pointerleave', onLeave);
      }

      return () => {
        window.removeEventListener('resize', onResize);
        if (onMove) window.removeEventListener('pointermove', onMove);
        if (onLeave) root.removeEventListener('pointerleave', onLeave);
        autoTween?.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <div className={`wm ${className}`} ref={rootRef} aria-label={text}>
      <span className="wm-fit" aria-hidden="true">
        {chars.map((ch, i) => (
          <span className="wm-ch" key={i}>
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </div>
  );
}
