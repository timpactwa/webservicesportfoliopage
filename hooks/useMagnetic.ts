'use client'

import { useCallback, useEffect, useRef } from 'react'

interface MagneticOptions {
  /** Fraction of cursor offset applied as translation. */
  strength?: number
  /** Max translation in px on each axis. */
  max?: number
}

/**
 * Magnetic pointer effect: translates the element toward the cursor, capped at `max`.
 * No-ops under reduced-motion or coarse pointers (returns inert handlers).
 * Animates `transform` via rAF — never triggers React re-renders.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.3,
  max = 6,
}: MagneticOptions = {}) {
  const ref = useRef<T>(null)
  const frame = useRef<number | null>(null)
  const enabled = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    enabled.current = fine && !reduce
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!enabled.current) return
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const tx = Math.max(-max, Math.min(max, dx * strength))
      const ty = Math.max(-max, Math.min(max, dy * strength))
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate(${tx}px, ${ty}px)`
      })
    },
    [strength, max]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    el.style.transform = 'translate(0px, 0px)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
