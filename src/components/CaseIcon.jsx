// Line icons for the case-study section directory. Simple geometry so they
// stay readable at 16px and inherit currentColor.
const P = {
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
