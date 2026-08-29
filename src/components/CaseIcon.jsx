// Line icons for the case-study section directory. Simple geometry so they
// stay readable at 16px and inherit currentColor.
const P = {
  grid: (
    <>
      <rect x="3.2" y="3.2" width="7.4" height="7.4" rx="1.6" />
      <rect x="13.4" y="3.2" width="7.4" height="7.4" rx="1.6" />
      <rect x="3.2" y="13.4" width="7.4" height="7.4" rx="1.6" />
      <rect x="13.4" y="13.4" width="7.4" height="7.4" rx="1.6" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3.6 21.4 20H2.6z" />
      <path d="M12 9.6v4.2M12 17.1h.01" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 17.4a6 6 0 1 1 6 0v1.4a1.6 1.6 0 0 1-1.6 1.6h-2.8A1.6 1.6 0 0 1 9 18.8z" />
      <path d="M10 20.8h4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 4.6-9 4.6-9-4.6z" />
      <path d="m3 12.4 9 4.6 9-4.6M3 16.8l9 4.6 9-4.6" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.4h5.6A2.4 2.4 0 0 1 12 6.8v13a2 2 0 0 0-2-2H4z" />
      <path d="M20 4.4h-5.6A2.4 2.4 0 0 0 12 6.8v13a2 2 0 0 1 2-2h6z" />
    </>
  ),
  trend: (
    <>
      <path d="M3 16.6 9 10.4l4 3.8 8-8.4" />
      <path d="M15.6 5.8H21v5.4" />
    </>
  ),
  code: (
    <>
      <path d="m8.4 8-5 4 5 4M15.6 8l5 4-5 4" />
      <path d="m13.6 4.6-3.2 14.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.6 6v6c0 4.4 3.1 7.9 7.4 9.2 4.3-1.3 7.4-4.8 7.4-9.2V6z" />
      <path d="m9.2 12 2 2.1 3.6-4" />
    </>
  ),
  chart: (
    <>
      <path d="M3.6 3.8v14.8a1.6 1.6 0 0 0 1.6 1.6h15.2" />
      <path d="M7.8 16v-3.4M11.6 16V8.6M15.4 16v-5.6M19.2 16V6.4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.6" />
      <path d="m15.6 15.6 4.6 4.6" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.8" rx="7.4" ry="2.9" />
      <path d="M4.6 5.8v12.4c0 1.6 3.3 2.9 7.4 2.9s7.4-1.3 7.4-2.9V5.8" />
      <path d="M4.6 12c0 1.6 3.3 2.9 7.4 2.9s7.4-1.3 7.4-2.9" />
    </>
  ),
  agent: (
    <>
      <rect x="4" y="7.4" width="16" height="11.2" rx="3" />
      <path d="M12 3.4v4M8.6 12.4h.01M15.4 12.4h.01M9.6 15.6c1.4 1.1 3.4 1.1 4.8 0" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.4" r="3.2" />
      <path d="M3.4 19.4a5.6 5.6 0 0 1 11.2 0" />
      <path d="M16.4 6.2a3 3 0 0 1 0 5.8M17.4 14.6a5 5 0 0 1 3.4 4.8" />
    </>
  ),
  eye: (
    <>
      <path d="M2.4 12S5.8 5.8 12 5.8 21.6 12 21.6 12 18.2 18.2 12 18.2 2.4 12 2.4 12z" />
      <circle cx="12" cy="12" r="2.9" />
    </>
  ),
  device: (
    <>
      <rect x="2.6" y="4" width="12" height="9" rx="1.8" />
      <rect x="16" y="9" width="5.4" height="11" rx="1.6" />
      <path d="M6 16.6h5" />
    </>
  ),
  route: (
    <>
      <circle cx="5.6" cy="18.4" r="2.4" />
      <circle cx="18.4" cy="5.6" r="2.4" />
      <path d="M8 18.4h5.6a4.4 4.4 0 0 0 0-8.8h-3.2a4.4 4.4 0 0 1 0-8.8" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.4 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9z" />
    </>
  ),
  overview: (
    <>
      <rect x="3" y="3.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
    </>
  ),
  problem: (
    <>
      <path d="M12 3.2 22 20H2L12 3.2Z" />
      <path d="M12 9.5v4.6M12 17.2h.01" />
    </>
  ),
  research: (
    <>
      <circle cx="10.6" cy="10.6" r="6.9" />
      <path d="M15.6 15.6 21 21" />
    </>
  ),
  insights: (
    <>
      <path d="M9 17.5h6M10 20.6h4" />
      <path d="M12 2.6a6.2 6.2 0 0 0-3.6 11.3c.5.4.8 1 .8 1.6h5.6c0-.6.3-1.2.8-1.6A6.2 6.2 0 0 0 12 2.6Z" />
    </>
  ),
  ideation: (
    <>
      <path d="M4 20.2 3 21l.9-4L15 6a2.3 2.3 0 0 1 3.2 3.2l-11 11-3.2.9Z" />
      <path d="M13.6 7.4l3 3" />
    </>
  ),
  flow: (
    <>
      <rect x="2.6" y="3" width="6.4" height="5" rx="1.4" />
      <rect x="15" y="9.6" width="6.4" height="5" rx="1.4" />
      <rect x="2.6" y="16" width="6.4" height="5" rx="1.4" />
      <path d="M9 5.5h4.2a1.8 1.8 0 0 1 1.8 1.8v2.3M15 14.6h-4.4a1.8 1.8 0 0 0-1.8 1.8v2.1" />
    </>
  ),
  wireframe: (
    <>
      <rect x="2.8" y="3.4" width="18.4" height="17.2" rx="2.2" />
      <path d="M2.8 8.4h18.4M9.4 8.4v12.2" />
    </>
  ),
  system: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="12" cy="4.2" r="2" />
      <circle cx="12" cy="19.8" r="2" />
      <circle cx="4.6" cy="8.2" r="2" />
      <circle cx="19.4" cy="8.2" r="2" />
      <path d="M12 6.2v3.2M12 14.6v3.2M6.4 9.2l3.3 1.8M17.6 9.2l-3.3 1.8" />
    </>
  ),
  prototype: (
    <>
      <rect x="6.4" y="2.6" width="11.2" height="18.8" rx="2.6" />
      <path d="M10.6 18.4h2.8" />
      <path d="M10.4 9.4 13.8 12l-3.4 2.6V9.4Z" />
    </>
  ),
  testing: (
    <>
      <path d="M9.4 2.8v5.6L4.6 17a2.4 2.4 0 0 0 2.1 3.6h10.6a2.4 2.4 0 0 0 2.1-3.6l-4.8-8.6V2.8" />
      <path d="M8.2 2.8h7.6M7.4 14.4h9.2" />
    </>
  ),
  handoff: (
    <>
      <path d="M9 8.6 4.6 12 9 15.4M15 8.6 19.4 12 15 15.4" />
      <path d="M13.4 4.6l-2.8 14.8" />
    </>
  ),
  impact: (
    <>
      <path d="M3.4 17.6l5-5.4 3.6 3 4-4.8 4.6 3.6" />
      <path d="M3.4 20.8h17.2" />
      <circle cx="16" cy="10.4" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  learnings: (
    <>
      <path d="M4 4.4h6a3 3 0 0 1 3 3v12a2.4 2.4 0 0 0-2.4-2.4H4V4.4Z" />
      <path d="M20 4.4h-6a3 3 0 0 0-3 3v12a2.4 2.4 0 0 1 2.4-2.4H20V4.4Z" />
    </>
  ),
};

export default function CaseIcon({ name, className = '' }) {
  const glyph = P[name];
  if (!glyph) return null;
  return (
    <svg
      className={`case-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
    </svg>
  );
}
