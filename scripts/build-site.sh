#!/usr/bin/env bash
# Production build for GitHub Pages.
#
# Three things Pages needs that a plain `vite build` does not give you:
#
#  * CNAME. Pages reads the custom domain from a file at the site root and
#    clears the setting if it goes missing, so it lives in public/ and is
#    copied on every build rather than re-added by hand.
#
#  * A directory index per route. The case studies are client-side routes,
#    and Pages has no rewrite rule. Emitting dist/<slug>/index.html for each
#    one means /guide is a real file, served 200, and the app then reads the
#    URL and renders that case study. The alternative -- relying only on the
#    404 fallback below -- works for a human but answers every deep link and
#    every social crawler with a 404 status.
#
#  * 404.html, still, as the catch-all for anything not pre-rendered.
#
#  * .nojekyll. Pages pipes the branch through Jekyll unless this file is
#    present, and Jekyll silently drops anything whose name starts with an
#    underscore. Belt and braces: the shared asset folder is also named
#    work/shared rather than work/_shared, because a folder that only
#    publishes when a magic dotfile is present is a trap for whoever adds
#    the next one.
set -euo pipefail
cd "$(dirname "$0")/.."

npx vite build

# slugs come from the data file, so a new project cannot be forgotten here
SLUGS=$(node -e "import('./src/data.js').then(m => console.log(m.PROJECTS.map(p => p.slug).join(' ')))")

for slug in $SLUGS; do
  mkdir -p "dist/$slug"
  cp dist/index.html "dist/$slug/index.html"
done

cp dist/index.html dist/404.html
touch dist/.nojekyll

echo
echo "routes written:"
for slug in $SLUGS; do echo "  /$slug"; done
echo "size: $(du -sh dist | cut -f1)"
