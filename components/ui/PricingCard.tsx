'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Button from './Button'
import { useCountUp } from '@/hooks/useCountUp'
import { useTilt } from '@/hooks/useTilt'
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
  // Custom tier has no number to count up to ("Let's talk"), so fall back to a
  // static label. The hook still runs to keep hook order stable across tiers.
  const numericPrice = parseInt(priceRange.replace(/[^0-9]/g, ''), 10)
  const hasNumericPrice = Number.isFinite(numericPrice) && numericPrice > 0

  const { count, ref } = useCountUp({
    to: hasNumericPrice ? numericPrice : 0,
    duration: 1200,
    delay: 200,
  })

  const tilt = useTilt<HTMLDivElement>({ max: 6, perspective: 800 })

  // The count-up starts at 0, so handing it straight to the DOM would ship "$0"
  // in the server-rendered HTML: what crawlers, AI answer engines, and no-JS
  // visitors read. Published pricing is the whole differentiator, so render the
  // real number until the client takes over the animation. Anyone who prefers
  // reduced motion just keeps the real number.
  const prefersReducedMotion = useReducedMotion()
  const [isAnimating, setIsAnimating] = useState(false)
  useEffect(() => {
    if (!prefersReducedMotion) setIsAnimating(true)
  }, [prefersReducedMotion])

  const displayPrice =
    hasNumericPrice && isAnimating ? `$${count.toLocaleString()}` : priceRange

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ transition: 'transform 150ms ease-out', transformStyle: 'preserve-3d' }}
      className={cn(
        'group relative flex h-full flex-col rounded-card border p-8',
        isHighlighted
          ? 'bg-graphite text-white border-graphite shadow-card-hover'
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
        <p
          ref={ref as React.RefObject<HTMLParagraphElement>}
          className="font-display text-4xl font-semibold mb-1"
        >
          {displayPrice}
        </p>
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
          <Button variant={isHighlighted ? 'primary' : 'secondary'} href={ctaHref} fullWidth>
            {ctaLabel}
          </Button>
          {note && (
            <p className={cn('mt-4 text-center text-xs', isHighlighted ? 'text-white/45' : 'text-graphite-soft')}>
              {note}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
