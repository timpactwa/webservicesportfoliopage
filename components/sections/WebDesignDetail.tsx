import { FAQ_ITEMS, GUARANTEE, PRICING_TIERS, SERVICE_TOWNS } from '@/lib/data'
import PricingCard from '@/components/ui/PricingCard'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import TriangleHeading from '@/components/ui/TriangleHeading'

const featureItems = [
  'Custom-built, mobile-ready websites',
  'Mobile-first responsive design',
  'On-page SEO foundation',
  'Fast turnaround (2–4 weeks)',
  'Monthly Care Plan available',
  'Performance-optimized (Core Web Vitals)',
]

const processSteps = [
  {
    title: 'Request a call',
    description:
      'Tell us what you need and when you are free. The call is free and there is nothing to buy on it.',
  },
  {
    title: 'First design direction, on us',
    description:
      "You see a real design direction before you pay anything. If it isn't right, you walk away and no deposit is taken.",
  },
  {
    title: 'The build',
    description:
      'Deposit starts the build. 2 to 4 weeks once we have your content, and we tell you exactly what we are waiting on at every step.',
  },
  {
    title: 'Launch, then the Care Plan',
    description:
      'Your site goes live and you own it. The optional Care Plan keeps it updated and running from there.',
  },
]

// The two design-and-timeline fears, answered where they peak.
const FAQ_QUESTIONS = ["What if I don't like the design?", 'How do I know the 2–4 week timeline is real?']

const pageFaq = FAQ_QUESTIONS.map((question) => {
  const item = FAQ_ITEMS.find((faq) => faq.question === question)
  if (!item) throw new Error(`Web design FAQ is out of sync with FAQ_ITEMS: "${question}"`)
  return item
})

export default function WebDesignDetail() {
  return (
    <div>
      <section className="py-20 md:py-28 bg-bg">
        <div className="container-studio">
          <div className="mb-16 max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent-dark">Web Design & Development</p>
            <TriangleHeading as="h1" className="text-display-xl text-graphite mb-6" delay={0}>
              Websites built to get you more customers.
            </TriangleHeading>
            <p className="mb-6 text-lg leading-relaxed text-graphite-soft">
              Most local business sites are slow, outdated, or invisible on Google. We build yours
              from scratch for businesses in {SERVICE_TOWNS.slice(0, -1).join(', ')}, and{' '}
              {SERVICE_TOWNS[SERVICE_TOWNS.length - 1]}, and across Morris County, NJ. Live in 2 to
              4 weeks.
            </p>
            <ul className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
              {featureItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-graphite-soft">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-accent"
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

          <div id="pricing" className="scroll-mt-28">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              {PRICING_TIERS.map((tier, index) => (
                <Reveal key={tier.tier} index={index} className="h-full">
                  <PricingCard {...tier} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-8 rounded-card border border-accent/25 bg-accent/5 p-6 text-center">
                <p className="text-base font-semibold text-graphite">{GUARANTEE.long}</p>
                <p className="mt-2 text-sm text-graphite-soft">
                  Founding client pricing. These are our first-client rates and they go up as our
                  portfolio grows.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col items-center gap-4 rounded-card border border-hairline bg-surface p-8 text-center sm:flex-row sm:justify-between sm:text-left">
                <p className="text-lg font-semibold text-graphite">
                  Want an instant answer on which package fits? No email required.
                </p>
                <Button variant="primary" size="md" href="/estimate" className="flex-shrink-0">
                  Get an Instant Estimate
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-surface border-y border-hairline">
        <div className="container-studio">
          <Reveal>
            <p className="eyebrow mb-4 text-xs text-accent-dark">How it works</p>
            <TriangleHeading as="h2" className="text-display-lg text-graphite mb-12" delay={0}>
              Four steps. No surprises at any of them.
            </TriangleHeading>
          </Reveal>
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} index={index} as="li">
                <p className="mb-4 font-display text-5xl font-semibold text-accent/20">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mb-2 text-lg font-semibold text-graphite">{step.title}</h3>
                <p className="text-sm leading-relaxed text-graphite-soft">{step.description}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-14 grid gap-6 rounded-card border border-hairline bg-bg p-8 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <p className="eyebrow mb-3 text-xs text-accent-dark">The Care Plan</p>
                <h3 className="mb-3 text-2xl font-semibold text-graphite">
                  Launch is the start, not the end.
                </h3>
                <p className="leading-relaxed text-graphite-soft">
                  The Care Plan is our optional monthly maintenance product: hosting support,
                  security updates, small content changes, and fixes, handled by the people who
                  built your site. $50 to $125 per month depending on your tier. Month to month,
                  not a contract. Start without it and add it later, or cancel anytime.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  'Hosting support and monitoring',
                  'Security and dependency updates',
                  'Small content changes when you need them',
                  'Fixes, handled without a ticket queue',
                ].map((item) => (
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
      </section>

      <section className="py-20 md:py-28 bg-bg">
        <div className="container-studio">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <p className="eyebrow mb-4 text-xs text-accent-dark">How We Start</p>
                <TriangleHeading as="h2" className="text-display-lg text-graphite mb-6" delay={0}>
                  Bring whatever you have. We take it from there.
                </TriangleHeading>
                <p className="mb-8 text-lg leading-relaxed text-graphite-soft">
                  You don&apos;t need a finished plan to work with us. Whether you have a folder of
                  photos, a rough wireframe, a design concept, or just an idea in your head, we meet
                  you where you are and guide you through every stage from first concept to launch.
                </p>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {['Photos and images', 'Wireframes and sketches', 'Design concepts or examples', 'Just an idea, nothing else needed'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-graphite-soft">
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-accent"
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

            <Reveal delay={0.1}>
              <div>
                <p className="eyebrow mb-6 text-xs text-accent-dark">The two fair questions</p>
                <dl className="border-t border-hairline">
                  {pageFaq.map((item) => (
                    <div key={item.question} className="border-b border-hairline py-5">
                      <dt className="mb-2 text-base font-semibold text-graphite">{item.question}</dt>
                      <dd className="leading-relaxed text-graphite-soft">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button variant="primary" href="/contact">
                    Request a Call
                  </Button>
                  <Button variant="secondary" href="/contact?intent=mockup">
                    Get a Free Mockup
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
