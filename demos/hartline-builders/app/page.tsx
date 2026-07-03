'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import BlueprintHouse from '@/components/home/BlueprintHouse'
import SectionLabel from '@/components/ui/SectionLabel'
import { SERVICE_ICONS, ArrowRightIcon } from '@/components/ui/icons'
import { SERVICES, PROCESS, PROJECTS, TESTIMONIALS, STATS, COMPANY } from '@/lib/data'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Home() {
  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="bg-prussian text-paper relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid bg-grid pointer-events-none" aria-hidden="true" />
        {/* title block corner, like a drawing sheet */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute bottom-6 left-6 border border-paper/25 font-mono text-[10px] text-paper/50 uppercase tracking-widest"
        >
          <div className="px-3 py-1.5 border-b border-paper/25">Sheet A-101 · Front Elevation</div>
          <div className="px-3 py-1.5">Drawn by RH · Checked by MH · Rev C</div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-28 lg:pt-28 lg:pb-36 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs text-hivisBright uppercase tracking-[0.3em] mb-6"
            >
              Randolph, NJ · Est. 2008
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display uppercase font-bold text-6xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8"
            >
              Built to
              <br />
              <span className="relative inline-block text-hivisBright">
                the line.
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 1, ease: 'easeOut' }}
                  className="absolute -bottom-2 left-0 h-1 w-full bg-paper/30 origin-left"
                />
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-paper/80 text-lg max-w-md leading-relaxed mb-10"
            >
              Kitchens, baths, decks, and additions for Morris County homes.
              Fixed estimates. Our own crew. A schedule we actually keep.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-5"
            >
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 bg-hivis text-ink font-display uppercase tracking-wider font-bold px-8 py-4 hover:bg-hivisBright transition-colors cursor-pointer"
              >
                Book a Free Estimate
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={COMPANY.phoneHref}
                className="font-mono text-sm text-paper/70 hover:text-paper underline underline-offset-4 decoration-paper/30 transition-colors"
              >
                {COMPANY.phone}
              </a>
            </motion.div>
          </div>

          <div className="relative">
            <BlueprintHouse />
          </div>
        </div>
      </section>

      {/* ───────────── STAT STRIP ───────────── */}
      <section className="bg-paper border-b border-prussian/15">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="text-center md:text-left"
            >
              <p className="font-display font-bold text-4xl text-prussian">{s.value}</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-graphite mt-1">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────── SERVICES ───────────── */}
      <section className="bg-paper py-24 relative">
        <div className="absolute inset-0 bg-paper-grid bg-grid pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6">
          <SectionLabel index="01" label="What we build" />
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display uppercase font-bold text-5xl md:text-6xl text-ink text-center mt-6 mb-16"
          >
            One crew. <span className="text-prussian">Six trades.</span>
          </motion.h2>

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
                  className="group bg-white border border-prussian/15 p-7 hover:border-prussian/50 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-5">
                    <span className="inline-flex items-center justify-center w-12 h-12 border border-prussian/25 text-prussian group-hover:bg-prussian group-hover:text-paper transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="font-mono text-[10px] text-graphite uppercase tracking-widest pt-1">
                      {svc.timeline}
                    </span>
                  </div>
                  <h3 className="font-display uppercase font-bold text-2xl text-ink mb-2">
                    {svc.name}
                  </h3>
                  <p className="text-sm text-graphite leading-relaxed mb-5">{svc.blurb}</p>
                  <p className="font-mono text-xs text-prussian">
                    from <span className="font-medium">{svc.startingAt}</span>
                  </p>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wider font-bold text-prussian border-b-2 border-hivis pb-1 hover:gap-3 transition-all cursor-pointer"
            >
              Full scope of work <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── PROCESS ───────────── */}
      <section className="bg-ink text-paper py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid bg-grid pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6">
          <SectionLabel index="02" label="How a project runs" className="text-paper/70" />
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display uppercase font-bold text-5xl md:text-6xl text-center mt-6 mb-4"
          >
            No surprises. <span className="text-hivisBright">By design.</span>
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-paper/60 text-center max-w-lg mx-auto mb-16"
          >
            Five steps, in the same order, on every job. The sequence is the
            reason the estimate holds and the schedule sticks.
          </motion.p>

          <ol className="relative">
            {PROCESS.map((p, i) => (
              <motion.li
                key={p.step}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative grid md:grid-cols-[80px_200px_1fr] gap-4 md:gap-8 py-7 border-t border-paper/15 last:border-b"
              >
                <span className="font-mono text-hivisBright text-sm pt-1">{p.step}</span>
                <h3 className="font-display uppercase font-bold text-2xl">{p.name}</h3>
                <p className="text-paper/70 leading-relaxed max-w-xl">{p.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── FEATURED PROJECTS ───────────── */}
      <section className="bg-paper py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel index="03" label="Recent work" />
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="font-display uppercase font-bold text-5xl md:text-6xl text-ink text-center mt-6 mb-16"
          >
            On the books, <span className="text-prussian">on the record.</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.slice(0, 3).map((proj, i) => (
              <motion.article
                key={proj.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="bg-white border border-prussian/15 hover:border-prussian/50 hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <div className="px-6 pt-6 pb-4 border-b border-dashed border-prussian/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">
                      {proj.type}
                    </span>
                    <span className="font-mono text-[10px] text-graphite">{proj.year}</span>
                  </div>
                  <h3 className="font-display uppercase font-bold text-2xl text-ink">{proj.name}</h3>
                  <p className="font-mono text-xs text-prussian mt-1">
                    {proj.town} · {proj.duration}
                  </p>
                </div>
                <p className="px-6 py-5 text-sm text-graphite leading-relaxed flex-1">{proj.summary}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-display uppercase tracking-wider font-bold text-prussian border-b-2 border-hivis pb-1 hover:gap-3 transition-all cursor-pointer"
            >
              See all projects <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── TESTIMONIALS ───────────── */}
      <section className="bg-prussian text-paper py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid bg-grid pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6">
          <SectionLabel index="04" label="Client sign-off" className="text-paper/70" />
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {TESTIMONIALS.map((t, i) => (
              <motion.blockquote
                key={t.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="border-l-2 border-hivis pl-6"
              >
                <p className="text-paper/90 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <p className="font-display uppercase font-bold tracking-wide">{t.name}</p>
                  <p className="font-mono text-[11px] text-paper/50 mt-0.5">{t.project}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="bg-paper py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-graphite mb-5">
              Free on-site estimates · {COMPANY.hours}
            </p>
            <h2 className="font-display uppercase font-bold text-5xl md:text-7xl text-ink leading-[0.95] mb-6">
              Ready when
              <br />
              <span className="text-prussian">you are.</span>
            </h2>
            <p className="text-graphite max-w-md mx-auto mb-10">
              Pick a time online and we&apos;ll walk the project with you. Written
              estimate within five business days — the number that holds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/book"
                className="group inline-flex items-center gap-3 bg-hivis text-ink font-display uppercase tracking-wider font-bold px-10 py-4 hover:bg-hivisBright transition-colors cursor-pointer"
              >
                Book a Free Estimate
                <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={COMPANY.phoneHref}
                className="font-body font-semibold text-ink/70 hover:text-ink transition-colors px-4 py-2"
              >
                or call{' '}
                <span className="text-prussian underline underline-offset-4 decoration-hivis">
                  {COMPANY.phone}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
