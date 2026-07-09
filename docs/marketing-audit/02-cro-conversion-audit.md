# CRO & Conversion Audit - Render

*Flagship report. Covers every page against one question: does this move a Morris County business owner from "found the site" to "gave us contact info," at every level of readiness, not just the ones willing to book 45 minutes with a stranger.*

---

## 1. Skills invoked

| Skill | Contribution |
|---|---|
| `cro` | Core framework for this whole report: value prop clarity, CTA hierarchy, friction audit, page-by-page teardown structure. |
| `marketing-psychology` | Named the mechanisms behind each fix: activation energy, foot-in-the-door, anchoring, scarcity, availability heuristic, authority bias. Used to justify *why* each change should work, not just that it should. |
| `lead-magnets` | Designed the "free homepage mockup" and checklist-style lead magnets that make up the middle rungs of the offer ladder in Section 2. |
| `free-tools` | Scoped the instant website-cost estimator and site-grader tool concepts as engineering-as-marketing plays, with build-effort scoring. |
| `signup` | Applied field-minimization and "value before commitment" principles to the new micro lead-capture form recommended for the Contact page. |
| `onboarding` | Partial fit. Render has no in-app product, so classic "activation" doesn't apply. Reused the *time-to-value* and *reduce steps to first value* principles for the post-consult intake flow (Stripe deposit + Google Form) and for the "How We Start" section, which is functionally the onboarding UX for a services business. |
| `ab-testing` | Structured the 5-test plan in Section 7 with hypothesis/metric format and ICE-style prioritization. |
| `popups` | Recommended a scroll-triggered (not exit-intent, since exit-intent is unreliable on mobile and most Render traffic will be mobile-first local search) lead-magnet popup for Services/About. |
| `paywalls` | Genuinely does not apply. Render has no in-app paywall or tiered feature gate. One transferable idea used: "value before ask" timing logic, applied to why the 45-minute call is being asked too early in the funnel (Section 5). |
| `churn-prevention` | Mostly does not apply. Render has no self-serve cancel flow. The one relevant idea: the $50-125/mo maintenance plan is a subscription with real churn risk once clients exist, so Section 6 includes a placeholder recommendation to build a simple save-offer conversation into the maintenance-cancellation process before that becomes a live problem. |

---

## 2. The core conversion problem

Render has exactly one conversion action on the entire site: book a 45-minute Calendly call. Every button, every card, every page eventually funnels to `/contact` and the same embed, which means a visitor has to go from "never heard of this company" to "I will give a stranger 45 scheduled minutes" in a single jump, with no smaller commitment in between. That's a bad match for how a skeptical local business owner actually buys: they want to poke around, see if this is real, maybe see their own business rendered by it, before they'll put anything on their calendar. The fix is not a better Calendly embed. It's an offer ladder that captures intent at every stage of readiness instead of discarding everyone who isn't ready for the biggest ask.

### The offer ladder (build this)

| Rung | Ask | Offer | Where it lives | Why it works |
|---|---|---|---|---|
| 0 | None | Browse live demo sites (already exists) | `/work` | Zero-friction proof, already Render's best asset |
| 1 | Zero fields | "See Your Business, Rendered" - request a free homepage mockup of *your* actual business, delivered by email in 48 hours | Hero secondary CTA, Services page, Contact page | This is literally what Render's own outreach already does (build-a-demo-first cold pitch). Turning that into a self-serve inbound offer is the single highest-leverage move in this report: it's proof-of-work instead of a promise, costs Render an hour of build time it's already budgeting for outreach anyway, and gives a name-not-yet-a-client something concrete to react to instead of a sales call. |
| 2 | Email only | Instant website cost estimator: 4 quick questions (pages, features, industry, timeline) → shows which tier fits + the exact published price | New `/estimate` page or embedded widget | Removes the "which package is right for me?" anxiety named in the FAQ without a call. Matches the `free-tools` engineering-as-marketing pattern and reinforces the transparent-pricing differentiator against JSN's gated-audit funnel. |
| 3 | Email only | "Morris County Local SEO Checklist" - 1-page PDF, the same on-page SEO items every Render build ships with, reframed as a downloadable | Blog/resource stub or FAQ CTA | Cheap to produce (it's literally the TrustStrip/FAQ SEO claims turned into a document), gives something to email-nurture, low priority relative to rungs 1 and 2. |
| 4 | 15 minutes | "Quick Fit Call" - short call to see if it's a fit, no obligation | Contact page, as the *default* listed option | Matches the actual sales motion (phone follow-up 1-2 days after cold email already exists) and cuts the calendar commitment for a first touch by two-thirds. |
| 5 | 45 minutes | Full diagnostic consult (current offer) | Contact page, secondary option, or the natural next step after rung 4 | Kept for prospects who are already sold and want the deep-dive; no longer the *only* door in. |

Everything in Sections 3-6 below builds toward getting rungs 1, 2, and 4 live. Nothing here suggests diluting the 45-minute call for people who are ready for it - it just stops making it the only way in.

---

## 3. Page-by-page teardown

### HOME - Hero

**Current copy:**
> Eyebrow: "Web Design & AI · Morris County, NJ"
> H1: "We Build the Web / for Local Business." (second line accent-colored)
> Sub: "Render is a founder-led studio building fast, modern websites and practical AI tools for local businesses across Morris County, NJ."
> CTAs: [Book a Call] [View Services]
> Footnote: "Fixed, published pricing. Clear scope. You see the number before you ever book a call."

**Working:** The footnote is a genuinely strong trust line - specific, verifiable, directly counters JSN's gated-quote funnel. Click-to-load Calendly and blur-to-sharp hero animation are good perf/craft signals, not a CRO issue.

**Leaks:**
- H1 is brand-forward ("We Build the Web") not outcome-forward. It describes what Render does to itself (builds websites), not what happens to the visitor's business. A business owner scanning for 3 seconds doesn't learn what they get.
- Sub says "practical AI tools" as a headline-level hook - vague to a plumber or dentist, and AI is a $250-750 add-on, not the core offer. Leading with it dilutes the actual differentiator (fast local sites + SEO).
- Two CTAs, but both go to the same heavy ask or a pure-navigation link ("View Services" isn't a conversion action, it's a detour). No rung-1 offer present at the point of highest intent.
- No proof (numbers, names, a demo thumbnail) above the fold. Everything here is a claim, not evidence, until the visitor scrolls.

**Fix:**
> Eyebrow: "Web Design & Local SEO · Morris County, NJ"
> H1: "Websites That Win / Local Customers." (second line accent-colored, same visual pattern)
> Sub: "Render builds fast, modern websites and on-site SEO that put Morris County businesses in front of the customers already searching for them."
> CTAs: [Book a Call] [See a Free Mockup of Your Site] - the second button routes to the rung-1 offer, not to `/services`.
> Footnote stays as-is, it's earning its place.

This keeps the exact visual/animation system (two-line H1, accent second line) and swaps only the words that matter: outcome instead of brand description, and a real low-friction second CTA instead of a navigation link disguised as one.

---

### HOME - TrustStrip

**Current:** Founder-led / Next.js builds / SEO included / 2-4 week launch - four markers, each a short claim + one-line proof.

**Working:** Founder-led and SEO-included are the two strongest, most differentiated claims on the whole site relative to JSN (anonymous LLC, no stated SEO scope). Keep both, word-for-word.

**Leak:** This is the first of *three* separate "trust marker" grids on the homepage (TrustStrip, then ProofBar, then WhyUs). All three restate some version of "founder-led, no markup, direct access" - by the time a visitor reaches WhyUs item 01 ("You Pay For The Work"), they've heard the founder-led pitch 3 times. That's the "fluff" the founder flagged, just distributed across sections instead of concentrated in one paragraph.

**Fix:** Keep TrustStrip as the canonical version of this message (it's first, and it's the tightest). Cut the redundant restatement in WhyUs (see below) and trim ProofBar to what it does uniquely (third-party-style verifiability), not founder-led again.

---

### HOME - WhatWeDo

**Current:** "Two services. One focused team." Card 1: Web Design & Development. Card 2: AI Consulting & Automation.

**Working:** "One focused team" is honest positioning against JSN's sprawling bundle - a visitor who wants a boutique feel over a nationwide-system feel will read this well. Don't add a fake third service line to look bigger; that would be the JSN move, not the Render move.

**Leak:** Local SEO is a headline trust marker (TrustStrip) and a full pricing-tier feature, but it's invisible in the two service cards - a scanning visitor sees "Web Design" and "AI," and could reasonably wonder if SEO costs extra. This creates confusion between sections instead of reinforcing.

**Fix:** Don't add a card. Change Card 1's body copy to surface SEO explicitly:
> Current: "Custom Next.js sites that load fast, rank in local search, and turn visitors into customers."
> This already says "rank in local search" - keep it, it's fine. The real fix is adding the estimator/mockup CTA under this section, since a visitor who's decided "I want the web one" right here has nowhere to act except scroll further.

---

### HOME - PortfolioTeaser

**Current:** Renders the 3 live demos (Fuego Street Tacos, Hartline Builders, Marlowe Dental Studio) plus the Hope Tree case study, each labeled "Live Website Demo" / "Consulting Proof."

**Working:** Clickable, real, interactive demos are Render's single best proof asset against JSN, who has zero case studies of any kind. The honest "Live Website Demo" (not "client project") labeling is correct - don't misrepresent these as paid client work.

**Leak:** This is where the "no real client yet" gap (flagged as the single biggest credibility problem in the brief) is most exposed. A savvy visitor who clicks through will eventually notice all 4 featured items are either self-initiated demos or a school consulting club project, not a paying customer's website. That's fine for a founding-client-era company, but the site never says so - it just presents demos next to a "Two real founders" trust marker without acknowledging the traction stage.

**Fix:** Reframe honestly instead of hoping no one notices:
> Add one line above the grid: "We're taking on our first founding clients now - here's what we've already built to prove the work, not just promise it."
This converts the gap into a feature (founding-client urgency, see Section 4) instead of a silent hole. The moment a real client site exists, replace this line and move that case study to position 1 in the grid, full stop, highest priority content update on the whole site.

---

### HOME - ProofBar

**Current:** Eyebrow "Nothing here you have to take our word for." Markers: Pricing on the page / Two real founders / Live demo sites.

**Working:** The eyebrow framing is genuinely excellent marketing psychology - it preempts skepticism by naming it, then answers it with specifics instead of adjectives. This is the single best-written section on the site. Keep the eyebrow verbatim.

**Leak:** As noted above, "Two real founders" duplicates TrustStrip's "Founder-led" claim almost exactly, three sections apart. And all three markers are still self-asserted by Render about Render - genuine third-party proof (a review, a rating, a quote from someone who isn't Tim or Luke) is completely absent here and everywhere on the site.

**Fix:** Swap "Two real founders" for a marker that doesn't repeat TrustStrip. If no real testimonial exists yet, use: "Transparent process" - "Every project starts with a fixed-price summary before any deposit. No surprise invoices, no scope creep you didn't agree to." This is still self-asserted but it's *new information*, not a repeat. The instant a testimonial exists, that becomes marker #4 here (see Section 4).

---

### HOME - WhyUs

**Current:** 01 You Pay For The Work / 02 Modern Tech Stack / 03 Straight Talk / 04 Invested Partners - each restates founder-led, performance, transparency, and reputation-stake themes already covered above.

**Working:** Nothing here is wrong on its own; each line is well-written in isolation.

**Leak:** This is the clearest instance of the "fluff" the founder explicitly asked to cut. By the time a visitor reaches this section they've already read: founder-led (TrustStrip), founder-led again (ProofBar "Two real founders"), no-markup ("You Pay For The Work" is a third phrasing of the same claim), modern tech stack (TrustStrip "Next.js builds," restated), and transparency (footnote in Hero, ProofBar pricing marker, now "Straight Talk"). WhyUs adds zero new information across 3 of its 4 items. Item 04 ("Invested Partners" - your site is our portfolio) is the only genuinely new idea in the section.

**Fix:** Cut the section from the homepage entirely, or replace 3 of the 4 items with content that hasn't appeared yet:
> 01 (keep, only new-info item): Invested Partners - "Your site is our portfolio. We care about your results because they're our reputation."
> 02 (new): Fixed-Price Guarantee - "The number you see is the number you pay. No change orders unless you ask for something outside the original scope." (this doubles as the risk-reversal element missing per Section 4)
> 03 (new): Founding-Client Pricing - "Current rates are for our first clients. They go up as our portfolio grows, so early is genuinely cheaper." (honest scarcity, see Section 4)
> 04 (new, only if a real client exists): a one-line result stat or move this slot to a testimonial pull-quote.

If no new content is ready, deleting the section is a better outcome than keeping it - it currently costs scroll depth and reading time without adding persuasion, which pushes PortfolioTeaser and the FAQ (the sections doing real work) further from the fold.

---

### HOME - FAQ

**Current:** 8 items, JSON-LD FAQPage schema present.

**Working:** Genuinely strong objection-handling. The Facebook/word-of-mouth item ("Those referrals still look you up before they call...") is the best single piece of persuasive copy on the site - it reframes a real objection instead of dodging it. Keep it word for word.

**Leak:** The FAQ is Home-only. A visitor who lands directly on `/services` or `/contact` from a search result or an outreach email link never sees it, and those are exactly the pages where "how much does this cost" and "do I own my website" objections need answering in the moment.

**Fix:** Add a condensed 3-item FAQ (cost, timeline, ownership - the top objections) directly on `/services` near the pricing cards, and one line on `/contact` linking to the full Home FAQ ("Questions before you book? See our FAQ"). Also add a closing CTA under the last FAQ item: "Still have questions? [Book a free call] or try the free mockup instead" - right now the FAQ just ends, with no next step offered at the exact moment objections have been cleared.

---

### SERVICES

**Current:** H1 "What we do, and what it costs." / sub "Clear scope. Clear pricing. No surprises." Feature list, 3 pricing cards each with a "Get Started" button linking to `/contact`. CTA card: "Not sure which package fits? Book a free call and we'll tell you straight." "How We Start" section. Dark AI section with "Talk to Us About AI" CTA.

**Working:** The H1 and sub are the best-matched headline/subhead pair on the site - direct, on-brand voice, no fluff. "How We Start" handles the "I'm not prepared" objection cleanly and belongs exactly where it is. The CTA card above the pricing cards ("book a free call and we'll tell you straight") is good voice and good placement.

**Leaks:**
- Every `PricingCard` button says **"Get Started."** That copy promises an immediate, low-friction next step. What actually happens is a redirect to a page requiring a 45-minute scheduled call. This is a real expectation-mismatch: a visitor clicking "Get Started" on the Standard tier is primed for something closer to "enter payment info" or "fill out a short form," not "pick a 45-minute slot on someone's calendar." That gap between promised and delivered friction is a documented conversion killer.
- No FAQ or objection-handling content on this page (see above).
- No guarantee or risk-reversal anywhere near the prices, despite this being the page where price-anxiety is highest.
- The AI section's CTA ("Talk to Us About AI") routes to the same general Calendly as everything else - an AI-curious lead and a website lead have different qualifying questions, but get the identical booking flow.

**Fix:**
- Change all three `PricingCard` CTAs from "Get Started" to **"Book a Call About [Tier]"** (e.g., "Book a Call About Standard"). This sets accurate expectations and, as a side benefit, lets Tim and Luke see which tier a lead was already leaning toward before the call even starts.
- Add the condensed FAQ described above directly under the pricing grid.
- Add one risk-reversal line directly under the CTA card: "Your first design direction is on us; if it's not right, we revise before you pay a deposit." (Only include if this is actually true of the process - confirm with founder before publishing; if not true today, this is a P1 process decision, not just a copy fix.)
- Route the AI CTA to a distinct, shorter Calendly event type or at minimum add one qualifying line above it ("Tell us the task you dread - we'll tell you if it's worth automating before we ever get on a call.") so the AI section doesn't feel like a copy-paste of the web section's CTA pattern.

---

### ABOUT

**Current:** H1 "Built for local. Priced in the open." Mission paragraph. Team cards. Values (dark section): Quality over quantity / Transparency always / Skin in the game.

**Working:** H1 is strong, on-brand, and matches the transparent-pricing differentiator. Mission paragraph ("Tim brings the software. Luke brings the strategy...") is tight and effective - it's the right amount of founder story, in the right place (per the brand doc's own rule: outcome first, founder story as supporting proof introduced later, and About is exactly "later").

**Leaks:**
- Tim's bio opens with **"Hi! I'm Tim, a junior Computer Science student at Virginia Tech,"** then lists internship and research credentials afterward. For a business owner deciding whether to hand $500-2000 to this team, leading with "student" activates a real, valid concern (is this a hobby project or a business?) before the credentials that would offset that concern (3rd place at a research symposium, XR security research, a built product) have been read. Authority bias works in the order information is presented, not just in whether it's present.
- Luke's bio is a fraction of the length and specificity of Tim's - "Business and marketing student focused on helping local businesses tell their story online" has no equivalent credential (no research, no named project, no placement) to match Tim's. This creates an unintentional impression that Luke is the junior partner, which likely isn't the intent given he owns strategy and the sales motion.
- No CTA anywhere on the About page. A visitor who reads all the way to "Skin in the game" and is now sold on the people has to find their own way back to booking.

**Fix - Tim's bio, reordered to lead with capability, not status:**
> "Tim builds every Render site and leads the AI automation practice. He's a Computer Science student at Virginia Tech researching XR security through Spatial Seer (3rd place, VT Undergraduate Research Symposium) and built DBWorkout, a gamified tool for learning SQL. He also interns in IT and Asset Management at Suburban Propane. See his work on [LinkedIn] and [GitHub]."
This keeps every fact, just reorders so the achievements land before "student" instead of after it, and it's still 100% honest - nothing is hidden, "Computer Science student" is still right there in sentence two.

**Fix - Luke's bio, given equal specificity:**
> Ask the founder for one concrete Luke credential to match Tim's (a named project, a placement, a certification, the 180 Degrees Consulting role that's currently only credited on the Hope Tree case study page and not here). At minimum, pull the 180 Degrees Consulting / Hope Tree line onto this bio: "Luke leads strategy and handles the numbers behind every project. He's a Finance and marketing student at Virginia Tech and a consultant with 180 Degrees Consulting, where he built the recruitment strategy and KPI framework behind the Hope Tree Family Services case study."

**Fix - add a closing CTA:** One line + button under the Values section: "Ready to talk about your site?" [Book a Call] [See a Free Mockup].

---

### CONTACT

**Current:** H1 "Book a Call." Sub: "Choose a time for a free consultation. We'll use the call to understand what you need and whether we can help." Info block (pick any time / email / Morris County NJ). Reassurance card ("Not sure what you have ready?"). Calendly embed (click-to-load facade) + "Prefer to book directly? Open Calendly."

**Working:** The reassurance card is good objection handling for prep-anxiety. The click-to-load Calendly facade is a genuinely smart perf decision (defers ~1MB of third-party JS) and doesn't hurt conversion since the facade itself states "Free 45-minute consultation" clearly before the click.

**Leak - this is the whole thesis of Section 2:** the page has exactly one conversion mechanism. There is no field to fill in, no lighter option, nothing to do if a visitor isn't ready to put 45 minutes on a calendar with a company they found ten seconds ago. The "no web contact form" decision was made deliberately to reduce friction on the booking path, but it has the side effect of giving zero-friction-seeking visitors no path at all - they just leave. A short form is *less* friction than opening Calendly, reading available slots across a live calendar grid, and committing to an exact time.

**Fix:** Add a 3-field micro form above the Calendly embed, framed as the lighter option:
> Header: "Not ready to book yet?"
> Sub: "Send us your info and we'll reach out. No calendar required."
> Fields: Name, Email, What do you need (dropdown: New website / SEO help / AI automation / Not sure yet) - three fields total, matching the `signup` skill's minimize-fields principle.
> Submit → simple email notification (even a `mailto:` triggered send or a basic serverless function; this does not need a CRM at this stage).

This turns Contact into two real paths instead of one, and directly builds rung 4 of the offer ladder from Section 2 into the page that already gets the highest-intent traffic on the site.

---

## 4. Missing persuasion elements checklist

| Element | Status | Recommendation |
|---|---|---|
| **Risk-reversal / guarantee** | Missing entirely | Add one explicit line, ideally on Services near pricing: "Your first design direction is on us. If it's not right, we revise before any deposit." Confirm this is actually true of the process before publishing. |
| **Social proof (reviews, ratings, logos, results)** | Missing entirely | Zero reviews, zero star ratings, zero client logos, zero result numbers anywhere on the site. This is the single largest gap versus a mature competitor (though it also beats JSN, who has none either). The moment client #1 launches: get a Google review, a one-line testimonial, and a before/after screenshot, and feature all three above the fold on Home. This is the highest-priority non-copy task in this entire audit. |
| **Urgency / scarcity (honest)** | Missing, but genuinely available | Render's own plan (raise monthly tiers after 2-3 founding clients, per the brief) is real, honest scarcity that isn't being used. Add "Founding-client pricing - rates increase after our first cohort" to the Services page and pricing cards. This is textbook honest scarcity: true, time-bound, and verifiable later. |
| **Specificity / numbers** | Weak | "Fast, modern," "performance-optimized" have no numbers attached. Add real Lighthouse/Core Web Vitals scores from the actual demo sites (Fuego, Hartline, Marlowe) - Render already has this data since perf work has been done on these builds per the git history. A stated "94+ Lighthouse performance score" beats "fast" every time. |
| **Visual process / timeline** | Missing entirely | No step-by-step visual anywhere. Add a simple 4-step graphic to Services (or a new short "Process" section on Home): 1. Free call → 2. Fixed-price summary → 3. 2-4 week build → 4. Launch + optional maintenance. Reduces "what am I actually signing up for" anxiety, which is a real objection for a first-time buyer of a $500-2000 service from a small studio. |
| **Trust badges** | Mostly N/A for this business type | No BBB/security badges needed at this scale. Once the Stripe deposit flow is live, "Payments secured by Stripe" near the deposit step is worth one line. Low priority. |
| **Above-the-fold CTA** | Present | Hero has two CTAs already. Fix is CTA *quality* (Section 3), not presence. |
| **Sticky mobile CTA** | Missing | Confirmed in `Navbar.tsx`: the only mobile "Book a Call" button is inside the hamburger dropdown, not persistently visible. On a long-scroll page like Services or the FAQ-heavy Home, a mobile visitor has to reopen the menu to convert. Add a persistent bottom bar with "Book a Call" / "Free Mockup" on mobile, site-wide. |
| **Exit-intent** | Missing | Classic exit-intent (cursor-leaves-viewport) doesn't work on mobile, which is most of this traffic. Use a scroll-depth trigger instead (e.g., 60% scroll on Services or About without a click) to surface the rung-1 or rung-2 offer from Section 2 in a small slide-in, not a full-screen modal. |
| **Objection handling** | Strong on Home, absent elsewhere | FAQ on Home is genuinely excellent. Duplicate the top 3 objections onto Services and Contact as covered in Section 3. |

---

## 5. The Contact/booking flow

**Is 45 minutes the right length?** Not as the *only* option. 45 minutes is reasonable once a prospect has decided Render is a real contender - it's the right length for a genuine diagnostic call. But as the sole first-touch offer, it's a mismatch: it asks for a large, specific calendar commitment before the visitor has any proof this is worth 45 minutes of their day. The brief's own sales motion already implies a shorter first contact (a phone follow-up 1-2 days after a cold email) - the site should mirror that instinct instead of defaulting every visitor straight to the deep-dive. Recommendation: create a second, shorter Calendly event type ("15-Minute Quick Fit Call") and make it the default/first-listed option on Contact, with the 45-minute diagnostic as the option for someone who's already decided.

**Friction in Calendly-only:** Two distinct frictions, not one. First, the *format* friction: reading a live calendar grid and picking an exact slot is more cognitively demanding than filling in three text fields, even though it feels like "less friction" because there's no typing. Second, the *commitment* friction: Calendly-only means the only unit of conversion the site can capture is "booked a call," so anyone not ready to book is worth zero to Render even if they'd have happily given an email address. Both are fixed by the micro lead-capture form recommended in Section 3.

**What to add above the embed:** In priority order - (1) the micro lead form as the lighter path, framed explicitly as an alternative, not a replacement; (2) a single testimonial or result stat once one exists, positioned right where booking-hesitation peaks; (3) the shorter Calendly event type as the default booking option, with the 45-minute version available as "prefer to go deeper right away? Book the full 45-minute consult instead."

---

## 6. Prioritized CRO backlog

| Change | Expected impact | Effort | Priority |
|---|---|---|---|
| Add micro lead-capture form above Calendly embed on Contact | High - captures currently-lost low-intent traffic | Low | P0 |
| Rewrite Hero H1 to outcome-forward copy | High - first 3 seconds on the highest-traffic page | Low | P0 |
| Add "See a Free Mockup of Your Site" as Hero secondary CTA (rung 1 of offer ladder) | High - creates a real non-Calendly conversion path site-wide | Medium (copy is low effort; fulfilling requests needs a lightweight process) | P0 |
| Get and publish first real client testimonial + result, feature above the fold | Highest - closes the single largest credibility gap named in the brief | Depends on client timeline, but do this the moment it's possible | P0 |
| Fix `PricingCard` CTA copy from "Get Started" to "Book a Call About [Tier]" | Medium-High - removes an expectation-mismatch at the highest-intent moment on Services | Low | P0 |
| Cut/replace 3 of 4 redundant `WhyUs` items (founder-led restated 3x across the homepage) | Medium - shortens path to PortfolioTeaser/FAQ, removes the "fluff" the founder flagged | Low | P0 |
| Add sticky mobile bottom CTA bar | Medium-High - mobile is likely the majority of local-search traffic and currently has no persistent CTA | Low | P0 |
| Add founding-client scarcity line to Services/pricing | Medium - honest urgency currently unused | Low | P0 |
| Add risk-reversal/guarantee line near pricing | Medium - addresses a named missing element directly | Low (pending founder confirmation of process) | P0 |
| Build instant website-cost estimator (rung 2 of offer ladder) | Medium-High - new lead-capture surface, reduces "which tier fits me" anxiety without a call | Medium (small interactive tool, reuses published pricing data already in `lib/data.ts`) | P1 |
| Add 15-minute "Quick Fit Call" as default Calendly option | Medium-High - lowers commitment barrier at the point of highest intent | Low (Calendly config) | P1 |
| Merge/de-duplicate TrustStrip and ProofBar into one section | Medium - recovers scroll depth, removes redundancy | Low | P1 |
| Add condensed FAQ to Services and Contact pages | Medium - objection handling where it's currently absent | Low | P1 |
| Reorder Tim's About bio to lead with achievements, not "student" | Medium - authority-bias fix at a real objection point | Low | P1 |
| Add matching credential detail to Luke's bio | Low-Medium - bio-length imbalance | Low (needs one input from founder) | P1 |
| Add scroll-triggered popup offering rung-1/rung-2 lead magnet on Services/About | Medium - catches engaged-but-not-converting visitors | Medium | P1 |
| Add process/timeline visual (4-step graphic) | Medium - reduces "what am I signing up for" uncertainty | Medium | P1 |
| Add real Lighthouse/Core Web Vitals numbers to trust claims | Low-Medium - specificity upgrade | Low (data already exists from perf work on demos) | P2 |
| Build "Local SEO Checklist" downloadable (rung 3) | Low - nice-to-have nurture asset, not urgent pre-launch | Low | P2 |
| Add a save-offer step to the future maintenance-plan cancellation flow | Low now, higher later | Low to plan now, build once clients exist | P2 |

---

## 7. A/B test plan - top 5

**1. Hero headline: outcome-forward vs. brand-forward**
- Hypothesis: because a local business owner's actual goal is "get more customers," not "learn who built this," replacing "We Build the Web for Local Business" with an outcome-stated headline ("Websites That Win Local Customers") will increase engagement with both hero CTAs.
- Primary metric: combined click-through rate on both hero CTAs per session.

**2. Contact page: Calendly-only vs. Calendly + micro lead form**
- Hypothesis: because a 45-minute scheduled call is a heavy first ask, adding a 3-field lead-capture form as an explicit lighter alternative will increase total contact-page conversions (calls booked + forms submitted combined) without reducing the raw number of calls booked.
- Primary metric: total contact-page conversions per visitor; guardrail metric: calls booked (should not drop).

**3. Pricing card CTA copy: "Get Started" vs. "Book a Call About [Tier]"**
- Hypothesis: because "Get Started" implies a lower-friction next step than a scheduled call actually is, matching the button copy to the true next action will reduce post-click bounce and increase completed Calendly bookings from Services-page traffic.
- Primary metric: Calendly booking completion rate, filtered to sessions that clicked a pricing-card CTA.

**4. Social proof placement: testimonial above the fold vs. current position (once one exists)**
- Hypothesis: because the absence of third-party proof is the single largest named credibility gap, moving the first real testimonial/result directly under the Hero (ahead of TrustStrip) will lift hero CTA click rate more than leaving it in its default lower position.
- Primary metric: hero CTA click-through rate.

**5. Default call length: 15-minute "Quick Fit Call" vs. current 45-minute default on Contact**
- Hypothesis: because 45 scheduled minutes is a large ask for a first touch with an unproven local vendor, offering a shorter call as the default option will increase total bookings, even accounting for some of those leads later converting to a full 45-minute follow-up.
- Primary metric: total calls booked per visitor to `/contact`.

---

*All recommendations in this report are grounded in the current verbatim copy in `docs/marketing-audit/_brief.md` Section 2, the JSN Marketing competitor profile in `competitor-profiles/jsn-marketing.md`, or a named psychological principle from the `marketing-psychology` skill (activation energy, authority bias, scarcity heuristic, availability heuristic, foot-in-the-door). No recommendation invents a new service or claim Render can't currently back up.*
