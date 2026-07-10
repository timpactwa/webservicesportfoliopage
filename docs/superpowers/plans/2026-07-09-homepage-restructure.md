# Homepage Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder and rewrite the homepage into nine sections, move the booking form into a modal, and replace the hero's full-bleed triangle mosaic with subtle post-load corner accents.

**Architecture:** Copy moves to `lib/data.ts` first so every later task reads from one source. A dialog hook is extracted from the existing `DemoModal` and shared with a new `BookingModal`. `RequestCallForm` is split into a presentational component (props) and a URL-reading wrapper, because a modal has no search params to read. Sections are then rebuilt one at a time, and `app/page.tsx` is reordered last, once every section it names exists.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind, Framer Motion.

## Global Constraints

- **Spec:** `docs/superpowers/specs/2026-07-09-homepage-restructure-design.md`. Read it first.
- **Content source of truth is `lib/data.ts`.** Structured copy never lives inside a component.
- **No em dashes in shipped copy, with exactly one approved exception:** the pricing Custom row, `Custom — let's talk.` Task 1 amends `CLAUDE.md` to record it. Introduce no others.
- **No fabricated proof.** `TESTIMONIALS` stays empty. Demos stay labelled demo templates.
- **Existing Tailwind tokens only.** `accent`, `accent-dark`, `accent-soft`, `graphite`, `graphite-soft`, `graphite-light`, `surface`, `bg`, `hairline`, `display-xl`, `display-lg`, `rounded-card`, `container-studio`. Add no tokens.
- **`'use client'` only for Framer Motion, React state, or browser APIs.** `app/page.tsx` must stay a server component: it owns `metadata` and the `FAQPage` JSON-LD.
- **There is no test runner in this repo.** Every task ends with verification commands whose expected output is stated exactly. Treat a mismatch as a failing test.
- **Never run `npm run build` while `next dev` is running.** They share `.next`. Kill only this repo's `next` processes, never other repos'.
- **Do not fix the hero `h1` `opacity: 0` LCP defect or the ~1.5s CTA delay.** Out of scope, tracked in `docs/design-audit-2026-07.md`.

**Section order when this plan is done** (`app/page.tsx`):

```
Hero, Testimonials, ProofStrip, HomeWork, WhyUs,
HomePricing, HomeServices, LaunchTimeline, Faq, CtaBand
```

`Testimonials` renders `null` until `TESTIMONIALS` is non-empty, so nine sections are visible.

---

### Task 1: Copy and the em dash exception

**Files:**
- Modify: `lib/data.ts` (append new exports)
- Modify: `CLAUDE.md:45`

**Interfaces:**
- Produces: `DEMO_SECTION`, `PRICING_HEADLINE`, `PRICING_CUSTOM_LABEL`, `LAUNCH_TIMELINE_SECTION`, `CTA_BAND`, `CALL_STEPS`. Tasks 4 through 7 consume these.

- [ ] **Step 1: Append the new copy to `lib/data.ts`**

Append to the very end of the file:

```ts
/**
 * Homepage demo section. The offer deliberately says "in that style" and never
 * "replicate": site copy, images, and code are copyrightable, and a distinctive
 * design can support a trade-dress claim. A homepage that promises to reproduce
 * a URL a customer sends is a written commitment to do exactly that.
 */
export const DEMO_SECTION = {
  headline: 'Demo websites you can click.',
  intro: 'Sample sites we designed and built. Not real businesses, and not client work.',
  offer:
    "See a website template you like, here or on another site? Send us the link and we'll build you something in that style, with your brand and your content.",
}

/** Rendered as stacked lines, so pricing owns the tallest headline block on the page. */
export const PRICING_HEADLINE = ['No BS.', 'No hidden fees.'] as const

/** The one em dash approved for shipped copy. See CLAUDE.md. */
export const PRICING_CUSTOM_LABEL = "Custom — let's talk."

export const LAUNCH_TIMELINE_SECTION = {
  eyebrow: 'Your launch timeline',
  headline: 'From first call to live site.',
}

export const CTA_BAND = {
  headline: "Ready to see what we'd build?",
  body: 'Tell us what you need and a couple of times that work. We map out exactly what we would build, on a free call, with nothing to buy.',
}

/** What happens after someone submits the form. Shown beside it in the booking modal. */
export const CALL_STEPS = [
  'You send a couple of times that work for you.',
  'We confirm one by email, usually within a business day.',
  'On the call we map out exactly what we would build, and what it costs.',
]
```

- [ ] **Step 2: Amend the copy rule in `CLAUDE.md`**

Replace line 45 in full. Find:

```
**Copy rules:** no em dashes anywhere in shipped copy. No fabricated proof: `TESTIMONIALS` in `lib/data.ts` stays empty until a real client quote exists, and the three demo sites are always labeled as demo templates, not client work.
```

Replace with:

```
**Copy rules:** no em dashes in shipped copy. One approved exception, granted by Tim on 2026-07-09: the Custom row in the homepage pricing section (`PRICING_CUSTOM_LABEL` in `lib/data.ts`, rendering `Custom — let's talk.`). Any further exception needs Tim's sign-off. No fabricated proof: `TESTIMONIALS` in `lib/data.ts` stays empty until a real client quote exists, and the three demo sites are always labeled as demo templates, not client work.
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit 0.

```bash
grep -c '—' lib/data.ts
```

Expected: `1`. Exactly one em dash, in `PRICING_CUSTOM_LABEL`.

- [ ] **Step 4: Commit**

```bash
git add lib/data.ts CLAUDE.md
git commit -m "Add the homepage restructure copy, and scope the em dash ban

Tim approved one em dash, in the pricing Custom row. A flat 'no em
dashes anywhere' rule plus a counter-example in the tree is a
landmine: the next reader fixes the copy and breaks the design."
```

---

### Task 2: The dialog hook, the form split, and the booking modal

**Files:**
- Create: `components/ui/useDialog.ts`
- Create: `components/ui/BookingModal.tsx`
- Create: `components/ui/RequestCallFormFromUrl.tsx`
- Modify: `components/ui/DemoModal.tsx` (use the hook)
- Modify: `components/ui/RequestCallForm.tsx` (props, not search params)
- Modify: `components/ui/Button.tsx:11` (widen `onClick`)
- Modify: `components/sections/ContactForm.tsx:2,87` (use the URL wrapper)

**Interfaces:**
- Consumes: `CALL_STEPS` from Task 1.
- Produces:
  ```ts
  // components/ui/useDialog.ts
  export function useDialog(opts: {
    isOpen: boolean
    onClose: () => void
    initialFocusRef?: React.RefObject<HTMLElement | null>
  }): React.RefObject<HTMLDivElement>

  // components/ui/RequestCallForm.tsx
  export type CallIntent = 'mockup' | 'ai' | 'seo'
  export default function RequestCallForm(props: { tier?: string | null; intent?: CallIntent | null })

  // components/ui/BookingModal.tsx
  export default function BookingModal(props: {
    isOpen: boolean
    onClose: () => void
    tier?: string | null
    intent?: CallIntent | null
  })
  ```
  Tasks 3, 6, and 7 render `<BookingModal>` and pass `(event: React.MouseEvent) => void` to `Button`'s `onClick`.

- [ ] **Step 1: Create `components/ui/useDialog.ts`**

```ts
'use client'

import { useEffect, useRef } from 'react'

/**
 * Modal dialog plumbing, extracted from DemoModal so BookingModal cannot drift
 * from it: focus trap, Escape to close, body scroll lock, focus restore.
 *
 * `onClose` is held in a ref and the effect depends only on `isOpen`. Callers
 * pass inline arrows, and depending on `onClose` directly would tear down and
 * rebuild the trap on every parent render, stealing focus back to the opener
 * mid-interaction.
 */
export function useDialog({
  isOpen,
  onClose,
  initialFocusRef,
}: {
  isOpen: boolean
  onClose: () => void
  initialFocusRef?: React.RefObject<HTMLElement | null>
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  const initialFocusRefRef = useRef(initialFocusRef)
  initialFocusRefRef.current = initialFocusRef

  useEffect(() => {
    if (!isOpen) return

    previouslyFocusedRef.current = document.activeElement as HTMLElement
    initialFocusRefRef.current?.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = previousOverflow
      previouslyFocusedRef.current?.focus()
    }
  }, [isOpen])

  return dialogRef
}
```

Note the focusable selector gained `input`, `select`, and `textarea`. `DemoModal` contains none, so its behavior is unchanged; `BookingModal` contains a whole form and would otherwise trap focus onto two buttons.

- [ ] **Step 2: Rewrite `components/ui/DemoModal.tsx` to use the hook**

Replace the imports and the whole `useEffect` block. The file's top becomes:

```tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { useDialog } from './useDialog'

interface DemoModalProps {
  url: string
  title: string
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ url, title, isOpen, onClose }: DemoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useDialog({ isOpen, onClose, initialFocusRef: closeButtonRef })

  const displayUrl = url.replace(/^https?:\/\//, '')
```

Everything from `return (` down is unchanged. Delete the old `dialogRef`, `previouslyFocusedRef`, and `useEffect`.

- [ ] **Step 3: Turn `RequestCallForm` into a presentational component**

In `components/ui/RequestCallForm.tsx`, delete the `useSearchParams` import and its two calls, and take props instead. Change the top of the file from:

```tsx
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
```

to:

```tsx
import { useState } from 'react'
```

Then export the intent type and change the signature. Replace:

```tsx
export default function RequestCallForm() {
  const searchParams = useSearchParams()
  const tier = searchParams.get('tier')
  const intent = searchParams.get('intent')

  const [need, setNeed] = useState(() => initialNeed(intent, tier))
```

with:

```tsx
export type CallIntent = 'mockup' | 'ai' | 'seo'

interface RequestCallFormProps {
  /** Preselects "New website" and tags the submission. */
  tier?: string | null
  /** Preselects the matching "What do you need?" option. */
  intent?: CallIntent | null
}

/**
 * Presentational on purpose. It reads no search params, so BookingModal, which
 * has no URL to read, can render it directly and pass the same two values as
 * props. RequestCallFormFromUrl supplies them from the query string on /contact.
 */
export default function RequestCallForm({ tier = null, intent = null }: RequestCallFormProps) {
  const [need, setNeed] = useState(() => initialNeed(intent, tier))
```

Also widen `initialNeed`'s first parameter, since it now receives a `CallIntent | null` rather than `string | null`. Change:

```tsx
function initialNeed(intent: string | null, tier: string | null): string {
```

to:

```tsx
function initialNeed(intent: CallIntent | null, tier: string | null): string {
```

Nothing else in the file changes. `handleSubmit` already closes over `tier`.

- [ ] **Step 4: Create `components/ui/RequestCallFormFromUrl.tsx`**

```tsx
'use client'

import { useSearchParams } from 'next/navigation'
import RequestCallForm, { type CallIntent } from './RequestCallForm'

const INTENTS: readonly CallIntent[] = ['mockup', 'ai', 'seo']

function asIntent(value: string | null): CallIntent | null {
  return INTENTS.includes(value as CallIntent) ? (value as CallIntent) : null
}

/**
 * Supplies RequestCallForm's tier and intent from the query string. Split out so
 * that useSearchParams, which forces a Suspense boundary, stays out of the form
 * itself and out of the booking modal.
 */
export default function RequestCallFormFromUrl() {
  const searchParams = useSearchParams()
  return (
    <RequestCallForm tier={searchParams.get('tier')} intent={asIntent(searchParams.get('intent'))} />
  )
}
```

- [ ] **Step 5: Point `/contact` at the URL wrapper**

In `components/sections/ContactForm.tsx`, change line 2 from:

```tsx
import RequestCallForm from '@/components/ui/RequestCallForm'
```

to:

```tsx
import RequestCallFormFromUrl from '@/components/ui/RequestCallFormFromUrl'
```

and change the `<RequestCallForm />` inside the `<Suspense>` (line ~87) to:

```tsx
<RequestCallFormFromUrl />
```

Leave the `Suspense` and its fallback exactly as they are.

- [ ] **Step 6: Widen `Button`'s `onClick`**

In `components/ui/Button.tsx`, change line 11 from:

```tsx
  onClick?: () => void
```

to:

```tsx
  /** Receives the event so a link-styled CTA can preventDefault and open a modal instead. */
  onClick?: (event: React.MouseEvent) => void
```

No other change. A handler typed `(e: React.MouseEvent) => void` is assignable to both `MouseEventHandler<HTMLAnchorElement>` and `MouseEventHandler<HTMLButtonElement>`, because handler parameters are contravariant under `strictFunctionTypes` and `MouseEvent<HTMLAnchorElement>` is a subtype of `MouseEvent<Element>`.

- [ ] **Step 7: Create `components/ui/BookingModal.tsx`**

```tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import RequestCallForm, { type CallIntent } from './RequestCallForm'
import { useDialog } from './useDialog'
import { CALL_STEPS, GUARANTEE } from '@/lib/data'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  tier?: string | null
  intent?: CallIntent | null
}

/**
 * The homepage's booking surface. Every homepage CTA opens this rather than
 * navigating, so converting never costs the visitor their scroll position.
 * /contact renders the same form standalone for deep links and no-JS visitors.
 *
 * z-50, above MobileCtaBar's z-40, so the overlay covers the bar and the focus
 * trap already excludes it.
 */
export default function BookingModal({ isOpen, onClose, tier = null, intent = null }: BookingModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useDialog({ isOpen, onClose, initialFocusRef: closeButtonRef })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-graphite/70 p-4 backdrop-blur-sm md:p-8"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mx-auto my-auto w-full max-w-4xl rounded-card border border-hairline bg-bg p-6 shadow-card-hover md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow mb-3 text-xs text-accent-dark">Request a call</p>
                <h2 id="booking-modal-title" className="text-display-md text-graphite">
                  Tell us what you need.
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-graphite-soft transition-colors hover:bg-surface hover:text-graphite focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
              <div>
                <h3 className="eyebrow mb-5 text-xs text-accent-dark">How this works</h3>
                <ol className="space-y-4">
                  {CALL_STEPS.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 leading-relaxed text-graphite-soft">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 text-sm font-medium text-accent-dark">{GUARANTEE.short}</p>
              </div>

              <RequestCallForm tier={tier} intent={intent} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 8: Verify**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit 0. A `tsc` complaint that `RequestCallForm` is missing required props means Step 3 forgot the `= null` defaults.

With a dev server running:

```bash
curl -s "http://localhost:3000/contact?tier=Premium" | grep -c 'Request My Call'
```

Expected: `1`. The contact page still renders the form.

- [ ] **Step 9: Commit**

```bash
git add components/ui/useDialog.ts components/ui/BookingModal.tsx components/ui/RequestCallFormFromUrl.tsx components/ui/DemoModal.tsx components/ui/RequestCallForm.tsx components/ui/Button.tsx components/sections/ContactForm.tsx
git commit -m "Add a booking modal, and split the form from the URL it read

RequestCallForm called useSearchParams, so a modal had no way to
preselect a tier. It is now presentational and takes tier and intent
as props; RequestCallFormFromUrl supplies them on /contact.

DemoModal's focus trap moves into useDialog so the two modals cannot
drift. The hook holds onClose in a ref, so an inline arrow from a
caller no longer rebuilds the trap on every parent render."
```

---

### Task 3: Corner triangles, and the hero opens the modal

**Files:**
- Create: `components/ui/CornerTriangles.tsx`
- Modify: `components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `BookingModal` and the widened `Button.onClick` from Task 2.
- Produces: `default export function CornerTriangles()`, taking no props.

- [ ] **Step 1: Create `components/ui/CornerTriangles.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'

const ROWS = 3
const COLS = 3
/** Square viewBox. The rendered size is set in CSS, so this is unitless. */
const VB = 120

const CORNERS = [
  { id: 'tl', position: 'left-0 top-0', transform: 'none' },
  { id: 'tr', position: 'right-0 top-0', transform: 'scaleX(-1)' },
  { id: 'bl', position: 'left-0 bottom-0', transform: 'scaleY(-1)' },
  { id: 'br', position: 'right-0 bottom-0', transform: 'scale(-1, -1)' },
] as const

const FILLS = ['oklch(var(--accent))', 'oklch(var(--accent-dark))', 'oklch(var(--graphite))']

/** One mesh, computed once at module load: rows x cols cells, two triangles each. */
const MESH = (() => {
  const cw = VB / COLS
  const ch = VB / ROWS
  const out: { points: string; delay: number; fill: string }[] = []

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x0 = c * cw
      const y0 = r * ch
      const x1 = x0 + cw
      const y1 = y0 + ch
      const cells: [number, number][][] = [
        [[x0, y0], [x1, y0], [x0, y1]],
        [[x1, y0], [x1, y1], [x0, y1]],
      ]
      cells.forEach((points, i) => {
        // Distance from the corner drives the stagger, so each cluster assembles
        // outward from its own corner rather than all at once.
        const d = (r + c) / (ROWS + COLS)
        out.push({
          points: points.map((p) => p.join(',')).join(' '),
          delay: d * 500,
          fill: FILLS[(r + c + i) % FILLS.length],
        })
      })
    }
  }
  return out
})()

/**
 * Four subtle triangle clusters, one per hero corner. Replaces the full-bleed
 * TriangleReveal mosaic, which was 252 animated polygons plus a canvas sampling
 * pass, running while the h1 was still resolving in.
 *
 * Renders nothing until the window load event, so decoration is never on the
 * critical path. Client-only by construction, which is also why the mesh needs no
 * hydration-stable randomness: there is no server render to match.
 */
export default function CornerTriangles() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // load may already have fired by the time this effect runs.
    if (document.readyState === 'complete') {
      setReady(true)
      return
    }
    const onLoad = () => setReady(true)
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  if (!ready) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes cornerTriIn {
          from { opacity: 0; transform: translateY(4px) scale(0.82); }
          to   { opacity: 1; transform: none; }
        }
        .corner-tri {
          transform-box: fill-box;
          transform-origin: center;
          animation: cornerTriIn 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .corner-tri { animation: none; }
        }
      `}</style>

      {CORNERS.map((corner) => (
        <div
          key={corner.id}
          className={`absolute ${corner.position}`}
          style={{
            width: 'clamp(120px, 18vw, 260px)',
            height: 'clamp(120px, 18vw, 260px)',
            opacity: 0.12,
            transform: corner.transform,
            WebkitMaskImage: 'linear-gradient(to bottom right, #000, transparent 78%)',
            maskImage: 'linear-gradient(to bottom right, #000, transparent 78%)',
          }}
        >
          <svg viewBox={`0 0 ${VB} ${VB}`} preserveAspectRatio="none" className="h-full w-full">
            {MESH.map((tri, i) => (
              <polygon
                key={i}
                className="corner-tri"
                points={tri.points}
                fill={tri.fill}
                style={{ animationDelay: `${tri.delay}ms` }}
              />
            ))}
          </svg>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Swap the hero's mosaic for the corner clusters**

In `components/sections/Hero.tsx`, change the import on line 7 from:

```tsx
import TriangleReveal from '@/components/ui/TriangleReveal'
```

to:

```tsx
import CornerTriangles from '@/components/ui/CornerTriangles'
```

Then replace this whole block:

```tsx
      {/* Signature render-in mosaic, subtle behind the copy — edges masked so the
          center stays clean and text-readable. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, black 85%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, black 85%)',
        }}
      >
        <TriangleReveal tone="a" rows={9} cols={14} label="" />
      </div>
```

with:

```tsx
      {/* Subtle corner accents, mounted after window load so they are never on
          the critical path and never animate while the h1 is still resolving. */}
      <CornerTriangles />
```

`TriangleReveal.tsx` is not deleted. It is the right tool for real photography, and `.design-sync` references it.

- [ ] **Step 3: Wire the hero CTAs to the modal**

Still in `Hero.tsx`. Add to the imports:

```tsx
import { useState } from 'react'
import BookingModal from '@/components/ui/BookingModal'
import type { CallIntent } from '@/components/ui/RequestCallForm'
```

`useState` joins the existing `import { useEffect, useRef } from 'react'`, making it `import { useEffect, useRef, useState } from 'react'`.

Inside the component, above the `resolve` helper, add:

```tsx
  const [booking, setBooking] = useState<{ intent: CallIntent | null } | null>(null)

  // Every CTA stays a real link to /contact. Left-clicking opens the modal
  // instead; Ctrl, Cmd, and Shift clicks fall through to the browser so a new
  // tab still works, and a visitor without JS still gets the contact page.
  const openBooking = (intent: CallIntent | null) => (event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setBooking({ intent })
  }
```

Change the CTA block from:

```tsx
      <motion.div {...resolve(1.4)} className="relative mt-9 flex flex-col gap-4 sm:flex-row">
        <Button variant="primary" size="lg" href="/contact">
          Request a Call
        </Button>
        <Button
          variant="secondary"
          size="lg"
          href="/contact?intent=mockup"
          onClick={() => track('mockup_request', { source: 'hero' })}
        >
          Get a Free Mockup
        </Button>
      </motion.div>
```

to:

```tsx
      <motion.div {...resolve(1.4)} className="relative mt-9 flex flex-col gap-4 sm:flex-row">
        <Button variant="primary" size="lg" href="/contact" onClick={openBooking(null)}>
          Request a Call
        </Button>
        <Button
          variant="secondary"
          size="lg"
          href="/contact?intent=mockup"
          onClick={(event) => {
            track('mockup_request', { source: 'hero' })
            openBooking('mockup')(event)
          }}
        >
          Get a Free Mockup
        </Button>
      </motion.div>
```

Finally, wrap the returned `<section>` in a fragment and render the modal after it:

```tsx
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-center md:pt-40">
        {/* ...unchanged... */}
      </section>

      <BookingModal
        isOpen={booking !== null}
        onClose={() => setBooking(null)}
        intent={booking?.intent ?? null}
      />
    </>
  )
```

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit 0.

```bash
curl -s http://localhost:3000/ | grep -c 'TriangleReveal\|click to replay'
```

Expected: `0`. The old mosaic is gone from the hero.

```bash
curl -s http://localhost:3000/ | grep -o 'corner-tri' | wc -l
```

Expected: `0`. `CornerTriangles` renders `null` on the server, by design.

In a browser at `http://localhost:3000/`, after the page settles:

```js
document.querySelectorAll('.corner-tri').length
// Expected: 72   (4 corners x 3 x 3 cells x 2 triangles)

document.querySelector('[aria-hidden] .corner-tri') !== null
// Expected: true
```

Click "Request a Call". Expected: the modal opens, the page does not navigate, focus lands on the close button, Escape closes it and returns focus to the button. Ctrl+click the same CTA: expected to open `/contact` in a new tab.

- [ ] **Step 5: Commit**

```bash
git add components/ui/CornerTriangles.tsx components/sections/Hero.tsx
git commit -m "Move the hero's triangles to the corners, after load

252 animated polygons plus a canvas sampling pass ran while the h1 was
still resolving in. Four corner clusters, 72 polygons, mounted on the
window load event, at 0.12 opacity, with no gloss sweep.

The hero CTAs now open the booking modal. They stay anchors to
/contact, so no-JS visitors, Ctrl+click, and Googlebot all still get
the page."
```

---

### Task 4: The demos headline, and the FAQ headline

**Files:**
- Modify: `components/sections/HomeWork.tsx:27-33`
- Modify: `components/sections/Faq.tsx:31-34`

**Interfaces:**
- Consumes: `DEMO_SECTION` from Task 1.

- [ ] **Step 1: Rewrite the demos section header**

In `components/sections/HomeWork.tsx`, change the import on line 6 from:

```tsx
import { DEMO_DISCLAIMER, PROJECTS, type Project } from '@/lib/data'
```

to:

```tsx
import { DEMO_DISCLAIMER, DEMO_SECTION, PROJECTS, type Project } from '@/lib/data'
```

Then replace the header block:

```tsx
          <Reveal className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent-dark">Our work</p>
            <h2 className="text-display-xl text-graphite">Real sites, invented brands.</h2>
            <p className="mt-5 text-lg text-graphite-soft leading-relaxed">
              {DEMO_DISCLAIMER.short}
            </p>
          </Reveal>
```

with:

```tsx
          <Reveal className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent-dark">Our work</p>
            <h2 className="text-display-xl text-graphite">{DEMO_SECTION.headline}</h2>
            <p className="mt-5 text-lg leading-relaxed text-graphite-soft">{DEMO_SECTION.intro}</p>
            <p className="mt-4 text-lg leading-relaxed text-graphite">{DEMO_SECTION.offer}</p>
          </Reveal>
```

`DEMO_DISCLAIMER` stays imported: `DEMO_DISCLAIMER.badge` still labels every card.

- [ ] **Step 2: Bare the FAQ headline**

In `components/sections/Faq.tsx`, replace:

```tsx
        <Reveal className="mb-12 md:mb-14">
          <p className="eyebrow mb-4 text-xs text-accent-dark">FAQ</p>
          <h2 className="text-display-xl text-graphite">Questions, answered.</h2>
        </Reveal>
```

with:

```tsx
        {/* No eyebrow. It read "FAQ" directly above a headline reading "FAQ". */}
        <Reveal className="mb-12 md:mb-14">
          <h2 className="text-display-xl text-graphite">FAQ</h2>
        </Reveal>
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npm run lint
curl -s http://localhost:3000/ | grep -c 'Real sites, invented brands\|Questions, answered'
```

Expected: `tsc` and `lint` exit 0; the grep prints `0`.

```bash
curl -s http://localhost:3000/ | grep -c 'Demo websites you can click'
```

Expected: at least `1`.

- [ ] **Step 4: Commit**

```bash
git add components/sections/HomeWork.tsx components/sections/Faq.tsx
git commit -m "Rename the demos section, and let FAQ just say FAQ

The demos headline now leads with 'demo', which is the honesty rule the
badge was carrying alone, and the intro invites a visitor to send a
link. It promises a build 'in that style' rather than a replication:
copy, images, and code are copyrightable.

The FAQ eyebrow said FAQ directly above a headline that said
'Questions, answered.'"
```

---

### Task 5: Rebuild WhyUs around the animation and NOT_A_FIT

**Files:**
- Rewrite: `components/sections/WhyUs.tsx`
- Delete: `components/sections/RenderPromise.tsx`
- Modify: `app/page.tsx` (drop the `RenderPromise` import and mount)

**Interfaces:**
- Consumes: `ResolveWord` and `RENDER_PROMISE`, both already in the tree.
- Note: `DIFFERENTIATORS` stops being imported here. It stays exported from `lib/data.ts`.

- [ ] **Step 1: Rewrite `components/sections/WhyUs.tsx`**

```tsx
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import ResolveWord from '@/components/ui/ResolveWord'
import { NOT_A_FIT, RENDER_PROMISE, RISK_REVERSAL, TEAM_MEMBERS } from '@/lib/data'

const ArrowRight = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const founderNames = TEAM_MEMBERS.map((member) => member.name).join(' and ')

/**
 * The argument, after the evidence and before the price. It opens on the verb the
 * company is named for and closes on the guarantee, so risk comes off the table
 * before the number goes on it in HomePricing directly below.
 *
 * The spine is NOT_A_FIT, promoted out of the bottom of the pricing section.
 * Naming who Render is wrong for is the one claim here a competitor will not
 * copy. The three DIFFERENTIATORS that used to fill this space restated
 * ProofStrip without its links, and nothing in them could be falsified.
 *
 * The animated h2 is safe to index: ResolveWord server-renders only the settled
 * word, so the heading is deterministically "We don't just render websites. We
 * render customers."
 */
export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-24 bg-graphite-light py-20 text-white md:py-32">
      <div className="container-studio">
        <Reveal className="mb-16 max-w-4xl">
          <p className="eyebrow mb-4 text-xs text-accent-soft">Why Render</p>
          <h2 className="text-display-xl text-white">
            <span className="block">{RENDER_PROMISE.lead}</span>
            <span className="block">
              {RENDER_PROMISE.verb}{' '}
              <ResolveWord
                words={RENDER_PROMISE.words}
                holds={RENDER_PROMISE.holds}
                className="align-baseline text-accent-soft"
              />
            </span>
          </h2>
        </Reveal>

        {/* A cheap price with no stated trade-off invites the buyer to guess what was
            cut. Naming who Render is wrong for is what turns the number into a choice. */}
        <Reveal delay={0.1} className="border-t border-white/15 pt-10">
          <h3 className="font-display text-xl font-semibold text-white">{NOT_A_FIT.headline}</h3>
          <p className="mt-2 max-w-2xl text-white/70">{NOT_A_FIT.intro}</p>

          <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {NOT_A_FIT.cases.map((item) => (
              <div key={item.title}>
                <dt className="font-semibold text-white">{item.title}</dt>
                <dd className="mt-2 leading-relaxed text-white/70">{item.body}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-3xl font-medium leading-relaxed text-white">
            {NOT_A_FIT.closing}
          </p>
        </Reveal>

        {/* The last thing read before the pricing section. */}
        <Reveal delay={0.15}>
          <div className="mt-16 rounded-card border border-white/15 bg-white/[0.04] p-8 md:p-12">
            <p className="eyebrow mb-5 text-xs text-accent-soft">Before you commit</p>
            <p className="font-display max-w-3xl text-[26px] font-semibold leading-[1.35] tracking-[-0.02em] text-white md:text-[30px]">
              {RISK_REVERSAL.headline}
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-white/70">{RISK_REVERSAL.supporting}</p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-col items-start gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-white/70">
              <Link
                href="/about"
                className="group inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                Meet the founders, {founderNames}
                <ArrowRight />
              </Link>
            </p>
            <Button variant="secondary-inverse" href="/contact" size="lg">
              Request a Call
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

Note the founders-row CTA changed from `variant="primary"` to `variant="secondary-inverse"`. This band is dark, and the section already carries the guarantee; a second solid accent button here competes with the pricing CTAs one screen below. This button keeps navigating to `/contact` rather than opening the modal, because `WhyUs` is a server component and the CTA directly beneath it, in pricing, is the one that should convert.

- [ ] **Step 2: Delete `RenderPromise` and unmount it**

```bash
git rm components/sections/RenderPromise.tsx
```

In `app/page.tsx`, delete the import line:

```tsx
import RenderPromise from '@/components/sections/RenderPromise'
```

and delete these two lines from the JSX:

```tsx
      {/* The closer, after the demos, the price, and the objections. */}
      <RenderPromise />
```

Leave the rest of `app/page.tsx` alone. Task 7 reorders it.

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both exit 0. A "Cannot find module RenderPromise" error means Step 2's `app/page.tsx` edit was missed.

```bash
curl -s http://localhost:3000/ | grep -c 'A website that works as hard as you do'
```

Expected: `0`.

```bash
curl -s http://localhost:3000/ | grep -c 'When Render is not the right choice'
```

Expected: `1`. It moved; it did not duplicate. (It still renders once, now inside `WhyUs`. Pricing still holds a copy until Task 6 removes it, so if this prints `2`, that is expected at this point and Task 6 fixes it. Print `0` and something is wrong.)

In a browser, scroll `WhyUs` into view. Expected: the headline resolves `leads.`, `bookings.`, `customers.`, decelerating, then locks, in `accent-soft` against the dark band.

- [ ] **Step 4: Commit**

```bash
git add components/sections/WhyUs.tsx app/page.tsx
git commit -m "Rebuild WhyUs on the render verb and on who we are wrong for

The old headline was a line any competitor could run, and the three
differentiators restated ProofStrip two sections later, without its
links and without anything a skeptic could check.

NOT_A_FIT comes up from the bottom of the pricing section to be the
spine of the argument. The render-verb animation becomes the headline,
which is safe to index because ResolveWord server-renders only the
settled word. RenderPromise is absorbed and deleted."
```

---

### Task 6: Rebuild the pricing section

**Files:**
- Rewrite: `components/sections/HomePricing.tsx`

**Interfaces:**
- Consumes: `PRICING_HEADLINE`, `PRICING_CUSTOM_LABEL` (Task 1), `BookingModal` and `Button`'s widened `onClick` (Task 2).
- Note: `NOT_A_FIT` stops being imported here. It now lives in `WhyUs`.

- [ ] **Step 1: Rewrite `components/sections/HomePricing.tsx`**

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FOUNDING_CLIENT_NOTE,
  GUARANTEE,
  PRICING_CUSTOM_LABEL,
  PRICING_HEADLINE,
  PRICING_TIERS,
  type PricingTier,
} from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import BookingModal from '@/components/ui/BookingModal'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'

/** Custom has no price and was only ever padding a fourth column. */
const mainTiers = PRICING_TIERS.filter((tier) => tier.tier !== 'Custom')
const customTier = PRICING_TIERS.find((tier) => tier.tier === 'Custom')

/** Four is what fits without the card growing taller than the grid's tallest sibling. */
const FEATURES_SHOWN = 4

export default function HomePricing() {
  const [bookingTier, setBookingTier] = useState<string | null>(null)

  // Every CTA stays a real link to /contact?tier=... A left click opens the modal;
  // modified clicks fall through, and a no-JS visitor still reaches the form.
  const openBooking = (tier: string) => (event: React.MouseEvent) => {
    track('tier_cta_click', { tier })
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setBookingTier(tier)
  }

  return (
    <>
      <section id="pricing" className="scroll-mt-24 bg-bg py-20 md:py-32">
        <div className="container-studio">
          {/* Two stacked lines at display-xl is a taller block than the hero's
              display-2xl, so pricing dominates without a new token. */}
          <Reveal className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent-dark">Pricing</p>
            <h2 className="text-display-xl text-graphite">
              {PRICING_HEADLINE.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {mainTiers.map((tier, index) => (
              <TierCard key={tier.tier} tier={tier} index={index} onBook={openBooking(tier.tier)} />
            ))}
          </div>

          {customTier && (
            <Reveal delay={0.1} className="mt-6">
              <div className="flex flex-col items-start gap-5 rounded-card border border-hairline bg-surface px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <div>
                  <p className="font-display text-lg font-semibold text-graphite">
                    {PRICING_CUSTOM_LABEL}
                  </p>
                  <p className="mt-1.5 max-w-2xl text-graphite-soft">{customTier.summary}</p>
                </div>
                <Button
                  href={customTier.ctaHref}
                  onClick={openBooking(customTier.tier)}
                  variant="secondary"
                  size="md"
                  className="flex-shrink-0"
                >
                  {customTier.ctaLabel}
                </Button>
              </div>
            </Reveal>
          )}

          {/* The guarantee is what makes a stranger comfortable with the numbers directly
              above it, so it gets read at a real size instead of whispering at 11px. */}
          <Reveal delay={0.15} className="mt-10">
            <div className="rounded-card border border-accent/25 bg-accent/5 px-6 py-5 text-center">
              <p className="text-base font-semibold text-graphite">{GUARANTEE.long}</p>
              {FOUNDING_CLIENT_NOTE && (
                <p className="mt-2 text-sm text-graphite-soft">{FOUNDING_CLIENT_NOTE}</p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-6">
            <Link
              href="/services/web-design#pricing"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2"
            >
              What&apos;s included in each tier <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <BookingModal
        isOpen={bookingTier !== null}
        onClose={() => setBookingTier(null)}
        tier={bookingTier}
      />
    </>
  )
}

function TierCard({
  tier,
  index,
  onBook,
}: {
  tier: PricingTier
  index: number
  onBook: (event: React.MouseEvent) => void
}) {
  return (
    <Reveal index={index} className="h-full">
      <div
        className={cn(
          'relative flex h-full flex-col rounded-card border p-6 md:p-7',
          tier.isHighlighted
            ? 'border-accent/40 bg-accent-soft shadow-card'
            : 'border-hairline bg-surface'
        )}
      >
        {tier.badge && (
          <span className="eyebrow absolute right-5 top-5 rounded-full bg-accent-dark px-2.5 py-1 text-[9px] text-white">
            {tier.badge}
          </span>
        )}

        <p className="font-display text-sm font-semibold text-graphite">{tier.tier}</p>

        {tier.standardPrice && (
          <s className="mt-3 block text-sm font-medium text-graphite-soft/70">
            <span className="sr-only">Regular price </span>
            {tier.standardPrice}
          </s>
        )}
        <p className="font-display mt-1 text-[40px] font-semibold leading-none text-graphite">
          {tier.standardPrice && <span className="sr-only">Founding client price </span>}
          {tier.priceRange}
        </p>
        <p className="mt-2 text-sm text-graphite-soft">
          then {tier.monthlyRange}
          <span className="sr-only"> for the optional Care Plan</span>
        </p>

        <p className="mt-5 leading-relaxed text-graphite-soft">{tier.summary}</p>

        <ul className="mt-6 space-y-2.5">
          {tier.features.slice(0, FEATURES_SHOWN).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[15px] text-graphite">
              <svg
                aria-hidden="true"
                className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-accent-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* mt-auto pins every CTA to the same baseline regardless of feature count. */}
        <div className="mt-auto pt-7">
          <Button
            href={tier.ctaHref}
            onClick={onBook}
            variant={tier.isHighlighted ? 'primary' : 'secondary'}
            size="md"
            fullWidth
          >
            {tier.ctaLabel}
          </Button>
        </div>
      </div>
    </Reveal>
  )
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both exit 0.

```bash
curl -s http://localhost:3000/ | grep -c 'Fixed prices, published here'
```

Expected: `0`.

```bash
curl -s http://localhost:3000/ | grep -c 'When Render is not the right choice'
```

Expected: `1`. It now lives only in `WhyUs`.

```bash
curl -s http://localhost:3000/ | grep -o 'No BS\.' | wc -l
```

Expected: `1`.

```bash
curl -s http://localhost:3000/ | grep -o 'Book a Call About' | wc -l
```

Expected: `3`. Starter, Standard, Premium. Custom uses `Scope My Project`.

In a browser: click "Book a Call About Standard". Expected: the modal opens with "What do you need?" preselected to `New website`, and the URL does not change. Ctrl+click it: `/contact?tier=Standard` opens in a new tab.

- [ ] **Step 3: Commit**

```bash
git add components/sections/HomePricing.tsx
git commit -m "Give the pricing tiers room to describe themselves

Each tier was a 3.5px-padded cell holding a 19px price and exactly one
truncated feature. Three real cards now carry four features each, the
struck standard price, and the monthly. Custom drops to a row: it has
no price and was padding a fourth column.

The headline stacks on two lines, which is a taller block than the
hero's, so pricing dominates the page without a new type token. The
tier CTAs open the booking modal and stay links to /contact."
```

---

### Task 7: The new bands, the deletions, and the final order

**Files:**
- Create: `components/sections/LaunchTimeline.tsx`
- Create: `components/sections/CtaBand.tsx`
- Delete: `components/sections/HomeContact.tsx`
- Modify: `components/layout/MobileCtaBar.tsx`
- Rewrite: `app/page.tsx` (final order)

**Interfaces:**
- Consumes: `LAUNCH_TIMELINE_SECTION`, `CTA_BAND` (Task 1); `BookingModal` (Task 2).

- [ ] **Step 1: Create `components/sections/LaunchTimeline.tsx`**

```tsx
import Reveal from '@/components/ui/Reveal'
import { LAUNCH_TIMELINE, LAUNCH_TIMELINE_SECTION } from '@/lib/data'

/**
 * "How long does this take" is a real objection, and a dated schedule is concrete
 * rather than boastful. Lived inside HomeContact, which is gone; it earns a band.
 */
export default function LaunchTimeline() {
  return (
    <section className="border-t border-hairline bg-surface py-20 md:py-28">
      <div className="container-studio">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4 text-xs text-accent-dark">{LAUNCH_TIMELINE_SECTION.eyebrow}</p>
          <h2 className="text-display-xl text-graphite">{LAUNCH_TIMELINE_SECTION.headline}</h2>
        </Reveal>

        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-4">
          {LAUNCH_TIMELINE.map((step, index) => (
            <Reveal as="li" key={step.week} index={index} className="border-t border-hairline pt-6">
              <span
                aria-hidden="true"
                className="mb-4 flex h-2.5 w-2.5 rounded-full bg-accent"
              />
              <p className="eyebrow text-[11px] text-accent-dark">{step.week}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-graphite">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-graphite-soft">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/sections/CtaBand.tsx`**

```tsx
'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import BookingModal from '@/components/ui/BookingModal'
import type { CallIntent } from '@/components/ui/RequestCallForm'
import { CTA_BAND, GUARANTEE } from '@/lib/data'
import { track } from '@/lib/analytics'

/**
 * Replaces the old HomeContact section. The form itself now lives in a modal, so
 * converting never costs the visitor their scroll position, and /contact stays a
 * real page for deep links, ads, and no-JS visitors.
 *
 * id="contact" keeps NAV_LINKS' "/#contact" and the page's anchor working.
 * data-cta-takeover is what MobileCtaBar watches to hide itself; it is a named
 * contract rather than a hardcoded id.
 */
export default function CtaBand() {
  const [booking, setBooking] = useState<{ intent: CallIntent | null } | null>(null)

  const openBooking = (intent: CallIntent | null) => (event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setBooking({ intent })
  }

  return (
    <>
      <section
        id="contact"
        data-cta-takeover
        className="scroll-mt-24 border-t border-hairline bg-bg py-20 pb-28 md:py-32 md:pb-32"
      >
        <div className="container-studio">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent-dark">Contact</p>
            <h2 className="text-display-xl text-graphite">{CTA_BAND.headline}</h2>
            <p className="mt-5 text-lg leading-relaxed text-graphite-soft">{CTA_BAND.body}</p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button variant="primary" size="lg" href="/contact" onClick={openBooking(null)}>
                Request a Call
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/contact?intent=mockup"
                onClick={(event) => {
                  track('mockup_request', { source: 'cta-band' })
                  openBooking('mockup')(event)
                }}
              >
                Get a Free Mockup
              </Button>
            </div>

            <p className="mt-8 text-sm font-medium text-accent-dark">{GUARANTEE.short}</p>
          </Reveal>
        </div>
      </section>

      <BookingModal
        isOpen={booking !== null}
        onClose={() => setBooking(null)}
        intent={booking?.intent ?? null}
      />
    </>
  )
}
```

- [ ] **Step 3: Delete `HomeContact`**

```bash
git rm components/sections/HomeContact.tsx
```

Its email link, its guarantee line, its call steps, and its launch timeline all survive: the steps are `CALL_STEPS` in the modal, the timeline is `LaunchTimeline`, and `/contact` renders its own copy of the rest via `ContactForm`.

- [ ] **Step 4: Decouple `MobileCtaBar` from the deleted id**

In `components/layout/MobileCtaBar.tsx`, replace the doc comment and the effect. Change:

```tsx
/**
 * Persistent mobile conversion path. Most local-search traffic is mobile, and the
 * only other mobile CTA lives inside the hamburger menu. Hidden on /contact, where
 * the form itself is already the call to action, and hidden on the homepage once
 * the #contact section is substantially in view (its CTAs take over there).
 */
export default function MobileCtaBar() {
  const pathname = usePathname()
  const [contactInView, setContactInView] = useState(false)

  useEffect(() => {
    // Only the homepage carries the #contact section this bar defers to.
    if (pathname !== '/') {
      setContactInView(false)
      return
    }
    const el = document.getElementById('contact')
    if (!el) return
```

to:

```tsx
/**
 * Persistent mobile conversion path. Most local-search traffic is mobile, and the
 * only other mobile CTA lives inside the hamburger menu. Hidden on /contact, where
 * the form itself is already the call to action, and hidden over any section that
 * declares [data-cta-takeover], whose own CTAs take over there.
 *
 * The old lookup was getElementById('contact'), which coupled this bar to a
 * section id that has since been deleted. Any page may now opt in.
 */
export default function MobileCtaBar() {
  const pathname = usePathname()
  const [contactInView, setContactInView] = useState(false)

  useEffect(() => {
    setContactInView(false)
    const el = document.querySelector('[data-cta-takeover]')
    if (!el) return
```

Leave everything below (`const observer = ...` through the `return`) unchanged, including the `[pathname]` dependency array, which is what re-runs the query after a client-side navigation, and the component-level `if (pathname === '/contact') return null`.

- [ ] **Step 5: Rewrite `app/page.tsx` into the final order**

```tsx
import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import ProofStrip from '@/components/sections/ProofStrip'
import HomeWork from '@/components/sections/HomeWork'
import WhyUs from '@/components/sections/WhyUs'
import HomePricing from '@/components/sections/HomePricing'
import HomeServices from '@/components/sections/HomeServices'
import LaunchTimeline from '@/components/sections/LaunchTimeline'
import Faq, { featuredFaqItems } from '@/components/sections/Faq'
import CtaBand from '@/components/sections/CtaBand'

export const metadata: Metadata = {
  title: {
    absolute: 'Render | Web Design & AI Consulting, Morris County, NJ',
  },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Render | Web Design & AI Consulting, Morris County, NJ',
    description:
      'Fixed, published prices. Live demo sites you can click right now. Built by two founders in Morris County, NJ.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: featuredFaqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape < so a "</script>" sequence in the data can never close the tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      {/*
        Ranked: evidence, then argument, then price. A stranger with no reason to
        trust us meets the clickable demos before any claim, and the guarantee
        before any number. WhyUs closes on the risk reversal and HomePricing
        follows it immediately; that adjacency is load bearing. #services sits
        after the price because "what exactly do you sell" is the last question a
        convinced visitor asks, not the first, and the launch timeline answers
        "how long" once they want it.
      */}
      <Hero />
      {/* Renders nothing until a real client testimonial exists. */}
      <Testimonials />
      <ProofStrip />
      <HomeWork />
      <WhyUs />
      <HomePricing />
      <HomeServices />
      <LaunchTimeline />
      <Faq />
      <CtaBand />
    </>
  )
}
```

- [ ] **Step 6: Verify the page**

```bash
npx tsc --noEmit && npm run lint
```

Expected: both exit 0.

```bash
curl -s http://localhost:3000/ -o /tmp/home.html
grep -o 'id="contact"' /tmp/home.html | wc -l
```

Expected: `1`.

```bash
grep -o 'data-cta-takeover' /tmp/home.html | wc -l
```

Expected: `1`.

Confirm the old copy is gone and the new copy is present:

```bash
grep -c 'Real sites, invented brands\|Questions, answered\|Fixed prices, published here\|A website that works as hard as you do' /tmp/home.html
```

Expected: `0`.

```bash
grep -c 'Demo websites you can click' /tmp/home.html
grep -c 'From first call to live site' /tmp/home.html
grep -c "Ready to see what we'd build" /tmp/home.html
```

Expected: `1`, `1`, `1` (the last may be HTML-escaped as `we&#x27;d`; grep for that form if the plain one prints `0`).

Confirm the render-verb slot still ships one settled word. Do not grep the raw HTML: Next serializes the client component's props into the RSC flight payload, and `HomeServices` copy independently contains "customers."

```bash
node -e '
const html = require("fs").readFileSync("/tmp/home.html","utf8");
const noScript = html.replace(/<script[\s\S]*?<\/script>/g, "");
const start = noScript.indexOf("id=\"why\"");
const band = noScript.slice(start, noScript.indexOf("</section>", start));
const c = (s) => (band.match(new RegExp(s.replace(/\./g,"\\."),"g")) || []).length;
console.log("leads.", c("leads."), "bookings.", c("bookings."), "customers.", c("customers."),
            "cells", (band.match(/col-start-1 row-start-1/g)||[]).length);
'
```

Expected: `leads. 0 bookings. 0 customers. 1 cells 1`

- [ ] **Step 7: Verify in a browser**

At `http://localhost:3000/`:

1. Nine visible sections, in the order in Global Constraints.
2. Console has no React hydration warning. An `Extra attributes from the server: fdprocessedid` error on a `DemoCard` is a form-filler browser extension, not this site. Ignore it.
3. Narrow the viewport below `768px`. Scroll to the bottom. The mobile CTA bar disappears when the CTA band is ~20% in view.
4. Click the navbar's "Contact". It scrolls to the CTA band.
5. Click "Request a Call" in the CTA band. The modal opens over the mobile bar, focus lands on the close button, Tab cycles inside the form, Escape closes and restores focus.
6. In DevTools, disable JavaScript and reload. Every hero and pricing CTA is a link to `/contact` with the right query param. The corner triangles are absent, which is correct.
7. Re-enable JS. Emulate `prefers-reduced-motion: reduce`. The corner triangles are present and static; the `WhyUs` headline shows `customers.` sharp on the first frame.
8. Performance panel: no layout shift attributable to the hero or the pricing grid.

- [ ] **Step 8: Verify the production build**

The dev server must be stopped first, or it will corrupt `.next` mid-build.

```bash
# Windows PowerShell: kill every next process for THIS repo only.
Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -match 'WebServiesRoot' -and $_.CommandLine -match 'next' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force }

Remove-Item -Recurse -Force .next
npm run build
```

Expected: exits 0, `/` is listed as `○ (Static)`, no prerender or hydration errors.

Then check the em dash budget across everything this plan shipped:

```bash
git diff --stat HEAD~6
git diff HEAD~6 -- lib/data.ts components/ app/ | grep -c '^+.*—'
```

Expected: `1`. The only added em dash is `PRICING_CUSTOM_LABEL`.

- [ ] **Step 9: Commit**

```bash
git add components/sections/LaunchTimeline.tsx components/sections/CtaBand.tsx components/layout/MobileCtaBar.tsx app/page.tsx
git commit -m "Rank the homepage, and close it on a CTA band

Order is evidence, then argument, then price: demos before claims, the
guarantee before the number. The launch timeline comes up out of the
deleted HomeContact and answers 'how long' on its own band.

HomeContact's form moves into the booking modal. The CTA band that
replaces it keeps id=contact for the nav anchor and declares
data-cta-takeover, so MobileCtaBar no longer reaches for an element id
that no longer exists."
```

---

## Self-Review

**Spec coverage.** Corner triangles, post-load, 0.12, no gloss → Task 3. Hero CTAs to modal → Task 3. Demos headline and the "in that style" offer → Tasks 1 and 4. WhyUs rebuilt on the animation and `NOT_A_FIT`, `DIFFERENTIATORS` cut, `RenderPromise` deleted → Task 5. Pricing three cards, Custom row, two-line headline, `NOT_A_FIT` removed → Tasks 1 and 6. Launch timeline band → Tasks 1 and 7. FAQ headline → Task 4. CTA band replacing `HomeContact` → Tasks 1 and 7. `MobileCtaBar` decoupling → Task 7. `RequestCallForm` split, `useDialog`, `BookingModal`, `Button.onClick` → Task 2. Progressive enhancement on every CTA → Tasks 3, 6, 7. Em dash exception and `CLAUDE.md` → Task 1. Final order → Task 7.

Not covered, deliberately: the spec's "Out of scope" section (the hero LCP defects, `text-[#5FBF72]`, `TESTIMONIALS`, `TriangleReveal`, `/services/web-design`).

**Type consistency.** `CallIntent` is declared once, in `RequestCallForm.tsx`, and imported by `RequestCallFormFromUrl`, `BookingModal`, `Hero`, and `CtaBand`. `BookingModal` takes `tier?: string | null`, and `HomePricing` passes `bookingTier`, a `string | null`. `useDialog` returns `RefObject<HTMLDivElement>`, which both modals spread onto a `motion.div`. `Button.onClick` is `(event: React.MouseEvent) => void`, and every `openBooking(...)` curried handler returns exactly that. `PRICING_HEADLINE` is `as const`, so `.map` over it yields `string`, which is fine for a `key` and for children.

**Ordering.** Task 1 must precede 4, 6, 7 (copy). Task 2 must precede 3, 6, 7 (`BookingModal`, `Button`). Task 5 must precede 7 only in that `app/page.tsx` is touched by both; Task 5 removes a mount, Task 7 rewrites the file. Tasks 3, 4, 5, 6 are otherwise independent of each other.

**Placeholder scan.** No TBDs. Every code step carries a complete file or an exact before-and-after region, and every verification step states its expected output.
