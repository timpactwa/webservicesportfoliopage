'use client'

import Link from 'next/link'
import { useTilt } from '@/hooks/useTilt'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>({ max: 8, perspective: 700 })

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transition: 'transform 150ms ease-out, box-shadow 300ms ease, border-color 300ms ease',
        transformStyle: 'preserve-3d',
      }}
      className="group relative rounded-card border border-hairline bg-surface p-8 md:p-10 hover:shadow-card-hover hover:border-accent/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), oklch(0.60 0.13 190 / 0.12), transparent 60%)',
        }}
      />
      <div className="relative">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-dark">
          {icon}
        </div>
        <h3 className="mb-3 text-2xl font-semibold text-graphite">{title}</h3>
        <p className="mb-6 text-base leading-relaxed text-graphite-soft">{description}</p>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 group-hover:gap-2"
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
