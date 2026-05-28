# Render Master Guide

This repository contains the website and operating documentation for Render, a local web design, AI automation, and on-site SEO business founded by Luke Wilkins and Tim Pactwa.

Use this README as the master map. It explains the project at a high level, captures the current decisions, and routes into the detailed docs when more context is needed.

## Project Overview

Render helps local businesses modernize their online presence and reduce manual work.

The first version of the project has two connected goals:

- Build a polished public website that gets local business owners to book a call.
- Build a repeatable operating system for finding leads, collecting client information, taking payment, building websites, and learning from each project.

The business is starting in Morris County, NJ, with Randolph as the first focused lead source. The current emphasis is landing early proof-of-concept clients, even if founding-client pricing is lower than long-term pricing.

## Current Decision Snapshot

| Area | Current decision |
| --- | --- |
| Business name | Render |
| Founders | Luke Wilkins and Tim Pactwa |
| Starting market | Morris County, NJ, starting with Randolph |
| Future market | Broader NJ and nearby local-service markets |
| Services | Websites, practical AI automations, and on-site SEO for websites we build |
| Positioning | Lead with business outcomes; use the founder-led/student story as supporting context |
| Primary CTA | Book a Call |
| First lead source | https://randolphlocal.com/directory/ |
| First lead segment | Businesses with no website listed, manually verified before outreach |
| Outreach motion | Personalized email, then call follow-up |
| Booking stack | Calendly scheduling link with meeting details handled by Calendly |
| Website domain | renderlocalwebsites.com |
| Public email | renderlocalwebsites@gmail.com |
| Public lead form | Removed for now to keep booking low-friction |
| Intake stack | Google Forms first; Typeform later only if polish becomes worth the cost |
| Payment stack | Stripe Payment Links after the call |
| Minimum founding-client project | $500 when the project creates useful proof or a strong first case study |
| Maintenance | Optional, starting at $50/mo for founding clients |
| Revisions | Unlimited before launch within the agreed project scope |
| Strategy review | Revisit after 2-3 weeks of real outreach and planning |

## Documentation Map

| Doc | What it covers | Use it when |
| --- | --- | --- |
| [Project Goal](docs/project-goal.md) | Business direction, audience, positioning recommendation, success criteria, operating assumptions | You need the high-level purpose or current business assumptions |
| [Content and Brand Guide](docs/content-and-brand.md) | Positioning, voice, services, pricing, AI automation packaging, turnaround time, visual direction | You are changing website copy, pricing, service language, or brand tone |
| [Lead Generation Plan](docs/lead-generation-plan.md) | Randolph Local source, no-website lead segment, verification steps, data fields, outreach angle | You are building or reviewing the lead list |
| [Sales and Outreach](docs/sales-and-outreach.md) | Outreach process, email template, call script, lead tracking, sales call goal | You are contacting businesses or preparing for sales calls |
| [Client Onboarding](docs/client-onboarding.md) | Google Forms intake, Stripe links, payment flow, revisions, maintenance, handoff | A lead becomes serious or a client is ready to start |
| [Automation Operating Model](docs/automation-operating-model.md) | Internal automation philosophy, data collection, future automated workflow, constraints | You are deciding what to automate or how to structure repeatable operations |
| [Development Workflow](docs/development-workflow.md) | Local setup, GitHub flow, validation, deployment readiness | You are working in the codebase |
| [Technical Notes](docs/technical-notes.md) | App structure, content source of truth, styling, client components, contact form state | You need codebase orientation or implementation details |
| [Brainstorming](docs/brainstorming.md) | Decisions made, open questions, recommendations, unsettled ideas | You are refining strategy before promoting decisions into the main docs |

## Branch Map

```text
README.md
|-- Strategy and positioning
|   |-- docs/project-goal.md
|   `-- docs/content-and-brand.md
|-- Lead generation and outreach
|   |-- docs/lead-generation-plan.md
|   `-- docs/sales-and-outreach.md
|-- Client onboarding and payments
|   `-- docs/client-onboarding.md
|-- Automation operating model
|   `-- docs/automation-operating-model.md
|-- Development workflow
|   |-- docs/development-workflow.md
|   `-- docs/technical-notes.md
`-- Open questions
    `-- docs/brainstorming.md
```

## Business Workflow

The current standard flow is:

```text
Lead generation
-> No-website lead verification
-> Personalized email outreach
-> Call follow-up
-> Calendly booking
-> Google Meet consultation
-> Project summary
-> Stripe deposit link
-> Google Forms intake
-> Build
-> Client review
-> Revisions within agreed scope
-> Final payment
-> Launch
-> Optional $50/mo maintenance
```

Key operating rule: do not treat scraped or directory data as truth. A missing website field on Randolph Local is a lead signal, not proof. Verify each lead manually before outreach.

## Technical Workflow

Project folder:

```bash
cd /Users/lukewilkins/Documents/Codex/2026-05-25/Websolutions/webservicesportfoliopage
```

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open locally:

```text
http://localhost:3000
```

Validate changes:

```bash
npm run lint
npm run build
```

GitHub repo:

```text
https://github.com/timpactwa/webservicesportfoliopage
```

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- npm

## Source of Truth Rules

- Use this README to find the right doc.
- Use the detailed docs for actual decisions and process details.
- Update the detailed doc first when a decision changes.
- Update this README only when the master snapshot or document map changes.
- Keep rough or unsettled thinking in [Brainstorming](docs/brainstorming.md) until it becomes a real decision.

## Open Decisions

Open questions live in [Brainstorming](docs/brainstorming.md). Do not duplicate the full list here.

Current high-impact open areas include:

- Long-term pricing after founding clients.
- Whether AI automations become standalone packages or mostly website add-ons.
- Which industries to target after no-website Randolph leads.
- Final booking link name.
