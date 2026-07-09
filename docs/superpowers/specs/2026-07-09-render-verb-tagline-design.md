# Render-Verb Tagline Band

Date: 2026-07-09
Status: approved, not implemented

## What we're building

A late-homepage band that turns the company name into a verb:

```
We don't just render websites.
We render [leads → bookings → customers]
```

The final word is a slot. On scroll-into-view it resolves through `leads`, then
`bookings`, then locks permanently on `customers`. Each word arrives blurred and
sharpens, reusing the same blur-to-sharp verb `ResolveText` already uses for the
hero headline. The animation is not decoration bolted onto the pun. The word
literally renders, which is what the sentence claims the company does.

## Why the rotation replaces the enumeration

The original idea was written as four sentences: "We don't just render websites.
We render leads. We render bookings. We render results." A rotating slot is a
compression device, so enumerating all three in prose and then also cycling them
says the same thing twice. We rotate, so the prose collapses to two lines.

`results` was dropped. `leads`, `bookings`, and `customers` are all things a
Morris County contractor or dentist can picture; `results` is the word every
agency uses. It also occupied the position the slot holds forever, so the
rotation would have decayed from concrete to generic and then stopped there.

`customers` bookends the H1, which reads "A Website That Actually / Brings You
Customers." The page now opens and closes on one promise.

## Why it is not in the hero

Three reasons, in descending order of how much they cost.

1. `docs/design-audit-2026-07.md` flags that the `<h1>` is the LCP element and
   ships as `opacity: 0`, with the CTA delayed roughly 1.5 seconds.
   `Hero.tsx` confirms it (`resolve(1.15)` through `resolve(1.6)`). A word that
   animates inside the H1 means the LCP element never settles.
2. Google indexes one frame. An H1 whose text changes is an H1 whose indexed
   text is a coin flip.
3. `CLAUDE.md` bans fabricated proof, `TESTIMONIALS` is deliberately empty, and
   there are zero signed website clients. The site's whole argument is "don't
   take our word for it, click the demo." Leading with a boast inverts that. The
   line works as a closer, on someone who has already seen a demo and a price.

## Placement

`app/page.tsx`, between `<HomeServices />` and `<HomeContact />`.

The existing composition comment describes each section as answering the next
question a convinced visitor asks. By this point they have seen the demos
(`HomeWork`), the price (`HomePricing`), the objections (`Faq`), and the service
list (`HomeServices`). The band is the last thing before the contact form.

## Components

Two, matching the existing `sections/` + `ui/` split.

### `components/ui/ResolveWord.tsx` (client leaf)

Deliberately a sibling to `ResolveText.tsx`. Shares its `EASE`
(`[0.22, 1, 0.36, 1]`), its blur-to-sharp transition, and its accessibility
pattern.

Props:

| Prop | Type | Meaning |
|---|---|---|
| `words` | `string[]` | Resolved in order. The last entry is the resting word. |
| `holds` | `number[]` | Seconds each non-final word holds. Length `words.length - 1`. |
| `duration` | `number` | Resolve duration per word. Default `0.5`. |
| `blur` | `number` | Unresolved blur in px. Default `8`. |
| `className` | `string` | Applied to the slot. |

Behavior:

- Fires once via Framer's `useInView(ref, { once: true, margin: '-10% 0px' })`,
  the same trigger `ResolveText` uses. One observer for one element is fine; the
  shared-observer optimization in `Reveal.tsx` exists because the homepage mounts
  two dozen `Reveal`s, not because a single observer is expensive.
- Each word animates from `{ opacity: 0, y: 6, filter: blur(8px) }` to
  `{ opacity: 1, y: 0, filter: blur(0px) }` over `duration` on `EASE`.
- Holds decelerate: `leads` for ~0.55s, `bookings` for ~0.75s, then `customers`
  locks. Total run is roughly 1.8s, after which nothing on the band moves. This
  matters because the primary CTA sits directly beneath it.
- Under `prefers-reduced-motion: reduce`, the final word renders sharp and static
  on the first frame and the sequence never runs. `Reveal.tsx` sets the
  precedent: check `matchMedia` and skip the observer entirely.

### `components/sections/RenderPromise.tsx` (server component)

Wraps `ResolveWord` in the band. Server component; `ResolveWord` is the only
client leaf, consistent with the `Reveal` / `TriangleHeading` pattern.

Layout: `container-studio`, left-aligned, `text-display-lg` on both lines. Lead
line in `text-graphite`, the verb phrase in `text-graphite`, the slot word in
`text-accent-dark`. Vertical rhythm matches the site's `py-20 md:py-32`.

## Accessibility and SEO

Two separate mechanisms, because `aria-hidden` does nothing for Googlebot.

### The server renders only the settled word

`ResolveWord` renders `words[words.length - 1]` and nothing else on the server.
The earlier words (`leads`, `bookings`) are injected client-side, after mount,
when the slot scrolls into view.

Consequences, all of them the ones we want:

- SSR HTML reads `We don't just render websites. We render customers.` That, and
  only that, is what Googlebot indexes and what a no-JS visitor sees.
- The initial client render matches the server render exactly, so there is no
  hydration mismatch. The extra words enter via state set in an effect, never
  during the first render pass.
- The slot is already sized for `customers` before any JS runs, so the reserved
  width is correct from the first paint.

Stacking all three words in the SSR DOM was the original plan and was wrong: the
indexed text would have been `We render leads bookings customers`.

### The accessible name

The band's entire text content is `aria-hidden="true"`, and the parent `<p>`
carries the sole accessible name:

```
aria-label="We don't just render websites. We render customers."
```

Note this covers the static lead line too, not just the animated slot. An
`aria-label` on an element replaces its whole subtree for assistive tech, so the
label must contain the full sentence. This is exactly the pattern
`ResolveText.tsx` uses at line 55, where the parent takes
`aria-label={lines.join(' ')}` and every child span is `aria-hidden`.

Do not instead put `aria-label` on the slot `<span>` alone. A bare labelled span
has no role and is not reliably announced.

## Layout shift

`leads`, `bookings`, and `customers` have different widths. Swapping them in
normal flow reflows the line on every cycle, and CLS is a Core Web Vital.

Fix: once the client has injected them, stack the words in a single CSS grid
cell so they overlap instead of reflowing. In Tailwind, `grid` on the slot and
`col-start-1 row-start-1` on every child.

```
<span class="grid">                            <!-- slot -->
  <span class="col-start-1 row-start-1">leads</span>      <!-- client-only -->
  <span class="col-start-1 row-start-1">bookings</span>   <!-- client-only -->
  <span class="col-start-1 row-start-1">customers</span>  <!-- also in SSR -->
</span>
```

The slot is sized by its widest child. The widest word is `customers`, which is
also the only word present at SSR and the word it rests on. So the slot's width
is correct from the first paint, never changes when the shorter words are
injected, and the cumulative shift is exactly zero.

That `customers` is simultaneously the longest word and the resting word is load
bearing. If the word list is ever reordered so it rests on a shorter word, the
slot must be explicitly width-locked to the longest entry or this guarantee is
lost.

While `leads` and `bookings` show, they sit left-aligned in a slot sized for
`customers`, leaving trailing space to the right. **This is why the band is
left-aligned rather than centered.** A centered line would appear subtly
off-center for the first two words and then snap true. Left-aligned, the ragged
right edge reads as intentional, and a two-line statement at display size reads
more like a signature than a banner. The alternative, animating the slot width,
was rejected: it reintroduces motion next to the CTA to solve a problem that
alignment solves for free.

## Content source of truth

Both strings live in `lib/data.ts`, per the rule in `CLAUDE.md` that structured
content does not live inside components:

```ts
export const RENDER_PROMISE = {
  lead: "We don't just render websites.",
  verb: 'We render',
  words: ['leads', 'bookings', 'customers'],
} as const
```

## Styling constraints

Existing tokens only, per `CLAUDE.md`. Everything needed already exists in
`tailwind.config.ts`: `accent.dark`, `graphite`, `graphite.soft`, `surface`,
`hairline`, `display-lg`. No new tokens.

Copy rule: no em dashes. The two lines use periods.

## Testing and verification

No test suite is configured, so verification is:

1. `npm run build` passes. Not a dev-server check. Stop `next dev` first: the two
   share `.next` and corrupt each other's chunks.
2. **View source** (not the inspector, which shows the hydrated DOM) on the built
   `/`. The HTML must contain `customers` exactly once in the band, and must not
   contain `leads` or `bookings` anywhere in it. Confirm the `aria-label` reads
   `We don't just render websites. We render customers.`
3. Disable JS, reload, confirm the band reads as a complete static sentence.
4. DevTools, emulate `prefers-reduced-motion: reduce`, reload, confirm
   `customers` is sharp on the first frame and no sequence runs.
5. Performance panel, confirm CLS contribution from the band is 0.
6. Confirm the band does not animate after it settles, with the CTA in frame.
7. No hydration warning in the console on `/`.

## Out of scope

- Touching the hero. The `opacity: 0` H1 and the 1.5s CTA delay are real defects,
  but they are the audit's to fix, not this change's.
- Reusing the line on `/about`, in the footer, or in outreach copy. If it works
  here, those are separate calls.
- Any change to `TESTIMONIALS` or the no-fabricated-proof posture.
