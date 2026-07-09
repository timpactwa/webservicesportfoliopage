'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface LineMaskHeadingProps {
  /** Each entry is a headline line, wiped up in sequence. */
  lines: React.ReactNode[]
  as?: 'h1' | 'h2' | 'p' | 'div'
  className?: string
  /** Per-line class (e.g. color on a specific line). Indexed by line. */
  lineClassName?: (index: number) => string | undefined
}

/**
 * Line-mask headline wipe: each line sits in an overflow-hidden wrapper and slides
 * up from translateY(115%) to 0 over 850ms on scroll-into-view. A hard-edged wipe,
 * not a fade. Reserved for hero and CTA headlines. Snaps in under reduced-motion.
 *
 * The IntersectionObserver watches the (un-translated) heading element rather than
 * the clipped inner spans, so the trigger fires reliably even above the fold.
 */
export default function LineMaskHeading({
  lines,
  as = 'h2',
  className,
  lineClassName,
}: LineMaskHeadingProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const show = reduce || inView
  const Tag = motion[as] as typeof motion.h1

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn('block', lineClassName?.(i))}
            initial={false}
            animate={{ y: show ? '0%' : '115%' }}
            transition={{ duration: reduce ? 0 : 0.85, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
