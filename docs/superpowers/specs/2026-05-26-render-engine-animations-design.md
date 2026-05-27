# Render Engine Animation System — Design Spec

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a cohesive "Render Engine" animation language across the site — four reusable animation primitives (pixel section reveals, scan line heading reveals, count-up numbers, pixel shimmer on hover) that all connect to the "Render" brand name.

**Architecture:** Four self-contained building blocks — two wrapper components, one hook, one Button enhancement. Each primitive is independent; page sections import and apply them. No global state, no shared animation orchestration.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion (already installed), HTML5 Canvas API, React hooks (useRef, useEffect, useState, useCallback)

---

## Existing Codebase Context

Critical constraints for implementers:

- `cn()` in `lib/utils.ts` is a **plain string join** — NOT tailwind-merge. Conflicting Tailwind class overrides do not resolve. Add new variants to component variant objects instead of overriding via className.
- Custom colors `charcoal` and `accent` are in `tailwind.config.ts` under `theme.extend.colors`. They emit after stock utilities in CSS — overriding them with stock color classes via className won't work.
- `'use client'` directive required for any file using Framer Motion, canvas, or React state.
- `container-studio` is a CSS layout class — do not rename.
- Framer Motion is already used throughout. Import from `'framer-motion'`.
- All existing section animations use `whileInView` with `viewport={{ once: true, margin: '-50px' }}` — match this pattern.
- The `Button` component already has a `secondary-inverse` variant added to the variants object.

---

## Animation 1: PixelReveal (scroll-triggered canvas overlay)

**File:** `components/ui/PixelReveal.tsx` (CREATE)

**What it does:** Wraps any section or element. When it scrolls into view, a canvas overlay "renders in" with a fast pixel scatter (same aesthetic as the hero PixelCanvas, but smaller pixels and ~500ms total). After the scatter dissolves, the canvas is hidden and children are fully visible.

**Props:**
```ts
interface PixelRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number        // ms before animation starts, default 0
  pixelSize?: number    // pixel grid size, default 8
}
```

**Implementation details:**
- Container: `position: relative`, children render normally underneath the canvas
- Canvas: `position: absolute, inset: 0, width: 100%, height: 100%, pointerEvents: none, zIndex: 10`
- Trigger: `useRef` on the container + `IntersectionObserver` (threshold: 0.15). Fire once.
- After trigger fires, run `animate(timestamp)` loop:
  - Grid: `PIXEL_SIZE = 8`, `GAP = 1`, `STEP = 9` — build array of `{x, y, delay, color, opacity}` for every grid cell
  - Each pixel: `delay = Math.random() * 300` ms, `color` randomly from `['#2563EB', '#3B82F6', '#ffffff']` (white at 8% probability, blues otherwise), `opacity = 0.4 + Math.random() * 0.6`
  - Phase 1 (0–300ms): pixels scatter in — each pixel draws when `elapsed > pixel.delay`, opacity ramps from 0 to `pixel.opacity` over 100ms
  - Phase 2 (300–500ms): fade entire canvas out — set `canvas.style.opacity` from 1 to 0 using linear interpolation over 200ms
  - Phase 3 (>500ms): set `canvas.style.display = 'none'`, cancel animation frame
- Canvas must be re-sized on mount: `canvas.width = container.offsetWidth * devicePixelRatio`, `canvas.height = container.offsetHeight * devicePixelRatio`, then `ctx.scale(devicePixelRatio, devicePixelRatio)`
- Cleanup: cancel animation frame on unmount

**Usage example:**
```tsx
<PixelReveal>
  <section className="py-20 bg-white">
    {/* section content */}
  </section>
</PixelReveal>
```

---

## Animation 2: ScanlineHeading (render-pass text reveal)

**File:** `components/ui/ScanlineHeading.tsx` (CREATE)

**What it does:** Wraps a heading. A thin vertical accent-colored line sweeps left→right across the text (like a renderer making a pass), then the heading fades in behind it.

**Props:**
```ts
interface ScanlineHeadingProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4'   // default 'h2'
  className?: string
  delay?: number                       // Framer Motion delay in seconds, default 0
}
```

**Implementation details:**
- Container: `position: relative, overflow: hidden` — this clips the scan line
- Heading element: rendered as the `as` prop tag, starts at `opacity: 0`, animates to `opacity: 1`
- Scan line: `position: absolute, top: 0, bottom: 0, width: 3px, background: #2563EB (accent), zIndex: 10`
- Framer Motion `useInView` hook (from `'framer-motion'`) with `once: true, margin: '-30px'` to trigger
- When in view:
  - Scan line: `x` animates from `-3px` to `containerWidth + 3px` over 500ms, easing: `easeInOut`
  - Heading opacity: animates from 0 to 1, starting at `delay + 0.15s`, duration 400ms
- Use `useRef` on the container + Framer Motion's `useInView` hook
- Use Framer Motion `useAnimation()` controls to fire both animations on trigger

**Usage example:**
```tsx
<ScanlineHeading as="h2" className="text-display-xl font-black text-charcoal">
  Two services.
  <br />
  One focused team.
</ScanlineHeading>
```

---

## Animation 3: useCountUp (price/number counting)

**File:** `hooks/useCountUp.ts` (CREATE)

**What it does:** Counts a number from 0 to a target value when an element scrolls into view. Returns the current count as a number.

**Signature:**
```ts
function useCountUp(options: {
  to: number
  duration?: number   // ms, default 1200
  delay?: number      // ms before count starts, default 0
  easing?: 'easeOut' | 'linear'  // default 'easeOut'
}): { count: number; ref: React.RefObject<HTMLElement> }
```

**Implementation details:**
- Uses `useRef<HTMLElement>` for the trigger element
- Uses `IntersectionObserver` (threshold: 0.5) to fire once when element enters view
- On trigger: runs requestAnimationFrame loop
  - `elapsed = currentTime - startTime`
  - `progress = Math.min(elapsed / duration, 1)`
  - easeOut: `easedProgress = 1 - Math.pow(1 - progress, 3)` (cubic ease-out)
  - `count = Math.round(to * easedProgress)`
  - Stop when progress >= 1
- Returns `{ count, ref }` — caller attaches `ref` to the element containing the displayed number

**Usage in PricingCard:**
```tsx
// PricingCard must become 'use client' to use this hook
// priceRange is a string like '$500' — parse the number out, count up to it, reformat
const numericPrice = parseInt(priceRange.replace(/\D/g, ''), 10)
const { count, ref } = useCountUp({ to: numericPrice, duration: 1200 })
// Display: `$${count.toLocaleString()}`
```

---

## Animation 4: Button Pixel Shimmer (hover effect)

**File:** `components/ui/Button.tsx` (MODIFY)

**What it does:** On hover, a brief pixel shimmer fires on the button — tiny pixels scatter and disappear in ~300ms, reinforcing the "render" aesthetic on interaction.

**Implementation details:**
- Add `useRef<HTMLCanvasElement>` and `useRef<number>` (for animationFrame) inside the Button component
- Add `useRef<HTMLDivElement>` on the button's outer container to measure dimensions
- Button container needs `position: relative` — add to existing button className (already uses padding/flex, so just add `relative` to the base className)
- Canvas element inside the button: `position: absolute, inset: 0, width: 100%, height: 100%, pointerEvents: none, zIndex: 20, borderRadius: inherit`
- On `onMouseEnter`: size canvas to button dimensions, run shimmer animation:
  - Generate 12–18 random pixels across the button surface
  - Each pixel: `size = 3–6px`, random `x` (0 to width), random `y` (0 to height), color from `['#ffffff', '#93c5fd']` (white and light blue)
  - Animate all pixels from `opacity: 1` to `opacity: 0` over 300ms with staggered start times (0–150ms random)
  - Clear and stop after 300ms
- On `onMouseLeave`: clear canvas immediately, cancel any pending frame
- Button component is NOT currently `'use client'` — check if it uses state. It doesn't use state currently (it's a pure component with variants). Since canvas + refs require client, add `'use client'` directive.

**Important:** The Button component renders either an `<a>` tag (when `href` is provided) or a `<button>` tag. The canvas and container ref need to work for both. Wrap the rendered element in a `<span className="relative inline-block">` container (or `block` when `fullWidth` is true) that holds both the button/anchor and the canvas overlay.

Actually: instead of a wrapper span, add the canvas directly inside the button/anchor element (which already has `relative` positioning from the base className). Add `overflow: hidden` to the base className to clip the canvas within button bounds.

---

## Integration: Where Each Animation Is Applied

### WhatWeDo (`components/sections/WhatWeDo.tsx`)
- Replace the `<h2>` with `<ScanlineHeading as="h2" className="text-display-xl font-black text-charcoal">`
- Keep existing Framer Motion card animations unchanged

### WhyUs (`components/sections/WhyUs.tsx`)
- Replace the `<h2>` with `<ScanlineHeading as="h2" className="text-display-xl font-black text-white">`
- Keep existing item stagger animations

### PortfolioTeaser (`components/sections/PortfolioTeaser.tsx`)
- Replace the `<h2>` with `<ScanlineHeading as="h2" className="text-display-xl font-black text-charcoal">`

### ServicesDetail (`components/sections/ServicesDetail.tsx`)
- Replace main page heading `<h1>` or top `<h2>` with `<ScanlineHeading>`
- Apply `<ScanlineHeading>` to section subheadings ("Web Design & Development", "AI Consulting & Automation")

### PricingCard (`components/ui/PricingCard.tsx`)
- Add `'use client'` directive
- Import and use `useCountUp` hook
- Parse `priceRange` string (e.g. `'$500'`) → extract number → count up → reformat for display
- The `ref` from `useCountUp` attaches to the `<p>` element showing the price

### AboutContent (`components/sections/AboutContent.tsx`)
- Apply `<ScanlineHeading>` to the main page heading

---

## Performance Constraints

- All animations use `once: true` in IntersectionObserver — no re-triggering on scroll back
- PixelReveal canvas hides itself (display: none) after animation completes — no ongoing rendering cost
- Button shimmer runs only during hover, cancels on mouseleave — no idle cost
- No CSS keyframe animations — all via canvas or Framer Motion (GPU-composited)
- Canvas pixel renders batch all draws in a single `requestAnimationFrame` callback

---

## File Change Summary

| File | Action | Purpose |
|---|---|---|
| `components/ui/PixelReveal.tsx` | CREATE | Scroll-triggered pixel reveal wrapper |
| `components/ui/ScanlineHeading.tsx` | CREATE | Scan line heading reveal |
| `hooks/useCountUp.ts` | CREATE | Count-up animation hook |
| `components/ui/Button.tsx` | MODIFY | Add pixel shimmer on hover |
| `components/sections/WhatWeDo.tsx` | MODIFY | Apply ScanlineHeading |
| `components/sections/WhyUs.tsx` | MODIFY | Apply ScanlineHeading |
| `components/sections/PortfolioTeaser.tsx` | MODIFY | Apply ScanlineHeading |
| `components/sections/ServicesDetail.tsx` | MODIFY | Apply ScanlineHeading |
| `components/ui/PricingCard.tsx` | MODIFY | Apply useCountUp |
| `components/sections/AboutContent.tsx` | MODIFY | Apply ScanlineHeading |
