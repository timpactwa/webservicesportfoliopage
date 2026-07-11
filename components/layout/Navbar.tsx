'use client'

import { useState, useRef, type MouseEvent } from 'react'
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

// Replays the rise-in keyframes on a freshly landed section. Removing then
// re-adding across a forced reflow restarts the animation even mid-run, so a
// repeat click always re-triggers it; animationend then clears the class.
function playRise(container: Element): void {
  container.classList.remove('nav-rise')
  void (container as HTMLElement).offsetWidth
  container.classList.add('nav-rise')
  container.addEventListener('animationend', () => container.classList.remove('nav-rise'), {
    once: true,
  })
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const scrolled = useScrolled(40)
  const activeId = useActiveSection(SECTION_IDS)

  // Homepage nav tabs fade through the background instead of smooth-scrolling
  // the whole page past the visitor. transitioningRef locks out clicks while a
  // fade is in flight; pendingRef carries the resolved target across the fade.
  const transitioningRef = useRef(false)
  const pendingRef = useRef<{ top: number; href: string; container: Element | null } | null>(null)
  const [overlayPhase, setOverlayPhase] = useState<'in' | 'out' | null>(null)

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only homepage tabs get the fade-through; other routes and non-anchor
    // hrefs keep plain Next.js navigation.
    if (pathname !== '/') return
    if (href !== '/' && !href.startsWith('/#')) return

    // Resolve the target before taking over, so a missing section falls back to
    // the browser default rather than swallowing the click.
    let top = 0
    let container: Element | null = null
    if (href !== '/') {
      const el = document.getElementById(href.slice(2))
      if (!el) return
      const rect = el.getBoundingClientRect()
      // Sections carry scroll-mt-24, so subtracting scrollMarginTop lands exactly
      // where a native anchor jump would.
      top = window.scrollY + rect.top - parseFloat(getComputedStyle(el).scrollMarginTop || '0')
      container = el.firstElementChild
    }

    e.preventDefault()
    if (transitioningRef.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top, behavior: 'instant' })
      history.pushState(null, '', href)
      return
    }

    transitioningRef.current = true
    pendingRef.current = { top, href, container }
    setOverlayPhase('in')
  }

  const handleOverlayComplete = () => {
    if (overlayPhase === 'in') {
      const target = pendingRef.current
      if (target) {
        // instant overrides the global smooth-scroll CSS so the jump happens
        // hidden under the opaque overlay.
        window.scrollTo({ top: target.top, behavior: 'instant' })
        history.pushState(null, '', target.href)
        if (target.container) playRise(target.container)
      }
      setOverlayPhase('out')
    } else if (overlayPhase === 'out') {
      setOverlayPhase(null)
      pendingRef.current = null
      transitioningRef.current = false
    }
  }

  return (
    <>
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
                  onClick={(e) => handleNavClick(e, link.href)}
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
                Book a Free Call
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
                    onClick={(e) => {
                      setIsOpen(false)
                      handleNavClick(e, link.href)
                    }}
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

      {/* Fade-through overlay for homepage tab clicks: dips to the background,
          the scroll jump happens underneath, then it rises back. z-[45] sits
          above content and the MobileCtaBar (z-40) but below the header (z-50),
          so the nav stays visible through the transition. */}
      {overlayPhase && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: overlayPhase === 'in' ? 1 : 0 }}
          // CSS `ease` curve, matching the brief's "0.28s ease".
          transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          onAnimationComplete={handleOverlayComplete}
          className="fixed inset-0 z-[45] pointer-events-none"
          style={{ background: 'oklch(var(--bg))' }}
        />
      )}
    </>
  )
}
