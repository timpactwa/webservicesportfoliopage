'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { track } from '@/lib/analytics'

const DISMISS_KEY = 'render-mockup-dismissed'

/**
 * Soft-touch slide-in for engaged visitors: appears once at ~60% scroll depth
 * on /services* and /work, offering the free homepage mockup. Never a modal,
 * one click to dismiss, and the dismissal sticks across visits (localStorage).
 * Desktop only: on mobile the sticky bottom bar already offers the mockup.
 */
export default function MockupSlideIn() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)

  const eligible = pathname === '/work' || pathname.startsWith('/services')

  useEffect(() => {
    setVisible(false)
    if (!eligible) return

    try {
      if (window.localStorage.getItem(DISMISS_KEY)) return
    } catch {
      // Storage unavailable (private mode etc.): fail toward not showing it.
      return
    }

    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      if (window.scrollY / scrollable >= 0.6) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [eligible, pathname])

  const dismiss = () => {
    setVisible(false)
    try {
      window.localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // Nothing to do: it just may appear again next visit.
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="complementary"
          aria-label="Free homepage mockup offer"
          className="fixed bottom-6 right-6 z-40 hidden w-80 rounded-card border border-hairline bg-bg p-5 shadow-card-hover md:block"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute right-3 top-3 rounded-full p-1 text-graphite-soft transition-colors hover:text-graphite focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <p className="eyebrow mb-2 text-[10px] text-accent-dark">Free, no call required</p>
          <p className="mb-1 text-base font-semibold text-graphite">
            Want to see your business, rendered?
          </p>
          <p className="mb-4 text-sm leading-relaxed text-graphite-soft">
            We&apos;ll build a free homepage mockup of your actual business and email it to you.
          </p>
          <Link
            href="/contact?intent=mockup"
            onClick={() => track('mockup_request', { source: 'slide-in' })}
            className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Get My Free Mockup
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
