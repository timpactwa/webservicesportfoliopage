'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type ThreadState = {
  systemChip: boolean
  bizBubble1: boolean
  typing: boolean
  custBubble1: boolean
  bizBubble2: boolean
  custBubble2: boolean
  savedChip: boolean
}

// Resting state: the whole exchange resolved, typing indicator hidden. This is the
// server render, the first client render, the reduced-motion state, and the
// play=false state, so no-JS visitors and SEO always see a complete conversation.
const REST: ThreadState = {
  systemChip: true,
  bizBubble1: true,
  typing: false,
  custBubble1: true,
  bizBubble2: true,
  custBubble2: true,
  savedChip: true,
}

// Every reveal starts from nothing so the loop resets cleanly each cycle.
const EMPTY: ThreadState = {
  systemChip: false,
  bizBubble1: false,
  typing: false,
  custBubble1: false,
  bizBubble2: false,
  custBubble2: false,
  savedChip: false,
}

// One cycle is 8000ms; every reveal time below is measured from cycle start.
const LOOP_MS = 8000

/**
 * Self-playing iMessage-style conversation. Standalone by design: the homepage AI
 * demo modal always plays it, and Task 4's phone hero reuses it verbatim with
 * `play` gated on scroll-into-view, so it assumes nothing about living in a modal.
 *
 * Timer hygiene follows InboxDemo: every timeout lives in a ref and is cleared on
 * unmount, on every restart, and whenever `play` or the reduced-motion preference
 * flips. Because the effect depends on `play`, flipping it false -> true after
 * mount tears down and restarts the loop from the top.
 */
export default function AiChatThread({
  play = true,
  className,
}: {
  play?: boolean
  className?: string
}) {
  const [state, setState] = useState<ThreadState>(REST)
  // Gates the ac-pop entrance so the rest state shows bubbles already settled
  // (opacity 1) instead of popping in on mount; only the live sequence animates.
  const [playing, setPlaying] = useState(false)
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    const clearAll = () => {
      timers.current.forEach((id) => clearTimeout(id))
      timers.current = []
    }

    const later = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms))
    }

    const runCycle = () => {
      // Every timer from the previous cycle has fired by the time the loop
      // re-enters; drop their ids so the array stays bounded while the thread
      // is mounted long-term (the phone hero plays for the life of the page).
      timers.current = []
      setPlaying(true)
      setState(EMPTY)
      later(() => setState((s) => ({ ...s, systemChip: true })), 300)
      later(() => setState((s) => ({ ...s, bizBubble1: true })), 900)
      later(() => setState((s) => ({ ...s, typing: true })), 1700)
      later(() => setState((s) => ({ ...s, typing: false })), 2600)
      later(() => setState((s) => ({ ...s, custBubble1: true })), 2700)
      later(() => setState((s) => ({ ...s, bizBubble2: true })), 3600)
      later(() => setState((s) => ({ ...s, custBubble2: true })), 4400)
      later(() => setState((s) => ({ ...s, savedChip: true })), 5200)
      later(runCycle, LOOP_MS)
    }

    const start = () => {
      clearAll()
      if (!play || media.matches) {
        setPlaying(false)
        setState(REST)
      } else {
        runCycle()
      }
    }

    start()
    media.addEventListener('change', start)

    return () => {
      media.removeEventListener('change', start)
      clearAll()
    }
  }, [play])

  const pop = playing ? 'ac-pop' : ''

  return (
    <div className={cn('flex flex-col gap-2.5 p-4', className)}>
      {/* Component-local keyframes (precedent: InboxDemo); reduced motion kills them. */}
      <style>{`
        @keyframes ac-pop { 0% { opacity: 0; transform: translateY(10px) scale(0.96); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes ac-dot { 0%, 60%, 100% { opacity: 0.25; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }
        .ac-pop { animation: ac-pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .ac-dot { animation: ac-dot 1.2s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ac-pop, .ac-dot { animation: none; }
        }
      `}</style>

      {state.systemChip && (
        <span
          className={cn(
            'self-center rounded-full bg-surface px-[12px] py-[5px] text-[11px] text-graphite-soft',
            pop
          )}
        >
          Missed call · 4:12 PM
        </span>
      )}

      {state.bizBubble1 && (
        <div
          className={cn(
            'max-w-[80%] self-start rounded-[16px_16px_16px_5px] bg-surface px-[14px] py-[10px] text-[14px] leading-[1.4] text-graphite',
            pop
          )}
        >
          Hi! Sorry we missed you. This is Hartline Builders. What can we help with?
        </div>
      )}

      {state.typing && (
        <div
          aria-hidden="true"
          className={cn(
            'flex gap-1 self-end rounded-[16px_16px_5px_16px] bg-accent-dark px-4 py-3',
            pop
          )}
        >
          <span className="ac-dot h-1.5 w-1.5 rounded-full bg-white" />
          <span className="ac-dot h-1.5 w-1.5 rounded-full bg-white" style={{ animationDelay: '0.2s' }} />
          <span className="ac-dot h-1.5 w-1.5 rounded-full bg-white" style={{ animationDelay: '0.4s' }} />
        </div>
      )}

      {state.custBubble1 && (
        <div
          className={cn(
            'max-w-[80%] self-end rounded-[16px_16px_5px_16px] bg-accent-dark px-[14px] py-[10px] text-[14px] leading-[1.4] text-white',
            pop
          )}
        >
          Need a roof leak looked at, pretty urgent
        </div>
      )}

      {state.bizBubble2 && (
        <div
          className={cn(
            'max-w-[80%] self-start rounded-[16px_16px_16px_5px] bg-surface px-[14px] py-[10px] text-[14px] leading-[1.4] text-graphite',
            pop
          )}
        >
          Got it. We can come by tomorrow at 7 AM. Does that work?
        </div>
      )}

      {state.custBubble2 && (
        <div
          className={cn(
            'max-w-[80%] self-end rounded-[16px_16px_5px_16px] bg-accent-dark px-[14px] py-[10px] text-[14px] leading-[1.4] text-white',
            pop
          )}
        >
          Perfect, thank you!
        </div>
      )}

      {state.savedChip && (
        <span
          className={cn(
            'inline-flex items-center gap-1.5 self-center text-[11px] font-semibold text-accent-dark',
            pop
          )}
        >
          <svg
            className="h-[13px] w-[13px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Lead saved to your inbox
        </span>
      )}
    </div>
  )
}
