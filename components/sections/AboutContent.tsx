'use client'

import { motion, type Variants } from 'framer-motion'
import { TEAM_MEMBERS } from '@/lib/data'
import TeamMember from '@/components/ui/TeamMember'
import ScanlineHeading from '@/components/ui/ScanlineHeading'

const values = [
  { title: 'Quality over quantity', description: 'We take on fewer clients so we can do better work.' },
  { title: 'Transparency always', description: 'No hidden costs, no scope surprises, no fluff.' },
  { title: 'Mutual benefit', description: 'You get a great site. We get real experience. Win-win.' },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AboutContent() {
  return (
    <div>
      <section className="py-20 md:py-32 bg-white">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="mb-20"
          >
            <ScanlineHeading
              as="h1"
              className="text-display-xl font-black text-charcoal mb-8 max-w-3xl"
              delay={0}
            >
              Built for local.<br />Priced for real.
            </ScanlineHeading>
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">Our Mission</p>
            <p className="text-2xl text-neutral-600 leading-relaxed max-w-2xl">
              Tim brings the software. Luke brings the strategy. Together we help local businesses get modern websites and practical digital tools at a fraction of what a traditional agency charges. No overhead, no middlemen, just two people who care about the work.
            </p>
          </motion.div>

          <div className="mb-4">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-10">The Team</p>
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

      <section className="py-16 md:py-20 bg-charcoal text-white">
        <div className="container-studio">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="text-lg font-black text-white mb-2">{value.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
