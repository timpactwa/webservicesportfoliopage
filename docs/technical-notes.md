# Technical Notes

## App Structure

Routes live in `app/`:

```text
app/page.tsx
app/services/page.tsx
app/work/page.tsx
app/about/page.tsx
app/contact/page.tsx
```

Shared layout lives in:

```text
app/layout.tsx
components/layout/Navbar.tsx
components/layout/Footer.tsx
```

Section components live in:

```text
components/sections/
```

Reusable UI components live in:

```text
components/ui/
```

Shared project content lives in:

```text
lib/data.ts
```

Utility helpers live in:

```text
lib/utils.ts
```

## Content Source of Truth

Use `lib/data.ts` for structured content that appears in repeated components:

- Navigation links
- Pricing tiers
- Team members
- Project cards
- Why-us items

This keeps copy updates simple and reduces duplication.

## Styling

Tailwind is the primary styling system.

Global styles are in:

```text
app/globals.css
```

Theme extensions are in:

```text
tailwind.config.ts
```

Current custom theme values include:

- `accent`
- `charcoal`
- display font sizes
- `container-studio`
- `bg-grid-pattern`

Prefer using existing tokens before adding new ones.

## Client Components

Components using Framer Motion or React state should include:

```tsx
'use client'
```

Static pages should stay server components unless they need browser behavior.

## Contact Page

The contact page currently:

- Shows an inline Calendly embed for the free consultation booking link
- Loads Calendly's external widget script client-side
- Keeps contact details beside the scheduler

There is no public lead form on the page right now. The goal is to reduce friction and get prospects onto a call first.

Keep the full project intake separate. Detailed project information should be collected later through Google Forms after the lead has booked a call or shown serious interest.

Future implementation options:

- API route plus email provider
- Formspree or similar hosted form endpoint
- CRM integration
- Google Sheet or Airtable-style lead capture

When connecting a real endpoint, include error handling and a visible failure state.

## Build Commands

Development:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

## Known Cleanup Items

- Rename package from `studio-temp2` to a project-specific name.
- Replace the default favicon.
- Replace placeholder content.
- Add real portfolio visuals or clearly labeled demo work.
- Update metadata once the final brand and domain are known.
