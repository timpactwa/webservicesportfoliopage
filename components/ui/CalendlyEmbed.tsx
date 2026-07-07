'use client'

import { useState } from 'react'

// Click-to-load facade: the Calendly widget is ~1MB of third-party JS/CSS,
// so it only mounts after an explicit click instead of on page load.
export default function CalendlyEmbed({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <iframe
        src={url}
        width="100%"
        height="700"
        style={{ minWidth: '320px', border: 'none' }}
        title="Schedule a free consultation with Render"
      />
    )
  }

  return (
    <div className="flex h-[700px] min-w-[320px] flex-col items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 px-6 text-center">
      <svg
        className="mb-5 h-12 w-12 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3M5 11h14M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
        />
      </svg>
      <h3 className="mb-2 text-2xl font-black text-charcoal">Choose a time</h3>
      <p className="mb-6 max-w-sm text-neutral-600">
        Free 45-minute consultation. Pick any open slot on the calendar and we&apos;ll send the
        meeting details right away.
      </p>
      <button
        onClick={() => setLoaded(true)}
        className="cursor-pointer rounded-lg bg-accent px-8 py-4 text-base font-bold text-white transition-colors duration-200 hover:bg-accent-dark"
      >
        Show available times
      </button>
    </div>
  )
}
