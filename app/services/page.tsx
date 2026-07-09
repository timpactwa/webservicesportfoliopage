import type { Metadata } from 'next'
import ServicesHub from '@/components/sections/ServicesHub'
import { breadcrumbJsonLd, jsonLdHtml } from '@/lib/schema'

const description =
  'Web design, local SEO, and AI automation for small businesses in Morris County, NJ. Transparent pricing starting at $500, published on the page. No agency markup.'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description,
  openGraph: {
    title: 'Services & Pricing | Render',
    description,
  },
  alternates: { canonical: '/services' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
])

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumb)} />
      <ServicesHub />
    </>
  )
}
