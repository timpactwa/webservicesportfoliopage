import Link from 'next/link'
import { FAQ_ITEMS, FOUNDING_CLIENT_NOTE, GUARANTEE, PRICING_TIERS } from '@/lib/data'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'

const services = [
  {
    id: 'web',
    eyebrow: 'Web Design & Development',
    title: 'Websites built to get you more customers.',
    points: [
      'Custom-built, fast, mobile-first sites',
      'Live in 2 to 4 weeks',
      'Fixed prices from $500, published below',
    ],
    href: '/services/web-design',
  },
  {
    id: 'seo',
    eyebrow: 'Local SEO',
    title: 'Show up when your town is searching.',
    points: [
      'On-site local SEO standard in every build',
      'Google Business Profile, set up right',
      'Built for the searches that end in a phone call',
    ],
    href: '/services/local-seo',
  },
  {
    id: 'ai',
    eyebrow: 'AI Consulting & Automation',
    title: 'The follow-up work, automated.',
    points: [
      'After-hours questions answered overnight',
      'Leads routed straight to you, organized',
      'Review requests that send themselves',
    ],
    href: '/services/ai-automation',
  },
]

// The three objections that peak next to pricing. Pulled from the canonical FAQ
// so answers can never drift out of sync with the Home page.
const CONDENSED_FAQ_QUESTIONS = [
  'How much does a website cost?',
  'How long until my site launches?',
  'Do I own my website?',
]

const condensedFaq = CONDENSED_FAQ_QUESTIONS.map((question) => {
  const item = FAQ_ITEMS.find((faq) => faq.question === question)
  if (!item) throw new Error(`Condensed FAQ is out of sync with FAQ_ITEMS: "${question}"`)
  return item
})

export default function ServicesHub() {
  return (
    <div>
      <section className="py-20 md:py-28 bg-bg">
        <div className="container-studio">
          <div className="mb-16">
            <h1 className="text-display-2xl text-graphite mb-4">
              What we do,
              <br />
              and what it costs.
            </h1>
            <p className="text-xl text-graphite-soft">Clear scope. Clear pricing. No surprises.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} index={index} className="h-full">
                <article
                  id={service.id}
                  className="flex h-full flex-col rounded-card border border-hairline bg-surface p-8"
                >
                  <p className="eyebrow mb-4 text-xs text-accent-dark">{service.eyebrow}</p>
                  <h2 className="mb-5 text-2xl font-semibold text-graphite leading-tight">
                    {service.title}
                  </h2>
                  <ul className="mb-8 space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-graphite-soft">
                        <svg
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Link
                      href={service.href}
                      aria-label={`Learn more about ${service.eyebrow}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-surface border-y border-hairline">
        <div className="container-studio">
          <Reveal>
            <p className="eyebrow mb-8 text-xs text-accent-dark">Pricing at a glance</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_TIERS.map((tier, index) => (
              <Reveal key={tier.tier} index={index}>
                <Link
                  href="/services/web-design#pricing"
                  className="block rounded-card border border-hairline bg-bg p-6 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="eyebrow text-xs text-accent-dark">{tier.tier}</p>
                    {tier.badge && (
                      <span className="eyebrow rounded-full bg-accent px-2.5 py-0.5 text-[9px] text-white">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 flex items-baseline gap-2 font-display text-3xl font-semibold text-graphite">
                    {tier.standardPrice && (
                      <s className="text-lg font-medium text-graphite-soft/60">
                        <span className="sr-only">Regular price </span>
                        {tier.standardPrice}
                      </s>
                    )}
                    <span>
                      {tier.standardPrice && <span className="sr-only">Founding client price </span>}
                      {tier.priceRange}
                    </span>
                  </p>
                  <p className="mt-1 text-sm text-graphite-soft">
                    {/^\$/.test(tier.priceRange) ? `+ ${tier.monthlyRange} optional` : tier.monthlyRange}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-card border border-accent/25 bg-accent/5 p-6 text-center">
              <p className="text-base font-semibold text-graphite">{GUARANTEE.long}</p>
              {FOUNDING_CLIENT_NOTE && (
                <p className="mt-2 text-sm text-graphite-soft">{FOUNDING_CLIENT_NOTE}</p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col items-center gap-4 rounded-card border border-hairline bg-bg p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <p className="text-lg font-semibold text-graphite">
                  Not sure which package fits?
                </p>
                <p className="mt-1 text-graphite-soft">
                  Answer four quick questions and get an instant answer. No email required.
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
                <Button variant="primary" size="md" href="/estimate">
                  Get an Instant Estimate
                </Button>
                <Button variant="secondary" size="md" href="/contact">
                  Request a Call
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-bg">
        <div className="container-studio">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow mb-6 text-xs text-accent-dark">Before you ask</p>
              <dl className="border-t border-hairline">
                {condensedFaq.map((item) => (
                  <div key={item.question} className="border-b border-hairline py-5">
                    <dt className="mb-2 text-base font-semibold text-graphite">{item.question}</dt>
                    <dd className="leading-relaxed text-graphite-soft">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
