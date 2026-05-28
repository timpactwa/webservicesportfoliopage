'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

interface ScanlineHeadingProps {
  children: React.ReactNode
  as?: HeadingTag
  className?: string
  delay?: number  // seconds before animation starts
}

export default function ScanlineHeading({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
}: ScanlineHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px 0px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={ref} className="relative overflow-hidden pb-2">
      {/* Scan line sweeps left to right — skipped for reduced-motion users */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-[3px] bg-accent pointer-events-none"
          style={{ zIndex: 15 }}
          initial={{ left: '-3px' }}
          animate={isInView ? { left: '105%' } : { left: '-3px' }}
          transition={{ left: { duration: 0.5, delay, ease: 'easeInOut' } }}
        />
      )}
      {/* Heading fades in as scan line passes */}
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : (isInView ? { opacity: 1 } : { opacity: 0 })}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: delay + 0.15 }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  )
}
