'use client'

import { motion } from 'framer-motion'
import { TEAM_MEMBERS } from '@/lib/data'
import TeamMember from '@/components/ui/TeamMember'

const values = [
  { title: 'Quality over quantity', description: 'We take on fewer clients so we can do better work.' },
  { title: 'Transparency always', description: 'No hidden costs, no scope surprises, no fluff.' },
  { title: 'Mutual benefit', description: 'You get a great site. We get real experience. Win-win.' },
]

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
            <h1 className="text-display-2xl font-black text-charcoal mb-6">
              Two students.
              <br />
              One agency.
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl leading-relaxed">
              We&apos;re Tim and Partner — a CS student and a business student building the agency we
              wish existed for local businesses in Morris County.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="mb-20 max-w-3xl"
          >
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-6">Our Mission</p>
            <div className="space-y-5 text-neutral-600 leading-relaxed text-lg">
              <p>
                Morris County has hundreds of small businesses that deserve great websites and smart
                digital tools. Most can&apos;t afford a $10,000 agency retainer. We can. Because
                we&apos;re students — our overhead is low, our ambition is high, and we care deeply about
                the people we work with.
              </p>
              <p>
                Every project we take on is a chance to build our portfolio and help a real business
                grow. We&apos;re not here to churn through clients — we&apos;re here to do work
                we&apos;re proud of.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="mb-4"
          >
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-10">The Team</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {TEAM_MEMBERS.map((member) => (
                <TeamMember key={member.name} {...member} />
              ))}
            </div>
          </motion.div>
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
