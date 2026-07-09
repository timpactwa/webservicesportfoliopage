'use client'

import Button from './Button'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/lib/data'

type PricingCardProps = Omit<PricingTier, 'tier'> & { tier: PricingTier['tier'] }

export default function PricingCard({
  tier,
  priceRange,
  monthlyRange,
  summary,
  features,
  isHighlighted,
  badge,
  note,
  ctaLabel,
  ctaHref,
}: PricingCardProps) {
  // Custom tier has no number in its price ("Let's talk"); the monthly-range
  // copy adapts depending on whether a real number is present.
  const numericPrice = parseInt(priceRange.replace(/[^0-9]/g, ''), 10)
  const hasNumericPrice = Number.isFinite(numericPrice) && numericPrice > 0

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col rounded-card border p-8',
        isHighlighted
          ? 'bg-graphite-light text-white border-white/10 shadow-card-hover'
          : 'bg-surface text-graphite border-hairline'
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(450px circle at var(--glow-x, 50%) var(--glow-y, 50%), oklch(0.60 0.13 190 / 0.14), transparent 60%)',
        }}
      />
      <div className="relative flex h-full flex-col">
        {badge && (
          <span className="eyebrow absolute top-4 right-4 rounded-full bg-accent px-3 py-1 text-[10px] text-white">
            {badge}
          </span>
        )}
        <p className={cn('eyebrow mb-4 text-xs', isHighlighted ? 'text-accent-soft' : 'text-accent-dark')}>
          {tier}
        </p>
        <p className="font-display text-4xl font-semibold mb-1">{priceRange}</p>
        <p className={cn('text-sm', isHighlighted ? 'text-white/55' : 'text-graphite-soft')}>
          {hasNumericPrice ? `+ ${monthlyRange} maintenance` : monthlyRange}
        </p>

        <p className={cn('mt-5 text-sm leading-relaxed', isHighlighted ? 'text-white/70' : 'text-graphite-soft')}>
          {summary}
        </p>

        <ul className="space-y-3 my-8">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <svg
                className={cn('w-4 h-4 flex-shrink-0 mt-0.5', isHighlighted ? 'text-accent-soft' : 'text-accent')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className={isHighlighted ? 'text-white/70' : 'text-graphite-soft'}>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button
            variant={isHighlighted ? 'primary' : 'secondary'}
            href={ctaHref}
            fullWidth
            onClick={() => track('tier_cta_click', { tier })}
          >
            {ctaLabel}
          </Button>
          {note && (
            <p className={cn('mt-4 text-center text-xs', isHighlighted ? 'text-white/55' : 'text-graphite-soft')}>
              {note}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
