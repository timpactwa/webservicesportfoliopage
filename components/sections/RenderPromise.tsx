import Reveal from '@/components/ui/Reveal'
import ResolveWord from '@/components/ui/ResolveWord'
import { RENDER_PROMISE } from '@/lib/data'

/**
 * The closer. Sits after the demos, the price, the objections, and the service
 * list, so a visitor reaching it already knows what Render sells and the pun
 * pays off instead of stalling comprehension.
 *
 * Left-aligned on purpose. While the shorter words show, they sit in a slot
 * sized for "customers." and leave trailing space; centered, the line would
 * read off-center and then snap true.
 */
export default function RenderPromise() {
  return (
    <section className="border-t border-hairline bg-surface py-20 md:py-32">
      <div className="container-studio">
        <Reveal>
          <p className="max-w-3xl text-display-lg text-graphite">
            <span className="block">{RENDER_PROMISE.lead}</span>
            <span className="block">
              {RENDER_PROMISE.verb}{' '}
              <ResolveWord
                words={RENDER_PROMISE.words}
                holds={RENDER_PROMISE.holds}
                className="align-baseline text-accent-dark"
              />
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
