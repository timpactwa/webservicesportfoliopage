import type { Metadata } from 'next'
import Link from 'next/link'
import { SERVICE_ICONS, CheckIcon, ArrowRightIcon } from '@/components/ui/icons'
import { SERVICES, PRACTICE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Preventive, restorative, cosmetic, family, and emergency dentistry in Denville, NJ — with pricing in writing before treatment begins.',
}

export default function ServicesPage() {
  return (
    <div className="bg-porcelain min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-14 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-stone mb-4">Our care</p>
        <h1 className="font-display text-5xl md:text-6xl text-petrol leading-tight mb-5">
          Everything a healthy
          <br />
          smile needs
        </h1>
        <p className="text-stone max-w-lg mx-auto">
          Six areas of care, one calm office. Every treatment plan comes with
          the cost in writing before you commit to anything.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-6">
        {SERVICES.map((svc) => {
          const Icon = SERVICE_ICONS[svc.slug]
          return (
            <article
              key={svc.slug}
              className="bg-white border border-petrol/10 rounded-3xl p-8 md:p-10 grid md:grid-cols-[1fr_240px] gap-8"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-powder/60 text-petrol shrink-0">
                    <Icon className="w-7 h-7" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-sage font-semibold">
                      {svc.tag}
                    </p>
                    <h2 className="font-display text-3xl text-petrol leading-tight">{svc.name}</h2>
                  </div>
                </div>
                <p className="text-stone leading-relaxed max-w-xl">{svc.blurb}</p>
              </div>
              <div className="md:border-l md:border-petrol/10 md:pl-8 flex flex-col justify-between gap-6">
                <ul className="space-y-2.5">
                  {svc.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-petrol">
                      <CheckIcon className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/new-patients?reason=${svc.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-petrol text-porcelain text-sm font-semibold px-5 py-3 rounded-full hover:bg-petrolDeep transition-colors cursor-pointer"
                >
                  Request this visit <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-24 text-center">
        <p className="text-stone">
          Not sure what you need? Call{' '}
          <a
            href={PRACTICE.phoneHref}
            className="text-petrol font-semibold underline underline-offset-4 decoration-sage/60"
          >
            {PRACTICE.phone}
          </a>{' '}
          and describe what&apos;s going on — the front desk can usually tell you
          what kind of visit to book in under a minute.
        </p>
      </div>
    </div>
  )
}
