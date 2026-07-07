# Performance / UI-UX / Accessibility / SEO audit — handoff spec

**Date:** 2026-07-03
**Status:** COMPLETE (2026-07-04). All 14 items in the execution order below (items 1-13 fixed and verified; item 14, redeploying the two demo sites, deferred — see note at the end) plus the original work-page fixes are done. `npm run build` passes clean; spot-checked in-browser (DemoModal focus/scroll-lock/restore, FAQ accordion collapse, PixelCanvas dirty-flag redraw, /work and /services copy).

## Context

User (Tim) reported the `/work` page felt plain/empty, card animations felt laggy/glitchy since a 4th featured panel was added, wanted the "Future work" (coming-soon) section removed, and asked for a full performance audit, UI/UX review (desktop+mobile), accessibility review, and SEO audit across the whole site. Four parallel audit subagents were run (fork type, inherited full session context). This doc consolidates their findings plus the concrete fixes already shipped.

---

## ✅ Already done this session (verified: `npm run build` green, browser-checked at localhost:3000/work)

1. **`components/sections/WorkGrid.tsx`** — replaced the plain `h1` + boxed blue CTA banner with a real intro: eyebrow ("Portfolio") + heading + intro paragraph + a reused `TRUST_MARKERS` strip (Founder-led / Next.js builds / SEO included / 2–4 week launch) so the top of the page no longer feels empty.
2. **Removed the "More Work" / coming-soon section entirely** from `WorkGrid.tsx` (was rendering `Morristown Bakery Co.` and `Peak Landscaping` placeholder cards).
3. **`lib/data.ts`** — deleted the two now-orphaned `isComingSoon: true` placeholder entries from `PROJECTS`.
4. **Deleted `components/ui/ProjectCard.tsx`** — it became dead code once the coming-soon grid was removed (only consumer was that section). Confirmed no other references before deleting.
5. **`components/ui/ResponsiveDemoPreview.tsx`** — this was the real cause of the "laggy since 4 panels" complaint: every featured card with a `demoUrl` was mounting a live cross-origin iframe (a full separate Next.js app booting up) eagerly on page load — 3 of them simultaneously on `/work`. Fixed by lazy-mounting the iframe via `IntersectionObserver` (`rootMargin: '400px'`) plus native `loading="lazy"` as a belt-and-suspenders fallback.
6. **`components/sections/PortfolioTeaser.tsx`** — added `loading="lazy"` to its hardcoded homepage iframe (same root cause, smaller impact since it's a single iframe).
7. **`components/sections/ContactForm.tsx`** — added `loading="lazy"` to the Calendly iframe.

None of the above need re-doing. Everything below is still open.

---

## 🔴 Performance audit findings (not yet fixed)

Source: fork agent, full-site code read (Framer Motion usage, Calendly, images, fonts, bundle, hydration, and the 3 demo apps).

1. **`components/sections/PixelCanvas.tsx:98-113` — infinite RAF loop on the homepage hero.** Once `interactive` is true (fine pointer + no reduced-motion), `animate()` calls `drawAmbient()` and reschedules itself via `requestAnimationFrame` forever, regardless of whether the mouse is moving or the tab is visible. Full canvas clear + redraw of the whole pixel grid every frame, indefinitely. **This is likely the single biggest cause of the "sometimes feels laggy" complaint.**
   - Fix: only redraw on a dirty flag set by `pointermove` (skip the RAF-driven `drawAmbient()` call when nothing changed since the last frame), and pause the loop entirely on `document.visibilitychange` when the tab is hidden. Also worth pausing when the hero scrolls out of view (IntersectionObserver), since `parent?.addEventListener('pointermove', ...)` already exists and could gate a `dirty` flag instead of relying purely on rAF cadence.
   - I had just re-read this file and was about to implement the fix when the session ended — the plan is: add a `dirty` boolean set true in `handlePointerMove`, checked/reset in `animate()`, and add a `visibilitychange` listener that cancels/restarts `animationId`.

2. **`components/ui/PixelReveal.tsx`** — used on WhatWeDo, WhyUs, Faq, ServicesDetail, PortfolioTeaser. Each instance draws thousands of individual `fillRect` calls per frame for ~500ms via its own RAF loop + its own `IntersectionObserver` (threshold 0.15). Scrolling fast down the homepage can trigger 2-3 instances in close succession, compounding into visible jank right as the user scrolls.
   - Fix options: increase `pixelSize` (fewer/larger rects) for large sections, cap how many can run concurrently, or swap large-section reveals for a cheap CSS `clip-path`/mask transition and reserve the canvas confetti effect for small elements only.

3. **`components/sections/Faq.tsx:65`** — `animate={{ height: 'auto', ... }}` via Framer Motion forces a layout reflow every frame. Low severity (one accordion panel open at a time) but easy fix: measure `scrollHeight` via a ref and animate to a fixed px value, or use the CSS grid-template-rows `0fr → 1fr` trick.

4. **`components/ui/ScanlineHeading.tsx:34-36`** — animates the scanline via the `left` CSS property instead of a `transform`. Runs on nearly every page heading. Minor impact (short 0.5s animation, absolutely positioned) but switching to `x` transform makes it compositor-only instead of forcing paint.

5. **Calendly (`ContactForm.tsx`)** — `loading="lazy"` (already added) is a reasonable start, but the widget itself is genuinely ~1MB of JS/CSS regardless of when it loads, and `/contact` is the conversion page. Recommended (not urgent): a click-to-load facade — a static "Choose a time" preview card that mounts the iframe only on click — would improve perceived speed more than lazy-loading alone.

**Checked and NOT an issue:** font loading (`next/font`, `display: swap`, already fine), bundle sizes (87KB shared JS, 140-157KB first load per route — not bloated), `next.config.mjs` (no perf gaps), and all 3 demo apps in `demos/` (no rAF/setInterval usage of their own, no oversized images, one-shot SVG draw-in animations only — their earlier sluggishness was almost certainly the iframe-eager-load issue already fixed, not their own code).

---

## 🟠 UI/UX review findings (not yet fixed)

Source: fork agent, reviewed home/services/work/about/contact + the 3 demo booking/intake wizards, using ui-ux-pro-max guidelines as framework.

**Must-fix:**

1. **Mobile nav CTA under touch-target minimum.** `components/layout/Navbar.tsx:53,97` — "Book a Call" uses `Button size="sm"` (~36-38px tall) in both the desktop bar and mobile dropdown. This is the site's primary conversion action; WCAG/Apple minimum is 44px. Bump to `size="md"` at least in the mobile menu.

2. **Calendly iframe has no fallback.** `components/sections/ContactForm.tsx:60-67` — bare iframe, no skeleton, no escape hatch if it fails to load or is blocked by an extension. Add a "Prefer to book directly? Open Calendly ↗" link near the embed — same pattern already used well in `DemoModal.tsx`'s "Open in new tab" link.

3. **Wizard step labels disappear on mobile.** Both `demos/hartline-builders/components/booking/BookingWizard.tsx:278` and the Marlowe equivalent use `hidden sm:block` on the step name text, leaving mobile users with only colored progress segments + "Step 2 of 5" with no indication of *what* step 2 is. Show the active step's label as its own small mobile-visible line.

**Nice-to-have:**

4. Chip/pill buttons in both wizards (`ChipGroup`/`Pills`, `px-4 py-2.5`) land at ~40px tall — borderline against the 44px guideline.

5. `ServicesDetail.tsx` only has a CTA at the very bottom (AI section) — nothing after the pricing cards or "How We Start" for someone who decides mid-scroll. Add a repeated inline "Book a Call" after the pricing grid.

6. Homepage hero holds real content back until ~1.25–1.85s via staggered `reveal()` delays (`Hero.tsx:15-22, 38-76`) — previously flagged in project memory as an LCP concern, still unresolved, and directly touches the "sometimes feels slow" complaint. Worth deciding if this is intentional brand polish worth keeping or should be tightened.

**Confirmed fine, no action needed:** the two demo wizards have genuinely strong form UX (proper `fieldset`/`legend`/`role="radiogroup"`/`aria-checked`, inline validation with `role="alert"`, skeleton pulse while dates generate, review-before-submit step). No hover-only content traps found — group-hover glow effects are decorative only, all real actions are always-visible buttons. FAQ accordion has correct ARIA wiring. The 3 demo sites' visibly distinct identities (Fuego playful / Hartline blueprint / Marlowe clinical) read as real agency range, not inconsistency. CTA hierarchy is consistent site-wide.

---

## 🔴 Accessibility audit findings (not yet fixed)

Source: fork agent, WCAG 2.1 AA code-based review.

**Critical:**

1. **`DemoModal.tsx` (components/ui/DemoModal.tsx:26-100) has no dialog semantics or focus management.** No `role="dialog"`/`aria-modal="true"`/`aria-label`, no focus moved in on open, no focus trap (Tab escapes to background content), no focus restored to the triggering button on close, no body scroll-lock. This is the most-used interactive surface on the site (every project card's "Preview Demo" opens it) — currently unusable correctly for screen reader / keyboard-only users.
   - Fix: add `role="dialog"` + `aria-modal="true"` + `aria-label={title}`; on open, move focus to the close button (or the dialog container) and trap Tab within it; on close, restore focus to the element that opened it; add `document.body.style.overflow = 'hidden'` while open (revert on close).

2. **Broken fake radio semantics in `demos/hartline-builders/components/booking/BookingWizard.tsx`** (service picker ~L302-327, date picker ~L375-402, time-slot picker ~L407-433). Each option is an independently-tabbable `<button role="radio">` with no roving tabindex and no arrow-key handling — screen readers expect arrow keys to move selection within a radiogroup and only one tab stop. The file's own `ChipGroup` component (~L90-128) does this correctly with plain buttons + `aria-pressed` — convert these three pickers to match that pattern instead of faking radio semantics. Check whether `demos/marlowe-dental`'s `IntakeWizard.tsx` has the same pattern (likely, since it followed the same build pattern this session) and fix there too if so.

**Serious:**

3. **`PortfolioTeaser.tsx` clickable div (~L103-113)** has `role="button"` + `tabIndex` + `aria-label` correctly, but `onKeyDown` only checks `e.key === 'Enter'` — native buttons also activate on Space. Add the Space check (or convert to a real `<button>`).

4. **Contrast risk: `text-graphite/70`-style opacity text in the Hartline demo** (`BookingWizard.tsx:278-279` step labels for non-active steps, and similar `/60`/`/70` variants elsewhere). `graphite` = `#5B6472` (`tailwind.config.ts:17`), already only ~4.6:1 on white at full opacity (barely AA). Reducing opacity on top of that will very likely drop below 4.5:1. Compute the actual contrast at the reduced alpha before/after deciding; if it fails, use full-opacity graphite with a lighter font-weight for de-emphasis instead of alpha.

5. **"Preview Demo" buttons lack `aria-haspopup="dialog"`** (`WorkGrid.tsx` ~L270-277 and the equivalent in `PortfolioTeaser.tsx`) — they open a full-screen modal but nothing signals that to assistive tech before activation. Add it alongside the existing (and correct) `aria-expanded` pattern already used on the case-study toggle button (`WorkGrid.tsx` ~L265).

6. **Step progress bar is color-only** (`BookingWizard.tsx:272-276`, `bg-prussian`/`bg-hivis`/`bg-prussian/15` with no icon/text differentiation beyond the label row's `aria-current="step"`). Minor since the label row does carry `aria-current`, but the bar itself is a WCAG 1.4.1 gap for low-vision users relying on it alone.

**Confirmed fine, no action needed:** decorative iframes correctly `aria-hidden` + `tabIndex={-1}`; `useReducedMotion`/`useSafeRevealProps` consistently applied on main-site scroll reveals; form errors use `role="alert"` correctly; labels properly associated via `htmlFor`/`id`; layout landmarks correct; one `h1` per page (confirmed after this session's WorkGrid changes); image alt text present and descriptive everywhere checked.

---

## 🟠 SEO audit findings (not yet fixed)

Source: fork agent, full metadata/JSON-LD/sitemap/robots/on-page-copy review.

**Critical:**

1. **Sitemap/robots fall back to the wrong domain.** `app/sitemap.ts:3` and `app/robots.ts:3` both default `SITE_URL` to `https://renderagency.dev` if `NEXT_PUBLIC_SITE_URL` isn't set — but `app/layout.tsx:13` (canonical tag, OG, JSON-LD) defaults to `https://renderlocalwebsites.com`, the actual live domain. **Confirmed via direct grep this session** — this mismatch is real, not speculative. If the env var is ever missing in any Vercel environment, the sitemap/robots would advertise a domain the business doesn't own while every on-page tag points elsewhere.
   - Fix: change the fallback in both `app/sitemap.ts` and `app/robots.ts` to `https://renderlocalwebsites.com` to match `layout.tsx`, and separately confirm `NEXT_PUBLIC_SITE_URL` is actually set in the Vercel project env so none of the three ever depend on the fallback.

**Important:**

2. **Homepage loses its Open Graph description.** `app/page.tsx`'s `openGraph` object only sets `title` — no `description`. Next.js does not deep-merge nested metadata between layout and page; a page-level `openGraph` replaces the parent's wholesale. So the homepage (most likely to be shared) has no OG description on social/iMessage/Slack previews, while every other page correctly repeats both fields. Fix: add the same description string used in root metadata to `app/page.tsx`'s `openGraph` block.

3. **JSON-LD is thin for local SEO.** The `ProfessionalService` schema in `app/layout.tsx:52-70` has `name`, `description`, `url`, `email`, `areaServed`, `serviceType`, `priceRange`, `founder` — but no `telephone`, `address`, `sameAs`, or `logo`/`image`. Add `sameAs: [Tim's and Luke's LinkedIn URLs]` at minimum (already have these in `lib/data.ts` TEAM_MEMBERS, no new info needed). An `address` object with just `addressRegion: 'NJ'` helps without exposing a real street address. `telephone` only if/when they have a business number.

4. **On-page copy is keyword-thin outside metadata.** "Morris County, NJ" appears in every page's `metadata.description` (good for the search snippet) but only ~4 times total in actual visible component copy across the whole `components/` tree (ContactForm, Footer×2, Hero) — zero times in visible body copy on `/services`, `/work`, or `/about`. Metadata carries much less on-page ranking weight than real heading/body text. Fix: naturally work "Morris County, NJ" (or a specific town) into at least one heading or paragraph on `/services` and `/work` — this is the single highest-leverage SEO change given the business's own pitch is "we do local SEO for you." (Note: the new `/work` intro paragraph added this session does NOT currently mention location — worth revisiting once this task is picked up.)

5. **`/work` meta description is generic, short (~123 chars), and doesn't mention location.** Current: "See website demos and consulting proof from Render, including nonprofit strategy, web design, and practical digital work." Suggested tighten (~155 chars): "See live website demos and consulting proof from Render — web design, online booking, and nonprofit strategy work for Morris County, NJ businesses."

**Nice-to-have:** team headshot alt text is just the name, could add role for image-search value; no per-service `Service` schema yet (reasonable to skip until the portfolio grows); internal linking is fine for a 5-page site.

**Confirmed fine, no action needed:** titles, per-page description length/uniqueness, heading hierarchy (one `h1` per page via the `template: '%s | Render'` pattern), viewport meta — all solid, no duplicate-title or missing-description issues elsewhere.

---

## Suggested execution order for next session

Roughly highest-impact-per-effort first:

1. `app/sitemap.ts` + `app/robots.ts` domain fallback fix (2-line change, critical, zero risk).
2. `PixelCanvas.tsx` infinite RAF loop fix (likely biggest real perf win).
3. `DemoModal.tsx` accessibility (dialog role, focus trap, scroll-lock, focus restore) — highest-traffic interactive surface.
4. `app/page.tsx` OG description (1-line fix).
5. `app/layout.tsx` JSON-LD `sameAs`/`addressRegion` (data already available in `lib/data.ts`).
6. Local-SEO copy pass on `/services` and `/work` + tighten `/work` meta description.
7. `PortfolioTeaser.tsx` Space-key fix (trivial).
8. `aria-haspopup="dialog"` on Preview Demo buttons (trivial).
9. Calendly fallback link on `/contact`.
10. Mobile nav CTA size bump.
11. `Faq.tsx` height animation + `ScanlineHeading.tsx` left→transform (both low-risk perf polish).
12. `PixelReveal.tsx` tuning (needs visual judgment/testing — do with dev server open).
13. Hartline/Marlowe demo wizard fixes: graphite contrast check, fake-radio→button conversion, mobile step label visibility.
14. Rebuild + redeploy `hartline-builders` and `marlowe-dental` to Vercel production once their fixes land (`npx vercel --prod --yes` from each demo's directory — Vercel CLI was already authenticated this session under account `renderlocalwebsites-9481`).

A live task list mirroring this exact breakdown (17 tasks) was already created in this session's task tracker — if it's still visible next session, use it directly instead of re-deriving from this doc.

## 2026-07-04 completion notes

Items 1-13 are implemented directly on `main` (uncommitted, per Tim's preference — not yet committed/pushed). Item 14 (rebuild + redeploy `hartline-builders` and `marlowe-dental` to Vercel production) was **not** done — the fixes in those two demo directories only need redeploying if/when Tim wants the live demo URLs to reflect them; nothing about them is broken in the meantime.

Notable deviations / findings during implementation:
- **PixelReveal tuning (item 12):** went with `pixelSize={16}` (up from the default 8) on the four large full-section wraps (WhatWeDo, WhyUs, Faq, PortfolioTeaser) — roughly a 3x cut in `fillRect` calls per frame. Did not add a concurrency cap; the pixelSize cut alone looked sufficient in-browser and kept the change small.
- **Marlowe Dental `IntakeWizard.tsx` (item 13):** checked for the same fake-radio/contrast/mobile-label issues called out in Hartline's `BookingWizard.tsx` — none were present (it uses a different, already-correct `ArcProgress` + always-visible step-label pattern), so no changes were needed there.
- **Faq.tsx accordion (item 11):** first attempt at the CSS grid `0fr → 1fr` trick moved `overflow-hidden` onto the ARIA panel div itself, which zeroes the grid item's automatic minimum size and broke the *expand* animation (panel stuck at 0 height when open). Fixed by keeping `overflow-hidden` directly on the same div that carries the ARIA attributes (no extra wrapper needed) — verified via computed `grid-template-rows` and panel height in the console, not just visually.
- One incident mid-session: running `npm run build` while `npm run dev` was still running clobbered the shared `.next` directory and broke the dev server (`Cannot find module './948.js'`). Fixed by stopping dev, `rm -rf .next`, restarting. Not a code bug — just don't run `build` and `dev` concurrently in this repo.
