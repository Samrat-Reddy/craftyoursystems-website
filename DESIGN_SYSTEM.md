# CYS Homepage — Design System & Architecture

## Information Architecture

### Section Hierarchy
1. **Nav** — Logo + nav links + CTA
2. **Hero** — Headline, subtext, dual CTAs, ambient 3D cube graphic
3. **Solutions** — 3-card grid (Websites, Software Systems, Custom Solutions)
4. **Featured Project** — Steward full-width spotlight
5. **Stats / Journey** — 4 milestone counters
6. **Projects Grid** — 3 project cards
7. **Timeline** — Horizontal journey from founding to now
8. **Vision / Road Ahead** — 3-phase roadmap
9. **CTA Banner** — Final conversion section
10. **Footer** — Links, socials, copyright

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#080A0C` | Page background |
| `--bg-surface` | `#0D1117` | Card backgrounds |
| `--bg-elevated` | `#141B22` | Elevated surfaces |
| `--accent-primary` | `#2DD9B4` | Teal — CTAs, highlights, icons |
| `--accent-dim` | `#1A8A74` | Dimmed teal for borders |
| `--text-primary` | `#F0F6FC` | Primary text |
| `--text-secondary` | `#8B949E` | Muted text |
| `--text-tertiary` | `#484F58` | Hint text |
| `--border-default` | `#21262D` | Default borders |
| `--border-subtle` | `#161B22` | Subtle separators |

---

## Typography System

- **Display**: `Inter` — variable weight 300–700, tracking -0.03em on large sizes
- **Body**: `Inter` — 400/500, generous line-height 1.65
- **Mono**: `JetBrains Mono` — used for labels, tags, code-adjacent UI

### Scale
| Role | Size | Weight | Tracking |
|---|---|---|---|
| Hero H1 | 64px / 4rem | 700 | -0.04em |
| Section H2 | 40px / 2.5rem | 600 | -0.02em |
| Card H3 | 20px / 1.25rem | 600 | -0.01em |
| Body | 16px | 400 | 0 |
| Caption/Label | 13px | 500 | 0.05em |

---

## Component Breakdown

```
<Nav />
  ├─ Logo (SVG wordmark)
  ├─ NavLinks
  └─ CTAButton

<HeroSection />
  ├─ EyebrowLabel
  ├─ H1 headline
  ├─ Subtext
  ├─ CTAGroup (primary + secondary)
  ├─ SocialProof ("student-led team")
  └─ HeroVisual (animated cube SVG/canvas)

<SolutionsSection />
  └─ SolutionCard × 3
       ├─ Icon
       ├─ Title
       ├─ Description
       └─ LearnMoreLink

<FeaturedProject />  (Steward)
  ├─ ProjectBadge ("In Active Development")
  ├─ AppScreenshot (desktop + mobile)
  └─ ProgressChecklist

<StatsSection />
  └─ StatCard × 4 (Product / Customer / Website / Journey)

<ProjectsGrid />
  └─ ProjectCard × 3 with status badges

<TimelineSection />
  └─ TimelineNode × 4 milestones

<VisionSection />
  ├─ VisionStatement
  └─ RoadmapPhase × 3

<CTABanner />

<Footer />
```

---

## Tailwind Strategy

Using Tailwind v4 with CSS custom properties layer. Key patterns:

- **`bg-[--bg-surface]`** for card backgrounds
- **`text-[--accent-primary]`** for teal accents
- **`border-[--border-default]`** for card borders
- Responsive: `md:grid-cols-3`, `lg:text-6xl`, `sm:flex-col`
- No utility soup — extract repeated patterns into `@apply` component classes in globals.css

---

## Animation Plan (Framer Motion)

| Component | Animation |
|---|---|
| Hero H1 | Staggered word reveal on mount |
| Hero Visual | Slow rotation + parallax on scroll |
| Section headers | Fade + slide up on enter viewport |
| Solution cards | Stagger fade-in on scroll enter |
| Stats | Number count-up on viewport enter |
| Project cards | Hover: slight lift + border glow |
| Timeline nodes | Sequential reveal on scroll |
| CTA Banner | Subtle pulse on the primary button |

All animations respect `prefers-reduced-motion`.

---

## Mobile Responsiveness

- **Nav**: Hamburger menu below `md`, slides in from right
- **Hero**: Stack visual below headline on mobile, reduced font sizes
- **Solutions**: 1-col → 3-col at `md`
- **Steward section**: Stack screenshot above text on mobile
- **Stats**: 2×2 grid on mobile
- **Projects**: 1-col → 3-col at `md`
- **Timeline**: Vertical stack on mobile
- **Footer**: 2-col → 4-col at `lg`
