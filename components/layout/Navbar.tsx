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
import { useActiveSection } from '@/hooks/useActiveSection'

// Homepage section ids in document order (mirrors app/page.tsx). Module-level so
// the reference stays stable across renders and the observer isn't rebuilt.
// useActiveSection resolves ties by taking the last intersecting id in this array,
// so it has to track the real order or the active underline lands on the wrong tab.
const SECTION_IDS = ['work', 'why', 'pricing', 'faq', 'services', 'contact']

/**
 * Whether a nav link should read as active. Anchor links only light up on the
 * homepage while their section is in view; Home lights up above the first
 * section (activeId === null). Nothing is active on other routes.
 */
function isLinkActive(href: string, pathname: string, activeId: string | null): boolean {
  if (pathname !== '/') return false
  if (href === '/') return activeId === null
  if (href.startsWith('/#')) return activeId === href.slice(2)
  return false
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const scrolled = useScrolled(40)
  const activeId = useActiveSection(SECTION_IDS)

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
                  isLinkActive(link.href, pathname, activeId)
                    ? 'text-accent-dark'
                    : 'text-graphite-soft hover:text-graphite'
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
                    isLinkActive(link.href, pathname, activeId) ? 'text-accent-dark' : 'text-graphite'
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
