import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Justifies one line of display type to span its container exactly.
//
// The naive way is to scaleX the line, but that DISTORTS the letterforms ,
// stems and curves get stretched, and a condensed face ends up wide and
// squat. Instead this drives the variable font's own `wdth` axis (Anybody
// supports 50–150) by binary search, so the type is genuinely redrawn at
// the right width, then applies whatever sub-1% scaleX is left over. Wide
// glyphs stay wide relative to narrow ones, which is the follow.art look.
const AXIS_MIN = 50;
const AXIS_MAX = 150;

export default function FitText({
  children,
  className = '',
  scaleY = 1,
  weight = 900,
  as: Tag = 'div',
}) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const fit = () => {
        const root = rootRef.current;
        const inner = root?.querySelector('.fit-inner');
        if (!inner) return;

        const avail = root.clientWidth;
        if (!avail) return;

        gsap.set(inner, { scaleX: 1, scaleY });

        const widthAt = (wdth) => {
          inner.style.fontVariationSettings = `"wdth" ${wdth}, "wght" ${weight}`;
          return inner.getBoundingClientRect().width;
        };

        // widest setting still narrower than the container
        let lo = AXIS_MIN;
        let hi = AXIS_MAX;
        if (widthAt(AXIS_MAX) <= avail) {
          lo = AXIS_MAX;
        } else if (widthAt(AXIS_MIN) >= avail) {
          lo = AXIS_MIN;
        } else {
          for (let i = 0; i < 14; i += 1) {
            const mid = (lo + hi) / 2;
            if (widthAt(mid) <= avail) lo = mid;
            else hi = mid;
          }
        }

        const natural = widthAt(lo);
        gsap.set(inner, {
          scaleX: natural > 0 ? avail / natural : 1,
          scaleY,
          transformOrigin: 'left top',
        });
      };

      fit();
      document.fonts?.ready.then(fit);
      window.addEventListener('resize', fit);
      return () => window.removeEventListener('resize', fit);
    },
    // NOTE: `children` is deliberately not a dependency, when it is an
    // array of spans the dep list changes length between renders, which
    // React rejects. Re-fitting is covered by the resize + fonts listeners.
    { scope: rootRef },
  );

  return (
    <Tag className={`fit ${className}`} ref={rootRef}>
      <span className="fit-inner">{children}</span>
    </Tag>
  );
}
