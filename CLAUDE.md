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

Next.js 14 App Router. All routes are in `app/` (`page.tsx`, `services/`, `work/`, `about/`, `contact/`). Shared layout is `app/layout.tsx` + `components/layout/Navbar.tsx` / `Footer.tsx`.

**Content source of truth:** `lib/data.ts` — nav links, pricing tiers, team members, project cards, why-us items all live here. Update copy here, not inside components.

**Components:** page-level sections in `components/sections/`, reusable primitives in `components/ui/`.

**Styling:** Tailwind-only. Custom tokens in `tailwind.config.ts`: `accent` (blue), `charcoal` (near-black), `display-*` font sizes, `bg-grid-pattern`. Use existing tokens before adding new ones.

**Client components:** add `'use client'` only when using Framer Motion or React state. Keep pages as server components by default.

**Contact form:** currently simulates submission with local state only — not wired to any endpoint yet.
