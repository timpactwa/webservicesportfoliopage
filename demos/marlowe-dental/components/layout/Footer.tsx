import Link from 'next/link'
import { NAV_LINKS, PRACTICE } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-petrolDeep text-porcelain rounded-t-arc mt-[-1px]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-display text-3xl mb-1">Marlowe</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-porcelain/50 mb-5">
              Dental Studio
            </p>
            <p className="text-sm text-porcelain/70 leading-relaxed max-w-xs">
              {PRACTICE.tagline} Boutique family dentistry in Denville — unhurried
              visits, honest pricing, and a team that remembers your name.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-porcelain/50 mb-4">Visit</p>
            <ul className="space-y-3 text-sm text-porcelain/80">
              <li>{PRACTICE.address}</li>
              <li>
                <a href={PRACTICE.phoneHref} className="hover:text-sage transition-colors">
                  {PRACTICE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${PRACTICE.email}`} className="hover:text-sage transition-colors">
                  {PRACTICE.email}
                </a>
              </li>
            </ul>
            <ul className="mt-5 space-y-1.5">
              {PRACTICE.hours.map(([day, time]) => (
                <li key={day} className="flex justify-between gap-6 text-sm text-porcelain/60 max-w-[240px]">
                  <span>{day}</span>
                  <span>{time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-porcelain/50 mb-4">Pages</p>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-porcelain/80 hover:text-sage transition-colors">
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-porcelain/80 hover:text-sage transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-porcelain/10 pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-porcelain/40">
            © {new Date().getFullYear()} {PRACTICE.name}
          </p>
          <p className="text-xs text-porcelain/40">Demo site — built by Pactwa Web Services</p>
        </div>
      </div>
    </footer>
  )
}
