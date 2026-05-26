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
    priceRange: '$300–500',
    monthlyRange: '$30–50/mo',
    isHighlighted: false,
    ctaHref: '/contact',
    features: [
      '3–5 page website',
      'Mobile responsive',
      'Contact form',
      'Basic SEO setup',
      'Google Analytics integration',
      'Monthly maintenance',
    ],
  },
  {
    tier: 'Standard' as const,
    priceRange: '$600–900',
    monthlyRange: '$50–75/mo',
    isHighlighted: true,
    ctaHref: '/contact',
    features: [
      '5–8 page website',
      'Custom animations',
      'Blog or news section',
      'Advanced SEO',
      'Performance optimization',
      'Priority support',
    ],
  },
  {
    tier: 'Premium' as const,
    priceRange: '$1,000–1,500',
    monthlyRange: '$75–150/mo',
    isHighlighted: false,
    ctaHref: '/contact',
    features: [
      '8+ page custom site',
      'E-commerce or booking',
      'Custom integrations',
      'Full SEO strategy',
      'Analytics dashboard',
      'Dedicated support',
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
    initials: 'P',
    accentShape: 'circle' as const,
    github: 'https://github.com/placeholder',
    linkedin: 'https://linkedin.com/in/placeholder',
    image: '',
  },
]

export const PROJECTS = [
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
    description: "Next.js, Tailwind, and real performance — not WordPress templates from 2015.",
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
