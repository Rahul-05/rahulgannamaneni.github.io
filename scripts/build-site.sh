#!/usr/bin/env bash
# Production build for GitHub Pages.
#
# Two things Pages needs that a plain `vite build` does not give you:
#
#  * CNAME. Pages reads the custom domain from a file at the site root, and
#    wipes the setting if it is missing. It lives in public/ so it is copied
#    on every build rather than being re-added by hand.
#
#  * 404.html. The site routes case studies client-side (/guide, /space...),
#    and Pages has no rewrite rule -- it serves 404.html for any path it does
#    not recognise. Making that a byte-copy of index.html turns the 404 into
#    the app, which then reads the URL and renders the right page. Without it
#    every deep link and every refresh on a case study is a hard 404.
set -euo pipefail
cd "$(dirname "$0")/.."

npx vite build
cp dist/index.html dist/404.html

echo
echo "built:"
ls -1 dist | sed 's/^/  /'
