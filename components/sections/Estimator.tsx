'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { track } from '@/lib/analytics'
import { submitToWeb3Forms, Web3FormsNotConfiguredError } from '@/lib/web3forms'
import { PRICING_TIERS, GUARANTEE, FOUNDING_CLIENT_NOTE, type PricingTier } from '@/lib/data'
import { cn } from '@/lib/utils'

const PAGES_OPTIONS = [
  '1 to 3 (home, services, contact)',
  '4 to 6 (separate service pages, about, blog)',
  '7 or more',
  'Not sure yet',
] as const
type PagesAnswer = (typeof PAGES_OPTIONS)[number]
const [PAGES_1_3, PAGES_4_6, PAGES_7_PLUS] = PAGES_OPTIONS

const FEATURES_OPTIONS = [
  'No, a contact form is enough',
  'Booking, scheduling, or a lead-capture workflow',
  'Online ordering, e-commerce, or multiple locations',
] as const
type FeaturesAnswer = (typeof FEATURES_OPTIONS)[number]
const [, FEATURES_BOOKING, FEATURES_ECOMMERCE] = FEATURES_OPTIONS

const BLOG_OPTIONS = ['Yes', 'No'] as const
type BlogAnswer = (typeof BLOG_OPTIONS)[number]

const AI_OPTIONS = ['Yes', 'Not right now'] as const
type AiAnswer = (typeof AI_OPTIONS)[number]

type Answers = {
  pages: PagesAnswer | null
  features: FeaturesAnswer | null
  blog: BlogAnswer | null
  ai: AiAnswer | null
}

const EMPTY_ANSWERS: Answers = { pages: null, features: null, blog: null, ai: null }

type EstimateResult = {
  tier: PricingTier['tier']
  notSureNote?: string
}

/**
 * Deterministic tier mapping, checked in priority order. Online ordering or
 * multiple locations always wins Custom regardless of anything else, booking
 * or a large site wins Premium, and so on down to the Starter default.
 */
function computeResult(answers: Answers): EstimateResult {
  const { pages, features, blog } = answers

  if (features === FEATURES_ECOMMERCE) {
    return { tier: 'Custom' }
  }
  if (features === FEATURES_BOOKING || pages === PAGES_7_PLUS) {
    return { tier: 'Premium' }
  }
  if (pages === PAGES_4_6 || blog === 'Yes') {
    return { tier: 'Standard' }
  }
  if (pages === PAGES_1_3) {
    return { tier: 'Starter' }
  }
  // Only remaining case: pages is "Not sure yet" and nothing above matched.
  return {
    tier: 'Standard',
    notSureNote: 'Standard fits most local businesses. A quick call will confirm it.',
  }
}

const fieldClass =
  'w-full rounded-xl border border-hairline bg-bg px-4 py-3 text-graphite placeholder:text-graphite-soft/60 transition-colors focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40'

type QuestionGroupProps<T extends string> = {
  legend: string
  name: string
  options: readonly T[]
  value: T | null
  onChange: (value: T) => void
  columns?: 1 | 2
}

function QuestionGroup<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  columns = 2,
}: QuestionGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-graphite">{legend}</legend>
      <div className={cn('grid gap-3', columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1')}>
        {options.map((option) => {
          const checked = value === option
          return (
            <label
              key={option}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-snug transition-colors',
                checked
                  ? 'border-accent bg-accent/5 text-graphite'
                  : 'border-hairline bg-bg text-graphite-soft hover:border-accent/40'
              )}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                required
                className="mt-0.5 h-4 w-4 flex-shrink-0 accent-accent"
              />
              <span>{option}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

type EmailStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Estimator() {
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS)
  const [result, setResult] = useState<EstimateResult | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle')
  const [emailError, setEmailError] = useState<string | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!answers.pages || !answers.features || !answers.blog || !answers.ai) {
      setFormError('Answer all four questions to see your estimate.')
      return
    }

    setFormError(null)
    const computed = computeResult(answers)
    setResult(computed)
    track('estimate_complete', { tier: computed.tier })
  }

  function handleStartOver() {
    setAnswers(EMPTY_ANSWERS)
    setResult(null)
    setFormError(null)
    setEmail('')
    setEmailStatus('idle')
    setEmailError(null)
  }

  async function handleEmailSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!result) return

    setEmailStatus('submitting')
    setEmailError(null)

    // An unchecked checkbox is absent from FormData, so a present `botcheck` means
    // something filled a field no human can see. Web3Forms rejects the submission.
    // This payload is built from state rather than the form, so unlike
    // RequestCallForm the field has to be read across explicitly.
    const botcheck = new FormData(event.currentTarget).get('botcheck')

    try {
      await submitToWeb3Forms({
        subject: `Estimate request: ${result.tier}`,
        from_name: 'Render website',
        ...(botcheck ? { botcheck } : {}),
        email,
        estimated_tier: result.tier,
        pages: answers.pages,
        features: answers.features,
        blog: answers.blog,
        ai_interest: answers.ai,
      })
      setEmailStatus('success')
    } catch (err) {
      setEmailStatus('error')
      setEmailError(
        err instanceof Web3FormsNotConfiguredError
          ? 'This form is not connected yet. Email us at support@renderlocalwebsites.com and we will get right back to you.'
          : 'Something went wrong sending that. Email us at support@renderlocalwebsites.com and we will pick it up from there.'
      )
    }
  }

  const tierData = result ? PRICING_TIERS.find((item) => item.tier === result.tier) : undefined

  return (
    <section className="py-20 md:py-32 bg-bg">
      <div className="container-studio">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-4 text-xs text-accent-dark">Instant Estimate</p>
          <h1 className="text-display-xl text-graphite mb-4">What will your website cost?</h1>
          <p className="text-lg text-graphite-soft leading-relaxed">
            Every price on this site is already published. Answer four questions and we will tell
            you which package fits, right now. No email required, no call needed.
          </p>
        </div>

        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="rounded-card border border-hairline bg-surface p-6 md:p-8 space-y-8">
            <QuestionGroup
              legend="How many pages do you need?"
              name="pages"
              options={PAGES_OPTIONS}
              value={answers.pages}
              onChange={(value) => setAnswers((prev) => ({ ...prev, pages: value }))}
            />
            <QuestionGroup
              legend="Do you need any of these?"
              name="features"
              options={FEATURES_OPTIONS}
              value={answers.features}
              onChange={(value) => setAnswers((prev) => ({ ...prev, features: value }))}
              columns={1}
            />
            <QuestionGroup
              legend="Do you want a blog or news section?"
              name="blog"
              options={BLOG_OPTIONS}
              value={answers.blog}
              onChange={(value) => setAnswers((prev) => ({ ...prev, blog: value }))}
            />
            <QuestionGroup
              legend="Interested in AI automation (missed-call follow-up, review requests, after-hours replies)?"
              name="ai"
              options={AI_OPTIONS}
              value={answers.ai}
              onChange={(value) => setAnswers((prev) => ({ ...prev, ai: value }))}
            />

            {formError && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                {formError}
              </p>
            )}

            <div>
              <Button type="submit" variant="primary" size="lg" fullWidth>
                See My Estimate
              </Button>
              {result && (
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="mt-4 w-full text-center text-sm font-medium text-graphite-soft hover:text-accent transition-colors"
                >
                  Start over
                </button>
              )}
            </div>
          </form>

          <div aria-live="polite" className="mt-8">
            {result && tierData && (
              <div className="rounded-card border border-hairline bg-surface p-6 md:p-8">
                <p className="eyebrow mb-2 text-xs text-accent-dark">Your Estimate</p>
                <h2 className="text-2xl font-semibold text-graphite mb-1">{tierData.tier}</h2>
                <p className="font-display mb-1 flex items-baseline gap-2 text-3xl font-semibold text-graphite">
                  {tierData.standardPrice && (
                    <s className="text-lg font-medium text-graphite-soft/60">
                      <span className="sr-only">Regular price </span>
                      {tierData.standardPrice}
                    </s>
                  )}
                  <span>
                    {tierData.standardPrice && <span className="sr-only">Founding client price </span>}
                    {tierData.priceRange}
                  </span>
                </p>
                <p className="text-sm text-graphite-soft mb-5">
                  {tierData.tier === 'Custom' ? tierData.monthlyRange : `+ ${tierData.monthlyRange} maintenance`}
                </p>

                <p className="text-graphite-soft leading-relaxed mb-5">{tierData.summary}</p>

                {result.notSureNote && (
                  <p className="mb-5 rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-graphite">
                    {result.notSureNote}
                  </p>
                )}

                {tierData.tier === 'Custom' && (
                  <p className="mb-5 text-sm text-graphite-soft">
                    A project like this is scoped with you. You still get a fixed number before
                    you commit, never a vague quote.
                  </p>
                )}

                <ul className="space-y-3 mb-6">
                  {tierData.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <svg
                        className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-graphite-soft">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="primary" size="lg" href={tierData.ctaHref} fullWidth>
                  {tierData.ctaLabel}
                </Button>

                <p className="mt-5 text-sm font-medium text-accent-dark">{GUARANTEE.long}</p>

                {tierData.tier !== 'Custom' && (
                  <p className="mt-2 text-xs text-graphite-soft">{FOUNDING_CLIENT_NOTE}</p>
                )}

                {answers.ai === 'Yes' && (
                  <p className="mt-5 text-sm text-graphite-soft">
                    AI automation is scoped separately, with a fixed number before you commit.{' '}
                    <Link href="/services/ai-automation" className="font-medium text-accent hover:text-accent-dark">
                      Learn about AI automation
                    </Link>
                    .
                  </p>
                )}

                <div className="mt-8 border-t border-hairline pt-6">
                  {emailStatus === 'success' ? (
                    <p role="status" className="text-sm text-graphite-soft">
                      Got it. We&apos;ll email your estimate within a business day.
                    </p>
                  ) : (
                    <form onSubmit={handleEmailSubmit} className="space-y-3">
                      {/* Web3Forms honeypot. Real people never see or check this. */}
                      <input
                        type="checkbox"
                        name="botcheck"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden="true"
                      />

                      <label htmlFor="estimate-email" className="block text-sm font-semibold text-graphite">
                        Want this in your inbox? <span className="font-normal text-graphite-soft">(optional)</span>
                      </label>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          id="estimate-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="jane@yourbusiness.com"
                          className={fieldClass}
                        />
                        <Button
                          type="submit"
                          variant="secondary"
                          size="md"
                          disabled={emailStatus === 'submitting'}
                        >
                          {emailStatus === 'submitting' ? 'Sending...' : 'Email Me This Estimate'}
                        </Button>
                      </div>
                      {emailStatus === 'error' && emailError && (
                        <p role="alert" className="text-sm text-red-800">
                          {emailError}
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
