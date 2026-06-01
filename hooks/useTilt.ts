'use client'

import { useCallback, useEffect, useRef } from 'react'

interface TiltOptions {
  /** Max rotation in degrees on each axis. */
  max?: number
  /** Perspective distance in px. */
  perspective?: number
}

/**
 * 3D tilt + glow-tracking pointer effect for cards.
 * Rotates the element toward the cursor and exposes `--glow-x` / `--glow-y` CSS vars
 * (0–100%) so a child overlay can position a radial glow. No-ops under reduced-motion
 * or coarse pointers. Animates `transform` via rAF.
 */
export function useTilt<T extends HTMLElement = HTMLElement>({
  max = 6,
  perspective = 800,
}: TiltOptions = {}) {
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
      const px = (e.clientX - rect.left) / rect.width // 0..1
      const py = (e.clientY - rect.top) / rect.height // 0..1
      const rotateY = (px - 0.5) * 2 * max
      const rotateX = (0.5 - py) * 2 * max
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        el.style.setProperty('--glow-x', `${px * 100}%`)
        el.style.setProperty('--glow-y', `${py * 100}%`)
      })
    },
    [max, perspective]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`
    el.style.removeProperty('--glow-x')
    el.style.removeProperty('--glow-y')
  }, [perspective])

  return { ref, onMouseMove, onMouseLeave }
}
