# eliudsamwel.dev design language

Reference for building new UI that matches the site. Every value comes from the code (as of 2026-10-10). When code and this file disagree, the code wins — update this file in the same change.

## Overview

- Near-black canvas (`#0A0A0A`) or warm off-white (`#FDFCFA`) with one accent family: an amber-to-orange gradient (`#F59E0B` → `#F97316`), plus yellow `#FCD34D` as an optional third stop.
- The type is Inter throughout. Headlines are heavy (700–900) and two-tone, with neutral words and one gradient keyword. Small labels are uppercase and tracked.
- Surfaces are rounded, soft "embossed" cards and pills (`styles/emboss.css`) with a top-edge rim highlight and soft drop shadows. Amber glows and particles are used sparingly. Dark mode is the signature look: the particles, the timeline and `theme-color` were designed for it.

## Rules for new UI

Follow these before anything else; they come from a full review of the live site.

1. **One story.** The site presents Eliud as a data annotator & AI content evaluator with a full-stack engineering background. Copy, meta tags, alt text and the chatbot context (`config/customContext.ts`) must all say that. Engineering supports the story; it isn't the headline.
2. **No placeholder numbers.** Never ship invented stats (views, likes, percentages, "2 months ago", lines of code). Show a metric only if it's real and sourced (e.g. 35/35 on the Video Master eval). If there's no data, show nothing.
3. **Badges are scarce.** "Featured" goes on at most three projects. No self-assessed badges ("Advanced", "High Impact", "Hot").
4. **Real images only.** Projects use real screenshots from `public/images/projects/`. Without one, the card shows the branded initials tile — never stock photos.
5. **Use the canonical tokens** (`--color-*`, `--accent-*` from `styles/theme.css`). Accent-colored *text* uses `--accent-text` so it passes 4.5:1 in light mode. Page titles that need the yellow gradient use `.title-gradient`, which swaps to deeper stops in light mode.
6. **No opacity modifiers on `var()` colors.** `bg-[var(--x)]/20` compiles to nothing in Tailwind v3. Use `color-mix(in srgb, var(--x) 20%, transparent)` in CSS, or a palette color (`bg-amber-500/10`). Tailwind's `white` is real `#ffffff`; for theme-aware backgrounds use `primary-bg` / `surface-base`.
7. **Phones get one floating control.** Below `lg` only the chat bubble floats; theme switching lives in the mobile header and navigation in the menu. Nothing may cover headings or content at 390px.
8. **Check both themes and both sizes** (1440px and 390px, dark and light) before merging. Hard-coded white or yellow text is the most common light-mode failure.
9. **Accessibility basics:** 44px touch targets, visible focus states, alt text on every image, pinch zoom left enabled, motion that respects `prefers-reduced-motion`.
10. **Lead with the task.** Put the primary action (a form, the projects grid) in the first screen; collapse secondary controls (filters) behind a button on phones.

## Theming

| Mechanism | Where | Notes |
|---|---|---|
| Theme classes on `<html>` | inline `<script>` in `index.html` `<head>` (before paint) | Sets `data-theme="dark|light"` **and** `.dark`/`.light` on `<html>`. Reads `localStorage.theme` and falls back to `prefers-color-scheme`. |
| React state | `hooks/useThemeManager.ts` → `App.tsx` | Same contract: writes `data-theme`, toggles `.dark`/`.light`, persists `localStorage['theme']`. |
| Tailwind | `tailwind.config.js` `darkMode: 'class'` | `dark:` variants key off `html.dark`. |
| CSS variables | `styles/theme.css` | `:root` = light, `html.dark` = dark. A `@media (prefers-color-scheme: dark) :root:not(.light)` fallback duplicates the dark values. `.force-dark-theme` forces dark on a subtree. |
| Desktop toggle | `components/ThemeToggle.tsx` mounts `scripts/themeToggle.js` (SkyThemeToggle) | Fixed sky-orb button, 60px (48px under 768px), top/right 20px. It persists to a **different** key, `localStorage['theme-preference']`, and syncs React through a `themeChanged` window event. Hidden under 1024px (`styles/theme.css`). |
| Mobile toggle | `components/Header.tsx` | `lifted pill` 44/48px button with lucide `Sun`/`Moon`, shown below `lg`. |

Rule: style only against `html.dark` / Tailwind `dark:` (both work). The `[data-theme]` attribute is set but only `src/styles/theme.css` (unused) selects on it.

### Token sets and the recommended canonical set

Several overlapping variable families exist. Usage counts are `var(--…)` occurrences in `.tsx` under `components/`, `src/` and `App.tsx`.

| Family | Defined in | Uses (files) | Status |
|---|---|---|---|
| `--color-*` / `--accent-*` (e.g. `--color-text`, `--color-bg-card`, `--accent-primary`) | `styles/theme.css`, per theme | 335 (23) | **Canonical.** The source of truth. Tailwind colors, `emboss.css` and the chat CSS all build on it. Recently edited components (Header, Footer, emboss ProjectCard) use it exclusively. |
| Legacy aliases (`--primary-amber`, `--secondary-text`, `--primary-text`, `--card-border`, `--accent-color`, `--card-bg`, `--secondary-bg`, `--primary-orange`, `--hover-bg`, `--primary-bg`) | original values in the `index.html` inline `<style>`; re-pointed to the canonical set in `styles/theme.css` | 399 (29) | Compatibility only. Most uses come from a few older pages: ContactAdminDashboard 71, ResumePage 70, BlogPostDetail 54, ProjectsPage 46, BlogPage 45. |
| Cool-gray set (`--color-text-primary`, `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-hover`) | `src/index.css` `:root` / `.dark` (Tailwind gray hexes) | 58 (6) | Off-palette. Mostly ProjectDetailModal, CompleteUIShowcase, ProjectGallery. |
| Journey set (`--text-primary/-secondary/-tertiary`, `--bg-primary`, `--gradient-primary`, `--glow-amber`) | `styles/modern-journey.css` `:root` (dark-only literals) | CSS only | Scoped to the timeline in practice, but declared globally. |
| Undefined, resolving to nothing: `--bg-base` 5, `--color-bg-input` 6, `--color-accent-mid` 5, `--tertiary-bg` 3, `--accent-color-purple` 2, `--color-accent-start/-end` 1 each, `--surface-raised` 1 | none | 24 | Bugs. Replace when you touch them. |

Migration map for new or edited code:

| Legacy name | Count | Use instead |
|---|---|---|
| `--primary-amber`, `--accent-color` | 115, 24 | `--accent-secondary`, or `--accent-text` for text on light backgrounds |
| `--primary-orange` | 14 | `--accent-primary` |
| `--secondary-text` / `--primary-text` | 110 / 80 | `--color-text-secondary` / `--color-text` |
| `--card-bg` / `--secondary-bg` / `--primary-bg` | 21 / 15 / 4 | `--color-bg-card` / `--color-bg-surface` / `--color-bg-base` |
| `--card-border` | 27 | `--color-border`. (Light mode used to inherit the dark `#2a2a2a` from `index.html`; `styles/theme.css` now maps it to `--color-border` under `html:not(.dark)`.) |
| `--hover-bg`, `--color-bg-hover` | 6, 9 | `--color-hover-bg` |
| `--color-text-primary` / `--color-bg-primary` / `--color-bg-secondary` | 38 / 4 / 8 | `--color-text` / `--color-bg-base` / `--color-bg-surface` |

## Color tokens

Source: `styles/theme.css` unless noted. † marks where the effective light value differs because a later stylesheet redeclares the token on `:root` (cascade verified in the built bundle `dist/css/index-*.css`).

| Token | Dark | Light | Use |
|---|---|---|---|
| `--color-bg-base` | `#0A0A0A` | `#FDFCFA` | page background (`body`, preloader) |
| `--color-bg-surface` | `#101010` | `#F9F7F4` → **`#FFFFFF`†** (`src/index.css`) | inputs, filter chips, section blocks |
| `--color-bg-card` | `#141414` | `#FFFFFF` | cards, emboss surfaces, active nav item, chat panel |
| `--color-bg-muted` | `#181818` | `#F5F3F0` | count bubbles, alternate sections |
| `--color-input-bg` | `#1F1F1F` | `#FFFFFF` | `.recessed` wells |
| `--color-hover-bg` | `#282828` | `#F0EBE5` | nav hover, ghost button hover |
| `--color-border` | `#2A2A2A` | `#EDE9E3` → **`#E5E7EB`†** (`src/index.css`) | card and input borders, dividers, grid pattern |
| `--color-border-light` | `#3A3A3A` | `#F5F3F0` | subtle dividers |
| `--color-text` | `#EAEAEA` | `#2C2825` | primary text |
| `--color-text-secondary` | `#B0B0B0` | `#5C5550` → **`#6B7280`†** (`src/index.css`) | body copy, subtitles |
| `--color-text-muted` | `#707070` | `#8B8680` | meta text, `.emboss-meta` |
| `--color-text-on-accent` | `#FFFFFF` | `#FFFFFF` | text on gradients |
| `--accent-primary` | `#F97316` | `#F97316` | orange: `lifted-primary`, focus ring (`--color-focus-ring`), links |
| `--accent-secondary` | `#F59E0B` | `#F59E0B` | amber: gradient start, highlights |
| `--accent-hover` | `#D34C0A` | `#EA580C` | pressed/hover orange |
| `--accent-light` | `#4A2E0F` | `#FED7AA` → **`#FFCA28`†** in prod builds (`styles/modern-journey.css`) | tinted chip backgrounds |
| `--accent-yellow` | `#FCD34D` | `#FCD34D` → **`#FFD54F`†** in prod (`modern-journey.css`) | optional third gradient stop |
| `--accent-text` (new) | `#F59E0B` | `#9A3412` | accent-colored text that must pass 4.5:1 |
| `--accent-gradient` / `--text-gradient` | `135deg, #F59E0B → #F97316` | same | primary fills, bars, `.gradient-text` |
| `--accent-gradient-multi` | `135deg, #F97316 → #F59E0B → #FCD34D` | same | `.gradient-text-multi`, profile ring |
| `.title-gradient` | `to right`: amber → yellow → orange | `#D97706 → #EA580C → #C2410C` | Projects and Blog page titles |
| `--glass-card-bg` / `--glass-card-border` | `rgba(30,30,30,.75)` / `rgba(50,50,50,.6)` | `rgba(253,251,247,.75)` / `rgba(237,233,227,.6)` | glass tiles (metric cards, hero socials, status pill, chat button) |
| Success | `--emboss-safe #16A34A` (`emboss.css`); Tailwind `green-500` for status dots; `--ai-success #22c55e` | same | `.lifted-safe`, "Available" dot, sent state |
| Error | `--emboss-emergency #DC2626` (`emboss.css`); `red-600`/`dark:red-400` text; `--ai-error #ef4444` | same | `.lifted-emergency`, form errors |

Ambient background: particles.js colors `#ffca28 #ffa000 #f57c00 #ff8c1a` (dark) and `#ffa000 #f57c00 #ff8c1a #ffb74d` (light), set in `App.tsx`. The `index.html` inline `--glow-bg` adds radial amber washes behind `body`.

Avoid raw Tailwind palette colors in site pages. Today there are 462 `gray-*` and 157 `purple-*` uses, nearly all in `src/components/showcase/*`, which is demo content and not a style reference.

## Typography

- **Loaded:** Inter 100–900 from Google Fonts (`index.html`). "Forma DJR Display" was dropped from the font URL because Google Fonts doesn't serve it (HTTP 400); it is still first in `--font-heading`, so headings fall through to Inter.
- **Stacks** (`styles/theme.css`):
  - `--font-primary: 'Inter', system-ui, …`
  - `--font-heading: 'Forma DJR Display', 'Circular Std', 'Spotify Circular', 'Circular', 'Inter', …`
  - Headings therefore render in **Inter**.
  - Tailwind `font-sans` maps to `--font-primary`, `font-heading` and `font-display` map to `--font-heading`. `font-heading` has 1 use and `font-display` none.
- **Body** (`styles/theme.css`): 16px, line-height 1.6, letter-spacing 0.01em, antialiased. `src/index.css` also sets bare `p` to `clamp(1rem, 4vw, 1.125rem)`, line-height 1.6.
- **Global heading rules don't hold.**
  - `styles/theme.css` styles `h1`–`h3` (font-heading, clamp sizes, margins).
  - Tailwind preflight comes later in the bundle and resets size, weight (to `inherit`) and margin.
  - `src/index.css` then sets h1 `clamp(2rem,8vw,3.5rem)`, h2 `clamp(1.5rem,6vw,2.5rem)`, h3 `clamp(1.25rem,5vw,2rem)`.
  - Rule: always set size and weight with utilities.

| Role | Classes (file) |
|---|---|
| Hero name h1 | `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold`. The surname uses `bg-gradient-to-r from-[--accent-primary] via-[--accent-secondary] to-[--accent-yellow] bg-clip-text text-transparent animate-gradient` plus a blurred copy behind it as glow (`components/PageHeaderSection.tsx`). |
| Hero role line | `text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug text-[--color-text-secondary]` |
| Hero lede | `text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl text-[--color-text-secondary]`, `px-2 lg:px-0` so it aligns with the heading on desktop |
| Section title, two-tone | Journey: `.section-title`, `clamp(2.5rem,5vw,4rem)`, weight 900, -0.02em, line-height 1.2 (`styles/modern-journey.css`). Key Metrics: `text-3xl md:text-4xl lg:text-5xl font-extrabold` (`components/StatsSection.tsx`). |
| Page title | Projects/Blog: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold`, whole title wrapped in `.title-gradient animate-gradient-x`. Contact: `text-3xl sm:text-4xl md:text-5xl font-black tracking-tight` with `Let's <span class="gradient-text">Talk</span>`. |
| Card title | `text-xl font-black tracking-tight`, hover `text-[--accent-primary]` (ProjectCard, BlogCard). Timeline `.card-title` is 1.5rem/700. |
| Eyebrow/meta | `.emboss-meta`: 10px, 700, uppercase, 0.1em, `--color-text-muted` (`styles/emboss.css`). Used for form labels, chips, tags. |
| Other tracked labels | Footer column heads `text-sm font-semibold uppercase tracking-wider`. Timeline `.category-label` 0.875rem/600/uppercase/0.1em/amber. Emboss buttons `text-xs uppercase tracking-widest font-black`. |
| Gradient text | `.gradient-text` (`--text-gradient`, weight 800, inline-block; also redefined in `modern-journey.css` with `-webkit-text-fill-color`) and `.gradient-text-multi` (`styles/theme.css`). |

Headline pattern: neutral words plus one gradient keyword ("My **Journey**", "Key **Metrics**", "Let's **Talk**", "Send a **Message**"). Unused helpers in `theme.css`: `.display-1/2`, `.body-large/-small`, `.ui-label`, `.ui-caption`, `.button-label`, `.name-bold` (0 uses).

## Shape & depth

| Element | Radius | Source |
|---|---|---|
| Cards (`.card-embossed`) | 24px, 20px at ≤640px | `--emboss-radius-lg`, `styles/emboss.css` |
| Pills: nav, chips, tags, emboss buttons, inputs (`.pill`) | 999px | `--emboss-radius-pill` |
| Textarea | `rounded-2xl` (16px) | `ContactForm.tsx` |
| Hero CTAs, hero social tiles | `rounded-xl` (12px) | `PageHeaderSection.tsx` |
| Older filter chips, search inputs, view toggles | `rounded-lg` (8px), 185 uses | `ProjectsPage.tsx`, `BlogPage.tsx` |
| Timeline card | 20px | `modern-journey.css` |
| Theme radius tokens | `--border-radius 1rem`, `--border-radius-lg 1.5rem` (Tailwind `rounded-standard` / `rounded-large`) | `styles/theme.css` |
| Emboss radius scale | sm 10px, md 16px, lg 24px | `styles/emboss.css` |

**Depth system, `styles/emboss.css`** (current direction; recently edited components use it):

- `.lifted`
  - Background: 160° card gradient (+6% white).
  - Shadow: `--lift-neutral` + `--emboss-rim-soft` (inset top highlight) + `--emboss-base` (inset bottom shade).
  - Border: 1px `--color-border`.
  - Hover: `translateY(-2px)` and `-hi` shadow; active returns to rest. All transitions 200ms ease-out.
- `.lifted-primary` / `-safe` / `-emergency`: gradient from `color-mix(… 80%, white 20%)` through the base color to `90%, black 10%`. White text and a colored lift shadow (orange `rgba(249,115,22,.30)`).
- `.recessed`: input bg darkened 2%, inset `--recess` well, hairline border. On focus: `--recess` plus a 3px `--accent-primary` ring at 30%.
- `.card-embossed`: static version of `.lifted` (+4% white, no hover).
- Dark mode dims the rims (0.45 / 0.25 / 0.10), deepens base shadows (0.45) and saturates colored lifts.
- Needs `color-mix(in oklch)` (Chrome 111+, Safari 16.2+, Firefox 113+).

**Glows and legacy shadows** (`styles/theme.css`):

| Token | Dark | Light |
|---|---|---|
| `--glow` | `0 0 30px rgba(245,158,11,.3)` | `0 0 15px rgba(234,88,12,.15)` |
| `--card-glow` | `0 0 50px rgba(249,115,22,.15)` | `0 0 25px rgba(249,115,22,.1)`, but `styles/blog-page.css` redeclares it on `:root` as `0 0 25px rgba(245,158,11,.4)` |
| `--shadow-sm` / `--shadow-md` / `--card-shadow` | small neutral | warm-tinted `rgba(92,85,80,…)` |

- `--orange-glow` is a bare color, so `hover:shadow-[var(--orange-glow)]` in `StatsCard` does nothing.
- Timeline cards carry a permanent amber halo, `0 0 15px rgba(255,160,0,.3)`, rising to `.5` on hover.

## Spacing & layout

- **Shell** (`App.tsx`): `<main class="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 max-w-7xl relative z-[5]">`, so content is capped at 1280px. Pages add their own wrapper:
  - Projects/Blog: `max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 mt-20 sm:mt-24`, which stacks with `pt-28`.
  - Resume: `max-w-5xl`.
  - Metrics grid: `max-w-6xl`.
  - Timeline: `max-width: 1200px; padding: 0 40px` (20px on mobile).
- **Vertical rhythm:**
  - Hero: `min-h-screen`.
  - Timeline section: `padding: 120px 0`, header `margin-bottom: 80px`.
  - StatsSection: `my-16 sm:my-24 py-12 sm:py-16`, header `mb-12 sm:mb-16`.
  - Page headers: `mb-10 sm:mb-14` (Projects), `mb-8 sm:mb-10 md:mb-16` (Blog).
  - Footer: `pt-12 sm:pt-16`, inner `py-12 sm:py-16`, card `p-8 sm:p-12`.
- **Grids:**

| Grid | Classes |
|---|---|
| Projects | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` (list view `space-y-8`) |
| Blog | `md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8`; featured post row `lg:grid-cols-5` |
| Metrics | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8` |
| Contact | `lg:grid-cols-3` (form `lg:col-span-2`) `gap-6 lg:gap-8` |
| Footer | `lg:grid-cols-3`, with link columns `grid-cols-2 sm:grid-cols-4` |
| Hero | `flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16` |

- **Inner padding:**
  - Project card body: `p-6`. Blog card: `p-4 sm:p-6`. Metric and contact cards: `p-6 sm:p-8`. Timeline card: 32px (20px on mobile).
  - Gaps: chips and tags `gap-2`, filter rows `gap-3`, button groups `gap-3 sm:gap-4`.
- **Breakpoints:** Tailwind defaults (no `screens` override): sm 640, md 768, lg 1024, xl 1280, 2xl 1536. `lg` is the desktop switch for the nav pill, FAB and sky toggle. Raw CSS uses 1023, 768/767, 640 and 480px.
- **Touch targets:** `min-h-[44px] min-w-[44px]` throughout. Below 640/767px, `emboss.css` and `styles/mobile.css` also enforce a 44px minimum.
- **Z-index:**

| Layer | z-index |
|---|---|
| Project modal | 1000000 |
| Sky toggle | 999999 |
| Cursor | 100000–100002 |
| Preloader | 99999 |
| Chat button / panel | 10000 / 9999 |
| Nav, mobile header, scroll bar | 1000 |
| Mobile menu, FAB | 999 |
| `main` | 5 |

## Components

**Top nav pill** (`components/Header.tsx`, ≥lg)
- Container: `fixed top-6 sm:top-8 left-1/2 -translate-x-1/2`, with `lifted pill backdrop-blur-xl px-3 py-2`.
- Links: `px-4 py-2 rounded-full text-sm font-medium`, in an `<ul class="flex gap-1">`.
- Active: `--color-text` on a `--color-bg-card` pill with `shadow-sm`. Inactive: `--color-text-secondary`; hover fades in a `--color-hover-bg` pill (scale 95→100, 300ms).
- `aria-current="page"` is set. "UI Showcase" is no longer in the nav; it's linked from Projects.

**Mobile header and menu** (`Header.tsx`, below lg)
- Bar: fixed, `backdrop-blur-xl mobile-header-surface` (88% `--color-bg-base` via `color-mix`, `styles/header.css`), `border-b`. Wordmark is `EliudSamwel` in `font-black` plus a gradient `.dev`. Right side holds the sun/moon `lifted pill` and a hamburger `lifted pill w-11 h-11 sm:w-12 sm:h-12` (three bars morph into an X).
- Drawer: right-side `w-4/5 max-w-sm` on `--color-bg-base` over a `bg-black/50` backdrop. Slides with `translate-x`, 300ms.
- Links: `pill min-h-[56px] px-6 py-4`. Active `lifted-primary font-black`, others `lifted`. Staggered 70ms per item.

**Primary button**
- Emboss (preferred): `lifted-primary pill px-4..12 py-2..4 text-xs uppercase tracking-widest font-black`. Used in ProjectCard "Live Site", ProjectDetailModal, the ContactForm submit (`min-w-[220px]`, switches to `lifted-safe` when sent, `.emboss-dots` while loading) and the FAB.
- Gradient (hero, newsletter): `rounded-xl px-6 sm:px-8 py-3 sm:py-4 font-semibold text-[--color-text-on-accent]` over `bg-gradient-to-r from-[--accent-secondary] to-[--accent-primary]`. Motion: `whileHover {scale:1.02}`, `whileTap {scale:.98}`.

**Secondary / outline button**
- Emboss: `lifted pill` with the same type treatment ("Source", ContactInfoCard links, footer social circles `w-11 h-11`).
- Hero ghost: `rounded-xl border-2 border-[--color-text] bg-transparent hover:bg-[--color-hover-bg]`.
- Amber outline: `text-[--primary-amber] border border-[--primary-amber] rounded-lg` ("Clear filters").

**Filter chips with count bubble**
- Projects (`ProjectsPage.tsx`):
  - Shape: `rounded-lg px-5 py-3 text-sm font-medium`, FA icon + label + count.
  - Active: `bg-[--primary-amber] text-black`, bubble `bg-black/15 text-black`.
  - Inactive: `bg-[--color-bg-surface] border-[--color-border] text-[--secondary-text]`, bubble `bg-[--color-bg-muted]`.
  - Motion: hover `{scale:1.05, y:-2}`.
- Blog (`BlogPage.tsx`): `rounded-full px-3 sm:px-4 py-2 sm:py-3 min-h-[44px]`. Active `bg-[--primary-amber] text-[--color-text-on-accent]`. Bubble `ml-2 px-2 py-1 rounded-full bg-[--color-bg-muted]`.
- Type chips (Projects): `rounded-lg px-4 py-2`, active amber text and border.

**Tags**
- Emboss: `recessed pill px-3 py-1 emboss-meta`. The category tag adds `text-[--accent-primary]`. Show at most 4, then a `+N more` text.
- Blog image overlays: `rounded-full bg-black/60 backdrop-blur-md text-xs`.

**Badges**
- Featured (project): `px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold uppercase tracking-wider shadow-lg` with `FaTrophy`. Springs in from `rotate:-15, scale:0`. Reserved for a few projects.
- Featured (blog): gradient `--primary-amber → --primary-orange`, `FaStar`, white text, not uppercase.
- Status "Available" (hero): `rounded-full px-3 py-1.5 bg-[--glass-card-bg] backdrop-blur-sm border border-green-500/50`, a `w-2 h-2 bg-green-500 animate-pulse` dot and `text-xs`.
- Hero eyebrow chip: `rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[--accent-text] bg-[--accent-light] border border-amber-500/50 dark:bg-amber-500/10`.

**Project card** (`components/projects/ProjectCard.tsx`)
- Structure: `motion.article` wrapping `.card-embossed overflow-hidden`.
- Image: `h-64 object-cover object-top`, scales 1.05 on hover, with a `from-black/40` bottom overlay. With no screenshot it shows a branded tile: `--color-bg-surface` with amber radial washes, gradient initials `text-5xl font-black`, and an `emboss-meta` category.
- Body (`p-6`): tag row, title, `text-sm leading-relaxed line-clamp-3` description (truncated at 120 chars), a "View Details →" amber link, then a `border-t` row of `lifted-primary` / `lifted` pills.
- Behavior: keyboard-activatable (`role="button"`, Enter/Space). 3D tilt ±5° is turned off under reduced motion.

**Blog card** (`components/blog/BlogCard.tsx`)
- `.card-embossed`, with the image at `h-52` under a `from-black/70` gradient. Category pill bottom-left, read-time pill top-right.
- Title `font-black tracking-tight`.
- Footer row (`border-t`): date, then a like toggle and views with amber FA icons. Counts render only when greater than 0 (likes are stored per browser in `src/utils/likeUtils.ts`). A 2px gradient bar wipes in along the bottom on hover. Motion: `whileHover {y:-2}`.
- The featured post gets its own banner above the grid and is left out of the grid while the banner shows.

**Metric card** (`components/StatsCard.tsx`)
- `text-center p-6 sm:p-8 bg-[--glass-card-bg] backdrop-blur-md border-[--glass-card-border] rounded-[--border-radius-lg] shadow-2xl`.
- Emoji icon `text-3xl sm:text-4xl`. The count uses `.gradient-text`, `clamp(2.2rem,5vw,3rem) font-extrabold`, counting up over 1500ms when in view. Label `text-sm sm:text-base font-semibold text-[--secondary-text]`.
- Hover: a `h-1` accent-gradient bar scales in along the top, and the card lifts −8px and scales 1.03.

**Timeline** (`src/components/Journey/ModernTimeline.tsx` + `styles/modern-journey.css`)
- Layout: 2px amber center line with glow and 18px amber dots (`--glow-amber`); a hover ring and inner pulse use `--accent-light`. Cards are transparent, alternate sides at `calc(50% - 60px)` and join the line with 60px connectors. On desktop, consecutive items overlap by 160px (zigzag) so there's no empty half beside each card. Below 768px everything moves into a single column with the line at `left:20px`.
- Card contents:
  - Header: emoji + uppercase category label on the left, year on the right.
  - Title, then location with an amber pin, a description (line-height 1.6), and an achievement row with an amber icon, amber title and secondary text.
- Achievement label (e.g. "🎯 Focus") is `display:block` on its own line above the text.
- Reveal: items get `.visible` when their top passes 80% of the viewport.
- The section has its own 4px progress bar with a shimmer.
- Text uses the journey variables (`--text-primary/-secondary/-tertiary`), which are white by default and remapped to theme text colors under `html:not(.dark) .journey-page`.

**Form inputs** (`components/contact/ContactForm.tsx`)
- Input: `recessed pill w-full px-5 py-3 sm:px-6 sm:py-4 text-sm sm:text-base`, with a placeholder at `--secondary-text`.
- Textarea: `recessed rounded-2xl min-h-[180px]`.
- Labels: `block mb-2 emboss-meta`. Required marker: `*` in `--accent-primary`. Optional note: `normal-case tracking-normal text-[10px]`.
- Older inputs (Projects/Blog search, newsletter): `rounded-lg border-[--color-border] bg-[--color-bg-surface] py-3 min-h-[44px]` with a left icon at `pl-10`.

**Footer** (`components/Footer.tsx`)
- Wrapper: a transparent `<footer>` with three blurred `animate-blob` color orbs at 10% opacity behind one large `card-embossed p-8 sm:p-12`.
- Brand: "Eliud" plus gradient "Samwel" (`text-3xl sm:text-4xl font-black`), a one-line positioning statement and four `lifted pill` social circles with tooltips.
- Link columns: links slide in a 4px gradient underline on hover. A gradient "Get in Touch" pill.
- Bottom bar: copyright and a "Back to top" control.
- Shown only on About, Contact and Blog.

**Floating chat assistant "ARIA"** (`src/components/AI/FuturisticAIAssistant.tsx` + `styles/futuristic-chatbot.css`)
- Button: 64px circle fixed at bottom/right 30px, `--glass-card-bg` with blur and `--shadow-md`/`--card-glow`. A conic amber border spins on hover.
- Panel: 420×600 at `bottom:110px`, on `--color-bg-card`, with a 1px border and `--border-radius-lg`. Header on `--color-bg-surface`. Opens with `{opacity:0, y:50, scale:.9}` → rest over 0.3s `circOut`.
- Its `--ai-*` tokens alias the canonical set.

**Quick-actions FAB** (`components/FloatingActionButton.tsx`, ≥lg only): `lifted-primary pill w-14 h-14 sm:w-16 sm:h-16` bottom-left; menu items are `lifted pill w-12 h-12 text-[--accent-primary]`.

**Page chrome** (`index.html`)
- Preloader: fullscreen `--primary-bg` with two counter-rotating 60px rings (amber top, `#f57c00` bottom). Hidden on the first animation frame after React mounts, with a 0.3s fade (no forced delay).
- Scroll progress: a 4px fixed bar with an `--accent-gradient` fill and amber glow.
- Background: a grid pattern (`.bg-grid-pattern`, 24px `--color-border` lines at 5–10% opacity) behind Projects and Blog.

## Motion

- **Library:** the `motion` package, imported as `motion/react` in 19 files. `framer-motion` is installed and aliased in `vite.config.ts` but never imported. `AnimatePresence` is used for filters, page and modal swaps, and the grid (`mode="wait"`, `layout`/`layoutId` on cards).
- **Entrances:**
  - Fade + rise, `y: 20 → 0`, spring stiffness 100 (damping 12 in the hero). Hero stagger: `delayChildren .3, staggerChildren .2`. Grid stagger: `.1`.
  - Page headers: `y:-20 → 0` over 0.5–0.6s; subtitles delayed 0.1–0.2s.
  - There's no `whileInView`. In-view triggers use `useInView` (ProjectCard: `once`, `margin:-100px`, `amount:.3`, 0.8s, `ease [0.6,-0.05,0.01,0.99]`, delay `index*0.1`), the `hooks/useIntersectionObserver` hook (StatsCard), or scroll listeners (timeline).
- **Micro-interactions:** `whileHover` scale 1.02–1.05 (with `y:-2` on chips), `whileTap` 0.95–0.98, icon wiggle `{scale:1.2, rotate:10}` on spring stiffness 300.
- **Durations in use:**
  - JS: 0.5s ×16, 0.3s ×9, 0.2s ×7, 0.6s ×4.
  - Tailwind: `duration-300` ×58, `-200` ×23, `-500` ×11, `-700` ×7.
  - CSS tokens: `--transition: all .4s cubic-bezier(.4,0,.2,1)`, `--transition-fast: .2s`, `--hover-scale: 1.03`, `--hover-lift: -8px`. Emboss uses 200ms ease-out.
- **Ambient loops:**
  - Hero: floating FA icons (5–7s), profile rings rotating (40s linear), glow pulse (3s), gradient text (`animate-gradient` 3s).
  - Other: page titles (`animate-gradient-x` 10s), footer blobs (7s), timeline shimmer and starfield twinkle.
- **Global effects:**
  - Custom cursor (`src/components/CustomCursor.tsx`): hides the native cursor with `body * {cursor:none !important}`, and is itself hidden at ≤768px or `hover:none`.
  - particles.js 2.0.0 (80 particles, grab on hover, push on click) on `#particles-js`.
  - Hero mouse and scroll parallax.
- **Reduced motion:**
  - `styles/theme.css` cuts all CSS transitions and animations to 0.01ms with 1 iteration and turns off smooth scrolling.
  - `emboss.css` and `CustomCursor.css` opt out separately.
  - Only ProjectCard, ProjectGallery and ProjectDetailModal check `matchMedia` for JS motion.
  - Not covered: hero loops and parallax, particles.js, other motion entrances. There's no `MotionConfig reducedMotion="user"`.

## Iconography & imagery

- **Icons:**
  - `react-icons/fa` (14 files) is the main set: socials, search/filter, arrows, trophy, star, calendar, clock, heart, eye. `react-icons/si` appears in 1 file.
  - `lucide-react` is used only in Header (Sun/Moon), the showcase and login demos.
  - Inline stroke-2 SVGs: the Header close button, FAB menu, form states and timeline pins.
  - Sizes: `w-3 h-3` in chips and meta, `w-4 h-4` in inputs and buttons, `w-5 h-5` in header and FAB, `w-6 h-6` for hero socials. Icons inherit `currentColor`.
- **Emoji as icons:**
  - Timeline item icons and achievement labels ("🎯 Focus", "📈 Impact"), in `App.tsx`.
  - Metric icons 🎯🌐✅💼 (`StatsSection.tsx`).
  - Resume tabs 📋🧠💼🎓 (hidden below `sm`).
  - Hero eyebrow ✨, project link icons 🚀🌐💻, and heavy use in `data/blogData.ts`.
- **Project imagery:** real product screenshots in `public/images/projects/` (120 files: 118 PNG, 2 JPG). Names are plain words with spaces ("bogani admin dashboard.png"). Projects without a screenshot get the branded initials tile; no stock photos.
- **Blog covers:** `public/images/blog/` (8 files). Five posts in `data/blogData.ts` still use Unsplash URLs.
- **Portrait and social image:** `/profile.png` (3.6 MB) in a circle (`w-72 sm:w-80 lg:w-96`) with rotating rings and an amber radial glow. The OG/Twitter image is the portfolio landing screenshot.

## Content voice

- Lead with evidence, in fixed forms: "35/35 (perfect)", "100% client retention", "4.9/5 average project rating", "Critical Thinking 100th percentile", "English C2 94th percentile".
- Use `·` (middle dot) between facets on one line, as in "Nairobi, Kenya · Fully remote", "AI Content & Data Annotator / Evaluator · Innodata Inc." and "Generalist · Data Annotation & AI Content Evaluator".
- Use an em dash for asides, a spaced en dash for ranges ("Aug 2025 – May 2026", "2021 – Present") and `→` for cause and effect ("35/35 … → promoted to auditor").
- Spell out domain lists: "business, finance, healthcare, legal, and STEM".
- Person: the hero uses first person ("Hi, I'm…", "sharpens my eye for inconsistency in data and systems"). The resume summary drops the pronoun ("Comfortable working across…", "Manage my own workload…").
- Frame engineering as the support for annotation work, not the headline.
- Achievement callouts are an emoji plus a one-word label, then a sentence fragment.
- CTAs are short and conversational: "View My Work", "Let's Connect", "Let's Talk", "View Details", "Live Site", "Source", "Get in Touch".

## Accessibility notes (current behavior)

- **Good:**
  - `aria-label` on 103 controls, `aria-current` on nav links, `aria-expanded` and `aria-controls` on menus.
  - A skip link on Resume (`sr-only focus:not-sr-only`) and keyboard-activatable project cards.
  - 44px touch targets, `role="status"` / `role="alert"` on newsletter messages, a `.recessed` focus ring and `.ai-toggle:focus-visible` outlines.
- **Contrast (WCAG ratios):**
  - Passes: light `--color-text` on base 14.3:1, secondary `#6B7280` 4.7:1; dark text 16.5:1, secondary 9.1:1.
  - Fails, light: muted `#8B8680` (used by 10px `.emboss-meta`) 3.5:1; amber `#F59E0B` text on light base 2.1:1; orange `#F97316` 2.7:1; white on `.lifted-primary` orange 2.8:1.
  - Fails, dark: muted `#707070` on card 3.7:1.
  - `--accent-text` (#9A3412) was added for the light-mode amber text case.
- **Focus:** no `focus-visible` utilities in components, and `focus:outline-none` appears 17 times. Many custom buttons rely on the browser default or nothing.
- **Zoom:** pinch zoom is enabled (`public/mobile-meta.html` no longer sets `user-scalable=no`). Keep it that way.
- **Motion and cursor:** see Motion. Hiding the native cursor everywhere hurts low-vision users. The custom cursor is desktop-only.

## Known inconsistencies

1. **Four overlapping token families** (see Theming) plus 8 undefined variables. Migrate legacy names when you touch a file.
2. **Cascade overrides on `:root`:**
   - `src/index.css` replaces the light `--color-bg-surface`, `--color-border` and `--color-text-secondary` with cool Tailwind grays.
   - `modern-journey.css` replaces the light `--accent-light`/`--accent-yellow` (and `--primary-amber` `#FFA000`, `--primary-orange` `#FF6D00`, later re-overridden by `src/index.css`).
   - `blog-page.css` replaces `--card-glow`.
   - Dev and prod can differ, because `styles/theme.css` is injected in a different order in each.
3. **Tailwind opacity modifiers on `var()` arbitrary values never compile.** About 50 such classes remain in ~10 files, e.g. `bg-[var(--primary-amber)]/20`, `placeholder:text-[var(--secondary-text)]/70`; the built CSS contains none of them, so they silently do nothing (mostly hover tints). The mobile header was the visible casualty and now uses `.mobile-header-surface`. Replace the rest with `color-mix()` or palette colors when you touch them. Similarly, `from-color-mix(...)` class strings are invalid.
4. **Duplicate style files:**
   - `styles/` and `src/styles/` both have `theme.css`, `futuristic-chatbot.css` and `showcase-toggles.css`.
   - Imported: `styles/theme.css`, `styles/emboss.css`, `styles/modern-journey.css`, `styles/blog-page.css`, `styles/futuristic-chatbot.css`, `styles/gallery.css`, `styles/header.css`, `styles/mobile.css`, `src/styles/showcase-toggles.css`, `src/index.css`.
   - Unreferenced: `styles/chatbot.css`, `styles/troubleshoot.css`, `styles/showcase-toggles.css`, and in `src/styles/` `theme.css`, `futuristic-chatbot.css`, `enhanced-futuristic-chatbot.css`, `login-layouts.css`, `analytics.css`.
   - `styles/animations.css` is empty but imported.
5. **Dead duplicate code:**
   - `index.tsx` (`index.html` loads `/src/main.tsx` → `../App.tsx`), `src/App.tsx`, `src/components/projects/*` and `src/components/ThemeToggle.tsx` (eclipse toggle).
   - The `index.html` inline `#cursor-dot`/`#cursor-outline` elements and CSS, superseded by `CustomCursor`.
6. **Several theme toggles and two storage keys:** the Sky orb (`theme-preference`), the React manager (`theme`), the mobile header button, a mobile item in the FAB (unreachable now that the FAB is `lg`-only), plus unused `.theme-toggle` sun/moon/cloud CSS in `styles/theme.css` and `.eclipse-toggle` in `src/styles/theme.css`.
7. **Three definitions each of `.fade-in-up`** (`index.html` 0.8s/30px, `theme.css` 0.8s/20px, `modern-journey.css` 0.6s) and of `.gradient-text` (`index.html`, `theme.css`, `modern-journey.css`).
8. **Two button idioms:** emboss pills vs rounded-xl/rounded-lg gradients. Three chip shapes: `rounded-lg` (Projects), `rounded-full` (Blog) and `recessed pill` (tags). Prefer the emboss classes for new UI.
9. **Typography:**
   - `--font-heading` still lists `Forma DJR Display` first, but it never loads; headings render in Inter.
   - Global `h1`–`h3` rules in `theme.css` are overridden by preflight and `src/index.css`.
   - `prose` classes are hand-styled in CSS because `@tailwindcss/typography` is installed but not registered in `plugins`.
10. **Effects that don't apply:**
    - `StatsCard` `hover:shadow-[var(--orange-glow)]` (a color, not a shadow).
    - `white` used to be remapped to `--color-bg-base` in `tailwind.config.js`, which made every `text-white` near-black in dark mode (e.g. the footer name). It is real `#ffffff` again.
11. **Duplicate `id="particles-js"`:** one in `index.html`, one inside the About page render. Several `theme-color` metas also disagree: `#f59e0b`, `#0a0a0a`, `#f9f9f9`.
12. **`styles/mobile.css`** sets `html, body { height: 100%; overflow-x: hidden }` below 768px, which makes `body` the scroll container on phones. Window-scroll effects (scroll progress bar, header "scrolled" state, hero parallax) don't fire there.
