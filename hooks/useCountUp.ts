import { useRef, useState, useEffect, useCallback } from 'react'

interface UseCountUpOptions {
  to: number
  duration?: number
  delay?: number
  easing?: 'easeOut' | 'linear'
}

interface UseCountUpResult {
  count: number
  ref: React.RefObject<HTMLElement>
}

export function useCountUp({
  to,
  duration = 1200,
  delay = 0,
  easing = 'easeOut',
}: UseCountUpOptions): UseCountUpResult {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const frameRef = useRef<number>(0)
  const hasRun = useRef(false)

  const runCount = useCallback(() => {
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

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true
          runCount()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [runCount])

  return { count, ref }
}
