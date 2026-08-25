import { useId } from 'react';
import './ClaudeMark.css';

// The Claude character, redrawn as pixel geometry.
//
// Reproduced by eye from the reference Rahul supplied -- the artwork is all
// axis-aligned rectangles, so it rebuilds exactly, but if the real asset ever
// lands in public/ this should be swapped for it rather than kept as a copy.
//
// Built through a mask rather than as one even-odd path, because the eyes
// have to animate: as holes in a path they could only ever be static, and a
// character that never blinks is a sticker. The mask also means the shape
// carries no background of its own, so it sits correctly on the black island
// and on the translucent notification rows alike.
//
// Coordinates are the measured proportions of the reference in a 0-100 box.
const BODY = [23.8, 29.5, 52.2, 35.3];
const ARM_L = [14.8, 47.0, 9.0, 9.1];
const ARM_R = [76.0, 47.0, 9.0, 9.1];
const LEGS = [
  [27.9, 64.8, 4.4, 8.6],
  [36.7, 64.8, 4.1, 8.6],
  [59.1, 64.8, 4.1, 8.6],
  [67.9, 64.8, 4.4, 8.6],
];
const EYES = [
  [32.7, 38.3, 4.1, 9.0],
  [63.3, 38.3, 4.1, 9.0],
];

const box = ([x, y, w, h], props = {}) => (
  <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} {...props} />
);

export default function ClaudeMark({ size = 26, busy = false, tint = '#D97757' }) {
  const id = useId().replace(/:/g, '');

  return (
    <svg
      className={`cmark ${busy ? 'is-busy' : ''}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <mask id={`cm-${id}`}>
        {box(BODY, { fill: '#fff' })}
        {box(ARM_L, { fill: '#fff' })}
        {box(ARM_R, { fill: '#fff' })}
        {LEGS.map((l, i) => box(l, { fill: '#fff', className: `cmark-leg cmark-leg--${i}` }))}
        {EYES.map((e) => box(e, { fill: '#000', className: 'cmark-eye' }))}
      </mask>

      <g className="cmark-body">
        <rect x="0" y="0" width="100" height="100" fill={tint} mask={`url(#cm-${id})`} />
      </g>
    </svg>
  );
}
