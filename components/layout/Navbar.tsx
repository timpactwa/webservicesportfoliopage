'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/data'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { useScrolled } from '@/hooks/useScrolled'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const scrolled = useScrolled(40)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg/80 backdrop-blur-xl shadow-[0_1px_0_var(--hairline)]'
          : 'bg-transparent'
      )}
    >
      <div className="container-studio">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
          )}
        >
          <Link href="/" className="block shrink-0" aria-label="Render home">
            <Logo variant="dark" className="text-xl md:text-2xl" />
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-150',
                  pathname === link.href ? 'text-accent' : 'text-graphite-soft hover:text-graphite'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button variant="primary" size="sm" href="/contact">
              Request a Call
            </Button>
          </div>

          <button
            className="md:hidden p-2 transition-colors text-graphite-soft hover:text-graphite"
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
            className="md:hidden border-t border-hairline bg-bg/95 backdrop-blur-xl"
          >
            <div className="container-studio py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-base font-medium py-1',
                    pathname === link.href ? 'text-accent' : 'text-graphite'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="primary" size="md" href="/contact" onClick={() => setIsOpen(false)} fullWidth>
                Book a Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
