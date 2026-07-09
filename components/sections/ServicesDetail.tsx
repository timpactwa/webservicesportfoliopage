'use client'

import { motion } from 'framer-motion'
import { FAQ_ITEMS, GUARANTEE, PRICING_TIERS } from '@/lib/data'
import PricingCard from '@/components/ui/PricingCard'
import Button from '@/components/ui/Button'
import TriangleHeading from '@/components/ui/TriangleHeading'

// The three objections that peak on the pricing page. Pulled from the canonical
// FAQ so the answers can never drift out of sync with the Home page.
const CONDENSED_FAQ_QUESTIONS = [
  'How much does a website cost?',
  'How long until my site launches?',
  'Do I own my website?',
]

const condensedFaq = CONDENSED_FAQ_QUESTIONS.map((question) => {
  const item = FAQ_ITEMS.find((faq) => faq.question === question)
  if (!item) throw new Error(`Condensed FAQ is out of sync with FAQ_ITEMS: "${question}"`)
  return item
})

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
}

const featureItems = [
  'Custom-built, mobile-ready websites',
  'Mobile-first responsive design',
  'On-page SEO foundation',
  'Fast turnaround (2–4 weeks)',
  'Monthly maintenance plans',
  'Performance-optimized (Core Web Vitals)',
]

const aiUseCases = [
  'After-hours questions triaged overnight with a draft reply waiting for you',
  'Website leads routed straight into your spreadsheet or CRM, already organized',
  'Review requests that send themselves the moment a job or visit is done',
  'SOPs and internal docs that stay current on their own',
]

export default function ServicesDetail() {
  return (
    <div>
      <section className="py-20 md:py-32 bg-bg">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-20"
          >
            <TriangleHeading
              as="h1"
              className="text-display-2xl text-graphite mb-4"
              delay={0}
            >
              What we do,
              <br />
              and what it costs.
            </TriangleHeading>
            <p className="text-xl text-graphite-soft">Clear scope. Clear pricing. No surprises.</p>
          </motion.div>

          <div id="web" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55 }}
              className="mb-12"
            >
              <p className="eyebrow mb-4 text-xs text-accent-dark">
                Web Design & Development
              </p>
              <TriangleHeading
                as="h2"
                className="text-display-xl text-graphite mb-6"
                delay={0}
              >
                Websites built to get you more customers.
              </TriangleHeading>
              <p className="text-lg text-graphite-soft leading-relaxed mb-6 max-w-2xl">
                Most local business sites are slow, outdated, or invisible on Google. We build yours
                from scratch for businesses in Randolph, Denville, Morristown, Parsippany, Madison,
                and across Morris County, NJ. Live in 2–4 weeks.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                {featureItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-graphite-soft">
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
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
            >
              {PRICING_TIERS.map((tier) => (
                <motion.div key={tier.tier} variants={itemVariants} className="h-full">
                  <PricingCard {...tier} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55 }}
              className="mt-8 rounded-card border border-accent/25 bg-accent/5 p-6 text-center"
            >
              <p className="text-base font-semibold text-graphite">{GUARANTEE.long}</p>
              <p className="mt-2 text-sm text-graphite-soft">
                Founding client pricing. These are our first-client rates and they go up as our
                portfolio grows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55 }}
              className="mt-8 flex flex-col items-center gap-4 rounded-card border border-hairline bg-surface p-8 text-center sm:flex-row sm:justify-between sm:text-left"
            >
              <p className="text-lg font-semibold text-graphite">
                Not sure which package fits? Book a free call and we&apos;ll tell you straight.
              </p>
              <Button variant="primary" size="md" href="/contact" className="flex-shrink-0">
                Request a Call
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55 }}
              className="mt-16 max-w-3xl"
            >
              <p className="eyebrow mb-6 text-xs text-accent-dark">Before you ask</p>
              <dl className="border-t border-hairline">
                {condensedFaq.map((item) => (
                  <div key={item.question} className="border-b border-hairline py-5">
                    <dt className="text-base font-semibold text-graphite mb-2">{item.question}</dt>
                    <dd className="text-graphite-soft leading-relaxed">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-surface">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-4 text-xs text-accent-dark">
              How We Start
            </p>
            <TriangleHeading
              as="h2"
              className="text-display-xl text-graphite mb-6"
              delay={0}
            >
              Bring whatever you have. We take it from there.
            </TriangleHeading>
            <p className="text-lg text-graphite-soft leading-relaxed mb-8">
              You don&apos;t need a finished plan to work with us. Whether you have a folder of
              photos, a rough wireframe, a design concept, or just an idea in your head, we meet you
              where you are and guide you through every stage from first concept to launch.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
              {['Photos and images', 'Wireframes and sketches', 'Design concepts or examples', 'Just an idea, nothing else needed'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-graphite-soft">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section id="ai" className="py-20 md:py-32 bg-graphite text-white">
        <div className="container-studio">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-4 text-xs text-accent">
              AI Consulting & Automation
            </p>
            <TriangleHeading
              as="h2"
              className="text-display-xl text-white mb-8"
              delay={0}
            >
              The follow-up work costing you customers, automated.
            </TriangleHeading>
            <div className="space-y-5 mb-8 text-white/70 leading-relaxed text-lg">
              <p>
                Every missed after-hours message, every lead sitting in an inbox for two days,
                every review request you meant to send but didn&apos;t. That is a customer choosing
                whoever answered first. We build small, reliable systems that catch it. No
                dashboards to learn, no science project.
              </p>
            </div>
            <ul className="space-y-3 mb-8 max-w-2xl">
              {aiUseCases.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70">
                  <svg
                    className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
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
            <p className="text-white/70 leading-relaxed text-lg mb-10">
              Bring us the task you dread. We&apos;ll tell you whether it&apos;s worth automating,
              and build it if it is.
            </p>
            <Button variant="primary" href="/contact?intent=ai" size="lg">
              Talk to Us About AI
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
