// Dev-only: mobile menu + nav interaction test.
import { chromium } from 'playwright-core';

const b = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await p.goto('http://localhost:4321/saqr-portfolio/', { waitUntil: 'networkidle' });
await p.click('[data-menu-toggle]');
await p.waitForTimeout(700);
await p.screenshot({ path: 'qa-m-menu-open.png' });
await p.click('[data-menu] a[href*="#work"]');
await p.waitForTimeout(1400);
await p.screenshot({ path: 'qa-m-menu-nav.png' });
console.log('url:', p.url(), 'errors:', errors.length ? errors : 'none');
await b.close();
