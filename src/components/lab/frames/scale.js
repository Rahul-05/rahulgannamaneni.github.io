// Every piece is authored at real device dimensions -- 390x844 for the phone,
// 1180x740 for the browser -- and the frame scales the whole surface down to
// whatever space it lands in. That keeps the code honest: a 17px iOS label is
// written as 17px, and layout numbers can be ported straight out of Figma or
// Xcode without a second set of values for the small preview.
//
// The cost is that pointer deltas arrive in scaled pixels while thresholds
// are written in device points, so anything doing drag maths has to convert.
//
// A React context cannot supply this. A piece renders its own frame, so the
// piece sits ABOVE the frame's provider in the tree and would only ever read
// the default -- which is exactly the bug this replaced. Reading it off the
// DOM works from anywhere and is exact: offsetWidth is layout pixels,
// getBoundingClientRect is what ended up on screen, and the ratio between
// them is every transform in between.
export function scaleOf(el) {
  if (!el) return 1;
  const w = el.offsetWidth;
  if (!w) return 1;
  const s = el.getBoundingClientRect().width / w;
  return s > 0.0001 ? s : 1;
}
