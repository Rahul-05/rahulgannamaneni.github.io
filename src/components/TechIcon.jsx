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
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
      <path d="M6.5 10h5M9 10v7" />
      <path d="M18.5 11.2c-.5-.8-1.4-1.2-2.3-1.1-1 .1-1.7.8-1.6 1.7.1 1.9 3.9 1.2 4 3.4.1 1.1-.9 1.9-2.1 1.9-1 0-1.9-.4-2.4-1.2" />
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
      <path d="M9 2.8h3v6H9a3 3 0 0 1 0-6Z" />
      <path d="M12 2.8h3a3 3 0 0 1 0 6h-3v-6Z" />
      <path d="M9 8.8h3v6H9a3 3 0 0 1 0-6Z" />
      <path d="M9 14.8h3v3a3 3 0 1 1-3-3Z" />
      <circle cx="15" cy="11.8" r="3" />
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
  storybook: 'Storybook',
  webgl: 'WebGL',
  css: 'CSS',
  node: 'Node',
  postgres: 'Postgres',
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
