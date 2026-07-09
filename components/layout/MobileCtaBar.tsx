'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { track } from '@/lib/analytics'

/**
 * Persistent mobile conversion path. Most local-search traffic is mobile, and the
 * only other mobile CTA lives inside the hamburger menu. Hidden on /contact, where
 * the form itself is already the call to action, and hidden on the homepage once
 * the #contact section is substantially in view (its CTAs take over there).
 */
export default function MobileCtaBar() {
  const pathname = usePathname()
  const [contactInView, setContactInView] = useState(false)

  useEffect(() => {
    // Only the homepage carries the #contact section this bar defers to.
    if (pathname !== '/') {
      setContactInView(false)
      return
    }
    const el = document.getElementById('contact')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(entry.intersectionRatio >= 0.2),
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [pathname])

  if (pathname === '/contact') return null
  if (pathname === '/' && contactInView) return null

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
          className="flex-1 rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Request a Call
        </Link>
      </div>
    </div>
  )
}
