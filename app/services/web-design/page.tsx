import type { Metadata } from 'next'
import WebDesignDetail from '@/components/sections/WebDesignDetail'
import { breadcrumbJsonLd, jsonLdHtml, serviceJsonLd } from '@/lib/schema'

const description =
  'Custom web design for Morris County, NJ businesses. Fixed published pricing from $500, live in 2 to 4 weeks, local SEO included, and your first design direction free before any deposit.'

export const metadata: Metadata = {
  title: 'Web Design for Morris County, NJ Businesses',
  description,
  openGraph: {
    title: 'Web Design for Morris County, NJ Businesses | Render',
    description,
  },
  alternates: { canonical: '/services/web-design' },
}

const service = serviceJsonLd({
  name: 'Web Design & Development',
  description,
  path: '/services/web-design',
  serviceType: 'Web Design',
})

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Web Design', path: '/services/web-design' },
])

export default function WebDesignPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(service)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumb)} />
      <WebDesignDetail />
    </>
  )
}
