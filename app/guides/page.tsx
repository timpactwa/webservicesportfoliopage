import type { Metadata } from 'next'
import Link from 'next/link'
import { jsonLdHtml, breadcrumbJsonLd } from '@/lib/schema'

const PATH = '/guides'

const description =
  'Practical, no-nonsense guides for local business owners: how to choose a web designer and a local SEO checklist you can run yourself. No email required.'

export const metadata: Metadata = {
  title: 'Guides',
  description,
  openGraph: {
    title: 'Guides | Render',
    description,
  },
  alternates: {
    canonical: PATH,
  },
}

const GUIDES = [
  {
    title: 'How to Choose a Web Designer in Morris County',
    href: '/guides/choosing-a-web-designer-morris-county',
    description:
      'Seven questions that separate a good web designer from a bad one, whoever you end up hiring. Includes an honest section on when Render is not the right fit.',
    dateLabel: 'July 2026',
  },
  {
    title: 'The Local SEO Checklist for Morris County Businesses',
    href: '/guides/local-seo-checklist',
    description:
      'A step-by-step checklist you can run yourself to show up when local customers search for what you do, plus which parts we handle for you.',
    dateLabel: 'July 2026',
  },
]

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Guides', path: PATH },
          ])
        )}
      />

      <section className="py-20 md:py-32 bg-bg">
        <div className="container-studio">
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-graphite-soft">
            <Link href="/" className="hover:text-accent transition-colors duration-150">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-graphite font-medium">Guides</span>
          </nav>

          <p className="eyebrow mb-4 text-xs text-accent-dark">Guides</p>
          <h1 className="text-display-2xl text-graphite mb-6 max-w-3xl">Guides</h1>
          <p className="text-xl text-graphite-soft leading-relaxed max-w-2xl mb-16">
            Honest, practical guides for local business owners. No email required, no gate, just
            the stuff we&apos;d tell a friend.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-card border border-hairline bg-surface p-8 flex flex-col hover:border-accent/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <p className="eyebrow mb-4 text-xs text-accent-dark">{guide.dateLabel}</p>
                <h2 className="text-2xl font-semibold text-graphite mb-3 group-hover:text-accent transition-colors duration-200">
                  {guide.title}
                </h2>
                <p className="text-graphite-soft leading-relaxed mb-6">{guide.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Read the guide
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
