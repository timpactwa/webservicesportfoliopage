# Premium Motion Pass — Design

**Date:** 2026-05-31
**Status:** Approved (design), pending implementation plan
**Approach:** A — Polish pass + reactive hero (baseline micro-interactions everywhere, one signature moment)

## Goal

Make the Render site feel more premium through motion, without abandoning its existing
pixel/scanline/bracket identity. Premium here means **restraint + consistency + tactile
micro-interactions**, plus a single bold signature moment. Every effect must respect
`prefers-reduced-motion` and stay cheap on the main thread.

## Scope

In scope (5 units):

1. **Motion tokens** (`lib/motion.ts`) — single source of truth for easing + durations.
2. **Sticky nav refinement** — Navbar reacts to scroll.
3. **Card hover depth** — cursor-aware tilt + accent glow on the three card types.
4. **Magnetic CTAs** — primary buttons pull slightly toward the cursor.
5. **Reactive hero pixel field** (signature) — hero pixels respond to the cursor.

Explicitly out of scope (deferred, can revisit later): draw-on link underlines, richer
scroll reveals, highlighted-pricing "breathing" ring, page-transition wipes, scroll-narrative
section. Pricing count-up already exists (`hooks/useCountUp`) and is left untouched.

## Design Principles

- **One easing language.** All transitions use the existing cubic-bezier
  `[0.25, 0.46, 0.45, 0.94]` (the "standard" ease) unless a spring is explicitly better.
- **Restraint budget.** Tilt ≤ 6°, magnetic pull ≤ 6px, durations 150–400ms for
  micro-interactions. If it draws attention to itself, it's too much.
- **Reduced-motion is a first-class path**, matching how `ScanlineHeading`, `PixelReveal`,
  and `Button` already branch on `prefers-reduced-motion` / `useReducedMotion`.
- **Pointer effects are desktop-only** (hover-capable, fine pointer). On touch, fall back to
  the existing static/tap behavior — never attach per-frame pointer listeners on mobile.
- **No layout thrash.** Pointer-driven motion animates `transform` only (translate/rotate),
  driven by rAF or Framer values, never by re-rendering React on every mouse move.

## Architecture

New shared units (each independent, testable in isolation):

### `lib/motion.ts` — motion tokens
Named, reusable transition presets. Replaces inline-duplicated easing/durations.
```ts
export const EASE = [0.25, 0.46, 0.45, 0.94] as const
export const fadeUp = { hidden: {...}, visible: {...} }   // opacity/y reveal
export const stagger = { visible: { transition: { staggerChildren: 0.12 } } }
export const transitions = { fast, base, slow }            // duration + ease bundles
```
- **Does:** exports motion constants/variants.
- **Used by:** any component currently hardcoding `[0.25,0.46,0.45,0.94]` or duration values
  (Hero, WhatWeDo, ServicesDetail, AboutContent, ScanlineHeading default). Migrate
  opportunistically; the tokens file is the deliverable, full migration is best-effort.
- **Depends on:** nothing.

### `hooks/useScrolled.ts`
Returns `boolean` once the window has scrolled past a threshold (default ~24px).
- **Used by:** Navbar.
- **Depends on:** a passive `scroll` listener, cleaned up on unmount.

### `hooks/useMagnetic.ts`
Returns a `ref` + pointer handlers that translate the element toward the cursor, capped at a
max offset, easing back to center on leave. No-ops when reduced-motion or coarse pointer.
- **Used by:** Button (primary variant, optionally all).
- **Depends on:** rAF + transform; reads `prefers-reduced-motion` and `(pointer: fine)`.

### `hooks/useTilt.ts`
Returns a `ref` + handlers producing a subtle 3D tilt (rotateX/rotateY ≤ ~6°) based on cursor
position within the element, plus an accent radial-glow that follows the cursor. Resets on
leave. No-ops when reduced-motion or coarse pointer.
- **Used by:** ServiceCard, ProjectCard, PricingCard. (ServiceCard and ProjectCard are
  currently server components — wrapping their hover surface in a small `'use client'` tilt
  wrapper, or converting the card, is part of each card's task.)
- **Depends on:** rAF + transform/`box-shadow`; reduced-motion + pointer guards.

### Reactive hero — `components/sections/PixelCanvas.tsx` (modified)
Extend the existing canvas. After the initial scatter-in, instead of fully removing the field,
keep a faint persistent grid and brighten/nudge pixels within a radius of the pointer. Throttle
to rAF, skip entirely under reduced-motion (keep current scatter-then-fade as the fallback),
and disable pointer reactivity on coarse pointers (keep current behavior).
- **Does:** hero background ambient + cursor reaction.
- **Depends on:** existing canvas setup; adds a pointermove handler scoped to the hero section.

## Component changes

| File | Change |
|---|---|
| `lib/motion.ts` (new) | Motion tokens |
| `hooks/useScrolled.ts` (new) | Scroll-threshold hook |
| `hooks/useMagnetic.ts` (new) | Magnetic pointer hook |
| `hooks/useTilt.ts` (new) | Tilt + glow pointer hook |
| `components/layout/Navbar.tsx` | Shrink height + stronger blur/shadow + hairline border once `useScrolled` is true; animate height/padding via transition |
| `components/ui/Button.tsx` | Apply `useMagnetic` to the primary variant; keep existing pixel-shimmer |
| `components/ui/ServiceCard.tsx` | Wrap/convert to apply `useTilt` |
| `components/ui/ProjectCard.tsx` | Apply `useTilt` to both card variants |
| `components/ui/PricingCard.tsx` | Apply `useTilt` |
| `components/sections/PixelCanvas.tsx` | Cursor-reactive ambient field |

## Error / edge handling

- SSR: all hooks guard `typeof window`, read media queries only in effects/handlers.
- Cleanup: every listener and rAF cancels on unmount (follow existing PixelCanvas/Button pattern).
- Reduced-motion and coarse-pointer users get the current static behavior — verified per unit.
- Cards inside Framer `motion.div` stagger wrappers: tilt transform must compose with (not fight)
  the entrance transform — apply tilt to an inner element, leave the entrance transform on the wrapper.

## Testing / verification

No automated test suite exists. Verify via the dev server + preview tools:
- Desktop: nav shrinks on scroll; buttons pull toward cursor and snap back; cards tilt + glow;
  hero field reacts to cursor. No console errors. 60fps feel (no jank).
- Reduced-motion (`preview_resize` colorScheme/emulation or DevTools): all pointer effects off,
  static fallbacks intact.
- Mobile preset: no tilt/magnetic/hero-reactivity; layout unchanged.
- `npm run build` passes (catches client/server boundary mistakes on the cards).

## Execution model

Implemented via subagent-driven development against the plan produced by `writing-plans`, using
the `frontend-design` skill to guide the motion/interaction quality. Foundational units
(`lib/motion.ts`, the three hooks) land first; consumers (Navbar, Button, cards, PixelCanvas)
build on them.
