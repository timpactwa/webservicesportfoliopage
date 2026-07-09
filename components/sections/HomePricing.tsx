'use client'

import Link from 'next/link'
import { FOUNDING_CLIENT_NOTE, GUARANTEE, PRICING_TIERS, type PricingTier } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'

/**
 * One-line feature summary for the compact table, derived from each tier's own
 * `features` array (its first two entries) rather than any new copy, per the
 * design handoff. `truncate` keeps it to one line even where the joined text
 * runs long in the narrowest desktop column.
 */
function summaryLine(tier: PricingTier) {
  const [first, second] = tier.features
  return `${first}, ${second.charAt(0).toLowerCase()}${second.slice(1)}`
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
                  <p className="font-display mt-1 text-[19px] font-semibold text-graphite">
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

        <Reveal delay={0.1} className="mt-6">
          <p className="text-center text-[11px] text-graphite-soft">
            {GUARANTEE.short} {FOUNDING_CLIENT_NOTE}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-6">
          <Link
            href="/services/web-design#pricing"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2"
          >
            What&apos;s included in each tier <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
