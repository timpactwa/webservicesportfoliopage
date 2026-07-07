import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { SERVICE_ICONS, CheckIcon, ArrowRightIcon } from '@/components/ui/icons'
import { SERVICES, COMPANY } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Kitchen remodels, bathroom renovations, decks, basements, additions, and repairs in Morris County, NJ.',
}

export default function ServicesPage() {
  return (
    <div className="bg-paper min-h-screen">
      {/* header */}
      <div className="bg-prussian text-paper py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid bg-grid pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-hivisBright uppercase tracking-[0.3em] mb-4">
            Scope of Work
          </p>
          <h1 className="font-display uppercase font-bold text-6xl md:text-7xl leading-none mb-5">
            Services
          </h1>
          <p className="text-paper/70 max-w-md mx-auto">
            Every line below is work our own crew performs: licensed, insured,
            and covered by a two-year workmanship warranty.
          </p>
        </div>
      </div>

      {/* service sheets */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-8">
        {SERVICES.map((svc, i) => {
          const Icon = SERVICE_ICONS[svc.slug]
          return (
            <article
              key={svc.slug}
              className="bg-white border border-prussian/15 grid md:grid-cols-[1fr_260px]"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 border border-prussian/25 text-prussian shrink-0">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-graphite">
                      {String(i + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                    </p>
                    <h2 className="font-display uppercase font-bold text-3xl text-ink leading-tight">
                      {svc.name}
                    </h2>
                  </div>
                </div>
                <p className="text-graphite leading-relaxed mb-6 max-w-xl">{svc.blurb}</p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                  {svc.scope.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-ink">
                      <CheckIcon className="w-4 h-4 text-prussian shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-dashed border-prussian/20 p-8 flex flex-col justify-between gap-6 bg-paper/60">
                <dl className="space-y-4">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-graphite">
                      Typical timeline
                    </dt>
                    <dd className="font-display font-bold text-xl text-ink">{svc.timeline}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-graphite">
                      Starting at
                    </dt>
                    <dd className="font-display font-bold text-xl text-prussian">{svc.startingAt}</dd>
                  </div>
                </dl>
                <Link
                  href={`/book?service=${svc.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-hivis text-ink font-display uppercase tracking-wider font-bold text-sm px-5 py-3 hover:bg-hivisBright transition-colors cursor-pointer"
                >
                  Book this <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      {/* bottom note */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <SectionLabel index="§" label="Something else?" />
        <p className="text-center text-graphite mt-6 max-w-lg mx-auto">
          If your project doesn&apos;t fit a category above, call{' '}
          <a href={COMPANY.phoneHref} className="text-prussian font-semibold underline underline-offset-4 decoration-hivis">
            {COMPANY.phone}
          </a>{' '}
          and describe it. If it&apos;s not our work, we&apos;ll point you to someone good.
        </p>
      </div>
    </div>
  )
}
