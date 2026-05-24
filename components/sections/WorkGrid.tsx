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

export default function WorkGrid() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container-studio">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <h1 className="text-display-2xl font-black text-charcoal mb-6">Our Work.</h1>
          <div className="bg-blue-50 border border-accent/20 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-neutral-700 font-medium">
              We&apos;re currently booking our first clients — reach out to be featured here.
            </p>
            <Button variant="primary" href="/contact" size="sm">
              Get in Touch
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project) => (
            <motion.div key={project.projectName} variants={itemVariants}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
