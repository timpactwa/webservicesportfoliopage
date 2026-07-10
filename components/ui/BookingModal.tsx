'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import RequestCallForm, { type CallIntent } from './RequestCallForm'
import { useDialog } from './useDialog'
import { CALL_STEPS, GUARANTEE } from '@/lib/data'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  tier?: string | null
  intent?: CallIntent | null
}

/**
 * The homepage's booking surface. Every homepage CTA opens this rather than
 * navigating, so converting never costs the visitor their scroll position.
 * /contact renders the same form standalone for deep links and no-JS visitors.
 *
 * z-50, above MobileCtaBar's z-40, so the overlay covers the bar and the focus
 * trap already excludes it.
 */
export default function BookingModal({ isOpen, onClose, tier = null, intent = null }: BookingModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useDialog({ isOpen, onClose, initialFocusRef: closeButtonRef })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-graphite/70 p-4 backdrop-blur-sm md:p-8"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mx-auto my-auto w-full max-w-4xl rounded-card border border-hairline bg-bg p-6 shadow-card-hover md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow mb-3 text-xs text-accent-dark">Request a call</p>
                <h2 id="booking-modal-title" className="text-display-md text-graphite">
                  Tell us what you need.
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-graphite-soft transition-colors hover:bg-surface hover:text-graphite focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
              <div>
                <h3 className="eyebrow mb-5 text-xs text-accent-dark">How this works</h3>
                <ol className="space-y-4">
                  {CALL_STEPS.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                        {index + 1}
                      </span>
                      <p className="pt-0.5 leading-relaxed text-graphite-soft">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 text-sm font-medium text-accent-dark">{GUARANTEE.short}</p>
              </div>

              <RequestCallForm tier={tier} intent={intent} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
