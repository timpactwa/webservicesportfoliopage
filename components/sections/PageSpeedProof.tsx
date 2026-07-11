import Reveal from '@/components/ui/Reveal'
import { PAGESPEED } from '@/lib/data'

// Google/Lighthouse "good" green, used verbatim so the gauges read as Google's
// own result rather than our brand teal. Sanctioned spec value, not a token.
const GOOD_GREEN = '#0cce6b'

function ScoreRing({ value, label }: { value: number; label: string }) {
  const r = 44
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - value / 100)
  return (
    <div
      role="img"
      aria-label={`${label} score ${value} out of 100`}
      className="flex flex-col items-center text-center"
    >
      <div className="relative h-20 w-20 md:h-24 md:w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={GOOD_GREEN}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold md:text-3xl"
          style={{ color: GOOD_GREEN }}
        >
          {value}
        </span>
      </div>
      <span aria-hidden="true" className="mt-3 text-xs font-medium text-white/70 md:text-sm">
        {label}
      </span>
    </div>
  )
}

function DeviceIcon({ device }: { device: string }) {
  if (device === 'Mobile') {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 18h2" />
      </svg>
    )
  }
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 20h8M12 16v4" />
    </svg>
  )
}

/**
 * "Don't take our word for it, take Google's." Renders the real PageSpeed Insights
 * scores for our own site as native SVG gauges: crisp, instant, theme-proof, and far
 * lighter than pasting a screenshot onto a page that is bragging about speed. Pairs
 * the numbers with a link to run the same test live, so the claim is verifiable
 * rather than a picture. Sits on the web-design page right where we claim
 * "Performance-optimized (Core Web Vitals)".
 */
export default function PageSpeedProof() {
  return (
    <section id="performance" className="scroll-mt-24 bg-graphite-light py-20 text-white md:py-32">
      <div className="container-studio">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4 text-xs text-accent-soft">{PAGESPEED.eyebrow}</p>
          <h2 className="text-display-lg text-white">{PAGESPEED.headline}</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">{PAGESPEED.body}</p>
        </Reveal>

        <div className="space-y-6">
          {PAGESPEED.results.map((group, index) => (
            <Reveal as="div" key={group.device} index={index}>
              <div className="rounded-card border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="mb-8 flex items-center gap-2.5 text-white/80">
                  <DeviceIcon device={group.device} />
                  <span className="font-display text-sm font-semibold">{group.device}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
                  {group.scores.map((score) => (
                    <ScoreRing key={score.label} value={score.value} label={score.label} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/55">{PAGESPEED.attribution}</p>
            <a
              href={PAGESPEED.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-soft transition-all duration-200 hover:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-light"
            >
              {PAGESPEED.verifyLabel}
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
