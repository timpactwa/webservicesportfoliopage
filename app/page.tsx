import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import TrustStrip from '@/components/sections/TrustStrip'
import HomeServices from '@/components/sections/HomeServices'
import HomeWork from '@/components/sections/HomeWork'
import HomePricing from '@/components/sections/HomePricing'
import WhyUs from '@/components/sections/WhyUs'
import Faq from '@/components/sections/Faq'
import HomeContact from '@/components/sections/HomeContact'
import { FAQ_ITEMS } from '@/lib/data'

export const metadata: Metadata = {
  title: {
    absolute: 'Render | Web Design & AI Consulting, Morris County, NJ',
  },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Render | Web Design & AI Consulting, Morris County, NJ',
    description:
      'Fixed, published prices. Live demo sites you can click right now. Built by two founders in Morris County, NJ.',
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
      <HomeServices />
      <HomeWork />
      <HomePricing />
      <WhyUs />
      <Faq />
      <HomeContact />
    </>
  )
}
