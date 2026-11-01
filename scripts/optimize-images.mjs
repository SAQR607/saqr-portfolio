/**
 * Generates responsive, next-gen image assets from the source portrait.
 *
 * Source: me.png (696x1404, transparent cutout)
 * Output: public/img/*.webp  (alpha preserved)
 */
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('me.png');
const OUT = path.resolve('public/img');

/** Widths we actually render at (portrait is display-limited by a 696px source). */
const WIDTHS = [700, 520, 360];
const FULL = 'portrait';
const AVATAR = 'avatar';

async function kb(file) {
  const { size } = await stat(file);
  return `${(size / 1024).toFixed(1)} KB`;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const base = sharp(SRC).trim({ threshold: 8 });
  const meta = await base.metadata();
  console.log(`source: ${meta.width}x${meta.height} (${meta.format})`);

  const chain = base.clone().png();

  // Full-size responsive set (alpha preserved).
  for (const w of WIDTHS) {
    const target = w >= meta.width ? meta.width : w;
    const file = path.join(OUT, `${FULL}-${target}.webp`);
    await chain
      .clone()
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6, alphaQuality: 90 })
      .toFile(file);
    console.log(`  ${path.basename(file).padEnd(22)} ${await kb(file)}`);
  }

  // Square head-and-shoulders avatar for compact contexts.
  // Face sits centred near x=280, hair top near y=10 — a 400px box frames it well.
  const BOX = { left: 80, top: 0, width: 400, height: 400 };
  await chain
    .clone()
    .extract(BOX)
    .resize(320, 320, { fit: 'cover' })
    .webp({ quality: 84, effort: 6, alphaQuality: 90 })
    .toFile(path.join(OUT, `${AVATAR}-320.webp`));
  console.log(`  avatar-320.webp         ${await kb(path.join(OUT, `${AVATAR}-320.webp`))}`);

  // Normalised transparent PNG for maximal fallback compatibility.
  await chain
    .clone()
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(OUT, 'portrait-fallback.png'));
  console.log(`  portrait-fallback.png   ${await kb(path.join(OUT, 'portrait-fallback.png'))}`);

  console.log('done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
