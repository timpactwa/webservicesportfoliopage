# Hero Scan-Grid Background + "Render" Intro — Design

**Date:** 2026-05-31
**Status:** Approved (design), pending implementation plan
**Supersedes:** the current chunky reactive `PixelCanvas` hero background (16px pixels).

## Goal

Replace the hero's chunky pixel field with a **finer, calmer** particle system that the user
liked in brainstorming: a loose grid of small dots on a simple dark field. Unify the brand
intro and the background into **one system** — on load, a scanline sweeps across and "prints"
the `<R>` sigil out of the grid; the lit dots linger, then relax into a quiet, cursor-reactive
ambient field. Keep the validated behavior from the recent motion pass (reactive, respects
`prefers-reduced-motion` and coarse pointers).

Chosen in brainstorming: **texture = fine scan-grid**, **intro = scan-print**, **printed shape
= `<R>` bracket sigil**.

## Scope

In scope:
- New component `components/sections/ScanGrid.tsx` — the full hero background canvas (intro + ambient).
- Update `components/sections/Hero.tsx` — use `ScanGrid` instead of `PixelCanvas`.
- Delete `components/sections/PixelCanvas.tsx` — it is only used by Hero and is fully replaced.

Out of scope (note, do not build):
- The hero's foreground content is unchanged: the `Logo`, headline, buttons, and the existing
  right-hand static `</>`/`<R>` SVG sigil all stay as-is. (The printed `<R>` may make that static
  sigil feel redundant — flagged as a possible future cleanup, not part of this work.)
- `PixelReveal` (used by other sections) is untouched. The "pixel" identity elsewhere stays.

## Behavior

**Phase 1 — Scan-print intro (one time, on mount):**
- A vertical scanline sweeps left→right across the hero once (~1.8–2.2s).
- The `<R>` sigil is *latent* in the grid: each grid dot is pre-tagged `inShape` if it falls
  inside a rasterized `<R>` mark. As the scanline crosses an `inShape` dot's x, that dot lights
  to near-full accent brightness and then decays over ~1.5s.
- A soft brightness also rides the scanline itself (dots within ~46px of the line glow faintly),
  so the sweep reads as a "printing" pass, not just isolated dots flicking on.
- Net effect: the `<R>` appears to be printed into existence by the sweep, then fades down.

**Phase 2 — Ambient reactive field (persistent):**
- After the sweep, the grid rests at a faint base opacity (~0.10). No repeating sweep (kept
  calm/premium; a perpetual sweep would be "too much" — the complaint we're solving).
- Cursor reactivity: dots within ~70px of the pointer brighten (the glow that tested well).
- The field is the same dot set as the intro — one continuous system.

**Reduced-motion / coarse-pointer fallbacks:**
- `prefers-reduced-motion: reduce`: skip the sweep animation. Render the resolved end state
  directly — faint grid with the `<R>` shown at a low, static brightness (no motion). No glow loop.
- Coarse pointer (no `(pointer: fine)`): no cursor reactivity. The intro sweep may still play
  (it's motion-allowed unless reduced-motion), then the field rests static.

## Visual tokens (tunable, starting values)

- Grid: dot size ~2.2px, gap ~18px. (Finer than the old 16px pixels.)
- Colors on `#0F0F0F`/charcoal: ambient/unlit dots `rgba(120,130,150, a)`; lit/accent dots
  `rgba(59,130,246, a)` (accent-light). A dot renders accent when its alpha exceeds ~0.32.
- Base ambient alpha ~0.10; scanline glow up to ~0.4; printed-shape glow up to ~0.85; cursor
  glow up to ~0.5.
- Hero text must remain clearly readable over the field at all times (verify).

## Architecture

### `components/sections/ScanGrid.tsx` (new, client component)
One self-contained unit: a `<canvas>` absolutely filling the hero, plus a single `useEffect`
that owns setup, the grid, the rAF loop, and listeners — mirroring the structure of the current
`PixelCanvas` so it stays familiar.

- **Does:** renders the scan-print intro then the ambient reactive grid.
- **Depends on:** the canvas's parent element (hero `<section>`) for sizing and pointer events,
  exactly like today's `PixelCanvas`.
- **Internal helpers (module-scoped, not exported):**
  - `buildGrid(w, h)` → dot list with `{x, y, inShape}`. `inShape` is computed by rasterizing
    the `<R>` mark to an offscreen canvas and testing each dot's pixel alpha.
  - shape source: render the `<R>` to the offscreen canvas. **Primary:** draw the literal text
    `"<R>"` in a heavy weight (`900`) sized to ~0.8 of hero height, centered. (Simple, dependency
    -free, matches the demo that was approved.) If brand fidelity needs the exact logo glyph
    later, the offscreen draw is the single place to swap — out of scope now.

- **Loop / phases:** `requestAnimationFrame` drives Phase 1. To stay efficient in Phase 2,
  prefer event-driven redraws: once the intro completes and lit dots have decayed, stop the
  perpetual rAF; redraw on `pointermove` (one rAF per move) and clear on `pointerleave`. (A
  simpler always-on rAF is acceptable if event-driven proves fiddly — call it out in the plan.)

- **Cleanup:** cancel rAF and remove `resize` + `pointermove` + `pointerleave` listeners on
  unmount (follow the existing PixelCanvas cleanup pattern exactly).

- **Guards:** read `matchMedia('(prefers-reduced-motion: reduce)')` and `('(pointer: fine)')`
  once in the effect; branch to the fallbacks above.

### `components/sections/Hero.tsx` (modify)
- Replace `import PixelCanvas` with `import ScanGrid`, and the `<PixelCanvas />` element with
  `<ScanGrid />`. No other hero changes.

### `components/sections/PixelCanvas.tsx` (delete)
- Remove the file after Hero no longer imports it. Confirm no other importers (`grep`).

## Error / edge handling
- SSR: all DOM/`matchMedia`/canvas work happens inside `useEffect` (client only).
- Zero-size canvas before layout: guard `getContext`/sizing as PixelCanvas already does.
- Resize: rebuild grid + re-tag `inShape` on resize; in Phase 2 trigger one redraw.

## Testing / verification
No test runner. Verify via `npm run lint` + `npm run build`, then preview:
- Desktop normal motion: on load the scanline prints `<R>`, it lingers and relaxes into a faint
  grid; moving the cursor brightens nearby dots; hero text stays readable; no console errors;
  no perceptible jank. Confirm Phase 2 is calm (no repeating sweep).
- Reduced-motion: no sweep; static faint grid with a faint `<R>`; no cursor glow.
- Mobile/coarse pointer: no cursor reactivity; layout unchanged; text readable.
- Confirm `PixelCanvas.tsx` is deleted and nothing imports it.

## Execution model
Single, focused change. Implement via the normal plan → subagent execution flow, using
`frontend-design` for motion quality. One component added, one edited, one deleted.
