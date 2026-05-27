# Render Engine Animation System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build four reusable animation primitives — pixel section reveals, scan line heading reveals, count-up numbers, and button pixel shimmer — and integrate them across the Render site to create a cohesive "Render Engine" animation language.

**Architecture:** Four independent building blocks: `PixelReveal` (canvas overlay wrapper), `ScanlineHeading` (Framer Motion sweep reveal), `useCountUp` (IntersectionObserver + rAF hook), and Button shimmer (canvas on hover). Each is self-contained; sections import and apply them. No global animation state.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion (already installed — `import { motion, useInView } from 'framer-motion'`), HTML5 Canvas API, React hooks

---

## Critical Codebase Context

Read this before touching any file:

- **`cn()` in `lib/utils.ts` is a plain string join — NOT tailwind-merge.** Conflicting Tailwind class overrides do not resolve. Never try to override `charcoal` or `accent` via className — add new variants to component variant objects instead.
- **Custom colors:** `accent` = `#2563EB`, `accent-dark` = `#1D4ED8`, `accent-light` = `#3B82F6`, `charcoal` = `#0F0F0F`. Use hex values directly in canvas code.
- **`'use client'` is required** for any file using Framer Motion, canvas, refs, or React state.
- **`container-studio`** is a CSS layout class — do not rename or remove it.
- **Framer Motion is already installed.** Import from `'framer-motion'`. All existing section animations use `whileInView` with `viewport={{ once: true, margin: '-50px' }}`.
- **Display font sizes** (from `tailwind.config.ts`): `text-display-2xl` (clamp 3–6rem), `text-display-xl` (clamp 2.25–4.5rem), `text-display-lg` (clamp 1.875–3rem), `text-display-md` (clamp 1.5–2.25rem).
- **No test suite exists.** Verification is `npm run build` (TypeScript + Next.js checks) plus visual inspection at `http://localhost:3000`.

---

## File Structure

| File | Action | What it does |
|---|---|---|
| `hooks/useCountUp.ts` | CREATE | IntersectionObserver + rAF count-up hook |
| `components/ui/PixelReveal.tsx` | CREATE | Canvas pixel scatter wrapper for sections |
| `components/ui/ScanlineHeading.tsx` | CREATE | Framer Motion scan line heading reveal |
| `components/ui/Button.tsx` | MODIFY | Add canvas pixel shimmer on hover |
| `components/sections/WhatWeDo.tsx` | MODIFY | Apply PixelReveal + ScanlineHeading |
| `components/sections/WhyUs.tsx` | MODIFY | Apply PixelReveal + ScanlineHeading |
| `components/sections/PortfolioTeaser.tsx` | MODIFY | Apply PixelReveal + ScanlineHeading |
| `components/sections/ServicesDetail.tsx` | MODIFY | Apply ScanlineHeading to headings |
| `components/sections/AboutContent.tsx` | MODIFY | Apply ScanlineHeading to h1 |
| `components/ui/PricingCard.tsx` | MODIFY | Apply useCountUp to price display |

---

## Task 0: Git Pull

**Files:** none

- [ ] **Step 1: Pull latest changes**

```bash
git pull
```

Expected: fast-forward or already up to date. If there are merge conflicts, resolve them before proceeding.

---

## Task 1: Create `hooks/useCountUp.ts`

**Files:**
- Create: `hooks/useCountUp.ts`

- [ ] **Step 1: Create the hooks directory and file**

```bash
mkdir -p hooks
```

- [ ] **Step 2: Write `hooks/useCountUp.ts`**

```typescript
import { useRef, useState, useEffect, useCallback } from 'react'

interface UseCountUpOptions {
  to: number
  duration?: number
  delay?: number
  easing?: 'easeOut' | 'linear'
}

interface UseCountUpResult {
  count: number
  ref: React.RefObject<HTMLElement>
}

export function useCountUp({
  to,
  duration = 1200,
  delay = 0,
  easing = 'easeOut',
}: UseCountUpOptions): UseCountUpResult {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const frameRef = useRef<number>(0)
  const hasRun = useRef(false)

  const runCount = useCallback(() => {
    const startTime = performance.now() + delay

    const tick = (currentTime: number) => {
      if (currentTime < startTime) {
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress =
        easing === 'easeOut' ? 1 - Math.pow(1 - progress, 3) : progress

      setCount(Math.round(to * easedProgress))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [to, duration, delay, easing])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true
          runCount()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [runCount])

  return { count, ref }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npm run build
```

Expected: ✓ Compiled successfully (or the same route list as before — no new errors).

- [ ] **Step 4: Commit**

```bash
git add hooks/useCountUp.ts
git commit -m "feat: add useCountUp hook for scroll-triggered number animation"
```

---

## Task 2: Create `components/ui/PixelReveal.tsx`

**Files:**
- Create: `components/ui/PixelReveal.tsx`

This component wraps any section with a canvas overlay. When it enters the viewport (threshold 15%), a fast pixel scatter "renders in" (300ms scatter + 200ms fade-out = 500ms total). After the animation the canvas hides itself. Pixel size is 8px vs the hero's 16px — subtler, faster.

- [ ] **Step 1: Write `components/ui/PixelReveal.tsx`**

```tsx
'use client'

import { useRef, useEffect, useCallback } from 'react'

interface PixelRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  pixelSize?: number
}

const PIXEL_COLORS = ['#2563EB', '#3B82F6', '#1D4ED8']
const WHITE_PROBABILITY = 0.08
const SCATTER_DURATION = 300  // ms pixels scatter in
const FADE_DURATION = 200     // ms canvas fades out after scatter

export default function PixelReveal({
  children,
  className,
  delay = 0,
  pixelSize = 8,
}: PixelRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const hasRun = useRef(false)

  const runAnimation = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const w = container.offsetWidth
    const h = container.offsetHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    canvas.style.display = 'block'
    canvas.style.opacity = '1'

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const GAP = 1
    const STEP = pixelSize + GAP

    interface Pixel {
      x: number
      y: number
      delay: number
      color: string
      opacity: number
    }

    const pixels: Pixel[] = []
    for (let x = 0; x < w; x += STEP) {
      for (let y = 0; y < h; y += STEP) {
        pixels.push({
          x,
          y,
          delay: Math.random() * SCATTER_DURATION,
          color:
            Math.random() < WHITE_PROBABILITY
              ? '#ffffff'
              : PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
          opacity: 0.4 + Math.random() * 0.6,
        })
      }
    }

    const startTime = performance.now()

    const drawFrame = (elapsed: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const px of pixels) {
        if (elapsed < px.delay) continue
        const localElapsed = elapsed - px.delay
        const localProgress = Math.min(localElapsed / 100, 1)
        ctx.globalAlpha = localProgress * px.opacity
        ctx.fillStyle = px.color
        ctx.fillRect(px.x, px.y, pixelSize, pixelSize)
      }
      ctx.globalAlpha = 1
    }

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime

      if (elapsed > SCATTER_DURATION) {
        const fadeProgress = Math.min(
          (elapsed - SCATTER_DURATION) / FADE_DURATION,
          1
        )
        canvas.style.opacity = String(1 - fadeProgress)

        if (fadeProgress >= 1) {
          canvas.style.display = 'none'
          return
        }
      }

      drawFrame(Math.min(elapsed, SCATTER_DURATION))
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
  }, [pixelSize])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true
          if (delay > 0) {
            setTimeout(runAnimation, delay)
          } else {
            runAnimation()
          }
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [delay, runAnimation])

  return (
    <div ref={containerRef} className={`relative${className ? ` ${className}` : ''}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: 'none',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: ✓ Compiled successfully.

- [ ] **Step 3: Commit**

```bash
git add components/ui/PixelReveal.tsx
git commit -m "feat: add PixelReveal canvas component for scroll-triggered pixel animation"
```

---

## Task 3: Create `components/ui/ScanlineHeading.tsx`

**Files:**
- Create: `components/ui/ScanlineHeading.tsx`

A thin 3px vertical accent-colored line sweeps left→right across the heading (like a render pass). The heading text fades in 150ms after the sweep starts. Uses Framer Motion `useInView` to self-trigger once.

- [ ] **Step 1: Write `components/ui/ScanlineHeading.tsx`**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

interface ScanlineHeadingProps {
  children: React.ReactNode
  as?: HeadingTag
  className?: string
  delay?: number  // seconds before animation starts
}

export default function ScanlineHeading({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
}: ScanlineHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px 0px' })

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Scan line sweeps left to right */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-[3px] bg-accent pointer-events-none"
        style={{ zIndex: 15 }}
        initial={{ left: '-3px' }}
        animate={isInView ? { left: '105%' } : { left: '-3px' }}
        transition={{ left: { duration: 0.5, delay, ease: 'easeInOut' } }}
      />
      {/* Heading fades in as scan line passes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.15 }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: ✓ Compiled successfully.

- [ ] **Step 3: Commit**

```bash
git add components/ui/ScanlineHeading.tsx
git commit -m "feat: add ScanlineHeading component for render-pass text reveal"
```

---

## Task 4: Modify `components/ui/Button.tsx` — Pixel Shimmer on Hover

**Files:**
- Modify: `components/ui/Button.tsx`

On mouse enter, 15 random small pixels scatter and fade out over 300ms. The canvas is absolute-positioned inside the button. Requires adding `'use client'`, `relative` to base class, and canvas + mouse handlers.

- [ ] **Step 1: Replace `components/ui/Button.tsx` with the full updated file**

```tsx
'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'secondary-inverse' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
  'secondary-inverse': 'border-2 border-white text-white hover:bg-white hover:text-charcoal',
  ghost: 'text-accent hover:underline',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const SHIMMER_COLORS = ['#ffffff', '#93c5fd', '#bfdbfe']
const SHIMMER_COUNT = 15
const SHIMMER_DURATION = 350

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  className,
  fullWidth,
}: ButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)

  const baseClass = cn(
    'relative inline-flex items-center justify-center font-bold rounded-none transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  const handleMouseEnter = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const w = parent.offsetWidth
    const h = parent.offsetHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const pixels = Array.from({ length: SHIMMER_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 2 + Math.random() * 4,
      color: SHIMMER_COLORS[Math.floor(Math.random() * SHIMMER_COLORS.length)],
      startDelay: Math.random() * 150,
    }))

    const startTime = performance.now()

    const draw = (timestamp: number) => {
      const elapsed = timestamp - startTime
      ctx.clearRect(0, 0, w, h)

      for (const px of pixels) {
        if (elapsed < px.startDelay) continue
        const localElapsed = elapsed - px.startDelay
        const remaining = SHIMMER_DURATION - px.startDelay
        const progress = Math.min(localElapsed / remaining, 1)
        ctx.globalAlpha = Math.max(0, 1 - progress)
        ctx.fillStyle = px.color
        ctx.fillRect(px.x, px.y, px.size, px.size)
      }
      ctx.globalAlpha = 1

      if (elapsed < SHIMMER_DURATION) {
        frameRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, w, h)
      }
    }

    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(draw)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  const canvasEl = (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    />
  )

  if (href) {
    return (
      <Link
        href={href}
        className={baseClass}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {canvasEl}
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {canvasEl}
      {children}
    </button>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: ✓ Compiled successfully.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: add pixel shimmer on hover to Button component"
```

---

## Task 5: Apply PixelReveal + ScanlineHeading to WhatWeDo and WhyUs

**Files:**
- Modify: `components/sections/WhatWeDo.tsx`
- Modify: `components/sections/WhyUs.tsx`

**Timing note:** When PixelReveal and ScanlineHeading are both on the same section, the scan line should start with `delay={0.5}` (seconds) so it begins AFTER the 500ms pixel scatter completes. This creates a clean sequential effect: pixels render in → dissolve → scan line sweeps → text appears.

- [ ] **Step 1: Replace `components/sections/WhatWeDo.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import ServiceCard from '@/components/ui/ServiceCard'
import PixelReveal from '@/components/ui/PixelReveal'
import ScanlineHeading from '@/components/ui/ScanlineHeading'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

const WebIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9" />
  </svg>
)

const AIIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

export default function WhatWeDo() {
  return (
    <PixelReveal>
      <section className="py-20 md:py-32 bg-white">
        <div className="container-studio">
          <div className="mb-14">
            <motion.p
              className="text-accent font-bold text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              What We Do
            </motion.p>
            <ScanlineHeading
              as="h2"
              className="text-display-xl font-black text-charcoal"
              delay={0.5}
            >
              Two services.
              <br />
              One focused team.
            </ScanlineHeading>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={<WebIcon />}
                title="Web Design & Development"
                description="Custom Next.js sites that load fast, rank well, and look like you actually care about your brand."
                href="/services#web"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={<AIIcon />}
                title="AI Consulting & Automation"
                description="Practical AI tools for real business problems. No hype, no black boxes — just results you can use."
                href="/services#ai"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PixelReveal>
  )
}
```

- [ ] **Step 2: Replace `components/sections/WhyUs.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { WHY_US_ITEMS } from '@/lib/data'
import PixelReveal from '@/components/ui/PixelReveal'
import ScanlineHeading from '@/components/ui/ScanlineHeading'
import Button from '@/components/ui/Button'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export default function WhyUs() {
  return (
    <PixelReveal>
      <section className="py-20 md:py-32 bg-charcoal text-white">
        <div className="container-studio">
          <div className="mb-14">
            <motion.p
              className="text-accent font-bold text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Why Render
            </motion.p>
            <ScanlineHeading
              as="h2"
              className="text-display-xl font-black text-white"
              delay={0.5}
            >
              What makes us different.
            </ScanlineHeading>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {WHY_US_ITEMS.map((item) => (
              <motion.div key={item.number} variants={itemVariants}>
                <p className="text-6xl font-black text-white/10 mb-4">{item.number}</p>
                <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Button variant="primary" href="/contact" size="lg">
              Book a Call
            </Button>
          </motion.div>
        </div>
      </section>
    </PixelReveal>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: ✓ Compiled successfully.

- [ ] **Step 4: Commit**

```bash
git add components/sections/WhatWeDo.tsx components/sections/WhyUs.tsx
git commit -m "feat: apply PixelReveal and ScanlineHeading to WhatWeDo and WhyUs sections"
```

---

## Task 6: Apply ScanlineHeading to PortfolioTeaser, ServicesDetail, AboutContent

**Files:**
- Modify: `components/sections/PortfolioTeaser.tsx`
- Modify: `components/sections/ServicesDetail.tsx`
- Modify: `components/sections/AboutContent.tsx`

**Note:** PortfolioTeaser also gets PixelReveal. ServicesDetail and AboutContent get ScanlineHeading only (no PixelReveal — these are inner pages, not scroll sections on the homepage). On inner pages, ScanlineHeading uses `delay={0}` since there's no PixelReveal to sequence around.

- [ ] **Step 1: Replace `components/sections/PortfolioTeaser.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { PROJECTS } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'
import Button from '@/components/ui/Button'
import PixelReveal from '@/components/ui/PixelReveal'
import ScanlineHeading from '@/components/ui/ScanlineHeading'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export default function PortfolioTeaser() {
  return (
    <PixelReveal>
      <section className="py-20 md:py-32 bg-white">
        <div className="container-studio">
          <div className="mb-14">
            <motion.p
              className="text-accent font-bold text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Our Work
            </motion.p>
            <ScanlineHeading
              as="h2"
              className="text-display-xl font-black text-charcoal"
              delay={0.5}
            >
              See what we&apos;re building.
            </ScanlineHeading>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {PROJECTS.slice(0, 2).map((project) => (
              <motion.div key={project.projectName} variants={itemVariants}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="text-neutral-600 text-sm">We&apos;re actively booking first clients.</p>
            <Button variant="secondary" href="/work">
              View All Work
            </Button>
          </div>
        </div>
      </section>
    </PixelReveal>
  )
}
```

- [ ] **Step 2: Replace `components/sections/ServicesDetail.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { PRICING_TIERS } from '@/lib/data'
import PricingCard from '@/components/ui/PricingCard'
import Button from '@/components/ui/Button'
import ScanlineHeading from '@/components/ui/ScanlineHeading'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

const featureItems = [
  'Custom-built, mobile-ready websites',
  'Mobile-first responsive design',
  'On-page SEO foundation',
  'Fast turnaround (2–4 weeks)',
  'Monthly maintenance plans',
  'Performance-optimized (Core Web Vitals)',
]

export default function ServicesDetail() {
  return (
    <div>
      <section className="py-20 md:py-32 bg-white">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-20"
          >
            <ScanlineHeading
              as="h1"
              className="text-display-2xl font-black text-charcoal mb-4"
              delay={0}
            >
              What we do,
              <br />
              and what it costs.
            </ScanlineHeading>
            <p className="text-xl text-neutral-500">Clear scope. Clear pricing. No surprises.</p>
          </motion.div>

          <div id="web" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
                Web Design & Development
              </p>
              <ScanlineHeading
                as="h2"
                className="text-display-xl font-black text-charcoal mb-6"
                delay={0}
              >
                Modern websites for businesses that mean business.
              </ScanlineHeading>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {featureItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-700">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {PRICING_TIERS.map((tier) => (
                <motion.div key={tier.tier} variants={itemVariants}>
                  <PricingCard {...tier} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="ai" className="py-20 md:py-32 bg-charcoal text-white">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
              AI Consulting & Automation
            </p>
            <ScanlineHeading
              as="h2"
              className="text-display-xl font-black text-white mb-8"
              delay={0}
            >
              AI for your actual business, not a pitch deck.
            </ScanlineHeading>
            <div className="space-y-5 mb-10 text-neutral-300 leading-relaxed text-lg">
              <p>
                We help small businesses identify where AI can save time and money — without
                overpromising or overcomplicating.
              </p>
              <p>
                Common projects: AI-assisted customer service drafts, automated data entry workflows,
                content scheduling tools, internal process documentation.
              </p>
              <p>
                We believe in honest expectations. We&apos;ll tell you when AI isn&apos;t the right tool —
                and what is.
              </p>
            </div>
            <Button variant="primary" href="/contact" size="lg">
              Talk to Us About AI
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 3: Replace `components/sections/AboutContent.tsx`**

```tsx
'use client'

import { motion, type Variants } from 'framer-motion'
import { TEAM_MEMBERS } from '@/lib/data'
import TeamMember from '@/components/ui/TeamMember'
import ScanlineHeading from '@/components/ui/ScanlineHeading'

const values = [
  { title: 'Quality over quantity', description: 'We take on fewer clients so we can do better work.' },
  { title: 'Transparency always', description: 'No hidden costs, no scope surprises, no fluff.' },
  { title: 'Mutual benefit', description: 'You get a great site. We get real experience. Win-win.' },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AboutContent() {
  return (
    <div>
      <section className="py-20 md:py-32 bg-white">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="mb-20"
          >
            <ScanlineHeading
              as="h1"
              className="text-display-xl font-black text-charcoal mb-8 max-w-3xl"
              delay={0}
            >
              Built for local.<br />Priced for real.
            </ScanlineHeading>
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">Our Mission</p>
            <p className="text-2xl text-neutral-600 leading-relaxed max-w-2xl">
              Tim brings the software. Luke brings the strategy. Together we help local businesses get modern websites and practical digital tools at a fraction of what a traditional agency charges. No overhead, no middlemen, just two people who care about the work.
            </p>
          </motion.div>

          <div className="mb-4">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-10">The Team</p>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ staggerChildren: 0.18 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {TEAM_MEMBERS.map((member) => (
                <motion.div key={member.name} variants={cardVariants}>
                  <TeamMember {...member} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-charcoal text-white">
        <div className="container-studio">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="text-lg font-black text-white mb-2">{value.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: ✓ Compiled successfully.

- [ ] **Step 5: Commit**

```bash
git add components/sections/PortfolioTeaser.tsx components/sections/ServicesDetail.tsx components/sections/AboutContent.tsx
git commit -m "feat: apply ScanlineHeading and PixelReveal to remaining page sections"
```

---

## Task 7: Apply `useCountUp` to `PricingCard.tsx`

**Files:**
- Modify: `components/ui/PricingCard.tsx`

Parse the price string (e.g. `'$500'`, `'$2,000'`) to a number, count up to it when the card scrolls into view, and reformat with `$` + `toLocaleString()`. Must add `'use client'` since this uses a hook with refs.

- [ ] **Step 1: Replace `components/ui/PricingCard.tsx`**

```tsx
'use client'

import Button from './Button'
import { useCountUp } from '@/hooks/useCountUp'

interface PricingCardProps {
  tier: 'Starter' | 'Standard' | 'Premium'
  priceRange: string
  monthlyRange: string
  features: string[]
  isHighlighted?: boolean
  ctaHref: string
}

export default function PricingCard({
  tier,
  priceRange,
  monthlyRange,
  features,
  isHighlighted,
  ctaHref,
}: PricingCardProps) {
  // Parse numeric value from priceRange string (e.g. '$2,000' → 2000)
  const numericPrice = parseInt(priceRange.replace(/[^0-9]/g, ''), 10)

  const { count, ref } = useCountUp({
    to: numericPrice,
    duration: 1200,
    delay: 200,
  })

  const displayPrice = `$${count.toLocaleString()}`

  return (
    <div
      className={`p-8 border relative ${
        isHighlighted
          ? 'bg-charcoal text-white border-charcoal'
          : 'bg-white text-charcoal border-neutral-200'
      }`}
    >
      {isHighlighted && (
        <span className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
          Most Popular
        </span>
      )}
      <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">{tier}</p>
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className="text-4xl font-black mb-1"
      >
        {displayPrice}
      </p>
      <p className={`text-sm mb-8 ${isHighlighted ? 'text-neutral-400' : 'text-neutral-500'}`}>
        + {monthlyRange} maintenance
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <svg
              className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className={isHighlighted ? 'text-neutral-300' : 'text-neutral-600'}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant={isHighlighted ? 'primary' : 'secondary'} href={ctaHref} fullWidth>
        Get Started
      </Button>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: ✓ Compiled successfully. All 10 routes generate successfully.

- [ ] **Step 3: Commit**

```bash
git add components/ui/PricingCard.tsx
git commit -m "feat: add count-up animation to pricing card numbers"
```

---

## Task 8: Visual Verification

**Files:** none (read-only check)

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Open `http://localhost:3000` (or whichever port Next.js picks — check terminal output).

- [ ] **Step 2: Verify each animation on the home page**

Navigate to `http://localhost:3000` and scroll slowly through the page:

1. **Hero** — pixel scatter animation plays on load (existing, unchanged)
2. **WhatWeDo section** — when it enters viewport: pixel scatter fills section briefly, then dissolves; ~500ms later the scan line sweeps across "Two services. / One focused team." and text fades in
3. **WhyUs section** — same pixel + scan line sequence; dark charcoal background with white heading
4. **PortfolioTeaser section** — pixel scatter + scan line on "See what we're building."
5. **All buttons** — hover over any button and look for a brief sparkle of white/light-blue pixels

- [ ] **Step 3: Verify inner pages**

Navigate to:
- `http://localhost:3000/services` — scan line on "What we do, and what it costs." h1; scan line on "Modern websites…" and "AI for your actual…" h2s; pricing numbers count up from $0 to $500/$750/$2,000 when cards scroll into view
- `http://localhost:3000/about` — scan line on "Built for local. / Priced for real." h1

- [ ] **Step 4: Final commit if any tweaks were needed**

```bash
git add -A
git commit -m "fix: animation timing and visual polish tweaks"
```

If no tweaks needed, skip this step.

---

## Summary of All Commits

By the end of this plan, git log should show (newest first):

```
feat: add count-up animation to pricing card numbers
feat: apply ScanlineHeading and PixelReveal to remaining page sections
feat: apply PixelReveal and ScanlineHeading to WhatWeDo and WhyUs sections
feat: add pixel shimmer on hover to Button component
feat: add ScanlineHeading component for render-pass text reveal
feat: add PixelReveal canvas component for scroll-triggered pixel animation
feat: add useCountUp hook for scroll-triggered number animation
```
