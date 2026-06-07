import type { Metadata } from 'next'
import WorkGrid from '@/components/sections/WorkGrid'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'See website demos and consulting proof from Render, including nonprofit strategy, web design, and practical digital work.',
  openGraph: {
    title: 'Our Work | Render',
    description:
      'See website demos and consulting proof from Render, including nonprofit strategy, web design, and practical digital work.',
  },
}

export default function WorkPage() {
  return <WorkGrid />
}
