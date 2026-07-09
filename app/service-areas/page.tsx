import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { SERVICE_TOWNS, PRICING_TIERS, GUARANTEE } from '@/lib/data'
import { jsonLdHtml, breadcrumbJsonLd } from '@/lib/schema'

const PATH = '/service-areas'

const description =
  'Render builds websites, local SEO, and AI automation for small businesses across Morris County, NJ, including Randolph, Denville, Morristown, Parsippany, and Madison. Founder-led, published pricing.'

export const metadata: Metadata = {
  title: 'Service Areas: Web Design Across Morris County, NJ',
  description,
  openGraph: {
    title: 'Service Areas: Web Design Across Morris County, NJ | Render',
    description,
  },
  alternates: {
    canonical: PATH,
  },
}

type TownDetail = {
  paragraph: string
}

// Short, honest, generic-but-warm description of what Render offers in each town.
// Public, widely known geography only. No claims about specific past clients.
const TOWN_DETAILS: Record<string, TownDetail> = {
  Randolph: {
    paragraph:
      'Randolph is a family-oriented suburban community anchored by the Route 10 retail corridor and home to County College of Morris. Local service businesses here are competing for a smaller pool of nearby searches, which makes a fast, mobile-first website and a fully filled-out Google Business Profile worth more than in a bigger market. We build the site and handle the on-site local SEO so people searching for what you do in Randolph find you first.',
  },
  Denville: {
    paragraph:
      'Denville sits at a natural crossroads in Morris County, with a walkable downtown along Broadway and a steady mix of restaurants, shops, and local service providers. A site that loads fast and states clearly what you do and where you are gives you an edge over the older, slower sites still common in town. We build it and set the local SEO fundamentals so it shows up when someone nearby actually searches.',
  },
  Morristown: {
    paragraph:
      'Morristown has one of the largest and busiest downtown business districts in Morris County, with real foot traffic and no shortage of competition for search visibility. A generic template site gets lost fast here. We build a site meant to stand out and rank, with local SEO in place from day one, not added on later.',
  },
  Parsippany: {
    paragraph:
      "Parsippany is one of the county's biggest commercial hubs, with major office parks along Route 10 and I-80 alongside neighborhood-level small businesses. Whether you're drawing on nearby residents or competing more broadly, the fundamentals are the same: a fast, mobile-ready site and local SEO that gets you found by the right searches instead of buried under bigger budgets.",
  },
  Madison: {
    paragraph:
      "Madison has a compact, walkable downtown centered on Main Street and a strong sense of local community around its shops and restaurants. In a town this size, word of mouth still carries weight, but so does what people find when they search you up afterward. We build a site that backs up your reputation and local SEO that keeps you visible.",
  },
}

const DEFAULT_TOWN_DETAIL: TownDetail = {
  paragraph:
    "We're happy to build for businesses here the same way we do across Morris County: a fast, mobile-first website, on-site local SEO, and a direct line to the two people doing the work.",
}

export default function ServiceAreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdHtml(
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Service Areas', path: PATH },
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
            <span className="text-graphite font-medium">Service Areas</span>
          </nav>

          <p className="eyebrow mb-4 text-xs text-accent-dark">Service Areas</p>
          <h1 className="text-display-2xl text-graphite mb-6 max-w-3xl">Where we work</h1>
          <p className="text-xl text-graphite-soft leading-relaxed max-w-2xl mb-20">
            Render is based in Morris County, New Jersey, and we like it that way. We&apos;re
            happy to meet in person, we know the towns we build for, and we&apos;re not routing
            your project through a call center somewhere else. Here&apos;s where we work, and what
            that looks like town by town.
          </p>

          <div className="space-y-14 mb-20">
            {SERVICE_TOWNS.map((town) => {
              const detail = TOWN_DETAILS[town] ?? DEFAULT_TOWN_DETAIL
              return (
                <div
                  key={town}
                  className="rounded-card border border-hairline bg-surface p-8 md:p-10 md:flex md:items-start md:justify-between md:gap-10"
                >
                  <div className="md:max-w-2xl">
                    <h2 className="text-2xl font-semibold text-graphite mb-3">{town}, NJ</h2>
                    <p className="text-graphite-soft leading-relaxed">{detail.paragraph}</p>
                  </div>
                  <div className="mt-6 md:mt-0 flex-shrink-0">
                    <Button variant="secondary" size="sm" href="/estimate">
                      Get a Free Estimate for {town}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="rounded-card border border-hairline bg-surface p-8 md:p-10 mb-12 max-w-3xl">
            <h2 className="text-2xl font-semibold text-graphite mb-4">What it costs</h2>
            <p className="text-graphite-soft leading-relaxed mb-4">
              Every project starts with a published price, not a quote you have to ask for.
            </p>
            <ul className="space-y-2 mb-4">
              {PRICING_TIERS.filter((tier) => tier.priceRange !== "Let's talk").map((tier) => (
                <li key={tier.tier} className="text-graphite-soft">
                  <span className="font-semibold text-graphite">{tier.tier}</span>
                  {tier.badge && <span className="text-accent-dark"> ({tier.badge})</span>}
                  {': '}
                  {tier.priceRange} + {tier.monthlyRange}
                </li>
              ))}
              <li className="text-graphite-soft">
                <span className="font-semibold text-graphite">Custom:</span> scoped with a fixed
                number before you commit, never a vague &ldquo;contact us for a quote.&rdquo;
              </li>
            </ul>
            <p className="text-graphite-soft text-sm mb-4">
              Monthly plans are optional and month to month, never a contract.
            </p>
            <Link href="/services/web-design" className="text-accent font-semibold hover:underline">
              See full pricing and what&apos;s included
            </Link>
          </div>

          <div className="rounded-card border border-accent/25 bg-accent/5 p-8 md:p-10 mb-12 max-w-3xl">
            <p className="text-base font-semibold text-graphite">{GUARANTEE.long}</p>
          </div>

          <p className="text-graphite-soft leading-relaxed max-w-3xl mb-12">
            We&apos;re based in Morris County and work most often in Randolph, Denville,
            Morristown, Parsippany, and Madison. If you&apos;re in a nearby town and not one of
            these five, we&apos;re still happy to talk.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" size="lg" href="/contact">
              Request a Call
            </Button>
            <Button variant="secondary" size="lg" href="/contact?intent=mockup">
              Get a Free Mockup
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
