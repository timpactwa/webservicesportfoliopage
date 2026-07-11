'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

// Icon paths are spec values; svg inherits disc color via currentColor.
const STEPS = [
  {
    // Phone icon, shared with the Task 4 hero header.
    icon: 'M3 5a2 2 0 012-2h3l2 5-2.5 1.5a11 11 0 005 5L17 12l5 2v3a2 2 0 01-2 2A16 16 0 013 5z',
    title: 'Someone reaches out',
    body: "A call you can't grab, a form at 9 PM, a question about hours.",
  },
  {
    icon: 'M12 3l1.9 4.3L18 9l-4.1 1.7L12 15l-1.9-4.3L6 9l4.1-1.7z',
    title: 'Render answers instantly',
    body: 'A friendly, on-brand reply goes out in seconds and asks the right questions.',
  },
  {
    icon: 'M5 13l4 4L19 7',
    title: 'You get a clean lead',
    body: 'The need, urgency, and a callback time land in your inbox, sorted and ready.',
  },
]

// Light disc i at 400 + i*700 ms after the row enters view; the discs then hold lit
// and the sequence replays every 18000 ms, so the motion is a slow, occasional
// accent rather than a constant blink.
const FIRST_LIGHT_MS = 400
const STEP_STAGGER_MS = 700
const LOOP_MS = 18000

/**
 * Three-step "how it works" row. Discs light in sequence once the row scrolls into
 * view, then loop. once:true per repo convention: the sequence starts once and keeps
 * looping; it does not restart on scroll out and back.
 *
 * Timer hygiene follows AiChatThread: every timeout lives in a ref, cleared on unmount,
 * on restart, and whenever the reduced-motion preference flips. No timers are scheduled
 * until the row is in view, so an unscrolled row never leaks an interval.
 */
export default function AutomationFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3, once: true })
  const [lit, setLit] = useState<Set<number>>(new Set())
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
      // Previous cycle's timers have all fired once the loop re-enters; drop
      // their ids so the array stays bounded while the section stays mounted.
      timers.current = []
      setLit(new Set())
      STEPS.forEach((_, i) => {
        later(() => setLit((prev) => new Set(prev).add(i)), FIRST_LIGHT_MS + i * STEP_STAGGER_MS)
      })
      later(runCycle, LOOP_MS)
    }

    const start = () => {
      clearAll()
      if (media.matches) {
        // Reduced motion: all discs lit at rest, no sequencing.
        setLit(new Set(STEPS.map((_, i) => i)))
      } else if (inView) {
        runCycle()
      } else {
        setLit(new Set())
      }
    }

    start()
    media.addEventListener('change', start)

    return () => {
      media.removeEventListener('change', start)
      clearAll()
    }
  }, [inView])

  return (
    <div ref={ref} className="relative grid grid-cols-1 gap-5 md:grid-cols-3">
      {/* Connector runs through the disc centers: top-[60px] = 32px card padding + half the 56px disc. */}
      <div
        aria-hidden="true"
        className="absolute left-[18%] right-[18%] top-[60px] z-0 hidden h-[2px] md:block"
        style={{
          background: 'repeating-linear-gradient(90deg, var(--hairline) 0 6px, transparent 6px 12px)',
        }}
      />

      {STEPS.map((step, i) => {
        const isLit = lit.has(i)
        return (
          <Reveal key={step.title} index={i} className="relative z-[1]">
            <div className="rounded-card border border-hairline bg-bg p-8 text-center">
              <div
                className={cn(
                  'mx-auto mb-5 flex h-[56px] w-[56px] items-center justify-center rounded-full border-2 transition-all duration-500 ease-in-out',
                  isLit
                    ? 'scale-[1.08] border-accent-dark bg-accent-dark text-white'
                    : 'border-hairline bg-bg text-accent-dark'
                )}
                // Sanctioned spec value; not a Tailwind token.
                style={
                  isLit ? { boxShadow: '0 10px 24px -8px oklch(0.6 0.13 190 / 0.6)' } : undefined
                }
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-graphite">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-graphite-soft">{step.body}</p>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
