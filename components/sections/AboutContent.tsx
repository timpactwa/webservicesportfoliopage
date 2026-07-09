'use client'

import { motion, type Variants } from 'framer-motion'
import { TEAM_MEMBERS } from '@/lib/data'
import TeamMember from '@/components/ui/TeamMember'
import TriangleHeading from '@/components/ui/TriangleHeading'
import Button from '@/components/ui/Button'

const values = [
  { title: 'Quality over quantity', description: 'We take on fewer clients so we can do better work.' },
  { title: 'Transparency always', description: 'No hidden costs, no scope surprises, no fluff.' },
  { title: 'Skin in the game', description: "We're not padding a resume. Every site has to perform, because it's the proof the next client sees." },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AboutContent() {
  return (
    <div>
      <section className="py-20 md:py-32 bg-bg">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="mb-20"
          >
            <TriangleHeading
              as="h1"
              className="text-display-xl text-graphite mb-8 max-w-3xl"
              delay={0}
            >
              Built for local.<br />Priced in the open.
            </TriangleHeading>
            <p className="eyebrow mb-4 text-xs text-accent-dark">Our Mission</p>
            <p className="text-2xl text-graphite-soft leading-relaxed max-w-2xl">
              Tim brings the software. Luke brings the strategy. Together we help local businesses get modern websites and practical digital tools without the retainer, the markup, or the six-week sales process. No overhead, no middlemen. You hire the two people actually doing the work.
            </p>
          </motion.div>

          <div className="mb-4">
            <p className="eyebrow mb-10 text-xs text-accent-dark">The Team</p>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ staggerChildren: 0.18 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              {TEAM_MEMBERS.map((member) => (
                <motion.div key={member.name} variants={cardVariants}>
                  <TeamMember {...member} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-graphite text-white">
        <div className="container-studio">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xl font-semibold text-white">Ready to talk about your site?</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" href="/contact">
                Request a Call
              </Button>
              <Button variant="secondary-inverse" href="/contact?intent=mockup">
                Get a Free Mockup
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
