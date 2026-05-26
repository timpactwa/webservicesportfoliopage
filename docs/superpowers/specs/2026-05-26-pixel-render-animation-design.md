# Pixel Render Hero Animation — Design Spec

**Date:** 2026-05-26
**Scope:** Hero section (`components/sections/Hero.tsx`) only

---

## Overview

On page load, the hero section plays a pixel-scatter animation that ties directly to the brand name "Render." A canvas fills the viewport with small colored squares that appear randomly (like a 3D render resolving from noise), then dissolves away to reveal the hero content on a clean dark background.

---

## Architecture

- New component: `components/sections/PixelCanvas.tsx` — client component, handles all canvas logic
- Modified: `components/sections/Hero.tsx` — imports `PixelCanvas`, flips to dark background, adjusts text colors, delays Framer Motion entrance animations

No new dependencies. Uses native Canvas API and existing Framer Motion setup.

---

## Pixel Grid

- **Pixel size:** 16px squares
- **Gap:** 2px between squares (charcoal bleeds through as grid lines)
- **Grid size:** calculated dynamically from viewport dimensions on mount and on resize
- **Colors:** randomly drawn per pixel from `['#2563EB', '#3B82F6', '#1D4ED8']` with occasional `#FFFFFF` at low opacity for sparkle
- **Opacity:** each pixel gets a random opacity between 0.5–1.0 for depth variation

---

## Animation Timeline

| Time | Event |
|------|-------|
| 0ms | Canvas mounts, pixels begin scattering in randomly |
| 0–1500ms | Random pixels render in across the full canvas |
| 1400ms | Hero text Framer Motion animations begin (slight overlap) |
| 1500–2000ms | Canvas fades out via CSS opacity transition |

Each pixel is assigned a random delay (0–1500ms) on mount. The canvas element itself transitions `opacity: 1 → 0` over 500ms starting at 1500ms.

---

## Hero Color Changes

| Element | Before | After |
|---------|--------|-------|
| Section background | `bg-white` | `bg-charcoal` |
| Headline | `text-charcoal` | `text-white` |
| Subtext | `text-neutral-600` | `text-neutral-400` |
| Accent line | `text-accent` | `text-accent` (unchanged) |
| Decorative circles | `border-accent/15`, `bg-accent/8`, `bg-accent/15` | `border-accent/25`, `bg-accent/15`, `bg-accent/25` |

---

## Framer Motion Delay Adjustment

All existing entrance animation delays shift forward by **1.4s**:

| Element | Old delay | New delay |
|---------|-----------|-----------|
| Headline | 0s | 1.4s |
| Subtext | 0.15s | 1.55s |
| Buttons | 0.3s | 1.7s |
| Accent line | 0.45s | 1.85s |
| Decorative circles | 0.2s | 1.6s |

---

## PixelCanvas Component Responsibilities

1. Create and size a `<canvas>` element to fill the hero on mount
2. Calculate grid dimensions from canvas size and pixel/gap constants
3. Assign each cell a random color, opacity, and delay
4. Use `requestAnimationFrame` to draw each pixel as its delay elapses
5. After 1500ms, begin CSS transition to `opacity: 0` on the canvas element
6. Add a `resize` listener that recalculates grid dimensions and redraws at current state (no re-animation on resize)
7. Clean up listeners and animation frame on unmount

---

## Files Changed

- `components/sections/PixelCanvas.tsx` — new file
- `components/sections/Hero.tsx` — import PixelCanvas, color updates, delay updates
