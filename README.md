# CYS Homepage — Craft Your Systems

Production-quality homepage for Craft Your Systems. Built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type-check
npm run type-check
```

---

## Project Structure

```
cys-homepage/
├── src/
│   ├── app/
│   │   ├── globals.css          # Design tokens + Tailwind layers
│   │   ├── layout.tsx           # Root layout with metadata + fonts
│   │   └── page.tsx             # Homepage — assembles all sections
│   └── components/
│       ├── Nav.tsx              # Sticky nav with scroll blur + mobile drawer
│       ├── HeroSection.tsx      # Hero with animated 3D wireframe cube
│       └── sections.tsx         # All remaining sections (tree below)
│           ├── SolutionsSection
│           ├── FeaturedProjectSection  (Steward)
│           ├── StatsSection
│           ├── ProjectsSection
│           ├── TimelineSection
│           ├── VisionSection
│           ├── CTASection
│           └── Footer
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## Design System

### Color Tokens (CSS Custom Properties)

| Token            | Value     | Usage                        |
|------------------|-----------|------------------------------|
| `--bg-base`      | `#080A0C` | Page background              |
| `--bg-surface`   | `#0D1117` | Card backgrounds             |
| `--bg-elevated`  | `#131A22` | Elevated / hover states      |
| `--accent`       | `#2DD9B4` | Primary teal — CTAs, icons   |
| `--accent-glow`  | rgba teal | Icon backgrounds, soft fills |
| `--accent-border`| rgba teal | Glowing card borders         |
| `--text-1`       | `#F0F6FC` | Primary text                 |
| `--text-2`       | `#8B949E` | Secondary / muted text       |
| `--text-3`       | `#4A5568` | Tertiary / hints             |
| `--border`       | `#1E2530` | Default borders              |
| `--border-subtle`| `#131920` | Subtle separators            |

### Typography

- **Display**: `Inter` via `next/font/google` — 700/800 weight, tracking -0.04em
- **Body**: `Inter` 400/500 — 16px, line-height 1.65
- **Mono**: `JetBrains Mono` — eyebrow labels, badges, code-adjacent UI

### Reusable Classes (defined in globals.css)

```css
.eyebrow       /* 11px mono uppercase teal label */
.section-title /* fluid clamp(1.8rem → 2.6rem) headline */
.card-surface  /* dark card with hover accent border */
.btn-primary   /* teal CTA button */
.btn-ghost     /* outlined ghost button */
.badge         /* pill badge base */
.badge-teal / .badge-blue / .badge-amber
```

---

## Component Architecture

### `<Nav />`
- Transparent on load → blur/border on scroll via `useEffect` + `scrollY`
- Desktop: logo + nav links + dual CTA buttons
- Mobile: hamburger → `framer-motion` slide-in drawer with overlay
- Scroll lock on `body` when drawer is open

### `<HeroSection />`
- Grid background (CSS `background-image`)
- Ambient glow orbs (CSS `radial-gradient`)
- Headline with `framer-motion` stagger fade-up (0ms → 480ms delays)
- Canvas-based animated 3D wireframe cube (pure Canvas2D, no WebGL dependency)
  - Outer cube + inner cube + connector dashed lines
  - Orbiting dot particles
  - Respects `prefers-reduced-motion` — static frame if reduced

### `<SolutionsSection />`
- 3-column responsive grid → 2-col (md) → 1-col (sm)
- Each card: `card-surface` hover effects + animated arrow gap on hover

### `<FeaturedProjectSection />` (Steward)
- Split layout: left = pixel-precise app UI mockup (pure HTML/CSS, no images), right = info panel
- Mock browser chrome + sidebar + stats + order table
- Progress checklist: teal check ✓ for done, dimmed dot for pending
- `badge-teal` with pulsing dot animation via `@keyframes pulse-dot`

### `<StatsSection />`
- Full-width dark surface with divided 4-column grid
- Stats: 2×2 on mobile, 4-col on desktop

### `<ProjectsSection />`
- 3-card grid with thumbnail area, badge, desc, arrow link
- `card-surface` hover border glow

### `<TimelineSection />`
- Horizontal on desktop (nodes with `::before` connecting line)
- Vertical on mobile (left-aligned with vertical connector)
- Done nodes: teal fill + checkmark; future: dimmed + dashed

### `<VisionSection />`
- 2-col layout: statement left + roadmap right
- 3-phase roadmap with active/dimmed arrow indicators
- Hover background reveal on each phase row

### `<CTASection />`
- Full-width card with radial gradient glow at top
- Dual CTA: "Start a Project" + "Schedule a Call"

### `<Footer />`
- 5-column grid → 2-col (sm) → 1-col (mobile)
- Brand + social icons + 4 nav columns
- `JetBrains Mono` copyright bottom bar

---

## Animation Strategy (Framer Motion)

| Component       | Motion                                          |
|-----------------|-------------------------------------------------|
| Hero words      | `opacity: 0 → 1`, `y: 20 → 0`, stagger 120ms   |
| All sections    | `useInView` + `motion.div` fade-up on enter     |
| Cube            | `requestAnimationFrame` Canvas2D rotation loop  |
| Badge dot       | CSS `@keyframes pulse-dot` 2s infinite          |
| Card hover      | CSS `transition: border-color, background`      |
| Arrow links     | CSS `transition: gap` on hover                  |
| Nav scroll      | CSS `transition: background, backdrop-filter`   |
| Mobile drawer   | Framer `x: 100% → 0` spring animation          |

All animations respect `prefers-reduced-motion: reduce`.

---

## Extending

### Adding a new section

1. Add a named export to `src/components/sections.tsx`
2. Import and place it in `src/app/page.tsx`
3. Use `<FadeIn>` wrapper for scroll animation
4. Use `.card-surface` for card styles, `.eyebrow` for labels

### Updating Steward progress

In `sections.tsx`, find `STEWARD_FEATURES` and set `done: true/false`:

```ts
const STEWARD_FEATURES = [
  { label: 'Payments & Billing', done: true }, // flip to true when shipped
  ...
]
```

### Adding a project

In `sections.tsx`, add to the `PROJECTS` array:

```ts
{
  title: 'New Project',
  subtitle: 'Category',
  badge: { label: 'Delivered', variant: 'badge-blue' },
  desc: 'Short description of what was built.',
}
```

---

## Production Checklist

- [ ] Replace `href="#"` social links with real URLs
- [ ] Replace `mailto:hello@craftyoursystems.in` with live email
- [ ] Replace `tel:+917304567890` with real phone
- [ ] Add real `og:image` to `layout.tsx` metadata
- [ ] Add `favicon.ico` and `apple-touch-icon.png` to `/public`
- [ ] Set up Vercel project + connect domain `craftyoursystems.in`
- [ ] Enable Vercel Analytics for page views

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

Or connect the GitHub repo to Vercel for automatic deploys on push.
