'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'

/**
 * Persistent mobile conversion path. Most local-search traffic is mobile, and the
 * only other mobile CTA lives inside the hamburger menu. Hidden on /contact, where
 * the form itself is already the call to action, and hidden over any section that
 * declares [data-cta-takeover], whose own CTAs take over there.
 *
 * The old lookup was getElementById('contact'), which coupled this bar to a
 * section id that has since been deleted. Any page may now opt in.
 */
export default function MobileCtaBar() {
  const pathname = usePathname()
  const [contactInView, setContactInView] = useState(false)

  useEffect(() => {
    setContactInView(false)
    const el = document.querySelector('[data-cta-takeover]')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(entry.intersectionRatio >= 0.2),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [pathname])

  if (pathname === '/contact') return null
  if (contactInView) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bg/90 backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/contact?intent=mockup"
          onClick={() => track('mockup_request', { source: 'mobile-bar' })}
          className="flex-1 rounded-full border-[1.5px] border-graphite px-4 py-3 text-center text-sm font-semibold text-graphite transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Free Mockup
        </Link>
        <Link
          href="/contact"
          // accent-dark at rest, accent on hover. Matches Button's primary variant.
          // White on accent (#009891) is 3.57:1, under the 4.5:1 WCAG AA floor for
          // 14px text; accent-dark (#006F6A) is 6.06:1. These two were inverted.
          className="flex-1 rounded-full bg-accent-dark px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Request a Call
        </Link>
      </div>
    </div>
  )
}
