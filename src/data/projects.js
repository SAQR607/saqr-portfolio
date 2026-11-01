/**
 * Portfolio project data.
 *
 * Each entry is a complete design system: identity, palette (with HEX),
 * typography, IA, motion spec, stack and UI/UX rationale. The detail route and
 * the home page both render from here, so content edits happen in one place.
 */

export const projects = [
  /* ====================================================================== *
   * 01 · Nimbus — SaaS landing page
   * ====================================================================== */
  {
    slug: 'nimbus',
    idx: '01',
    name: 'Nimbus',
    kind: 'SaaS Landing Page',
    tagline: 'Cloud analytics for teams that ship.',
    year: '2026',
    role: 'Art direction · UI design · Front-end',
    duration: '4 weeks',
    mark: 'layers',
    accent: '#4F46E5',
    accentSoft: '#EEF2FF',
    surface: '#F7F8FC',
    ink: '#0B1020',

    problem:
      'A dense, technical analytics product needed a marketing site that felt effortless — and one that moved a visitor from curiosity to a free-trial signup inside a single scroll path.',
    solution:
      'A calm indigo-on-white system with one job per screen. Every section answers exactly one question the buyer is asking, and the product is always shown in context rather than described in the abstract.',

    overview: [
      'Nimbus is a full marketing site for a fictional product-analytics platform. The brief was conversion: establish credibility in the first viewport, prove capability through the product itself, and remove every ounce of friction between a reader and the trial button.',
      'The system is deliberately quiet. A single indigo family carries all interactive weight, off-white surfaces keep the page feeling light, and Outfit’s geometric curves soften what is otherwise a very technical subject. Hierarchy is built from size and space rather than colour, so the page never looks busy even where it is dense with information.',
    ],

    pages: ['Home', 'Pricing', 'Changelog', 'Customers', 'Sign up', 'Legal'],
    sections: [
      'Announcement bar',
      'Sticky navigation',
      'Hero with live product frame',
      'Customer logo cloud',
      'Bento feature grid',
      'Scroll-synced product tour',
      'Metric proof band',
      'Testimonial carousel',
      'Pricing with billing toggle',
      'FAQ accordion',
      'Closing CTA',
      'Footer',
    ],

    palette: [
      { name: 'Indigo 600', hex: '#4F46E5', use: 'Primary — buttons, links, focus' },
      { name: 'Violet 500', hex: '#7C3AED', use: 'Gradient partner, chart series 2' },
      { name: 'Ink', hex: '#0B1020', use: 'Headlines and body copy' },
      { name: 'Cloud', hex: '#F7F8FC', use: 'Page canvas' },
      { name: 'Pure', hex: '#FFFFFF', use: 'Raised cards and the nav' },
      { name: 'Mint 500', hex: '#34D399', use: 'Positive metrics only' },
      { name: 'Slate 500', hex: '#64748B', use: 'Secondary text' },
    ],

    typography: [
      {
        role: 'Display / Headlines',
        family: 'Outfit',
        detail: 'Variable 600–700 · tracking −2% · line-height 1.05',
        sample: 'Ship with clarity',
        size: 'clamp(40px, 6vw, 74px)',
      },
      {
        role: 'UI / Buttons / Nav',
        family: 'Outfit',
        detail: 'Variable 500–600 · tracking 0',
        sample: 'Start free trial',
        size: '15px',
      },
      {
        role: 'Body copy',
        family: 'Inter',
        detail: 'Variable 400 · line-height 1.65',
        sample: 'Nimbus turns raw events into decisions your whole team can act on.',
        size: '17px',
      },
      {
        role: 'Data / Labels',
        family: 'Inter',
        detail: 'Variable 500 · uppercase · tracking +12%',
        sample: 'Monthly active users',
        size: '12px',
      },
    ],

    motion: [
      {
        title: 'Hero settle',
        detail: 'Headline lines rise from a clipped mask with a 85ms stagger; the product frame scales 1.05 → 1 on an expo curve.',
        kind: 'Entrance',
      },
      {
        title: 'Bento cascade',
        detail: 'Feature cards fade and lift 30px as a group, staggered 90ms — the grid assembles rather than appears.',
        kind: 'Scroll-triggered',
      },
      {
        title: 'Billing toggle',
        detail: 'Prices cross-fade and count between monthly and annual while the pill thumb slides on a spring curve.',
        kind: 'Micro-interaction',
      },
      {
        title: 'Product tour sync',
        detail: 'The frame is pinned while copy scrolls; the highlighted UI region swaps as each step enters the viewport.',
        kind: 'Scroll-linked',
      },
    ],

    stack: {
      foundation: ['Astro', 'TypeScript', 'Semantic HTML'],
      style: ['Modern CSS (container queries)', 'Design tokens', 'CSS Grid + Flexbox'],
      motion: ['GSAP', 'ScrollTrigger', 'CSS transitions'],
      tooling: ['Figma', 'Git', 'Lighthouse CI'],
    },

    highlights: [
      {
        n: '01',
        title: 'One decision per viewport',
        body: 'Every section is scoped to a single question and a single action. The trial CTA repeats at three natural exit points instead of chasing the reader down the page.',
      },
      {
        n: '02',
        title: 'Colour is a system, not a mood',
        body: 'Indigo is reserved for things you can act on. Nothing decorative is allowed to wear the interactive colour, so affordance is never ambiguous.',
      },
      {
        n: '03',
        title: 'The product is the illustration',
        body: 'Rather than stock art, the interface itself is drawn in HTML — always legible, always pixel-crisp, and weightless compared with screenshots.',
      },
      {
        n: '04',
        title: 'Type that scales without breaking',
        body: 'A fluid clamp scale keeps the display sizes proportional at every width, so no breakpoint needs its own set of headline rules.',
      },
    ],

    responsive: {
      note: 'The bento grid folds from 3 columns to 2 to a single stack; the pinned product tour releases into a normal vertical flow below 768px so mobile never fights the scroll.',
      points: ['Desktop ≥1200px — 3-col bento, pinned tour', 'Tablet 768–1199px — 2-col bento', 'Mobile <768px — single column, unpinned tour'],
    },
  },

  /* ====================================================================== *
   * 02 · Atelier Noir — E-commerce
   * ====================================================================== */
  {
    slug: 'atelier',
    idx: '02',
    name: 'Atelier Noir',
    kind: 'E-Commerce Website',
    tagline: 'A quiet storefront where typography does the selling.',
    year: '2026',
    role: 'Art direction · UI design · Front-end',
    duration: '5 weeks',
    mark: 'monogram',
    accent: '#B4552F',
    accentSoft: '#F3E7E0',
    surface: '#F4F1EA',
    ink: '#101010',

    problem:
      'Luxury fashion sites usually shout. The label wanted the opposite: a storefront that feels like a printed lookbook, where the garment leads and the interface disappears.',
    solution:
      'An editorial layout with a high-contrast didone display face, generous negative space and a bone-and-ink palette. Interaction is limited to a few precise moments so the browsing pace stays unhurried.',

    overview: [
      'Atelier Noir is a complete commerce experience — storefront, collection browsing, filtering, product detail, editorial journal and a cart drawer — designed for a minimalist fashion label.',
      'Bodoni Moda carries the brand: its thin hairlines and dramatic contrast read as fashion without a single cliché. Archivo handles everything transactional, keeping sizes, prices and controls crisp and neutral. The result is a shop that feels art-directed down to the cart badge.',
    ],

    pages: ['Home', 'Collection', 'Product detail', 'Lookbook', 'Journal', 'Cart', 'Checkout', 'Account'],
    sections: [
      'Announcement bar',
      'Header with mega-nav',
      'Full-bleed lookbook hero',
      'Editorial intro spread',
      'New arrivals grid',
      'Category tiles',
      'Featured product story',
      'Journal preview',
      'Newsletter capture',
      'Footer',
    ],

    palette: [
      { name: 'Bone', hex: '#F4F1EA', use: 'Page canvas' },
      { name: 'Ink', hex: '#101010', use: 'Type, buttons, rules' },
      { name: 'Clay', hex: '#B4552F', use: 'Accent — sale, links, active states' },
      { name: 'Fog', hex: '#8C8880', use: 'Meta text, captions' },
      { name: 'Sand', hex: '#E4DED2', use: 'Product tile ground' },
      { name: 'Pure', hex: '#FFFFFF', use: 'Cards and drawer' },
    ],

    typography: [
      {
        role: 'Display / Brand',
        family: 'Bodoni Moda',
        detail: 'Variable 400–500 · tracking −1.5% · line-height 0.98',
        sample: 'Atelier Noir',
        size: 'clamp(48px, 9vw, 116px)',
      },
      {
        role: 'Editorial subhead',
        family: 'Bodoni Moda Italic',
        detail: 'Italic 400 · line-height 1.2',
        sample: 'Autumn, cut close',
        size: 'clamp(24px, 3vw, 38px)',
      },
      {
        role: 'UI / Product data',
        family: 'Archivo',
        detail: 'Variable 400–600 · tracking 0',
        sample: 'Wool overcoat — Charcoal',
        size: '15px',
      },
      {
        role: 'Eyebrows / Labels',
        family: 'Archivo',
        detail: 'Variable 500 · uppercase · tracking +18%',
        sample: 'New arrivals',
        size: '11px',
      },
    ],

    motion: [
      {
        title: 'Garment swap on hover',
        detail: 'Product cards cross-fade to the alternate view with a 300ms ease — no zoom, no lift, so the grid never jumps.',
        kind: 'Hover',
      },
      {
        title: 'Lookbook reveal',
        detail: 'Imagery unmasks bottom-to-top through a clip-path as it enters the viewport, echoing a print being uncovered.',
        kind: 'Scroll-triggered',
      },
      {
        title: 'Add-to-bag drawer',
        detail: 'The cart drawer slides on a 420ms cubic-bezier while the backdrop dims; the bag counter pulses once to confirm.',
        kind: 'UI transition',
      },
      {
        title: 'Sticky product bar',
        detail: 'On the product page, price and add-to-bag dock to the top edge only after the main CTA scrolls out of view.',
        kind: 'Scroll-linked',
      },
    ],

    stack: {
      foundation: ['Astro', 'TypeScript', 'Semantic HTML'],
      style: ['Design tokens', 'CSS Grid', 'Fluid type scale'],
      motion: ['GSAP', 'ScrollTrigger', 'CSS transitions'],
      tooling: ['Figma', 'Git', 'Sharp (image pipeline)'],
    },

    highlights: [
      {
        n: '01',
        title: 'Whitespace is the luxury signal',
        body: 'Section rhythm runs on a 1.5× scale compared with the marketing norm. The extra air does the work that ornament usually tries to do.',
      },
      {
        n: '02',
        title: 'Two typefaces, no exceptions',
        body: 'Bodoni for emotion, Archivo for information. Nothing else is permitted, which keeps even the busiest collection page coherent.',
      },
      {
        n: '03',
        title: 'Commerce controls that stay calm',
        body: 'Size selectors, filters and the cart use hairline borders and ink fills — functional, obvious, and never visually louder than the product.',
      },
      {
        n: '04',
        title: 'Legible didone at small sizes',
        body: 'Bodoni is only used at display sizes; anything under 24px switches to Archivo to avoid hairline stroke collapse on low-DPI screens.',
      },
    ],

    responsive: {
      note: 'The 4-up collection grid steps down to 2-up and then a horizontal snap rail on phones, so browsing stays thumb-friendly without shrinking the garments.',
      points: ['Desktop ≥1200px — 4-up grid, sticky product bar', 'Tablet 768–1199px — 2-up grid', 'Mobile <768px — snap rail, bottom-docked CTA'],
    },
  },

  /* ====================================================================== *
   * 03 · Synapse — AI product website
   * ====================================================================== */
  {
    slug: 'synapse',
    idx: '03',
    name: 'Synapse',
    kind: 'AI Product Website',
    tagline: 'An interface for orchestration across models.',
    year: '2026',
    role: 'Art direction · UI design · Front-end',
    duration: '6 weeks',
    mark: 'orbit',
    accent: '#22D3EE',
    accentSoft: '#0E2A31',
    surface: '#05060A',
    ink: '#E7F9FF',

    problem:
      'AI products all look alike: purple gradients, glowing brains, vague promises. The platform needed to signal genuine engineering depth without leaning on any of that.',
    solution:
      'A near-black technical canvas, a single electric cyan, and monospace used honestly — for real values, real latency numbers, real model names. Light is a signal, not a decoration.',

    overview: [
      'Synapse is a marketing site for a fictional model-orchestration platform: one API, many providers, predictable latency. The audience is engineers who are professionally allergic to marketing copy.',
      'The design answers that audience directly. A restrained dark palette, terminal-native typography and a hero built from a slow-moving gradient field rather than an illustration. Cyan appears only where the system is doing something — active states, live numbers, the caret in the console.',
    ],

    pages: ['Home', 'Platform', 'Pricing', 'Documentation', 'Changelog', 'Status'],
    sections: [
      'Glass navigation',
      'Gradient-field hero',
      'Terminal proof strip',
      'Capability bento',
      'How it works — three steps',
      'Benchmark comparison',
      'Model coverage grid',
      'Pricing',
      'Documentation teaser',
      'Footer',
    ],

    palette: [
      { name: 'Void', hex: '#05060A', use: 'Page canvas' },
      { name: 'Panel', hex: '#0C0F16', use: 'Raised cards, terminal body' },
      { name: 'Ion', hex: '#22D3EE', use: 'Accent — active states, live data' },
      { name: 'Flux', hex: '#A78BFA', use: 'Secondary series, gradient stop' },
      { name: 'Lime', hex: '#BEF264', use: 'Success / healthy status' },
      { name: 'Mist', hex: '#93A4B4', use: 'Secondary text' },
      { name: 'Edge', hex: '#1B2430', use: 'Hairlines and card borders' },
    ],

    typography: [
      {
        role: 'Display / Headlines',
        family: 'Space Grotesk',
        detail: 'Variable 500–700 · tracking −2.5% · line-height 1.02',
        sample: 'One API. Every model.',
        size: 'clamp(42px, 7vw, 88px)',
      },
      {
        role: 'Terminal / Values',
        family: 'JetBrains Mono',
        detail: 'Variable 400–700 · tracking 0 · tabular figures',
        sample: 'p95 latency  128ms',
        size: '14px',
      },
      {
        role: 'Body copy',
        family: 'Inter',
        detail: 'Variable 400 · line-height 1.7',
        sample: 'Route each request to the cheapest model that meets your quality bar.',
        size: '16px',
      },
      {
        role: 'Micro labels',
        family: 'JetBrains Mono',
        detail: 'Variable 500 · uppercase · tracking +16%',
        sample: 'SYS.STATUS / OPERATIONAL',
        size: '11px',
      },
    ],

    motion: [
      {
        title: 'Gradient field drift',
        detail: 'The hero backdrop is two blurred radial fields on a 24s keyframe loop, composited on the GPU — no canvas, no WebGL, negligible cost.',
        kind: 'Ambient loop',
      },
      {
        title: 'Terminal caret',
        detail: 'A block caret blinks on a 1s step timing function; the prompt line reveals with a stepped width animation clipped to the character grid.',
        kind: 'Micro-interaction',
      },
      {
        title: 'Benchmark fill',
        detail: 'Bars grow from zero to value with a 60ms stagger when the section enters, easing on power2.out so the numbers feel measured.',
        kind: 'Scroll-triggered',
      },
      {
        title: 'Card edge light',
        detail: 'Hovering a capability card lights its border with a pointer-tracking radial gradient — cyan only, at 12% opacity.',
        kind: 'Hover',
      },
    ],

    stack: {
      foundation: ['Astro', 'TypeScript', 'Semantic HTML'],
      style: ['CSS custom properties', 'Grid + subgrid', 'Backdrop-filter'],
      motion: ['GSAP', 'ScrollTrigger', 'CSS keyframes'],
      tooling: ['Figma', 'Git', 'SVG data-viz'],
    },

    highlights: [
      {
        n: '01',
        title: 'Restraint as a credibility signal',
        body: 'Cyan is rationed. Because it only marks live or interactive state, seeing it means something — which is exactly how a technical audience reads a UI.',
      },
      {
        n: '02',
        title: 'Code is real markup',
        body: 'The terminal blocks are HTML with syntax spans, not images — selectable, accessible, and sharp at any zoom level.',
      },
      {
        n: '03',
        title: 'Performance that matches the pitch',
        body: 'The ambient hero is pure CSS on compositor-friendly properties. No animation library is loaded above the fold for decoration.',
      },
      {
        n: '04',
        title: 'Honest data typography',
        body: 'Every number uses tabular monospace so columns align optically; benchmarks are labelled with their methodology inline.',
      },
    ],

    responsive: {
      note: 'The gradient field is repositioned and desaturated on small screens to protect contrast, and the terminal blocks scroll horizontally rather than wrap, preserving the monospace grid.',
      points: ['Desktop ≥1200px — bento 3-up, full field', 'Tablet 768–1199px — bento 2-up', 'Mobile <768px — stacked, reduced glow, scrollable code'],
    },
  },

  /* ====================================================================== *
   * 04 · Form & Co — Creative agency
   * ====================================================================== */
  {
    slug: 'formco',
    idx: '04',
    name: 'Form & Co',
    kind: 'Creative Agency Website',
    tagline: 'An agency site built like a printed annual.',
    year: '2026',
    role: 'Art direction · UI design · Front-end',
    duration: '6 weeks',
    mark: 'typeblock',
    accent: '#FF4D19',
    accentSoft: '#F6E3DA',
    surface: '#EDE7DD',
    ink: '#141312',

    problem:
      'A studio known for typographic work was being represented by a portfolio full of rounded cards and stock photography — a mismatch between the work and the way it was presented.',
    solution:
      'Treat the site as a publication. Oversized Fraunces headlines, hard chapter breaks, ink on bone, and motion used to turn pages rather than to decorate them.',

    overview: [
      'Form & Co is a portfolio site for a fictional brand and editorial studio. The whole experience is built around typography as the primary visual material — the type does the layout, the pacing and the personality.',
      'The design borrows from book and magazine craft: a warm bone paper, near-black ink, one signal orange reserved for wayfinding, and a chapter structure that lets each section arrive as its own spread.',
    ],

    pages: ['Home', 'Work index', 'Case study', 'Studio', 'Services', 'Contact'],
    sections: [
      'Full-bleed type hero',
      'Client marquee',
      'Manifesto spread',
      'Selected work index',
      'Capabilities chapters',
      'Studio and team',
      'Recognition list',
      'Contact invitation',
      'Footer',
    ],

    palette: [
      { name: 'Bone', hex: '#EDE7DD', use: 'Page canvas' },
      { name: 'Ink', hex: '#141312', use: 'Type and dark chapters' },
      { name: 'Signal', hex: '#FF4D19', use: 'Accent — index, links, active chapter' },
      { name: 'Graphite', hex: '#5B5852', use: 'Secondary text' },
      { name: 'Paper', hex: '#FBF9F5', use: 'Raised editorial panels' },
      { name: 'Rule', hex: '#C9C2B6', use: 'Hairlines and dividers' },
    ],

    typography: [
      {
        role: 'Display / Chapter titles',
        family: 'Fraunces',
        detail: 'Variable 300–700 · optical size 144 · SOFT 40 · tracking −3%',
        sample: 'Form & Co',
        size: 'clamp(56px, 13vw, 168px)',
      },
      {
        role: 'Editorial lead',
        family: 'Fraunces Italic',
        detail: 'Italic 300 · optical size 72',
        sample: 'We make identities that hold up in print.',
        size: 'clamp(26px, 3.4vw, 44px)',
      },
      {
        role: 'Body / UI',
        family: 'Manrope',
        detail: 'Variable 400–600 · line-height 1.6',
        sample: 'Brand systems, editorial design and the front-ends that carry them.',
        size: '17px',
      },
      {
        role: 'Index / Numbering',
        family: 'Manrope',
        detail: 'Variable 600 · tabular · tracking +4%',
        sample: '04 — Selected work',
        size: '12px',
      },
    ],

    motion: [
      {
        title: 'Chapter headline reveal',
        detail: 'Words rise from an overflow mask on a 70ms stagger — the page reads itself into view rather than fading in wholesale.',
        kind: 'Scroll-triggered',
      },
      {
        title: 'Horizontal work rail',
        detail: 'The work index pins and translates horizontally, driven by vertical scroll progress, then releases back into the document flow.',
        kind: 'Scroll-linked',
      },
      {
        title: 'Image unmask',
        detail: 'Photography is revealed through an expanding clip-path with a subtle counter-scale, so it feels uncovered rather than swapped.',
        kind: 'Scroll-triggered',
      },
      {
        title: 'Index hover state',
        detail: 'Hovering a work row pushes the title 24px right, lights the index number signal-orange and fades the sibling rows to 40%.',
        kind: 'Hover',
      },
    ],

    stack: {
      foundation: ['Astro', 'TypeScript', 'Semantic HTML'],
      style: ['Fluid type scale', 'Design tokens', 'CSS logical properties'],
      motion: ['GSAP', 'ScrollTrigger', 'CSS transitions'],
      tooling: ['Figma', 'Git', 'Variable font axes'],
    },

    highlights: [
      {
        n: '01',
        title: 'Type carries the whole layout',
        body: 'No cards, no containers — alignment, scale and rules do the structural work. Fewer boxes means fewer decisions to keep consistent.',
      },
      {
        n: '02',
        title: 'Chapters, not sections',
        body: 'Alternating bone and ink backgrounds reset attention at each chapter boundary, giving a long page a legible rhythm.',
      },
      {
        n: '03',
        title: 'Variable axes used on purpose',
        body: 'Fraunces’ optical-size and SOFT axes are set per role, so display and lead copy feel related without being identical.',
      },
      {
        n: '04',
        title: 'Motion with narrative intent',
        body: 'Every animation is either a page turn, a reveal or a wayfinding cue. Nothing moves for its own sake.',
      },
    ],

    responsive: {
      note: 'The horizontal rail becomes a vertical list below 768px — pinned horizontal scrolling is disabled on touch so the page never traps the reader.',
      points: ['Desktop ≥1200px — horizontal work rail, 168px display', 'Tablet 768–1199px — rail retained, reduced display', 'Mobile <768px — vertical list, single column'],
    },
  },

  /* ====================================================================== *
   * 05 · Pulse — Analytics dashboard
   * ====================================================================== */
  {
    slug: 'pulse',
    idx: '05',
    name: 'Pulse',
    kind: 'Analytics Dashboard',
    tagline: 'Dense data, calm interface.',
    year: '2026',
    role: 'UI design · Front-end · Data visualisation',
    duration: '5 weeks',
    mark: 'chart',
    accent: '#2563EB',
    accentSoft: '#E8EEFB',
    surface: '#F6F7F9',
    ink: '#0F172A',

    problem:
      'Reporting tools tend to become walls of numbers. The challenge was to pack real analytical depth into an interface that stays scannable at a glance and trustworthy under scrutiny.',
    solution:
      'A light, quiet shell with strict visual hierarchy: one accent for the primary series, monospace tabular figures everywhere a value appears, and charts that share a single grid so they can be read together.',

    overview: [
      'Pulse is a full analytics product surface — navigation, filter rail, KPI overview, traffic and acquisition charts, a cohort heatmap and an events table — designed for teams who live in the tool all day.',
      'The design principle is calm density. Whitespace is budgeted rather than generous; alignment, consistent 8px chart grids and a restrained categorical palette do the work of keeping a busy screen readable.',
    ],

    pages: ['Overview', 'Reports', 'Cohorts', 'Events', 'Funnels', 'Settings', 'Team'],
    sections: [
      'Sidebar navigation',
      'Top bar with date range',
      'KPI summary row',
      'Traffic area chart',
      'Acquisition breakdown',
      'Channel performance table',
      'Cohort retention heatmap',
      'Real-time events feed',
      'Alerts panel',
    ],

    palette: [
      { name: 'Canvas', hex: '#F6F7F9', use: 'App background' },
      { name: 'Surface', hex: '#FFFFFF', use: 'Cards, tables, panels' },
      { name: 'Ink', hex: '#0F172A', use: 'Primary text' },
      { name: 'Azure', hex: '#2563EB', use: 'Primary series, active nav' },
      { name: 'Emerald', hex: '#16A34A', use: 'Positive delta' },
      { name: 'Amber', hex: '#F59E0B', use: 'Warning / secondary series' },
      { name: 'Line', hex: '#E2E8F0', use: 'Borders and grid lines' },
      { name: 'Slate', hex: '#64748B', use: 'Labels and axis text' },
    ],

    typography: [
      {
        role: 'Page title / Section',
        family: 'IBM Plex Sans',
        detail: 'Variable 600 · tracking −1% · line-height 1.2',
        sample: 'Traffic overview',
        size: '22px',
      },
      {
        role: 'KPI values',
        family: 'IBM Plex Mono',
        detail: 'Variable 500 · tabular figures · tracking −1%',
        sample: '128,402',
        size: '32px',
      },
      {
        role: 'Table and UI text',
        family: 'IBM Plex Sans',
        detail: 'Variable 400–500 · line-height 1.5',
        sample: 'Session duration',
        size: '14px',
      },
      {
        role: 'Axis / Micro labels',
        family: 'IBM Plex Mono',
        detail: 'Variable 400 · uppercase · tracking +8%',
        sample: 'JUL 01 — JUL 31',
        size: '11px',
      },
    ],

    motion: [
      {
        title: 'Chart draw-in',
        detail: 'Line charts stroke-dash from 0 to full length over 900ms; area fills fade in behind so the line stays the focus.',
        kind: 'Scroll-triggered',
      },
      {
        title: 'KPI count-up',
        detail: 'Values interpolate from zero to their real figure with a tabular-width container, so nothing reflows while counting.',
        kind: 'Entrance',
      },
      {
        title: 'Crosshair tooltip',
        detail: 'Pointer movement snaps the crosshair to the nearest data point with a 120ms transition instead of tracking freely.',
        kind: 'Hover',
      },
      {
        title: 'Filter re-flow',
        detail: 'Applying a filter fades the affected cards to 45% opacity, swaps values, then returns them — never a full-page spinner.',
        kind: 'UI transition',
      },
    ],

    stack: {
      foundation: ['Astro', 'TypeScript', 'Semantic HTML'],
      style: ['Design tokens', 'CSS Grid', 'Fluid density modes'],
      motion: ['GSAP', 'SVG animation', 'CSS transitions'],
      tooling: ['Figma', 'Git', 'Hand-built SVG charts'],
    },

    highlights: [
      {
        n: '01',
        title: 'Numbers never move the layout',
        body: 'Every metric uses tabular figures inside a fixed-width slot, so counting animations and data refreshes can’t shift neighbouring UI.',
      },
      {
        n: '02',
        title: 'Charts hand-built in SVG',
        body: 'No charting library — the series are generated as paths at build time, keeping the payload tiny and the styling fully on-token.',
      },
      {
        n: '03',
        title: 'Colour that survives colour-blindness',
        body: 'Series are separated by lightness as well as hue, and the two primary series are additionally distinguished by a dashed stroke.',
      },
      {
        n: '04',
        title: 'Density without noise',
        body: 'An 8px baseline underlies every card, chart and row. Consistent rhythm is what lets a screen this full still feel quiet.',
      },
    ],

    responsive: {
      note: 'The sidebar collapses to an icon rail at 1024px and into a sheet below 768px; the events table becomes a stacked definition list rather than a horizontal scroll.',
      points: ['Desktop ≥1200px — full sidebar, 4-up KPIs', 'Tablet 768–1199px — icon rail, 2-up KPIs', 'Mobile <768px — nav sheet, stacked cards'],
    },
  },

  /* ====================================================================== *
   * 06 · Studio Saqr — Personal brand / business
   * ====================================================================== */
  {
    slug: 'studio',
    idx: '06',
    name: 'Studio Saqr',
    kind: 'Personal Brand Website',
    tagline: 'A premium identity-led business site.',
    year: '2026',
    role: 'Brand direction · UI design · Front-end',
    duration: '4 weeks',
    mark: 'seal',
    accent: '#C87941',
    accentSoft: '#EFE3D5',
    surface: '#0E1C17',
    ink: '#FBF8F3',

    problem:
      'A consultancy selling high-end positioning was presenting itself with a template. The brand promised rigour; the site needed to demonstrate it before a single claim was read.',
    solution:
      'A deep pine canvas, warm sand typography and a copper accent, with Bricolage Grotesque’s variable weight animated across the page so the identity literally shifts as you move through it.',

    overview: [
      'Studio Saqr is a premium personal-brand and business site: statement hero, services, case studies, process, testimonial, journal and contact — everything a boutique consultancy needs to convert a cold visitor.',
      'The identity is built from contrast: a very dark, almost forest floor background against warm sand type, with copper reserved for moments of commitment. The typography is expressive but never noisy, and the whole page is engineered to feel deliberate.',
    ],

    pages: ['Home', 'Services', 'Case studies', 'Process', 'Journal', 'Contact'],
    sections: [
      'Statement hero with portrait',
      'Credibility strip',
      'Services ledger',
      'Selected case studies',
      'Four-step process',
      'Client testimonial',
      'Journal preview',
      'Contact invitation',
      'Footer',
    ],

    palette: [
      { name: 'Pine', hex: '#0E1C17', use: 'Page canvas' },
      { name: 'Deep pine', hex: '#081310', use: 'Contrast chapters' },
      { name: 'Sand', hex: '#E7DCC9', use: 'Primary type' },
      { name: 'Copper', hex: '#C87941', use: 'Accent — links, commitment points' },
      { name: 'Moss', hex: '#3E5C4E', use: 'Rules and borders' },
      { name: 'Chalk', hex: '#FBF8F3', use: 'Headline emphasis' },
    ],

    typography: [
      {
        role: 'Display / Statement',
        family: 'Bricolage Grotesque',
        detail: 'Variable 300–800 · tracking −3.5% · line-height 0.96',
        sample: 'Clarity is a service',
        size: 'clamp(46px, 9vw, 124px)',
      },
      {
        role: 'Section headings',
        family: 'Bricolage Grotesque',
        detail: 'Variable 600 · tracking −2%',
        sample: 'What we take on',
        size: 'clamp(28px, 4vw, 52px)',
      },
      {
        role: 'Body / Services',
        family: 'Sora',
        detail: 'Variable 400 · line-height 1.65',
        sample: 'Positioning, narrative and the interface that carries them.',
        size: '17px',
      },
      {
        role: 'Meta / Ledger labels',
        family: 'Sora',
        detail: 'Variable 500 · uppercase · tracking +16%',
        sample: 'Engagement 01',
        size: '11px',
      },
    ],

    motion: [
      {
        title: 'Weight-shift headlines',
        detail: 'Display lines interpolate from 300 to 700 as they cross the viewport centre, using the variable axis rather than a size change.',
        kind: 'Scroll-linked',
      },
      {
        title: 'Portrait unmask',
        detail: 'The portrait is revealed through a mask that opens vertically while the image settles from 1.06 scale to 1.',
        kind: 'Entrance',
      },
      {
        title: 'Ledger row hover',
        detail: 'Service rows expand to reveal their detail copy on a grid-template-rows transition, while the index number slides to copper.',
        kind: 'Hover',
      },
      {
        title: 'Copper commit sweep',
        detail: 'Primary actions fill left-to-right with copper on hover; the label inverts to the dark canvas colour for contrast.',
        kind: 'Micro-interaction',
      },
    ],

    stack: {
      foundation: ['Astro', 'TypeScript', 'Semantic HTML'],
      style: ['Design tokens', 'CSS Grid', 'Variable font axes'],
      motion: ['GSAP', 'ScrollTrigger', 'CSS transitions'],
      tooling: ['Figma', 'Git', 'Sharp (image pipeline)'],
    },

    highlights: [
      {
        n: '01',
        title: 'Dark done warm',
        body: 'Pine rather than neutral black, sand rather than white — the contrast ratio stays above 14:1 while the page reads warm instead of clinical.',
      },
      {
        n: '02',
        title: 'Variable weight as brand behaviour',
        body: 'Animating the weight axis gives the identity motion without adding a single graphic asset, and it degrades to a static weight gracefully.',
      },
      {
        n: '03',
        title: 'Ledgers instead of cards',
        body: 'Services are presented as an expanding ledger — denser, more editorial, and far more distinctive than the standard three-card row.',
      },
      {
        n: '04',
        title: 'One accent, used sparingly',
        body: 'Copper only appears where the visitor can commit. That discipline makes the primary action unmistakable on a dark canvas.',
      },
    ],

    responsive: {
      note: 'The portrait moves above the statement on mobile and loses its parallax; the ledger rows expand by tap rather than hover so every interaction has a touch equivalent.',
      points: ['Desktop ≥1200px — split hero, hover ledgers', 'Tablet 768–1199px — stacked hero, 2-col services', 'Mobile <768px — single column, tap-to-expand'],
    },
  },
];

export const featuredProjects = projects;

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacent(slug) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
