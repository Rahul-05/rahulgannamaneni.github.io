import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';

// Frame-based sprite player. Renders one horizontal strip and steps
// background-position, so playback is a single composited layer (no
// per-frame DOM swaps) and GSAP can scrub, loop, ping-pong or hold any
// frame the animation needs.
const Sprite = forwardRef(function Sprite(
  { src, frames = 8, fps = 12, autoplay = true, className = '', style },
  ref,
) {
  const elRef = useRef(null);
  const state = useRef({ i: 0 });
  const loopRef = useRef(null);
  const [ratio, setRatio] = useState(null);

  // learn the frame aspect from the strip itself
  useEffect(() => {
    const img = new Image();
    img.onload = () => setRatio(img.naturalWidth / frames / img.naturalHeight);
    img.src = src;
  }, [src, frames]);

  const show = (i) => {
    state.current.i = i;
    const step = frames > 1 ? (i % frames) / (frames - 1) : 0;
    gsap.set(elRef.current, { backgroundPositionX: `${step * 100}%` });
  };

  useImperativeHandle(ref, () => ({
    el: () => elRef.current,
    frame: (i) => show(i),

    // continuous cycle, returns the tween so callers can pause/kill it
    loop({ fps: f = fps, from = 0, to = frames - 1 } = {}) {
      loopRef.current?.kill();
      const o = { v: from };
      loopRef.current = gsap.to(o, {
        v: to + 1,
        duration: (to - from + 1) / f,
        ease: 'none',
        repeat: -1,
        onUpdate: () => show(Math.floor(o.v) % frames),
      });
      return loopRef.current;
    },

    // play the cycle exactly once
    once({ fps: f = fps } = {}) {
      loopRef.current?.kill();
      const o = { v: 0 };
      loopRef.current = gsap.to(o, {
        v: frames,
        duration: frames / f,
        ease: 'none',
        onUpdate: () => show(Math.min(frames - 1, Math.floor(o.v))),
      });
      return loopRef.current;
    },

    stop() {
      loopRef.current?.kill();
      loopRef.current = null;
    },
  }));

  useEffect(() => {
    show(0);
    if (!autoplay) return undefined;
    const o = { v: 0 };
    loopRef.current = gsap.to(o, {
      v: frames,
      duration: frames / fps,
      ease: 'none',
      repeat: -1,
      onUpdate: () => show(Math.floor(o.v) % frames),
    });
    return () => loopRef.current?.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, frames, fps, autoplay]);

  return (
    <div
      ref={elRef}
      className={`sprite ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: `${frames * 100}% 100%`,
        backgroundRepeat: 'no-repeat',
        ['--sprite-ratio']: ratio ?? 0.72,
        ...style,
      }}
      aria-hidden="true"
    />
  );
});

export default Sprite;
