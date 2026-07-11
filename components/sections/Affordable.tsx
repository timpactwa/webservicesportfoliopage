import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { AFFORDABLE } from '@/lib/data'

const ArrowRight = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const LockIcon = () => (
  <svg
    className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-soft"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0v4" />
  </svg>
)

/**
 * The affordability and AI-honesty pitch, sitting between "what we do" and the
 * prices so value is framed before the number lands. It leads on the outcome the
 * audience cares about (an affordable site) and discloses AI plus human oversight
 * as the reason it's possible, then backs the claim with three promises a stranger
 * can click and falsify. Replaces the old animated WhyUs headline and pillar block.
 */
export default function Affordable() {
  return (
    <section id="why" className="scroll-mt-24 bg-graphite-light py-20 text-white md:py-32">
      <div className="container-studio">
        <Reveal className="mb-12 max-w-3xl">
          <p className="eyebrow mb-4 text-sm text-accent-soft">{AFFORDABLE.eyebrow}</p>
          <h2 className="text-display-xl text-white">{AFFORDABLE.headline}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{AFFORDABLE.body}</p>
        </Reveal>

        {/* Three promises, each ending in a link that lets a skeptic falsify it on
            the spot. That verifiability is the whole point: it is the one kind of
            claim that works before a single client testimonial exists. */}
        <dl className="grid grid-cols-1 gap-x-10 gap-y-8 border-t border-white/15 pt-10 md:grid-cols-3">
          {AFFORDABLE.promises.map((promise, index) => (
            <Reveal as="div" key={promise.text} index={index}>
              <dt className="font-display text-lg font-semibold leading-snug text-white">
                {promise.text}
              </dt>
              <dd>
                <Link
                  href={promise.href}
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-soft transition-all duration-200 hover:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-light"
                >
                  {promise.linkLabel}
                  <ArrowRight />
                </Link>
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* Payment reassurance: card data is handled by Stripe, never by us. */}
        <Reveal delay={0.15}>
          <p className="mt-10 flex items-start gap-2.5 text-sm leading-relaxed text-white/55">
            <LockIcon />
            <span>{AFFORDABLE.paymentsNote}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
