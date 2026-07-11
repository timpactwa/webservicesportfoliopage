'use client'

import { useState } from 'react'
import DemoModal from '@/components/ui/DemoModal'

/**
 * Live demo preview for the bottom of the homepage web-design card. Shows the real
 * deployed site shrunk into the card, then opens the shared full-screen DemoModal
 * (with its render-in flourish) on click.
 *
 * The iframe is deliberately non-interactive and deferred: pointer-events are off
 * and a button overlays it, so a click always opens the modal rather than landing
 * inside the embedded site; loading="lazy" keeps the external site off the initial
 * paint so it doesn't drag down the homepage's own speed score. The 200% size with
 * scale(0.5) gives the embed an effective viewport of twice the card width at every
 * breakpoint, so the shrink stays consistent instead of showing a zoomed-in corner.
 */
export default function DemoIframePreview({ url, title }: { url: string; title: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="group/preview relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-hairline bg-surface">
        <iframe
          src={url}
          title={`${title} preview`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: '200%',
            height: '200%',
            transform: 'scale(0.5)',
            border: 0,
            pointerEvents: 'none',
          }}
        />

        <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-graphite shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          Live demo
        </span>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="absolute inset-0 flex items-end justify-center bg-graphite/0 transition-colors duration-300 hover:bg-graphite/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-graphite px-3.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-card transition-opacity duration-300 group-hover/preview:opacity-100">
            Open live demo
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="sr-only">Open the {title} live demo</span>
        </button>
      </div>

      <DemoModal url={url} title={title} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
