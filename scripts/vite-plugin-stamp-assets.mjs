import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Stamps a content hash onto every /work/ image path in the source.
 *
 * Vite fingerprints the bundle, so a deploy always ships new code. Images in
 * public/ get none of that: they keep a fixed name and Pages serves them with
 * a four hour max-age, so redrawing cover.webp shipped a file no browser
 * would ask for again until the cache aged out -- the site looked unchanged
 * while the server was already correct.
 *
 * This runs as a source transform rather than a post-build pass so the
 * stamped URLs are part of what Vite hashes. Rewriting the bundle after the
 * fact changes its bytes without changing its name, which trades an image
 * cache problem for a worse one on the bundle itself.
 *
 * The URL changes when the image changes and stays identical when it does
 * not, so unchanged files keep their cache and a redraw is picked up at once.
 */
export default function stampAssets({ dir = 'public', prefix = '/work/' } = {}) {
  const cache = new Map();

  const hash = (url) => {
    if (cache.has(url)) return cache.get(url);
    const file = join(process.cwd(), dir, url);
    const v = existsSync(file)
      ? createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 8)
      : null;
    cache.set(url, v);
    return v;
  };

  const pattern = new RegExp(`${prefix}[A-Za-z0-9._/-]+\\.(?:webp|png|jpe?g|svg|gif|avif)`, 'g');

  return {
    name: 'stamp-assets',
    apply: 'build',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.(jsx?|tsx?)$/.test(id) || id.includes('node_modules')) return null;
      if (!code.includes(prefix)) return null;
      let touched = false;
      const out = code.replace(pattern, (url) => {
        const v = hash(url);
        if (!v) {
          this.warn(`stamp-assets: no file for ${url}`);
          return url;
        }
        touched = true;
        return `${url}?v=${v}`;
      });
      return touched ? { code: out, map: null } : null;
    },
  };
}
