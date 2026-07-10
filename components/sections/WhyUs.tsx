import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import ResolveWord from '@/components/ui/ResolveWord'
import { NOT_A_FIT, RENDER_PROMISE, RISK_REVERSAL, TEAM_MEMBERS } from '@/lib/data'

const ArrowRight = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const founderNames = TEAM_MEMBERS.map((member) => member.name).join(' and ')

/**
 * The argument, after the evidence and before the price. It opens on the verb the
 * company is named for and closes on the guarantee, so risk comes off the table
 * before the number goes on it in HomePricing directly below.
 *
 * The spine is NOT_A_FIT, promoted out of the bottom of the pricing section.
 * Naming who Render is wrong for is the one claim here a competitor will not
 * copy. The three DIFFERENTIATORS that used to fill this space restated
 * ProofStrip without its links, and nothing in them could be falsified.
 *
 * The animated h2 is safe to index: ResolveWord server-renders only the settled
 * word, so the heading is deterministically "We don't just render websites. We
 * render customers."
 */
export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-24 bg-graphite-light py-20 text-white md:py-32">
      <div className="container-studio">
        <Reveal className="mb-16 max-w-4xl">
          <p className="eyebrow mb-4 text-xs text-accent-soft">Why Render</p>
          <h2 className="text-display-xl text-white">
            <span className="block">{RENDER_PROMISE.lead}</span>
            <span className="block">
              {RENDER_PROMISE.verb}{' '}
              <ResolveWord
                words={RENDER_PROMISE.words}
                holds={RENDER_PROMISE.holds}
                className="align-baseline text-accent-soft"
              />
            </span>
          </h2>
        </Reveal>

        {/* A cheap price with no stated trade-off invites the buyer to guess what was
            cut. Naming who Render is wrong for is what turns the number into a choice. */}
        <Reveal delay={0.1} className="border-t border-white/15 pt-10">
          <h3 className="font-display text-xl font-semibold text-white">{NOT_A_FIT.headline}</h3>
          <p className="mt-2 max-w-2xl text-white/70">{NOT_A_FIT.intro}</p>

          <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {NOT_A_FIT.cases.map((item) => (
              <div key={item.title}>
                <dt className="font-semibold text-white">{item.title}</dt>
                <dd className="mt-2 leading-relaxed text-white/70">{item.body}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-3xl font-medium leading-relaxed text-white">
            {NOT_A_FIT.closing}
          </p>
        </Reveal>

        {/* The last thing read before the pricing section. */}
        <Reveal delay={0.15}>
          <div className="mt-16 rounded-card border border-white/15 bg-white/[0.04] p-8 md:p-12">
            <p className="eyebrow mb-5 text-xs text-accent-soft">Before you commit</p>
            <p className="font-display max-w-3xl text-[26px] font-semibold leading-[1.35] tracking-[-0.02em] text-white md:text-[30px]">
              {RISK_REVERSAL.headline}
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-white/70">{RISK_REVERSAL.supporting}</p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
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
            <Button variant="secondary-inverse" href="/contact" size="lg">
              Request a Call
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
