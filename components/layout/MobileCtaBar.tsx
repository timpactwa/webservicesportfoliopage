'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Persistent mobile conversion path. Most local-search traffic is mobile, and the
 * only other mobile CTA lives inside the hamburger menu. Hidden on /contact, where
 * the form itself is already the call to action.
 */
export default function MobileCtaBar() {
  const pathname = usePathname()

  if (pathname === '/contact') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-bg/90 backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/contact?intent=mockup"
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
