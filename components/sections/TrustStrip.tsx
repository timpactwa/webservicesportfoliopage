import { TRUST_MARKERS } from '@/lib/data'

export default function TrustStrip() {
  return (
    <section className="bg-surface border-b border-hairline" aria-label="Why businesses choose Render">
      <div className="container-studio">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-hairline lg:divide-y-0 lg:divide-x">
          {TRUST_MARKERS.map((marker) => (
            <div key={marker.label} className="py-7 lg:py-8 lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <dt className="text-base font-semibold text-graphite mb-1.5">{marker.label}</dt>
              <dd className="text-sm text-graphite-soft leading-relaxed">{marker.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
