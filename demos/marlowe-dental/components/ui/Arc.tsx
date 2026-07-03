'use client'
import { motion } from 'framer-motion'

/**
 * The practice's signature smile arc — a single curved stroke that
 * draws itself in. Used under headlines and as a section motif.
 */
export default function Arc({
  className = 'text-sage',
  delay = 0.6,
  width = 180,
}: {
  className?: string
  delay?: number
  width?: number
}) {
  return (
    <motion.svg
      viewBox="0 0 180 28"
      width={width}
      height={(width / 180) * 28}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        d="M4 6c28 18 62 20 86 20s58-2 86-20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.9, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}
