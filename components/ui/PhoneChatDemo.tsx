'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import AiChatThread from '@/components/ui/AiChatThread'
import { cn } from '@/lib/utils'

/**
 * Floating phone mockup for the AI Automation hero. Reuses AiChatThread verbatim,
 * gating its loop on scroll-into-view: the conversation must not run while the
 * phone sits off-screen (matters on mobile, where it stacks below the copy).
 */
export default function PhoneChatDemo({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })

  return (
    <div
      ref={ref}
      className={cn('ac-float relative w-[320px] rounded-[44px] bg-graphite p-3', className)}
      // Sanctioned spec value; not a Tailwind token.
      style={{ boxShadow: '0 40px 90px -30px oklch(0.24 0.012 80 / 0.5)' }}
    >
      {/* Component-local keyframes (precedent: InboxDemo/AiChatThread); reduced motion kills the float. */}
      <style>{`
        @keyframes ac-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        .ac-float { animation: ac-float 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ac-float { animation: none; }
        }
      `}</style>

      <div className="flex h-[580px] flex-col overflow-hidden rounded-[34px] bg-bg">
        <div
          className="border-b border-hairline bg-surface text-center"
          style={{ padding: '26px 20px 14px' }}
        >
          <div className="mx-auto flex h-[46px] w-[46px] items-center justify-center rounded-full bg-accent-soft">
            <svg
              className="h-[22px] w-[22px] text-accent-dark"
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
          </div>
          <p className="mt-2.5 font-display text-[15px] font-semibold text-graphite">
            Hartline Builders
          </p>
          <p className="text-xs text-graphite-soft">Auto-reply · powered by Render</p>
        </div>

        <div className="flex-1 overflow-hidden">
          <AiChatThread play={inView} />
        </div>
      </div>
    </div>
  )
}
