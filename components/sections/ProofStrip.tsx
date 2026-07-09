import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import { PROOF_MARKERS } from '@/lib/data'

const ArrowRight = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

/**
 * Sits directly under the hero and answers "why Render" before the visitor has to
 * scroll for it. Deliberately carries PROOF_MARKERS rather than the softer
 * TRUST_MARKERS: every claim here is one a skeptic can click and falsify in about
 * thirty seconds, which is the only kind of claim that does any work for a studio
 * with no client testimonials yet.
 *
 * Superseded TrustStrip in this slot. TRUST_MARKERS still renders on /work.
 */
export default function ProofStrip() {
  return (
    <section className="bg-bg" aria-label="Proof you can check">
      <div className="container-studio py-14 md:py-16">
        <Reveal className="mb-9">
          <p className="eyebrow text-xs text-accent-dark">Proof you can check</p>
        </Reveal>

        {/* HTML permits exactly one div between a dl and its dt/dd pairs, and Reveal
            renders that div. The icon therefore lives inside the dt: an extra flex
            wrapper around it put dt two levels down, which fails axe's definition-list
            and dlitem rules and drags down Lighthouse's agent-accessibility-tree audit. */}
        <dl className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {PROOF_MARKERS.map((marker, index) => (
            <Reveal
              key={marker.label}
              index={index}
              className="py-6 first:pt-0 last:pb-0 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="mb-2 flex items-center gap-2 font-display text-base font-semibold text-graphite">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-dark">
                  <CheckIcon />
                </span>
                {marker.label}
              </dt>
              <dd>
                <p className="mb-3 text-sm leading-relaxed text-graphite-soft">{marker.description}</p>
                <Link
                  href={marker.href}
                  className="inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-accent transition-all duration-200 hover:gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  See for yourself
                  <ArrowRight />
                </Link>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
