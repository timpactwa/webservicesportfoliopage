import { TESTIMONIALS } from '@/lib/data'

/**
 * Renders nothing until a real client testimonial exists in TESTIMONIALS.
 * An empty proof section is honest. A fabricated one is not, and it is the
 * fastest way to lose a local buyer who can check.
 */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null

  return (
    <section className="bg-surface border-b border-hairline" aria-label="What our clients say">
      <div className="container-studio py-14 md:py-16">
        <p className="eyebrow mb-8 text-center text-xs text-accent-dark">
          From the people who hired us
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={`${testimonial.name}-${testimonial.business}`}
              className="flex h-full flex-col rounded-card border border-hairline bg-bg p-6"
            >
              {testimonial.result && (
                <p className="font-display text-2xl font-semibold text-accent-dark mb-3">
                  {testimonial.result}
                </p>
              )}

              <blockquote className="flex-1 text-graphite leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 border-t border-hairline pt-4">
                <p className="text-sm font-semibold text-graphite">{testimonial.name}</p>
                <p className="text-sm text-graphite-soft">
                  {testimonial.business}
                  {testimonial.town ? `, ${testimonial.town}` : ''}
                </p>
                {testimonial.source && (
                  <p className="mt-1 text-xs text-graphite-soft/70">{testimonial.source}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
