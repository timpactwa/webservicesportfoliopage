'use client'

import { useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'secondary-inverse' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
  'secondary-inverse': 'border-2 border-white text-white hover:bg-white hover:text-charcoal',
  ghost: 'text-accent hover:underline',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const SHIMMER_COLORS = ['#ffffff', '#93c5fd', '#bfdbfe']
const SHIMMER_COUNT = 15
const SHIMMER_DURATION = 350
const PIXEL_FADE = 200 // each pixel fades over this fixed duration after its startDelay

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  className,
  fullWidth,
}: ButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number | null>(null)

  // Cancel any in-flight animation frame on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const baseClass = cn(
    'relative inline-flex items-center justify-center font-bold rounded-none transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  const handleMouseEnter = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const w = parent.offsetWidth
    const h = parent.offsetHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const pixels = Array.from({ length: SHIMMER_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 2 + Math.random() * 4,
      color: SHIMMER_COLORS[Math.floor(Math.random() * SHIMMER_COLORS.length)],
      startDelay: Math.random() * 150,
    }))

    const startTime = performance.now()

    const draw = (timestamp: number) => {
      const elapsed = timestamp - startTime
      ctx.clearRect(0, 0, w, h)

      for (const px of pixels) {
        if (elapsed < px.startDelay) continue
        const localElapsed = elapsed - px.startDelay
        const progress = Math.min(localElapsed / PIXEL_FADE, 1)
        ctx.globalAlpha = Math.max(0, 1 - progress)
        ctx.fillStyle = px.color
        ctx.fillRect(px.x, px.y, px.size, px.size)
      }
      ctx.globalAlpha = 1

      if (elapsed < SHIMMER_DURATION) {
        frameRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, w, h)
        frameRef.current = null
      }
    }

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(draw)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  const canvasEl = (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    />
  )

  if (href) {
    return (
      <Link
        href={href}
        className={baseClass}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {canvasEl}
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {canvasEl}
      {children}
    </button>
  )
}
