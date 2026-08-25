import CaseIcon from './CaseIcon.jsx';

// GSAP frames its section labels in curly braces. This is the same idea in a
// different hand: the section's own icon, the label, and a rule running out
// to the side, so a label reads as the start of a section rather than as a
// quotation. Colour comes from the page's accent.
export default function SectionTag({ children, icon, className = '' }) {
  return (
    <span className={`stag ${className}`}>
      {icon ? (
        <CaseIcon name={icon} className="stag-icon" />
      ) : (
        <span className="stag-mark" aria-hidden="true" />
      )}
      <span className="stag-label">{children}</span>
      <span className="stag-rule" aria-hidden="true" />
    </span>
  );
}
