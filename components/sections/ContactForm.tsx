import { Suspense } from 'react'
import RequestCallFormFromUrl from '@/components/ui/RequestCallFormFromUrl'
import { GUARANTEE } from '@/lib/data'

const steps = [
  'You send a couple of times that work for you.',
  'We confirm one by email, usually within a business day.',
  'On the call we map out exactly what we would build, and what it costs.',
]

export default function ContactForm() {
  return (
    <section className="pt-10 pb-20 md:pt-16 md:pb-32 bg-bg">
      <div className="container-studio">
        <div className="max-w-3xl mb-12">
          <h1 className="text-display-xl text-graphite mb-6">Request a Call.</h1>
          <p className="text-lg text-graphite-soft leading-relaxed">
            Tell us when you are free and what you need. We&apos;ll use the call to understand your
            business and map out exactly what we&apos;d build. It&apos;s free, and there is nothing
            to buy on it.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <div className="space-y-4">
              <h2 className="eyebrow text-xs text-accent-dark">How this works</h2>
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

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@renderlocalwebsites.com" className="text-graphite-soft font-medium hover:text-accent transition-colors">
                  support@renderlocalwebsites.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-graphite-soft font-medium">Morris County, NJ</p>
              </div>
            </div>

            <div className="mt-10 rounded-card border border-hairline bg-surface p-6">
              <h2 className="text-lg font-semibold text-graphite mb-2">
                Not sure what you have ready?
              </h2>
              <p className="text-graphite-soft leading-relaxed mb-5">
                Bring whatever you&apos;ve got. A folder of photos, a rough sketch, a design you
                like, or just an idea in your head. We work from any starting point.
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {['Photos and images', 'Wireframes and sketches', 'Design concepts or examples', 'Just an idea works too'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-graphite-soft">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-sm font-medium text-accent-dark">{GUARANTEE.long}</p>
          </div>

          <div>
            <Suspense
              fallback={
                <div className="h-[640px] rounded-card border border-hairline bg-surface" />
              }
            >
              <RequestCallFormFromUrl />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
