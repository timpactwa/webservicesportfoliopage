# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Docs

All strategy, sales, onboarding, and workflow context lives in `docs/`. Read these files before making decisions beyond code mechanics:

- `docs/project-goal.md` — vision, audience, positioning, priorities, out-of-scope
- `docs/technical-notes.md` — app structure, styling system, component rules, known cleanup items
- `docs/development-workflow.md` — local setup, git flow, deployment checklist
- `docs/content-and-brand.md` — voice, copy rules, pricing tiers, visual direction
- `docs/sales-and-outreach.md` — lead strategy, outreach templates, lead tracking fields
- `docs/lead-generation-plan.md` — Randolph Local as first lead source, verification workflow
- `docs/client-onboarding.md` — full client flow from lead to launch
- `docs/automation-operating-model.md` — manual-first philosophy, future automation vision
- `docs/brainstorming.md` — settled decisions and open questions

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run lint     # lint
npm run build    # production build
```

No test suite is configured yet.

## Architecture

Next.js 14 App Router. Routes in `app/`: `/` home, `/services` (hub) + `/services/web-design` (owns the pricing grid) + `/services/local-seo` + `/services/ai-automation`, `/estimate` (instant cost estimator), `/work`, `/service-areas`, `/guides` + two guide articles, `/about`, `/contact`. Shared layout is `app/layout.tsx` + `components/layout/Navbar.tsx` / `Footer.tsx` / `MobileCtaBar.tsx`.

**Content source of truth:** `lib/data.ts` — nav links, pricing tiers, team members, project cards, why-us items, FAQ, service towns, demo disclaimer, guarantee copy all live here. Update copy here, not inside components.

**Components:** page-level sections in `components/sections/`, reusable primitives in `components/ui/`.

**Styling:** Tailwind-only. Custom tokens in `tailwind.config.ts`: `accent` (blue), `charcoal` (near-black), `display-*` font sizes, `bg-grid-pattern`. Use existing tokens before adding new ones.

**Client components:** add `'use client'` only when using Framer Motion or React state. Keep pages as server components by default (`Reveal`/`TriangleHeading` are client leaves usable from server pages).

**SEO plumbing:** every page sets its own relative `alternates.canonical` (never a root-level canonical — it cascades and marks children as homepage duplicates). JSON-LD builders live in `lib/schema.ts` (breadcrumb, service, article). `public/llms.txt` and `public/pricing.md` exist for AI-search citability; keep them in sync when pricing or services change. New routes must be added to `app/sitemap.ts`.

**Analytics:** GA4 via `components/Analytics.tsx`, gated on `NEXT_PUBLIC_GA_ID` (empty = zero analytics JS shipped). Fire events with `track()` from `lib/analytics.ts`. Current events: `request_call_submit`, `estimate_complete`, `mockup_request`, `tier_cta_click`.

**Copy rules:** no em dashes anywhere in shipped copy. No fabricated proof: `TESTIMONIALS` in `lib/data.ts` stays empty until a real client quote exists, and the three demo sites are always labeled as demo templates, not client work.

**Contact form:** `/contact` is an on-site "request a time" form (`components/ui/RequestCallForm.tsx`) that POSTs to Web3Forms and emails `renderlocalwebsites@gmail.com`. Needs `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` and in Vercel env vars; without it the form shows a graceful "email us instead" error. Calendly has been removed entirely. Deep links: `?tier=Starter|Standard|Premium|Custom` and `?intent=mockup|ai|seo` preselect the "What do you need?" field.
