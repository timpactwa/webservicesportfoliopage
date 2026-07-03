'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, COMPANY } from '@/lib/data'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper border-b-2 border-hivis">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-display text-2xl uppercase tracking-wide font-bold">
            Hartline
          </span>
          <span className="font-mono text-[10px] text-hivisBright tracking-widest uppercase">
            Builders
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-display uppercase tracking-wider text-sm font-semibold transition-colors ${
                pathname === l.href ? 'text-hivisBright' : 'text-paper/75 hover:text-paper'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={COMPANY.phoneHref}
            className="font-mono text-xs text-paper/60 hover:text-paper transition-colors"
          >
            {COMPANY.phone}
          </a>
        </nav>

        <Link
          href="/book"
          className="hidden md:inline-flex items-center gap-2 bg-hivis text-ink font-display uppercase tracking-wider font-bold text-sm px-5 py-2.5 hover:bg-hivisBright transition-colors cursor-pointer"
        >
          Book an Estimate
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
          </svg>
        </Link>

        <button
          className="md:hidden text-paper p-2 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ink border-t border-paper/10 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display uppercase tracking-wider font-semibold text-paper/80 hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="inline-flex w-fit items-center bg-hivis text-ink font-display uppercase tracking-wider font-bold text-sm px-5 py-2.5"
          >
            Book an Estimate
          </Link>
          <a href={COMPANY.phoneHref} className="font-mono text-xs text-paper/60">
            {COMPANY.phone}
          </a>
        </div>
      )}
    </header>
  )
}
