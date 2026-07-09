import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import TrustStrip from '@/components/sections/TrustStrip'
import WhatWeDo from '@/components/sections/WhatWeDo'
import WhyUs from '@/components/sections/WhyUs'
import PortfolioTeaser from '@/components/sections/PortfolioTeaser'
import ProofBar from '@/components/sections/ProofBar'
import Faq from '@/components/sections/Faq'
import { FAQ_ITEMS } from '@/lib/data'

export const metadata: Metadata = {
  title: {
    absolute: 'Render | Web Design & AI Consulting, Morris County, NJ',
  },
  openGraph: {
    title: 'Render | Web Design & AI Consulting, Morris County, NJ',
    description:
      'Render builds fast, modern websites and practical AI tools for local businesses in Morris County, NJ. Founder-led. Agency quality. Honest pricing.',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape < so a "</script>" sequence in the data can never close the tag
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />
      {/* Renders nothing until a real client testimonial exists. */}
      <Testimonials />
      <TrustStrip />
      <WhatWeDo />
      <PortfolioTeaser />
      <ProofBar />
      <WhyUs />
      <Faq />
    </>
  )
}
