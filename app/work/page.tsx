import type { Metadata } from 'next'
import WorkGrid from '@/components/sections/WorkGrid'

export const metadata: Metadata = {
  title: 'Our Work | STUDIO',
}

export default function WorkPage() {
  return <WorkGrid />
}
