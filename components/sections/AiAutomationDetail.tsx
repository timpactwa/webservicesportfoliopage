import { AI_USE_CASES, GUARANTEE } from '@/lib/data'
import Button from '@/components/ui/Button'
import InboxDemo from '@/components/ui/InboxDemo'
import Reveal from '@/components/ui/Reveal'
import UseCaseCard from '@/components/ui/UseCaseCard'

const reviewItems = [
  'It fires the moment you mark a job or visit complete, so the ask lands while the work is still fresh',
  'The request goes out by text or email, whichever channel your customers actually open',
  'The message stays short and polite, with a direct link so leaving a review is one tap',
  'More Google reviews, which feed straight back into your local search',
]

export default function AiAutomationDetail() {
  return (
    <div>
      <section className="py-20 md:py-28 bg-graphite-light text-white">
        <div className="container-studio">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <p className="eyebrow mb-4 text-xs text-accent">AI Consulting & Automation</p>
              <h1 className="text-display-xl text-white mb-8">
                The follow-up work costing you customers, automated.
              </h1>
              <div className="space-y-5 text-lg leading-relaxed text-white/70">
                <p>
                  Every missed after-hours message, every lead sitting in an inbox for two days,
                  every review request you meant to send but didn&apos;t. That is a customer choosing
                  whoever answered first. We build small, reliable systems that catch it. No
                  dashboards to learn, no science project.
                </p>
              </div>
              <div className="mt-8">
                <Button variant="primary" size="lg" href="/contact?intent=ai">
                  Talk to Us About AI
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <InboxDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-bg">
        <div className="container-studio">
          <div className="mb-12 max-w-2xl md:mb-16">
            <h2 className="mb-4 text-display-md text-graphite">The follow-ups worth automating.</h2>
            <p className="text-lg leading-relaxed text-graphite-soft">
              These are the small, repeatable tasks that quietly lose you customers. Each one is a
              system we can build and hand you.
            </p>
          </div>
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {AI_USE_CASES.map((useCase) => (
                <UseCaseCard
                  key={useCase.title}
                  title={useCase.title}
                  description={useCase.description}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-bg">
        <div className="container-studio">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="rounded-card border border-hairline bg-surface p-8">
                <p className="eyebrow mb-3 text-xs text-accent-dark">Named service</p>
                <h2 className="mb-3 text-2xl font-semibold text-graphite">
                  How review requests actually go out.
                </h2>
                <p className="mb-6 leading-relaxed text-graphite-soft">
                  Reviews are the highest-leverage thing a local business owns, and the ask is the
                  step everyone forgets. Here is how we take it off your plate:
                </p>
                <ul className="space-y-3">
                  {reviewItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-graphite-soft">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex flex-col justify-center">
                <h2 className="mb-3 text-2xl font-semibold text-graphite">
                  Honest scoping, like everything else we do.
                </h2>
                <p className="mb-4 leading-relaxed text-graphite-soft">
                  AI automation is scoped per project: we look at the task you dread, tell you
                  whether it&apos;s actually worth automating, and hand you a fixed number before
                  you commit to anything. If it isn&apos;t worth it, we&apos;ll say so and save you
                  the money.
                </p>
                <p className="mb-8 leading-relaxed text-graphite-soft">
                  It pairs naturally with a website build, but you don&apos;t need one from us to
                  start. {GUARANTEE.short} That standard applies here too.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="primary" size="lg" href="/contact?intent=ai">
                    Talk to Us About AI
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
