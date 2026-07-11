'use client'

import { useState } from 'react'
import { PROJECTS } from '@/lib/data'
import DemoCard from '@/components/ui/DemoCard'
import DemoModal from '@/components/ui/DemoModal'

// The sample brands we designed and built (each carries a live demoUrl). Kept
// data-driven so the row follows lib/data.ts rather than a hardcoded list.
const demoProjects = PROJECTS.filter((project) => project.demoUrl)

export default function WebDesignDemos() {
  // Modal state is shared between every card and the single DemoModal, so this
  // island is a client component. Mirrors HomeWork's wiring.
  const [activeDemo, setActiveDemo] = useState<{ url: string; title: string } | null>(null)

  return (
    <>
      <div className="mb-16">
        <p className="eyebrow mb-4 text-xs text-accent-dark">Live demo sites</p>
        <p className="text-lg text-graphite-soft">
          Three demo templates we designed, built, and deployed. Tap one to open the real site.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {demoProjects.map((project, index) => (
            <DemoCard
              key={project.projectName}
              project={project}
              index={index}
              onOpen={() => setActiveDemo({ url: project.demoUrl!, title: project.projectName })}
            />
          ))}
        </div>
      </div>

      <DemoModal
        url={activeDemo?.url ?? ''}
        title={activeDemo?.title ?? ''}
        isOpen={activeDemo !== null}
        onClose={() => setActiveDemo(null)}
      />
    </>
  )
}
