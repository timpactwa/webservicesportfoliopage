'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { PROOF_MARKERS } from '@/lib/data'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export default function ProofBar() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="bg-surface border-y border-hairline" aria-label="Verify what we claim">
      <div className="container-studio py-14 md:py-16">
        <motion.p
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
          className="eyebrow mb-8 text-center text-xs text-accent-dark"
        >
          Nothing here you have to take our word for
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y divide-hairline sm:divide-y-0 sm:divide-x">
          {PROOF_MARKERS.map((marker, index) => (
            <motion.div
              key={marker.label}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.08, ease: EASE }}
              className="py-6 sm:py-0 sm:px-8 first:sm:pl-0 last:sm:pr-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-base font-semibold text-graphite">{marker.label}</p>
              </div>
              <p className="text-sm text-graphite-soft leading-relaxed mb-3">{marker.description}</p>
              <Link
                href={marker.href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
              >
                See for yourself
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
