// Anchoring a scaleY to "bottom center" looks right but isn't: the bottom of
// an inline box sits BELOW the text baseline by the font's descender, so
// scaling about it swings the glyph's baseline up and down as the letter
// grows. This measures where the real baseline is inside the element and
// returns a transform-origin pinned to it, so letters grow purely upward.
export function baselineOrigin(el) {
  const probe = document.createElement('span');
  // a zero-size inline-block aligns its own bottom margin edge to the
  // parent's baseline, so its top lands exactly on the baseline
  probe.style.cssText =
    'display:inline-block;width:0;height:0;vertical-align:baseline;pointer-events:none;';
  el.appendChild(probe);
  const y = probe.getBoundingClientRect().top - el.getBoundingClientRect().top;
  probe.remove();
  return `center ${y}px`;
}

// Apply it to a set of letters (call again after fonts load / on resize).
export function pinToBaseline(gsap, els) {
  els.forEach((el) => gsap.set(el, { transformOrigin: baselineOrigin(el) }));
}

// Resting height for the nth letter of the wordmark. Two out-of-phase waves
// mean no run of letters shares a height, giving the name an uneven top
// edge. The loader and the hero both read from this, so the wordmark keeps
// the same silhouette across the handoff, the shape you watch during load
// is the shape that stays on screen.
export const restingHeight = (i) => 0.8 + 0.22 * Math.sin(i * 1.9) + 0.11 * Math.sin(i * 0.7 + 1.2);
