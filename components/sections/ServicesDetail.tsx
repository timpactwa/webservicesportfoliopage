'use client'

import { motion } from 'framer-motion'
import { PRICING_TIERS } from '@/lib/data'
import PricingCard from '@/components/ui/PricingCard'
import Button from '@/components/ui/Button'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

const featureItems = [
  'Custom Next.js development',
  'Mobile-first responsive design',
  'On-page SEO foundation',
  'Fast turnaround (2–4 weeks)',
  'Monthly maintenance plans',
  'Performance-optimized (Core Web Vitals)',
]

export default function ServicesDetail() {
  return (
    <div>
      <section className="py-20 md:py-32 bg-white">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-20"
          >
            <h1 className="text-display-2xl font-black text-charcoal mb-4">
              What we do,
              <br />
              and what it costs.
            </h1>
            <p className="text-xl text-neutral-500">Clear scope. Clear pricing. No surprises.</p>
          </motion.div>

          <div id="web" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
                Web Design & Development
              </p>
              <h2 className="text-display-xl font-black text-charcoal mb-6">
                Modern websites for businesses that mean business.
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {featureItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neutral-700">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {PRICING_TIERS.map((tier) => (
                <motion.div key={tier.tier} variants={itemVariants}>
                  <PricingCard {...tier} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="ai" className="py-20 md:py-32 bg-charcoal text-white">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
              AI Consulting & Automation
            </p>
            <h2 className="text-display-xl font-black text-white mb-8">
              AI for your actual business, not a pitch deck.
            </h2>
            <div className="space-y-5 mb-10 text-neutral-300 leading-relaxed text-lg">
              <p>
                We help small businesses identify where AI can save time and money — without
                overpromising or overcomplicating.
              </p>
              <p>
                Common projects: AI-assisted customer service drafts, automated data entry workflows,
                content scheduling tools, internal process documentation.
              </p>
              <p>
                We believe in honest expectations. We&apos;ll tell you when AI isn&apos;t the right tool —
                and what is.
              </p>
            </div>
            <Button variant="primary" href="/contact" size="lg">
              Talk to Us About AI
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
