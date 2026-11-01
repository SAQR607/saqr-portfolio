// Dev-only: inspect an element's geometry + computed styles. node scripts/inspect.mjs <url> <sel> [prop...]
import { chromium } from 'playwright-core';

const [url, sel, ...props] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(async () => {
  const d = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let y = 0; y <= document.documentElement.scrollHeight; y += 500) { window.scrollTo(0, y); await d(100); }
  await d(700);
  window.scrollTo(0, 0);
});
await p.waitForTimeout(400);

const out = await p.evaluate(({ sel, props }) => {
  const el = document.querySelector(sel);
  if (!el) return { missing: sel };
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const style = {};
  for (const k of props) style[k] = cs[k];
  return {
    rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    opacity: cs.opacity,
    visibility: cs.visibility,
    display: cs.display,
    transform: cs.transform,
    innerLen: el.innerHTML.length,
    firstChildren: [...el.children].slice(0, 6).map((c) => c.className),
    style,
  };
}, { sel, props });

console.log(JSON.stringify(out, null, 1));
await b.close();
