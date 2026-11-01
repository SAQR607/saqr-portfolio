// Dev-only: click-through test of ClientRouter navigation + interactive bits.
import { chromium } from 'playwright-core';

const b = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
p.on('pageerror', (e) => errors.push('pageerror: ' + String(e)));

const log = [];
const step = async (name, fn) => {
  try {
    await fn();
    log.push('PASS  ' + name);
  } catch (e) {
    log.push('FAIL  ' + name + ' — ' + e.message.split('\n')[0]);
  }
};

await p.goto('http://localhost:4321/saqr-portfolio/', { waitUntil: 'networkidle' });

await step('home → first project row', async () => {
  await p.click('.work__item:first-child a');
  await p.waitForURL('**/work/nimbus/', { timeout: 10000 });
  await p.waitForTimeout(900);
  const h1 = await p.textContent('h1');
  if (!h1.includes('Nimbus')) throw new Error('h1 was ' + h1);
});

await step('case study → next project', async () => {
  await p.click('.casenav__link--next');
  await p.waitForURL('**/work/atelier/', { timeout: 10000 });
  await p.waitForTimeout(900);
  const h1 = await p.textContent('h1');
  if (!h1.includes('Atelier')) throw new Error('h1 was ' + h1);
});

await step('case study → back to home via All projects', async () => {
  await p.click('.casenav__all');
  await p.waitForURL((u) => !u.pathname.includes('/work/'), { timeout: 10000 });
  await p.waitForTimeout(900);
  if (!(await p.$('.work__list'))) throw new Error('work list missing');
});

await step('nav menu → Work anchor scrolls to section', async () => {
  await p.click('.nav__link[href*="#work"]');
  await p.waitForTimeout(1600);
  const y = await p.evaluate(() => window.scrollY);
  if (y < 600) throw new Error('did not scroll, y=' + y);
});

await step('copy email button works', async () => {
  await p.click('[data-copy-email]');
  await p.waitForTimeout(500);
  const label = await p.textContent('[data-copy-label]');
  if (!label.includes('Copied')) throw new Error('label was ' + label);
});

await step('hero heading revealed after init', async () => {
  const op = await p.evaluate(() => getComputedStyle(document.querySelector('[data-hero-fade]')).opacity);
  if (Number(op) < 0.99) throw new Error('hero fade opacity ' + op);
});

await step('poster follower hidden until hover (no stray fixed els)', async () => {
  const stray = await p.evaluate(() => document.body.children.length);
  if (stray > 20) throw new Error('suspicious body children: ' + stray);
});

console.log(log.join('\n'));
console.log('\nconsole errors:', errors.length ? errors : 'none');
await b.close();
