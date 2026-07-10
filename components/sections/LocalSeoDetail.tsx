import Link from 'next/link'
import { FAQ_ITEMS, SERVICE_TOWNS } from '@/lib/data'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'

const included = [
  'Page titles and metadata written around your town and service',
  'Fast, mobile-first pages that pass Google’s speed benchmarks',
  'Search-friendly page structure, one page per service',
  'FAQ content and schema so search engines understand you',
  'Google Analytics set up so you can see what’s working',
]

const gbpItems = [
  'Claiming and verifying your listing',
  'Categories, service areas, and hours set correctly',
  'Photos and services that make the listing worth clicking',
  'A simple flow for asking customers for reviews',
]

const FAQ_QUESTIONS = ['Is SEO included?', 'Do you only work with Morris County businesses?']

const pageFaq = FAQ_QUESTIONS.map((question) => {
  const item = FAQ_ITEMS.find((faq) => faq.question === question)
  if (!item) throw new Error(`Local SEO FAQ is out of sync with FAQ_ITEMS: "${question}"`)
  return item
})

export default function LocalSeoDetail() {
  return (
    <div>
      <section className="py-20 md:py-28 bg-bg">
        <div className="container-studio">
          <div className="mb-16 max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent-dark">Local SEO</p>
            <h1 className="text-display-xl text-graphite mb-6">
              Show up when your town is searching.
            </h1>
            <p className="text-lg leading-relaxed text-graphite-soft">
              When someone in {SERVICE_TOWNS[0]} searches for what you do, the results they see
              decide who gets the call. On-site local SEO comes standard with every website we
              build. It is not an upsell, it is the reason the site exists.
            </p>
          </div>

          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <h2 className="mb-6 text-2xl font-semibold text-graphite">
                  What every Render build includes
                </h2>
                <ul className="space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-graphite-soft">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-graphite-soft">
                  Want to check your own site first? Our free{' '}
                  <Link href="/guides/local-seo-checklist" className="font-semibold text-accent hover:underline">
                    Local SEO Checklist
                  </Link>{' '}
                  covers everything on this list, no email required.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-card border border-hairline bg-surface p-8">
                <p className="eyebrow mb-3 text-xs text-accent-dark">Named service</p>
                <h2 className="mb-3 text-2xl font-semibold text-graphite">
                  Google Business Profile, set up right.
                </h2>
                <p className="mb-6 leading-relaxed text-graphite-soft">
                  The map results are the first thing most local customers see, and they run on
                  your Google Business Profile, not your website. We set it up properly or fix the
                  one you have:
                </p>
                <ul className="space-y-3">
                  {gbpItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-graphite-soft">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface border-y border-hairline">
        <div className="container-studio">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="mb-4 text-2xl font-semibold text-graphite">
                Built for the towns we actually serve.
              </h2>
              <p className="leading-relaxed text-graphite-soft">
                We work most often in {SERVICE_TOWNS.slice(0, -1).join(', ')}, and{' '}
                {SERVICE_TOWNS[SERVICE_TOWNS.length - 1]}, and with nearby Morris County towns too.
                Local SEO works best when the person doing it actually knows the area.{' '}
                <Link href="/service-areas" className="font-semibold text-accent hover:underline">
                  See where we work
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-bg">
        <div className="container-studio">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <p className="eyebrow mb-6 text-xs text-accent-dark">Fair questions</p>
                <dl className="border-t border-hairline">
                  {pageFaq.map((item) => (
                    <div key={item.question} className="border-b border-hairline py-5">
                      <dt className="mb-2 text-base font-semibold text-graphite">{item.question}</dt>
                      <dd className="leading-relaxed text-graphite-soft">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-col justify-center rounded-card border border-hairline bg-surface p-8">
                <h2 className="mb-3 text-2xl font-semibold text-graphite">
                  Wondering why your site isn&apos;t showing up?
                </h2>
                <p className="mb-6 leading-relaxed text-graphite-soft">
                  Tell us your business and your town. On a free call we&apos;ll tell you plainly
                  what&apos;s holding your visibility back and what it would cost to fix.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="primary" href="/contact?intent=seo">
                    Book a Free Call
                  </Button>
                  <Button variant="secondary" href="/estimate">
                    Get an Instant Estimate
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
