'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import PixelCanvas from '@/components/sections/PixelCanvas'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
      <PixelCanvas />

      <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <svg
            width="480"
            height="420"
            viewBox="0 0 480 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* < */}
            <path
              d="M120 60 L30 210 L120 360"
              stroke="white"
              strokeOpacity="0.12"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* / */}
            <path
              d="M210 360 L270 60"
              stroke="white"
              strokeOpacity="0.12"
              strokeWidth="18"
              strokeLinecap="round"
            />
            {/* > */}
            <path
              d="M360 60 L450 210 L360 360"
              stroke="white"
              strokeOpacity="0.12"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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
