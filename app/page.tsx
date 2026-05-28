import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import WhatWeDo from '@/components/sections/WhatWeDo'
import WhyUs from '@/components/sections/WhyUs'
import PortfolioTeaser from '@/components/sections/PortfolioTeaser'

export const metadata: Metadata = {
  title: {
    absolute: 'Render | Web Design & AI Consulting, Morris County, NJ',
  },
  openGraph: {
    title: 'Render | Web Design & AI Consulting, Morris County, NJ',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <WhyUs />
      <PortfolioTeaser />
    </>
  )
}
