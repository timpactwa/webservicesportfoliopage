'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Scan line sweeps left to right */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-[3px] bg-accent pointer-events-none"
        style={{ zIndex: 15 }}
        initial={{ left: '-3px' }}
        animate={isInView ? { left: '105%' } : { left: '-3px' }}
        transition={{ left: { duration: 0.5, delay, ease: 'easeInOut' } }}
      />
      {/* Heading fades in as scan line passes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.15 }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  )
}
