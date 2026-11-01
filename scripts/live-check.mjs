// Dev-only: live-site verification — links, console errors, failed requests, fonts.
import { chromium } from 'playwright-core';

const origin = 'https://saqr607.github.io';
const base = '/saqr-portfolio';
const start = `${origin}${base}/`;

const b = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
const failedRequests = [];
p.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
p.on('pageerror', (e) => consoleErrors.push('pageerror: ' + String(e)));
p.on('response', (r) => { if (r.status() >= 400) failedRequests.push(r.status() + '  ' + r.url()); });
p.on('requestfailed', (r) => failedRequests.push('FAILED  ' + r.url() + '  ' + (r.failure()?.errorText ?? '')));

const seen = new Set();
const queue = [start];
const problems = [];
const ok = [];
const fontsLoaded = new Set();

while (queue.length) {
  const url = queue.shift();
  const key = url.split('#')[0];
  if (seen.has(key)) continue;
  seen.add(key);

  let status;
  try {
    const res = await p.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
    status = res?.status();
  } catch (e) {
    problems.push('nav failed: ' + e.message.split('\n')[0] + '  <-  ' + url);
    continue;
  }
  if (status >= 400) { problems.push('HTTP ' + status + '  <-  ' + url); continue; }
  ok.push(url.replace(origin, ''));

  // Record which webfonts actually got fetched
  const faces = await p.evaluate(() =>
    performance.getEntriesByType('resource').filter((r) => r.name.endsWith('.woff2')).map((r) => r.name.split('/').pop())
  );
  faces.forEach((f) => fontsLoaded.add(f));

  const anchors = await p.evaluate(() =>
    [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))
  );

  for (const href of anchors) {
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    let abs;
    try { abs = new URL(href, url).href; } catch { problems.push('bad href: ' + href); continue; }
    if (!abs.startsWith(origin)) continue;

    if (abs.includes('#')) {
      const [page, hash] = abs.split('#');
      const target = (page || url).split('#')[0];
      if (!seen.has(target)) queue.push(target);
      if (hash && (page === '' || page === url.split('#')[0])) {
        const exists = await p.evaluate((h) => !!document.getElementById(h), hash);
        if (!exists) problems.push('dead anchor #' + hash + '  <-  ' + url.replace(origin, ''));
      }
    } else if (!seen.has(abs)) queue.push(abs);
  }
}

// Render the home page once more for a live screenshot
await p.goto(start, { waitUntil: 'networkidle' });
await p.screenshot({ path: 'live-home.png' });

console.log('pages crawled :', ok.length);
ok.forEach((u) => console.log('   200  ' + u));
console.log('\nwebfonts fetched :', fontsLoaded.size);
console.log('   ' + [...fontsLoaded].join('\n   '));
console.log('\nlink problems :', problems.length ? problems : 'none');
console.log('http >=400     :', failedRequests.length ? [...new Set(failedRequests)] : 'none');
console.log('console errors :', consoleErrors.length ? consoleErrors : 'none');
await b.close();
