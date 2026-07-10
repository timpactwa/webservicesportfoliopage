import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import ProofStrip from '@/components/sections/ProofStrip'
import HomeWork from '@/components/sections/HomeWork'
import WhyUs from '@/components/sections/WhyUs'
import HomePricing from '@/components/sections/HomePricing'
import HomeServices from '@/components/sections/HomeServices'
import LaunchTimeline from '@/components/sections/LaunchTimeline'
import Faq, { featuredFaqItems } from '@/components/sections/Faq'
import CtaBand from '@/components/sections/CtaBand'

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
        Ranked: evidence, then argument, then price. A stranger with no reason to
        trust us meets the clickable demos before any claim, and the guarantee
        before any number. WhyUs closes on the risk reversal and HomePricing
        follows it immediately; that adjacency is load bearing. #services sits
        after the price because "what exactly do you sell" is the last question a
        convinced visitor asks, not the first, and the launch timeline answers
        "how long" once they want it.
      */}
      <Hero />
      {/* Renders nothing until a real client testimonial exists. */}
      <Testimonials />
      <ProofStrip />
      <HomeWork />
      <WhyUs />
      <HomePricing />
      <HomeServices />
      <LaunchTimeline />
      <Faq />
      <CtaBand />
    </>
  )
}
