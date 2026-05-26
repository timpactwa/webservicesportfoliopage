# Pixel Render Hero Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> **Model:** Use Opus for all execution.

**Goal:** Add a pixel-scatter canvas animation to the hero section that plays on page load — pixels render in randomly on a dark background, dissolve away, then the hero content fades in.

**Architecture:** A new `PixelCanvas` client component manages a full-bleed `<canvas>` behind the hero content. It draws a 16px pixel grid with random delays (0–1500ms per pixel), then fades the canvas out at 1500ms. Hero.tsx imports PixelCanvas, switches to a dark background, updates text colors, and shifts all Framer Motion entrance delays forward by 1.4s.

**Tech Stack:** React, Next.js 14 App Router, Framer Motion (already installed), native Canvas API, Tailwind CSS

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `components/sections/PixelCanvas.tsx` | All canvas animation logic |
| Modify | `components/sections/Hero.tsx` | Import PixelCanvas, dark bg, text colors, FM delays |

---

### Task 0: Pull latest changes

- [ ] **Step 1: Pull from remote**

```bash
git pull
```

Expected: "Already up to date." or a clean fast-forward. If there are merge conflicts, resolve them before proceeding.

---

### Task 1: Create PixelCanvas component

**Files:**
- Create: `components/sections/PixelCanvas.tsx`

- [ ] **Step 1: Create the file with this exact content**

```tsx
'use client'

import { useEffect, useRef } from 'react'

const PIXEL_SIZE = 16
const GAP = 2
const STEP = PIXEL_SIZE + GAP
const COLORS = ['#2563EB', '#3B82F6', '#1D4ED8']
const SCATTER_DURATION = 1500
const FADE_DURATION = 500

interface Pixel {
  col: number
  row: number
  color: string
  opacity: number
  delay: number
}

export default function PixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let pixels: Pixel[] = []
    let startTime: number | null = null

    function sizeCanvas() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }

    function buildGrid() {
      const cols = Math.ceil(canvas!.width / STEP)
      const rows = Math.ceil(canvas!.height / STEP)
      pixels = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const isWhite = Math.random() < 0.08
          pixels.push({
            col,
            row,
            color: isWhite ? '#FFFFFF' : COLORS[Math.floor(Math.random() * COLORS.length)],
            opacity: 0.5 + Math.random() * 0.5,
            delay: Math.random() * SCATTER_DURATION,
          })
        }
      }
    }

    function drawFrame(elapsed: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (const px of pixels) {
        if (elapsed >= px.delay) {
          ctx!.globalAlpha = px.opacity
          ctx!.fillStyle = px.color
          ctx!.fillRect(px.col * STEP, px.row * STEP, PIXEL_SIZE, PIXEL_SIZE)
        }
      }
      ctx!.globalAlpha = 1
    }

    function animate(timestamp: number) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      drawFrame(elapsed)
      if (elapsed < SCATTER_DURATION) {
        animationId = requestAnimationFrame(animate)
      }
    }

    function handleResize() {
      sizeCanvas()
      buildGrid()
      const elapsed = startTime ? performance.now() - startTime : SCATTER_DURATION
      drawFrame(elapsed)
    }

    sizeCanvas()
    buildGrid()
    animationId = requestAnimationFrame(animate)

    const fadeTimer = setTimeout(() => {
      if (canvas) {
        canvas.style.transition = `opacity ${FADE_DURATION}ms ease-out`
        canvas.style.opacity = '0'
      }
    }, SCATTER_DURATION)

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(fadeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/PixelCanvas.tsx
git commit -m "feat: add PixelCanvas component for hero render animation"
```

---

### Task 2: Update Hero.tsx

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Replace the entire file contents**

```tsx
'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import PixelCanvas from '@/components/sections/PixelCanvas'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
      <PixelCanvas />

      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="relative"
        >
          <div className="w-[500px] h-[500px] border-[3px] border-accent/25 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/15 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent/25 rounded-full" />
        </motion.div>
      </div>

      <div className="container-studio relative z-10 py-24">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-display-2xl font-black text-white mb-6"
          >
            We Build the Web
            <br />
            <span className="text-accent">for Local Business.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-neutral-400 max-w-xl mb-10 leading-relaxed"
          >
            Render is a student-run web design and AI consulting agency serving Morris County, NJ.
            Agency-quality work at honest prices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Button variant="primary" size="lg" href="/contact">
              Book a Free Consultation
            </Button>
            <Button variant="secondary" size="lg" href="/work">
              See Our Work
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-sm text-accent font-semibold"
          >
            Currently booking founding clients — limited spots available.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: apply pixel render animation to hero section"
```

---

### Task 3: Visual verification

**Files:** none

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser.

- [ ] **Step 2: Verify the animation sequence**

Watch for all of the following on a fresh page load (hard refresh with Ctrl+Shift+R to bypass cache):

1. Hero background is charcoal (near-black) immediately on load
2. Colored blue/white pixels scatter in randomly across the full hero viewport over ~1.5 seconds
3. After 1.5s the pixel grid fades out cleanly
4. Headline ("We Build the Web") fades in white on the dark background
5. Subtext, buttons, and accent line fade in sequentially after the headline
6. Decorative circles animate in on the right side

- [ ] **Step 3: Check the secondary button contrast**

On the dark hero background, confirm the "See Our Work" secondary button is readable. If the button style uses a light background with light text, it may need a border or color adjustment — fix it in `components/ui/Button.tsx` if so, and commit separately.

- [ ] **Step 4: Check on mobile viewport**

Resize the browser to 375px wide. Confirm:
- Pixel grid fills the full hero (no white gaps on edges)
- Canvas fades out correctly
- Text remains readable

- [ ] **Step 5: Stop the dev server** (Ctrl+C)

---

### Task 4: Final lint check and push-ready commit

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: no errors or warnings.

- [ ] **Step 2: Confirm git log looks clean**

```bash
git log --oneline -5
```

Expected: two clean feature commits above the pre-animation history.
