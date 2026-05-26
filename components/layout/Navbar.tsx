'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/data'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="container-studio">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-xl font-black text-accent tracking-tight">
            Render
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-150 ${
                  pathname === link.href
                    ? 'text-accent'
                    : 'text-neutral-600 hover:text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button variant="primary" size="sm" href="/contact">
              Book a Call
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-neutral-600 hover:text-charcoal"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-neutral-100 bg-white"
          >
            <div className="container-studio py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold py-1 ${
                    pathname === link.href ? 'text-accent' : 'text-neutral-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="primary" size="sm" href="/contact" onClick={() => setIsOpen(false)}>
                Book a Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
