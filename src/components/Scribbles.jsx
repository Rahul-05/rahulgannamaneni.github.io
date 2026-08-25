// Hand-drawn SVG accents, rough marker strokes used across sections.

export function CircleScribble({ className, color = '#0ae448' }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" aria-hidden="true">
      <path
        d="M215 38c-62-9-136 18-164 74-30 60-8 143 48 178 62 39 154 30 205-22 48-49 55-133 14-187-34-45-100-62-155-49-48 11-92 44-105 92-14 51 6 110 48 141 47 35 116 36 165 5 44-28 68-83 57-134-10-46-49-84-95-93"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M228 60c-55-12-118 9-146 57-27 46-14 110 27 143 48 39 124 37 169-6 41-39 49-107 14-152"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function StarScribble({ className, color = '#000' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path
        d="M60 8 L72 44 L110 46 L80 68 L92 106 L60 84 L28 106 L40 68 L10 46 L48 44 Z"
        stroke={color}
        strokeWidth="6"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M60 22 L69 48 L96 50 L74 66 L83 94 L60 78 L37 94 L46 66 L24 50 L51 48 Z"
        stroke={color}
        strokeWidth="4"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function SprayX({ className, color = '#f100cb' }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" aria-hidden="true">
      <path
        d="M52 60 C120 130 280 300 348 352"
        stroke={color}
        strokeWidth="58"
        strokeLinecap="round"
      />
      <path
        d="M348 62 C270 138 122 292 54 350"
        stroke={color}
        strokeWidth="58"
        strokeLinecap="round"
      />
      <path
        d="M70 48 C140 120 290 288 356 338"
        stroke={color}
        strokeWidth="20"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M332 50 C258 130 118 280 60 336"
        stroke={color}
        strokeWidth="20"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function LoopOval({ className, color = '#0e100f' }) {
  return (
    <svg className={className} viewBox="0 0 300 130" fill="none" aria-hidden="true">
      <path
        d="M150 22 C70 18 14 42 16 68 c2 28 66 44 140 42 74-2 132-22 130-50-2-26-62-42-128-40-58 2-108 18-118 40"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path d="M28 96 c-8 8 -14 16 -12 24" stroke={color} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowCurl({ className, color = '#000' }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="none" aria-hidden="true">
      <path d="M6 14 C40 40 78 48 108 40" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <path
        d="M92 28 L110 40 L88 50"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ArrowDown({ className, color = '#fffce1' }) {
  return (
    <svg className={className} viewBox="0 0 40 44" fill="none" aria-hidden="true">
      <path d="M8 6 C20 14 26 26 24 38" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path
        d="M14 30 L24 39 L32 26"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Sparkle({ className, color = '#0ae448' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <path
        d="M60 6 C64 34 70 44 96 52 68 60 62 68 60 98 56 68 50 60 24 52 50 44 56 34 60 6 Z"
        fill={color}
      />
      <path
        d="M96 78 c2 12 5 16 16 20 -11 4 -14 8 -16 20 -2 -12 -5 -16 -16 -20 11 -4 14 -8 16 -20 Z"
        fill={color}
      />
    </svg>
  );
}

export function ScribbleBall({ className, color = '#3a2418' }) {
  return (
    <svg className={className} viewBox="0 0 160 120" fill="none" aria-hidden="true">
      {[
        'M20 90 C50 40 120 30 140 60',
        'M16 76 C60 26 126 44 138 78',
        'M30 100 C46 56 116 40 146 68',
        'M24 64 C70 20 130 56 130 92',
        'M40 104 C40 60 104 28 150 56',
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          opacity={0.85 - i * 0.1}
        />
      ))}
    </svg>
  );
}
