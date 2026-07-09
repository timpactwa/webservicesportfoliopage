import { TESTIMONIALS } from '@/lib/data'

const PLACEHOLDER_QUOTE = 'Placeholder testimonial copy sits here until a real client quote exists.'
const PLACEHOLDER_NAME = 'Client name'
const PLACEHOLDER_TOWN = 'Town, NJ'

/**
 * Large feature-quote layout (design option 1c), shared by the real-quote
 * state and the placeholder empty state below, so dropping in the first real
 * client testimonial in lib/data.ts is a one-line change, not a redesign.
 */
function QuoteCard({ quote, name, subtitle }: { quote: string; name: string; subtitle: string }) {
  return (
    <figure className="flex max-w-3xl items-start gap-5 px-6 py-8 sm:gap-7 md:px-[52px] md:py-16">
      <span
        aria-hidden="true"
        className="font-display text-[64px] font-bold leading-[0.8] text-accent-soft"
      >
        &ldquo;
      </span>
      <div>
        <blockquote className="font-display text-[28px] font-semibold leading-[1.45] tracking-[-0.02em] text-graphite">
          {quote}
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <div aria-hidden="true" className="h-11 w-11 flex-shrink-0 rounded-full bg-accent-soft" />
          <div>
            <p className="font-display text-sm font-semibold text-graphite">{name}</p>
            <p className="mt-0.5 text-[13px] text-graphite-soft">{subtitle}</p>
          </div>
        </figcaption>
      </div>
    </figure>
  )
}

/**
 * TESTIMONIALS starts empty in lib/data.ts: no client has given us a quote
 * yet. Rather than render nothing, this shows an explicitly placeholder-
 * labeled empty state in the same layout a real quote will use, so the
 * section slot is visible and honest instead of a fabricated testimonial.
 * Once TESTIMONIALS has an entry, that real quote renders here instead.
 */
export default function Testimonials() {
  return (
    <section className="bg-bg" aria-label="What our clients say">
      <div className="container-studio py-20 md:py-32">
        {TESTIMONIALS.length > 0 ? (
          <div className="space-y-10 md:space-y-14">
            {TESTIMONIALS.map((testimonial) => (
              <QuoteCard
                key={`${testimonial.name}-${testimonial.business}`}
                quote={testimonial.quote}
                name={testimonial.name}
                subtitle={
                  testimonial.town
                    ? `${testimonial.business}, ${testimonial.town}`
                    : testimonial.business
                }
              />
            ))}
          </div>
        ) : (
          <QuoteCard quote={PLACEHOLDER_QUOTE} name={PLACEHOLDER_NAME} subtitle={PLACEHOLDER_TOWN} />
        )}
      </div>
    </section>
  )
}
