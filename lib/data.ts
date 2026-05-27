export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
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
    description: "Fast, modern websites built for performance — not outdated templates that slow you down.",
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
