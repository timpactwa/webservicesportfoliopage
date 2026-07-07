'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Arc from '@/components/ui/Arc'
import { SERVICE_ICONS, ArrowRightIcon, CalendarIcon } from '@/components/ui/icons'
import { SERVICES, TESTIMONIALS, INSURERS, PRACTICE } from '@/lib/data'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.55, ease: 'easeOut' },
  }),
}

const PROMISES = [
  {
    title: 'The price before the chair',
    desc: 'Every treatment plan comes with the cost in writing before we begin. No surprise line items, ever.',
  },
  {
    title: 'Your pace, not ours',
    desc: 'Raise a hand and we stop. Nervous patients get longer visits at no charge. Gentle is a schedule decision, not a slogan.',
  },
  {
    title: 'We run on time',
    desc: 'Your 2:00 is at 2:00. If we are running more than ten minutes behind, you get a text before you leave home.',
  },
]

export default function Home() {
  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden">
        {/* soft powder wash */}
        <div
          aria-hidden="true"
          className="absolute -top-40 right-[-20%] w-[700px] h-[700px] rounded-full bg-powder/60 blur-[100px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-sand/70 blur-[90px] pointer-events-none"
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-28 lg:pt-32 lg:pb-36">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.3em] text-stone mb-6"
            >
              Denville, NJ · Welcoming new patients
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-petrol leading-[1.05] mb-4"
            >
              Dentistry that starts
              <br />
              by <em className="text-sage not-italic font-display italic">listening.</em>
            </motion.h1>
            <Arc delay={0.9} width={200} className="text-sage mb-8" />
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-stone leading-relaxed max-w-lg mb-10"
            >
              Unhurried visits, honest pricing, and a team that remembers how
              you take your small talk. The dentist&apos;s office, redesigned around
              the person in the chair.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-5"
            >
              <Link
                href="/new-patients"
                className="group inline-flex items-center gap-3 bg-petrol text-porcelain font-semibold px-8 py-4 rounded-full hover:bg-petrolDeep transition-colors cursor-pointer"
              >
                <CalendarIcon className="w-5 h-5 text-sage" />
                Request a visit
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={PRACTICE.phoneHref}
                className="font-semibold text-petrol/70 hover:text-petrol underline underline-offset-4 decoration-sage/60 transition-colors"
              >
                {PRACTICE.phone}
              </a>
            </motion.div>
          </div>
        </div>

        {/* insurance strip */}
        <div className="relative border-t border-petrol/10 bg-porcelain/60">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-stone shrink-0">
              In network with
            </p>
            {INSURERS.map((ins) => (
              <span key={ins} className="text-sm font-semibold text-petrol/50">
                {ins}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── PROMISES ───────────── */}
      <section className="bg-petrol text-porcelain rounded-t-arc py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="max-w-xl mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-sage mb-4">How we practice</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Three promises, kept at every visit.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-10">
            {PROMISES.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="border-t border-porcelain/20 pt-6"
              >
                <h3 className="font-display text-2xl mb-3">{p.title}</h3>
                <p className="text-porcelain/70 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── SERVICES ───────────── */}
      <section className="bg-porcelain py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center max-w-xl mx-auto mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-stone mb-4">What we do</p>
            <h2 className="font-display text-4xl md:text-5xl text-petrol leading-tight mb-4">
              Care for every kind of visit
            </h2>
            <p className="text-stone">
              From six-month cleanings to the toothache that can&apos;t wait, all
              handled in one calm place.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => {
              const Icon = SERVICE_ICONS[svc.slug]
              return (
                <motion.div
                  key={svc.slug}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  className="group bg-white border border-petrol/10 rounded-3xl rounded-tl-[3.5rem] p-8 hover:border-sage/60 hover:shadow-lg hover:shadow-powder/60 transition-all duration-200"
                >
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-powder/60 text-petrol mb-5 group-hover:bg-sage group-hover:text-porcelain transition-colors duration-200">
                    <Icon className="w-7 h-7" />
                  </span>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-sage font-semibold mb-2">
                    {svc.tag}
                  </p>
                  <h3 className="font-display text-2xl text-petrol mb-3">{svc.name}</h3>
                  <p className="text-sm text-stone leading-relaxed">{svc.blurb}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-semibold text-petrol border-b-2 border-sage pb-1 hover:gap-3 transition-all cursor-pointer"
            >
              Everything we offer <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── DOCTOR INTRO ───────────── */}
      <section className="bg-sand/50 py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="relative"
          >
            {/* portrait placeholder composed of practice motifs */}
            <div className="aspect-[4/5] max-w-md rounded-3xl rounded-br-[6rem] bg-petrol relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #D8E7EB 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-porcelain/90 text-8xl">EM</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-porcelain/95 backdrop-blur rounded-2xl px-5 py-4">
                <p className="font-display text-lg text-petrol">Dr. Elena Marlowe, DMD</p>
                <p className="text-xs text-stone">Founder · Rutgers School of Dental Medicine</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-stone mb-4">From Dr. Marlowe</p>
            <h2 className="font-display text-4xl md:text-5xl text-petrol leading-tight mb-6">
              &ldquo;I built the office I was afraid to walk into.&rdquo;
            </h2>
            <p className="text-stone leading-relaxed mb-4">
              I was a nervous dental patient long before I was a dentist. The
              rushed visits, the mystery bills, the feeling of being a mouth on
              a schedule instead of a person. I remember all of it.
            </p>
            <p className="text-stone leading-relaxed mb-8">
              Marlowe Dental Studio is the fix I couldn&apos;t find: longer
              appointments, prices in writing, and a team hired as much for
              their warmth as their résumés. Fifteen years in, that&apos;s still
              the whole strategy.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-semibold text-petrol border-b-2 border-sage pb-1 hover:gap-3 transition-all cursor-pointer"
            >
              Meet the whole team <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ───────────── TESTIMONIALS ───────────── */}
      <section className="bg-porcelain py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-stone mb-4">Patient words</p>
            <h2 className="font-display text-4xl md:text-5xl text-petrol">
              The reviews we&apos;re proudest of
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-white border border-petrol/10 rounded-3xl p-8 flex flex-col"
              >
                <Arc delay={0.3 + i * 0.15} width={64} className="text-sage/70 mb-5" />
                <p className="text-petrol/90 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 pt-5 border-t border-petrol/10">
                  <p className="font-semibold text-petrol">{t.name}</p>
                  <p className="text-xs text-stone mt-0.5">{t.detail}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="bg-porcelain pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="bg-petrol text-porcelain rounded-arc px-8 py-16 md:px-16 text-center relative overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute -top-20 right-[-10%] w-[300px] h-[300px] rounded-full bg-sage/20 blur-[60px]"
            />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-4">
                New patients seen within a week.
              </h2>
              <p className="text-porcelain/70 max-w-md mx-auto mb-9">
                Five minutes of paperwork now, none in the waiting room later.
                Tell us what you need and we&apos;ll call with times tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/new-patients"
                  className="group inline-flex items-center gap-3 bg-sage text-petrolDeep font-semibold px-9 py-4 rounded-full hover:bg-porcelain transition-colors cursor-pointer"
                >
                  Start your intake
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={PRACTICE.phoneHref}
                  className="font-semibold text-porcelain/80 hover:text-porcelain transition-colors"
                >
                  or call {PRACTICE.phone}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
