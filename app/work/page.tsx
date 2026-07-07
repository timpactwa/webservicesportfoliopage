import type { Metadata } from 'next'
import WorkGrid from '@/components/sections/WorkGrid'

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'See live website demos and consulting proof from Render — web design, online booking, and nonprofit strategy work for Morris County, NJ businesses.',
  openGraph: {
    title: 'Our Work | Render',
    description:
      'See live website demos and consulting proof from Render — web design, online booking, and nonprofit strategy work for Morris County, NJ businesses.',
  },
}

export default function WorkPage() {
  return <WorkGrid />
}
