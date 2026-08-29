// Small monochrome glyphs for the stack and role chips. Drawn as simple
// geometry rather than copied brand assets, they read at 14px and inherit
// currentColor, which brand SVGs generally don't.
const P = {
  react: (
    <>
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
    </>
  ),
  typescript: (
    <>
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="2.6" />
      <path d="M6.2 10.6h5.2M8.8 10.6v7" />
      <path d="M18.6 11.4c-.5-.7-1.3-1-2.1-.9-.9.1-1.6.7-1.5 1.6.1 1.7 3.6 1.1 3.7 3.1.1 1-.9 1.8-2 1.8-.9 0-1.7-.4-2.2-1" />
    </>
  ),
  gsap: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.8c-1-.9-2.3-1.3-3.6-1.1-2.3.3-3.8 2.3-3.5 4.6.3 2.1 2.2 3.6 4.3 3.4 1.6-.2 2.8-1.3 3.1-2.8h-3" />
    </>
  ),
  figma: (
    <>
      <path d="M8.8 2.6h3.2v4.7H8.8a2.35 2.35 0 0 1 0-4.7z" />
      <path d="M12 2.6h3.2a2.35 2.35 0 0 1 0 4.7H12z" />
      <path d="M8.8 7.3H12V12H8.8a2.35 2.35 0 0 1 0-4.7z" />
      <path d="M8.8 12H12v4.7H8.8a2.35 2.35 0 0 1 0-4.7z" />
      <circle cx="15.2" cy="9.65" r="2.35" />
    </>
  ),
  storybook: (
    <>
      <path d="M5 3.5h14v17l-7-2.4-7 2.4v-17Z" />
      <path d="M9.5 7.5h5" />
    </>
  ),
  webgl: (
    <>
      <path d="M12 3 22 19H2L12 3Z" />
      <path d="M12 9.5 17 18H7l5-8.5Z" />
    </>
  ),
  css: (
    <>
      <path d="M8.5 4 6.5 20l5.5 1.5L17.5 20 15.5 4h-7Z" />
      <path d="M15.5 8.5h-7l.5 4h6l-.5 4-2.5.8-2.5-.8" />
    </>
  ),
  node: (
    <>
      <path d="M12 2.6 21 7.5v9L12 21.4 3 16.5v-9L12 2.6Z" />
      <path d="M9.5 15c.4.7 1.3 1.1 2.4 1.1 1.5 0 2.4-.6 2.4-1.6 0-2.2-4.6-1-4.6-3.4 0-1 .9-1.7 2.3-1.7 1 0 1.8.3 2.2.9" />
    </>
  ),
  postgres: (
    <>
      <ellipse cx="12" cy="7" rx="7.5" ry="3.4" />
      <path d="M4.5 7v10c0 1.9 3.4 3.4 7.5 3.4s7.5-1.5 7.5-3.4V7" />
      <path d="M4.5 12.2c0 1.9 3.4 3.4 7.5 3.4s7.5-1.5 7.5-3.4" />
    </>
  ),
  angular: (
    <>
      <path d="M12 2.4 3.2 5.5l1.35 11.7L12 21.6l7.45-4.4L20.8 5.5z" />
      <path d="M8.7 15.1 12 7.1l3.3 8M9.9 12.9h4.2" />
    </>
  ),
  'figma-make': (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 7.4 13.3 10.7 16.6 12l-3.3 1.3L12 16.6l-1.3-3.3L7.4 12l3.3-1.3z" />
    </>
  ),
  aws: (
    <>
      <path d="M4.2 10.3c1 .6 2.3 1 3.5.9M4.2 8v3.6M4.2 8c0-.8.9-1.3 1.9-1.3s1.8.5 1.8 1.3v3.7" />
      <path d="M10.4 7.6 11.9 12l1.5-4.4L14.9 12l1.5-4.4" />
      <path d="M18.6 11.4c.6.4 1.4.5 2 .2.7-.3.8-1.1.2-1.5-.9-.6-2.3-.4-2.3-1.5 0-.7.8-1.1 1.6-1 .5 0 .9.2 1.2.4" />
      <path d="M3 16.4c4.4 2.6 11.6 2.9 17 .6" />
      <path d="M18.8 16.2c1.8-.6 2.6-.3 2 1.2" />
    </>
  ),
  neptune: (
    <>
      <circle cx="12" cy="4.9" r="2.1" />
      <circle cx="5.2" cy="16.2" r="2.1" />
      <circle cx="18.8" cy="16.2" r="2.1" />
      <circle cx="12" cy="12.2" r="2.3" />
      <path d="M12 7v2.9M10.1 13.5 6.9 15.1M13.9 13.5l3.2 1.6M7.3 16.2h9.4" />
    </>
  ),
  dynamodb: (
    <>
      <ellipse cx="12" cy="5.6" rx="7.4" ry="2.8" />
      <path d="M4.6 5.6v12.8c0 1.55 3.3 2.8 7.4 2.8s7.4-1.25 7.4-2.8V5.6" />
      <path d="M4.6 12c0 1.55 3.3 2.8 7.4 2.8s7.4-1.25 7.4-2.8" />
      <path d="m10.4 9.4 2.6 2.6-2.6 2.6" />
    </>
  ),
  quicksight: (
    <>
      <rect x="2.6" y="3.6" width="18.8" height="13.6" rx="2.3" />
      <path d="M6.6 13.6v-2.7M10.2 13.6V8.2M13.8 13.6v-4M17.4 13.6V6.6" />
      <path d="M8.6 20.4h6.8M12 17.2v3.2" />
    </>
  ),
  miro: (
    <>
      <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="3.4" />
      <path d="M7.6 17V9.6l2.9 2v-4l2.9 2v-3.6l2.9 2V17" />
    </>
  ),
  cad: (
    <>
      <path d="M12 2.8 20.4 7.4v9.2L12 21.2 3.6 16.6V7.4z" />
      <path d="M3.6 7.4 12 12l8.4-4.6M12 12v9.2" />
    </>
  ),
  prototype: (
    <>
      <rect x="3" y="4" width="7" height="6" rx="1.6" />
      <rect x="14" y="14" width="7" height="6" rx="1.6" />
      <path d="M10 7h3.2a2 2 0 0 1 2 2v3.4" />
      <path d="m13.6 11.2 1.6 1.8 1.7-1.8" />
    </>
  ),
  'design-system': (
    <>
      <rect x="3.2" y="3.2" width="7.2" height="7.2" rx="1.7" />
      <rect x="13.6" y="3.2" width="7.2" height="7.2" rx="3.6" />
      <rect x="3.2" y="13.6" width="7.2" height="7.2" rx="3.6" />
      <rect x="13.6" y="13.6" width="7.2" height="7.2" rx="1.7" />
    </>
  ),
  resume: (
    <>
      <path d="M14 2.8H7a2.2 2.2 0 0 0-2.2 2.2v14a2.2 2.2 0 0 0 2.2 2.2h10a2.2 2.2 0 0 0 2.2-2.2V8L14 2.8Z" />
      <path d="M14 2.8V8h5.2" />
      <path d="M8.4 12.6h7.2M8.4 16.2h4.8" />
    </>
  ),

  // ── role glyphs ──
  design: (
    <>
      <path d="M4 20.2 3 21l.8-4 11-11a2.3 2.3 0 0 1 3.3 3.3l-11 11-3.1.9Z" />
      <path d="M13.5 6.5l4 4" />
    </>
  ),
  frontend: (
    <>
      <rect x="2.6" y="4" width="18.8" height="16" rx="2.4" />
      <path d="M2.6 8.6h18.8" />
      <path d="M5.6 6.3h.01M8.1 6.3h.01" />
      <path d="M9.5 12.6 7.4 14.7l2.1 2.1M14.5 12.6l2.1 2.1-2.1 2.1" />
    </>
  ),
  backend: (
    <>
      <rect x="3" y="3.4" width="18" height="6" rx="2" />
      <rect x="3" y="14.6" width="18" height="6" rx="2" />
      <path d="M6.6 6.4h.01M6.6 17.6h.01" />
    </>
  ),
  research: (
    <>
      <circle cx="10.6" cy="10.6" r="6.9" />
      <path d="M15.6 15.6 21 21" />
    </>
  ),
  motion: (
    <>
      <path d="M2.6 18C7 18 8 6 12.5 6S19 13 21.4 13" />
      <circle cx="21.4" cy="13" r="1.9" fill="currentColor" stroke="none" />
    </>
  ),
};

export const TECH_LABEL = {
  react: 'React',
  typescript: 'TypeScript',
  gsap: 'Motion',
  figma: 'Figma',
  'figma-make': 'Figma Make',
  storybook: 'Storybook',
  webgl: 'WebGL',
  css: 'CSS',
  node: 'Node',
  postgres: 'Postgres',
  angular: 'Angular',
  aws: 'AWS',
  neptune: 'Neptune Analytics',
  dynamodb: 'DynamoDB',
  quicksight: 'QuickSight',
  miro: 'Miro',
  cad: 'CAD',
  prototype: 'Prototyping',
  'design-system': 'Design system',
};

export default function TechIcon({ name, className = '' }) {
  const glyph = P[name];
  if (!glyph) return null;
  return (
    <svg
      className={`tech-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}
