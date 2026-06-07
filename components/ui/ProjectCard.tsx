'use client'

import Image from 'next/image'
import { useTilt } from '@/hooks/useTilt'
import { cn } from '@/lib/utils'
import ResponsiveDemoPreview from '@/components/ui/ResponsiveDemoPreview'

interface ProjectCardProps {
  projectName: string
  category: string
  description?: string
  gradientFrom?: string
  gradientTo?: string
  isComingSoon?: boolean
  demoUrl?: string
  imageUrl?: string
  imageAlt?: string
  cardLabel?: string
  date?: string
  tags?: string[]
  onOpenDemo?: () => void
  onOpenCaseStudy?: () => void
}

export default function ProjectCard({
  projectName,
  category,
  description,
  gradientFrom = 'from-blue-500',
  gradientTo = 'to-indigo-700',
  isComingSoon = true,
  demoUrl,
  imageUrl,
  imageAlt,
  cardLabel,
  date,
  tags,
  onOpenDemo,
  onOpenCaseStudy,
}: ProjectCardProps) {
  const tilt = useTilt<HTMLDivElement>({ max: 5 })

  const tiltProps = {
    ref: tilt.ref,
    onMouseMove: tilt.onMouseMove,
    onMouseLeave: tilt.onMouseLeave,
    style: { transition: 'transform 150ms ease-out', willChange: 'transform' as const },
  }

  if (imageUrl && onOpenCaseStudy) {
    return (
      <div {...tiltProps} className="group h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0F0F0F]">
          <Image
            src={imageUrl}
            alt={imageAlt ?? `${projectName} case study artwork`}
            fill
            priority
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
          <div className="absolute top-3 left-3">
            <span className="bg-[#0F8F46] text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest">
              {cardLabel ?? 'Case Study'}
            </span>
          </div>
          <button
            type="button"
            className="absolute inset-0 flex items-end justify-between gap-3 p-3 text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset"
            onClick={onOpenCaseStudy}
            aria-label={`View ${projectName} case study`}
          >
            <span className="bg-white text-[#0F0F0F] text-sm font-bold px-4 py-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300">
              View Case Study
            </span>
            {date && (
              <span className="bg-black/45 text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300">
                {date}
              </span>
            )}
          </button>
        </div>
        <div className="px-4 pt-4 pb-5">
          <p className="text-accent font-bold text-xs uppercase tracking-widest mb-1">{category}</p>
          <h3 className="text-lg font-black text-[#0F0F0F] mb-1">{projectName}</h3>
          {description && (
            <p className="text-sm text-neutral-500 leading-snug mb-3">{description}</p>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 border border-neutral-200 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={onOpenCaseStudy}
            className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white text-sm font-bold px-4 py-2.5 transition-colors"
          >
            View Case Study
          </button>
        </div>
      </div>
    )
  }

  if (demoUrl && onOpenDemo) {
    return (
      <div {...tiltProps} className="group h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1B2E]">
          <ResponsiveDemoPreview
            url={demoUrl}
            baseHeight={960}
            fallbackScale={0.297}
          />
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 focus:bg-black/40 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset"
            onClick={onOpenDemo}
            aria-label={`Preview ${projectName} demo`}
          >
            <span className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 bg-white text-[#1B1B2E] text-sm font-bold px-5 py-2.5 flex items-center gap-2">
              Preview Demo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </button>
          <div className="absolute top-3 left-3">
            <span className="bg-[#E63946] text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest">
              Live Demo
            </span>
          </div>
        </div>
        <div className="px-4 pt-4 pb-5">
          <p className="text-accent font-bold text-xs uppercase tracking-widest mb-1">{category}</p>
          <h3 className="text-lg font-black text-[#0F0F0F] mb-1">{projectName}</h3>
          {description && (
            <p className="text-sm text-neutral-500 leading-snug mb-4">{description}</p>
          )}
          <button
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-bold px-4 py-2.5 transition-colors"
          >
            Preview Demo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  if (demoUrl) {
    return (
      <div {...tiltProps} className="group h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1B2E]">
          <ResponsiveDemoPreview
            url={demoUrl}
            baseHeight={960}
            fallbackScale={0.297}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-3 left-3">
            <span className="bg-[#E63946] text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest">
              Live Demo
            </span>
          </div>
        </div>
        <div className="px-4 pt-4 pb-5">
          <p className="text-accent font-bold text-xs uppercase tracking-widest mb-1">{category}</p>
          <h3 className="text-lg font-black text-[#0F0F0F] mb-1">{projectName}</h3>
          {description && (
            <p className="text-sm text-neutral-500 leading-snug">{description}</p>
          )}
        </div>
      </div>
    )
  }

  if (imageUrl) {
    return (
      <div {...tiltProps} className="group h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0F0F0F]">
          <Image
            src={imageUrl}
            alt={imageAlt ?? `${projectName} artwork`}
            fill
            priority
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-[#0F8F46] text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest">
              {cardLabel ?? 'Project'}
            </span>
          </div>
        </div>
        <div className="px-4 pt-4 pb-5">
          <p className="text-accent font-bold text-xs uppercase tracking-widest mb-1">{category}</p>
          <h3 className="text-lg font-black text-[#0F0F0F] mb-1">{projectName}</h3>
          {description && (
            <p className="text-sm text-neutral-500 leading-snug mb-3">{description}</p>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 border border-neutral-200 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div {...tiltProps} className="group h-full">
      <div className={cn('relative aspect-[4/3] bg-gradient-to-br overflow-hidden', gradientFrom, gradientTo)}>
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="200" cy="150" r="120" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="150" r="80" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="150" r="40" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="200" cy="150" r="10" fill="white" opacity="0.5" />
        </svg>
        {isComingSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      <div className="px-4 pt-4 pb-5">
        <p className="text-accent font-bold text-xs uppercase tracking-widest mb-1">{category}</p>
        <h3 className="text-lg font-black text-[#0F0F0F]">{projectName}</h3>
      </div>
    </div>
  )
}
