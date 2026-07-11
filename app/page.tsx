import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Testimonials from '@/components/sections/Testimonials'
import HomeServices from '@/components/sections/HomeServices'
import Affordable from '@/components/sections/Affordable'
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
      'Affordable, fixed prices. Live demo sites you can click right now. Built by two founders in Morris County, NJ.',
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
        Ranked: what we do, then why us (affordable + AI-honest), then price, then
        proof. Services lead because "what exactly do you sell" is the first thing a
        stranger needs answered, and the checkerboard already showcases a live site
        and a live automation. Affordable frames the value right before the prices,
        folding in the three click-and-check promises that stand in for testimonials.
        Pricing then lands with its "Before you commit" guarantee directly above the
        first number, and the clickable demo work backs it up. The launch timeline
        answers "how long", and the CTA band closes the page.
      */}
      <Hero />
      {/* Renders nothing until a real client testimonial exists. */}
      <Testimonials />
      <HomeServices />
      <Affordable />
      <HomePricing />
      <HomeWork />
      <LaunchTimeline />
      <Faq />
      <CtaBand />
    </>
  )
}
