# RAHUL RAO — Portfolio

New portfolio site (replacing rahulraog.com). Design language inspired by
[follow.art](https://follow.art/): virtual-scroll section stacking, a 3D
rotating card ring in the hero, tilted panel transitions, hand-drawn scribble
accents, and giant condensed typography.

## Stack

- **React 19 + Vite 8**
- **GSAP** (+ `@gsap/react`, `Observer` plugin) — all animation and the
  virtual-scroll engine
- Self-hosted fonts via Fontsource: **Anton** (display), **Archivo** (body),
  **Permanent Marker** (scribble labels)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Architecture

The page never scrolls natively (`body { overflow: hidden }`). A fixed
`.stage` holds five full-viewport sections stacked on top of each other.
`src/App.jsx` owns the engine:

1. A GSAP `Observer` captures wheel/touch input.
2. Each delta is offered to the active section's `onDelta(dy)` first
   (via `useImperativeHandle`):
   - **Hero** consumes deltas to spin the card ring (`SPIN_MAX` degrees)
     before passing.
   - **Projects** consumes deltas to pop in its numbered cards one by one.
   - Other sections pass immediately.
3. Passed deltas accumulate; past `WHEEL_THRESHOLD` the next/previous panel
   slides in **tilted ~6.5° and settles flat** (`goto()` in App.jsx), exactly
   like the reference site.

Sections live in `src/components/sections/`, each exposing
`el / onDelta / onEnter` (+ `playIntro` on the hero). Shared SVG scribbles are
in `src/components/Scribbles.jsx`.

The preloader (`src/components/Preloader.jsx`) runs a 000→100 counter with a
progress hairline, then peels away with the same tilted-panel motion and
triggers the hero intro (masked type reveal + ring fan-in).

## Dev helpers

In dev builds only, `window.__tick(seconds)` advances GSAP's clock manually
(useful when the tab is backgrounded and rAF is paused), and
`window.__delta(dy)` / `window.__goto(i, dir)` / `window.__engine` drive and
inspect the scroll engine from the console.

## TODO — content transfer

All copy, testimonials, project cards, and images are **placeholders**
(`src/data.js` + `TempImg` blocks). Real content gets transferred from the
old portfolio (github.com/Rahul-05/rahulgannamaneni.github.io) in a later
pass. Mobile layout is currently minimal (side columns collapse); needs a
dedicated pass too.
