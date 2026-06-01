# Hero Scan-Grid Background + "Render" Intro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero's chunky reactive pixel field with a finer scan-grid whose scanline "prints" the `<R>` sigil on load, then relaxes into a calm, cursor-reactive ambient grid.

**Architecture:** A new client component `ScanGrid` owns a full-bleed `<canvas>` behind the hero content. A single `useEffect` builds a fine dot grid, tags which dots fall inside a rasterized `<R>` mark, and runs one `requestAnimationFrame` loop: a left→right scanline lights `inShape` dots as it passes (they decay over ~1.5s), then the field rests at a faint base opacity that brightens around the cursor. `Hero.tsx` swaps `PixelCanvas` for `ScanGrid`; the now-unused `PixelCanvas.tsx` is deleted.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Canvas 2D. No test runner — verify with `npm run lint` + `npm run build` + dev-server preview.

**Verification note:** No test suite. Each task: run `npm run lint` and `npm run build` (must pass), then the stated preview check. WARNING: running `npm run build` while the preview dev server is running can corrupt its `.next` cache (404 CSS / "Cannot find module './NNN.js'"). If the dev server misbehaves after a build, stop it, `rm -rf .next`, and restart it.

---

## File Structure

- Create: `components/sections/ScanGrid.tsx` — the entire hero background (scan-print intro + ambient reactive grid). One responsibility, one `useEffect`, mirrors the structure of the current `PixelCanvas`.
- Modify: `components/sections/Hero.tsx` — import and render `ScanGrid` instead of `PixelCanvas` (two lines).
- Delete: `components/sections/PixelCanvas.tsx` — only `Hero.tsx` imports it (verified via grep); fully superseded.

---

### Task 1: Create the ScanGrid component

**Files:**
- Create: `components/sections/ScanGrid.tsx`

- [ ] **Step 1: Write the component**

Create `components/sections/ScanGrid.tsx` with exactly this content:

```tsx
'use client'

import { useEffect, useRef } from 'react'

// Visual tokens (tunable)
const DOT = 2.2
const GAP = 18
const BASE_ALPHA = 0.1
const SWEEP_DURATION = 2000 // ms for the scanline to cross
const SHAPE_DECAY = 1500 // ms a printed dot takes to fade back to ambient
const SCAN_GLOW_RADIUS = 46 // px around the moving scanline that glows
const SCAN_GLOW = 0.4
const PRINT_GLOW = 0.85 // peak boost for inShape dots as the line prints them
const CURSOR_RADIUS = 70
const CURSOR_GLOW = 0.5
const STATIC_SHAPE_ALPHA = 0.3 // reduced-motion: faint static <R>

interface Dot {
  x: number
  y: number
  inShape: boolean
  lit: number // timestamp when the scanline printed this dot, or -1
}

export default function ScanGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    let dots: Dot[] = []
    let raf = 0
    let start: number | null = null
    let prevScanX = -9999
    const mouse = { x: -9999, y: -9999, on: false }

    function sizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      canvas!.width = Math.max(1, Math.floor(w * dpr))
      canvas!.height = Math.max(1, Math.floor(h * dpr))
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Rasterize "<R>" offscreen and tag which grid dots fall inside it.
    function buildGrid() {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      dots = []
      if (w === 0 || h === 0) return

      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const o = off.getContext('2d')
      let pixels: Uint8ClampedArray | null = null
      if (o) {
        o.fillStyle = '#fff'
        o.textAlign = 'center'
        o.textBaseline = 'middle'
        o.font = `900 ${Math.floor(h * 0.8)}px Inter, Arial, sans-serif`
        o.fillText('<R>', w / 2, h / 2 + 2)
        pixels = o.getImageData(0, 0, w, h).data
      }

      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          let inShape = false
          if (pixels) {
            const ix = Math.min(w - 1, Math.max(0, Math.floor(x)))
            const iy = Math.min(h - 1, Math.max(0, Math.floor(y)))
            inShape = pixels[(iy * w + ix) * 4 + 3] > 128
          }
          dots.push({ x, y, inShape, lit: -1 })
        }
      }
    }

    function paint(x: number, y: number, a: number) {
      const alpha = Math.min(a, 1)
      ctx!.fillStyle =
        alpha > 0.32 ? `rgba(59,130,246,${alpha})` : `rgba(120,130,150,${alpha})`
      ctx!.fillRect(x - DOT / 2, y - DOT / 2, DOT, DOT)
    }

    // Reduced-motion: draw the resolved end state once (faint grid + faint <R>).
    function drawStatic() {
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      ctx!.clearRect(0, 0, w, h)
      for (const d of dots) paint(d.x, d.y, d.inShape ? STATIC_SHAPE_ALPHA : BASE_ALPHA)
    }

    function frame(now: number) {
      if (start === null) start = now
      const t = now - start
      const w = canvas!.offsetWidth
      const h = canvas!.offsetHeight
      ctx!.clearRect(0, 0, w, h)

      const sweeping = t < SWEEP_DURATION
      const scanX = sweeping ? (t / SWEEP_DURATION) * (w + 100) - 50 : Infinity

      for (const d of dots) {
        if (sweeping && d.inShape && prevScanX < d.x && d.x <= scanX) d.lit = now

        let a = BASE_ALPHA
        if (sweeping) {
          const ds = Math.abs(d.x - scanX)
          if (ds < SCAN_GLOW_RADIUS) a += SCAN_GLOW * (1 - ds / SCAN_GLOW_RADIUS)
        }
        if (d.lit >= 0) {
          const age = now - d.lit
          if (age < SHAPE_DECAY) a += PRINT_GLOW * (1 - age / SHAPE_DECAY)
        }
        if (finePointer && mouse.on) {
          const dm = Math.hypot(d.x - mouse.x, d.y - mouse.y)
          if (dm < CURSOR_RADIUS) a += CURSOR_GLOW * (1 - dm / CURSOR_RADIUS)
        }
        paint(d.x, d.y, a)
      }

      if (sweeping) prevScanX = scanX

      const decayDone = t > SWEEP_DURATION + SHAPE_DECAY
      if (finePointer || !decayDone) {
        // fine pointer: keep looping for cursor reactivity.
        // coarse pointer: keep looping only until the printed <R> has decayed, then stop.
        raf = requestAnimationFrame(frame)
      }
    }

    function handleResize() {
      sizeCanvas()
      buildGrid()
      if (reduceMotion) drawStatic()
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.on = true
    }

    function handlePointerLeave() {
      mouse.on = false
    }

    sizeCanvas()
    buildGrid()
    window.addEventListener('resize', handleResize)

    if (reduceMotion) {
      drawStatic()
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    const parent = canvas.parentElement
    if (finePointer && parent) {
      parent.addEventListener('pointermove', handlePointerMove)
      parent.addEventListener('pointerleave', handlePointerLeave)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      if (finePointer && parent) {
        parent.removeEventListener('pointermove', handlePointerMove)
        parent.removeEventListener('pointerleave', handlePointerLeave)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 1 }} />
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run lint && npm run build`
Expected: both pass with no errors. (The component is not yet rendered anywhere; this just confirms it type-checks.)

- [ ] **Step 3: Commit**

```bash
git add components/sections/ScanGrid.tsx
git commit -m "feat: add ScanGrid hero background (scan-print intro + reactive grid)"
```

---

### Task 2: Wire ScanGrid into the hero and remove PixelCanvas

**Files:**
- Modify: `components/sections/Hero.tsx`
- Delete: `components/sections/PixelCanvas.tsx`

- [ ] **Step 1: Swap the import in Hero.tsx**

In `components/sections/Hero.tsx`, change the import line (currently line 6):

```tsx
import PixelCanvas from '@/components/sections/PixelCanvas'
```

to:

```tsx
import ScanGrid from '@/components/sections/ScanGrid'
```

- [ ] **Step 2: Swap the element in Hero.tsx**

In the same file, change the usage (currently line 11) from:

```tsx
      <PixelCanvas />
```

to:

```tsx
      <ScanGrid />
```

Make no other changes to Hero.tsx (the dark background, headline, buttons, and right-side static sigil all stay).

- [ ] **Step 3: Delete the old component**

```bash
git rm components/sections/PixelCanvas.tsx
```

- [ ] **Step 4: Confirm nothing else imports PixelCanvas**

Run: `grep -rn "PixelCanvas" components app lib` (ignore matches under `docs/`)
Expected: NO matches in `components/`, `app/`, or `lib/`. (Only `ScanGrid` should now appear in `Hero.tsx`.)

- [ ] **Step 5: Verify**

Run: `npm run lint && npm run build`
Expected: both pass; all pages generate.

Preview check (stop/clear/restart the dev server first if it was used during a build):
- Desktop, normal motion: load `/`. The scanline sweeps once and prints `<R>` out of the fine grid; the lit dots linger then relax into a faint grid. Moving the cursor over the hero brightens nearby dots. Hero headline stays clearly readable. No console errors. Phase 2 is calm — no repeating sweep.
- Reduced-motion (emulate `prefers-reduced-motion: reduce`, reload `/`): no sweep; a static faint grid with a faint `<R>`; no cursor reactivity.
- Mobile preset (reload `/`): no cursor reactivity; layout unchanged; text readable.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: use ScanGrid in hero; remove old PixelCanvas"
```

---

## Final verification (after both tasks)

- [ ] `npm run lint && npm run build` clean.
- [ ] Dev-server walkthrough: scan-print intro prints `<R>`, relaxes to calm faint grid, cursor brightens dots, text readable, no console errors.
- [ ] Reduced-motion: static faint `<R>`, no motion, no glow.
- [ ] `components/sections/PixelCanvas.tsx` no longer exists and nothing imports it.
```
