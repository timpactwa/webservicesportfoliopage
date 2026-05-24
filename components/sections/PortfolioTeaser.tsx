'use client'

import { motion } from 'framer-motion'
import { PROJECTS } from '@/lib/data'
import ProjectCard from '@/components/ui/ProjectCard'
import Button from '@/components/ui/Button'

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
    <section className="py-20 md:py-32 bg-white">
      <div className="container-studio">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14"
        >
          <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">Our Work</p>
          <h2 className="text-display-xl font-black text-charcoal">See what we&apos;re building.</h2>
        </motion.div>

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
  )
}
