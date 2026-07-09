import { GUARANTEE } from '@/lib/data'
import Button from '@/components/ui/Button'
import Reveal from '@/components/ui/Reveal'
import TriangleHeading from '@/components/ui/TriangleHeading'

const useCases = [
  'After-hours questions triaged overnight with a draft reply waiting for you',
  'Website leads routed straight into your spreadsheet or CRM, already organized',
  'Review requests that send themselves the moment a job or visit is done',
  'SOPs and internal docs that stay current on their own',
]

const reviewItems = [
  'A finished job or visit triggers a polite review request automatically',
  'Requests go out by the channel your customers actually read',
  'Nobody on your team has to remember to send anything',
  'More Google reviews, which feed straight back into local search',
]

export default function AiAutomationDetail() {
  return (
    <div>
      <section className="py-20 md:py-28 bg-graphite text-white">
        <div className="container-studio">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent">AI Consulting & Automation</p>
            <TriangleHeading as="h1" className="text-display-xl text-white mb-8" delay={0}>
              The follow-up work costing you customers, automated.
            </TriangleHeading>
            <div className="mb-8 space-y-5 text-lg leading-relaxed text-white/70">
              <p>
                Every missed after-hours message, every lead sitting in an inbox for two days,
                every review request you meant to send but didn&apos;t. That is a customer choosing
                whoever answered first. We build small, reliable systems that catch it. No
                dashboards to learn, no science project.
              </p>
            </div>
            <ul className="mb-8 max-w-2xl space-y-3">
              {useCases.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70">
                  <svg
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent"
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
        </div>
      </section>

      <section className="py-20 md:py-28 bg-bg">
        <div className="container-studio">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="rounded-card border border-hairline bg-surface p-8">
                <p className="eyebrow mb-3 text-xs text-accent-dark">Named service</p>
                <h2 className="mb-3 text-2xl font-semibold text-graphite">
                  Review requests on autopilot.
                </h2>
                <p className="mb-6 leading-relaxed text-graphite-soft">
                  Reviews are the highest-leverage thing a local business owns, and asking for them
                  is the task everyone forgets. We automate the ask:
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
