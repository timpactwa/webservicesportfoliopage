'use client'

import { motion } from 'framer-motion'
import ServiceCard from '@/components/ui/ServiceCard'
import PixelReveal from '@/components/ui/PixelReveal'
import ScanlineHeading from '@/components/ui/ScanlineHeading'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

const WebIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9" />
  </svg>
)

const AIIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

export default function WhatWeDo() {
  return (
    <PixelReveal>
      <section className="py-20 md:py-32 bg-white">
        <div className="container-studio">
          <div className="mb-14">
            <motion.p
              className="text-accent font-bold text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              What We Do
            </motion.p>
            <ScanlineHeading
              as="h2"
              className="text-display-xl font-black text-charcoal"
              delay={0.5}
            >
              Two services.
              <br />
              One focused team.
            </ScanlineHeading>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={<WebIcon />}
                title="Web Design & Development"
                description="Custom Next.js sites that load fast, rank well, and look like you actually care about your brand."
                href="/services#web"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ServiceCard
                icon={<AIIcon />}
                title="AI Consulting & Automation"
                description="Practical AI tools for real business problems. No hype, no black boxes. Just results you can use."
                href="/services#ai"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PixelReveal>
  )
}
