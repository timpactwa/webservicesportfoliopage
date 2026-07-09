import type { Metadata } from 'next'
import LocalSeoDetail from '@/components/sections/LocalSeoDetail'
import { breadcrumbJsonLd, jsonLdHtml, serviceJsonLd } from '@/lib/schema'

const description =
  'Local SEO for Morris County, NJ businesses: on-site SEO standard with every build, plus Google Business Profile setup and optimization for Randolph, Denville, Morristown, Parsippany, and Madison.'

export const metadata: Metadata = {
  title: 'Local SEO for Morris County, NJ Businesses',
  description,
  openGraph: {
    title: 'Local SEO for Morris County, NJ Businesses | Render',
    description,
  },
  alternates: { canonical: '/services/local-seo' },
}

const service = serviceJsonLd({
  name: 'Local SEO',
  description,
  path: '/services/local-seo',
  serviceType: 'Search Engine Optimization',
})

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Local SEO', path: '/services/local-seo' },
])

export default function LocalSeoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(service)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumb)} />
      <LocalSeoDetail />
    </>
  )
}
