import type { Metadata } from 'next'
import AiAutomationDetail from '@/components/sections/AiAutomationDetail'
import { breadcrumbJsonLd, jsonLdHtml, serviceJsonLd } from '@/lib/schema'

const description =
  'Practical AI automation for small businesses in Morris County, NJ: after-hours replies, lead routing, and review requests that send themselves. Scoped honestly with a fixed number before you commit.'

export const metadata: Metadata = {
  title: 'AI Automation for Small Businesses in Morris County, NJ',
  description,
  openGraph: {
    title: 'AI Automation for Small Businesses | Render',
    description,
  },
  alternates: { canonical: '/services/ai-automation' },
}

const service = serviceJsonLd({
  name: 'AI Consulting & Automation',
  description,
  path: '/services/ai-automation',
  serviceType: 'AI Automation',
})

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'AI Automation', path: '/services/ai-automation' },
])

export default function AiAutomationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(service)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(breadcrumb)} />
      <AiAutomationDetail />
    </>
  )
}
