import Link from 'next/link'
import { NAV_LINKS, COMPANY } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden">
      {/* blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-grid bg-grid pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-display uppercase font-bold text-2xl tracking-wide mb-1">
              Hartline <span className="text-hivisBright">Builders</span>
            </p>
            <p className="font-mono text-xs text-paper/50 mb-4">{COMPANY.tagline}</p>
            <p className="text-sm text-paper/70 leading-relaxed max-w-xs">
              General contracting for Morris County homes. Our own crew, fixed
              estimates, and a two-year warranty on everything we build.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50 mb-4">Pages</p>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-paper/80 hover:text-hivisBright transition-colors">
                  Home
                </Link>
              </li>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-paper/80 hover:text-hivisBright transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-paper/50 mb-4">Office</p>
            <ul className="space-y-3 text-sm text-paper/80">
              <li>{COMPANY.address}</li>
              <li>
                <a href={COMPANY.phoneHref} className="hover:text-hivisBright transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-hivisBright transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li className="text-paper/50">{COMPANY.hours}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-paper/10 pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-paper/40">
            © {new Date().getFullYear()} {COMPANY.name} · {COMPANY.license}
          </p>
          <p className="font-mono text-[11px] text-paper/40">
            Demo site built by Pactwa Web Services
          </p>
        </div>
      </div>
    </footer>
  )
}
