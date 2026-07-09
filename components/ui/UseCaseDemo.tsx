'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type UseCase = {
  title: string
  description: string
}

// One id for the single demo panel that opens beneath the row. Only one card is
// open at a time, so a shared id is enough for the aria-controls wiring.
const PANEL_ID = 'home-usecase-demo'

// The captured-lead fields shown on the right of the demo. This is one
// illustrative missed-call scenario used as a stand-in for every homepage card.
// It is not a recording of a real customer and carries no invented metrics. The
// full, per-case version lives on /services/ai-automation.
const CAPTURED_FIELDS: { label: string; value: string }[] = [
  { label: 'Service', value: 'Roof repair' },
  { label: 'Urgency', value: 'ASAP' },
  { label: 'Callback', value: 'Tomorrow, 7 AM' },
]

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3 w-3 translate-x-[1px]">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-3 w-3">
      <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
    </svg>
  )
}

/**
 * Two-panel "call demo" artifact that opens beneath the AI use-case cards.
 * Left: a mock, non-functional audio player (plays no audio). Right: the fields
 * a missed-call reply would capture. The same illustrative example is shown for
 * every card; the caption says so rather than implying bespoke per-case data.
 */
export default function UseCaseDemo({ useCase, id = PANEL_ID }: { useCase: UseCase; id?: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      id={id}
      role="region"
      aria-label={`Example demo, opened from ${useCase.title}`}
      className="mt-4 rounded-card border border-hairline bg-surface p-4 sm:p-5"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* LEFT: mock call player (no real audio) */}
        <div className="rounded-2xl bg-bg p-5">
          <p className="eyebrow text-[10px] text-accent-dark">Call demo</p>
          <p className="mt-1 font-display text-[15px] font-semibold text-graphite">
            A missed call, answered anyway
          </p>
          <div className="mt-3 flex items-center gap-3 rounded-full border border-hairline bg-surface px-3.5 py-2">
            <button
              type="button"
              aria-label={playing ? 'Pause sample call' : 'Play sample call'}
              aria-pressed={playing}
              onClick={() => setPlaying((p) => !p)}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-dark text-white transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <span className="text-[11px] tabular-nums text-graphite-soft">0:00 / 0:28</span>
            <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-hairline">
              <span
                className={cn(
                  'absolute inset-y-0 left-0 rounded-full bg-accent',
                  playing &&
                    'transition-[width] duration-[28000ms] ease-linear motion-reduce:transition-none motion-reduce:duration-0'
                )}
                style={{ width: playing ? '100%' : '0%' }}
              />
            </span>
          </div>
          <p className="mt-2.5 text-[11px] leading-relaxed text-graphite-soft">
            Instant reply, then a summary lands in your inbox.
          </p>
        </div>

        {/* RIGHT: what the reply captured */}
        <div className="rounded-2xl bg-bg p-5">
          <p className="eyebrow text-[10px] text-accent-dark">What it captured</p>
          <dl className="mt-2">
            {CAPTURED_FIELDS.map((field, i) => (
              <div
                key={field.label}
                className={cn(
                  'flex items-center justify-between py-1.5 text-[13px]',
                  i < CAPTURED_FIELDS.length - 1 && 'border-b border-hairline'
                )}
              >
                <dt className="text-graphite-soft">{field.label}</dt>
                <dd className="font-semibold text-graphite">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-graphite-soft">
        Illustrative example, not a recording of a real customer. This missed-call
        scenario is shown as a stand-in for each use case above. The player is a mock
        and plays no audio.
      </p>
    </div>
  )
}

/**
 * Interactive island for the homepage "AI in practice" row. Renders the AI
 * use-case cards as real buttons and opens the shared demo panel beneath the row
 * for the selected card. Only one is open at a time; clicking the open card again
 * collapses it.
 */
export function AiUseCasesInteractive({ useCases }: { useCases: UseCase[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  const active = useCases.find((useCase) => useCase.title === selected) ?? null

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {useCases.map((useCase) => {
          const isOpen = selected === useCase.title
          return (
            <button
              key={useCase.title}
              type="button"
              aria-expanded={isOpen}
              aria-controls={PANEL_ID}
              onClick={() =>
                setSelected((prev) => (prev === useCase.title ? null : useCase.title))
              }
              className={cn(
                'group flex h-full w-full flex-col rounded-card border p-6 text-left transition-[border-color,background-color,box-shadow] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                isOpen
                  ? 'border-[1.5px] border-accent bg-accent-soft/35'
                  : 'border-hairline bg-surface hover:border-accent/40 hover:shadow-card-hover'
              )}
            >
              <span className="font-display text-[15px] font-semibold text-graphite">
                {useCase.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-graphite-soft">
                {useCase.description}
              </span>
              {isOpen && (
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-accent-dark">
                  Showing example <span aria-hidden="true">&darr;</span>
                </span>
              )}
            </button>
          )
        })}
      </div>

      {active && <UseCaseDemo useCase={active} />}
    </div>
  )
}
