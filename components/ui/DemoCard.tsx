'use client'

import { DEMO_DISCLAIMER, type Project } from '@/lib/data'
import ResponsiveDemoPreview from '@/components/ui/ResponsiveDemoPreview'
import Reveal from '@/components/ui/Reveal'

export default function DemoCard({
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
