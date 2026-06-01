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
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>()

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transition: 'transform 150ms ease-out, box-shadow 300ms ease, border-color 300ms ease',
        willChange: 'transform',
      }}
      className="relative bg-white border border-neutral-200 p-8 md:p-10 hover:shadow-card-hover hover:border-accent/30 group"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(37,99,235,0.10), transparent 60%)',
        }}
      />
      <div className="relative">
        <div className="w-12 h-12 bg-blue-50 flex items-center justify-center text-accent mb-6">
          {icon}
        </div>
        <h3 className="text-2xl font-black text-charcoal mb-3">{title}</h3>
        <p className="text-neutral-600 text-base leading-relaxed mb-6">{description}</p>
        <Link
          href={href}
          className="text-accent font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
