import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import HomeServices from '@/components/sections/HomeServices'
import WhyUs from '@/components/sections/WhyUs'
import HomeWork from '@/components/sections/HomeWork'
import HomePricing from '@/components/sections/HomePricing'
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
        Ranked: what we do, then why us, then proof, then price. Services lead
        because "what exactly do you sell" is the first thing a stranger needs
        answered. WhyUs makes three claims a visitor can click and check, so the
        argument carries its own proof; the clickable demos then back it, and the
        guarantee-then-price sequence is preserved inside HomePricing, where the
        "Before you commit" panel sits directly above the first number. The
        launch timeline answers "how long" once they want it, and the CTA band
        closes the page.
      */}
      <Hero />
      {/* Renders nothing until a real client testimonial exists. */}
      <Testimonials />
      <HomeServices />
      <WhyUs />
      <HomeWork />
      <HomePricing />
      <LaunchTimeline />
      <Faq />
      <CtaBand />
    </>
  )
}
