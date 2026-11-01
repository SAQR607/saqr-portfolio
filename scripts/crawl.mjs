// Dev-only: crawl every internal link on the site and report any that fail.
import { chromium } from 'playwright-core';

const origin = 'http://localhost:4321';
const base = '/saqr-portfolio';
const start = `${origin}${base}/`;

const b = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });

const seen = new Set();
const queue = [start];
const problems = [];
const ok = [];

while (queue.length) {
  const url = queue.shift();
  const key = url.split('#')[0];
  if (seen.has(key)) continue;
  seen.add(key);

  let status;
  try {
    const res = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    status = res?.status();
  } catch (e) {
    problems.push({ url, reason: 'nav failed: ' + e.message.split('\n')[0] });
    continue;
  }

  if (status >= 400) {
    problems.push({ url, reason: 'HTTP ' + status });
    continue;
  }
  ok.push(url.replace(origin, ''));

  // Anchors on the same page must resolve to an element.
  const anchors = await p.evaluate(() =>
    [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'))
  );

  for (const href of anchors) {
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    let abs;
    try {
      abs = new URL(href, url).href;
    } catch {
      problems.push({ url, reason: 'unparseable href: ' + href });
      continue;
    }
    if (!abs.startsWith(origin)) continue;

    if (abs.includes('#')) {
      const [page, hash] = abs.split('#');
      const target = (page || url).split('#')[0];
      if (!seen.has(target)) queue.push(target);
      if (hash && (page === '' || page === url.split('#')[0])) {
        const exists = await p.evaluate((h) => !!document.getElementById(h) || !!document.querySelector('[id="' + h + '"]'), hash);
        if (!exists) problems.push({ url: url.replace(origin, ''), reason: `dead anchor #${hash}` });
      }
    } else if (!seen.has(abs)) {
      queue.push(abs);
    }
  }
}

console.log('pages crawled:', ok.length);
ok.forEach((u) => console.log('  ok  ' + u));
if (problems.length) {
  console.log('\nPROBLEMS:');
  problems.forEach((x) => console.log('  ' + x.reason + '  <-  ' + x.url.replace(origin, '')));
} else {
  console.log('\nno broken links');
}
await b.close();
