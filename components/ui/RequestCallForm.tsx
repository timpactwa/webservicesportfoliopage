'use client'

import { useState } from 'react'
import Button from './Button'
import { track } from '@/lib/analytics'
import { submitToWeb3Forms, Web3FormsNotConfiguredError } from '@/lib/web3forms'

const NEEDS = [
  'New website',
  'Local SEO help',
  'AI automation',
  'Free homepage mockup',
  'Not sure yet',
] as const

// Map the deep links (hero "Get a Free Mockup", pricing card CTAs, the AI section
// CTA) onto a preselected need so the visitor never re-states what they just clicked.
function initialNeed(intent: CallIntent | null, tier: string | null): string {
  if (intent === 'mockup') return 'Free homepage mockup'
  if (intent === 'ai') return 'AI automation'
  if (intent === 'seo') return 'Local SEO help'
  if (tier) return 'New website'
  return ''
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass =
  'w-full rounded-xl border border-hairline bg-bg px-4 py-3 text-graphite placeholder:text-graphite-soft/60 transition-colors focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40'

const labelClass = 'mb-2 block text-sm font-semibold text-graphite'

export type CallIntent = 'mockup' | 'ai' | 'seo'

interface RequestCallFormProps {
  /** Preselects "New website" and tags the submission. */
  tier?: string | null
  /** Preselects the matching "What do you need?" option. */
  intent?: CallIntent | null
}

/**
 * Presentational on purpose. It reads no search params, so BookingModal, which
 * has no URL to read, can render it directly and pass the same two values as
 * props. RequestCallFormFromUrl supplies them from the query string on /contact.
 */
export default function RequestCallForm({ tier = null, intent = null }: RequestCallFormProps) {
  const [need, setNeed] = useState(() => initialNeed(intent, tier))
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      await submitToWeb3Forms({
        subject: `New Render inquiry: ${data.need || 'Unspecified'}${tier ? ` (${tier} tier)` : ''}`,
        from_name: 'Render website',
        ...data,
        ...(tier ? { pricing_tier_clicked: tier } : {}),
      })

      track('request_call_submit', {
        need: String(data.need || ''),
        ...(tier ? { tier } : {}),
      })
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(
        err instanceof Web3FormsNotConfiguredError
          ? 'This form is not connected yet. Email us at support@renderlocalwebsites.com and we will get right back to you.'
          : 'Something went wrong sending that. Email us at support@renderlocalwebsites.com and we will pick it up from there.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-card border border-hairline bg-surface p-8 text-center md:p-12"
      >
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h2 className="mb-3 text-2xl font-semibold text-graphite">Got it. Talk soon.</h2>
        <p className="mx-auto max-w-md leading-relaxed text-graphite-soft">
          Tim or Luke will email you within one business day to confirm a time that works. If it is
          urgent, reach us directly at{' '}
          <a
            href="mailto:support@renderlocalwebsites.com"
            className="font-medium text-accent hover:text-accent-dark"
          >
            support@renderlocalwebsites.com
          </a>
          .
        </p>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-hairline bg-surface p-6 md:p-8"
      noValidate={false}
    >
      {/* Web3Forms honeypot. Real people never see or check this. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Rivera"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@yourbusiness.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="need" className={labelClass}>
          What do you need?
        </label>
        <div className="relative">
          <select
            id="need"
            name="need"
            required
            value={need}
            onChange={(event) => setNeed(event.target.value)}
            className={`${fieldClass} appearance-none pr-11`}
          >
            <option value="" disabled>
              Select one
            </option>
            {NEEDS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-soft"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="preferred_times" className={labelClass}>
          When are you free to talk?
        </label>
        <input
          id="preferred_times"
          name="preferred_times"
          type="text"
          required
          placeholder="e.g. Tuesday mornings, or Wednesday after 3pm"
          className={fieldClass}
        />
        <p className="mt-2 text-sm text-graphite-soft">
          Give us a window or two. We will confirm an exact time by email.
        </p>
      </div>

      <div className="mt-5">
        <label htmlFor="details" className={labelClass}>
          Anything else?{' '}
          <span className="font-normal text-graphite-soft">(optional)</span>
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Your business, your current site if you have one, what you are hoping to fix."
          className={`${fieldClass} resize-y`}
        />
      </div>

      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="mt-7">
        <Button type="submit" variant="primary" size="lg" disabled={submitting} fullWidth>
          {submitting ? 'Sending...' : 'Request My Call'}
        </Button>
        <p className="mt-4 text-center text-sm text-graphite-soft">
          No calendar to wrestle with. No sales pitch. We reply within one business day.
        </p>
      </div>
    </form>
  )
}
