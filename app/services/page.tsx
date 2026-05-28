import type { Metadata } from 'next'
import ServicesDetail from '@/components/sections/ServicesDetail'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web design, local SEO, and AI automation services for small businesses in Morris County, NJ. Transparent pricing starting at $500. No agency markup.',
  openGraph: {
    title: 'Services | Render',
    description:
      'Web design, local SEO, and AI automation services for small businesses in Morris County, NJ. Transparent pricing starting at $500. No agency markup.',
  },
}

export default function ServicesPage() {
  return <ServicesDetail />
}
