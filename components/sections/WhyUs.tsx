import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import ResolveWord from '@/components/ui/ResolveWord'
import { RENDER_PROMISE, TEAM_MEMBERS, WHY_RENDER } from '@/lib/data'

const ArrowRight = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const founderNames = TEAM_MEMBERS.map((member) => member.name).join(' and ')

/**
 * The argument, before the evidence and the price. It opens on the verb the
 * company is named for, then makes three promises a stranger can click and check
 * for themselves: who builds the site, that the price is already on the page, and
 * that they see the work before they pay.
 *
 * These three are exactly the proofs the deleted ProofStrip used to restate a
 * row later. Folding them into the argument is what let ProofStrip go: a claim
 * repeated in three sections reads as filler, not emphasis.
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

        {/* Three promises, each ending in a link that lets a skeptic falsify it on
            the spot. That verifiability is the whole point: it is the one kind of
            claim that works before a single client testimonial exists. */}
        <dl className="grid grid-cols-1 gap-x-10 gap-y-12 border-t border-white/15 pt-12 md:grid-cols-3">
          {WHY_RENDER.pillars.map((pillar, index) => (
            <Reveal as="div" key={pillar.title} index={index}>
              <dt className="font-display text-xl font-semibold leading-snug text-white">
                {pillar.title}
              </dt>
              <dd className="mt-3 leading-relaxed text-white/70">{pillar.body}</dd>
              <Link
                href={pillar.href}
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-soft transition-all duration-200 hover:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-light"
              >
                {pillar.linkLabel}
                <ArrowRight />
              </Link>
            </Reveal>
          ))}
        </dl>

        {/* One honest line on who we are wrong for. A named trade-off turns a low
            price into a deliberate choice rather than "the same thing, cheaper." */}
        <Reveal delay={0.1}>
          <p className="mt-14 max-w-3xl border-t border-white/10 pt-10 leading-relaxed text-white/60">
            {WHY_RENDER.notForLine}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
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
              Book a Free Call
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
