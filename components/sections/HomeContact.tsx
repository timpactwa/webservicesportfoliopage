import { Suspense } from 'react'
import RequestCallForm from '@/components/ui/RequestCallForm'
import Reveal from '@/components/ui/Reveal'
import { GUARANTEE, LAUNCH_TIMELINE } from '@/lib/data'

const steps = [
  'You send a couple of times that work for you.',
  'We confirm one by email, usually within a business day.',
  'On the call we map out exactly what we would build, and what it costs.',
]

export default function HomeContact() {
  return (
    <section id="contact" className="scroll-mt-24 pt-20 md:pt-32 pb-28 md:pb-0 bg-bg">
      <div className="container-studio">
        <Reveal className="max-w-3xl mb-12">
          <p className="eyebrow mb-4 text-xs text-accent-dark">Contact</p>
          <h2 className="text-display-xl text-graphite mb-6">Request a call.</h2>
          <p className="text-lg text-graphite-soft leading-relaxed">
            Send a couple of times that work and tell us what you need, and we&apos;ll map out
            exactly what we would build on a free call with nothing to buy.
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <div className="space-y-4">
              <h3 className="eyebrow text-xs text-accent-dark">How this works</h3>
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                      {index + 1}
                    </span>
                    <p className="text-graphite-soft leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Launch timeline, moved here from WhyUs: the schedule someone reaching
                out actually wants. Distinct from the booking steps above (that list
                is how to get a call; this is what the build looks like once we start). */}
            <div className="mt-10 space-y-4">
              <h3 className="eyebrow text-xs text-accent-dark">Your launch timeline</h3>
              <ol className="relative space-y-5">
                {LAUNCH_TIMELINE.map((step, index) => {
                  const isLast = index === LAUNCH_TIMELINE.length - 1
                  return (
                    <li key={step.week} className="relative pl-6">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                      />
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[4.5px] top-4 -bottom-5 w-px bg-hairline"
                        />
                      )}
                      <p className="eyebrow text-[11px] text-accent-dark">{step.week}</p>
                      <h4 className="mt-1 text-[14px] font-semibold text-graphite">{step.title}</h4>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-graphite-soft">
                        {step.description}
                      </p>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:support@renderlocalwebsites.com" className="text-graphite-soft font-medium hover:text-accent transition-colors">
                support@renderlocalwebsites.com
              </a>
            </div>

            <p className="mt-8 text-sm font-medium text-accent-dark">{GUARANTEE.short}</p>
          </div>

          <div>
            <Suspense
              fallback={
                <div className="h-[640px] rounded-card border border-hairline bg-surface" />
              }
            >
              <RequestCallForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
