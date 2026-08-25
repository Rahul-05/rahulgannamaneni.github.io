// Cover art for the hero cards. Every drawing is chosen to MEAN its skill ,
// nothing here is random decoration:
//
//   layers    stacked planes       , a product built up in layers
//   bridge    two forms joined     , design and code linked
//   modules   grid with one accent , a system of interchangeable parts
//   ripple    rings from a tap     , feedback radiating from an input
//   easing    an ease curve + dot  , motion described by its timing curve
//   lens      a lens over a subject, looking closely at people
//   tokens    a repeating scale    , one value reused everywhere
//   wireframe outline before fill  , the rough proof before the real thing
//   brackets  two chevrons         , code
//   mixing    overlapping colour   , visual craft
//
// Fills are soft within-family gradients from gsap.com's palette, with a
// fine grain (feTurbulence at high frequency, low alpha) so they read as
// printed rather than speckled.

const GRADS = {
  green: ['#abff84', '#0ae448'],
  emerald: ['#0ae448', '#00bae2'],
  blue: ['#bef3fe', '#00bae2'],
  lilac: ['#d2ceff', '#9d95ff'],
  pink: ['#fec5fb', '#f100cb'],
  orange: ['#ffd9b0', '#ff8709'],
  violet: ['#f7bdf8', '#9d95ff'],
};

const SHAPE_TONE = {
  layers: 'emerald',
  bridge: 'blue',
  modules: 'lilac',
  ripple: 'pink',
  easing: 'green',
  lens: 'blue',
  tokens: 'violet',
  wireframe: 'orange',
  brackets: 'emerald',
  mixing: 'pink',
};

function drawing(shape, fill, accent) {
  switch (shape) {
    // three planes stacked into a product
    case 'layers':
      return (
        <g>
          <rect x="22" y="52" width="56" height="16" rx="8" fill={fill} opacity="0.45" />
          <rect x="26" y="38" width="48" height="16" rx="8" fill={fill} opacity="0.72" />
          <rect x="30" y="24" width="40" height="16" rx="8" fill={fill} />
        </g>
      );

    // two forms held together by a span
    case 'bridge':
      return (
        <g>
          <rect x="14" y="34" width="24" height="32" rx="10" fill={fill} />
          <rect x="62" y="34" width="24" height="32" rx="10" fill={fill} />
          <rect x="34" y="45" width="32" height="10" rx="5" fill={accent} />
        </g>
      );

    // a grid of identical parts, one swapped out
    case 'modules':
      return (
        <g>
          <rect x="22" y="22" width="24" height="24" rx="7" fill={fill} />
          <rect x="54" y="22" width="24" height="24" rx="7" fill={fill} opacity="0.5" />
          <rect x="22" y="54" width="24" height="24" rx="7" fill={fill} opacity="0.5" />
          <circle cx="66" cy="66" r="12" fill={accent} />
        </g>
      );

    // feedback radiating out from a press
    case 'ripple':
      return (
        <g>
          <circle cx="50" cy="50" r="30" fill="none" stroke={fill} strokeWidth="3" opacity="0.35" />
          <circle cx="50" cy="50" r="21" fill="none" stroke={fill} strokeWidth="4" opacity="0.6" />
          <circle cx="50" cy="50" r="12" fill={fill} />
          <circle cx="50" cy="50" r="5" fill={accent} />
        </g>
      );

    // the timing curve that defines a motion, with the moving dot on it
    case 'easing':
      return (
        <g>
          <path
            d="M18 78 C42 78 58 22 82 22"
            fill="none"
            stroke={fill}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <circle cx="18" cy="78" r="5" fill={fill} opacity="0.5" />
          <circle cx="82" cy="22" r="9" fill={accent} />
        </g>
      );

    // a lens held over a subject
    case 'lens':
      return (
        <g>
          <circle cx="46" cy="45" r="24" fill={fill} opacity="0.35" />
          <circle cx="46" cy="45" r="24" fill="none" stroke={fill} strokeWidth="5" />
          <circle cx="46" cy="45" r="9" fill={accent} />
          <rect
            x="62"
            y="62"
            width="22"
            height="9"
            rx="4.5"
            fill={fill}
            transform="rotate(45 62 62)"
          />
        </g>
      );

    // one value, reused at every size
    case 'tokens':
      return (
        <g>
          <circle cx="24" cy="50" r="6" fill={fill} opacity="0.45" />
          <circle cx="40" cy="50" r="9" fill={fill} opacity="0.65" />
          <circle cx="60" cy="50" r="13" fill={fill} />
          <circle cx="60" cy="50" r="5" fill={accent} />
        </g>
      );

    // an outline standing in for the finished thing
    case 'wireframe':
      return (
        <g>
          <rect
            x="20"
            y="24"
            width="60"
            height="52"
            rx="10"
            fill="none"
            stroke={fill}
            strokeWidth="4"
            strokeDasharray="9 7"
          />
          <rect x="29" y="34" width="26" height="10" rx="5" fill={accent} />
          <rect x="29" y="50" width="42" height="7" rx="3.5" fill={fill} opacity="0.55" />
          <rect x="29" y="61" width="32" height="7" rx="3.5" fill={fill} opacity="0.35" />
        </g>
      );

    // code
    case 'brackets':
      return (
        <g fill="none" stroke={fill} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M38 30 L20 50 L38 70" />
          <path d="M62 30 L80 50 L62 70" stroke={accent} />
        </g>
      );

    // colour laid over colour
    default:
      return (
        <g>
          <circle cx="40" cy="42" r="20" fill={fill} opacity="0.85" />
          <circle cx="60" cy="42" r="20" fill={accent} opacity="0.7" />
          <circle cx="50" cy="60" r="20" fill={fill} opacity="0.55" />
        </g>
      );
  }
}

export default function CardArt({ shape = 'layers', seed = 0, className = '' }) {
  const uid = `ca${seed}`;
  const tone = GRADS[SHAPE_TONE[shape] || 'emerald'];

  return (
    <svg
      className={`card-art ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}f`} x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={tone[0]} />
          <stop offset="100%" stopColor={tone[1]} />
        </linearGradient>
        <linearGradient id={`${uid}a`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor={tone[1]} />
          <stop offset="100%" stopColor={tone[0]} />
        </linearGradient>
        {/* fine print grain, not speckle: high frequency, low alpha */}
        <filter id={`${uid}g`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2.7"
            numOctaves="1"
            seed={seed + 3}
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0"
            result="grain"
          />
          <feComposite in="grain" in2="SourceGraphic" operator="in" result="clipped" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="clipped" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${uid}g)`}>{drawing(shape, `url(#${uid}f)`, `url(#${uid}a)`)}</g>
    </svg>
  );
}
