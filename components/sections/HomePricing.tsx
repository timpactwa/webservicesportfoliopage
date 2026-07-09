import Link from 'next/link'
import { GUARANTEE, PRICING_TIERS } from '@/lib/data'
import PricingCard from '@/components/ui/PricingCard'
import Reveal from '@/components/ui/Reveal'

export default function HomePricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-20 md:py-32 bg-bg">
      <div className="container-studio">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4 text-xs text-accent-dark">Pricing</p>
          <h2 className="text-display-xl text-graphite">Fixed prices, published here.</h2>
        </Reveal>

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

        <Reveal delay={0.15} className="mt-8">
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
