import { TRUST_MARKERS } from '@/lib/data'

export default function TrustStrip() {
  return (
    <section className="bg-bg" aria-label="Why businesses choose Render">
      <div className="container-studio">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 py-11 sm:grid-cols-2 md:grid-cols-4">
          {TRUST_MARKERS.map((marker) => (
            <div key={marker.label}>
              <span aria-hidden="true" className="mb-3.5 block h-2 w-2 rounded-full bg-accent" />
              <dt className="font-display text-[17px] font-semibold text-graphite">{marker.label}</dt>
              <dd className="mt-2 text-[13.5px] leading-[1.6] text-graphite-soft">{marker.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
