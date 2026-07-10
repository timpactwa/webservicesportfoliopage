import Reveal from '@/components/ui/Reveal'
import { LAUNCH_TIMELINE, LAUNCH_TIMELINE_SECTION } from '@/lib/data'

/**
 * "How long does this take" is a real objection, and a dated schedule is concrete
 * rather than boastful. Lived inside HomeContact, which is gone; it earns a band.
 */
export default function LaunchTimeline() {
  return (
    <section className="border-t border-hairline bg-surface py-20 md:py-28">
      <div className="container-studio">
        <Reveal className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4 text-xs text-accent-dark">{LAUNCH_TIMELINE_SECTION.eyebrow}</p>
          <h2 className="text-display-xl text-graphite">{LAUNCH_TIMELINE_SECTION.headline}</h2>
        </Reveal>

        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-4">
          {LAUNCH_TIMELINE.map((step, index) => (
            <Reveal as="li" key={step.week} index={index} className="border-t border-hairline pt-6">
              <span
                aria-hidden="true"
                className="mb-4 flex h-2.5 w-2.5 rounded-full bg-accent"
              />
              <p className="eyebrow text-[11px] text-accent-dark">{step.week}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-graphite">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-graphite-soft">{step.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
