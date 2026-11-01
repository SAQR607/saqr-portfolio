// Dev-only QA screenshotter: node scripts/shot.mjs <url> <out.png> <width> [full|viewport] [scroll|rm]
// 'rm' emulates prefers-reduced-motion so every section is in its final state —
// used for deterministic layout captures (animated captures use 'scroll').
import { chromium } from 'playwright-core';

const [url, out, widthArg, mode = 'full', scroll = ''] = process.argv.slice(2);
const width = Number(widthArg) || 1440;
const heights = { 1440: 900, 1024: 800, 768: 900, 390: 844 };
const reduced = scroll === 'rm';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({
  viewport: { width, height: heights[width] || 900 },
  deviceScaleFactor: 1,
  reducedMotion: reduced ? 'reduce' : 'no-preference',
});
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto(url, { waitUntil: 'networkidle' });

if (scroll === 'scroll') {
  // Scroll through the whole document so ScrollTrigger reveals fire, then return to top.
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += window.innerHeight * 0.8) {
      window.scrollTo(0, y);
      await delay(180);
    }
    window.scrollTo(0, total);
    await delay(600);
    window.scrollTo(0, 0);
    await delay(800);
  });
}

await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: mode === 'full' });
console.log('shot ->', out, 'errors:', errors.length ? errors : 'none');
await browser.close();
