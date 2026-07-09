# Handoff: Render rebrand — warm-neutral direction + mosaic render-in animation

## Overview
This replaces Render's current blue/white/black system with a warm-neutral palette, a new triangle/"compass" mark logo, and a new signature animation (small opaque triangles that mosaic-assemble into an image, picking up the image's own colors, finished with a soft gloss sweep) — replacing the old blocky `PixelReveal` reveal. `Landing.dc.html` is the approved direction, applied to a full page. `BrandDirection.dc.html` is the earlier moodboard (palette/logo/type exploration + a small gallery of supporting motion ideas) — kept for reference on options that were considered.

## About the design files
The `.dc.html` files are **design references** authored in this design tool's format (a custom `<x-dc>`/`DCLogic` wrapper) — not code to run as-is. Read them for exact markup, inline styles, and the vanilla-JS interaction logic (`componentDidMount`), then **recreate this in Render's real codebase** (React + Tailwind, per its existing conventions) using its actual component structure. `triangle-reveal.js` is the one fully portable file — it's a plain vanilla Web Component (`customElements.define`) with no framework dependency; it can be adapted directly or reimplemented as a React component with equivalent logic.

## Fidelity
**High-fidelity.** Colors, type, spacing, and animation timing below are final — implement pixel-for-pixel, not "inspired by."

## Design tokens

Palette (OKLCH; convert to whatever token format Render's Tailwind config uses):
- `--bg`: `oklch(0.975 0.007 88)` — page background, warm off-white
- `--surface`: `oklch(0.95 0.009 85)` — card/section background
- `--graphite`: `oklch(0.24 0.012 80)` — primary text, dark sections/buttons (replaces `charcoal`)
- `--graphite-soft`: `oklch(0.48 0.012 80)` — secondary text
- `--accent`: `oklch(0.60 0.13 190)` — quiet teal, primary actions (replaces blue `#2563EB`)
- `--accent-dark`: `oklch(0.47 0.12 190)`
- `--accent-soft`: `oklch(0.93 0.035 190)` — tinted backgrounds/badges
- `--hairline`: `oklch(0.24 0.012 80 / 0.12)` — borders/dividers

Type:
- Display/headings: **Inter Tight**, weight 600, tight tracking (`-0.02` to `-0.03em`)
- Body: **Inter**, weight 400
- Small labels/eyebrows: monospace (`ui-monospace, "SF Mono", monospace`), uppercase, `0.06–0.12em` tracking

Shape: soft rounding throughout (16–24px cards, 100px/pill buttons) — a deliberate departure from the old system's sharp corners.

## Logo
Not finalized — `BrandDirection.dc.html`'s "Logo exploration" panel has 6 candidate lockups, all built from the same 4-triangle "compass" mark (four triangles around a center point, colored `accent-dark` / `accent` / `graphite` / `graphite-soft`). Default used in `Landing.dc.html` nav/footer: **compass mark + lowercase wordmark, horizontal**. Confirm final pick before implementing `Logo`.

## The mosaic render-in animation (replaces PixelReveal)
Component: `triangle-reveal.js` (Web Component `<triangle-reveal>`).
- Splits the target image's bounding box into a grid (default 8×12, configurable via `rows`/`cols`) of right-triangle pairs (two triangles per grid cell).
- Each triangle is an SVG `<polygon>` whose fill is sampled from the destination image at its centroid — so triangles carry the real image's colors, not a flat placeholder tint.
- On entering the viewport (`IntersectionObserver`, threshold 0.35) or on click, triangles fade/scale in (`opacity 0→1`, `scale(0.82→1)`, `translateY(5px→0)`) staggered by distance from the top-left corner (`delay = (nx+ny)/2 * 900ms + jitter`), easing `cubic-bezier(0.22, 1, 0.36, 1)`, duration 480ms per triangle.
- Finishes with a single diagonal gloss sweep: a blurred white-ish gradient band, `mix-blend-mode: overlay`, animating across the frame over 900ms starting ~120ms after the last triangle lands.
- Respects `prefers-reduced-motion`: skips straight to final state.
- In this prototype, `triangle-reveal` paints a generated placeholder gradient (since no real photos were supplied) — in production, sample from the actual `<img>`/canvas content being revealed.

Where it's used: hero visual on page load, and work-showcase thumbnails. It should **only** wrap real photography/screenshots, never UI chrome or text.

## Other animations (each intentionally distinct — do not reuse the mosaic for these)
1. **Line-mask headline wipe** — heading text sits inside an `overflow:hidden` wrapper, starts `translateY(115%)`, animates to `translateY(0)` over 850ms (`cubic-bezier(.22,1,.36,1)`) on scroll-into-view. Used for hero headline and CTA footer headline. Not a fade — a hard-edged wipe.
2. **3D tilt cards** — on `mousemove`, card rotates via `perspective(700px) rotateX() rotateY()` proportional to cursor position relative to card center (±8°/±10°), resets on `mouseleave`. Used on the 3 service cards.
3. **Cursor-follow label** — a floating pill (`"View project →"`) tracks the cursor via `mousemove` inside the work-showcase container, fading in/out (`opacity`) on row `mouseenter`/`mouseleave`, with per-row label text.
4. **Counting stat + draw-in ring** — an SVG circle's `stroke-dashoffset` animates from full circumference to `circumference * (1 - target/100)` over 1.4s; a paired number counts up via `requestAnimationFrame` with cubic ease-out over 1.2s. Used for the 3-step process indicator (33/66/100%) and for pricing figures (counts up to the real price, not a percentage — ring omitted there).
5. **Magnetic buttons** — primary CTA buttons translate up to ~±10px toward the cursor on `mousemove` within their bounds (`transform: translate()`, 0.35s ease-out spring-back on `mouseleave`).
6. **Ambient marquee** — infinite `translateX` loop (12–22s linear, duplicated content), edges faded via `mask-image: linear-gradient(90deg, transparent, #000 10–15%, #000 85–90%, transparent)`. Used only for the "who it's for" strip — never hero content.
7. **Scroll fade-up** — generic `opacity 0→1` + `translateY(20px→0)`, 0.8s, staggered ~90ms per sibling, for everything not covered above (cards, paragraphs, stat blocks).
8. **Nav blur-on-scroll** — background goes `transparent` → `color-mix(in oklab, var(--bg) 80%, transparent)` + `backdrop-filter: blur(14px)` + a 1px hairline shadow once `scrollY > 40`.
9. **Hero ambient parallax** — two large blurred color blobs behind the hero drift a few px opposite the cursor (`mousemove` on `document`, depth 14–20px) — very subtle, not a full 3D scene.

All motion respects `prefers-reduced-motion: reduce` (skip straight to end state, no listeners attached).

## Page structure (Landing.dc.html)
Nav (fixed, logo + Work/Services/Pricing links + CTA) → Hero (eyebrow, 2-line wipe headline, subtext, 2 CTAs, full-width mosaic hero visual) → Trusted marquee (industry verticals) → Services (3 tilt cards) → Process (dark band, 3-step ring indicator) → Work (3 cursor-follow project rows, mosaic thumbnails) → Pricing (3 cards: $750 / $1,500 highlighted / Custom) → CTA band (dark, wipe headline, magnetic button, small mosaic accent) → Footer (mark, links, copyright).

## Assets
No photography was supplied — mosaic thumbnails and hero visual currently render a generated placeholder gradient inside `triangle-reveal.js`. Replace with real project photos/screenshots before shipping; the component should sample colors from the actual image rather than the placeholder painter.

## Files
- `Landing.dc.html` — full approved page (primary reference)
- `BrandDirection.dc.html` — palette/logo/type moodboard + motion idea gallery (secondary reference, for the logo decision)
- `triangle-reveal.js` — the mosaic render-in Web Component, portable as-is or as a porting reference
- `screenshots/01–05-landing.png` — full page, top to bottom (hero, services, work, pricing, footer)
- `screenshots/brand-direction.png` — the moodboard canvas (palette, logo options, type, motion gallery)
