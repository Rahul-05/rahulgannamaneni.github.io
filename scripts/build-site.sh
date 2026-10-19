#!/usr/bin/env bash
# Production build for GitHub Pages.
#
# What Pages needs beyond the bundle. All of it is now written by `vite build`
# itself (CNAME from public/, the rest by the route-pages plugin); this script
# builds and then checks the result:
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

# The route pages, 404.html and .nojekyll are written by the route-pages
# plugin in vite.config.js, so a plain `vite build` produces the same site.
# Check rather than trust: every HTML page must name a bundle that exists.
BUNDLE=$(ls dist/assets/ | grep -E '^index-.*\.js$')
STALE=$(grep -rL "$BUNDLE" --include=index.html --include=404.html dist | grep -v '^dist/mise/[a-z]*/' || true)
if [ -n "$STALE" ]; then
  echo "pages pointing at a missing bundle:"; echo "$STALE"; exit 1
fi

echo
echo "routes written:"
find dist -mindepth 2 -maxdepth 2 -name index.html ! -path 'dist/mise/*/*' | sed 's|dist/|  /|; s|/index.html||' | sort
echo "size: $(du -sh dist | cut -f1)"
