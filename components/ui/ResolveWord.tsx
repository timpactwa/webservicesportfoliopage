'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface ResolveWordProps {
  /** Resolved in order. The last entry is the resting word, and the only one the server renders. */
  words: readonly string[]
  /** Seconds each non-final word holds once sharp. Length is words.length - 1. */
  holds?: readonly number[]
  /** Resolve duration per word, in seconds. */
  duration?: number
  /** Unresolved blur, in px. */
  blur?: number
  className?: string
}

/**
 * A word that renders in. Resolves through `words` once when scrolled into view,
 * each entry sharpening from blur, then locks permanently on the last one.
 *
 * The server renders only the resting word, so the SSR HTML carries one finished
 * sentence: Googlebot never indexes an intermediate frame and a no-JS visitor
 * never sees a blank. The earlier words are injected after mount ("arming"),
 * which is also why the first client render matches the server exactly and
 * hydration cannot mismatch.
 */
export default function ResolveWord({
  words,
  holds = [],
  duration = 0.5,
  blur = 8,
  className,
}: ResolveWordProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const last = words.length - 1

  const [armed, setArmed] = useState(false)
  const [index, setIndex] = useState(-1)

  useEffect(() => {
    setArmed(true)
  }, [])

  useEffect(() => {
    if (!armed || !inView || reduce) return
    setIndex(0)
  }, [armed, inView, reduce])

  useEffect(() => {
    if (index < 0 || index >= last) return
    const hold = holds[index] ?? 0.6
    const timer = setTimeout(() => setIndex((i) => i + 1), (duration + hold) * 1000)
    return () => clearTimeout(timer)
  }, [index, last, holds, duration])

  // The reduced-motion guard sits here, at render, not only in the arming effect.
  // Framer's useReducedMotion reports false on the first client render so that
  // hydration matches the server, then flips true in an effect. Guarding only the
  // effect would let a reduced-motion visitor arm on that first pass and then sit
  // on an empty slot forever, because every stacked word starts hidden and the
  // sequence never runs.
  if (reduce || !armed) {
    return (
      <span ref={ref} className={cn('inline-grid', className)}>
        <span className="col-start-1 row-start-1">{words[last]}</span>
      </span>
    )
  }

  return (
    <span ref={ref} className={cn('inline-grid', className)}>
      {/* Absolutely positioned, so it cannot widen the slot. */}
      <span className="sr-only">{words[last]}</span>
      {words.map((word, i) => (
        <motion.span
          key={word}
          aria-hidden="true"
          // Every word occupies the same cell, so the slot is sized by the widest
          // child and swapping words cannot reflow the line.
          className="col-start-1 row-start-1"
          initial={{ opacity: 0, y: 6, filter: `blur(${blur}px)` }}
          animate={
            i === index
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 6, filter: `blur(${blur}px)` }
          }
          transition={{ duration, ease: EASE }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
