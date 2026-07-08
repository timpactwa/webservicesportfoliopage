# Render design system — conventions

Render is a Tailwind-only design system. There is no component prop-based theming and no CSS-in-JS — every visual decision is expressed as Tailwind utility classes, backed by a small set of custom tokens layered on top of Tailwind's defaults. No provider/wrapper is required: components render correctly standalone.

## Styling idiom: Tailwind utilities + custom tokens

Style everything with Tailwind utility classes. On top of Tailwind's stock scale, this system adds:

| Token family | Real classes | Use for |
|---|---|---|
| Brand blue | `bg-accent` `text-accent` `border-accent` (`#2563EB`), `-light` (`#3B82F6`), `-dark` (`#1D4ED8`) | Primary actions, links, highlights |
| Near-black | `bg-charcoal` `text-charcoal` (`#0F0F0F`), `-soft` (`#1A1A1A`), `-muted` (`#2A2A2A`) | Body text, dark sections, headings |
| Display type | `text-display-2xl` `text-display-xl` `text-display-lg` `text-display-md` (fluid `clamp()` sizes, tight tracking) | Hero/marketing headlines — not for body copy |
| Card elevation | `shadow-card` (resting), `shadow-card-hover` (hover state) | Cards, tiles |
| Background texture | `bg-grid-pattern` | Subtle full-bleed section backgrounds |

Headings (`h1`–`h3`) default to `font-weight: 900` and tight tracking site-wide — don't re-set `font-bold` on them. Buttons and cards use sharp corners (no `rounded-*` on primary UI — see `Button`, `PricingCard`, `ServiceCard`), which is a deliberate brand choice, not an oversight.

Body font is Inter (loaded via a Google Fonts `@import` at the top of the bundled stylesheet — already wired, nothing to add). Fallback stack is `system-ui, sans-serif`.

## Where the truth lives

Read `_ds_bundle.css` (bound into every design via `styles.css`'s `@import`) for the full compiled utility set and exact token values before styling. Each component's `.prompt.md` documents its own props.

## Composing with these components

```tsx
<PricingCard
  tier="Standard"
  priceRange="$750"
  monthlyRange="$75/mo"
  isHighlighted
  ctaHref="/contact"
  features={['4-6 page website', 'Local SEO setup', 'Performance optimization']}
/>
```

`Button` is the standard CTA — variants `primary` (solid accent), `secondary` (outlined), `secondary-inverse` (outlined white, for dark backgrounds), `ghost` (text link). Use `secondary-inverse` on any `bg-charcoal`/dark section, never plain `secondary`.

## Known gaps (see NOTES.md for detail)

- `Logo` is excluded from this sync (being redesigned).
- `TeamMember`'s `image` prop and any component referencing `/public/*` paths won't resolve inside these previews — supply real image URLs when composing actual pages.
