# Navbar Always-Visible + Hero Visual Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the transparent-at-top-of-home navbar behavior so nav tabs are always visible, and replace the sloppy blue concentric circles in the hero with a large wireframe `< />` SVG element.

**Architecture:** Two isolated changes in two files. Task 1 edits `Navbar.tsx` to drop the `transparent` conditional. Task 2 edits `Hero.tsx` to swap the circles div for an inline SVG `< />` graphic. No new files or dependencies needed.

**Tech Stack:** Next.js 14, Tailwind CSS, Framer Motion, inline SVG

---

### Task 1: Remove transparent navbar mode

**Files:**
- Modify: `components/layout/Navbar.tsx:17`

The navbar currently sets `transparent = isHome && !scrolled`, then applies `bg-transparent border-b border-transparent` when true. This makes the nav tabs invisible at the top of the home page. Remove the transparent logic entirely and always render the solid style.

- [ ] **Step 1: Open `components/layout/Navbar.tsx` and locate the transparent logic**

Lines 16–17:
```tsx
const isHome = pathname === '/'
const transparent = isHome && !scrolled
```

- [ ] **Step 2: Delete the two transparent-related variables and the scroll state**

Replace lines 12–27 with:
```tsx
const [isOpen, setIsOpen] = useState(false)
const pathname = usePathname()
```

Remove the `scrolled` state, the `useEffect` scroll handler, `isHome`, and `transparent` entirely. The `scrolled` state is now unused; the `useEffect` import is no longer needed if nothing else uses it — but leave the import line alone if `useState` is still needed (it is, for `isOpen`).

Final top of component after edit:
```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/data'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
```

- [ ] **Step 3: Replace all `transparent`-conditional class strings in JSX**

Find every occurrence of `transparent` in the JSX and replace with the solid/dark equivalent:

**`<header>` className** (line ~30):
```tsx
// Before
className={`sticky top-0 z-50 transition-all duration-300 ${
  transparent
    ? 'bg-transparent border-b border-transparent'
    : 'bg-white/90 backdrop-blur-md border-b border-neutral-100'
}`}

// After
className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100"
```

**Nav link className** (inside `.map`):
```tsx
// Before
className={`text-sm font-semibold transition-colors duration-150 ${
  transparent
    ? pathname === link.href
      ? 'text-white'
      : 'text-white/80 hover:text-white'
    : pathname === link.href
    ? 'text-accent'
    : 'text-neutral-600 hover:text-charcoal'
}`}

// After
className={`text-sm font-semibold transition-colors duration-150 ${
  pathname === link.href ? 'text-accent' : 'text-neutral-600 hover:text-charcoal'
}`}
```

**Button variant** (desktop CTA):
```tsx
// Before
<Button variant={transparent ? 'secondary-inverse' : 'primary'} size="sm" href="/contact">

// After
<Button variant="primary" size="sm" href="/contact">
```

**Mobile hamburger className**:
```tsx
// Before
className={`md:hidden p-2 transition-colors duration-300 ${
  transparent ? 'text-white hover:text-white/80' : 'text-neutral-600 hover:text-charcoal'
}`}

// After
className="md:hidden p-2 transition-colors text-neutral-600 hover:text-charcoal"
```

**Logo variant**:
```tsx
// Before
<Logo variant={transparent ? 'light' : 'dark'} priority className="h-auto w-32 sm:w-36 md:w-40" />

// After
<Logo variant="dark" priority className="h-auto w-32 sm:w-36 md:w-40" />
```

- [ ] **Step 4: Verify the full file compiles cleanly**

Run:
```bash
npm run lint
```

Expected: no errors. If `useEffect` import is now unused, remove it from the import line.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "fix: always show solid navbar — remove transparent-at-top-of-home behavior"
```

---

### Task 2: Replace hero circles with wireframe `< />` SVG

**Files:**
- Modify: `components/sections/Hero.tsx:13-24`

The current right-side element is three concentric `div`s with `rounded-full` (circles) in `accent/15` and `accent/25`. Replace this entire block with an inline SVG rendering a large wireframe `< />` self-closing tag, partially bleeding off the right edge.

- [ ] **Step 1: Open `components/sections/Hero.tsx` and locate the circles block**

Lines 13–24:
```tsx
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
```

- [ ] **Step 2: Replace the entire block with the `< />` SVG**

```tsx
<div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block overflow-visible">
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.2, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    <svg
      width="480"
      height="420"
      viewBox="0 0 480 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="translate-x-24"
    >
      {/* < */}
      <path
        d="M120 60 L30 210 L120 360"
        stroke="white"
        strokeOpacity="0.12"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* / */}
      <path
        d="M210 360 L270 60"
        stroke="white"
        strokeOpacity="0.12"
        strokeWidth="18"
        strokeLinecap="round"
      />
      {/* > */}
      <path
        d="M360 60 L450 210 L360 360"
        stroke="white"
        strokeOpacity="0.12"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>
</div>
```

**What this produces:**
- Three stroked paths: a `<` chevron, a `/` slash, and a `>` chevron
- `strokeOpacity="0.12"` keeps it subtle against the dark hero background
- `translate-x-24` (96px) nudges it rightward so the `>` partially bleeds off-screen — intentional, feels like a design element
- Animation slides in from the right (`x: 40 → 0`) rather than scaling up like the circles did, which feels more deliberate
- `strokeWidth="18"` gives it weight at this size without looking thin

- [ ] **Step 3: Check the result visually**

Run the dev server:
```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Verify:
- The `< />` appears on the right side of the hero on a wide viewport (lg+)
- It's subtle — visible but not competing with the headline text
- The bleed-off-right feels intentional, not clipped awkwardly
- The fade+slide animation fires after the pixel canvas settles (~1.6s delay)
- On mobile / tablet viewports, nothing appears (hidden by `hidden lg:block`)

**Tuning levers if needed:**
- Too faint → increase `strokeOpacity` toward `0.18`
- Too far off-screen → reduce `translate-x-24` to `translate-x-16` or `translate-x-12`
- Too large → reduce `width`/`height` and `viewBox` proportionally
- Wants accent color tint → change `stroke="white"` to `stroke="currentColor"` and add `className="text-accent/20"` to the SVG

- [ ] **Step 4: Lint check**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: replace hero circles with wireframe < /> SVG element"
```
