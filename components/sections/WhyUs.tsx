import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { LAUNCH_TIMELINE, PROOF_MARKERS, TEAM_MEMBERS } from '@/lib/data'

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

// Prices now live on the homepage pricing section, so the "pricing" proof marker
// points at /#pricing instead of the old /services destination.
const proofHref = (href: string) => (href === '/services' ? '/#pricing' : href)

const founderNames = TEAM_MEMBERS.map((member) => member.name).join(' and ')

export default function WhyUs() {
  return (
    <section id="why" className="scroll-mt-24 py-20 md:py-32 bg-graphite-light text-white">
      <div className="container-studio">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4 text-xs text-accent-soft">How a launch works</p>
          <h2 className="text-display-xl text-white">From first call to live in two to four weeks.</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Most sites go live in two to four weeks. Here is what happens, week by week.
          </p>
        </Reveal>

        {/* Real launch timeline: vertical rail on mobile, horizontal rail on md+. */}
        <ol className="relative space-y-10 md:flex md:gap-8 md:space-y-0">
          {LAUNCH_TIMELINE.map((step, index) => {
            const isLast = index === LAUNCH_TIMELINE.length - 1
            return (
              <Reveal
                as="li"
                key={step.week}
                index={index}
                className="relative pl-8 md:flex-1 md:pl-0 md:pt-8"
              >
                {/* Step marker */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-3 w-3 rounded-full bg-accent-soft md:top-0"
                />
                {/* Vertical connector (mobile) */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1.5 top-4 -bottom-10 w-px bg-white/15 md:hidden"
                  />
                )}
                {/* Horizontal connector (md+) */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-[5px] hidden h-px -right-8 bg-white/15 md:block"
                  />
                )}
                <p className="eyebrow text-xs text-accent-soft">{step.week}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.description}</p>
              </Reveal>
            )
          })}
        </ol>

        {/* Proof folded in from the retired ProofBar: three claims a skeptic can check. */}
        <div className="mt-20 border-t border-white/10 pt-14">
          <Reveal className="mb-8">
            <p className="eyebrow text-xs text-accent-soft">Proof you can check</p>
          </Reveal>
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-white/10">
            {PROOF_MARKERS.map((marker, index) => (
              <Reveal
                key={marker.label}
                index={index}
                className="py-6 sm:py-0 sm:px-8 first:sm:pl-0 last:sm:pr-0"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-accent-soft">
                    <CheckIcon />
                  </span>
                  <h3 className="text-base font-semibold text-white">{marker.label}</h3>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-white/70">{marker.description}</p>
                <Link
                  href={proofHref(marker.href)}
                  className="inline-flex items-center gap-1 rounded-sm text-sm font-semibold text-accent-soft transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-light"
                >
                  See for yourself
                  <ArrowRight />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Named founders (the homepage never named them before) + closing CTA. */}
        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col items-start gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
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
