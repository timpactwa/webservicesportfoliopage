'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import PixelCanvas from '@/components/sections/PixelCanvas'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
      <PixelCanvas />

      {/* Atmospheric glow behind the sigil */}
      <div
        className="absolute inset-y-0 right-0 w-2/3 pointer-events-none hidden lg:block"
        style={{ background: 'radial-gradient(ellipse at 75% 50%, rgba(37,99,235,0.09) 0%, transparent 65%)' }}
      />

      <div className="absolute right-32 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <svg
            width="440"
            height="300"
            viewBox="0 0 440 300"
            fill="none"
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

      <div className="container-studio relative z-10 py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <Logo
              variant="icon"
              priority
              className="h-14 w-14"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-display-lg md:text-display-2xl font-black text-white mb-6"
          >
            We Build the Web
            <br />
            <span className="text-accent">for Local Business.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl text-neutral-400 max-w-xl mb-10 leading-relaxed"
          >
            Render is a founder-led web design and AI consulting agency serving Morris County, NJ.
            Modern sites and practical AI tools at honest prices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.85, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-sm text-accent font-semibold"
          >
            Currently booking founding clients — limited spots available.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
