# Homepage visual ideas — hand-off for Claude Design (2026-07-10)

Content is now settled (commit `db023a2`). This is the visual layer: ideas to
make the homepage, and Why Us especially, feel less like a text wall. Nothing
here is built. Pick and choose.

**Constraints to respect (non-negotiable):**
- Brand tokens only where possible: `accent` (teal), `accent-dark`, `accent-soft`,
  `graphite`, `graphite-light`, `surface`, `bg`. The signature motif is the
  triangle-mosaic "render-in" (see `TriangleReveal.tsx`).
- No fabricated proof. `TESTIMONIALS` stays empty until a real client quote
  exists; the three demo sites are always labeled demo templates.
- No em dashes in shipped copy (one approved exception in the pricing Custom row).

---

## Why Us — the priority (currently three text columns on dark `graphite-light`)

The section makes three promises. Right now they're three equal blocks of grey
text. The fix is to give each promise a distinct visual anchor so the eye has
something to land on before it reads.

1. **Founder photo on promise #1 (highest impact).** "You talk to the people who
   build it" is begging for a real photo of Tim and Luke. Duotone or teal-graded
   so it sits in the palette. A single human face does more for trust than any
   amount of copy, and it's the one pillar a competitor literally cannot copy.
   Layout: photo occupies the first column (or a left rail), the three promises
   flow beside it.

2. **Ghosted numerals or line-icons per promise.** Large `01 / 02 / 03` set in
   `accent-dark` at low opacity behind each title, or a single-line custom icon
   (a person, a price tag, an eye/preview). Cheapest possible way to break the
   text rhythm.

3. **Inline proof chips.** Make each promise show its evidence, not just claim it:
   - #2 "price before you talk to us" → a tiny row of real price chips
     (`$500 · $750 · $2,000`) pulled from `PRICING_TIERS`.
   - #3 "see the site before you pay" → a small mockup-to-live thumbnail pair, or
     a "draft → approved" micro-diagram.

4. **Triangle-motif accent, scroll-triggered.** Carry the hero's mosaic language
   in: a subtle corner cluster or a left border that "renders in" (triangles
   assembling) as each promise scrolls into view. Ties Why Us back to the hero
   and reinforces the render-verb headline that sits right above it.

5. **A connecting spine.** A thin vertical/horizontal line in `accent-soft` that
   draws between the three promises on scroll, signaling "these are one argument,
   not three bullet points."

6. **Not-a-fit line as a visual aside.** The single "not the right fit" line could
   sit in a muted, bordered callout (smaller, `white/50`) so it reads as an
   honest footnote rather than competing with the promises.

**Recommended combo:** founder photo (#1) + ghosted numerals (#2) + inline price
chips on promise #2 (#3). That's the biggest perceived change for the least risk.

---

## Rest of the homepage

- **Hero.** Mosaic is restored; Tim is refining it in Claude Design. Directions
  worth trying: more depth/parallax on the triangles, brand-color grading rather
  than flat grey, or a slow ambient drift. Keep the center masked clear so the
  headline stays readable.

- **Services (now second).** The two service cards are clean but static. Consider
  a small looping micro-demo or richer line-icon per card. The AI use-case
  interactive cards below are already the liveliest thing on the page; make sure
  they read as tappable (they say "tap a card to see it work").

- **Demo section ("See real sites we built").** Wrap each demo preview in a
  browser-chrome or device frame so "real, deployed site" is legible at a glance
  before anyone reads the caption. Reinforces the honesty of the claim.

- **Pricing.** The "Before you commit" guarantee panel could carry a small
  guarantee-seal/badge glyph so it reads as a promise, not just a paragraph. Keep
  the "Most Chosen" tier visually dominant (it already is).

- **Contact band.** Now single-CTA with generous padding. It's clean; a faint
  triangle-motif background or a subtle gradient would keep it from feeling empty
  without adding clutter.

- **Social-proof gap (honest).** `TESTIMONIALS` is empty and must stay empty until
  a real quote exists. A legitimate stand-in: a small "built with / tested
  against" trust strip (Core Web Vitals, the real tools used) — factual, not
  fabricated. Do NOT invent client logos or quotes.

---

## Motion notes

- Everything must degrade under `prefers-reduced-motion` (the codebase already
  does this via `useReducedMotion` and CSS media queries — match that pattern).
- Keep decoration off the critical path (the mosaic mounts after load; the
  scroll reveals use one shared IntersectionObserver). New visuals should follow
  the same "never block the h1" rule.
