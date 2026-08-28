// Stamps a content hash onto every /work/ image reference in the built site.
//
// The JS bundle is fingerprinted by Vite, so a deploy always ships the new
// code. The images are not: they live in public/ and keep a fixed name, and
// Pages serves them with a four hour max-age. Redrawing cover.webp therefore
// shipped a file nobody's browser would ask for again until the cache aged
// out -- the site looked stale while the server was already correct.
//
// Rewriting the references to /work/foo/cover.webp?v=<hash of that file>
// makes the URL change whenever the bytes do, and stay identical when they
// do not, so unchanged images keep their cache and changed ones never serve
// stale. The files on disk are untouched; only the query string moves.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

// hash every asset under dist/work
const hashes = new Map();
for (const file of walk(join(DIST, 'work'))) {
  const url = '/' + relative(DIST, file);
  hashes.set(url, createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 8));
}

// rewrite references in the built JS and HTML
const targets = walk(DIST).filter((f) => /\.(js|html)$/.test(f));
let rewritten = 0;
for (const file of targets) {
  const before = readFileSync(file, 'utf8');
  let after = before;
  for (const [url, hash] of hashes) {
    // only a reference that ends at a quote, so /work/a/b.webp never matches
    // a longer path that merely starts with it
    after = after.split(`${url}\``).join(`${url}?v=${hash}\``);
    after = after.split(`${url}"`).join(`${url}?v=${hash}"`);
    after = after.split(`${url}'`).join(`${url}?v=${hash}'`);
  }
  if (after !== before) {
    writeFileSync(file, after);
    rewritten++;
  }
}

const stamped = [...hashes].filter(([url]) =>
  targets.some((f) => readFileSync(f, 'utf8').includes(`${url}?v=`)),
).length;
console.log(`fingerprinted ${stamped}/${hashes.size} work assets across ${rewritten} files`);
