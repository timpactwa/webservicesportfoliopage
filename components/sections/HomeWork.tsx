'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DEMO_DISCLAIMER, DEMO_SECTION, PROJECTS, type Project } from '@/lib/data'
import DemoModal from '@/components/ui/DemoModal'
import ResponsiveDemoPreview from '@/components/ui/ResponsiveDemoPreview'
import Reveal from '@/components/ui/Reveal'

// The three sample brands we designed and built (each has a live demoUrl) plus the
// one real consulting engagement (featured, no demoUrl). Kept data-driven so the
// grid follows lib/data.ts rather than a hardcoded list.
const demoProjects = PROJECTS.filter((project) => project.demoUrl)
const caseStudyProject = PROJECTS.find((project) => project.featured && !project.demoUrl)

export default function HomeWork() {
  // Modal state has to be shared between every card and the single DemoModal, so
  // this section is a client component. Focus trap and Escape handling live inside
  // DemoModal; we only own which demo is open. Mirrors WorkGrid's wiring.
  const [activeDemo, setActiveDemo] = useState<{ url: string; title: string } | null>(null)

  return (
    <>
      <section id="work" className="scroll-mt-24 py-20 md:py-32 bg-surface">
        <div className="container-studio">
          <Reveal className="mb-14 max-w-3xl">
            <p className="eyebrow mb-4 text-xs text-accent-dark">Our work</p>
            <h2 className="text-display-xl text-graphite">{DEMO_SECTION.headline}</h2>
            <p className="mt-5 text-lg leading-relaxed text-graphite-soft">{DEMO_SECTION.intro}</p>
            <p className="mt-4 text-lg leading-relaxed text-graphite">{DEMO_SECTION.offer}</p>
          </Reveal>

          {/* Three demos across a single row rather than a 2x2 block. The old grid
              wrapped to a second row and made this the tallest section on the page,
              pushing the guarantee and the prices roughly a screen further down. */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {demoProjects.map((project, index) => (
              <DemoCard
                key={project.projectName}
                project={project}
                index={index}
                onOpen={() =>
                  setActiveDemo({ url: project.demoUrl!, title: project.projectName })
                }
              />
            ))}
          </div>

          {caseStudyProject && (
            <div className="mt-6">
              <CaseStudyCard project={caseStudyProject} index={demoProjects.length} />
            </div>
          )}

          <Reveal delay={0.1} className="mt-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2"
            >
              See all work <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
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

function DemoCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  return (
    <Reveal index={index} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-bg shadow-card transition-shadow duration-300 hover:shadow-card-hover">
        {/* The whole preview is the click target. A div with role="button" (not a
            native button) so the embedded iframe stays valid non-interactive
            content. ResponsiveDemoPreview lazy-mounts its own iframe on scroll. */}
        <div
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-label={`Open the ${project.projectName} demo preview`}
          onClick={onOpen}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onOpen()
            }
          }}
          className="relative aspect-[16/10] cursor-pointer overflow-hidden bg-graphite focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
        >
          <ResponsiveDemoPreview url={project.demoUrl!} baseHeight={900} fallbackScale={0.45} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />

          {/* Honesty chip: every demo card must say it is a sample, not client work. */}
          <span className="eyebrow absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] text-graphite">
            {DEMO_DISCLAIMER.badge}
          </span>

          <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
            <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-graphite opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Open preview
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <p className="eyebrow mb-2 text-xs text-accent-dark">{project.category}</p>
          <h3 className="text-xl font-semibold leading-tight text-graphite">{project.projectName}</h3>
          {project.description && (
            <p className="mt-3 leading-relaxed text-graphite-soft">{project.description}</p>
          )}
        </div>
      </article>
    </Reveal>
  )
}

function CaseStudyCard({ project, index }: { project: Project; index: number }) {
  // The one real engagement. Visually distinct (dark panel, no iframe, no demo
  // badge) so it never blends in with the sample brands above it. Laid out as a
  // full-width horizontal band under the demo row: it reads as a different kind of
  // proof, and it costs far less vertical space than a fourth grid cell did.
  const cover = project.caseStudy?.proofImages[0]

  return (
    <Reveal index={index}>
      <article className="group grid grid-cols-1 overflow-hidden rounded-card border border-white/10 bg-graphite text-white shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:grid-cols-[minmax(0,320px)_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden bg-white sm:aspect-auto sm:min-h-[224px]">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 640px) 320px, 100vw"
              className="object-contain"
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradientFrom ?? 'from-accent'} ${project.gradientTo ?? 'to-accent-dark'}`}
            />
          )}
          <span className="eyebrow absolute left-4 top-4 rounded-full bg-graphite px-3 py-1.5 text-[10px] text-white">
            {project.featuredLabel ?? 'Consulting Proof'}
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-8">
          <p className="eyebrow mb-2 text-xs text-[#5FBF72]">{project.category}</p>
          <h3 className="text-xl font-semibold leading-tight text-white">{project.projectName}</h3>
          {project.description && (
            <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{project.description}</p>
          )}

          <div className="pt-5">
            <Link
              href="/work"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#5FBF72] transition-all duration-200 hover:gap-2"
            >
              Read the case study <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
