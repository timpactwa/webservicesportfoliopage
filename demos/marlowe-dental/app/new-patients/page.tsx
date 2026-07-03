import type { Metadata } from 'next'
import { Suspense } from 'react'
import IntakeWizard from '@/components/intake/IntakeWizard'
import { PRACTICE } from '@/lib/data'

export const metadata: Metadata = {
  title: 'New Patients',
  description:
    'Request an appointment at Marlowe Dental Studio in Denville, NJ. Five quick questions — the front desk calls with times within one business day.',
}

export default function NewPatientsPage() {
  return (
    <div className="bg-porcelain min-h-screen relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-32 right-[-15%] w-[500px] h-[500px] rounded-full bg-powder/50 blur-[90px] pointer-events-none"
      />
      <div className="relative max-w-2xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-stone mb-4">
            New patients · Seen within a week
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-petrol leading-tight mb-4">
            Request a visit
          </h1>
          <p className="text-stone max-w-md mx-auto">
            Five quick questions. Prefer a voice?{' '}
            <a
              href={PRACTICE.phoneHref}
              className="text-petrol font-semibold underline underline-offset-4 decoration-sage/60"
            >
              {PRACTICE.phone}
            </a>{' '}
            reaches a person, not a phone tree.
          </p>
        </div>
        <Suspense fallback={<div className="h-[560px] bg-white border border-petrol/10 rounded-3xl animate-pulse" />}>
          <IntakeWizard />
        </Suspense>
      </div>
    </div>
  )
}
