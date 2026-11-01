/**
 * Motion engine for the SAQR portfolio.
 *
 * Everything binds to `astro:page-load` so it re-initialises after every
 * ClientRouter navigation, and every listener/animation created for a page is
 * torn down before the next one swaps in. If anything throws, the `.js` flag is
 * dropped so CSS reveal states release and content stays visible.
 *
 * Libraries: GSAP + ScrollTrigger (choreography), Lenis (desktop smooth scroll).
 * Nothing here runs when the user prefers reduced motion.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { site } from '../data/site.js';

gsap.registerPlugin(ScrollTrigger);

const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
const mqDesktop = window.matchMedia('(min-width: 861px)');

/** Teardown callbacks for the current page. */
let cleanups = [];
let ctx = null;
let lenis = null;
let rafId = 0;
let initialisedFor = null;

const addCleanup = (fn) => cleanups.push(fn);

function runCleanups() {
  while (cleanups.length) {
    try {
      cleanups.pop()();
    } catch {
      /* a listener bound to a node that is already gone */
    }
  }
}

/** Full teardown — runs before the next page's DOM is swapped in. */
function hardTeardown() {
  runCleanups();
  ScrollTrigger.getAll().forEach((t) => t.kill());
  if (rafId) cancelAnimationFrame(rafId), (rafId = 0);
  if (lenis) {
    try {
      lenis.destroy();
    } catch {
      /* already gone */
    }
    lenis = null;
  }
  window.__saqrReady = false;
  window.__saqrArmFailsafe?.();
}

/* ========================================================================== *
 * Per-page setup
 * ========================================================================== */

function setupHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  let scrolled = false;
  const sync = () => {
    const next = window.scrollY > 24;
    if (next !== scrolled) {
      scrolled = next;
      header.classList.toggle('is-scrolled', next);
    }
  };

  sync();
  window.addEventListener('scroll', sync, { passive: true });
  addCleanup(() => window.removeEventListener('scroll', sync));
}

function setupMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;

  const label = toggle.querySelector('.sr-only');
  let open = false;

  const setOpen = (next) => {
    if (next === open) return;
    open = next;
    toggle.setAttribute('aria-expanded', String(next));
    menu.setAttribute('aria-hidden', String(!next));
    menu.classList.toggle('is-open', next);
    document.documentElement.classList.toggle('menu-open', next);
    if (label) label.textContent = next ? 'Close menu' : 'Open menu';

    if (lenis) next ? lenis.stop() : lenis.start();

    if (next) {
      menu.querySelector('a')?.focus({ preventScroll: true });
    } else {
      toggle.focus({ preventScroll: true });
    }
  };

  const onToggle = () => setOpen(!open);
  const onKey = (e) => {
    if (e.key === 'Escape' && open) setOpen(false);
  };
  const onMenuClick = (e) => {
    if (e.target.closest('a')) setOpen(false);
  };

  toggle.addEventListener('click', onToggle);
  menu.addEventListener('click', onMenuClick);
  document.addEventListener('keydown', onKey);

  const onBreakpoint = () => {
    if (mqDesktop.matches && open) setOpen(false);
  };
  mqDesktop.addEventListener('change', onBreakpoint);

  addCleanup(() => {
    toggle.removeEventListener('click', onToggle);
    menu.removeEventListener('click', onMenuClick);
    document.removeEventListener('keydown', onKey);
    mqDesktop.removeEventListener('change', onBreakpoint);
    document.documentElement.classList.remove('menu-open');
  });
}

function setupAnchors() {
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;

    const anchor = e.target.closest('a[href]');
    if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

    let url;
    try {
      url = new URL(anchor.href, location.href);
    } catch {
      return;
    }
    if (url.origin !== location.origin) return;
    if (url.pathname.replace(/\/+$/, '') !== location.pathname.replace(/\/+$/, '')) return;
    if (!url.hash) return;

    const target = document.querySelector(url.hash);
    if (!target) return;

    e.preventDefault();
    history.pushState(null, '', url.hash);

    if (lenis) lenis.scrollTo(target, { offset: -92, duration: 1.1 });
    else
      target.scrollIntoView({
        behavior: mqReduce.matches ? 'auto' : 'smooth',
        block: 'start',
      });
  };

  document.addEventListener('click', onClick);
  addCleanup(() => document.removeEventListener('click', onClick));
}

function setupUtilityButtons() {
  // Back to top
  document.querySelectorAll('[data-to-top]').forEach((btn) => {
    const go = () => {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: mqReduce.matches ? 'auto' : 'smooth' });
    };
    btn.addEventListener('click', go);
    addCleanup(() => btn.removeEventListener('click', go));
  });

  // Copy email — each button reports into its own scoped status region
  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    const label = btn.querySelector('[data-copy-label]');
    const scope = btn.closest('[data-copy-scope]') || document;
    const status = scope.querySelector('[data-copy-status]');
    const original = label?.textContent ?? 'Copy email';
    let timer = 0;

    const setStatus = (msg) => {
      if (status) status.textContent = msg;
    };

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(site.email);
        if (label) label.textContent = 'Copied ✓';
        setStatus('Email address copied to clipboard.');
      } catch {
        setStatus(`Copy failed — email: ${site.email}`);
      }
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (label) label.textContent = original;
        setStatus('');
      }, 2600);
    };

    btn.addEventListener('click', copy);
    addCleanup(() => {
      clearTimeout(timer);
      btn.removeEventListener('click', copy);
    });
  });
}

function setupSmoothScroll() {
  if (mqReduce.matches || !mqFine.matches) return;

  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const loop = (time) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
}

/* ========================================================================== *
 * Choreography
 * ========================================================================== */

function heroIntro() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  const eyebrow = hero.querySelectorAll('[data-hero-eyebrow]');
  const lines = hero.querySelectorAll('.line-mask > span');
  const fades = hero.querySelectorAll('[data-hero-fade]');
  const portrait = hero.querySelector('[data-hero-portrait]');
  const rule = hero.querySelector('[data-hero-rule]');
  const index = hero.querySelectorAll('[data-hero-index]');

  if (eyebrow.length)
    tl.from(eyebrow, { y: 18, opacity: 0, duration: 0.7 }, 0.05);

  if (lines.length)
    tl.to(lines, { y: 0, duration: 1.1, stagger: 0.085, ease: 'expo.out' }, 0.15);

  if (portrait)
    tl.from(portrait, { opacity: 0, scale: 1.05, duration: 1.5, ease: 'expo.out' }, 0.25);

  if (rule) tl.from(rule, { scaleX: 0, duration: 1, ease: 'power4.inOut' }, 0.4);

  if (fades.length)
    tl.from(fades, { y: 24, opacity: 0, duration: 0.8, stagger: 0.09 }, 0.55);

  if (index.length)
    tl.from(index, { y: 14, opacity: 0, duration: 0.7, stagger: 0.07 }, 0.85);
}

function revealSections() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const delay = parseFloat(el.dataset.delay || '0');
    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      delay,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  // Staggered groups: parent carries `data-stagger`, children `[data-reveal-child]`
  gsap.utils.toArray('[data-stagger]').forEach((group) => {
    const children = group.querySelectorAll('[data-reveal-child]');
    if (!children.length) return;
    gsap.from(children, {
      opacity: 0,
      y: 30,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.09,
      clearProps: 'transform', // leave hover transforms to CSS
      scrollTrigger: { trigger: group, start: 'top 84%', once: true },
    });
  });
}

function parallax() {
  gsap.utils.toArray('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax) || 8;
    const wrap = el.closest('[data-parallax-scope]') || el.parentElement;
    gsap.to(el, {
      yPercent: amount,
      ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
    });
  });
}

function setupNavHighlight() {
  const links = [...document.querySelectorAll('[data-nav-link]')].filter((a) =>
    a.hash && a.pathname === location.pathname
  );
  if (!links.length) return;

  const setActive = (hash) => {
    links.forEach((a) => {
      if (a.hash === hash) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  links.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) setActive(link.hash);
      },
    });
  });

  addCleanup(() => links.forEach((a) => a.removeAttribute('aria-current')));
}

/* ---- Interactive project rows: cursor-following preview ---------------- */
function workPreview() {
  const follower = document.querySelector('[data-preview-follower]');
  const list = document.querySelector('[data-work-list]');
  if (!follower || !list || !mqFine.matches) return;

  // `main` is animated during page transitions, which would make `position: fixed`
  // resolve against it — lift the follower out to <body> so it tracks the viewport.
  if (follower.parentElement !== document.body) document.body.appendChild(follower);

  const xTo = gsap.quickTo(follower, 'x', { duration: 0.5, ease: 'power3' });
  const yTo = gsap.quickTo(follower, 'y', { duration: 0.5, ease: 'power3' });

  gsap.set(follower, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2, opacity: 0, scale: 0.92 });

  const previews = follower.querySelectorAll('[data-preview]');
  const rows = list.querySelectorAll('[data-work-row]');
  let visible = false;

  const show = (slug) => {
    previews.forEach((p) => p.classList.toggle('is-active', p.dataset.preview === slug));
    if (!visible) {
      visible = true;
      gsap.to(follower, { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
    }
  };

  const hide = () => {
    if (!visible) return;
    visible = false;
    gsap.to(follower, { opacity: 0, scale: 0.92, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  };

  rows.forEach((row) => {
    const slug = row.dataset.slug;
    const onEnter = () => show(slug);
    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    row.addEventListener('pointerenter', onEnter);
    row.addEventListener('pointermove', onMove);
    addCleanup(() => {
      row.removeEventListener('pointerenter', onEnter);
      row.removeEventListener('pointermove', onMove);
    });
  });

  list.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  addCleanup(() => {
    list.removeEventListener('pointerleave', hide);
    window.removeEventListener('blur', hide);
  });
}

function magneticButtons() {
  if (!mqFine.matches) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic) || 0.28;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    addCleanup(() => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    });
  });
}

/* ========================================================================== *
 * Init / lifecycle
 * ========================================================================== */

function scrollRestore(isFirst) {
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      requestAnimationFrame(() => {
        if (lenis) lenis.scrollTo(target, { immediate: true, offset: -92 });
        else target.scrollIntoView({ block: 'start' });
      });
      return;
    }
  }
  if (!isFirst) window.scrollTo(0, 0);
}

function initPage() {
  const root = document.documentElement;
  const isFirst = initialisedFor === null;
  initialisedFor = location.href;

  window.__saqrReady = false;
  window.__saqrArmFailsafe?.();

  try {
    if (ctx) {
      ctx.revert();
      ctx = null;
    }

    setupHeader();
    setupMenu();
    setupAnchors();
    setupUtilityButtons();

    if (mqReduce.matches) {
      // Static, fully legible page — CSS already neutralises reveal states.
      root.classList.remove('js');
    } else {
      root.classList.add('js');
      setupSmoothScroll();
      scrollRestore(isFirst);

      ctx = gsap.context(() => {
        heroIntro();
        revealSections();
        parallax();
        setupNavHighlight();
        workPreview();
        magneticButtons();
      });
      ScrollTrigger.refresh();
    }

    window.__saqrReady = true;
    clearTimeout(window.__saqrFailsafe);
  } catch (error) {
    console.error('[saqr] motion init failed:', error);
    root.classList.remove('js'); // release reveal states — content must stay visible
    window.__saqrReady = true;
    clearTimeout(window.__saqrFailsafe);
  }
}

/** Idempotent: runs on first load and after every view transition. */
function maybeInit() {
  if (initialisedFor === location.href) return;
  initPage();
}

document.addEventListener('astro:before-swap', hardTeardown);
document.addEventListener('astro:page-load', maybeInit);
maybeInit();
