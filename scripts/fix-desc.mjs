// Dev-only one-off: repair the mojibake in package.json's description field.
import { readFileSync, writeFileSync } from 'node:fs';

const raw = readFileSync('package.json', 'utf8');
const pkg = JSON.parse(raw);
pkg.description = 'Portfolio of Ibrahim Ahmed (SAQR) — Front-End Developer & UI Engineer';
writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('description ->', pkg.description);
