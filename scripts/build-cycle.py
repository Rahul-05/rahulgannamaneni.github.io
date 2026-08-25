#!/usr/bin/env python3
"""
Compose the final push cycle strip from both sliced sheets.

Sheet A (push-1..8)  = the original 8 key poses.
Sheet B (pushb-1..8) = the second pass, labelled 1,2,3,4,9,10,11,12.

Pixel comparison showed sheet B re-renders five poses that already exist in
sheet A (B1≈A1, B3≈A3, B9≈A5, B11≈A7, B12≈A8 — mean abs diff 2.5-6.3, versus
23-36 between genuinely different frames). Its real contribution is three new
in-betweens: B2 (lunge/impact), B4 and B10 (driving frames with motion lines).

So the 16-frame timeline below uses every real drawing, ordering them by pose
progression and letting the near-identical pairs sit next to their twin as a
short hold — which is how a push naturally reads, with weight settling at the
extremes rather than a perfectly even step.
"""
import json
from pathlib import Path
from PIL import Image

OUT = Path(__file__).resolve().parent.parent / "public" / "character"

ORDER = [
    "push-1",   # A1  arms extended, back leg straight — top of the cycle
    "pushb-1",  # B1  (hold on the same pose)
    "pushb-2",  # B2  lunge, rear foot lifted, impact lines
    "push-2",   # A2  weight forward
    "push-3",   # A3  mid drive
    "pushb-3",  # B3  (hold)
    "pushb-4",  # B4  driving, motion lines
    "push-4",   # A4  hands planted, leg extended
    "push-5",   # A5  low lean
    "pushb-5",  # B9  (hold)
    "pushb-6",  # B10 driving, motion lines
    "push-6",   # A6  deep lean, rear foot back
    "push-7",   # A7  recovering
    "pushb-7",  # B11 (hold)
    "push-8",   # A8  hands high on the panel
    "pushb-8",  # B12 (hold) — loops back into A1
]


def main():
    frames = [Image.open(OUT / f"{n}.png").convert("RGBA") for n in ORDER]
    fw, fh = frames[0].size
    for n, f in zip(ORDER, frames):
        if f.size != (fw, fh):
            raise SystemExit(f"{n} is {f.size}, expected {(fw, fh)}")

    strip = Image.new("RGBA", (fw * len(frames), fh), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        strip.paste(f, (i * fw, 0))
    strip.save(OUT / "push-cycle.png")

    (OUT / "push-cycle.json").write_text(
        json.dumps({"frames": len(frames), "width": fw, "height": fh, "order": ORDER}, indent=2)
    )
    print(f"push-cycle.png -> {len(frames)} frames of {fw}x{fh} ({strip.size[0]}px wide)")


if __name__ == "__main__":
    main()
