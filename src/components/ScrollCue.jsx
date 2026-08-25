import './scrollCue.css';

// The cue at the foot of every section, telling you where down goes.
//
// The page has no scrollbar -- it is a virtual engine over fixed panels -- so
// there is nothing on screen saying the page is longer than the window. On a
// normal site the scrollbar does that job for free; here it has to be drawn.
//
// It names the destination rather than saying "next section", because "next"
// tells you there is more and nothing about whether you want it. Naming it
// turns a nudge into navigation, which is also why the whole thing is a
// button: reading the label and then having to find the gesture would be a
// worse outcome than not showing it.
//
// The section labels live here rather than coming from NAV_LINKS, because the
// nav deliberately omits Testimonials -- it is something you come across, not
// a destination -- and the cue has to name every section honestly.
const LABELS = ['Home', 'Work', 'Interaction & Animation', 'About', 'Testimonials', 'Contact'];

export default function ScrollCue({ index, total, dark, onGo }) {
  const next = LABELS[index + 1];
  // Not on the hero: that screen already has an arrow under the tagline
  // saying the same thing, and two of them is one too many.
  if (!next || index === 0 || index >= total - 1) return null;

  return (
    <button
      className={`cue ${dark ? 'cue--dark' : ''}`}
      onClick={onGo}
      // the label already reads as a sentence; the arrow is decoration
      aria-label={`Scroll to ${next}`}
    >
      <span className="cue-arrow" aria-hidden="true">
        {/* a short stem and a wide head, rather than a long thin line */}
        <svg viewBox="0 0 18 15">
          <path d="M9 2v8M3.5 7.5 9 13l5.5-5.5" />
        </svg>
      </span>

      <span className="cue-label">
        <em>Scroll to</em>
        {next}
      </span>
    </button>
  );
}
