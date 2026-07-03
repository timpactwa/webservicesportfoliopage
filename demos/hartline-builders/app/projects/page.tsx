import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRightIcon } from '@/components/ui/icons'
import { PROJECTS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Recent kitchens, baths, decks, basements, and additions completed across Morris County, NJ.',
}

export default function ProjectsPage() {
  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-prussian text-paper py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-grid bg-grid pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <p className="font-mono text-xs text-hivisBright uppercase tracking-[0.3em] mb-4">
            Project Log
          </p>
          <h1 className="font-display uppercase font-bold text-6xl md:text-7xl leading-none mb-5">
            Recent Work
          </h1>
          <p className="text-paper/70 max-w-md mx-auto">
            Every project below is real scope, real timeline, and a homeowner
            who&apos;ll take your call as a reference.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-6">
        {PROJECTS.map((proj, i) => (
          <article
            key={proj.name}
            className="bg-white border border-prussian/15 hover:border-prussian/50 hover:shadow-lg transition-all duration-200"
          >
            {/* sheet header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-prussian/15 bg-paper/60">
              <span className="font-mono text-[10px] uppercase tracking-widest text-graphite">
                Job {String(i + 1).padStart(3, '0')} · {proj.year}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-prussian">
                {proj.type}
              </span>
            </div>
            <div className="p-6">
              <h2 className="font-display uppercase font-bold text-3xl text-ink leading-tight mb-1">
                {proj.name}
              </h2>
              <p className="font-mono text-xs text-prussian mb-4">
                {proj.town} · completed in {proj.duration}
              </p>
              <p className="text-sm text-graphite leading-relaxed mb-5">{proj.summary}</p>
              <ul className="flex flex-wrap gap-2">
                {proj.details.map((d) => (
                  <li
                    key={d}
                    className="font-mono text-[10px] uppercase tracking-wider text-ink border border-prussian/25 px-2.5 py-1"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 text-center">
        <Link
          href="/book"
          className="group inline-flex items-center gap-3 bg-hivis text-ink font-display uppercase tracking-wider font-bold px-10 py-4 hover:bg-hivisBright transition-colors cursor-pointer"
        >
          Start your project
          <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
