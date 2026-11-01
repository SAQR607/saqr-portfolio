import { defineConfig } from 'astro/config';

/**
 * Published to GitHub Pages as a *project* site, so every URL and asset
 * must live under the `/saqr-portfolio` base — `site` + `base` here is what
 * keeps absolute canonical/OG/sitemap URLs and hashed asset paths correct
 * both locally and on the live URL.
 */
export default defineConfig({
  site: 'https://saqr607.github.io',
  base: '/saqr-portfolio',
  trailingSlash: 'ignore',
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
});
