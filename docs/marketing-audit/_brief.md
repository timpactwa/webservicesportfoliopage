# Marketing Audit - Shared Grounding Brief

*Single source of truth for every audit agent. Read this fully before doing your cluster. Do not re-scrape the site - the current copy is transcribed below verbatim. Generated 2026-07-08.*

---

## 0. The assignment (from the founder, Tim)

> "Do a full marketing overhaul using every marketing skill. My website has too much fluff and isn't actually going to sell clients. New competition in my area has a website that's honestly better than mine for marketing. Research successful web-dev/marketing agencies, act as a potential client and tell me exactly what would sell me, then compare my site to the competition and tell me what to change to crush any competition in my area - more services, better wording, etc. Make the site feel extremely professional. Especially CRO."

Competitor decision: **benchmark the category** - study a set of successful local/SMB web-design & marketing agencies plus the JSN Marketing profile (in `competitor-profiles/jsn-marketing.md`), and benchmark Render against the strongest patterns across all of them. There is no single named local target.

Deliverable = a set of **markdown reports** in `docs/marketing-audit/`. Reports detail *what to change*; do not edit the live site in this pass. Be specific and prescriptive - exact copy rewrites, exact section changes, priority order. Cut fluff; the founder explicitly dislikes vague/AI-sounding copy and em dashes.

---

## 1. The business

**Render** - local web design, on-site SEO, and AI automation for small businesses in **Morris County, NJ**.

- Founders: **Tim Pactwa** (CS, Virginia Tech - builds the sites + AI) and **Luke Wilkins** (Finance/marketing, Virginia Tech - strategy).
- Domain: `renderlocalwebsites.com` · Email: `renderlocalwebsites@gmail.com`
- Booking: embedded Calendly (`calendly.com/wilkinsluke12/45min`). No web contact form (removed to keep booking low-friction).
- Stack: Next.js 14 App Router + Tailwind. Site currently mid-**warm-neutral rebrand** (graphite/surface/accent tokens, triangle-reveal motif, blur-to-sharp "resolve" animations).

### Positioning (from brand docs)
- Lead with the **business outcome** (better websites, better local visibility, less manual work), NOT "student-run." Founder story is supporting proof, introduced after the offer is clear.
- Voice: clear, confident, honest, modern, direct, not corporate. Avoid generic-agency template language, AI overpromises, vague buzzwords, fake case studies, enterprise-speak, em dashes.
- Core differentiators claimed: founder-led (no account managers/markup), modern fast Next.js builds, SEO included, transparent published pricing, real local presence, 2–4 week launch.

### Pricing (current, public)
- **Starter** $500 + $50/mo - 1–3 page site, mobile responsive, contact form, basic on-page SEO, GA setup.
- **Standard** $750 + $75/mo (highlighted) - 4–6 pages, service layouts, blog/news, local SEO, perf optimization, analytics + conversion tracking.
- **Premium** $2,000 + $125/mo - 7+ pages, booking/lead workflow, custom animations, expanded local SEO, analytics dashboard, priority launch.

Priced deliberately low as a founding-client wedge. Market rate for comparable local builds is ~$1,500–5,000 with $95–195/mo care plans. Plan: raise monthly tiers after 2–3 clients. AI automation is an add-on ($250–750 founding price) or standalone POC ($500+), not bundled by default.

### Sales motion
Lead list → verify site quality → personalized cold email referencing a real observation → phone follow-up 1–2 days later → free 45-min Calendly consult (diagnostic) → project summary + Stripe deposit + Google Forms intake → 2–4 week build. Benchmarks in use: ~7% SMB cold-email reply rate; 3-7-7 follow-up cadence captures ~93% of replies; Tue–Thu 8–11am; subject <6 words.

### Portfolio state
First paying client likely landed; **no real case study/testimonial published yet** (this is the single biggest proof gap). Portfolio is filled with 3 built-and-deployed demo sites + 1 consulting case study:
- **Fuego Street Tacos** - restaurant demo (menu, cart, simulated Stripe checkout). fuego-street-tacos.vercel.app
- **Hartline Builders** - contractor demo (blueprint hero, 5-step booking). hartline-builders.vercel.app
- **Marlowe Dental Studio** - dentist demo (5-step patient intake). marlowe-dental.vercel.app
- **Hope Tree Family Services** - real consulting case study (Luke, 180 Degrees Consulting at VT): nonprofit foster-parent recruitment strategy, KPI playbook, 90-day launch plan.

---

## 2. Site map & full current copy (verbatim)

Pages: `/` (Home), `/services`, `/work`, `/about`, `/contact`. Nav: Home, Services, Work, About, Contact.

### HOME
**Hero** - eyebrow "Web Design & AI · Morris County, NJ"; H1 "We Build the Web / for Local Business." (second line accent-colored); sub "Render is a founder-led studio building fast, modern websites and practical AI tools for local businesses across Morris County, NJ."; CTAs [Book a Call] [View Services]; footnote "Fixed, published pricing. Clear scope. You see the number before you ever book a call."

**TrustStrip** (TRUST_MARKERS): Founder-led - "You work directly with the people building your site. No account managers, no markup." · Next.js builds - "Modern, fast-loading sites engineered for performance and search, not slow templates." · SEO included - "On-site local SEO comes standard with every website we build." · 2–4 week launch - "Typical timeline from kickoff to launch once we have your content and direction."

**WhatWeDo** - eyebrow "What We Do"; H2 "Two services. One focused team."; Card 1 "Web Design & Development - Custom Next.js sites that load fast, rank in local search, and turn visitors into customers." Card 2 "AI Consulting & Automation - Lead follow-up, intake, and busywork, handled."

**PortfolioTeaser** - renders featured PROJECTS (the 3 demos + Hope Tree).

**ProofBar** (PROOF_MARKERS) - eyebrow "Nothing here you have to take our word for": Pricing on the page - "Every package price is published right here. No 'contact us for a quote,' no sales call before you see a number." · Two real founders - "Tim and Luke, Virginia Tech, based in Morris County. Named, reachable, and on every project." · Live demo sites - "The work above is clickable, not a screenshot. Open any demo and use it the way a customer would."

**WhyUs** (WHY_US_ITEMS): 01 You Pay For The Work - "No account managers, no agency markup, no layers between you and the people building your site." · 02 Modern Tech Stack - "Fast, modern websites built for performance, not outdated templates that slow you down." · 03 Straight Talk - "We tell you exactly what we're building, what it costs, and when it's done." · 04 Invested Partners - "Your site is our portfolio. We care about your results because they're our reputation."

**FAQ** (8 items): How much does a website cost? / How long until my site launches? / Do I own my website? / What do I need to have ready? / Is SEO included? / What does the monthly fee cover? / I get my customers from Facebook and word of mouth. Why add a website? / Do you only work with Morris County businesses? (Full answers in `lib/data.ts` FAQ_ITEMS; JSON-LD FAQPage schema is emitted on home.)

### SERVICES (`/services`)
H1 "What we do, and what it costs." sub "Clear scope. Clear pricing. No surprises."
Web section: eyebrow "Web Design & Development"; H2 "Modern websites for businesses that mean business."; "We build and launch sites for local businesses across Morris County, NJ, with a process that gets you live in 2–4 weeks." Feature list: Custom-built mobile-ready websites / Mobile-first responsive design / On-page SEO foundation / Fast turnaround (2–4 weeks) / Monthly maintenance plans / Performance-optimized (Core Web Vitals). Then the 3 pricing cards. Then CTA card "Not sure which package fits? Book a free call and we'll tell you straight." [Book a Call]
"How We Start" section: H2 "Bring whatever you have. We take it from there." + list (photos / wireframes / design concepts / just an idea).
AI section (dark): eyebrow "AI Consulting & Automation"; H2 "Quiet automation for the work you shouldn't be doing by hand."; body about small reliable systems; use cases: after-hours questions triaged overnight / website leads routed to spreadsheet or CRM / review requests that send themselves / SOPs that stay current. CTA [Talk to Us About AI].

### ABOUT (`/about`)
H1 "Built for local. Priced in the open."; eyebrow "Our Mission"; mission "Tim brings the software. Luke brings the strategy. Together we help local businesses get modern websites and practical digital tools without the retainer, the markup, or the six-week sales process. No overhead, no middlemen, just two people who care about the work." Team cards (Tim + Luke bios, GitHub/LinkedIn). Values (dark): Quality over quantity / Transparency always / Skin in the game.
Tim bio: "Hi! I'm Tim, a junior Computer Science student at Virginia Tech. I build the websites and oversee AI automation. I'm currently researching XR security through Spatial Seer, most recently placing 3rd at VT's Undergraduate Research Symposium, and building DBWorkout, a gamified tool for learning SQL. I'm also interning in IT and Asset Management at Suburban Propane..."
Luke bio: "I handle the strategy. Business and marketing student focused on helping local businesses tell their story online and grow their customer base without burning money."

### CONTACT (`/contact`)
H1 "Book a Call."; "Choose a time for a free consultation. We'll use the call to understand what you need and whether we can help." Info: pick any time / renderlocalwebsites@gmail.com / Morris County, NJ. Reassurance card "Not sure what you have ready? Bring whatever you've got..." Calendly embed (click-to-load facade) + "Prefer to book directly? Open Calendly".

### WORK (`/work`)
Portfolio grid of the 4 projects above; demo cards link out to live Vercel demos; Hope Tree has a full case-study detail page.

---

## 3. Competitor snapshot - JSN Marketing (full profile in competitor-profiles/jsn-marketing.md)
Nationwide FL LLC selling a bundled "systems" package (website + AI voice receptionist + paid ads/SEO + automated follow-up + CRM). Tagline "Stop losing leads to outdated websites." NO pricing anywhere (gated "free audit" funnel), NO named founders/team/photos, ZERO reviews/case studies/testimonials, ~200 templated programmatic location pages, near-verbatim duplicated vertical copy. Strengths vs Render: broader bundled menu, louder nationwide scale. Render's edge: named credentialed founders, real local presence, transparent pricing, direct access, growing real portfolio. Read: more marketing surface than proven traction; risk is narrative not substance.

---

## 4. Known weaknesses/gaps to pressure-test (founder + prior review flagged these)
- No real client case study/testimonial yet (portfolio is demos + 1 consulting project). Biggest credibility gap.
- Possible "fluff" in current copy the founder wants cut.
- Hero H1 "We Build the Web for Local Business" is brand-forward, not outcome/pain-forward.
- Only 2 headline services (web + AI). Competitor bundles more (ads, CRM, AI voice, reviews). Open question whether to expand the offer.
- No visible guarantee, no risk-reversal, no "what you get / process" timeline visualization, no lead magnet, no reviews/ratings, no social proof numbers.
- Contact = Calendly only; 45-min consult may be a heavy first ask; no lighter-weight conversion (e.g., "get a free homepage mockup" / instant estimate).
- Pricing may be too low (signals low quality) and monthly plans under market.
- No blog/content engine, minimal programmatic-SEO surface, unknown analytics depth.

---

## 5. Rules for your report
- Write to `docs/marketing-audit/<your-assigned-filename>.md`.
- Be concrete: quote the current copy, then give the exact replacement. Prioritize (P0/P1/P2). No fluff, no em dashes.
- At the top of your report, list which marketing Skills you invoked (via the Skill tool) and one line on what each contributed. If a skill genuinely doesn't apply to a lead-gen agency marketing site, say so honestly in one line rather than inventing work - but address every skill in your cluster.
- Ground every recommendation in either the current copy (section 2), the competitor benchmark, or a named marketing principle.
