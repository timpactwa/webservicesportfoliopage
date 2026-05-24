import Button from './Button'

interface PricingCardProps {
  tier: 'Starter' | 'Standard' | 'Premium'
  priceRange: string
  monthlyRange: string
  features: string[]
  isHighlighted?: boolean
  ctaHref: string
}

export default function PricingCard({
  tier,
  priceRange,
  monthlyRange,
  features,
  isHighlighted,
  ctaHref,
}: PricingCardProps) {
  return (
    <div
      className={`p-8 border relative ${
        isHighlighted
          ? 'bg-charcoal text-white border-charcoal'
          : 'bg-white text-charcoal border-neutral-200'
      }`}
    >
      {isHighlighted && (
        <span className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">
          Most Popular
        </span>
      )}
      <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">{tier}</p>
      <p className="text-4xl font-black mb-1">{priceRange}</p>
      <p className={`text-sm mb-8 ${isHighlighted ? 'text-neutral-400' : 'text-neutral-500'}`}>
        + {monthlyRange} maintenance
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <svg
              className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className={isHighlighted ? 'text-neutral-300' : 'text-neutral-600'}>{feature}</span>
          </li>
        ))}
      </ul>
      <Button variant={isHighlighted ? 'primary' : 'secondary'} href={ctaHref} fullWidth>
        Get Started
      </Button>
    </div>
  )
}
