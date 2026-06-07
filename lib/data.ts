export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const PRICING_TIERS = [
  {
    tier: 'Starter' as const,
    priceRange: '$500',
    monthlyRange: '$50/mo',
    isHighlighted: false,
    ctaHref: '/contact',
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
    tier: 'Standard' as const,
    priceRange: '$750',
    monthlyRange: '$75/mo',
    isHighlighted: true,
    ctaHref: '/contact',
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
    tier: 'Premium' as const,
    priceRange: '$2,000',
    monthlyRange: '$125/mo',
    isHighlighted: false,
    ctaHref: '/contact',
    features: [
      '7+ page custom website',
      'Booking or lead workflow integration',
      'Custom animations or interactive sections',
      'Expanded local SEO structure',
      'Analytics dashboard',
      'Priority launch support',
    ],
  },
]

export const TEAM_MEMBERS = [
  {
    name: 'Tim Pactwa',
    role: 'Co-founder',
    school: 'Virginia Tech',
    focus: 'Computer Science',
    bio: "I build the sites. CS student at Virginia Tech with a focus on modern web technologies. I'm obsessed with performance, clean code, and building things that actually work.",
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
    bio: 'I handle the strategy. Business and marketing student focused on helping local businesses tell their story online and grow their customer base without burning money.',
    initials: 'L',
    accentShape: 'circle' as const,
    linkedin: 'https://www.linkedin.com/in/lukewilkins2/',
    image: '/luke.jpg',
  },
]

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
  },
  {
    projectName: 'Morristown Bakery Co.',
    category: 'Web Design',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-indigo-700',
    isComingSoon: true,
  },
  {
    projectName: 'Peak Landscaping',
    category: 'Web Design & SEO',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-700',
    isComingSoon: true,
  },
  {
    projectName: 'Denville Dental',
    category: 'AI Automation',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-700',
    isComingSoon: true,
  },
]

export const WHY_US_ITEMS = [
  {
    number: '01',
    title: 'No Agency Markup',
    description: "We have no office, no account managers, no overhead. You pay for the work.",
  },
  {
    number: '02',
    title: 'Modern Tech Stack',
    description: "Fast, modern websites built for performance, not outdated templates that slow you down.",
  },
  {
    number: '03',
    title: 'Straight Talk',
    description: "We tell you exactly what we're building, what it costs, and when it's done.",
  },
  {
    number: '04',
    title: 'Invested Partners',
    description: "Your site is our portfolio. We care about your results because they're our reputation.",
  },
]
