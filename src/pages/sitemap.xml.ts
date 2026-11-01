import type { APIRoute } from 'astro';
import { projects } from '../data/projects.js';
import { BASE } from '../lib/paths.js';

const SITE = 'https://saqr607.github.io';

export const GET: APIRoute = () => {
  const paths = ['/', ...projects.map((p) => `/work/${p.slug}/`)];
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${SITE}${BASE}${path === '/' ? '/' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === '/' ? 'monthly' : 'yearly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
