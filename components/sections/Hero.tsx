'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import PixelCanvas from '@/components/sections/PixelCanvas'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
      <PixelCanvas />

      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="relative"
        >
          <div className="w-[500px] h-[500px] border-[3px] border-accent/25 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/15 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent/25 rounded-full" />
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
            className="text-display-2xl font-black text-white mb-6"
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
            Render is a student-run web design and AI consulting agency serving Morris County, NJ.
            Agency-quality work at honest prices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Button variant="primary" size="lg" href="/contact">
              Book a Free Consultation
            </Button>
            <Button variant="secondary-inverse" size="lg" href="/work">
              See Our Work
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
