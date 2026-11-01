// Dev-only: element screenshots per section. node scripts/sections.mjs <base> <width> <tag> [sel...]
import { chromium } from 'playwright-core';

const [base, widthArg, tag, ...selsArg] = process.argv.slice(2);
const width = Number(widthArg) || 390;
const heights = { 1440: 900, 1024: 800, 768: 900, 390: 844 };
const sels = selsArg.length ? selsArg : ['.hero', '#work', '#about', '#capabilities', '#contact', 'footer'];

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width, height: heights[width] || 900 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(base, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  const d = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let y = 0; y <= document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await d(120); }
  await d(600);
});
for (const sel of sels) {
  const el = await page.$(sel);
  if (!el) { console.log('missing:', sel); continue; }
  const name = sel.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  await el.screenshot({ path: `qa-${tag}-${name}.png` });
  console.log('shot:', sel);
}
console.log('errors:', errors.length ? errors : 'none');
await browser.close();
