// Pointer capture keeps a gesture alive when the cursor leaves the element,
// which every drag here depends on. It throws if the pointer has already
// been released -- a fast flick, a cancelled touch -- and losing capture is
// survivable where an exception mid-gesture is not.
export default function capture(e) {
  try {
    e.currentTarget.setPointerCapture(e.pointerId);
  } catch {
    /* the gesture still works, it just ends if the pointer leaves */
  }
}
