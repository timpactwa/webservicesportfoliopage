import type { Metadata } from 'next'
import WorkGrid from '@/components/sections/WorkGrid'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'See recent web design and AI automation projects by Render, built for local businesses in Morris County, NJ.',
  openGraph: {
    title: 'Our Work | Render',
    description:
      'See recent web design and AI automation projects by Render, built for local businesses in Morris County, NJ.',
  },
}

export default function WorkPage() {
  return <WorkGrid />
}
