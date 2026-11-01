// Dev-only: load a page in dev mode and print any console/page errors with stacks.
import { chromium } from 'playwright-core';

const url = process.argv[2];
const b = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('console', (m) => console.log('[' + m.type() + ']', m.text()));
p.on('pageerror', (e) => console.log('[pageerror]', e.stack || String(e)));
await p.goto(url, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
await b.close();
