// Dev-only: render the social preview card and save it as public/img/og.png (1200×630).
// The card uses the site's own tokens so it matches the page it represents.
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
  @font-face { font-family:'Instrument Serif'; font-style:normal; font-display:block;
    src:url(http://localhost:4321/saqr-portfolio/fonts/instrument-serif-latin-400-normal.woff2) format('woff2'); }
  @font-face { font-family:'Instrument Serif'; font-style:italic; font-display:block;
    src:url(http://localhost:4321/saqr-portfolio/fonts/instrument-serif-latin-400-italic.woff2) format('woff2'); }
  @font-face { font-family:'Inter'; font-weight:100 900; font-display:block;
    src:url(http://localhost:4321/saqr-portfolio/fonts/inter-latin-wght-normal.woff2) format('woff2'); }
  @font-face { font-family:'IBM Plex Mono'; font-weight:500; font-display:block;
    src:url(http://localhost:4321/saqr-portfolio/fonts/ibm-plex-mono-latin-500-normal.woff2) format('woff2'); }

  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; overflow:hidden; }
  .card {
    position:relative; width:1200px; height:630px;
    background:#0a0a0c; color:#f2efe9;
    font-family:'Inter', sans-serif;
    display:flex; flex-direction:column; justify-content:space-between;
    padding:74px 84px; isolation:isolate;
  }
  .grid { position:absolute; inset:0; z-index:-2;
    background-image:linear-gradient(to right, rgba(242,239,233,0.07) 1px, transparent 1px);
    background-size:calc(100% / 6) 100%;
    -webkit-mask-image:linear-gradient(to bottom, transparent, #000 22%, #000 72%, transparent); }
  .wash { position:absolute; z-index:-1; right:-140px; top:-220px; width:820px; height:760px;
    background:radial-gradient(46% 46% at 52% 46%, rgba(233,161,59,0.24), transparent 72%);
    filter:blur(30px); }
  .portrait { position:absolute; z-index:-1; right:0; bottom:0; width:352px; height:630px;
    object-fit:cover; object-position:top center;
    -webkit-mask-image:linear-gradient(to right, transparent, #000 34%); opacity:0.92; }

  .top { display:flex; align-items:center; justify-content:space-between; }
  .eyebrow { font-family:'IBM Plex Mono', monospace; font-weight:500; font-size:15px;
    letter-spacing:0.22em; text-transform:uppercase; color:#77736c;
    display:inline-flex; align-items:center; gap:14px; }
  .eyebrow::before { content:''; width:9px; height:9px; background:#e9a13b; border-radius:2px; }
  .year { font-family:'IBM Plex Mono', monospace; font-weight:500; font-size:15px;
    letter-spacing:0.22em; color:#77736c; }

  .mid { max-width:760px; }
  h1 { font-family:'Instrument Serif', serif; font-weight:400; font-size:98px; line-height:0.98;
    letter-spacing:-0.028em; }
  h1 em { font-style:italic; color:#e9a13b; }
  .role { margin-top:26px; font-size:25px; line-height:1.5; color:#a7a29a; max-width:600px; }

  .bot { display:flex; align-items:center; gap:16px; }
  .pill { display:inline-flex; align-items:center; gap:11px;
    padding:15px 27px; border-radius:999px;
    background:#f2efe9; color:#0a0a0c; font-weight:600; font-size:19px; }
  .pill .dot { width:9px; height:9px; border-radius:50%; background:#e9a13b; }
  .url { font-family:'IBM Plex Mono', monospace; font-weight:500; font-size:16px;
    letter-spacing:0.06em; color:#77736c; }
</style></head>
<body>
  <div class="card">
    <span class="grid"></span><span class="wash"></span>
    <img class="portrait" src="http://localhost:4321/saqr-portfolio/img/portrait-696.webp" alt="" />
    <div class="top">
      <span class="eyebrow">Portfolio 2026</span>
      <span class="year">SAQR</span>
    </div>
    <div class="mid">
      <h1>Design-driven<br />front-end <em>craft</em>.</h1>
      <p class="role">Ibrahim Ahmed (SAQR) — Front-End Developer &amp; UI Engineer. Design systems, motion and accessible product interfaces.</p>
    </div>
    <div class="bot">
      <span class="pill"><span class="dot"></span>Available for freelance &amp; full-time work</span>
      <span class="url">saqr607.github.io/saqr-portfolio</span>
    </div>
  </div>
</body></html>`;

const outPath = 'public/img/og.png';
mkdirSync('public/img', { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
await page.screenshot({ path: outPath, clip: { x: 0, y: 0, width: 1200, height: 630 } });
console.log('saved ->', outPath);
await browser.close();
