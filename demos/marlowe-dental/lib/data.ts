export type Service = {
  slug: string
  name: string
  tag: string
  blurb: string
  includes: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'preventive',
    name: 'Preventive Care',
    tag: 'Every 6 months',
    blurb: 'Cleanings, digital X-rays, and exams that catch small problems while they are still small, and painless to fix.',
    includes: ['Gentle hygiene cleanings', 'Low-dose digital X-rays', 'Oral cancer screening', 'Custom nightguards'],
  },
  {
    slug: 'restorative',
    name: 'Restorative Dentistry',
    tag: 'Same-week visits',
    blurb: 'Tooth-colored fillings, crowns, and bridges that match your smile so well you will forget which tooth it was.',
    includes: ['Tooth-colored fillings', 'Same-day crowns', 'Bridges & implant crowns', 'Root canal therapy'],
  },
  {
    slug: 'cosmetic',
    name: 'Cosmetic Dentistry',
    tag: 'Free consultations',
    blurb: 'Whitening, veneers, and bonding planned around your face and your goals, never a one-size-fits-all smile.',
    includes: ['Professional whitening', 'Porcelain veneers', 'Cosmetic bonding', 'Digital smile preview'],
  },
  {
    slug: 'family',
    name: 'Family & Kids',
    tag: 'Ages 3 and up',
    blurb: 'First visits that end in high-fives. We book families back-to-back so everyone is seen in one trip.',
    includes: ['First-visit "happy visits"', 'Sealants & fluoride', 'Sports mouthguards', 'Family block scheduling'],
  },
  {
    slug: 'emergency',
    name: 'Emergency Care',
    tag: 'Same-day when it hurts',
    blurb: 'Toothaches, chips, and knocked-out teeth do not wait for openings. Call before noon and we will see you today.',
    includes: ['Same-day pain relief', 'Cracked & chipped teeth', 'After-hours phone line', 'Clear cost before treatment'],
  },
  {
    slug: 'anxiety',
    name: 'Comfort Dentistry',
    tag: 'For nervous patients',
    blurb: 'Noise-cancelling headphones, weighted blankets, nitrous, and a pace you control. Tell us once; we remember.',
    includes: ['Nitrous oxide available', 'Signal-to-pause system', 'Longer, unhurried visits', 'Comfort menu at every chair'],
  },
]

export const TEAM = [
  {
    name: 'Dr. Elena Marlowe, DMD',
    role: 'Founder & General Dentist',
    bio: 'Rutgers School of Dental Medicine. Fifteen years of practice, the last eight spent building the kind of office she wished existed when she was a nervous patient herself.',
    credentials: ['Rutgers SDM, 2010', 'Fellow, Academy of General Dentistry', 'Invisalign certified'],
  },
  {
    name: 'Dr. James Okafor, DDS',
    role: 'General & Cosmetic Dentist',
    bio: 'NYU College of Dentistry. Leads our cosmetic cases and same-day crown work. Known for explaining everything twice without being asked.',
    credentials: ['NYU Dentistry, 2015', 'AACD member', 'CEREC same-day crowns'],
  },
  {
    name: 'Maria Reyes, RDH',
    role: 'Lead Hygienist',
    bio: 'Twelve years with the practice. Patients book six months out to keep their spot with her. Gentle is not a marketing word here.',
    credentials: ['Bergen CC Dental Hygiene', 'Laser hygiene certified', 'Local anesthesia licensed'],
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'I avoided dentists for nine years. Dr. Marlowe never once made me feel bad about it. We made a plan, spread it over months, and I just had a visit with zero work needed.',
    name: 'Rachel B.',
    detail: 'Patient since 2022',
  },
  {
    quote:
      'They told me the crown price before I sat down, texted when they were running ten minutes late, and the crown was done in one visit. Every doctor’s office should run like this.',
    name: 'Marcus W.',
    detail: 'Patient since 2023',
  },
  {
    quote:
      'My six-year-old asks when she gets to go back. I don’t know what kind of magic that is, but we drive twenty-five minutes past three other dentists for it.',
    name: 'Dana K.',
    detail: 'Family of four, patients since 2021',
  },
]

export const INSURERS = ['Delta Dental', 'Cigna', 'Aetna', 'MetLife', 'Guardian', 'UnitedHealthcare']

export const VISIT_REASONS = [
  'Cleaning & checkup',
  'Tooth pain or sensitivity',
  'Chipped or broken tooth',
  'Cosmetic consultation',
  'Second opinion',
  'New to the area',
]

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'New Patients', href: '/new-patients' },
]

export const PRACTICE = {
  name: 'Marlowe Dental Studio',
  tagline: 'Dentistry that starts by listening.',
  phone: '(973) 555-0177',
  phoneHref: 'tel:9735550177',
  email: 'hello@marlowedental.com',
  address: '210 Broadway, Denville, NJ 07834',
  hours: [
    ['Mon – Thu', '8:00 AM – 6:00 PM'],
    ['Friday', '8:00 AM – 2:00 PM'],
    ['Saturday', 'Two per month'],
  ] as [string, string][],
}
