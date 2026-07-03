import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/icons'
import { TEAM, PRACTICE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About & Team',
  description:
    'Meet the team at Marlowe Dental Studio — boutique family dentistry in Denville, NJ, built around unhurried visits and honest pricing.',
}

const COMFORTS = [
  'Noise-cancelling headphones at every chair',
  'Weighted blankets on request',
  'Signal-to-pause — raise a hand, we stop',
  'Nitrous oxide available for any visit',
  'Prices in writing before treatment',
  'Text updates if we run behind',
]

export default function AboutPage() {
  return (
    <div className="bg-porcelain min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-stone mb-4">About the studio</p>
        <h1 className="font-display text-5xl md:text-6xl text-petrol leading-tight mb-5">
          Small on purpose
        </h1>
        <p className="text-stone max-w-lg mx-auto">
          Three clinicians, one location, and a patient list we keep short
          enough to know. That&apos;s not a limitation — it&apos;s the product.
        </p>
      </div>

      {/* team */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {TEAM.map((member) => {
          const initials = member.name
            .replace(/,.*/, '')
            .split(' ')
            .filter((w) => /^[A-Z]/.test(w) && !w.endsWith('.'))
            .map((w) => w[0])
            .slice(-2)
            .join('')
          return (
            <article
              key={member.name}
              className="bg-white border border-petrol/10 rounded-3xl rounded-tr-[4rem] overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] bg-petrol relative flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #D8E7EB 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                  }}
                />
                <span className="font-display text-porcelain/90 text-6xl">{initials}</span>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <h2 className="font-display text-2xl text-petrol leading-tight">{member.name}</h2>
                <p className="text-xs uppercase tracking-[0.2em] text-sage font-semibold mt-1 mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-stone leading-relaxed flex-1">{member.bio}</p>
                <ul className="mt-5 pt-5 border-t border-petrol/10 space-y-1.5">
                  {member.credentials.map((c) => (
                    <li key={c} className="text-xs text-stone flex items-center gap-2">
                      <CheckIcon className="w-3.5 h-3.5 text-sage shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>

      {/* comfort menu */}
      <div className="bg-petrol text-porcelain rounded-t-arc py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-sage mb-4">The comfort menu</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Standard at every visit
            </h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4 max-w-2xl mx-auto mb-12">
            {COMFORTS.map((c) => (
              <li key={c} className="flex items-start gap-3 text-porcelain/85">
                <CheckIcon className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                {c}
              </li>
            ))}
          </ul>
          <div className="text-center">
            <Link
              href="/new-patients"
              className="group inline-flex items-center gap-3 bg-sage text-petrolDeep font-semibold px-9 py-4 rounded-full hover:bg-porcelain transition-colors cursor-pointer"
            >
              Become a patient
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-sm text-porcelain/60 mt-5">
              {PRACTICE.address} · {PRACTICE.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
