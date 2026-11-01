/**
 * Self-hosting font pipeline.
 *
 * Fontsource's `*.css` entry points bundle every Unicode subset (Cyrillic, Greek,
 * Vietnamese, …) which we never render. This script copies only the Latin woff2
 * files we actually use into /public/fonts and writes a single, hand-rolled
 * `fonts.css`.
 *
 * Because @font-face rules are lazy, a family is only ever downloaded by pages
 * that actually render it — so every project mockup can ship its own authentic
 * typeface at zero cost to the home page.
 */
import { readFile, writeFile, mkdir, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT_DIR = path.resolve('public/fonts');
const OUT_CSS = path.join(OUT_DIR, 'fonts.css');
const SUBSET = 'latin';

/** Standard Latin Unicode range used by Google/Fontsource. */
const LATIN_RANGE =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

/**
 * family  -> CSS font-family name to expose
 * pkg     -> directory name inside @fontsource / @fontsource-variable
 * styles  -> which font-styles to ship
 * weights -> static packages only: which weights to ship
 * axes    -> variable packages only: which axis file to use ('wght' by default)
 */
const FONTS = [
  // ── Portfolio chrome (always candidates on every page) ────────────────
  { kind: 'variable', pkg: 'inter', family: 'Inter', styles: ['normal'] },
  { kind: 'static', pkg: 'instrument-serif', family: 'Instrument Serif', weights: [400], styles: ['normal', 'italic'] },
  { kind: 'static', pkg: 'ibm-plex-mono', family: 'IBM Plex Mono', weights: [400, 500], styles: ['normal'] },

  // ── Project 1 · Nimbus (SaaS) ─────────────────────────────────────────
  { kind: 'variable', pkg: 'outfit', family: 'Outfit', styles: ['normal'] },

  // ── Project 2 · Atelier Noir (E-Commerce) ─────────────────────────────
  { kind: 'variable', pkg: 'bodoni-moda', family: 'Bodoni Moda', styles: ['normal', 'italic'] },
  { kind: 'variable', pkg: 'archivo', family: 'Archivo', styles: ['normal'] },

  // ── Project 3 · Synapse (AI) ──────────────────────────────────────────
  { kind: 'variable', pkg: 'space-grotesk', family: 'Space Grotesk', styles: ['normal'] },
  { kind: 'static', pkg: 'jetbrains-mono', family: 'JetBrains Mono', weights: [400, 500, 700], styles: ['normal'] },

  // ── Project 4 · Form & Co (Creative agency) ───────────────────────────
  { kind: 'variable', pkg: 'fraunces', family: 'Fraunces', styles: ['normal', 'italic'] },
  { kind: 'variable', pkg: 'manrope', family: 'Manrope', styles: ['normal'] },

  // ── Project 5 · Pulse (Analytics dashboard) ───────────────────────────
  { kind: 'variable', pkg: 'ibm-plex-sans', family: 'IBM Plex Sans', styles: ['normal'] },

  // ── Project 6 · Studio Saqr (Personal brand) ──────────────────────────
  { kind: 'variable', pkg: 'bricolage-grotesque', family: 'Bricolage Grotesque', styles: ['normal'] },
  { kind: 'variable', pkg: 'sora', family: 'Sora', styles: ['normal'] },
];

const rootFor = (kind) => (kind === 'variable' ? '@fontsource-variable' : '@fontsource');

async function readMeta(kind, pkg) {
  const file = path.resolve('node_modules', rootFor(kind), pkg, 'metadata.json');
  return JSON.parse(await readFile(file, 'utf8'));
}

async function resolveFile(kind, pkg, meta, style, weight, axes) {
  const id = meta.id;
  const name =
    kind === 'variable'
      ? `${id}-${SUBSET}-${axes}-${style}.woff2`
      : `${id}-${SUBSET}-${weight}-${style}.woff2`;
  return { name, abs: path.resolve('node_modules', rootFor(kind), pkg, 'files', name) };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const blocks = [];
  const missing = [];
  let totalBytes = 0;

  for (const font of FONTS) {
    const meta = await readMeta(font.kind, font.pkg);
    const axes = font.axes ?? 'wght';
    const wght = meta.variable?.[axes];

    for (const style of font.styles) {
      const weights =
        font.kind === 'variable' ? [null] : (font.weights ?? [400]);

      for (const weight of weights) {
        const { name, abs } = await resolveFile(font.kind, font.pkg, meta, style, weight, axes);

        try {
          await copyFile(abs, path.join(OUT_DIR, name));
          const { size } = await stat(path.join(OUT_DIR, name));
          totalBytes += size;
        } catch {
          missing.push(name);
          continue;
        }

        const weightDecl =
          font.kind === 'variable' ? `${wght.min} ${wght.max}` : String(weight);

        blocks.push(
          [
            `/* ${font.family} · ${style}${weight ? ' ' + weight : ''} · ${SUBSET} */`,
            '@font-face {',
            `  font-family: '${font.family}';`,
            `  font-style: ${style};`,
            '  font-display: swap;',
            `  font-weight: ${weightDecl};`,
            `  src: url(./${name}) format('woff2');`,
            `  unicode-range: ${LATIN_RANGE};`,
            '}',
          ].join('\n')
        );
      }
    }
  }

  const header = [
    '/* ------------------------------------------------------------------',
    '   Self-hosted Latin-subset webfonts (generated by scripts/build-fonts.mjs)',
    '   Do not edit by hand — run `npm run fonts` to regenerate.',
    '   Rules are lazy: a family downloads only on pages that render it.',
    '   ------------------------------------------------------------------ */',
    '',
  ].join('\n');

  await writeFile(OUT_CSS, header + blocks.join('\n\n') + '\n', 'utf8');

  if (missing.length) {
    console.warn('MISSING FILES:');
    missing.forEach((m) => console.warn('  - ' + m));
  }
  console.log(`${blocks.length} @font-face rules · ${(totalBytes / 1024).toFixed(1)} KB of woff2 on disk`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
