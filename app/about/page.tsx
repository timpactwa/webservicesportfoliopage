import type { Metadata } from 'next'
import AboutContent from '@/components/sections/AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the Render team: two Virginia Tech students building modern websites and AI solutions for local businesses in Morris County, NJ.',
  openGraph: {
    title: 'About | Render',
    description:
      'Meet the Render team: two Virginia Tech students building modern websites and AI solutions for local businesses in Morris County, NJ.',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
