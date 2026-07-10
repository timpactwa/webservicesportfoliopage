export const NAV_LINKS = [
  // Document order, matching app/page.tsx. The active-link underline is driven by
  // whichever section is in the reading zone, so a nav ordered differently from the
  // page would light its tabs up out of sequence on scroll.
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/#work' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
]

/** Towns we name explicitly in copy. Ordered by how we want them read, not alphabetically. */
export const SERVICE_TOWNS = ['Randolph', 'Denville', 'Morristown', 'Parsippany', 'Madison']

/**
 * Single source of truth for how we describe the demo sites. The three demos are
 * sample brands we invented and built, not real businesses or paying clients, and
 * every surface that shows them has to say so.
 */
export const DEMO_DISCLAIMER = {
  badge: 'Demo template',
  short: 'A sample site we designed and built. Not a real business.',
  long: 'Fuego Street Tacos, Hartline Builders, and Marlowe Dental Studio are demo templates we designed and built to show what we can do. They are sample brands, not real businesses and not paying clients. Hope Tree Family Services is a real consulting engagement.',
}

/** Honest scarcity. True today: rates go up once the portfolio fills out. */
/**
 * Founding client pricing. Each tier's struck-through `standardPrice` is what
 * Render charges once these slots are gone, so the note is a published
 * commitment rather than a label. A discount with no reference price and no
 * limit persuades nobody, because there is nothing it is cheaper than.
 *
 * Update `claimedSlots` as founding clients sign. When it reaches `totalSlots`,
 * move each tier's `standardPrice` into `priceRange`, delete `standardPrice`,
 * and this note empties itself out.
 */
export const FOUNDING_CLIENT = {
  totalSlots: 5,
  claimedSlots: 0,
}

export const FOUNDING_SLOTS_LEFT = FOUNDING_CLIENT.totalSlots - FOUNDING_CLIENT.claimedSlots

/**
 * Never renders "5 of 5 slots left", which would tell every visitor that nobody
 * has bought yet. Before the first sale it states the cap; after it, the count.
 */
export const FOUNDING_CLIENT_NOTE =
  FOUNDING_SLOTS_LEFT <= 0
    ? ''
    : FOUNDING_CLIENT.claimedSlots === 0
      ? `Founding client price, for our first ${FOUNDING_CLIENT.totalSlots} clients.`
      : `Founding client price. ${FOUNDING_SLOTS_LEFT} of ${FOUNDING_CLIENT.totalSlots} slots left.`

/**
 * Risk reversal. This is a promise, so it has to stay true of the process:
 * a first design direction is shown BEFORE any deposit is taken.
 */
export const GUARANTEE = {
  short: 'Your first design direction is on us.',
  long: "Your first design direction is on us. If it isn't right, you walk away and no deposit is taken.",
}

export type PricingTier = {
  tier: 'Starter' | 'Standard' | 'Premium' | 'Custom'
  priceRange: string
  /** What this tier costs once the founding slots are gone. Rendered struck through. */
  standardPrice?: string
  monthlyRange: string
  summary: string
  isHighlighted?: boolean
  badge?: string
  note?: string
  ctaLabel: string
  ctaHref: string
  features: string[]
}

export const PRICING_TIERS: PricingTier[] = [
  {
    tier: 'Starter',
    priceRange: '$500',
    standardPrice: '$1,500',
    monthlyRange: '$99/mo',
    summary: 'For a business that needs a clean, professional site online fast.',
    isHighlighted: false,
    note: FOUNDING_CLIENT_NOTE,
    ctaLabel: 'Book a Call About Starter',
    ctaHref: '/contact?tier=Starter',
    features: [
      '1-3 page website',
      'Mobile-ready responsive build',
      'Contact form',
      'Launch-ready page structure',
      'Basic on-page SEO',
      'Google Analytics setup',
    ],
  },
  {
    tier: 'Standard',
    priceRange: '$750',
    standardPrice: '$2,900',
    monthlyRange: '$149/mo',
    summary: 'For a business ready to show up in local search and look like the obvious choice.',
    isHighlighted: true,
    badge: 'Most Chosen',
    note: FOUNDING_CLIENT_NOTE,
    ctaLabel: 'Book a Call About Standard',
    ctaHref: '/contact?tier=Standard',
    features: [
      '4-6 page website',
      'Service-focused page layouts',
      'Blog or news section',
      'Local SEO setup',
      'Performance optimization',
      'Analytics and conversion tracking',
    ],
  },
  {
    tier: 'Premium',
    priceRange: '$2,000',
    standardPrice: '$4,900',
    monthlyRange: '$199/mo',
    summary: 'For a business that wants bookings and leads running without you chasing them.',
    isHighlighted: false,
    note: FOUNDING_CLIENT_NOTE,
    ctaLabel: 'Book a Call About Premium',
    ctaHref: '/contact?tier=Premium',
    features: [
      '7+ page custom website',
      'Booking or lead workflow integration',
      'Custom animations or interactive sections',
      'Expanded local SEO structure',
      'Analytics dashboard',
      'Priority launch support',
    ],
  },
  {
    tier: 'Custom',
    priceRange: "Let's talk",
    monthlyRange: 'Scoped with you',
    summary: 'Multiple locations, online ordering, or AI automation built into the build.',
    isHighlighted: false,
    ctaLabel: 'Scope My Project',
    ctaHref: '/contact?tier=Custom',
    features: [
      'Multi-location or franchise builds',
      'E-commerce and online ordering',
      'AI automation built into the site',
      'Custom integrations with your tools',
      'A fixed number before you commit',
      'Never a vague "contact us for a quote"',
    ],
  },
]

export const TEAM_MEMBERS = [
  {
    name: 'Tim Pactwa',
    role: 'Co-founder',
    school: 'Virginia Tech',
    focus: 'Computer Science',
    bio: "Tim builds every Render site and leads the AI automation work. He studies Computer Science at Virginia Tech, researches XR security through Spatial Seer (3rd place at VT's Undergraduate Research Symposium), and built DBWorkout, a gamified tool for learning SQL. He also interns in IT and Asset Management at Suburban Propane. His LinkedIn and GitHub are below if you want to check the work yourself.",
    initials: 'T',
    accentShape: 'square' as const,
    github: 'https://github.com/timpactwa',
    linkedin: 'https://linkedin.com/in/timpactwa',
    image: '/tim.JPEG',
  },
  {
    name: 'Luke Wilkins',
    role: 'Co-founder',
    school: 'Virginia Tech',
    focus: 'Finance',
    bio: 'Luke leads strategy and handles the numbers behind every project. He studies Finance at Virginia Tech and consults with 180 Degrees Consulting, where he built the foster parent recruitment strategy and KPI framework behind the Hope Tree Family Services case study. He works with owners on positioning, pricing, and what the site actually needs to do.',
    initials: 'L',
    accentShape: 'circle' as const,
    linkedin: 'https://www.linkedin.com/in/lukewilkins2/',
    image: '/luke.jpg',
    imageClassName: 'scale-[1.35]',
  },
]

export type Testimonial = {
  quote: string
  name: string
  business: string
  town?: string
  /** A concrete outcome, e.g. "3x more booking requests in 60 days". Only ever a real, measured number. */
  result?: string
  source?: 'Google Review' | 'Direct'
}

/**
 * Real client testimonials only. Never seed this with sample, placeholder, or
 * illustrative quotes: the Testimonials section renders nothing while it is empty,
 * which is the honest state until a paying client gives us a quote.
 *
 * TODO: drop the first real client testimonial here (quote, name, business, town,
 * and a measured result if we have one). It belongs directly under the hero.
 */
export const TESTIMONIALS: Testimonial[] = []

export type ProjectProofImage = {
  src: string
  alt: string
  label: string
}

export type ProjectCaseStudy = {
  eyebrow: string
  title: string
  summary: string
  challenge: string
  role: string
  research: string
  recommendation: string
  deliverables: string[]
  proofImages: ProjectProofImage[]
  stats: {
    value: string
    label: string
    description: string
  }[]
}

export type Project = {
  projectName: string
  category: string
  description?: string
  gradientFrom?: string
  gradientTo?: string
  isComingSoon?: boolean
  demoUrl?: string
  imageUrl?: string
  imageAlt?: string
  detailHeroImageUrl?: string
  detailHeroImageAlt?: string
  posterUrl?: string
  posterAlt?: string
  cardLabel?: string
  featured?: boolean
  featuredLabel?: string
  date?: string
  role?: string
  tags?: string[]
  proofPoints?: string[]
  caseStudy?: ProjectCaseStudy
}

export const PROJECTS: Project[] = [
  {
    projectName: 'Fuego Street Tacos',
    category: 'Web Design + Online Ordering',
    description: 'Full restaurant demo: animated menu, cart, and a simulated Stripe checkout with pickup and delivery.',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-600',
    featured: true,
    featuredLabel: 'Live Website Demo',
    isComingSoon: false,
    demoUrl: 'https://fuego-street-tacos.vercel.app',
    posterUrl: '/work/posters/fuego-street-tacos.png',
    posterAlt: 'Fuego Street Tacos demo homepage',
  },
  {
    projectName: 'Hartline Builders',
    category: 'Web Design + Online Booking',
    description: 'Full contractor demo: animated blueprint hero and a 5-step work order booking flow for estimate requests.',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-blue-900',
    featured: true,
    featuredLabel: 'Live Website Demo',
    isComingSoon: false,
    demoUrl: 'https://hartline-builders.vercel.app',
    posterUrl: '/work/posters/hartline-builders.png',
    posterAlt: 'Hartline Builders demo homepage',
  },
  {
    projectName: 'Marlowe Dental Studio',
    category: 'Web Design + Patient Intake',
    description: 'Full dental practice demo: boutique brand identity and a 5-step intake flow for new patient appointment requests.',
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-emerald-800',
    featured: true,
    featuredLabel: 'Live Website Demo',
    isComingSoon: false,
    demoUrl: 'https://marlowe-dental.vercel.app',
    posterUrl: '/work/posters/marlowe-dental.png',
    posterAlt: 'Marlowe Dental Studio demo homepage',
  },
  {
    projectName: 'Hope Tree Family Services',
    category: 'Consulting | Nonprofit Strategy',
    description:
      'Foster parent recruitment strategy, KPI tracking, and a practical social media execution kit for a nonprofit client.',
    imageUrl: '/work/hope-tree-family-services/hope-tree-featured-proof.png',
    imageAlt:
      'Clean Hope Tree Family Services consulting proof artwork showing the execution kit cover and three proof points for the launch plan, KPI tracker, and social execution kit.',
    detailHeroImageUrl: '/work/hope-tree-family-services/hope-tree-detail-hero.png',
    detailHeroImageAlt:
      'Detailed Hope Tree consulting proof artwork with the execution kit cover, mock profile concept, KPI tracker, and playbook excerpts framed without cropping.',
    cardLabel: 'Case Study',
    featured: true,
    featuredLabel: 'Consulting Proof',
    isComingSoon: false,
    date: 'Spring 2026',
    role: 'Luke Wilkins, Consultant, 180 Degrees Consulting at Virginia Tech',
    tags: ['Consulting', 'Nonprofit Strategy', 'KPI Tracking', 'Social Media'],
    proofPoints: [
      'Built a foster parent recruitment strategy around clearer social media positioning.',
      'Created KPI targets, benchmark logic, and a 90-day execution framework.',
      'Packaged recommendations into staff-ready playbooks and outreach assets.',
    ],
    caseStudy: {
      eyebrow: 'Consulting Proof',
      title: 'A nonprofit recruitment strategy built to move from research to execution.',
      summary:
        'The Hope Tree Family Services project turned foster parent recruitment research into a usable social media execution kit, KPI tracking playbook, and 90-day launch plan.',
      challenge:
        'Hope Tree needed a clearer way to recruit therapeutic foster care parents while simplifying a message that can feel confusing or intimidating to prospective families.',
      role:
        'Luke Wilkins served as a consultant with 180 Degrees Consulting at Virginia Tech, contributing to research, strategic recommendations, and the final client-facing deliverables.',
      research:
        'The team reviewed foster care participation trends, nonprofit social media benchmarks, competitor positioning, audience motivations, and Hope Tree baseline signals.',
      recommendation:
        'The final recommendation centered on a dedicated therapeutic foster care social strategy with people-centered content, KPI tracking, local outreach, and a phased launch plan.',
      deliverables: [
        'Social Media Execution Kit',
        'KPI Tracking & Benchmark Playbook',
        '90-Day Launch Plan',
        'Hashtag & Keyword Guide',
        'Church Outreach Email Templates',
        'Meta Ad Playbook',
      ],
      proofImages: [
        {
          src: '/work/hope-tree-family-services/execution-kit-cover.png',
          alt: 'HopeTree TFC Social Media Execution Kit cover.',
          label: 'Execution Kit',
        },
        {
          src: '/work/hope-tree-family-services/kpi-tracking-benchmarks.png',
          alt: 'KPI tracking and benchmark table excerpt from the Hope Tree deliverable.',
          label: 'KPI Tracker',
        },
        {
          src: '/work/hope-tree-family-services/meta-ad-playbook.png',
          alt: 'Monthly budget and campaign split excerpt from the Meta ad playbook.',
          label: 'Ad Playbook',
        },
        {
          src: '/work/hope-tree-family-services/hashtag-content-guide.png',
          alt: 'Hashtag, keyword, tone, and content cadence guide excerpt.',
          label: 'Content Guide',
        },
      ],
      stats: [
        {
          value: '90',
          label: 'day launch plan',
          description: 'Phased setup, content cadence, and execution guidance.',
        },
        {
          value: '6',
          label: 'deliverable areas',
          description: 'Strategy, KPI tracking, outreach, content, ads, and flyer guidance.',
        },
        {
          value: '3',
          label: 'KPI categories',
          description: 'Engagement, reach, and conversion signals for staff to monitor.',
        },
      ],
    },
  },
]

export const TRUST_MARKERS = [
  {
    label: 'Founder-led',
    description: 'You work directly with the people building your site. No account managers, no markup.',
  },
  {
    label: 'Built for speed',
    description: 'Every site is built from scratch and tested against Google\'s speed benchmarks, not assembled from a slow theme.',
  },
  {
    label: 'SEO included',
    description: 'On-site local SEO comes standard, so you show up when someone nearby searches for what you do.',
  },
  {
    label: '2–4 week launch',
    description: 'Typical timeline from kickoff to launch once we have your content and direction.',
  },
]

// Every marker here has to be something a skeptical visitor can go and check for
// themselves in one click. That is the promise the section eyebrow makes.
//
// These render in ProofStrip directly under the homepage hero, where they answer
// "why Render" with three claims a stranger can falsify rather than four claims
// any agency could also make. Copy therefore points *down* the page, not up.
export const PROOF_MARKERS = [
  {
    label: 'Pricing on the page',
    description:
      'Every package price is published right here. No "contact us for a quote," no sales call before you see a number.',
    href: '/#pricing',
  },
  {
    label: 'Tim and Luke, by name',
    description:
      'Real names, real profiles, a real email that gets answered. Look us up before you ever reply to us.',
    href: '/about',
  },
  {
    label: 'Live demo sites',
    description:
      'The demos below are clickable, not screenshots. Open any one and use it the way a customer would.',
    href: '/#work',
  },
]

export const FAQ_ITEMS = [
  {
    question: 'How much does a website cost?',
    answer:
      'Every package is a clear, fixed price, so you know the number before you commit. Starter begins at $500 for a focused 1–3 page site, with Standard and Premium tiers for larger builds. See the full breakdown on our Services page.',
  },
  {
    question: 'How long until my site launches?',
    answer:
      'Most websites launch in 2–4 weeks after we receive your content and project details. Simple sites can move faster; larger builds with custom features take a bit longer.',
  },
  {
    question: 'Do I own my website?',
    answer:
      'Yes. Once your project is complete and paid, the site and its content are yours.',
  },
  {
    question: "What if I don't like the design?",
    answer:
      "You see a first design direction before you pay a deposit. If it isn't right, you walk away and owe nothing. Once we're building, revisions are part of the process, not an extra charge. We're not done until the site looks right to you, not just to us.",
  },
  {
    question: 'How do I know the 2–4 week timeline is real?',
    answer:
      "The clock starts once we have your content and direction, which is the one part in your hands. From there we tell you exactly what we're waiting on at every step, so \"still in progress\" never turns into radio silence.",
  },
  {
    question: 'What do I need to have ready?',
    answer:
      "Whatever you've got: photos, a rough idea, or examples you like. We work from any starting point and guide you through copy, structure, and design.",
  },
  {
    question: 'Is SEO included?',
    answer:
      'Yes. On-site local SEO comes standard with every build: clean metadata, fast load times, mobile-responsive design, and search-friendly page structure.',
  },
  {
    question: 'What does the monthly fee cover?',
    answer:
      'The monthly plan is optional and month to month, not a contract. It covers hosting support, small content updates, and fixes. Start without it and add it later, or cancel anytime if you decide you do not need it.',
  },
  {
    question: 'I get my customers from Facebook and word of mouth. Why add a website?',
    answer:
      "Those referrals still look you up before they call, and what they find is whatever Google and Yelp say about you. A website is the one place online you fully control: it shows up when locals search for what you do, works for the two-thirds of people who aren't on Facebook, and never puts a competitor's ad next to your name.",
  },
  {
    question: 'Do you only work with Morris County businesses?',
    answer:
      "We're based in Morris County and work most often in Randolph, Denville, Morristown, Parsippany, and Madison. If you're in a nearby town, we're still happy to talk.",
  },
]

/**
 * The two promises that remove a stranger's risk, rendered at the bottom of WhyUs
 * so they land immediately before the homepage shows a price. Both are addressed
 * at the fear that stops a local owner from calling a designer they have never
 * heard of: that they will be committed before they know what they are getting.
 *
 * `headline` reuses GUARANTEE.long rather than restating it, so the guarantee has
 * exactly one wording across every page that makes it.
 *
 * This replaces the old WHY_US_ITEMS array, which nothing ever rendered. Its other
 * two entries already live elsewhere: founding-client pricing in FOUNDING_CLIENT_NOTE,
 * and the founders themselves in PROOF_MARKERS and TEAM_MEMBERS.
 */
export const RISK_REVERSAL = {
  headline: GUARANTEE.long,
  supporting:
    'Every project starts with a fixed-price summary. No change orders unless you ask for something outside the original scope.',
}

/**
 * Who Render is wrong for. This sits directly beneath the prices, because a low
 * price with no stated trade-off reads as "the same thing, but cheaper," which
 * invites the buyer to wonder what got cut. A low price with a named trade-off
 * reads as a deliberate operating model.
 *
 * Rendered on the homepage pricing section and on the "choosing a web designer"
 * guide, which is where this copy originally lived.
 */
export const NOT_A_FIT = {
  headline: 'When Render is not the right choice',
  intro: "We would rather say this before you pay us than after.",
  cases: [
    {
      title: 'You need a full-service agency',
      body: 'If you want a large build backed by a big ad budget, a dedicated account team, and campaigns coordinated across several channels, an agency built for that scale will serve you better than a two-person shop.',
    },
    {
      title: 'You need one page, once',
      body: 'If it is for a hobby or a one-time event, and it does not need to rank locally or grow alongside a business, a DIY builder is genuinely enough, and cheaper.',
    },
  ],
  closing:
    'Render is built for small, local businesses that want a real site, real local SEO, and a direct line to the two people building it, without agency overhead.',
}

export type Differentiator = { title: string; description: string }

// The homepage "Why Render" row. Deliberately conservative claims: every line is
// literally true of this two-founder business today, no invented metrics or scope.
//
// Scoped to what the build itself delivers. Published pricing and the named
// founders were dropped from this list because PROOF_MARKERS already states both
// at the top of the page, where a visitor can click through and verify them. A
// claim repeated in three sections reads as filler, not emphasis.
export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Built to convert',
    description:
      'Engineered to turn visitors into booked customers, not just a digital brochure.',
  },
  {
    title: 'Hours back every week',
    description:
      'AI automation handles the missed calls, reviews, and follow-ups you do not have time for.',
  },
  {
    title: 'SEO-first build',
    description:
      'Structured and optimized to show up when locals search for what you do.',
  },
]

export type AIUseCase = {
  title: string
  description: string
}

// Practical AI automation examples, kept concrete and free of invented outcomes.
// Every description stays to two sentences and reports what the system does,
// never a made-up hours-saved or dollars-saved figure.
export const AI_USE_CASES: AIUseCase[] = [
  {
    title: 'Missed-call text-back',
    description:
      "A call you can't pick up gets an instant text back, so the person doesn't just hang up and call the next name on Google. It works whether you're on a job, driving, or already on the phone.",
  },
  {
    title: 'Review requests on autopilot',
    description:
      'Once a job wraps, the customer gets a text or email with a direct link to leave a review. Nobody on your team has to remember to send it.',
  },
  {
    title: 'Appointment and quote follow-up',
    description:
      'A quote that never got an answer gets a friendly nudge instead of sitting in your inbox. Upcoming appointments get a reminder, so fewer people forget to show.',
  },
  {
    title: 'After-hours FAQ answering',
    description:
      'Your site answers the questions people ask at 9pm: your hours, your pricing range, and what services you offer. You get fewer basic questions and more inquiries worth calling back.',
  },
  {
    title: 'Lead routing and triage',
    description:
      "New inquiries land already sorted by what they're asking for, with urgent ones flagged. You see what needs a callback today instead of digging through one shared inbox.",
  },
  {
    title: 'Self-updating SOPs',
    description:
      "The checklist your crew uses stays current on its own as your process changes, instead of living in someone's head or a stale printout. New hires get the same answer every time.",
  },
]

export type LaunchTimelineStep = {
  week: string
  title: string
  description: string
}

// Mirrors the real four-step process in WebDesignDetail.tsx, mapped onto the
// 2-4 week launch window we already promise elsewhere on the site.
export const LAUNCH_TIMELINE: LaunchTimelineStep[] = [
  {
    week: 'Week 1',
    title: 'Call and first design direction',
    description:
      "We start with a free call to scope what you need, then show you a real design direction before any deposit changes hands. If it isn't right, you walk away and owe nothing.",
  },
  {
    week: 'Week 1-2',
    title: 'Deposit and content collection',
    description:
      "Once you approve the direction, your deposit starts the build and we collect your content and details. We tell you exactly what we're waiting on at every step, so nothing stalls in silence.",
  },
  {
    week: 'Week 2-3',
    title: 'The build',
    description:
      "Your site gets built from scratch and tested against Google's speed benchmarks, not assembled from a slow theme. This is the longest stretch of the timeline, typically 2 to 4 weeks once we have your content.",
  },
  {
    week: 'Week 3-4',
    title: 'Launch and the Care Plan',
    description:
      'Your site goes live and you own it, no strings attached. The optional Care Plan keeps it updated and running from there, month to month with no contract.',
  },
]

/**
 * The render-verb closer on the homepage. The trailing period lives inside each
 * word: a period placed after the slot would sit at the right edge of a box
 * sized for "customers." and float away from the shorter words.
 *
 * "customers." is both the longest entry and the resting one, which is what
 * makes the slot's resting width its natural width and its layout shift zero.
 * Reordering so it rests on a shorter word breaks that guarantee.
 */
export const RENDER_PROMISE = {
  lead: "We don't just render websites.",
  verb: 'We render',
  words: ['leads.', 'bookings.', 'customers.'],
  /** Seconds each non-final word holds once sharp. Decelerating. */
  holds: [0.55, 0.75],
} as const

/**
 * Homepage demo section. The offer deliberately says "in that style" and never
 * "replicate": site copy, images, and code are copyrightable, and a distinctive
 * design can support a trade-dress claim. A homepage that promises to reproduce
 * a URL a customer sends is a written commitment to do exactly that.
 */
export const DEMO_SECTION = {
  headline: 'Demo websites you can click.',
  intro: 'Sample sites we designed and built. Not real businesses, and not client work.',
  offer:
    "See a website template you like, here or on another site? Send us the link and we'll build you something in that style, with your brand and your content.",
}

/** Rendered as stacked lines, so pricing owns the tallest headline block on the page. */
export const PRICING_HEADLINE = ['No BS.', 'No hidden fees.'] as const

/** The one em dash approved for shipped copy. See CLAUDE.md. */
export const PRICING_CUSTOM_LABEL = "Custom — let's talk."

export const LAUNCH_TIMELINE_SECTION = {
  eyebrow: 'Your launch timeline',
  headline: 'From first call to live site.',
}

export const CTA_BAND = {
  headline: "Ready to see what we'd build?",
  body: 'Tell us what you need and a couple of times that work. We map out exactly what we would build, on a free call, with nothing to buy.',
}

/** What happens after someone submits the form. Shown beside it in the booking modal. */
export const CALL_STEPS = [
  'You send a couple of times that work for you.',
  'We confirm one by email, usually within a business day.',
  'On the call we map out exactly what we would build, and what it costs.',
]
