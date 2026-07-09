import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import ProofStrip from '@/components/sections/ProofStrip'
import HomeWork from '@/components/sections/HomeWork'
import WhyUs from '@/components/sections/WhyUs'
import HomePricing from '@/components/sections/HomePricing'
import Faq, { featuredFaqItems } from '@/components/sections/Faq'
import HomeServices from '@/components/sections/HomeServices'
import HomeContact from '@/components/sections/HomeContact'

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
  mainEntity: featuredFaqItems.map((item) => ({
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
      {/*
        Guarantee-led order. The hero promises published prices, clickable demos, and
        two named founders; ProofStrip cashes all three one screen later instead of
        six. Evidence (#work) then comes before the argument (#why), and the guarantee
        closes #why so a visitor reaches #pricing with the risk already taken off the
        table. #services sits after the FAQ because "what exactly do you sell" is the
        last question a convinced visitor asks, not the first.
      */}
      <Hero />
      {/* Renders nothing until a real client testimonial exists. */}
      <Testimonials />
      <ProofStrip />
      <HomeWork />
      <WhyUs />
      <HomePricing />
      <Faq />
      <HomeServices />
      <HomeContact />
    </>
  )
}
