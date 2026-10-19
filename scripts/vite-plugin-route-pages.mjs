import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Writes the extra pages GitHub Pages needs, as part of every build.
 *
 * Pages has no rewrite rules, so each case study needs a real file at
 * /<slug>/index.html, plus 404.html as the catch-all. These are copies of
 * the built index.html, and they name the bundle by its content hash.
 *
 * This used to live in scripts/build-site.sh. Running a plain `vite build`
 * instead skipped it: the root index.html moved to the new bundle, every
 * route copy kept pointing at the old one, and the deploy deleted the old
 * one. Every project link then loaded a page whose script was a 404 -- a
 * blank screen on any device without the old bundle cached. Doing it here
 * means there is no way to build the site without them.
 */
export default function routePages({ data = 'src/data.js' } = {}) {
  let outDir = 'dist';
  return {
    name: 'route-pages',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    async closeBundle() {
      const { PROJECTS } = await import(
        `${pathToFileURL(join(process.cwd(), data)).href}?t=${Date.now()}`
      );
      // absorbed slugs too, so addresses shared before a merge still answer
      const slugs = PROJECTS.flatMap((p) => [p.slug, ...(p.aliases || [])]);
      const index = join(outDir, 'index.html');
      for (const slug of slugs) {
        mkdirSync(join(outDir, slug), { recursive: true });
        copyFileSync(index, join(outDir, slug, 'index.html'));
      }
      copyFileSync(index, join(outDir, '404.html'));
      // without this Pages runs Jekyll, which drops anything starting with _
      writeFileSync(join(outDir, '.nojekyll'), '');
      this.info?.(`route pages: ${slugs.length} + 404.html`);
    },
  };
}
