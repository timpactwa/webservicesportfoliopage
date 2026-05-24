import type { Metadata } from 'next'
import AboutContent from '@/components/sections/AboutContent'

export const metadata: Metadata = {
  title: 'About | STUDIO',
}

export default function AboutPage() {
  return <AboutContent />
}
