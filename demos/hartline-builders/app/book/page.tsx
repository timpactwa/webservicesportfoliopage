import type { Metadata } from 'next'
import { Suspense } from 'react'
import BookingWizard from '@/components/booking/BookingWizard'
import { COMPANY } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Book a Free Estimate',
  description:
    'Schedule a free on-site estimate with Hartline Builders. Pick a service, a date, and a time. Written estimate within five business days.',
}

export default function BookPage() {
  return (
    <div className="bg-paper min-h-screen relative">
      <div className="absolute inset-0 bg-paper-grid bg-grid pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-graphite mb-4">
            Free · On-site · No obligation
          </p>
          <h1 className="font-display uppercase font-bold text-5xl md:text-6xl text-ink leading-none mb-4">
            Book an estimate
          </h1>
          <p className="text-graphite max-w-md mx-auto">
            Five quick steps. Prefer a person? Call{' '}
            <a
              href={COMPANY.phoneHref}
              className="text-prussian font-semibold underline underline-offset-4 decoration-hivis"
            >
              {COMPANY.phone}
            </a>{' '}
            ({COMPANY.hours.toLowerCase()}).
          </p>
        </div>
        <Suspense fallback={<div className="h-[560px] bg-white border border-prussian/20 animate-pulse" />}>
          <BookingWizard />
        </Suspense>
      </div>
    </div>
  )
}
