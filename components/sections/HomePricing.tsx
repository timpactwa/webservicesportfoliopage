'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FOUNDING_CLIENT_NOTE,
  PRICING_CUSTOM_LABEL,
  PRICING_HEADLINE,
  PRICING_TIERS,
  RISK_REVERSAL,
  type PricingTier,
} from '@/lib/data'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import BookingModal from '@/components/ui/BookingModal'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'

/** Custom has no price and was only ever padding a fourth column. */
const mainTiers = PRICING_TIERS.filter((tier) => tier.tier !== 'Custom')
const customTier = PRICING_TIERS.find((tier) => tier.tier === 'Custom')

/** Four is what fits without the card growing taller than the grid's tallest sibling. */
const FEATURES_SHOWN = 4

export default function HomePricing() {
  const [bookingTier, setBookingTier] = useState<string | null>(null)

  // Every CTA stays a real link to /contact?tier=... A left click opens the modal;
  // modified clicks fall through, and a no-JS visitor still reaches the form.
  const openBooking = (tier: string) => (event: React.MouseEvent) => {
    track('tier_cta_click', { tier })
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setBookingTier(tier)
  }

  return (
    <>
      <section id="pricing" className="scroll-mt-24 bg-bg py-20 md:py-32">
        <div className="container-studio">
          {/* Two stacked lines at display-xl is a taller block than the hero's
              display-2xl, so pricing dominates without a new token. */}
          <Reveal className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent-dark">Pricing</p>
            <h2 className="text-display-xl text-graphite">
              {PRICING_HEADLINE.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          {/* The guarantee reads directly above the first number, so risk comes
              off the table before the price goes on it. It used to sit below the
              tiers here and again inside WhyUs; this is the single home for it. */}
          <Reveal delay={0.05} className="mb-12">
            <div className="rounded-card border border-accent/25 bg-accent/5 p-6 md:p-8">
              <p className="eyebrow mb-3 text-xs text-accent-dark">Before you commit</p>
              <p className="font-display max-w-3xl text-xl font-semibold leading-snug text-graphite md:text-2xl">
                {RISK_REVERSAL.headline}
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed text-graphite-soft">
                {RISK_REVERSAL.supporting}
              </p>
              {FOUNDING_CLIENT_NOTE && (
                <p className="mt-4 text-sm font-medium text-accent-dark">{FOUNDING_CLIENT_NOTE}</p>
              )}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {mainTiers.map((tier, index) => (
              <TierCard key={tier.tier} tier={tier} index={index} onBook={openBooking(tier.tier)} />
            ))}
          </div>

          {customTier && (
            <Reveal delay={0.1} className="mt-6">
              <div className="flex flex-col items-start gap-5 rounded-card border border-hairline bg-surface px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
                <div>
                  <p className="font-display text-lg font-semibold text-graphite">
                    {PRICING_CUSTOM_LABEL}
                  </p>
                  <p className="mt-1.5 max-w-2xl text-graphite-soft">{customTier.summary}</p>
                </div>
                <Button
                  href={customTier.ctaHref}
                  onClick={openBooking(customTier.tier)}
                  variant="secondary"
                  size="md"
                  className="flex-shrink-0"
                >
                  {customTier.ctaLabel}
                </Button>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.2} className="mt-10">
            <Link
              href="/services/web-design#pricing"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2"
            >
              What&apos;s included in each tier <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <BookingModal
        isOpen={bookingTier !== null}
        onClose={() => setBookingTier(null)}
        tier={bookingTier}
      />
    </>
  )
}

function TierCard({
  tier,
  index,
  onBook,
}: {
  tier: PricingTier
  index: number
  onBook: (event: React.MouseEvent) => void
}) {
  return (
    <Reveal index={index} className="h-full">
      <div
        className={cn(
          'relative flex h-full flex-col rounded-card border p-6 md:p-7',
          tier.isHighlighted
            ? 'border-accent/40 bg-accent-soft shadow-card'
            : 'border-hairline bg-surface'
        )}
      >
        {tier.badge && (
          <span className="eyebrow absolute right-5 top-5 rounded-full bg-accent-dark px-2.5 py-1 text-[9px] text-white">
            {tier.badge}
          </span>
        )}

        <p className="font-display text-sm font-semibold text-graphite">{tier.tier}</p>

        {tier.standardPrice && (
          <s className="mt-3 block text-sm font-medium text-graphite-soft/70">
            <span className="sr-only">Regular price </span>
            {tier.standardPrice}
          </s>
        )}
        <p className="font-display mt-1 text-[40px] font-semibold leading-none text-graphite">
          {tier.standardPrice && <span className="sr-only">Founding client price </span>}
          {tier.priceRange}
        </p>
        <p className="mt-2 text-sm text-graphite-soft">
          then {tier.monthlyRange}
          <span className="sr-only"> for the optional Care Plan</span>
        </p>

        <p className="mt-5 leading-relaxed text-graphite-soft">{tier.summary}</p>

        <ul className="mt-6 space-y-2.5">
          {tier.features.slice(0, FEATURES_SHOWN).map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-[15px] text-graphite">
              <svg
                aria-hidden="true"
                className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-accent-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* mt-auto pins every CTA to the same baseline regardless of feature count. */}
        <div className="mt-auto pt-7">
          <Button
            href={tier.ctaHref}
            onClick={onBook}
            variant={tier.isHighlighted ? 'primary' : 'secondary'}
            size="md"
            fullWidth
          >
            {tier.ctaLabel}
          </Button>
        </div>
      </div>
    </Reveal>
  )
}
