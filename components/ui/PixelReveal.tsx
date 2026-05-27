'use client'

import { useRef, useEffect, useCallback } from 'react'

interface PixelRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  pixelSize?: number
}

const PIXEL_COLORS = ['#2563EB', '#3B82F6', '#1D4ED8']
const WHITE_PROBABILITY = 0.08
const SCATTER_DURATION = 300  // ms pixels scatter in
const FADE_DURATION = 200     // ms canvas fades out after scatter

export default function PixelReveal({
  children,
  className,
  delay = 0,
  pixelSize = 8,
}: PixelRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const hasRun = useRef(false)

  const runAnimation = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const w = container.offsetWidth
    const h = container.offsetHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    canvas.style.display = 'block'
    canvas.style.opacity = '1'

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const GAP = 1
    const STEP = pixelSize + GAP

    interface Pixel {
      x: number
      y: number
      delay: number
      color: string
      opacity: number
    }

    const pixels: Pixel[] = []
    for (let x = 0; x < w; x += STEP) {
      for (let y = 0; y < h; y += STEP) {
        pixels.push({
          x,
          y,
          delay: Math.random() * SCATTER_DURATION,
          color:
            Math.random() < WHITE_PROBABILITY
              ? '#ffffff'
              : PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)],
          opacity: 0.4 + Math.random() * 0.6,
        })
      }
    }

    const startTime = performance.now()

    const drawFrame = (elapsed: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const px of pixels) {
        if (elapsed < px.delay) continue
        const localElapsed = elapsed - px.delay
        const localProgress = Math.min(localElapsed / 100, 1)
        ctx.globalAlpha = localProgress * px.opacity
        ctx.fillStyle = px.color
        ctx.fillRect(px.x, px.y, pixelSize, pixelSize)
      }
      ctx.globalAlpha = 1
    }

    const animate = (timestamp: number) => {
      const elapsed = timestamp - startTime

      if (elapsed > SCATTER_DURATION) {
        const fadeProgress = Math.min(
          (elapsed - SCATTER_DURATION) / FADE_DURATION,
          1
        )
        canvas.style.opacity = String(1 - fadeProgress)

        if (fadeProgress >= 1) {
          canvas.style.display = 'none'
          return
        }
      }

      drawFrame(Math.min(elapsed, SCATTER_DURATION))
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
  }, [pixelSize])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true
          if (delay > 0) {
            setTimeout(runAnimation, delay)
          } else {
            runAnimation()
          }
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [delay, runAnimation])

  return (
    <div ref={containerRef} className={`relative${className ? ` ${className}` : ''}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: 'none',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
      {children}
    </div>
  )
}
