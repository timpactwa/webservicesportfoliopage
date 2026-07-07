'use client'

import { useEffect, useRef } from 'react'

const PIXEL_SIZE = 16
const GAP = 2
const STEP = PIXEL_SIZE + GAP
const COLORS = ['#2563EB', '#3B82F6', '#1D4ED8']
const SCATTER_DURATION = 1500
const AMBIENT_OPACITY = 0.1 // faint persistent grid after scatter-in
const REACT_RADIUS = 120 // px around the cursor that brighten
const REACT_BOOST = 0.65 // extra opacity at the cursor center

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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const interactive = !reduceMotion && finePointer

    let animationId: number
    let pixels: Pixel[] = []
    let startTime: number | null = null
    let dirty = true
    const mouse = { x: -9999, y: -9999, active: false }

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

    // Phase 1: scatter-in (0..SCATTER_DURATION), same feel as before.
    function drawScatter(elapsed: number) {
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

    // Phase 2: faint ambient grid that brightens near the cursor.
    function drawAmbient() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      for (const px of pixels) {
        const cx = px.col * STEP
        const cy = px.row * STEP
        let alpha = AMBIENT_OPACITY
        if (mouse.active) {
          const dx = cx + PIXEL_SIZE / 2 - mouse.x
          const dy = cy + PIXEL_SIZE / 2 - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REACT_RADIUS) {
            alpha += REACT_BOOST * (1 - dist / REACT_RADIUS)
          }
        }
        ctx!.globalAlpha = Math.min(alpha, 1)
        ctx!.fillStyle = px.color
        ctx!.fillRect(cx, cy, PIXEL_SIZE, PIXEL_SIZE)
      }
      ctx!.globalAlpha = 1
    }

    function animate(timestamp: number) {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      if (elapsed < SCATTER_DURATION) {
        drawScatter(elapsed)
        animationId = requestAnimationFrame(animate)
        return
      }
      if (interactive) {
        if (dirty) {
          drawAmbient()
          dirty = false
        }
        animationId = requestAnimationFrame(animate)
      } else {
        // Non-interactive: fade the whole canvas out, matching the original behavior.
        canvas!.style.transition = 'opacity 500ms ease-out'
        canvas!.style.opacity = '0'
      }
    }

    function handleResize() {
      sizeCanvas()
      buildGrid()
      dirty = true
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
      dirty = true
    }

    function handlePointerLeave() {
      mouse.active = false
      dirty = true
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationId)
      } else {
        dirty = true
        animationId = requestAnimationFrame(animate)
      }
    }

    sizeCanvas()
    buildGrid()
    animationId = requestAnimationFrame(animate)

    window.addEventListener('resize', handleResize)
    if (interactive) {
      const parent = canvas.parentElement
      parent?.addEventListener('pointermove', handlePointerMove)
      parent?.addEventListener('pointerleave', handlePointerLeave)
      document.addEventListener('visibilitychange', handleVisibilityChange)
      return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('resize', handleResize)
        parent?.removeEventListener('pointermove', handlePointerMove)
        parent?.removeEventListener('pointerleave', handlePointerLeave)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 1 }} />
}
