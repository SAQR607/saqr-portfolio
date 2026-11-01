/**
 * Single source of truth for personal / site-wide content.
 * Edit here to change anything shown in the header, footer, about and contact.
 */

export const site = {
  name: 'Ibrahim Ahmed',
  shortName: 'SAQR',
  fullName: 'Ibrahim Ahmed (SAQR)',
  role: 'Front-End Developer & UI Engineer',
  tagline: 'Design-driven front-end development.',
  email: 'ibrahimsaqr607@gmail.com',
  description:
    'Portfolio of Ibrahim Ahmed (SAQR) — a front-end developer and UI engineer building fast, accessible, beautifully engineered web interfaces, design systems and motion work.',
  url: 'https://saqr607.github.io/saqr-portfolio/',
  base: '/saqr-portfolio',
  builtWith: ['Astro', 'GSAP', 'Lenis', 'Vanilla CSS'],
  availability: 'Available for freelance & full-time work',
};

export const nav = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Contact', href: '/#contact' },
];

/** Hero statistics — intentionally non-factual/evergreen. */
export const stats = [
  { value: '06', label: 'Selected projects' },
  { value: '100%', label: 'Hand-built front-ends' },
  { value: 'AA', label: 'Accessibility target' },
];

export const principles = [
  {
    n: '01',
    title: 'Structure before decoration',
    body: 'Layout, hierarchy and content order are settled first. Motion and colour are applied last, only where they earn their place.',
  },
  {
    n: '02',
    title: 'Performance is a feature',
    body: 'Lean bundles, GPU-friendly properties, self-hosted fonts and images served at the size they are rendered at.',
  },
  {
    n: '03',
    title: 'Details survive scrutiny',
    body: 'Focus states, reduced-motion paths, keyboard order, contrast ratios — the parts nobody notices when they are right.',
  },
];

export const capabilities = [
  {
    n: '01',
    title: 'Interface Engineering',
    body: 'Pixel-accurate, semantic, resilient UI built with modern tooling — from marketing pages to dense product surfaces.',
    tags: ['HTML / CSS', 'TypeScript', 'Component architecture'],
  },
  {
    n: '02',
    title: 'Design Systems',
    body: 'Token-driven systems with predictable scale, consistent spacing and typography that stays coherent as products grow.',
    tags: ['Design tokens', 'Type scales', 'Theming'],
  },
  {
    n: '03',
    title: 'Motion & Interaction',
    body: 'Choreographed entrances, scroll narratives and micro-interactions that guide attention instead of competing for it.',
    tags: ['GSAP', 'ScrollTrigger', 'CSS transitions'],
  },
  {
    n: '04',
    title: 'Performance & A11y',
    body: 'Core Web Vitals discipline, lazy loading, reduced-motion support and WCAG-minded contrast, focus and semantics.',
    tags: ['Core Web Vitals', 'WCAG 2.2', 'SEO'],
  },
];

/** Technologies referenced in the marquee strip. */
export const toolkit = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Astro',
  'Tailwind',
  'GSAP',
  'Figma',
  'Git',
  'Accessibility',
  'Performance',
];

export const social = [
  { label: 'Email', href: 'mailto:ibrahimsaqr607@gmail.com' },
];
