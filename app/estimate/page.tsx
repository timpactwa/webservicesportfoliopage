import type { Metadata } from 'next'
import Estimator from '@/components/sections/Estimator'
import { jsonLdHtml, breadcrumbJsonLd } from '@/lib/schema'

const title = 'Instant Website Cost Estimate'
const description =
  'Get an instant website cost estimate for your Morris County, NJ business. Every Render price is already published, so four quick questions is all it takes. No call required.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | Render`,
    description,
  },
  alternates: {
    canonical: '/estimate',
  },
}

const breadcrumbSchema = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Cost Estimate', path: '/estimate' },
])

export default function EstimatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(breadcrumbSchema)}
      />
      <Estimator />
    </>
  )
}
