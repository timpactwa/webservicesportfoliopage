'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'variants'> {
  /** Stagger index — each sibling delays ~90ms more than the last. */
  index?: number
  /** Extra delay in seconds, added on top of the index stagger. */
  delay?: number
  /** Vertical travel in px. */
  y?: number
  as?: 'div' | 'section' | 'li' | 'span'
}

/**
 * Generic scroll fade-up: opacity 0→1 + translateY, 0.8s, staggered by `index`.
 * The site-wide reveal for cards, paragraphs, and stat blocks. Snaps to final
 * state under prefers-reduced-motion.
 */
export default function Reveal({
  index = 0,
  delay = 0,
  y = 20,
  as = 'div',
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduce) {
    return <MotionTag {...rest}>{children}</MotionTag>
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.09 + delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
