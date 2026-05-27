'use client'

import { motion } from 'framer-motion'
import { PROJECTS } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'
import Button from '@/components/ui/Button'
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

export default function PortfolioTeaser() {
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
              Our Work
            </motion.p>
            <ScanlineHeading
              as="h2"
              className="text-display-xl font-black text-charcoal"
              delay={0.5}
            >
              See what we&apos;re building.
            </ScanlineHeading>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {PROJECTS.slice(0, 2).map((project) => (
              <motion.div key={project.projectName} variants={itemVariants}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="text-neutral-600 text-sm">We&apos;re actively booking first clients.</p>
            <Button variant="secondary" href="/work">
              View All Work
            </Button>
          </div>
        </div>
      </section>
    </PixelReveal>
  )
}
