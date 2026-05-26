'use client'

import { useEffect, useRef } from 'react'

const PIXEL_SIZE = 16
const GAP = 2
const STEP = PIXEL_SIZE + GAP
const COLORS = ['#2563EB', '#3B82F6', '#1D4ED8']
const SCATTER_DURATION = 1500
const FADE_DURATION = 500

interface Pixel {
  col: number
  row: number
  color: string
  opacity: number
  delay: number
}

export default function PixelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let pixels: Pixel[] = []
    let startTime: number | null = null

    function sizeCanvas() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }

    function buildGrid() {
      const cols = Math.ceil(canvas!.width / STEP)
      const rows = Math.ceil(canvas!.height / STEP)
      pixels = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const isWhite = Math.random() < 0.08
          pixels.push({
            col,
            row,
            color: isWhite ? '#FFFFFF' : COLORS[Math.floor(Math.random() * COLORS.length)],
            opacity: 0.5 + Math.random() * 0.5,
            delay: Math.random() * SCATTER_DURATION,
          })
        }
      }
    }

    function drawFrame(elapsed: number) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (const px of pixels) {
        if (elapsed >= px.delay) {
          ctx!.globalAlpha = px.opacity
          ctx!.fillStyle = px.color
          ctx!.fillRect(px.col * STEP, px.row * STEP, PIXEL_SIZE, PIXEL_SIZE)
        }
      }
      ctx!.globalAlpha = 1
    }

    function animate(timestamp: number) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      drawFrame(elapsed)
      if (elapsed < SCATTER_DURATION) {
        animationId = requestAnimationFrame(animate)
      }
    }

    function handleResize() {
      sizeCanvas()
      buildGrid()
      const elapsed = startTime ? performance.now() - startTime : SCATTER_DURATION
      drawFrame(elapsed)
    }

    sizeCanvas()
    buildGrid()
    animationId = requestAnimationFrame(animate)

    const fadeTimer = setTimeout(() => {
      if (canvas) {
        canvas.style.transition = `opacity ${FADE_DURATION}ms ease-out`
        canvas.style.opacity = '0'
      }
    }, SCATTER_DURATION)

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(fadeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  )
}
