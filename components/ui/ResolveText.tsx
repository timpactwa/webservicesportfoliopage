'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface ResolveTextProps {
  /** Each entry is a headline line; words within resolve in scan order. */
  lines: string[]
  as?: 'h1' | 'h2' | 'p' | 'div'
  className?: string
  /** Per-line class (e.g. accent color on one line). Indexed by line. */
  lineClassName?: (index: number) => string | undefined
  /** Seconds before the first word resolves. */
  delay?: number
  /** Seconds between each word landing. */
  stagger?: number
  /** Resolve duration per word, in seconds. */
  duration?: number
  /** Unresolved blur in px. */
  blur?: number
  /** 'mount' plays on load (hero); 'inView' plays on scroll-into-view. */
  trigger?: 'mount' | 'inView'
}

/**
 * Render-in text: each word resolves from blurred/offset to sharp, staggered in
 * scan order (top-left → bottom-right across lines) so copy reads as a render
 * pass finishing rather than a slide. Snaps straight to the resolved state under
 * prefers-reduced-motion.
 */
export default function ResolveText({
  lines,
  as = 'h2',
  className,
  lineClassName,
  delay = 0,
  stagger = 0.1,
  duration = 0.9,
  blur = 6,
  trigger = 'inView',
}: ResolveTextProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const show = reduce || trigger === 'mount' || inView
  const Tag = motion[as] as typeof motion.h1

  // Continuous word index across all lines keeps the stagger in scan order.
  let wordIndex = 0

  return (
    <Tag ref={ref} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className={cn('block', lineClassName?.(li))} aria-hidden="true">
          {line.split(' ').map((word, wi) => {
            const i = wordIndex++
            return (
              <span key={wi} className="inline-block whitespace-pre">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { opacity: 0, y: 6, filter: `blur(${blur}px)` }}
                  animate={
                    show
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 6, filter: `blur(${blur}px)` }
                  }
                  transition={{ duration: reduce ? 0 : duration, ease: EASE, delay: reduce ? 0 : delay + i * stagger }}
                >
                  {word}
                </motion.span>
                {wi < line.split(' ').length - 1 ? ' ' : null}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
