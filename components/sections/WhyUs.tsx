import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { DIFFERENTIATORS, RISK_REVERSAL, TEAM_MEMBERS } from '@/lib/data'

const ArrowRight = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const founderNames = TEAM_MEMBERS.map((member) => member.name).join(' and ')

/**
 * Runs after the demos and before the price. The order is the point: a visitor who
 * has just watched the work prove itself reads these differentiators as a summary
 * rather than a boast, and the guarantee lands while the number is still unknown.
 *
 * The proof markers that used to close this section now open the page in ProofStrip.
 */
export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-24 py-20 md:py-32 bg-graphite-light text-white">
      <div className="container-studio">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4 text-xs text-accent-soft">Why Render</p>
          <h2 className="text-display-xl text-white">A website that works as hard as you do.</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Every build is judged against one question: does this actually grow the business. Here is
            what that means in practice.
          </p>
        </Reveal>

        {/* Three differentiators, one row on md and up. Trimmed from five: published
            pricing and the named founders are already claimed in ProofStrip. */}
        <ul className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
          {DIFFERENTIATORS.map((item, index) => (
            <Reveal as="li" key={item.title} index={index} className="border-t border-white/15 pt-6">
              <p className="eyebrow text-xs text-accent-soft">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2.5 leading-relaxed text-white/70">{item.description}</p>
            </Reveal>
          ))}
        </ul>

        {/* The last thing read before the pricing section. Risk comes off the table
            before the number goes on it. */}
        <Reveal delay={0.1}>
          <div className="mt-20 rounded-card border border-white/15 bg-white/[0.04] p-8 md:p-12">
            <p className="eyebrow mb-5 text-xs text-accent-soft">Before you commit</p>
            <p className="font-display max-w-3xl text-[26px] font-semibold leading-[1.35] tracking-[-0.02em] text-white md:text-[30px]">
              {RISK_REVERSAL.headline}
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-white/70">{RISK_REVERSAL.supporting}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col items-start gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-white/70">
              <Link
                href="/about"
                className="group inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                Meet the founders, {founderNames}
                <ArrowRight />
              </Link>
            </p>
            <Button variant="primary" href="/contact" size="lg">
              Request a Call
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
