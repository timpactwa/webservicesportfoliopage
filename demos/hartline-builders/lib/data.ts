export type Service = {
  slug: string
  name: string
  blurb: string
  scope: string[]
  timeline: string
  startingAt: string
}

export const SERVICES: Service[] = [
  {
    slug: 'kitchen',
    name: 'Kitchen Remodels',
    blurb: 'Full gut renovations and refreshes — cabinetry, counters, lighting, and layout changes that make the room work.',
    scope: ['Custom cabinetry', 'Stone & quartz counters', 'Electrical & lighting plans', 'Appliance installation'],
    timeline: '4–8 weeks',
    startingAt: '$28,000',
  },
  {
    slug: 'bath',
    name: 'Bathroom Renovations',
    blurb: 'Waterproofed, code-compliant baths built to last — from powder rooms to full primary suites.',
    scope: ['Tile & waterproofing', 'Custom glass & vanities', 'Plumbing relocation', 'Heated floors'],
    timeline: '3–5 weeks',
    startingAt: '$14,500',
  },
  {
    slug: 'deck',
    name: 'Decks & Outdoor',
    blurb: 'Composite and hardwood decks, pergolas, and screened porches engineered for New Jersey winters.',
    scope: ['Composite & cedar decking', 'Footings & framing', 'Railings & lighting', 'Permits & inspections'],
    timeline: '2–4 weeks',
    startingAt: '$16,000',
  },
  {
    slug: 'basement',
    name: 'Basement Finishing',
    blurb: 'Dry, warm, fully permitted living space — media rooms, offices, gyms, and in-law suites.',
    scope: ['Moisture control', 'Framing & insulation', 'Egress windows', 'Full electrical & HVAC'],
    timeline: '5–9 weeks',
    startingAt: '$32,000',
  },
  {
    slug: 'addition',
    name: 'Additions & Structural',
    blurb: 'Second stories, bump-outs, and garage conversions — architect-coordinated from footing to ridge.',
    scope: ['Architectural coordination', 'Foundation & framing', 'Roofing & siding tie-in', 'Township approvals'],
    timeline: '10–16 weeks',
    startingAt: '$85,000',
  },
  {
    slug: 'repair',
    name: 'Repairs & Punch Lists',
    blurb: 'The small stuff done right — rot repair, drywall, doors, trim, and the list that never gets shorter.',
    scope: ['Rot & water damage', 'Drywall & paint', 'Door & trim work', 'Half-day minimum'],
    timeline: '1–3 days',
    startingAt: '$450',
  },
]

export type Project = {
  name: string
  town: string
  type: string
  duration: string
  year: string
  summary: string
  details: string[]
}

export const PROJECTS: Project[] = [
  {
    name: 'Whitepine Kitchen',
    town: 'Randolph, NJ',
    type: 'Kitchen Remodel',
    duration: '6 weeks',
    year: '2025',
    summary: 'Load-bearing wall removed to open the kitchen to the family room. New island with seating for four, custom inset cabinetry.',
    details: ['LVL beam install', '42" inset cabinets', 'Quartzite counters', 'Under-cabinet lighting'],
  },
  {
    name: 'Shongum Lake Deck',
    town: 'Randolph, NJ',
    type: 'Deck & Outdoor',
    duration: '3 weeks',
    year: '2025',
    summary: '540 sq ft composite deck stepping down to a paver patio, with cable railings kept low to preserve the lake view.',
    details: ['TimberTech decking', 'Cable rail system', 'Helical pile footings', 'Low-voltage lighting'],
  },
  {
    name: 'Mendham Primary Bath',
    town: 'Mendham, NJ',
    type: 'Bathroom Renovation',
    duration: '5 weeks',
    year: '2024',
    summary: 'Cramped 1980s bath reworked into a wet-room layout with a curbless shower, freestanding tub, and heated marble floor.',
    details: ['Curbless shower pan', 'Schluter waterproofing', 'Heated floor system', 'Custom glass enclosure'],
  },
  {
    name: 'Dover Basement Suite',
    town: 'Dover, NJ',
    type: 'Basement Finishing',
    duration: '8 weeks',
    year: '2024',
    summary: '1,100 sq ft unfinished basement turned into an in-law suite with a bedroom, full bath, kitchenette, and egress window.',
    details: ['Egress window cut', 'Full bath rough-in', 'Sound-insulated ceiling', 'Separate HVAC zone'],
  },
  {
    name: 'Chester Farmhouse Addition',
    town: 'Chester, NJ',
    type: 'Addition',
    duration: '14 weeks',
    year: '2024',
    summary: 'Two-story rear addition on an 1890s farmhouse — great room below, primary suite above, siding matched to the original.',
    details: ['New foundation', 'Matched cedar siding', 'Standing-seam roof tie-in', 'Historic trim replication'],
  },
  {
    name: 'Morris Plains Refresh',
    town: 'Morris Plains, NJ',
    type: 'Repairs & Punch List',
    duration: '4 days',
    year: '2025',
    summary: 'Pre-sale punch list: rot repair at two window sills, drywall patching, interior doors rehung, full interior repaint prep.',
    details: ['Sill rot repair', 'Drywall & skim coat', '8 doors adjusted', 'Paint-ready handoff'],
  },
]

export const PROCESS = [
  {
    step: '01',
    name: 'Site Visit',
    desc: 'We walk the project with you, take measurements, and talk through what you actually want — no sales pitch.',
  },
  {
    step: '02',
    name: 'Fixed Estimate',
    desc: 'A written, line-item estimate within five business days. The number we quote is the number you pay.',
  },
  {
    step: '03',
    name: 'Permits & Schedule',
    desc: 'We pull permits, order materials, and give you a start date we keep. You get a schedule before we swing a hammer.',
  },
  {
    step: '04',
    name: 'The Build',
    desc: 'Our own crew, a clean site every night, and a text update every day work happens. No mystery subs.',
  },
  {
    step: '05',
    name: 'Walkthrough',
    desc: 'We punch out every item together before final payment. Two-year workmanship warranty on everything we build.',
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'The estimate was the price. The start date was the start date. After two bad contractor experiences, I didn’t know that was possible.',
    name: 'Karen M.',
    project: 'Kitchen remodel, Randolph',
  },
  {
    quote:
      'Daily text updates with photos. My basement was done a week early and the site was cleaner than my garage every single night.',
    name: 'Dave T.',
    project: 'Basement finish, Dover',
  },
  {
    quote:
      'They found rot the last guy covered up, showed me photos, and fixed it for a fair change order. That’s the whole review.',
    name: 'Priya S.',
    project: 'Deck rebuild, Mendham',
  },
]

export const STATS = [
  { value: '212', label: 'Projects completed' },
  { value: '18', label: 'Years in Morris County' },
  { value: '2yr', label: 'Workmanship warranty' },
  { value: '100%', label: 'Licensed & insured' },
]

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Book', href: '/book' },
]

export const COMPANY = {
  name: 'Hartline Builders',
  tagline: 'Built to the line.',
  phone: '(973) 555-0142',
  phoneHref: 'tel:9735550142',
  email: 'office@hartlinebuilders.com',
  address: '41 Quaker Church Rd, Randolph, NJ 07869',
  license: 'NJ HIC #13VH0000000',
  hours: 'Mon–Fri 7:00–5:00 · Sat by appointment',
}
