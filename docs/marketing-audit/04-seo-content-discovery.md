# SEO, Content & Discovery Audit

*Cluster: Technical/local SEO, site architecture, programmatic SEO, AI search (AEO), schema, content strategy, analytics, ASO.*

---

## 1. Skills invoked

- **seo-audit** - technical/on-page/local SEO audit framework (crawlability, titles, headings, images, Core Web Vitals posture, NAP/GBP local signals).
- **ai-seo** - AEO/GEO framework for getting cited by ChatGPT, Perplexity, Google AI Overviews; extractability, authority, presence pillars; robots.txt AI-bot check.
- **schema** - structured data types, JSON-LD patterns, `@graph` combination, validation approach for LocalBusiness/Service/Breadcrumb/Review schema.
- **site-architecture** - page hierarchy design, URL patterns, nav rules, internal linking, hub-and-spoke model used for the town x service structure below.
- **programmatic-seo** - the 12 pSEO playbooks (Locations playbook applied), quality/anti-thin-content guardrails, data defensibility hierarchy.
- **content-strategy** - searchable-vs-shareable framework, buyer-stage keyword mapping, content pillar/topic cluster structure used for the 10-title plan.
- **analytics** - GA4 event naming conventions, tracking plan structure, UTM strategy, conversion definitions.
- **aso** - genuinely does not apply. Render has no mobile app; there is no App Store/Google Play listing to optimize. One line, no invented work.

---

## 2. Technical + on-page local SEO audit

Grounded in direct file review of `app/layout.tsx`, `app/page.tsx`, `app/{services,work,about,contact}/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, `components/`, and the prior internal audit at `docs/superpowers/specs/2026-07-03-perf-a11y-seo-ux-audit.md`. Several items flagged in that prior audit (sitemap/robots domain fallback, homepage OG description, JSON-LD `sameAs`) have already been fixed as of this session - noted below so they aren't re-flagged as open issues.

### What's already solid (confirmed, no action needed)
- One `<h1>` per page, enforced by the `title: { default, template: '%s | Render' }` pattern in `app/layout.tsx`.
- Per-page unique titles and meta descriptions, all in a reasonable length range.
- `metadataBase`, canonical tags, OpenGraph, and Twitter card metadata present site-wide.
- `app/sitemap.ts` and `app/robots.ts` both correctly default to `https://renderlocalwebsites.com` - the earlier domain-mismatch bug (`renderagency.dev` fallback) is fixed.
- Homepage `openGraph` now includes both `title` and `description` - the earlier "lost OG description" bug is fixed.
- Site-wide `ProfessionalService` JSON-LD in `app/layout.tsx` now includes `sameAs` (both founders' LinkedIn) and an `address` object - the earlier thin-schema gap is partly fixed (see Section 6 for what's still missing).
- FAQPage JSON-LD emitted on `/`, sourced from `FAQ_ITEMS` in `lib/data.ts` - good, single source of truth.
- Next/Font with `display: 'swap'`, image alt text present and mostly descriptive on the `/work` gallery (`components/sections/WorkGrid.tsx`).

### P0 - Fix now

1. **Zero Google Business Profile.** Per `docs/lead-generation-plan.md` and `docs/client-onboarding.md`, GBP is currently something Render only sets up *for clients* - Render's own business has no confirmed GBP presence. For a local-SEO agency, this is close to disqualifying: "we do local SEO" while not ranking in the local 3-pack for "web designer Morris County NJ" is a credibility gap a prospect can check in 10 seconds. Fix: register Google Business Profile under a real or virtual service-area address (service-area business type, no storefront required), category "Website Designer" + "Internet Marketing Service," add both founders as photos, link to `renderlocalwebsites.com`, request the free first review from the first paying client. This is a P0 because everything else in this report (reviews schema, AggregateRating, AI citation, local pack ranking) depends on it existing.

2. **On-page copy is keyword-thin outside metadata.** "Morris County, NJ" appears in visible body copy only in Hero, ContactForm, Footer (×2), and one line of `ServicesDetail.tsx`. Zero mentions in `/work` body copy, `/about` body copy. Metadata carries far less on-page ranking weight than real heading/paragraph text search engines actually parse as content. Fix: naturally add "Morris County, NJ" or a specific town name into at least one H2/H3 or paragraph on `/work` and `/about`. Concrete edit for `/work` (`components/sections/WorkGrid.tsx` intro, currently mentions the phrase already at line 97 - extend it) and add one sentence to `AboutContent.tsx` mission block, e.g., append: "We're based in Morris County and build for businesses across towns like Randolph, Denville, and Morristown."

3. **No NAP (Name/Address/Phone) consistency anywhere.** Render has no published phone number (by design - Calendly-first) and no street address (by design - no storefront). That's a legitimate business choice, but it means Google has nothing to anchor local relevance to beyond the `areaServed` schema field and the word "Morris County" in text. Minimum fix: add a phone number even if it's a Google Voice number routed to Tim/Luke - GBP verification and local-pack ranking both weight phone presence heavily, and prospects calling instead of booking a 45-minute Calendly slot is a lighter-friction path some will prefer (ties into the CRO cluster's note about the Calendly-only funnel being a heavy first ask).

### P1 - High-impact, do next

4. **Five pages is thin for a local-SEO business by its own logic.** Render's own pitch is "on-site local SEO comes standard" - but the site itself has almost no local-SEO surface. See Section 3 for the full recommended architecture; this is the single biggest opportunity in this report.

5. **Internal linking is minimal by necessity of page count.** With only 5 pages, there's nothing to over-link or under-link yet - but as soon as the architecture in Section 3 ships, apply the hub-and-spoke model: `/services` is the hub, each dedicated service page is a spoke, each spoke links back to `/services` and forward to relevant town pages; town pages link back to their parent service page and sideways to 2-3 neighboring towns.

6. **Team headshot alt text is name-only** (`components/ui/TeamMember.tsx:40`, `alt={name}`). Low priority but free: add role, e.g. `alt="Tim Pactwa, co-founder and web developer at Render"` - minor image-search and accessibility value.

7. **No per-service `Service` schema yet.** Reasonable to have skipped this at 2-service scale; becomes necessary once the dedicated service pages in Section 3 ship. See Section 6.

### P2 - Low priority / monitor

8. **Core Web Vitals posture** - not independently measured this pass (would need PageSpeed Insights against the live deploy), but the codebase shows good hygiene: `next/font` with `display: swap`, lazy-mounted iframes for demo previews (per prior audit), click-to-load Calendly facade already implemented in `ContactForm.tsx`. No action needed unless a live Lighthouse run turns up regressions - flag for the performance-cluster agent to confirm with real Lighthouse numbers.

9. **Robots.txt allows `*`** with no AI-bot-specific rules (`app/robots.ts`). This is correct for now - see Section 5, no changes needed unless Render later wants to block AI training bots while keeping citation bots allowed.

10. **Sitemap has no `lastModified` variance** - every entry uses `new Date()` at build time, meaning every page shows the same last-modified timestamp on every deploy. Cosmetic; not worth fixing until real content-freshness signals (blog posts, town pages) exist.

---

## 3. Site architecture for local SEO

### The core problem
Five pages (`/`, `/services`, `/work`, `/about`, `/contact`) cannot compete for local search volume. Google's local algorithm and organic local-pack results reward businesses with dedicated, keyword-specific, genuinely useful pages - one page trying to rank for "web design," "local SEO," and "AI automation" simultaneously will underperform three focused pages, each of which can build its own topical relevance, internal links, and (eventually) inbound links.

JSN Marketing - the competitor benchmark - has ~200 templated location pages but is thin everywhere: no named team, no case studies, near-duplicate copy across verticals. Render's opportunity is not to out-template JSN, it's to build a *smaller, deeper* set of pages that actually earn rankings because they're genuinely useful and locally specific - the anti-JSN move, consistent with the "we're not scale-over-substance" positioning already established in `competitor-profiles/jsn-marketing.md`.

### Recommended page hierarchy

```
Homepage (/)
├── Services (/services) - hub, overview + pricing (keep as-is, becomes a summary/hub page)
│   ├── Web Design (/services/web-design)
│   ├── Local SEO (/services/local-seo)
│   └── AI Automation (/services/ai-automation)
├── Service Areas (/service-areas) - hub for town pages
│   ├── Randolph, NJ (/service-areas/randolph-nj)
│   ├── Denville, NJ (/service-areas/denville-nj)
│   ├── Morristown, NJ (/service-areas/morristown-nj)
│   ├── Parsippany, NJ (/service-areas/parsippany-nj)
│   └── [additional priority towns - see Section 4]
├── Work (/work) - unchanged
├── About (/about) - unchanged
└── Contact (/contact) - unchanged
```

### URL Map

| Page | URL | Parent | Nav | Priority |
|---|---|---|---|---|
| Homepage | `/` | - | Header | High |
| Services (hub) | `/services` | Home | Header | High |
| Web Design | `/services/web-design` | Services | Services dropdown / in-page cards | High |
| Local SEO | `/services/local-seo` | Services | Services dropdown / in-page cards | High |
| AI Automation | `/services/ai-automation` | Services | Services dropdown / in-page cards | Medium |
| Service Areas (hub) | `/service-areas` | Home | Footer + Services cross-link | Medium |
| [Town] page | `/service-areas/[town]-nj` | Service Areas | Not in header nav; linked from hub + footer + relevant service pages | Medium (long-tail) |
| Work | `/work` | Home | Header | High |
| About | `/about` | Home | Header | Medium |
| Contact | `/contact` | Home | Header | High |

Header nav stays at 5 items (Home, Services, Work, About, Contact) - do not add Service Areas to the header; it would push past the 4-7 item recommendation and town pages aren't primary conversion pages, they're long-tail search entry points. Put `/service-areas` in the footer under a "Locations" column, and cross-link from each service page ("We build sites for businesses in Randolph, Denville, Morristown, and across Morris County →").

### Why `/services` stays as a hub, not disappears
Keep the current `/services` page largely as-is (overview + all three pricing cards) - it's the conversion page most cold-email links will point to. The three new dedicated pages go deeper on each service for organic search, then funnel back to `/services` or directly to `/contact` for booking. This avoids cannibalization: `/services` targets "web design and SEO Morris County" (broad commercial intent), the three children target "web design Morris County NJ," "local SEO Morris County NJ," "AI automation for small business NJ" (specific intent) separately.

### Internal linking plan
- `/services` links to all 3 service pages and the service-areas hub.
- Each service page links back to `/services`, to `/contact`, and to 2-3 relevant town pages.
- Each town page links back to its parent service context, to `/service-areas`, to `/work` (proof), and to `/contact`.
- `/work` and `/about` each get one contextual link into `/services` (already largely true).
- No orphan pages: every new page must be reachable from the sitemap, footer, and at least one contextual in-content link, per the site-architecture skill's orphan-page rule.

### Breadcrumbs
Add `BreadcrumbList` (see Section 6) once service and town pages exist:
`Home > Services > Web Design` and `Home > Service Areas > Randolph, NJ`. Breadcrumbs mirror the URL path exactly, all segments clickable except current page.

---

## 4. Programmatic SEO opportunity: [Town] x [Service] pages

This is the single largest untapped local-search surface for Render, and it's also where Render can most directly out-execute JSN Marketing, whose ~200 location pages are exactly the kind of thin, near-duplicate content this section explicitly guards against.

### Addressable keyword surface
Morris County, NJ has 39 municipalities. Realistic target set: the 12-15 towns with the highest small-business density and search volume - Morristown, Parsippany-Troy Hills, Randolph, Denville, Madison, Mount Olive, Roxbury, Chatham, Florham Park, Montville, Boonton, Dover, Rockaway. Cross this with Render's 3 core services (Web Design, Local SEO, AI Automation) and that's **~36-45 possible town x service combinations**. Not every combination deserves a standalone page (see guardrails below) - realistic launch scope is **12-15 pages**: one page per priority town, generalized across all services, not 45 separate service-specific town pages. Expand to full town x service matrix only once a page proves it can rank and convert.

Search volume for individual "[town] web design" queries will be low (most under 20/mo, several under 10/mo) - this is inherently a long-tail play. The value isn't any single page's volume, it's: (a) aggregate long-tail volume across 12-15 towns compounds into meaningful traffic, (b) these pages are exactly what shows up when a business owner in Denville searches "web designer near me" and Google's local pack pulls from geographically-relevant on-page content, (c) they build topical + geographic authority that lifts the whole domain's local relevance, including `/services` and the homepage.

### Template design

**URL pattern**: `/service-areas/[town]-nj` (e.g., `/service-areas/randolph-nj`). Subfolder, not subdomain - consolidates domain authority per the programmatic-seo skill's core principle.

**Title tag pattern**: `Web Design & Local SEO in [Town], NJ | Render`

**Meta description pattern**: `Render builds fast, modern websites and local SEO for small businesses in [Town], NJ. Founder-led, transparent pricing, 2-4 week launch.`

**Page content outline** (this is the anti-thin-content structure - every section must carry town-specific or genuinely differentiated substance, not just a swapped variable):

1. H1: `Web Design & Local SEO for [Town], NJ Businesses`
2. Intro paragraph (unique per town, 2-3 sentences): reference something real and specific - a nearby landmark/business district (e.g., "businesses along Route 10 and the Randolph town center"), not generic filler. This is the hardest part to do honestly at 12-15 pages and the reason to cap scope rather than auto-generate 39.
3. "Why [Town] businesses choose Render" - 3-4 bullets pulling from Render's real differentiators (founder-led, transparent pricing, fast launch), not town-specific fabrication.
4. Local proof section: if/when a [Town]-based client exists, feature them here specifically. Until then, honestly say "See our work" and link to `/work` rather than inventing local testimonials - fabricated local proof is a Google spam-policy risk and violates the founder's explicit "no fake case studies" rule from the brand doc.
5. Service summary cards (Web Design / Local SEO / AI Automation) linking to the 3 dedicated service pages - this is what makes the page non-thin: it's a genuine local entry point into the full service catalog, not a doorway page.
6. Local FAQ block (2-3 questions, e.g., "Do you work with businesses outside [Town]?" reusing the existing FAQ answer pattern from `lib/data.ts`) - reuse real FAQ content, don't fabricate town-specific FAQs that don't exist.
7. CTA: Book a Call, same as every other page.

### Data source
This is a **public-data pSEO play** (town names, geography) layered with **proprietary content** (Render's actual differentiators, real portfolio, real pricing) - per the programmatic-seo skill's data-defensibility hierarchy, pure public data (town name swap) is the weakest signal, so the template above deliberately keeps 80% of each page's content identical (services, proof, pricing, differentiators - Render's real substance) and varies only the intro paragraph and page title/meta by town. This is the opposite of JSN's approach (template everything, swap only the town name) and is the explicit differentiation angle.

### Guardrails against thin/spammy pages (the JSN failure mode to avoid)
- **Cap initial launch at 12-15 towns**, not all 39 municipalities. Expand only after the first batch shows indexation and any traffic/ranking movement (check Search Console after 60-90 days).
- **No page ships without a genuinely unique intro paragraph.** If Tim/Luke can't write 2-3 honest, specific sentences about why a town matters (client there, notable local business district, personal familiarity), that town doesn't get a page yet.
- **Never fabricate local testimonials, reviews, or "trusted by [Town] businesses since - " claims** without a real client. This directly violates the founder's explicit copy rule (no fake case studies) and is also a literal Google spam-policy violation (scaled/thin content abuse).
- **Noindex or delay any town page that can't clear the "would a human find this useful" bar** - per the programmatic-seo skill's pre-launch checklist, quality over quantity; 12 genuinely useful pages beat 40 templated ones.
- **Monitor for keyword cannibalization** between `/services/local-seo` (broad) and town pages (narrow) - town pages should never out-rank the dedicated service pages for the service's core keyword; if that starts happening, it signals the service pages need strengthening, not the town pages weakening.
- **Every town page must be in the XML sitemap and reachable via footer + hub page** - no orphans.

---

## 5. AI-search / AEO strategy

Goal: get Render cited when someone asks ChatGPT, Perplexity, or Google AI Overviews something like "who's a good web designer near Morristown NJ" or "web design companies in Morris County."

### Where Render stands today
- Zero current AI-bot-specific considerations in the codebase - `robots.txt` allows `*`, which is correct (no AI crawlers are blocked, so GPTBot/PerplexityBot/ClaudeBot/Google-Extended can all currently crawl and potentially cite Render). No action needed here, just confirm it stays this way.
- FAQPage JSON-LD already exists on the homepage - this is exactly the extractable Q&A structure AI engines reward. Good foundation, underused (only on `/`).
- No `llms.txt`, no `/pricing.md` - both are cheap, high-leverage additions given Render's actual differentiator (transparent published pricing) is precisely the kind of structured, machine-readable fact an AI agent evaluating "web designers near me" would want to extract and compare.

### P0 - AEO fixes
1. **Add `/llms.txt`** at the site root. Short, factual: what Render does, who it's for (small businesses in Morris County, NJ), the three services, pricing tiers, links to `/services`, `/work`, `/about`, `/contact`, and the FAQ. This is a near-zero-cost file that directly helps ChatGPT/Claude/Perplexity build an accurate summary of Render when queried.
2. **Add `/pricing.md`** mirroring the three tiers already in `lib/data.ts` `PRICING_TIERS`. Render's transparent pricing is already a stated differentiator against JSN's "book a call to find out" gate - a machine-readable pricing file makes that differentiator legible to AI shopping agents, not just human visitors. Trivial to generate from existing data.
3. **Extend FAQPage schema beyond the homepage.** Add a short, page-relevant FAQ block (3-4 Qs) to each new service page in Section 3, each with its own `FAQPage` JSON-LD. AI engines extract FAQ schema directly as answer candidates - more coverage means more chances to be the cited source for "how much does local SEO cost" or "how long does AI automation take to set up."

### P1 - Structure and authority
4. **Structure service-page content as self-contained, extractable answer blocks.** Per the ai-seo skill's Pillar 1: lead every section with a direct 40-60 word answer, not a build-up. Example for `/services/local-seo`: open with "Render's local SEO service includes on-page optimization, Google Business Profile setup, and local schema markup, included standard with every website build for $X/mo" - a sentence that works if lifted out of context by an AI summarizer.
5. **Add statistics and specific numbers wherever honestly possible** - the Princeton GEO research cited in the ai-seo skill shows statistics alone boost AI citation likelihood ~37-40%. Render has real numbers already available and underused in body copy: "2-4 week launch," "$500 starting price," "founder-led, two people." Make sure these exact figures appear in visible page text, not just metadata, since AI engines extract from rendered content.
6. **Third-party presence matters more than the domain itself for AI citation** (per skill: brands are 6.5x more likely to be cited via third-party sources). This is where GBP (Section 2, P0) compounds: a Google Business Profile with reviews is both a local-pack ranking signal AND a third-party citation surface AI engines pull from. Also pursue: a Clutch or Chamber-of-Commerce-style local business directory listing once available, since directory listings are exactly the kind of third-party mention AI engines cite over a business's own site.

### P2 - Longer-horizon
7. Once the first real client case study exists (flagged repeatedly in the brief as Render's biggest proof gap), structure it as a comparison/definitive-guide style page - per the ai-seo skill's content-type table, comparison and definitive-guide content types get cited ~33% and ~15% of the time respectively, far above generic marketing pages. A "before/after: what changed when [Client] got a new website" case study, structured with a clear challenge/solution/results block, is both CRO collateral and AEO bait.
8. Monitor AI visibility manually (no budget assumed for paid tools like Otterly/Peec): monthly, run Render's top 10-15 target queries ("web designer Morris County NJ," "best web design company Randolph NJ," etc.) through ChatGPT, Perplexity, and Google, log whether Render or a competitor is cited, in a simple spreadsheet.

---

## 6. Schema plan (beyond FAQ)

Current state: `app/layout.tsx` emits a site-wide `ProfessionalService` JSON-LD (name, description, url, email, areaServed, address (addressRegion only), serviceType, priceRange, founder, sameAs). `app/page.tsx` emits `FAQPage` JSON-LD, home only.

| Schema type | Where to add | What it needs | Priority |
|---|---|---|---|
| `LocalBusiness` (or keep `ProfessionalService`, a valid LocalBusiness subtype) | `app/layout.tsx`, extend existing block | Already has most fields. Add: `telephone` (once a number exists, ties to Section 2 P0), `image`/`logo` (use `/brand/render-icon.svg` or an OG image), `geo` (approximate lat/long for Morris County centroid is acceptable for a service-area business without a storefront) | P0, cheap extension |
| `Organization` | `app/layout.tsx`, can combine with LocalBusiness via `@graph` | `name`, `url`, `logo`, `sameAs` - mostly already present, formalize as separate `@type` in a `@graph` array alongside ProfessionalService for clearer entity signals to both search and AI engines | P1 |
| `Service` (x3) | Each new dedicated service page (`/services/web-design`, `/services/local-seo`, `/services/ai-automation`) | `name`, `description`, `provider` (reference back to the Organization), `areaServed`, `offers` (price from `PRICING_TIERS`) | P0 once service pages ship (Section 3) |
| `BreadcrumbList` | Every page below the top level once the new architecture ships - service pages, town pages | `itemListElement` array matching the URL hierarchy exactly (Home > Services > Web Design) | P1, ships with Section 3 |
| `Review` / `AggregateRating` | Homepage and/or `/about`, nested inside the LocalBusiness schema | Cannot add yet - **zero reviews currently exist** (flagged repeatedly as Render's biggest proof gap). Do not fabricate. Add the schema the day the first real Google review lands; this is a "ready to ship, blocked on GBP + first review" item, not a "do now" item | P2, blocked on Section 2 P0 (GBP) |
| `LocalBusiness` per-town variant | Each `/service-areas/[town]-nj` page | Same Organization data with `areaServed` narrowed to that specific town/municipality | P1, ships with Section 4 |

**Implementation note**: combine `ProfessionalService`/`LocalBusiness` + `Organization` + page-specific `Service`/`BreadcrumbList` using `@graph` per the schema skill's guidance - one JSON-LD block per page rather than multiple competing `<script>` tags. Validate every new schema addition against Google's Rich Results Test before shipping; `WebFetch`/`curl`-based checks will not reliably detect JS-injected JSON-LD, but since Render's is server-rendered (React `dangerouslySetInnerHTML` in a server component), it will appear in static HTML and validate correctly with any tool.

---

## 7. Content strategy: lean, outreach-supporting plan

Per the brief and the founder's explicit instruction, this is **not** a blog-treadmill recommendation. Render's content should double as sales collateral - material that supports cold outreach and consult calls, not a content-marketing volume play unrelated to the sales motion.

### Structure: cornerstone pages + 10 articles
**Cornerstones** (already covered by Section 3's architecture): the 3 dedicated service pages + the service-areas hub. These carry the permanent SEO weight. Everything below is a small, high-intent supporting layer.

### 10 article/page titles mapped to search intent

| # | Title | Buyer stage | Search intent it matches | Doubles as |
|---|---|---|---|---|
| 1 | "How Much Does a Website Cost for a Small Business in NJ? (2026 Pricing Guide)" | Awareness/Consideration | "website cost small business nj" | Direct outreach-email attachment; reinforces transparent-pricing differentiator vs. JSN's pricing-gate |
| 2 | "Google Business Profile Setup Checklist for Morris County Small Businesses" | Awareness | "google business profile setup" | Free lead magnet; positions Render as the local-SEO expert even before a client signs |
| 3 | "5 Signs Your Business Website Is Costing You Customers" | Awareness | "why is my website not converting" / "old website losing customers" | Cold-email hook; matches the exact JSN-style pain framing but honestly, with real specifics |
| 4 | "Web Designer vs. Website Builder (Wix/Squarespace): What Actually Changes for a Local Business" | Consideration | "custom website vs squarespace" | Objection-handling collateral for the "I already have a Wix site" prospect response |
| 5 | "What to Expect From a Free Website Consultation Call" | Decision | "website consultation what to expect" | Reduces friction on the Calendly booking step directly (ties to CRO cluster's concern about the 45-min consult being a heavy first ask) |
| 6 | "Local SEO for [Industry] in Morris County, NJ" (templated for 2-3 verticals Render targets, e.g., contractors, restaurants, dental) | Consideration | "[industry] seo morris county nj" | Reuses the demo portfolio (Hartline, Fuego, Marlowe) as proof inline |
| 7 | "AI Automation for Small Businesses: What It Actually Means (No Hype)" | Awareness | "ai automation for small business" | Directly counters JSN's vague "24/7 AI voice agent" claims with concrete, honest use cases Render already lists in Services |
| 8 | "How Long Does It Take to Launch a Website? A Realistic Timeline" | Consideration | "how long to build a website" | Reinforces the 2-4 week claim with a real process breakdown; sales-call time-saver |
| 9 | "Do I Own My Website? What to Check Before You Sign With Any Agency" | Decision | "do i own my website agency" | Direct trust-building content vs. agencies with markup/lock-in; matches an existing FAQ, expand into a full page |
| 10 | "Randolph, NJ Small Business Directory + Web Presence Checklist" (or one per priority town, low-effort) | Awareness | "[town] small business" / local intent | Doubles as a genuinely useful local resource AND an outreach conversation-starter ("I noticed you're not listed here yet") - ties directly into the lead-generation-plan's Randolph Local sourcing strategy |

### Why 10 and not 50
Every title above either (a) can be handed directly to a prospect mid-sales-cycle, (b) directly rebuts a known objection or competitor weakness, or (c) supports the pSEO town pages. None of them are generic "10 tips for a better website" filler. This matches the founder's stated aversion to fluff and the brief's instruction that content should support outreach, not become a treadmill.

### Content pillars (for future expansion, not launch-required)
1. **Pricing & Process transparency** (titles 1, 5, 8, 9) - Render's core differentiator vs. every "book a call to find out" competitor.
2. **Local SEO & GBP** (titles 2, 6, 10) - supports the town-page pSEO play and reinforces "SEO included" positioning.
3. **Honest AI** (title 7) - differentiates from JSN's vague AI-voice-agent hype.
4. **Objection handling** (titles 3, 4) - sales-call ammunition.

---

## 8. Analytics / measurement

### Current gap
The brief flags "unknown analytics depth" - GA4 setup is listed as a pricing-tier line item ("Google Analytics setup") for clients, but Render's own site's analytics maturity wasn't independently confirmed this pass (would require live GA4/Search Console access, not available to this audit). Treat the below as the target state to implement/verify, not a confirmed-broken finding.

### What to actually track (GA4 events)

| Event name | Category | Properties | Trigger |
|---|---|---|---|
| `cta_book_call_clicked` | Conversion | `location` (hero / trust-strip / services / footer / nav) | Any "Book a Call" button click |
| `calendly_facade_loaded` | Conversion funnel | - | Click-to-load Calendly widget mounts (per the click-to-load facade already implemented in `ContactForm.tsx`) |
| `calendly_booking_completed` | Conversion | - | Calendly's own postMessage event on booking completion - requires wiring Calendly's embed event listener to a GA4 event, not automatic |
| `demo_preview_opened` | Engagement | `project_name` (Fuego / Hartline / Marlowe / Hope Tree) | "Preview Demo" modal open, on `/work` and homepage `PortfolioTeaser` |
| `pricing_tier_viewed` | Engagement | `tier` (Starter / Standard / Premium) | Scroll-into-view or click on a pricing card on `/services` |
| `faq_item_expanded` | Engagement | `question` | FAQ accordion open, on `/` |
| `outbound_link_clicked` | Engagement | `destination` (linkedin / github / demo vercel urls) | Any external link click |

### Conversion goals to mark in GA4
1. **Primary**: `calendly_booking_completed` (the only real conversion - no contact form exists by design).
2. **Micro-conversion / lead indicator**: `calendly_facade_loaded` (intent signal even if booking isn't completed - useful for funnel drop-off analysis between "clicked book a call" and "actually booked").
3. **Content engagement proxy**: `demo_preview_opened` - correlates with how convincing the portfolio is; useful for the CRO cluster's analysis too.

### Call/booking tracking specifics
Since Contact is Calendly-only (per brief, no web form), the funnel to instrument is: `cta_book_call_clicked` → `/contact` pageview → `calendly_facade_loaded` → `calendly_booking_completed`. Calendly supports UTM passthrough and a `postMessage` event (`calendly.event_scheduled`) - wire this to fire the GA4 `calendly_booking_completed` event via a small script in `ContactForm.tsx`. Without this, Render has zero visibility into actual booking conversion rate today, only pageviews and clicks up to the widget.

### Search Console
Verify property for `renderlocalwebsites.com` (domain property, not just URL-prefix, to capture all subdomains/protocols). Submit `sitemap.xml`. Once the Section 3 architecture ships, watch Coverage report for the new service and town pages to confirm indexation within 1-2 weeks, and watch Performance report filtered by page to see which town pages start pulling impressions - this is the actual validation signal for whether to expand past the initial 12-15 towns.

### UTM strategy for outreach
Per the brief's cold-email → phone → Calendly sales motion, every cold-email link to the site should carry UTMs: `utm_source=coldemail&utm_medium=email&utm_campaign=[batch-name]&utm_content=[email-variant]`. This lets Render's own outreach performance (currently tracked as a ~7% reply-rate benchmark per the brief) connect to actual site engagement and booking conversion, closing the loop between the sales-and-outreach doc's metrics and real GA4 data.

### Simple KPI dashboard definition
A single spreadsheet or GA4 exploration with, monthly:
- Organic sessions (total, and split: homepage / services / work / about / new service pages / town pages once they exist)
- `cta_book_call_clicked` count and click-through rate from sessions
- `calendly_booking_completed` count (the actual conversion number)
- Search Console: total impressions, clicks, average position for the top 15-20 target local queries
- GBP: profile views, calls, direction requests, website clicks (once GBP exists, per Section 2 P0)
- AI citation spot-check (manual, monthly, per Section 5 P1 item 8)

This is deliberately simple - five rows, checked monthly, no BI tooling needed at Render's current scale.

---

## Summary (10 lines)

1. GBP registration is the single biggest local-SEO gap - Render sells local SEO but has no confirmed Google Business Profile itself. P0.
2. Prior sitemap/robots domain-mismatch and homepage OG-description bugs from the last internal audit are already fixed; JSON-LD `sameAs` also already added.
3. Five pages is structurally too thin for local search; split `/services` into a hub plus 3 dedicated service pages (Web Design, Local SEO, AI Automation).
4. Add a `/service-areas` hub with 12-15 town pages (not all 39 Morris County municipalities) - cap scope, ban fabricated local testimonials, avoid JSN's thin-template failure mode.
5. On-page copy barely mentions "Morris County, NJ" outside metadata; add real location text to `/work` and `/about` body copy.
6. Add `/llms.txt` and `/pricing.md` for near-zero-cost AI-agent citability, matching Render's real differentiator of transparent pricing.
7. Extend FAQPage schema to new service pages; add Service, BreadcrumbList, and (once GBP exists) Review/AggregateRating schema.
8. Content plan is 10 specific titles that double as sales collateral, not a blog treadmill - pricing transparency, objection-handling, and local-SEO topics only.
9. No form-based conversion tracking exists; wire Calendly's `event_scheduled` postMessage to a GA4 `calendly_booking_completed` event, the only real conversion signal missing today.
10. ASO does not apply - no mobile app exists.
