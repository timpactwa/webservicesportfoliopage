# Render-Verb Tagline Band Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a late-homepage band reading "We don't just render websites. We render leads. / bookings. / customers." where the final word resolves through the list and locks on `customers.`

**Architecture:** A new client leaf `ResolveWord` owns the slot and the sequence; a new server section `RenderPromise` composes it with copy pulled from `lib/data.ts`. The server renders only the settled word, so SSR HTML, no-JS, and reduced-motion visitors all get one finished sentence. The earlier words are injected client-side after mount, then stacked in a single CSS grid cell so swapping them cannot reflow the line.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, Framer Motion.

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-09-render-verb-tagline-design.md`. Read it first.
- **No em dashes** in any shipped copy. Project rule, `CLAUDE.md`.
- **Content source of truth is `lib/data.ts`.** Structured copy does not live inside components.
- **Existing Tailwind tokens only.** Everything needed exists: `accent.dark`, `graphite`, `surface`, `hairline`, `display-lg`, `container-studio`. Add no new tokens.
- **`'use client'` only for Framer Motion or React state.** Pages stay server components; client leaves are imported into them.
- **There is no test runner in this repo.** `CLAUDE.md` states "No test suite is configured yet," and adding one is out of scope. Each task therefore ends with concrete verification commands whose expected output is stated exactly. Treat a mismatch as a failing test.
- **Never run `npm run build` while `next dev` is running.** They share `.next` and corrupt each other's chunks. Symptom is `Uncaught SyntaxError: Invalid or unexpected token` and 404s on routes that should be 200. Recovery: kill every `next` process for this repo, delete `.next`, start one server.
- **Never run two `next dev` servers for this repo at once**, for the same reason.
- **Do not touch `Hero.tsx`.** Its `opacity: 0` LCP element and 1.5s CTA delay are real defects tracked in `docs/design-audit-2026-07.md`, and out of scope here.

---

### Task 1: `ResolveWord`, the slot primitive

**Files:**
- Create: `components/ui/ResolveWord.tsx`
- Reference (do not modify): `components/ui/ResolveText.tsx`, `components/ui/Reveal.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`.
- Produces: `default export function ResolveWord(props: ResolveWordProps)` where

  ```ts
  interface ResolveWordProps {
    words: readonly string[]      // resolved in order; last entry is the resting word
    holds?: readonly number[]     // seconds each non-final word holds; length words.length - 1
    duration?: number             // resolve duration per word, seconds; default 0.5
    blur?: number                 // unresolved blur in px; default 8
    className?: string            // applied to the slot element
  }
  ```

  Task 2 renders `<ResolveWord words={...} holds={...} className="..." />` and nothing else.

- [ ] **Step 1: Confirm `.sr-only` is absolutely positioned**

The slot is a CSS grid. If `.sr-only` participated in grid sizing it would widen the slot and break the zero-CLS guarantee.

`.sr-only` is Tailwind's built-in utility here. It is **not** defined in `app/globals.css`, so grep that file and you will find nothing. Check the compiled stylesheet, with a dev server running:

```bash
curl -s http://localhost:3000/_next/static/css/app/layout.css | grep -A 3 '^\.sr-only'
```

Expected, and already verified on 2026-07-09:

```
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
```

If `position` is anything but `absolute`, stop and raise it. Do not proceed.

- [ ] **Step 2: Create the component**

Create `components/ui/ResolveWord.tsx` with exactly this content:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface ResolveWordProps {
  /** Resolved in order. The last entry is the resting word, and the only one the server renders. */
  words: readonly string[]
  /** Seconds each non-final word holds once sharp. Length is words.length - 1. */
  holds?: readonly number[]
  /** Resolve duration per word, in seconds. */
  duration?: number
  /** Unresolved blur, in px. */
  blur?: number
  className?: string
}

/**
 * A word that renders in. Resolves through `words` once when scrolled into view,
 * each entry sharpening from blur, then locks permanently on the last one.
 *
 * The server renders only the resting word, so the SSR HTML carries one finished
 * sentence: Googlebot never indexes an intermediate frame and a no-JS visitor
 * never sees a blank. The earlier words are injected after mount ("arming"),
 * which is also why the first client render matches the server exactly and
 * hydration cannot mismatch.
 */
export default function ResolveWord({
  words,
  holds = [],
  duration = 0.5,
  blur = 8,
  className,
}: ResolveWordProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const last = words.length - 1

  const [armed, setArmed] = useState(false)
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    setArmed(true)
  }, [])

  useEffect(() => {
    if (!armed || !inView || reduce) return
    setIndex(0)
  }, [armed, inView, reduce])

  useEffect(() => {
    if (index < 0 || index >= last) return
    const hold = holds[index] ?? 0.6
    const timer = setTimeout(() => setIndex((i) => i + 1), (duration + hold) * 1000)
    return () => clearTimeout(timer)
  }, [index, last, holds, duration])

  // The reduced-motion guard sits here, at render, not only in the arming effect.
  // Framer's useReducedMotion reports false on the first client render so that
  // hydration matches the server, then flips true in an effect. Guarding only the
  // effect would let a reduced-motion visitor arm on that first pass and then sit
  // on an empty slot forever, because every stacked word starts hidden and the
  // sequence never runs.
  if (reduce || !armed) {
    return (
      <span ref={ref} className={cn('inline-grid', className)}>
        <span className="col-start-1 row-start-1">{words[last]}</span>
      </span>
    )
  }

  return (
    <span ref={ref} className={cn('inline-grid', className)}>
      {/* Absolutely positioned, so it cannot widen the slot. */}
      <span className="sr-only">{words[last]}</span>
      {words.map((word, i) => (
        <motion.span
          key={word}
          aria-hidden="true"
          // Every word occupies the same cell, so the slot is sized by the widest
          // child and swapping words cannot reflow the line.
          className="col-start-1 row-start-1"
          initial={{ opacity: 0, y: 6, filter: `blur(${blur}px)` }}
          animate={
            i === index
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 6, filter: `blur(${blur}px)` }
          }
          transition={{ duration, ease: EASE }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
```

- [ ] **Step 3: Verify it typechecks and lints**

Run:

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit 0. `tsc` in particular must not complain that `readonly string[]` is not assignable, which would mean the props were typed as mutable arrays.

- [ ] **Step 4: Commit**

```bash
git add components/ui/ResolveWord.tsx
git commit -m "Add ResolveWord, a slot whose word renders in and then locks

The server emits only the resting word so SSR HTML, no-JS, and
reduced-motion all get one finished sentence. Earlier words are
injected after mount and stacked in one grid cell, so the swap
cannot reflow the line."
```

---

### Task 2: `RenderPromise`, the band, mounted on the homepage

**Files:**
- Modify: `lib/data.ts` (append `RENDER_PROMISE`)
- Create: `components/sections/RenderPromise.tsx`
- Modify: `app/page.tsx` (import, and mount between `<HomeServices />` and `<HomeContact />`)

**Interfaces:**
- Consumes: `ResolveWord` from Task 1, with the exact props listed there. `Reveal` from `@/components/ui/Reveal` (default export).
- Produces: `RENDER_PROMISE` in `lib/data.ts`, and `default export function RenderPromise()`.

- [ ] **Step 1: Add the copy to `lib/data.ts`**

Append to the end of `lib/data.ts`:

```ts
/**
 * The render-verb closer on the homepage. The trailing period lives inside each
 * word: a period placed after the slot would sit at the right edge of a box
 * sized for "customers." and float away from the shorter words.
 *
 * "customers." is both the longest entry and the resting one, which is what
 * makes the slot's resting width its natural width and its layout shift zero.
 * Reordering so it rests on a shorter word breaks that guarantee.
 */
export const RENDER_PROMISE = {
  lead: "We don't just render websites.",
  verb: 'We render',
  words: ['leads.', 'bookings.', 'customers.'],
  /** Seconds each non-final word holds once sharp. Decelerating. */
  holds: [0.55, 0.75],
} as const
```

- [ ] **Step 2: Create the section**

Create `components/sections/RenderPromise.tsx`:

```tsx
import Reveal from '@/components/ui/Reveal'
import ResolveWord from '@/components/ui/ResolveWord'
import { RENDER_PROMISE } from '@/lib/data'

/**
 * The closer. Sits after the demos, the price, the objections, and the service
 * list, so a visitor reaching it already knows what Render sells and the pun
 * pays off instead of stalling comprehension.
 *
 * Left-aligned on purpose. While the shorter words show, they sit in a slot
 * sized for "customers." and leave trailing space; centered, the line would
 * read off-center and then snap true.
 */
export default function RenderPromise() {
  return (
    <section className="border-t border-hairline bg-surface py-20 md:py-32">
      <div className="container-studio">
        <Reveal>
          <p className="max-w-3xl text-display-lg text-graphite">
            <span className="block">{RENDER_PROMISE.lead}</span>
            <span className="block">
              {RENDER_PROMISE.verb}{' '}
              <ResolveWord
                words={RENDER_PROMISE.words}
                holds={RENDER_PROMISE.holds}
                className="align-baseline text-accent-dark"
              />
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Mount it on the homepage**

In `app/page.tsx`, add the import alongside the other section imports:

```tsx
import RenderPromise from '@/components/sections/RenderPromise'
```

Then change the section list so `RenderPromise` sits between `HomeServices` and `HomeContact`:

```tsx
      <Hero />
      {/* Renders nothing until a real client testimonial exists. */}
      <Testimonials />
      <ProofStrip />
      <HomeWork />
      <WhyUs />
      <HomePricing />
      <Faq />
      <HomeServices />
      {/* The closer, after the demos, the price, and the objections. */}
      <RenderPromise />
      <HomeContact />
```

- [ ] **Step 4: Verify the server renders exactly one word**

This is the load-bearing check. Every word shares the class `col-start-1 row-start-1`, so counting that class in the SSR HTML counts the words the server emitted. It must be 1, not 3.

Start one dev server if none is running (`npm run dev`), then:

```bash
curl -s http://localhost:3000/ | grep -o 'col-start-1 row-start-1' | wc -l
```

Expected: `1`

```bash
curl -s http://localhost:3000/ | grep -c 'bookings\.'
```

Expected: `0`. The word `bookings.` must not appear anywhere in the server HTML. (Grep for `bookings.` rather than `leads`, because "leads" already appears in unrelated pricing copy on this page.)

```bash
curl -s http://localhost:3000/ | grep -o "We don't just render websites\."
```

Expected: one match. The finished sentence ships.

- [ ] **Step 5: Verify hydration, the stack, and the lock in a browser**

Open `http://localhost:3000/`, scroll the band into view, and confirm by eye that the word resolves `leads.` then `bookings.` then `customers.`, decelerating, and then stops.

Then confirm the DOM armed correctly. In the console:

```js
document.querySelectorAll('.col-start-1.row-start-1').length
// Expected: 3 (armed on the client)

document.querySelector('.sr-only ~ [aria-hidden]') !== null
// Expected: true

getComputedStyle(document.querySelector('.sr-only')).position
// Expected: "absolute"
```

Check the console for React hydration warnings. Expected: none. A warning here means the first client render diverged from the server, which means the arming guard is wrong.

Note: the `/api/v1/courses` 404s in the console are a Canvas LMS browser extension probing, not this site. Ignore them.

- [ ] **Step 6: Verify reduced motion**

In Chrome DevTools, open the command menu (Ctrl+Shift+P), run **Show Rendering**, and set **Emulate CSS media feature prefers-reduced-motion** to `reduce`. Reload.

Expected: `customers.` is sharp and visible on the first frame, no sequence runs, and the slot is never blank. In the console, `document.querySelectorAll('.col-start-1.row-start-1').length` returns `1`.

This is the exact case the render-time guard exists for. If the slot is blank, the guard was written into the arming effect only.

- [ ] **Step 7: Verify zero layout shift**

With reduced-motion emulation off, open the Performance panel, tick **Screenshots**, record a page load, scroll the band into view, and stop. Expected: the Layout Shift track shows no entry attributable to the band. The slot is sized for `customers.` from the first paint and never changes width.

- [ ] **Step 8: Verify the production build**

The dev server must be stopped first, or it will corrupt `.next` mid-build.

```bash
# Windows PowerShell: kill every next process for THIS repo only.
# Do not kill node processes belonging to other repos.
Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -match 'WebServiesRoot' -and $_.CommandLine -match 'next' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force }

Remove-Item -Recurse -Force .next
npm run build
```

Expected: build exits 0, and `/` is listed as a static route. No hydration or prerender errors.

- [ ] **Step 9: Commit**

```bash
git add lib/data.ts components/sections/RenderPromise.tsx app/page.tsx
git commit -m "Close the homepage on the verb the company is named for

The slot resolves leads -> bookings -> customers and locks, bookending
the h1's 'Brings You Customers'. Placed after the demos and the price
so the pun pays off rather than stalling a first-time visitor.

Left-aligned because the shorter words sit in a slot sized for the
longest one, and centering would make the line drift and snap."
```

---

## Self-Review

**Spec coverage.** Copy and the dropped `results` → Task 2 Step 1. Placement between `HomeServices` and `HomeContact` → Task 2 Step 3. `ResolveWord` props and motion timings → Task 1 Step 2. Server-renders-only-the-settled-word → Task 1 Step 2, verified Task 2 Step 4. `sr-only` accessible name → Task 1 Steps 1 and 2, verified Task 2 Step 5. Reduced motion, including the `useReducedMotion` two-pass trap → Task 1 Step 2, verified Task 2 Step 6. Grid stack and zero CLS → Task 1 Step 2, verified Task 2 Step 7. Period inside each word → Task 2 Step 1. Left alignment → Task 2 Step 2. Existing-tokens-only and no em dashes → Global Constraints. Build verification → Task 2 Step 8.

Not covered, deliberately: the spec's "Out of scope" section (the hero defects, reuse of the line elsewhere, `TESTIMONIALS`).

**Type consistency.** `ResolveWord` takes `words: readonly string[]` and `holds?: readonly number[]`. `RENDER_PROMISE` is declared `as const`, which makes both fields readonly tuples, so they are assignable. Had the props been typed `string[]` and `number[]`, Task 2 would not compile. `Reveal` and `ResolveWord` are both default exports and are imported as such. `cn` comes from `@/lib/utils`, matching `ResolveText.tsx`.

**Placeholder scan.** No TBDs. Every code step carries its full file content or the exact edited region, and every verification step states its expected output.
