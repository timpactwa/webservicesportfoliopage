'use client'

import Link from 'next/link'
import { FOUNDING_CLIENT_NOTE, GUARANTEE, NOT_A_FIT, PRICING_TIERS, type PricingTier } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'

/**
 * One-line feature summary for the compact table, taken from each tier's own
 * `features` array rather than any new copy, per the design handoff. Only the
 * first entry is used: joining two ran past the narrowest desktop column and
 * ellipsized mid-word.
 */
function summaryLine(tier: PricingTier) {
  return tier.features[0]
}

export default function HomePricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-20 md:py-32 bg-bg">
      <div className="container-studio">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4 text-xs text-accent-dark">Pricing</p>
          <h2 className="text-display-xl text-graphite">Fixed prices, published here.</h2>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[14px] border border-hairline">
            <div className="grid grid-cols-1 gap-px bg-hairline md:grid-cols-4">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.tier}
                  className={cn(
                    'relative flex flex-col px-3.5 py-4',
                    tier.isHighlighted ? 'bg-accent-soft' : 'bg-bg'
                  )}
                >
                  {tier.badge && (
                    <span className="eyebrow absolute top-3 right-3 rounded-full bg-accent-dark px-2 py-0.5 text-[9px] text-white">
                      {tier.badge}
                    </span>
                  )}
                  <p className="font-display text-[11px] font-semibold text-graphite">{tier.tier}</p>
                  {/* Custom has no struck price. The blank line keeps its price on the
                      same baseline as the other three instead of riding up a row. */}
                  {tier.standardPrice ? (
                    <s className="mt-1 block text-[10.5px] font-medium text-graphite-soft/70">
                      <span className="sr-only">Regular price </span>
                      {tier.standardPrice}
                    </s>
                  ) : (
                    <span aria-hidden="true" className="mt-1 block text-[10.5px]">
                      &nbsp;
                    </span>
                  )}
                  <p className="font-display text-[19px] font-semibold text-graphite">
                    {tier.standardPrice && <span className="sr-only">Founding client price </span>}
                    {tier.priceRange}
                  </p>
                  <p className="mt-2 truncate text-[10.5px] text-graphite-soft">{summaryLine(tier)}</p>
                  <Link
                    href={tier.ctaHref}
                    onClick={() => track('tier_cta_click', { tier: tier.tier })}
                    className={cn(
                      'mt-4 inline-flex items-center justify-center rounded-full px-3 py-2 text-center text-[11px] font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                      tier.isHighlighted
                        ? 'bg-accent-dark text-white hover:bg-accent'
                        : 'border-[1.5px] border-graphite text-graphite hover:bg-graphite hover:text-white'
                    )}
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* The guarantee is what makes a stranger comfortable with the number directly
            above it, so it gets read at a real size instead of whispering at 11px. */}
        <Reveal delay={0.1} className="mt-8">
          <div className="rounded-card border border-accent/25 bg-accent/5 px-6 py-5 text-center">
            <p className="text-base font-semibold text-graphite">{GUARANTEE.long}</p>
            {FOUNDING_CLIENT_NOTE && (
              <p className="mt-2 text-sm text-graphite-soft">{FOUNDING_CLIENT_NOTE}</p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-6">
          <Link
            href="/services/web-design#pricing"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2"
          >
            What&apos;s included in each tier <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        {/* A cheap price with no stated trade-off invites the buyer to guess what was
            cut. Naming who Render is wrong for is what turns the number into a choice. */}
        <Reveal delay={0.2} className="mt-16 border-t border-hairline pt-10">
          <h3 className="font-display text-xl font-semibold text-graphite">{NOT_A_FIT.headline}</h3>
          <p className="mt-2 max-w-2xl text-graphite-soft">{NOT_A_FIT.intro}</p>

          <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-7 md:grid-cols-2">
            {NOT_A_FIT.cases.map((item) => (
              <div key={item.title}>
                <dt className="font-semibold text-graphite">{item.title}</dt>
                <dd className="mt-1.5 leading-relaxed text-graphite-soft">{item.body}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 max-w-3xl font-medium leading-relaxed text-graphite">
            {NOT_A_FIT.closing}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
