'use client'

import { useTilt } from '@/hooks/useTilt'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  /** Max rotation in degrees per axis. */
  max?: number
}

/**
 * 3D tilt card: rotates toward the cursor via useTilt (no-op under reduced-motion or
 * coarse pointers). Exposes --glow-x/--glow-y for an optional radial-glow child.
 */
export default function TiltCard({ children, className, max = 8 }: TiltCardProps) {
  const tilt = useTilt<HTMLDivElement>({ max, perspective: 700 })

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={cn('[transform-style:preserve-3d] [will-change:transform] transition-transform duration-150 ease-out', className)}
    >
      {children}
    </div>
  )
}
