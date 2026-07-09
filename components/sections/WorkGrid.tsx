'use client'

import Image from 'next/image'
import { type RefObject, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { DEMO_DISCLAIMER, PROJECTS, TRUST_MARKERS, type Project } from '@/lib/data'
import DemoModal from '@/components/ui/DemoModal'
import Button from '@/components/ui/Button'
import ResponsiveDemoPreview from '@/components/ui/ResponsiveDemoPreview'

const containerVariants = {
  prerender: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const sectionVariants = {
  prerender: { opacity: 1, y: 0 },
  visible: {
    opacity: [0, 1],
    y: [24, 0],
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

const itemVariants = {
  prerender: { opacity: 1, y: 0 },
  visible: {
    opacity: [0, 1],
    y: [24, 0],
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

function useSafeRevealProps() {
  const prefersReducedMotion = useReducedMotion()
  const [motionReady, setMotionReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return

    const timeout = window.setTimeout(() => setMotionReady(true), 80)
    return () => window.clearTimeout(timeout)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) {
    return { initial: false, animate: 'prerender' as const }
  }

  return {
    initial: false,
    animate: motionReady ? ('visible' as const) : ('prerender' as const),
  }
}

export default function WorkGrid() {
  const [activeDemo, setActiveDemo] = useState<{ url: string; title: string } | null>(null)
  const [activeCaseStudyName, setActiveCaseStudyName] = useState<string | null>(null)
  const caseStudyRef = useRef<HTMLDivElement>(null)
  const safeRevealProps = useSafeRevealProps()
  const featuredProjects = PROJECTS.filter((project) => project.featured)
  const activeCaseStudy = featuredProjects.find((project) => project.projectName === activeCaseStudyName)

  const openCaseStudy = (project: Project) => {
    if (activeCaseStudyName === project.projectName) {
      setActiveCaseStudyName(null)
      return
    }

    setActiveCaseStudyName(project.projectName)
    window.setTimeout(() => {
      caseStudyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <>
      <section className="py-20 md:py-32 bg-surface">
        <div className="container-studio">
          <motion.div
            variants={sectionVariants}
            {...safeRevealProps}
            className="mb-14 md:mb-20 max-w-3xl"
          >
            <p className="eyebrow mb-4 text-xs text-accent-dark">
              Portfolio
            </p>
            <h1 className="text-display-2xl text-graphite mb-6">Our Work.</h1>
            <p className="text-lg text-graphite-soft leading-relaxed mb-6">
              Every demo below is a fully built, working site you can click through yourself, not a
              screenshot. They show how we turn a messy business need into something a customer can
              actually use, the same process we bring to Morris County, NJ businesses.
            </p>

            <div className="mb-8 rounded-card border border-hairline bg-bg p-5">
              <p className="text-sm font-semibold text-graphite mb-1">
                To be clear about what these are
              </p>
              <p className="text-sm text-graphite-soft leading-relaxed">{DEMO_DISCLAIMER.long}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
              <Button variant="primary" href="/contact">
                Start a Project
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-hairline">
              {TRUST_MARKERS.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-sm font-semibold text-graphite-soft">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <section className="mb-16 md:mb-20">
            <motion.div
              variants={sectionVariants}
              {...safeRevealProps}
              className="mb-6"
            >
              <div>
                <p className="eyebrow mb-2 text-xs text-accent-dark">
                  Featured Proof
                </p>
                <h2 className="text-display-md text-graphite">
                  Consulting proof and live web work.
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              {...safeRevealProps}
              className="grid lg:grid-cols-2 gap-6"
            >
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.projectName}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    transition: { type: 'spring', stiffness: 400, damping: 28 },
                  }}
                >
                  <FeaturedProjectCard
                    project={project}
                    isActive={activeCaseStudyName === project.projectName}
                    onOpenCaseStudy={project.caseStudy ? () => openCaseStudy(project) : undefined}
                    onOpenDemo={
                      project.demoUrl
                        ? () => setActiveDemo({ url: project.demoUrl!, title: project.projectName })
                        : undefined
                    }
                  />
                </motion.div>
              ))}
            </motion.div>

            {activeCaseStudy?.caseStudy && (
              <CaseStudySection project={activeCaseStudy} sectionRef={caseStudyRef} />
            )}
          </section>
        </div>
      </section>

      <DemoModal
        url={activeDemo?.url ?? ''}
        title={activeDemo?.title ?? ''}
        isOpen={activeDemo !== null}
        onClose={() => setActiveDemo(null)}
      />
    </>
  )
}

function FeaturedProjectCard({
  project,
  isActive,
  onOpenCaseStudy,
  onOpenDemo,
}: {
  project: Project
  isActive: boolean
  onOpenCaseStudy?: () => void
  onOpenDemo?: () => void
}) {
  return (
    <article className="h-full rounded-card bg-bg border border-hairline hover:border-accent/30 shadow-card hover:shadow-card-hover overflow-hidden transition-shadow duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-graphite">
        {project.demoUrl ? (
          <>
            <ResponsiveDemoPreview url={project.demoUrl} baseHeight={900} fallbackScale={0.45} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
          </>
        ) : project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.imageAlt ?? `${project.projectName} featured artwork`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientFrom ?? 'from-accent'} ${project.gradientTo ?? 'to-accent-dark'}`} />
        )}

        {(project.demoUrl || !project.imageUrl) && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="eyebrow rounded-full bg-graphite text-white text-[10px] px-3 py-1.5">
              {project.featuredLabel ?? project.cardLabel ?? 'Featured'}
            </span>
            {project.demoUrl && (
              <span className="eyebrow rounded-full bg-white/90 text-graphite text-[10px] px-3 py-1.5">
                {DEMO_DISCLAIMER.badge}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <p className="eyebrow mb-2 text-xs text-accent-dark">
          {project.category}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
          <h3 className="text-2xl font-semibold text-graphite leading-tight">{project.projectName}</h3>
          {project.date && (
            <span className="eyebrow shrink-0 rounded-full text-[10px] text-graphite-soft border border-hairline px-2.5 py-1">
              {project.date}
            </span>
          )}
        </div>

        {project.description && (
          <p className="text-graphite-soft leading-relaxed mb-3">{project.description}</p>
        )}

        {project.demoUrl && (
          <p className="text-sm text-graphite-soft/80 italic mb-5">{DEMO_DISCLAIMER.short}</p>
        )}

        {project.proofPoints && project.proofPoints.length > 0 && (
          <div className="space-y-2 mb-5">
            {project.proofPoints.slice(0, 2).map((point) => (
              <div key={point} className="flex gap-3 text-sm text-graphite-soft leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F8F46]" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="eyebrow rounded-full text-[9px] text-graphite-soft border border-hairline px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {onOpenCaseStudy && (
            <button
              type="button"
              onClick={onOpenCaseStudy}
              className="inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-dark text-white font-semibold px-5 py-3 transition-colors"
              aria-expanded={isActive}
            >
              {isActive ? 'Hide Case Study' : 'View Case Study'}
            </button>
          )}
          {onOpenDemo && (
            <button
              type="button"
              onClick={onOpenDemo}
              aria-haspopup="dialog"
              className="inline-flex items-center justify-center rounded-full bg-accent hover:bg-accent-dark text-white font-semibold px-5 py-3 transition-colors"
            >
              Preview Demo
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

function CaseStudySection({
  project,
  sectionRef,
}: {
  project: Project
  sectionRef: RefObject<HTMLDivElement>
}) {
  const caseStudy = project.caseStudy
  const prefersReducedMotion = useReducedMotion()
  if (!caseStudy) return null

  return (
    <motion.div
      ref={sectionRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8 scroll-mt-28 rounded-card-lg bg-graphite text-white overflow-hidden"
    >
      <div className="grid min-w-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0 p-6 sm:p-8 lg:p-10">
          <p className="eyebrow mb-4 text-xs text-[#5FBF72]">
            {caseStudy.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-display-md lg:text-display-lg font-semibold text-white max-w-3xl break-words">
            {caseStudy.title}
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed max-w-2xl break-words">
            {caseStudy.summary}
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {caseStudy.stats.map((stat) => (
              <div key={stat.label} className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-display text-3xl font-semibold text-[#5FBF72]">{stat.value}</p>
                <p className="eyebrow text-xs text-white mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full min-w-0 self-start aspect-[16/10] min-h-[260px] bg-white lg:m-10 lg:ml-0 lg:min-h-0 rounded-xl overflow-hidden">
          {(project.detailHeroImageUrl ?? project.imageUrl) && (
            <Image
              src={project.detailHeroImageUrl ?? project.imageUrl!}
              alt={project.detailHeroImageAlt ?? project.imageAlt ?? `${project.projectName} case study artwork`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
            />
          )}
        </div>
      </div>

      <div className="border-t border-white/10 p-6 sm:p-8 lg:p-10">
        <div className="grid min-w-0 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14">
          <div className="min-w-0 space-y-6">
            {[
              ['Challenge', caseStudy.challenge],
              ['Role', caseStudy.role],
              ['Research', caseStudy.research],
              ['Recommendation', caseStudy.recommendation],
            ].map(([label, copy]) => (
              <div key={label}>
                <h3 className="eyebrow text-sm text-white mb-2">
                  {label}
                </h3>
                <p className="text-white/60 leading-relaxed break-words">{copy}</p>
              </div>
            ))}
          </div>

          <div className="min-w-0">
            <h3 className="eyebrow text-sm text-white mb-4">
              Deliverables
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {caseStudy.deliverables.map((deliverable) => (
                <div
                  key={deliverable}
                  className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 break-words"
                >
                  {deliverable}
                </div>
              ))}
            </div>

            <h3 className="eyebrow text-sm text-white mb-4">
              Proof Objects
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {caseStudy.proofImages.map((proof) => (
                <figure key={proof.src} className="rounded-xl bg-white text-graphite overflow-hidden">
                  <div className="relative aspect-[4/3] bg-neutral-100">
                    <Image
                      src={proof.src}
                      alt={proof.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="eyebrow px-4 py-3 text-xs">
                    {proof.label}
                  </figcaption>
                </figure>
              ))}
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}
