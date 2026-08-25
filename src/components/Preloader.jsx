import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Sprite from './Sprite.jsx';
import FitText from './FitText.jsx';
import { pinToBaseline, restingHeight } from './baseline.js';
import { WORDMARK } from '../data.js';
import './preloader.css';

const PUSH_STRIP = '/character/push-cycle.webp';
const PUSH_FRAMES = 16;

// Opening sequence: a white loader screen with the name set huge behind,
// covered by a black panel. The character sprite loops its 8-frame push
// cycle while the panel grinds off to the right in heaves, revealing the
// name, then the screen lifts into the hero.
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const screenRef = useRef(null);
  const panelRef = useRef(null);
  const charWrapRef = useRef(null);
  const spriteRef = useRef(null);

  useGSAP(
    () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const q = gsap.utils.selector(rootRef);

      // phones get a smaller character so the panel edge and the name
      // both stay on screen; must match .pre-sprite in preloader.css
      const charH = (vw <= 720 ? 0.4 : 0.434) * vh;
      // the pushing palms sit at the very right edge of the trimmed frame
      const charAt = (panelX) => panelX - 0.97 * (charH * 0.72);

      const startX = 0.34 * vw;
      gsap.set(panelRef.current, { x: startX });
      gsap.set(charWrapRef.current, { x: charAt(startX) });

      // the push cycle runs continuously through the whole struggle
      spriteRef.current?.loop({ fps: 18 });

      // Letters sit at their resting heights straight away, the same
      // uneven top edge the hero wordmark holds, so nothing shifts when
      // the loader hands over. Deliberately static: no wave, no growth.
      const chars = q('.pre-ch');
      const seatChars = () => {
        pinToBaseline(gsap, chars);
        chars.forEach((el, i) => gsap.set(el, { scaleY: restingHeight(i) }));
      };
      seatChars();
      document.fonts?.ready.then(seatChars);

      const tl = gsap.timeline({
        onComplete: () => {
          spriteRef.current?.stop();
          onDone?.();
        },
      });

      // one grinding heave, the panel gives, then creeps back
      const shove = (toX, { last = false } = {}) => {
        const travel = last ? 0.7 : 1.0;
        tl.to(panelRef.current, {
          x: toX,
          duration: travel,
          ease: last ? 'power2.in' : 'power1.inOut',
        }).to(
          charWrapRef.current,
          { x: charAt(toX), duration: travel, ease: last ? 'power2.in' : 'power1.inOut' },
          '<',
        );

        if (!last) {
          const back = toX - 0.024 * vw;
          tl.to(panelRef.current, { x: back, duration: 0.34, ease: 'power2.inOut' }, '+=0.05').to(
            charWrapRef.current,
            { x: charAt(back), duration: 0.34, ease: 'power2.inOut' },
            '<',
          );
        }
      };

      // brace: a token shudder before anything moves
      tl.to(panelRef.current, { x: '+=8', duration: 0.25, ease: 'power2.out' }).to(
        panelRef.current,
        { x: '-=8', duration: 0.2, ease: 'power2.inOut' },
      );

      shove(0.58 * vw);
      shove(0.84 * vw);
      shove(1.12 * vw, { last: true });

      // panel is gone, he walks off after it, screen lifts to the hero
      tl.addLabel('exit')
        .to(charWrapRef.current, { x: vw + 80, duration: 0.95, ease: 'power2.in' }, 'exit')
        .to(
          screenRef.current,
          { yPercent: -103, duration: 0.9, ease: 'power3.inOut' },
          'exit+=0.5',
        );
    },
    { scope: rootRef },
  );

  return (
    <div className="preloader" ref={rootRef}>
      <div className="pre-screen" ref={screenRef}>
        {/* one line spanning the full width, exactly like the reference ,
            letters end up different widths, which is the whole point */}
        <div className="pre-name" aria-hidden="true">
          <FitText className="pre-name-line display" scaleY={1.1}>
            {WORDMARK.replace("'", ' ')
              .split('')
              .map((ch, i) => (
                <span className="pre-ch" key={i}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
          </FitText>
        </div>

        <div className="pre-panel" ref={panelRef}>
          <div className="pre-panel-edge" />
        </div>

        <div className="pre-char" ref={charWrapRef}>
          <Sprite
            ref={spriteRef}
            src={PUSH_STRIP}
            frames={PUSH_FRAMES}
            fps={18}
            autoplay={false}
            className="pre-sprite"
          />
        </div>
      </div>
    </div>
  );
}
