#!/usr/bin/env python3
"""
Slice the 8-frame push sheet into transparent, frame-aligned sprites.

  python3 scripts/slice-sprites.py <sheet.jpg> [--cols 4] [--rows 2]

Output (public/character/):
  push-1.png … push-8.png   individual frames
  push-strip.png            one horizontal strip for stepped playback
  push.json                 frame size + count metadata

Notes on the tricky bits:
  * panels are cut on an even grid, then inset to drop the drawn border and
    the index number in the corner
  * the page white is removed by flood-filling inward from the panel edges,
    so white areas INSIDE the character (sneakers, hands) stay opaque
  * several panels include a drawn "wall" line; it is the only dark shape
    spanning top edge to bottom edge, so it is isolated by connected-component
    labelling and erased — the wall is a real DOM element on the site
  * all frames are cropped to one shared bounding box so the character does
    not jitter between frames while looping
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "character"

WHITE_CUTOFF = 228     # >= this on every channel counts as page white
DARK_CUTOFF = 120      # <= this mean value counts as ink
BORDER_FRAC = 0.55     # a row/col this dark end-to-end is a drawn panel border
EDGE_TOL = 0.03        # "touching" the top/bottom edge, as a fraction of height
KEEP_FRAC = 0.05       # drop blobs smaller than this share of the biggest one


def flood_background(arr):
    """Boolean mask of page white reachable from the panel border."""
    h, w = arr.shape[:2]
    white = np.all(arr >= WHITE_CUTOFF, axis=2)

    reached = np.zeros((h, w), bool)
    frontier = np.zeros((h, w), bool)
    frontier[0, :] = white[0, :]
    frontier[-1, :] = white[-1, :]
    frontier[:, 0] = white[:, 0]
    frontier[:, -1] = white[:, -1]
    reached |= frontier

    # iterative dilation constrained to white — converges in a few dozen passes
    while frontier.any():
        grown = np.zeros((h, w), bool)
        grown[1:, :] |= reached[:-1, :]
        grown[:-1, :] |= reached[1:, :]
        grown[:, 1:] |= reached[:, :-1]
        grown[:, :-1] |= reached[:, 1:]
        frontier = grown & white & ~reached
        reached |= frontier
    return reached


def crop_to_border(arr):
    """Find the drawn panel rectangle and return the region just inside it."""
    h, w = arr.shape[:2]
    dark = arr.mean(axis=2) <= DARK_CUTOFF
    colf, rowf = dark.mean(axis=0), dark.mean(axis=1)

    def scan(frac, lo, hi, reverse=False):
        idx = range(hi - 1, lo - 1, -1) if reverse else range(lo, hi)
        for i in idx:
            if frac[i] > BORDER_FRAC:
                return i
        return hi - 1 if reverse else lo

    left = scan(colf, 0, int(w * 0.25)) + 3
    right = scan(colf, int(w * 0.75), w, reverse=True) - 2
    top = scan(rowf, 0, int(h * 0.25)) + 3
    bottom = scan(rowf, int(h * 0.75), h, reverse=True) - 2
    return arr[top:bottom, left:right]


def keep_main_blobs(alpha):
    """Drop the panel index digit and any stray specks."""
    labels, n = label_components(alpha > 0)
    if n <= 1:
        return alpha
    areas = np.bincount(labels.ravel())
    areas[0] = 0
    biggest = areas.max()
    for i in range(1, n + 1):
        if areas[i] < biggest * KEEP_FRAC:
            alpha[labels == i] = 0
    return alpha


def label_components(mask):
    """Tiny connected-component labeller (4-connectivity), no scipy needed."""
    h, w = mask.shape
    labels = np.zeros((h, w), np.int32)
    current = 0
    stack = []
    ys, xs = np.nonzero(mask)
    for y0, x0 in zip(ys, xs):
        if labels[y0, x0]:
            continue
        current += 1
        stack.append((y0, x0))
        labels[y0, x0] = current
        while stack:
            y, x = stack.pop()
            for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ny, nx = y + dy, x + dx
                if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not labels[ny, nx]:
                    labels[ny, nx] = current
                    stack.append((ny, nx))
    return labels, current


def erase_wall(arr, alpha):
    """Erase dark shapes that span the panel from top edge to bottom edge."""
    h, w = arr.shape[:2]
    dark = (arr.mean(axis=2) <= DARK_CUTOFF) & (alpha > 0)
    if not dark.any():
        return alpha
    tol = max(2, int(h * EDGE_TOL))
    labels, n = label_components(dark)
    for i in range(1, n + 1):
        comp = labels == i
        rows = np.nonzero(comp.any(axis=1))[0]
        cols = np.nonzero(comp.any(axis=0))[0]
        spans_full = rows.min() <= tol and rows.max() >= h - 1 - tol
        narrow = (cols.max() - cols.min()) < w * 0.30
        if spans_full and narrow:
            grown = comp.copy()
            for _ in range(3):  # take the antialiased fringe with it
                g = np.zeros_like(grown)
                g[1:, :] |= grown[:-1, :]
                g[:-1, :] |= grown[1:, :]
                g[:, 1:] |= grown[:, :-1]
                g[:, :-1] |= grown[:, 1:]
                grown |= g
            alpha[grown] = 0
    return alpha


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: slice-sprites.py <sheet.jpg> [--cols N] [--rows N]")
    src = Path(sys.argv[1]).expanduser()
    cols = int(sys.argv[sys.argv.index("--cols") + 1]) if "--cols" in sys.argv else 4
    rows = int(sys.argv[sys.argv.index("--rows") + 1]) if "--rows" in sys.argv else 2
    prefix = sys.argv[sys.argv.index("--prefix") + 1] if "--prefix" in sys.argv else "push"

    sheet = Image.open(src).convert("RGB")
    W, H = sheet.size
    pw, ph = W / cols, H / rows
    ix = iy = 0
    print(f"sheet {W}x{H} -> {cols}x{rows} panels of {pw:.0f}x{ph:.0f}")

    frames = []
    for r in range(rows):
        for c in range(cols):
            box = (
                int(c * pw + ix),
                int(r * ph + iy),
                int((c + 1) * pw - ix),
                int((r + 1) * ph - iy),
            )
            arr = np.asarray(sheet.crop(box), dtype=np.uint8)
            arr = crop_to_border(arr)
            bg = flood_background(arr)
            alpha = np.where(bg, 0, 255).astype(np.uint8)
            alpha = erase_wall(arr, alpha)
            alpha = keep_main_blobs(alpha)
            rgba = np.dstack([arr, alpha])
            frames.append(Image.fromarray(rgba))
            print(f"  panel {len(frames)} ok")

    boxes = [f.split()[-1].getbbox() for f in frames]
    keep = (
        min(b[0] for b in boxes),
        min(b[1] for b in boxes),
        max(b[2] for b in boxes),
        max(b[3] for b in boxes),
    )
    print(f"shared crop box {keep}")

    OUT.mkdir(parents=True, exist_ok=True)
    cropped = [f.crop(keep) for f in frames]
    fw, fh = cropped[0].size
    for i, f in enumerate(cropped, 1):
        f.save(OUT / f"{prefix}-{i}.png")

    strip = Image.new("RGBA", (fw * len(cropped), fh), (0, 0, 0, 0))
    for i, f in enumerate(cropped):
        strip.paste(f, (i * fw, 0), f)
    strip.save(OUT / f"{prefix}-strip.png")

    (OUT / f"{prefix}.json").write_text(
        json.dumps({"frames": len(cropped), "width": fw, "height": fh}, indent=2)
    )
    print(f"wrote {len(cropped)} frames ({fw}x{fh}) + push-strip.png -> {OUT}")


if __name__ == "__main__":
    main()
