'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import AiChatThread from './AiChatThread'
import { useDialog } from './useDialog'
import { cn } from '@/lib/utils'

interface AiDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

// The lead a missed-call reply would capture. One illustrative scenario, not a
// recording of a real customer and free of invented metrics. Ported verbatim from
// the retired UseCaseDemo; the per-case version lives on /services/ai-automation.
const CAPTURED_FIELDS: { label: string; value: string }[] = [
  { label: 'Service', value: 'Roof repair' },
  { label: 'Urgency', value: 'ASAP' },
  { label: 'Callback', value: 'Tomorrow, 7 AM' },
]

/**
 * Modal that plays the AI missed-call conversation next to the fields it captured.
 * Plumbing mirrors BookingModal exactly (useDialog focus trap / Escape / scroll
 * lock, AnimatePresence, click-to-close backdrop). Content only mounts while open,
 * so AiChatThread starts a fresh playthrough on every open.
 */
export default function AiDemoModal({ isOpen, onClose }: AiDemoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useDialog({ isOpen, onClose, initialFocusRef: closeButtonRef })

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-graphite/70 p-4 backdrop-blur-sm md:p-8"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-demo-modal-title"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mx-auto my-auto w-full max-w-3xl rounded-card border border-hairline bg-bg p-6 shadow-card-hover md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow mb-3 text-xs text-accent-dark">AI in practice</p>
                <h2 id="ai-demo-modal-title" className="text-display-md text-graphite">
                  A missed call, answered anyway
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

            <div className="grid gap-4 md:grid-cols-2">
              {/* LEFT: the conversation, plays fresh on every open. */}
              <div className="overflow-hidden rounded-2xl bg-surface">
                <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3">
                  <span className="font-display text-sm font-semibold text-graphite">
                    Hartline Builders
                  </span>
                  <span className="text-[12px] text-graphite-soft">Auto-reply · powered by Render</span>
                </div>
                <AiChatThread />
              </div>

              {/* RIGHT: what the reply captured. */}
              <div className="rounded-2xl bg-surface p-5">
                <p className="eyebrow text-[10px] text-accent-dark">What it captured</p>
                <dl className="mt-2">
                  {CAPTURED_FIELDS.map((field, i) => (
                    <div
                      key={field.label}
                      className={cn(
                        'flex items-center justify-between py-1.5 text-[13px]',
                        i < CAPTURED_FIELDS.length - 1 && 'border-b border-hairline'
                      )}
                    >
                      <dt className="text-graphite-soft">{field.label}</dt>
                      <dd className="font-semibold text-graphite">{field.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-graphite-soft">
              Illustrative example, not a recording of a real customer.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
