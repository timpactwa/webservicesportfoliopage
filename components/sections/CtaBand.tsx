'use client'

import { useState } from 'react'
import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import BookingModal from '@/components/ui/BookingModal'
import type { CallIntent } from '@/components/ui/RequestCallForm'
import { CTA_BAND, GUARANTEE } from '@/lib/data'

/**
 * Replaces the old HomeContact section. The form itself now lives in a modal, so
 * converting never costs the visitor their scroll position, and /contact stays a
 * real page for deep links, ads, and no-JS visitors.
 *
 * id="contact" keeps NAV_LINKS' "/#contact" and the page's anchor working.
 * data-cta-takeover is what MobileCtaBar watches to hide itself; it is a named
 * contract rather than a hardcoded id.
 */
export default function CtaBand() {
  const [booking, setBooking] = useState<{ intent: CallIntent | null } | null>(null)

  const openBooking = (intent: CallIntent | null) => (event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setBooking({ intent })
  }

  return (
    <>
      <section
        id="contact"
        data-cta-takeover
        className="scroll-mt-24 border-t border-hairline bg-bg py-24 pb-32 md:py-40 md:pb-40"
      >
        <div className="container-studio">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent-dark">Contact</p>
            <h2 className="text-display-xl text-graphite">{CTA_BAND.headline}</h2>
            <p className="mt-5 text-lg leading-relaxed text-graphite-soft">{CTA_BAND.body}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button variant="primary" size="lg" href="/contact" onClick={openBooking(null)}>
                Book a Free Call
              </Button>
            </div>

            <p className="mt-8 text-sm font-medium text-accent-dark">{GUARANTEE.short}</p>
          </Reveal>
        </div>
      </section>

      <BookingModal
        isOpen={booking !== null}
        onClose={() => setBooking(null)}
        intent={booking?.intent ?? null}
      />
    </>
  )
}
