// The page has no native scroll -- a window-level Observer calls
// preventDefault on every wheel and touch so the virtual engine can drive the
// sections. Anything that opens over the top and wants ordinary scrolling has
// to switch that off, and GSAP's `ignore` option is not dependable enough to
// bet a scrollbar on.
//
// So overlays announce themselves here and App tears the Observer down while
// one is up. A three-line store rather than context, because App is above the
// overlay in the tree and the overlay is mounted through a portal.
let open = 0;
const subs = new Set();

export function pushOverlay() {
  open += 1;
  subs.forEach((f) => f(open > 0));
  return () => {
    open = Math.max(0, open - 1);
    subs.forEach((f) => f(open > 0));
  };
}

export function onOverlay(fn) {
  subs.add(fn);
  fn(open > 0);
  return () => subs.delete(fn);
}
