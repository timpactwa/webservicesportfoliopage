'use client'

import { motion } from 'framer-motion'
import { WHY_US_ITEMS } from '@/lib/data'
import PixelReveal from '@/components/ui/PixelReveal'
import ScanlineHeading from '@/components/ui/ScanlineHeading'
import Button from '@/components/ui/Button'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

export default function WhyUs() {
  return (
    <PixelReveal>
      <section className="py-20 md:py-32 bg-charcoal text-white">
        <div className="container-studio">
          <div className="mb-14">
            <motion.p
              className="text-accent font-bold text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              Why Render
            </motion.p>
            <ScanlineHeading
              as="h2"
              className="text-display-xl font-black text-white"
              delay={0.5}
            >
              What makes us different.
            </ScanlineHeading>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {WHY_US_ITEMS.map((item) => (
              <motion.div key={item.number} variants={itemVariants}>
                <p className="text-6xl font-black text-white/10 mb-4">{item.number}</p>
                <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Button variant="primary" href="/contact" size="lg">
              Book a Call
            </Button>
          </motion.div>
        </div>
      </section>
    </PixelReveal>
  )
}
