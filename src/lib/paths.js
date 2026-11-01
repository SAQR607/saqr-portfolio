/**
 * Base-aware URL helpers.
 *
 * GitHub Pages serves this project from a sub-path (`/saqr-portfolio`), and the
 * same code must also work on `localhost`. Never hard-code a leading slash for
 * an internal link — always run it through `withBase()`.
 */

/** Normalised base with no trailing slash, e.g. `/saqr-portfolio` ('' if at root). */
export const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

/** Prefix an internal path with the deployment base: `withBase('/work/nimbus/')`. */
export function withBase(path = '/') {
  if (!path) return `${BASE}/`;
  // Leave external / in-page / protocol-relative references untouched.
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${normalised}`;
}

/** The site root under the current base, with a trailing slash. */
export const HOME = `${BASE}/`;

/** Canonical URL for a given internal path. */
export function canonical(path = '/') {
  const site = 'https://saqr607.github.io';
  return `${site}${withBase(path)}`;
}
