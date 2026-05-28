'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS } from '@/lib/data'
import DemoModal from '@/components/ui/DemoModal'
import Button from '@/components/ui/Button'
import PixelReveal from '@/components/ui/PixelReveal'
import ScanlineHeading from '@/components/ui/ScanlineHeading'

const liveProjects = PROJECTS.filter(p => !p.isComingSoon && p.demoUrl)

export default function PortfolioTeaser() {
  const [activeDemo, setActiveDemo] = useState<{ url: string; title: string } | null>(null)
  const featured = liveProjects[0]

  if (!featured) return null

  const tags = featured.category.split('+').map(t => t.trim())

  const openDemo = () =>
    setActiveDemo({ url: featured.demoUrl!, title: featured.projectName })

  return (
    <>
      <PixelReveal>
        <section className="py-20 md:py-32 bg-[#0F0F0F] relative overflow-hidden">
          {/* Section divider — glowing accent line separating from WhyUs */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #1D4ED8 25%, #3B82F6 50%, #1D4ED8 75%, transparent 100%)' }}
          />
          {/* Subtle grid texture */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" />

          <div className="container-studio relative">
            <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 items-center">

              {/* Left — copy */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <p className="text-accent font-bold text-xs uppercase tracking-widest mb-4">
                  Our Work
                </p>

                <ScanlineHeading
                  as="h2"
                  className="text-display-xl font-black text-white"
                  delay={0.3}
                >
                  See what we&apos;re building.
                </ScanlineHeading>

                <div className="mt-5 mb-6">
                  <p className="text-lg font-bold text-neutral-200 mb-2">
                    {featured.projectName}
                  </p>
                  {featured.description && (
                    <p className="text-neutral-500 leading-relaxed">
                      {featured.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 border border-neutral-800 px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={openDemo}
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-bold text-sm px-6 py-3 transition-colors"
                  >
                    Preview Demo
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <Button variant="secondary-inverse" href="/work">
                    View All Work
                  </Button>
                </div>
              </motion.div>

              {/* Right — preview window */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${featured.projectName} preview`}
                  className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#0F0F0F]"
                  style={{
                    boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.07)',
                  }}
                  onClick={openDemo}
                  onKeyDown={e => e.key === 'Enter' && openDemo()}
                >
                  {/* Browser chrome */}
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-[#1c1c1c] border-b border-white/10">
                    <div className="flex gap-1.5 flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 flex items-center gap-1.5 bg-[#2a2a2a] rounded px-2.5 py-1 min-w-0">
                      <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-xs text-neutral-400 font-mono truncate">
                        fuego-street-tacos.vercel.app
                      </span>
                    </div>
                  </div>

                  {/* Scaled iframe */}
                  <div
                    className="relative overflow-hidden bg-[#1B1B2E]"
                    style={{ aspectRatio: '16 / 10' }}
                  >
                    <iframe
                      src={featured.demoUrl}
                      className="absolute top-0 left-0 border-0 pointer-events-none select-none"
                      style={{
                        width: '1280px',
                        height: '960px',
                        transform: 'scale(0.55)',
                        transformOrigin: 'top left',
                      }}
                      scrolling="no"
                      tabIndex={-1}
                      aria-hidden="true"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#0F0F0F] text-sm font-bold px-5 py-2.5 flex items-center gap-2">
                        Open Preview
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </PixelReveal>

      <DemoModal
        url={activeDemo?.url ?? ''}
        title={activeDemo?.title ?? ''}
        isOpen={activeDemo !== null}
        onClose={() => setActiveDemo(null)}
      />
    </>
  )
}
