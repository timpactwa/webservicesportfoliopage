'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import AiChatThread from '@/components/ui/AiChatThread'

/**
 * Compact chat preview for the homepage AI card. Reuses AiChatThread verbatim
 * (same conversation as the AI page phone hero and the old modal), gating its loop
 * on scroll-into-view so it never plays off-screen. No phone frame here: a mini
 * messages-app header sits above the thread so it reads as a live auto-reply
 * without dominating the card. once:true per repo convention.
 */
export default function CardChatDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3, once: true })

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-hairline bg-bg">
      <div className="flex items-center gap-2.5 border-b border-hairline bg-surface px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent-dark">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3l2 5-2.5 1.5a11 11 0 005 5L17 12l5 2v3a2 2 0 01-2 2A16 16 0 013 5z"
            />
          </svg>
        </span>
        <span>
          <span className="block font-display text-sm font-semibold leading-tight text-graphite">
            Hartline Builders
          </span>
          <span className="block text-xs text-graphite-soft">Auto-reply · powered by Render</span>
        </span>
      </div>

      {/* Fixed-height viewport: the white chat window never changes size. The thread
          is pinned to the bottom (justify-end), so each new message pushes the earlier
          ones up and off the top, exactly like a real messages screen. */}
      <div className="flex h-[300px] flex-col justify-end overflow-hidden">
        <AiChatThread play={inView} className="p-3.5" />
      </div>
    </div>
  )
}
