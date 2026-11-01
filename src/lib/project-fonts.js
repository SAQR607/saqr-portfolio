/**
 * Type stacks per project slug.
 *
 * The mockup previews and the typography specimens render in each project's
 * own families. fonts.css ships every face with `font-display: swap` and lazy
 * loading, so only the faces a page actually uses are ever downloaded — a
 * case-study page fetches its project's display face and nothing else.
 */

const stacks = {
  nimbus: { display: 'Outfit', body: 'Inter', mono: 'Inter', weight: 650 },
  atelier: { display: '"Bodoni Moda"', body: 'Archivo', mono: 'Archivo', weight: 450 },
  synapse: { display: '"Space Grotesk"', body: 'Inter', mono: '"JetBrains Mono"', weight: 600 },
  formco: { display: 'Fraunces', body: 'Manrope', mono: 'Manrope', weight: 400 },
  pulse: { display: '"IBM Plex Sans"', body: '"IBM Plex Sans"', mono: '"IBM Plex Mono"', weight: 600 },
  studio: { display: '"Bricolage Grotesque"', body: 'Sora', mono: 'Sora', weight: 650 },
};

export function projectFonts(slug) {
  return stacks[slug] ?? { display: 'Inter', body: 'Inter', mono: 'Inter', weight: 600 };
}
