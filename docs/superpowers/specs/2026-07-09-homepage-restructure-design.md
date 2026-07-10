# Homepage Restructure

Date: 2026-07-09
Status: implemented on branch `homepage-restructure`

> **Amendment history.** During implementation Tim trialed two corner-accent
> variants live: a straight-line wireframe, then radial webs with sagging arcs
> (commits 2af7ae6, d8a1f0c). On 2026-07-10 he rejected the webs and the file
> was restored to the filled triangle clusters exactly as the "Hero: corner
> triangles" section below describes. That section stands as written and as
> implemented. Do not reintroduce the web pattern without Tim asking for it.

## What we're building

A reordered, re-copied homepage. Nine sections instead of ten, ranked so evidence
precedes argument and argument precedes price. Four sections are rewritten, two are
deleted, three are new, and the booking form moves into a modal so a visitor never
loses their scroll position to convert.

The through-line: this site has no client testimonials and no signed website
clients. Its only currency is claims a stranger can falsify in thirty seconds.
Every change below either adds such a claim, or removes something that reads as
boilerplate a competitor could paste.

## Section order

| # | Section | Job | Change |
|---|---|---|---|
| 1 | `Hero` | The promise | Corner triangles, post-load. CTAs open the modal. |
| 2 | `Testimonials` | Renders nothing | None. Stays mounted for the day a real quote exists. |
| 3 | `ProofStrip` | Three checkable claims | None. |
| 4 | `HomeWork` | The hook | New headline, new offer copy. |
| 5 | `WhyUs` | The argument | Rebuilt. Animated headline, `NOT_A_FIT` as the spine. |
| 6 | `HomePricing` | The number | Rebuilt. Three cards, Custom row, two-line headline. |
| 7 | `HomeServices` | What you sell | None. |
| 8 | `LaunchTimeline` | How long | **New.** |
| 9 | `Faq` | Objections | Headline only. |
| 10 | `CtaBand` | Convert | **New.** Replaces `HomeContact`. |

Ten rows, nine sections: `Testimonials` renders `null` until `TESTIMONIALS` is
non-empty.

The ordering principle is that a stranger with no reason to trust Render should
meet the clickable demos before any argument, and the guarantee before any price.
`WhyUs` ends on the risk-reversal panel and `HomePricing` immediately follows it.
That adjacency is load bearing. Any future reorder that puts a price above the
guarantee undoes the reason `WhyUs` exists.

## Per-section detail

### 1. Hero: corner triangles

Today the hero renders `TriangleReveal rows={9} cols={14}`, which is 252 SVG
polygons, each with its own Web Animation, plus a canvas `getImageData` sample
pass and a gloss sweep. It is masked with a radial gradient so triangles appear
everywhere except the center, and it animates on scroll-into-view, which in the
hero means immediately. It therefore competes with the `h1` while the `h1` is
still resolving in.

Replace with `components/ui/CornerTriangles.tsx`:

- Four clusters, one per hero corner. Each is a 3x3 grid of right-triangle pairs,
  so 18 polygons per corner and 72 total, down from 252.
- Fills come from existing tokens (`accent`, `accent-soft`, `graphite`), not from
  sampling a painted canvas. No `<canvas>`, no `getImageData`.
- Each cluster is masked with a linear gradient fading toward the page center, so
  the mosaic dissolves rather than ending on a hard edge.
- Target opacity `0.12`. Subtle enough that it reads as texture, not as content.
- No gloss sweep.

**Mounting.** The component renders nothing until the `load` event has fired
(checking `document.readyState === 'complete'` first, since `load` may already
have passed by the time the effect runs). Then the triangles fade up over ~1.2s
with a small per-triangle stagger. Decoration must never be on the critical path,
and `docs/design-audit-2026-07.md` already flags the hero as LCP-troubled.

Under `prefers-reduced-motion: reduce`, the triangles appear at final opacity with
no fade and no stagger.

The container is `aria-hidden`, `pointer-events-none`, and absolutely positioned,
so it cannot shift layout or reach the accessibility tree.

`TriangleReveal.tsx` is **not** deleted. It is the right tool for real photography
when photography exists. It simply stops being used by the hero.

The ambient parallax blobs stay.

### 4. HomeWork: demo websites

Headline becomes `Demo websites you can click.` It leads with "demo," which
satisfies the `CLAUDE.md` rule that demos are never presented as client work, and
"you can click" states the actual differentiator.

The section intro gains the replication offer. The verb matters: **we do not
promise to replicate a third party's site.** Site copy, images, and code are
copyrightable and distinctive designs can support a trade-dress claim. A homepage
that promises to reproduce a URL a customer sends is a written commitment to do
so. The offer is therefore phrased as building *in that style*, which is both
defensible and an accurate description of what Render would actually deliver.

New copy, in `lib/data.ts`:

```ts
export const DEMO_SECTION = {
  headline: 'Demo websites you can click.',
  intro: 'Sample sites we designed and built. Not real businesses, and not client work.',
  offer:
    "See a website template you like, here or on another site? Send us the link and we'll build you something in that style, with your brand and your content.",
}
```

`DEMO_DISCLAIMER` keeps its `badge`, `short`, and `long` and keeps labelling the
cards. The cards, the case-study band, and the modal are unchanged.

### 5. WhyUs: the argument

Three problems today. The headline ("A website that works as hard as you do") is a
line any competitor could run. The three `DIFFERENTIATORS` ("Built to convert",
"SEO-first build") are unfalsifiable and restate claims `ProofStrip` already made
two sections earlier, with links. And the airy three-across grid of two-line cards
is what makes the section read as empty.

Rebuilt as:

- **Eyebrow** `Why Render`, unchanged.
- **Headline** becomes the render-verb animation. The `h2` is
  `We don't just render websites. / We render [leads. → bookings. → customers.]`,
  rendered by the existing `ResolveWord`. The slot recolors from `accent-dark` to
  `accent-soft`, because this band is `bg-graphite-light` and `accent-dark` on it
  fails contrast.
- **Body** becomes `NOT_A_FIT`, promoted from the bottom of the pricing section:
  the `When Render is not the right choice` heading, the two cases, and the
  closing line. Naming who you are wrong for is the one claim on this page no
  competitor will copy, and it is what earns the guarantee that follows.
- **Closer** is the existing `RISK_REVERSAL` panel, unchanged, followed by the
  founders link and the CTA.
- `DIFFERENTIATORS` is **cut from the homepage.** The export stays in `lib/data.ts`
  and keeps rendering anywhere else it is used.

`components/sections/RenderPromise.tsx` is deleted; its markup moves into `WhyUs`.
`ResolveWord` and the `RENDER_PROMISE` data both survive unchanged.

Putting the animation in an `h2` is safe. The original spec rejected an animated
heading because "Google indexes one frame," but `ResolveWord` server-renders only
`customers.`, so the indexed heading is deterministic. The LCP objection only ever
applied to the hero `h1`.

### 6. HomePricing: the number

Today each tier is a `px-3.5 py-4` cell holding a `19px` price and exactly one
feature, `truncate`d, at `10.5px`, four across. It is a summary of a summary, which
is why it reads as undescriptive.

- **Headline** becomes two stacked lines, `No BS.` / `No hidden fees.`, at
  `display-xl`. Two lines of `clamp(2.25rem, 5vw, 3.5rem)` is a taller block than
  the hero's one-to-two lines of `display-2xl`, so pricing becomes the most
  visually dominant section on the page without introducing a token or tying with
  the hero's type size.
- **Starter, Standard, Premium** become three real cards: tier name, struck
  `standardPrice`, large `priceRange`, `monthlyRange`, the first four `features`
  untruncated, and a CTA. `Standard` keeps `isHighlighted` and its `Most Chosen`
  badge.
- **Custom** drops out of the grid into a slim full-width row beneath it. It has no
  price and was only ever padding a fourth column. The row reads
  `Custom — let's talk.` plus its summary and the `Scope My Project` CTA.
- The `GUARANTEE` panel and the "What's included in each tier" link stay.
- `NOT_A_FIT` leaves, for `WhyUs`.

Real values, for the avoidance of doubt: Starter `$500` (was `$1,500`), Standard
`$750` (was `$2,900`), Premium `$2,000` (was `$4,900`).

New copy in `lib/data.ts`:

```ts
/** Rendered as stacked lines. Deliberately two claims, both checkable. */
export const PRICING_HEADLINE = ['No BS.', 'No hidden fees.'] as const
```

### 8. LaunchTimeline: a new band

`LAUNCH_TIMELINE` (four entries, Week 0 through Week 3-4) currently lives inside
`HomeContact`, which is being deleted. It answers "how long does this take," which
is a real objection, and it is concrete rather than boastful. It becomes its own
band, laid out horizontally on `md` and up, vertically on mobile.

New copy in `lib/data.ts`:

```ts
export const LAUNCH_TIMELINE_SECTION = {
  eyebrow: 'Your launch timeline',
  headline: 'From first call to live site.',
}
```

`LAUNCH_TIMELINE` itself is unchanged. It still renders on `/contact`.

### 9. Faq

The eyebrow reads `FAQ` and the headline reads `Questions, answered.` Drop the
eyebrow; the headline becomes the bare word `FAQ` at `display-xl`. Every other
section keeps its eyebrow, so this reads as the plain utility section it is.

Nothing else changes. `featuredFaqItems` still drives both the cards and the
`FAQPage` JSON-LD in `app/page.tsx`.

### 10. CtaBand: a new closing section

`components/sections/HomeContact.tsx` is deleted. In its place, a short band:

```ts
export const CTA_BAND = {
  headline: "Ready to see what we'd build?",
  body: 'Tell us what you need and a couple of times that work. We map out exactly what we would build, on a free call, with nothing to buy.',
}
```

Two buttons, `Request a Call` and `Get a Free Mockup`, plus `GUARANTEE.short`.
Both open the booking modal.

The section carries `id="contact"` **and** `data-cta-takeover`. See "MobileCtaBar"
below for why both.

`HomeContact`'s email link and guarantee line are not lost: `/contact` already
renders its own contact page and keeps them.

## The booking modal

`components/ui/BookingModal.tsx`, a client component.

```ts
interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  /** Preselects the "What do you need?" field. */
  tier?: string | null
  intent?: 'mockup' | 'ai' | 'seo' | null
}
```

Contents: the three "How this works" call steps on the left, `RequestCallForm` on
the right. The steps currently live as a local `const steps` inside `HomeContact`;
they move to `lib/data.ts` as `CALL_STEPS`, per the rule that structured content
does not live inside components.

### Why `RequestCallForm` must be refactored first

`RequestCallForm` calls `useSearchParams()` and derives `tier` and `intent` from
the URL. A modal has no URL to read. Naively adding props alongside the hook would
give the component two sources of truth for the same two values.

Split it:

- `RequestCallForm({ tier, intent })` becomes purely presentational. No
  `useSearchParams`, no `Suspense` requirement. The modal renders it directly.
- `RequestCallFormFromUrl()` is a thin new client component that reads the search
  params and renders `RequestCallForm` with them. `/contact` uses this, still
  wrapped in `Suspense` as it is today.

Everything else about the form is untouched: the honeypot, the Web3Forms call, the
`request_call_submit` event, the `pricing_tier_clicked` field, and the success and
error states.

### Dialog behavior

`DemoModal` already implements the focus trap, Escape handling, `body` overflow
lock, and focus restore. Rather than duplicate ~40 lines, extract that effect into
`components/ui/useDialog.ts` and have both modals call it. It lives beside its two
consumers rather than in `lib/`, which holds framework-free helpers (`utils`,
`analytics`, `schema`, `web3forms`) and no React. `DemoModal`'s behavior must not
change.

`BookingModal` is `z-50`. `MobileCtaBar` is `z-40`, so the modal's opaque overlay
covers it, and the focus trap already excludes anything outside the dialog element.
No change to the bar is needed for the modal's sake.

### Progressive enhancement, and why the CTAs stay anchors

Every CTA that opens the modal renders as a real `<a href="/contact?...">` and
calls `event.preventDefault()` in its `onClick` before opening the modal.

Consequences:

- Without JS, every CTA still navigates to `/contact` and still carries its
  `?tier=` or `?intent=` param, so the page keeps working.
- Googlebot still sees internal links to `/contact` from the hero, from all four
  pricing CTAs, and from the CTA band. Turning them into `<button>`s would delete
  six internal links from the homepage.
- Middle-click and Ctrl+click keep opening `/contact` in a new tab, because
  `preventDefault` runs on a plain left click only.

This requires widening `Button`'s `onClick` from `() => void` to accept the mouse
event. `Button` currently types it as `onClick?: () => void`.

### Which CTAs open it

| CTA | Href it keeps | Modal props |
|---|---|---|
| Hero, "Request a Call" | `/contact` | none |
| Hero, "Get a Free Mockup" | `/contact?intent=mockup` | `intent="mockup"` |
| Pricing, Starter/Standard/Premium/Custom | `/contact?tier=<Tier>` | `tier="<Tier>"` |
| CTA band, both buttons | as above | as above |

`Navbar`, `MobileCtaBar`, and `Footer` are global chrome. They render on pages
where no homepage modal exists, so they keep navigating to `/contact`. Making them
open the modal would require lifting its state into an app-level client provider,
which is not worth a root client boundary.

**No provider, no context, and no state in `app/page.tsx`.** Each of the three
sections that opens the modal owns its own `useState` and renders its own
`<BookingModal>`, exactly as `HomeWork` already owns its own `DemoModal`. `Hero`
and `HomePricing` are already `'use client'`; `CtaBand` will be. `app/page.tsx`
stays a server component, which it must, because it owns the `metadata` export and
the `FAQPage` JSON-LD.

Three `BookingModal` instances therefore exist on the homepage, but at most one is
ever open, and `AnimatePresence` renders nothing at all while `isOpen` is false, so
a closed modal costs no DOM and never mounts the form.

Analytics must survive: `tier_cta_click` still fires on each tier CTA, and
`mockup_request` still fires on the mockup CTAs, both before the modal opens.

## MobileCtaBar

Today it hides itself on the homepage by observing `document.getElementById('contact')`,
which is `HomeContact`. That element is being deleted. Two things depend on it:

1. The bar's hide behavior.
2. `NAV_LINKS` in `lib/data.ts` contains `{ label: 'Contact', href: '/#contact' }`,
   so the navbar's Contact link is a homepage anchor.

Fix: the `CtaBand` carries `id="contact"` (keeping the anchor and the nav link
working) plus `data-cta-takeover`. `MobileCtaBar` swaps its hardcoded lookup:

```diff
- const el = document.getElementById('contact')
+ const el = document.querySelector('[data-cta-takeover]')
```

The bar now hides over any section that declares it owns the conversion, on any
page, and the coupling is named rather than implied.

Precisely which guards change: the **early return inside the effect** for
`pathname !== '/'` goes away, because the query returns `null` on any page with no
such section and the existing `if (!el) return` already handles that. The
**component-level** `if (pathname === '/contact') return null` stays. `pathname`
stays in the effect's dependency array so the query re-runs on client navigation.

## Copy rules

`CLAUDE.md` states "no em dashes anywhere in shipped copy." Tim has granted one
deliberate exception: the pricing Custom row, `Custom — let's talk.`

Amend `CLAUDE.md` rather than silently violate it. A flat rule plus a
counter-example in the codebase is a landmine: the next agent, or Luke, reads the
rule and dutifully "fixes" the copy. New wording:

> **Copy rules:** no em dashes in shipped copy. One approved exception, granted
> 2026-07-09: the Custom row in the homepage pricing section (`Custom — let's
> talk.`). Adding another exception requires Tim's sign-off.

No other em dashes are introduced anywhere.

## Content source of truth

New exports in `lib/data.ts`: `DEMO_SECTION`, `PRICING_HEADLINE`,
`LAUNCH_TIMELINE_SECTION`, `CTA_BAND`, `CALL_STEPS`.

Removed from the homepage but kept in `lib/data.ts`: `DIFFERENTIATORS`.

Moved, not changed: `NOT_A_FIT` (pricing to WhyUs), `LAUNCH_TIMELINE` (HomeContact
to its own band).

## Accessibility

- `CornerTriangles` is `aria-hidden` and `pointer-events-none`.
- The `WhyUs` `h2` uses `ResolveWord`, which already exposes an `sr-only` settled
  word and marks the animated stack `aria-hidden`. A screen reader hears
  "We don't just render websites. We render customers." and never the intermediate
  words. The heading level stays `h2`, so the document outline is unchanged.
- `NOT_A_FIT.headline` moves from `h3` under a pricing `h2` to `h3` under the
  `WhyUs` `h2`. Still a valid outline.
- `BookingModal` uses `role="dialog"`, `aria-modal="true"`, an accessible name, a
  focus trap, Escape to close, and focus restore, via the extracted `useDialog`.
- Pricing CTAs remain anchors, so they keep their native link semantics.
- The pricing headline is two sentences in one `h2`; the visual line break is a
  `<span className="block">`, not a `<br>`, so it announces as one heading.

## Layout shift

`CornerTriangles` mounts after `load` and is absolutely positioned inside a
`relative` hero, so it cannot contribute to CLS.

The pricing grid goes from four columns to three plus a row. Nothing lazy-loads
into it, so its height is stable from first paint.

## Testing and verification

No test runner is configured, so verification is:

1. `npm run build` passes. Stop `next dev` first; they share `.next`.
2. The homepage renders nine visible sections in the order in the table above.
3. `curl` the built HTML: it contains `Demo websites you can click.`, `No BS.`,
   `No hidden fees.`, and `FAQ`. Inside the `WhyUs` section's rendered markup, the
   `ResolveWord` slot holds `customers.` exactly once and holds neither `leads.`
   nor `bookings.` Strip `<script>` blocks before grepping, because Next serializes
   the client component's props into the RSC flight payload; and scope the check to
   the `WhyUs` section, because `HomeServices` copy independently contains the word
   "customers." See `2026-07-09-render-verb-tagline-design.md` for both traps.
4. It contains **no** `A website that works as hard as you do`, no
   `Real sites, invented brands`, no `Questions, answered`, and no
   `Fixed prices, published here`.
5. `id="contact"` exists exactly once on the homepage, on the CTA band. The
   navbar's Contact link scrolls to it.
6. With JS disabled, every hero and pricing CTA navigates to `/contact` with the
   right query param.
7. With JS on, each of those CTAs opens the modal instead, preselects the right
   "What do you need?" option, and never navigates.
8. On a narrow viewport, the mobile bar hides when the CTA band scrolls into view.
9. The modal traps focus, closes on Escape, and restores focus to the CTA that
   opened it. `DemoModal` still does the same.
10. DevTools, emulate `prefers-reduced-motion: reduce`: the corner triangles are
    present and static, and the `WhyUs` headline shows `customers.` sharp on the
    first frame.
11. Performance panel: no layout shift attributable to the hero or the pricing
    grid.
12. `grep` the diff for em dashes. Exactly one, in the Custom row.

## Out of scope

- The hero `h1` shipping at `opacity: 0` and the ~1.5s CTA delay. Real defects,
  tracked in `docs/design-audit-2026-07.md`, not this change's to fix. Moving the
  triangles off the critical path helps but does not resolve them.
- `text-[#5FBF72]`, hardcoded off-palette, in the case-study card
  (`HomeWork.tsx:164` and `173`, and `WorkGrid.tsx:323`). Flagged, not fixed.
- `TESTIMONIALS` and the no-fabricated-proof posture. Unchanged.
- `/services/web-design`, which still owns the full pricing grid. The homepage
  stays a summary and the two must not drift. `public/pricing.md` and
  `public/llms.txt` are unaffected because no price or tier name changes.
- `TriangleReveal`, kept for real photography.
