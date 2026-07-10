# Homepage content iteration — design spec (2026-07-10)

Second pass on the homepage, after Tim's sister flagged "weird wording" and Tim
reviewed the restructured page. Scope is **content and copy first**; visual
treatment is a separate hand-off to Claude Design (see the last section). Builds
on branch `homepage-restructure` (currently at `59cc494`), unmerged.

## Decisions (all confirmed with Tim, 2026-07-10)

### 1. Hero background — restore the mosaic

- Swap `CornerTriangles` out of `components/sections/Hero.tsx`, put back the
  full-bleed `TriangleReveal` block exactly as it shipped at commit `3427471`:
  9×14 grid, `tone="a"`, wrapper `opacity-[0.22]`, radial ellipse mask
  `radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, black 85%)`.
- `components/ui/TriangleReveal.tsx` is unchanged since `3427471` (verified
  identical), so this is a restore, not a rebuild.
- Do **not** touch `CornerTriangles.tsx` (leave the file; it just stops being
  imported by Hero). Hero text animations (`ResolveText` headline, blur-in
  paragraphs) stay as-is.
- Tim will refine the background further in Claude Design later.

### 2. Section order — drop ProofStrip, promote Services

New homepage order:

```
Hero → HomeServices → WhyUs → HomeWork (demos) → HomePricing → LaunchTimeline → Faq → CtaBand
```

- **Delete `components/sections/ProofStrip.tsx`** and remove it from
  `app/page.tsx`. Its three proofs are absorbed into WhyUs (below), so nothing
  is lost — that absorption is what made ProofStrip feel like a third repeat.
- `PROOF_MARKERS` in `lib/data.ts` becomes unused on the homepage. Leave the
  export (harmless) — do not delete in this pass.
- Update the ranking comment at the top of `app/page.tsx` to match the new
  order and rationale (argument now leads evidence, per Tim's call).

### 3. Copy + substance

**WhyUs — rebuilt as three positive promises, each independently verifiable.**

- Keep the animated `ResolveWord` headline: "We don't just render websites. We
  render customers." (`RENDER_PROMISE`, unchanged).
- New data export `WHY_RENDER` in `lib/data.ts` with three pillars. Each pillar
  is a promise a stranger can click and falsify — this is deliberately
  ProofStrip's job, folded in:

  1. **You talk to the people who build it.** "Tim and Luke write the code
     ourselves. No account manager, no handoff to a junior, no ticket queue.
     The people you meet on the call are the people who build and maintain your
     site." → link "Meet the founders" → `/about`
  2. **You see the price before you talk to us.** "Every package price is
     published on this page. No 'contact us for a quote,' no discovery call
     just to get a number." → link "See the pricing" → `/#pricing`
  3. **You see the site before you pay.** "We show you a real design direction
     before any deposit changes hands. If it isn't right, you walk away and owe
     nothing." → link "See how it works" → `/services/web-design`

- **One line** on who Render is not for (Tim: keep one line, cut the two-case
  block). New field `WHY_RENDER.notForLine`: "Not the right fit for everyone:
  if you need a big-agency team running multi-channel ad campaigns, or a
  one-off hobby page, we'll point you somewhere better."
- **Remove** the full `NOT_A_FIT` two-case block and the `RISK_REVERSAL` panel
  from WhyUs. `NOT_A_FIT` stays in `lib/data.ts` (still used by the
  choosing-a-web-designer guide). `RISK_REVERSAL` moves to pricing (below).
- The founders link + CTA row at the bottom of WhyUs stays, CTA relabeled per
  §3 CTA rule.
- `DIFFERENTIATORS` remains unused; leave the export.

**Demo section (`HomeWork`) — rename and re-intro.**

- `DEMO_SECTION` in `lib/data.ts`:
  - `headline`: "See real sites we built."
  - `intro`: "Every one is deployed and live. Open any card and use it the way
    a customer would. Sample brands we built to show what we do, plus one real
    client engagement."
  - Drop the separate `offer` line's prominence is unchanged — keep `offer` as
    is (the "send us a link, we'll build in that style" copy still holds).
  - **No em dash** in the new intro (copy rule; not the approved exception).

**Pricing (`HomePricing`) — header + guarantee placement.**

- `PRICING_HEADLINE` becomes `['No surprises.', 'No hidden fees.'] as const`
  (drop "No BS.").
- Move the guarantee **above** the tiers as a "Before you commit" lead-in,
  using `RISK_REVERSAL` content (headline = `GUARANTEE.long`, plus the
  fixed-scope supporting line). Placed between the pricing headline and the
  tier grid.
- **Remove the duplicate** below-tiers guarantee panel that currently renders
  `GUARANTEE.long` again. Preserve `FOUNDING_CLIENT_NOTE` — fold it into the
  new "Before you commit" panel as a sub-line so the founding-slots note is not
  lost.

**CTA label — site-wide "Request a Call" → "Book a Free Call".**

- "Request a call sounds like we might not respond." Replace with the more
  specific, honest "Book a Free Call" (the call and the first design direction
  are genuinely free; no calendar is implied because the modal explains the
  by-email confirmation).
- Files carrying the shipped label: `Navbar.tsx`, `Footer.tsx`,
  `MobileCtaBar.tsx`, `Hero.tsx`, `CtaBand.tsx`, `AboutContent.tsx`,
  `ContactForm.tsx` (h1 "Request a Call." → "Book a Free Call."),
  `LocalSeoDetail.tsx`, `service-areas/page.tsx`, both guide pages, and
  `BookingModal.tsx` (eyebrow "Request a call" → "Book a free call").
- `CALL_STEPS` already describes the by-email flow and implies no calendar;
  leave it. The modal heading updates with the eyebrow above.
- Internal docs (`README.md`, `docs/sales-and-outreach.md`) are not shipped
  copy; leave them.

### 4. Contact / CTA band

- **Single CTA everywhere.** Remove the "Get a Free Mockup" secondary button
  from `Hero` and `CtaBand`. Each keeps one primary "Book a Free Call".
- **Mobile bar → single CTA too.** `MobileCtaBar` collapses from two buttons to
  one full-width "Book a Free Call". Rationale: since Calendly's removal both
  buttons route to the same `/contact` form (mockup only preselects a field),
  so the split reproduces the exact redundancy on the tightest surface. The
  mockup stays reachable via the form's "What do you need?" field and the
  `?intent=mockup` deep link.
- **More padding** on the `CtaBand` section (Tim: the contact section feels
  cramped). Increase vertical padding and the internal headline-to-CTA rhythm.

## Copy rules honored

- No em dashes in any new/edited shipped copy (the one approved exception,
  `PRICING_CUSTOM_LABEL`, is untouched).
- No fabricated proof: every WHY_RENDER pillar is literally true of the
  two-founder business today and links to where it can be verified.
- `lib/data.ts` remains the content source of truth for all of the above.

## Out of scope (this pass)

- Visual/design treatment — delivered as ideas for Claude Design, below.
- Deleting `PROOF_MARKERS`, `DIFFERENTIATORS`, `CornerTriangles` — left in place.
- Any pricing number changes (gated on the first real testimonial, separately).

## Visual ideas hand-off (for Claude Design — not built here)

Delivered as a separate list after implementation. Focus areas Tim named: the
homepage broadly, and WhyUs specifically ("still just a bunch of text").
