'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import PixelCanvas from '@/components/sections/PixelCanvas'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

export default function Hero() {
  const reduceMotion = useReducedMotion()

  // Reduced-motion users get the content immediately (no opacity:0 hold, no delay).
  // Everyone else gets a quick stagger that starts almost immediately: the headline
  // is the LCP element, so it must not wait for the PixelCanvas intro to finish.
  const reveal = (delay: number, y = 30, duration = 0.7) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: EASE },
        }

  return (
    <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
      <PixelCanvas />

      <div
        className="absolute inset-y-0 right-0 w-2/3 pointer-events-none hidden lg:block"
        style={{ background: 'radial-gradient(ellipse at 72% 50%, rgba(37,99,235,0.09) 0%, transparent 62%)' }}
      />

      <div className="container-studio relative z-10 py-24 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">

          {/* Text column */}
          <div className="flex-1 min-w-0">
            <motion.div {...reveal(0.15, 18, 0.6)} className="mb-8">
              <Logo variant="icon" priority className="h-14 w-14" />
            </motion.div>

            <motion.h1
              {...reveal(0.25)}
              className="text-display-lg md:text-display-2xl font-black text-white mb-6"
            >
              We Build the Web
              <br />
              <span className="text-accent">for Local Business.</span>
            </motion.h1>

            <motion.p
              {...reveal(0.38)}
              className="text-lg md:text-xl text-neutral-400 max-w-lg mb-10 leading-relaxed"
            >
              Render is a founder-led studio building fast, modern websites and practical AI tools
              for Morris County, NJ businesses at honest, transparent prices.
            </motion.p>

            <motion.div
              {...reveal(0.5)}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Button variant="primary" size="lg" href="/contact">
                Book a Call
              </Button>
              <Button variant="secondary-inverse" size="lg" href="/services">
                View Services
              </Button>
            </motion.div>

            <motion.p
              {...reveal(0.62)}
              className="text-sm text-accent font-semibold"
            >
              Currently booking founding clients. Fixed pricing from $500, limited spots available.
            </motion.p>
          </div>

          {/* Sigil column */}
          <motion.div
            {...(reduceMotion
              ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
              : {
                  initial: { opacity: 0, x: 48 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 1.4, delay: 0.45, ease: EASE },
                })}
            className="hidden lg:flex items-center justify-center flex-shrink-0"
          >
            <svg
              width="440"
              height="300"
              viewBox="0 0 440 300"
              fill="none"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bracketGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
                </linearGradient>
                <filter id="bracketGlow" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#bracketGlow)">
                {/* < */}
                <path
                  d="M105 40 L20 150 L105 260"
                  stroke="url(#bracketGrad)"
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* / */}
                <path
                  d="M190 260 L255 40"
                  stroke="url(#bracketGrad)"
                  strokeWidth="30"
                  strokeLinecap="round"
                />
                {/* > */}
                <path
                  d="M335 40 L420 150 L335 260"
                  stroke="url(#bracketGrad)"
                  strokeWidth="30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
