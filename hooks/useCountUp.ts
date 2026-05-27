import { useRef, useState, useEffect, useCallback } from 'react'

interface UseCountUpOptions {
  to: number
  duration?: number
  delay?: number
  easing?: 'easeOut' | 'linear'
}

export function useCountUp<T extends HTMLElement = HTMLElement>({
  to,
  duration = 1200,
  delay = 0,
  easing = 'easeOut',
}: UseCountUpOptions): { count: number; ref: React.RefObject<T> } {
  const [count, setCount] = useState(0)
  const ref = useRef<T>(null)
  const frameRef = useRef<number>(0)
  const hasRun = useRef(false)

  const runCount = useCallback(() => {
    // Respect reduced-motion preference — snap to final value immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(to)
      return
    }

    const startTime = performance.now() + delay

    const tick = (currentTime: number) => {
      if (currentTime < startTime) {
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress =
        easing === 'easeOut' ? 1 - Math.pow(1 - progress, 3) : progress

      setCount(Math.round(to * easedProgress))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
  }, [to, duration, delay, easing])

  const runCountRef = useRef(runCount)
  useEffect(() => {
    runCountRef.current = runCount
  }, [runCount])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true
          runCountRef.current()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, []) // mount-only — observer doesn't depend on runCount directly

  return { count, ref }
}
