# Premium Motion Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a restrained layer of premium micro-interactions (motion tokens, scroll-aware nav, card tilt/glow, magnetic CTAs) plus one signature moment (a cursor-reactive hero pixel field), all extending the site's existing pixel/scanline identity.

**Architecture:** Foundational, dependency-free units land first — a motion-tokens module and three reusable pointer/scroll hooks. Consumer components (Navbar, Button, the three card types, PixelCanvas) then wire those hooks in. Every effect is gated behind `prefers-reduced-motion` and `(pointer: fine)` so touch and reduced-motion users keep today's behavior. Pointer effects animate `transform` only via `requestAnimationFrame`, never via React re-render.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind, Framer Motion (already a dependency). Path alias `@/` → repo root. No test runner — verification is `npm run build` + `npm run lint` + dev-server preview checks.

**Verification note:** There is no test suite. For each task: run `npm run lint` and `npm run build` (must pass with no new errors), then do the stated manual preview check. Commit only after build passes.

---

## File Structure

New files:
- `lib/motion.ts` — shared Framer Motion easing/duration tokens and reveal variants.
- `hooks/useScrolled.ts` — boolean: has the page scrolled past a threshold.
- `hooks/useMagnetic.ts` — ref + handlers: translate an element toward the cursor.
- `hooks/useTilt.ts` — ref + handlers: 3D tilt + cursor-tracked glow position.

Modified files:
- `components/layout/Navbar.tsx` — shrink + stronger blur/shadow on scroll.
- `components/ui/Button.tsx` — magnetic pull on the primary variant.
- `components/ui/ServiceCard.tsx` — tilt + glow (convert to client component).
- `components/ui/PricingCard.tsx` — tilt + glow.
- `components/ui/ProjectCard.tsx` — tilt only (convert to client component; no glow, to keep the live-demo iframe clean).

Dependency order: Task 1–4 (foundations) → Task 5–8 (consumers). Tasks 5–8 are mutually independent once 1–4 exist.

---

### Task 1: Motion tokens

**Files:**
- Create: `lib/motion.ts`
- Modify: `components/ui/ScanlineHeading.tsx` (adopt the shared ease)

- [ ] **Step 1: Create the tokens module**

Create `lib/motion.ts`:

```ts
import type { Variants, Transition } from 'framer-motion'

/** Standard easing used across the site (matches the existing inline cubic-bezier). */
export const EASE = [0.25, 0.46, 0.45, 0.94] as const

/** Reusable duration + ease bundles for one-off transitions. */
export const transitions: Record<'fast' | 'base' | 'slow', Transition> = {
  fast: { duration: 0.3, ease: EASE },
  base: { duration: 0.55, ease: EASE },
  slow: { duration: 0.7, ease: EASE },
}

/** Fade-up reveal for scroll-in content. Pair with `whileInView="visible"`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
}

/** Container that staggers its children's reveals. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
```

- [ ] **Step 2: Adopt the shared ease in ScanlineHeading**

In `components/ui/ScanlineHeading.tsx`, add the import after the existing imports:

```ts
import { EASE } from '@/lib/motion'
```

Then change the scan-line transition (currently `ease: 'easeInOut'`) to use the token:

```tsx
        transition={{ left: { duration: 0.5, delay, ease: EASE } }}
```

(Leave the rest of ScanlineHeading unchanged. Other components may adopt `fadeUp`/`staggerContainer` later; that migration is best-effort and NOT required by this task.)

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: both pass, no new errors. `lib/motion.ts` compiles (exports resolve).

- [ ] **Step 4: Commit**

```bash
git add lib/motion.ts components/ui/ScanlineHeading.tsx
git commit -m "feat: add shared motion tokens (lib/motion.ts)"
```

---

### Task 2: useScrolled hook

**Files:**
- Create: `hooks/useScrolled.ts`

- [ ] **Step 1: Create the hook**

Create `hooks/useScrolled.ts`:

```ts
'use client'

import { useEffect, useState } from 'react'

/**
 * Returns true once the window has scrolled past `threshold` pixels.
 * Uses a passive scroll listener; evaluates once on mount for restored scroll positions.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add hooks/useScrolled.ts
git commit -m "feat: add useScrolled hook"
```

---

### Task 3: useMagnetic hook

**Files:**
- Create: `hooks/useMagnetic.ts`

- [ ] **Step 1: Create the hook**

Create `hooks/useMagnetic.ts`:

```ts
'use client'

import { useCallback, useEffect, useRef } from 'react'

interface MagneticOptions {
  /** Fraction of cursor offset applied as translation. */
  strength?: number
  /** Max translation in px on each axis. */
  max?: number
}

/**
 * Magnetic pointer effect: translates the element toward the cursor, capped at `max`.
 * No-ops under reduced-motion or coarse pointers (returns inert handlers).
 * Animates `transform` via rAF — never triggers React re-renders.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.3,
  max = 6,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null)
  const frame = useRef<number | null>(null)
  const enabled = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    enabled.current = fine && !reduce
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!enabled.current) return
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const tx = Math.max(-max, Math.min(max, dx * strength))
      const ty = Math.max(-max, Math.min(max, dy * strength))
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate(${tx}px, ${ty}px)`
      })
    },
    [strength, max]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    el.style.transform = 'translate(0px, 0px)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add hooks/useMagnetic.ts
git commit -m "feat: add useMagnetic hook"
```

---

### Task 4: useTilt hook

**Files:**
- Create: `hooks/useTilt.ts`

- [ ] **Step 1: Create the hook**

Create `hooks/useTilt.ts`:

```ts
'use client'

import { useCallback, useEffect, useRef } from 'react'

interface TiltOptions {
  /** Max rotation in degrees on each axis. */
  max?: number
  /** Perspective distance in px. */
  perspective?: number
}

/**
 * 3D tilt + glow-tracking pointer effect for cards.
 * Rotates the element toward the cursor and exposes `--glow-x` / `--glow-y` CSS vars
 * (0–100%) so a child overlay can position a radial glow. No-ops under reduced-motion
 * or coarse pointers. Animates `transform` via rAF.
 */
export function useTilt<T extends HTMLElement = HTMLElement>({
  max = 6,
  perspective = 800,
}: TiltOptions = {}) {
  const ref = useRef<T>(null)
  const frame = useRef<number | null>(null)
  const enabled = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    enabled.current = fine && !reduce
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!enabled.current) return
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width // 0..1
      const py = (e.clientY - rect.top) / rect.height // 0..1
      const rotateY = (px - 0.5) * 2 * max
      const rotateX = (0.5 - py) * 2 * max
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        el.style.setProperty('--glow-x', `${px * 100}%`)
        el.style.setProperty('--glow-y', `${py * 100}%`)
      })
    },
    [max, perspective]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`
    el.style.removeProperty('--glow-x')
    el.style.removeProperty('--glow-y')
  }, [perspective])

  return { ref, onMouseMove, onMouseLeave }
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add hooks/useTilt.ts
git commit -m "feat: add useTilt hook"
```

---

### Task 5: Scroll-aware Navbar

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Add imports**

In `components/layout/Navbar.tsx`, add these imports below the existing import block:

```ts
import { cn } from '@/lib/utils'
import { useScrolled } from '@/hooks/useScrolled'
```

- [ ] **Step 2: Read scroll state**

Inside the `Navbar` component, below `const pathname = usePathname()`:

```ts
  const scrolled = useScrolled(24)
```

- [ ] **Step 3: Make the header react to scroll**

Replace the opening `<header ...>` element (currently the static `className` string) with:

```tsx
    <header
      className={cn(
        'sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300',
        scrolled
          ? 'bg-white/95 border-neutral-200 shadow-sm'
          : 'bg-white/90 border-neutral-100'
      )}
    >
```

Then replace the inner row `<div className="flex items-center justify-between h-16 md:h-20">` with a height that shrinks on scroll:

```tsx
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            scrolled ? 'h-12 md:h-16' : 'h-16 md:h-20'
          )}
        >
```

(Leave the mobile menu, links, and Button untouched.)

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run build`
Expected: both pass.

Preview check: start the dev server, load `/`, scroll down — the nav bar shrinks slightly and gains a subtle shadow + slightly more opaque background; scroll back to top — it returns. No console errors.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: shrink and emphasize navbar on scroll"
```

---

### Task 6: Magnetic primary buttons

**Files:**
- Modify: `components/ui/Button.tsx`

- [ ] **Step 1: Import the hook**

In `components/ui/Button.tsx`, add below the existing imports:

```ts
import { useMagnetic } from '@/hooks/useMagnetic'
```

- [ ] **Step 2: Wire the hook into the component**

Inside `Button`, below the existing `const canvasRef = useRef<HTMLCanvasElement>(null)`:

```ts
  const isMagnetic = variant === 'primary' && !disabled
  const magnetic = useMagnetic<HTMLAnchorElement & HTMLButtonElement>({ strength: 0.25, max: 5 })
```

- [ ] **Step 3: Add a transform transition to the base class**

In the `baseClass` `cn(...)` call, the first string already contains `transition-all duration-200`, which covers transform. No change needed there — the magnetic translate will ease smoothly via that existing transition.

- [ ] **Step 4: Attach ref + handlers to both rendered elements**

Replace the `if (href)` Link return block with:

```tsx
  if (href) {
    return (
      <Link
        href={href}
        ref={isMagnetic ? magnetic.ref : undefined}
        className={baseClass}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={isMagnetic ? magnetic.onMouseMove : undefined}
        onMouseLeave={() => {
          handleMouseLeave()
          if (isMagnetic) magnetic.onMouseLeave()
        }}
      >
        {canvasEl}
        {children}
      </Link>
    )
  }
```

And replace the final `<button ...>` return block with:

```tsx
  return (
    <button
      type={type}
      ref={isMagnetic ? magnetic.ref : undefined}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      onMouseEnter={handleMouseEnter}
      onMouseMove={isMagnetic ? magnetic.onMouseMove : undefined}
      onMouseLeave={() => {
        handleMouseLeave()
        if (isMagnetic) magnetic.onMouseLeave()
      }}
    >
      {canvasEl}
      {children}
    </button>
  )
```

(The intersection type `HTMLAnchorElement & HTMLButtonElement` lets one ref satisfy both `Link`'s and `button`'s ref types.)

- [ ] **Step 5: Verify**

Run: `npm run lint && npm run build`
Expected: both pass (watch for ref type errors — they indicate the generic above was not applied).

Preview check: load `/`, hover the blue "Book a Call" button — it should drift a few px toward the cursor and snap back on leave, with the existing pixel shimmer still firing. Secondary/outline buttons do NOT move.

- [ ] **Step 6: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: magnetic pull on primary buttons"
```

---

### Task 7: Card tilt + glow

**Files:**
- Modify: `components/ui/ServiceCard.tsx`
- Modify: `components/ui/PricingCard.tsx`
- Modify: `components/ui/ProjectCard.tsx`

- [ ] **Step 1: ServiceCard — convert to client + add tilt/glow**

Replace the entire contents of `components/ui/ServiceCard.tsx` with:

```tsx
'use client'

import Link from 'next/link'
import { useTilt } from '@/hooks/useTilt'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>()

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transition: 'transform 150ms ease-out, box-shadow 300ms ease, border-color 300ms ease',
        willChange: 'transform',
      }}
      className="relative bg-white border border-neutral-200 p-8 md:p-10 hover:shadow-card-hover hover:border-accent/30 group"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(37,99,235,0.10), transparent 60%)',
        }}
      />
      <div className="relative">
        <div className="w-12 h-12 bg-blue-50 flex items-center justify-center text-accent mb-6">
          {icon}
        </div>
        <h3 className="text-2xl font-black text-charcoal mb-3">{title}</h3>
        <p className="text-neutral-600 text-base leading-relaxed mb-6">{description}</p>
        <Link
          href={href}
          className="text-accent font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: PricingCard — add tilt/glow**

Replace the entire contents of `components/ui/PricingCard.tsx` with:

```tsx
'use client'

import Button from './Button'
import { useCountUp } from '@/hooks/useCountUp'
import { useTilt } from '@/hooks/useTilt'

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

  const tilt = useTilt<HTMLDivElement>()

  const displayPrice = `$${count.toLocaleString()}`

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 150ms ease-out', willChange: 'transform' }}
      className={`p-8 border relative group ${
        isHighlighted
          ? 'bg-charcoal text-white border-charcoal'
          : 'bg-white text-charcoal border-neutral-200'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(450px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(37,99,235,0.12), transparent 60%)',
        }}
      />
      <div className="relative">
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
    </div>
  )
}
```

Note: the "Most Popular" badge stays `absolute` inside the new `relative` wrapper, so it still pins to the card's top-right corner.

- [ ] **Step 3: ProjectCard — convert to client + add tilt (no glow)**

In `components/ui/ProjectCard.tsx`, add at the very top of the file (above the interface):

```tsx
'use client'

import { useTilt } from '@/hooks/useTilt'
```

Inside `ProjectCard`, immediately after the destructured props (before the `if (demoUrl && onOpenDemo)` check):

```ts
  const tilt = useTilt<HTMLDivElement>({ max: 5 })

  const tiltProps = {
    ref: tilt.ref,
    onMouseMove: tilt.onMouseMove,
    onMouseLeave: tilt.onMouseLeave,
    style: { transition: 'transform 150ms ease-out', willChange: 'transform' as const },
  }
```

In the demo-variant return, change the outer wrapper from:

```tsx
      <div className="group cursor-pointer h-full" onClick={onOpenDemo}>
```

to:

```tsx
      <div {...tiltProps} className="group cursor-pointer h-full" onClick={onOpenDemo}>
```

In the placeholder return, change:

```tsx
    <div className="group h-full">
```

to:

```tsx
    <div {...tiltProps} className="group h-full">
```

(No glow overlay here — the live-demo iframe and gradient already provide visual interest, and an overlay would muddy them.)

- [ ] **Step 4: Verify**

Run: `npm run lint && npm run build`
Expected: both pass (watch for unbalanced JSX tags in PricingCard from the wrapper div — the build will fail loudly if the `</div>` count is wrong).

Preview check: load `/services` — hover the two service cards and the three pricing cards: each tilts toward the cursor with a soft accent glow that tracks the pointer, and resets on leave. Load `/work` — project cards tilt (no glow), and the "Preview Demo" overlay still works on the live card.

- [ ] **Step 5: Commit**

```bash
git add components/ui/ServiceCard.tsx components/ui/PricingCard.tsx components/ui/ProjectCard.tsx
git commit -m "feat: cursor-aware tilt and glow on cards"
```

---

### Task 8: Reactive hero pixel field

**Files:**
- Modify: `components/sections/PixelCanvas.tsx`

- [ ] **Step 1: Replace PixelCanvas with the reactive version**

Replace the entire contents of `components/sections/PixelCanvas.tsx` with:

```tsx
'use client'

import { useEffect, useRef } from 'react'

const PIXEL_SIZE = 16
const GAP = 2
const STEP = PIXEL_SIZE + GAP
const COLORS = ['#2563EB', '#3B82F6', '#1D4ED8']
const SCATTER_DURATION = 1500
const AMBIENT_OPACITY = 0.1 // faint persistent grid after scatter-in
const REACT_RADIUS = 120 // px around the cursor that brighten
const REACT_BOOST = 0.65 // extra opacity at the cursor center

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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const interactive = !reduceMotion && finePointer

    let animationId: number
    let pixels: Pixel[] = []
    let startTime: number | null = null
    const mouse = { x: -9999, y: -9999, active: false }

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

    // Phase 1: scatter-in (0..SCATTER_DURATION), same feel as before.
    function drawScatter(elapsed: number) {
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

    // Phase 2: faint ambient grid that brightens near the cursor.
    function drawAmbient() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (const px of pixels) {
        const cx = px.col * STEP
        const cy = px.row * STEP
        let alpha = AMBIENT_OPACITY
        if (mouse.active) {
          const dx = cx + PIXEL_SIZE / 2 - mouse.x
          const dy = cy + PIXEL_SIZE / 2 - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REACT_RADIUS) {
            alpha += REACT_BOOST * (1 - dist / REACT_RADIUS)
          }
        }
        ctx!.globalAlpha = Math.min(alpha, 1)
        ctx!.fillStyle = px.color
        ctx!.fillRect(cx, cy, PIXEL_SIZE, PIXEL_SIZE)
      }
      ctx!.globalAlpha = 1
    }

    function animate(timestamp: number) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      if (elapsed < SCATTER_DURATION) {
        drawScatter(elapsed)
        animationId = requestAnimationFrame(animate)
        return
      }
      if (interactive) {
        drawAmbient()
        animationId = requestAnimationFrame(animate)
      } else {
        // Non-interactive: fade the whole canvas out, matching the original behavior.
        canvas!.style.transition = 'opacity 500ms ease-out'
        canvas!.style.opacity = '0'
      }
    }

    function handleResize() {
      sizeCanvas()
      buildGrid()
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    function handlePointerLeave() {
      mouse.active = false
    }

    sizeCanvas()
    buildGrid()
    animationId = requestAnimationFrame(animate)

    window.addEventListener('resize', handleResize)
    if (interactive) {
      const parent = canvas.parentElement
      parent?.addEventListener('pointermove', handlePointerMove)
      parent?.addEventListener('pointerleave', handlePointerLeave)
      return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('resize', handleResize)
        parent?.removeEventListener('pointermove', handlePointerMove)
        parent?.removeEventListener('pointerleave', handlePointerLeave)
      }
    }

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 1 }} />
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint && npm run build`
Expected: both pass.

Preview check (desktop, normal motion): load `/` — pixels scatter in as before, then settle into a faint grid instead of fully disappearing; moving the cursor over the hero brightens a soft halo of pixels around the pointer; hero text stays clearly readable. No console errors, no visible jank.

Reduced-motion / mobile check: emulate `prefers-reduced-motion: reduce` (or load the mobile preset) and reload `/` — the field scatters in and fades fully out (original behavior), with no cursor reactivity.

- [ ] **Step 3: Commit**

```bash
git add components/sections/PixelCanvas.tsx
git commit -m "feat: cursor-reactive hero pixel field"
```

---

## Final verification (after all tasks)

- [ ] Run `npm run lint && npm run build` once more — clean.
- [ ] Dev-server walkthrough on desktop: nav shrink, magnetic primary buttons, card tilt+glow (services/pricing) and tilt (work), reactive hero. No console errors.
- [ ] Reduced-motion pass: every pointer effect is inert; nav still toggles (it's a layout/opacity change, acceptable under reduced-motion); hero falls back to scatter-then-fade.
- [ ] Mobile preset pass: no tilt/magnetic/hero-reactivity; layouts unchanged.
```
