import Link from 'next/link'
import { jsonLdHtml, breadcrumbJsonLd, articleJsonLd } from '@/lib/schema'

type GuideLayoutProps = {
  /** Guide title, used as the H1, the breadcrumb leaf, and the article headline. */
  title: string
  /** Plain-language summary used for the article JSON-LD description. */
  description: string
  /** Path of this guide, e.g. "/guides/local-seo-checklist". */
  path: string
  /** ISO date for articleJsonLd, e.g. "2026-07-09". */
  datePublished: string
  /** Human-readable dateline shown under the byline, e.g. "July 2026". */
  dateLabel: string
  children: React.ReactNode
}

/**
 * Shared wrapper for the two long-form guide articles: breadcrumb, JSON-LD
 * (BreadcrumbList + Article), title, byline, and a content column. Plain server
 * component on purpose so guide pages stay fast and fully crawlable.
 */
export default function GuideLayout({
  title,
  description,
  path,
  datePublished,
  dateLabel,
  children,
}: GuideLayoutProps) {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: title, path },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(breadcrumbJsonLd(breadcrumbItems))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(articleJsonLd({ headline: title, description, path, datePublished }))}
      />
      <section className="py-20 md:py-32 bg-bg">
        <div className="container-studio">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-graphite-soft">
            <Link href="/" className="hover:text-accent transition-colors duration-150">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/guides" className="hover:text-accent transition-colors duration-150">
              Guides
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-graphite font-medium">{title}</span>
          </nav>

          <p className="eyebrow mb-4 text-xs text-accent-dark">Guide</p>
          <h1 className="text-display-xl text-graphite mb-6 max-w-3xl">{title}</h1>
          <p className="text-graphite-soft text-sm mb-12">
            Tim Pactwa and Luke Wilkins, Render <span aria-hidden="true">·</span> {dateLabel}
          </p>

          <div className="max-w-3xl">{children}</div>
        </div>
      </section>
    </>
  )
}
