'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, PRACTICE } from '@/lib/data'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-porcelain/90 backdrop-blur border-b border-petrol/10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[72px]">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl text-petrol">Marlowe</span>
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-stone mt-0.5">
            Dental Studio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold transition-colors ${
                pathname === l.href ? 'text-sage' : 'text-petrol/70 hover:text-petrol'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <a
            href={PRACTICE.phoneHref}
            className="text-sm font-semibold text-petrol/70 hover:text-petrol transition-colors"
          >
            {PRACTICE.phone}
          </a>
          <Link
            href="/new-patients"
            className="bg-petrol text-porcelain text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-petrolDeep transition-colors cursor-pointer"
          >
            Request a Visit
          </Link>
        </div>

        <button
          className="md:hidden text-petrol p-2 cursor-pointer"
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
        <div className="md:hidden bg-porcelain border-t border-petrol/10 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-semibold text-petrol/80 hover:text-petrol"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/new-patients"
            onClick={() => setOpen(false)}
            className="inline-flex w-fit bg-petrol text-porcelain text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Request a Visit
          </Link>
          <a href={PRACTICE.phoneHref} className="text-sm font-semibold text-petrol/70">
            {PRACTICE.phone}
          </a>
        </div>
      )}
    </header>
  )
}
