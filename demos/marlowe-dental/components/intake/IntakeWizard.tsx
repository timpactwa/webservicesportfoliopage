'use client'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { INSURERS, VISIT_REASONS, PRACTICE } from '@/lib/data'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/icons'

/* ────────────────────────── constants ────────────────────────── */

const STEPS = ['About you', 'Health basics', 'Scheduling', 'Contact', 'Review'] as const

const LAST_VISIT = ['Within a year', '1–3 years ago', '3+ years ago', 'Honestly, not sure']
const CONCERNS = [
  'Dental anxiety',
  'Sensitive teeth',
  'Bleeding gums',
  'Jaw pain / grinding',
  'Snoring / sleep',
  'None of these',
]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const TIMES_OF_DAY = ['Morning (8–11)', 'Midday (11–2)', 'Afternoon (2–6)']
const URGENCY = ['Next few days', 'Within two weeks', 'Whenever fits']

// Service page links pass ?reason=<service slug>; map those to intake reasons.
const REASON_FROM_SERVICE: Record<string, string> = {
  preventive: 'Cleaning & checkup',
  restorative: 'Chipped or broken tooth',
  cosmetic: 'Cosmetic consultation',
  family: 'Cleaning & checkup',
  emergency: 'Tooth pain or sensitivity',
  anxiety: 'New to the area',
}

type Form = {
  patientType: string // New patient | Returning patient
  patientFor: string // Myself | My child | Myself + family
  reason: string
  lastVisit: string
  concerns: string[]
  insurance: string
  days: string[]
  timeOfDay: string
  urgency: string
  name: string
  phone: string
  email: string
  notes: string
}

const EMPTY: Form = {
  patientType: 'New patient',
  patientFor: '',
  reason: '',
  lastVisit: '',
  concerns: [],
  insurance: '',
  days: [],
  timeOfDay: '',
  urgency: '',
  name: '',
  phone: '',
  email: '',
  notes: '',
}

const slide = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2, ease: 'easeIn' } },
}

/* ────────────────────────── arc progress ────────────────────────── */

function ArcProgress({ step }: { step: number }) {
  const progress = (step + 1) / STEPS.length
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <svg viewBox="0 0 180 32" width="160" height="28" fill="none">
        <path
          d="M6 6c28 18 60 20 84 20s56-2 84-20"
          stroke="#D8E7EB"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <motion.path
          d="M6 6c28 18 60 20 84 20s56-2 84-20"
          stroke="#6FA48F"
          strokeWidth="4"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: progress }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}

/* ────────────────────────── field primitives ────────────────────────── */

function Pills({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-petrol mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`px-4 py-2.5 text-sm font-medium rounded-full border transition-colors cursor-pointer ${
                active
                  ? 'bg-petrol text-porcelain border-petrol'
                  : 'bg-white text-petrol border-petrol/20 hover:border-petrol/50'
              }`}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function MultiPills({
  legend,
  hint,
  options,
  values,
  onChange,
  exclusive,
}: {
  legend: string
  hint?: string
  options: string[]
  values: string[]
  onChange: (v: string[]) => void
  exclusive?: string // option that clears the others (e.g. "None of these")
}) {
  const toggle = (opt: string) => {
    if (exclusive && opt === exclusive) {
      onChange(values.includes(opt) ? [] : [opt])
      return
    }
    const without = values.filter((v) => v !== opt && v !== exclusive)
    onChange(values.includes(opt) ? without : [...without, opt])
  }
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-petrol mb-1">{legend}</legend>
      {hint && <p className="text-xs text-stone mb-3">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = values.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full border transition-colors cursor-pointer ${
                active
                  ? 'bg-sage text-petrolDeep border-sage'
                  : 'bg-white text-petrol border-petrol/20 hover:border-petrol/50'
              }`}
            >
              {active && <CheckIcon className="w-3.5 h-3.5" />}
              {opt}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-petrol mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-petrol/20 rounded-2xl px-4 py-3 text-petrol placeholder:text-stone/50 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/30 transition-colors"
      />
    </div>
  )
}

/* ────────────────────────── the wizard ────────────────────────── */

export default function IntakeWizard() {
  const params = useSearchParams()
  const fromService = REASON_FROM_SERVICE[params.get('reason') ?? ''] ?? ''

  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(() => ({ ...EMPTY, reason: fromService }))
  const [confirmed, setConfirmed] = useState(false)

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const phoneValid = form.phone.replace(/\D/g, '').length >= 10

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return form.patientFor !== '' && form.reason !== ''
      case 1:
        return form.lastVisit !== '' && form.insurance !== ''
      case 2:
        return form.days.length > 0 && form.timeOfDay !== '' && form.urgency !== ''
      case 3:
        return form.name.trim().length > 1 && emailValid && phoneValid
      default:
        return true
    }
  }, [step, form, emailValid, phoneValid])

  /* ── confirmation ── */
  if (confirmed) {
    return (
      <div className="bg-white border border-petrol/10 rounded-3xl p-10 md:p-14 text-center">
        <motion.svg
          viewBox="0 0 180 60"
          width="200"
          className="mx-auto mb-8"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M6 10c28 18 60 20 84 20s56-2 84-20"
            stroke="#6FA48F"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          <motion.path
            d="M74 44l10 10 22-22"
            stroke="#0F3B43"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
          />
        </motion.svg>
        <h2 className="font-display text-4xl text-petrol mb-4">
          Request received, {form.name.split(' ')[0]}.
        </h2>
        <p className="text-stone max-w-md mx-auto leading-relaxed mb-8">
          The front desk will call{' '}
          <span className="text-petrol font-semibold">{form.phone}</span> within one
          business day with appointment times that match your{' '}
          {form.days.join(', ')} preference. A copy of this request is on its way
          to {form.email}.
        </p>
        <div className="max-w-sm mx-auto bg-powder/40 rounded-2xl p-6 text-left mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-stone mb-3">Before your visit</p>
          <ul className="space-y-2 text-sm text-petrol">
            <li className="flex gap-2.5">
              <CheckIcon className="w-4 h-4 text-sage shrink-0 mt-0.5" />
              Bring your insurance card — we file everything for you
            </li>
            <li className="flex gap-2.5">
              <CheckIcon className="w-4 h-4 text-sage shrink-0 mt-0.5" />
              Arrive as you are — your paperwork is already done
            </li>
            <li className="flex gap-2.5">
              <CheckIcon className="w-4 h-4 text-sage shrink-0 mt-0.5" />
              Nervous? Say so when we call. We&apos;ll plan the visit around it
            </li>
          </ul>
        </div>
        <p className="text-sm text-stone">
          Something urgent?{' '}
          <a href={PRACTICE.phoneHref} className="text-petrol font-semibold underline underline-offset-4 decoration-sage/60">
            Call {PRACTICE.phone}
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-petrol/10 rounded-3xl overflow-hidden">
      {/* header */}
      <div className="px-6 md:px-10 pt-8 pb-6 border-b border-petrol/10 text-center">
        <ArcProgress step={step} />
        <p className="text-xs uppercase tracking-[0.25em] text-stone mt-3">
          {STEPS[step]} · step {step + 1} of {STEPS.length}
        </p>
      </div>

      {/* body */}
      <div className="px-6 md:px-10 py-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {/* ── STEP 1 · ABOUT YOU ── */}
          {step === 0 && (
            <motion.div key="about" variants={slide} initial="enter" animate="center" exit="exit" className="space-y-8">
              <div>
                <h2 className="font-display text-3xl text-petrol mb-2">
                  Let&apos;s get you in the chair.
                </h2>
                <p className="text-stone text-sm">
                  Two minutes now saves twenty on a clipboard in the waiting room.
                </p>
              </div>
              <Pills legend="Have you visited us before?" options={['New patient', 'Returning patient']} value={form.patientType} onChange={(v) => set('patientType', v)} />
              <Pills legend="Who is this visit for?" options={['Myself', 'My child', 'Myself + family']} value={form.patientFor} onChange={(v) => set('patientFor', v)} />
              <Pills legend="What brings you in?" options={VISIT_REASONS} value={form.reason} onChange={(v) => set('reason', v)} />
            </motion.div>
          )}

          {/* ── STEP 2 · HEALTH BASICS ── */}
          {step === 1 && (
            <motion.div key="health" variants={slide} initial="enter" animate="center" exit="exit" className="space-y-8">
              <div>
                <h2 className="font-display text-3xl text-petrol mb-2">A little history.</h2>
                <p className="text-stone text-sm">
                  No judgment on any answer here — we promise we&apos;ve heard it all.
                </p>
              </div>
              <Pills legend="When was your last dental visit?" options={LAST_VISIT} value={form.lastVisit} onChange={(v) => set('lastVisit', v)} />
              <MultiPills
                legend="Anything you'd like us to know about?"
                hint="Select all that apply."
                options={CONCERNS}
                values={form.concerns}
                onChange={(v) => set('concerns', v)}
                exclusive="None of these"
              />
              <Pills legend="Dental insurance" options={[...INSURERS, 'Other / no insurance']} value={form.insurance} onChange={(v) => set('insurance', v)} />
            </motion.div>
          )}

          {/* ── STEP 3 · SCHEDULING ── */}
          {step === 2 && (
            <motion.div key="schedule" variants={slide} initial="enter" animate="center" exit="exit" className="space-y-8">
              <div>
                <h2 className="font-display text-3xl text-petrol mb-2">When works for you?</h2>
                <p className="text-stone text-sm">
                  Tell us your windows and the front desk will call with exact times.
                </p>
              </div>
              <MultiPills
                legend="Which days usually work?"
                hint="Select all that apply. Saturdays run twice a month."
                options={DAYS}
                values={form.days}
                onChange={(v) => set('days', v)}
              />
              <Pills legend="Time of day" options={TIMES_OF_DAY} value={form.timeOfDay} onChange={(v) => set('timeOfDay', v)} />
              <Pills legend="How soon?" options={URGENCY} value={form.urgency} onChange={(v) => set('urgency', v)} />
            </motion.div>
          )}

          {/* ── STEP 4 · CONTACT ── */}
          {step === 3 && (
            <motion.div key="contact" variants={slide} initial="enter" animate="center" exit="exit">
              <h2 className="font-display text-3xl text-petrol mb-2">How do we reach you?</h2>
              <p className="text-stone text-sm mb-7">
                One call to schedule, one text to confirm. Nothing else, ever.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field id="name" label="Full name" value={form.name} onChange={(v) => set('name', v)} placeholder="Jordan Ellis" autoComplete="name" />
                <Field id="phone" label="Phone" type="tel" value={form.phone} onChange={(v) => set('phone', v)} placeholder="(973) 555-0100" autoComplete="tel" />
                <div className="sm:col-span-2">
                  <Field id="email" label="Email" type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="jordan@example.com" autoComplete="email" />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="notes" className="block text-sm font-semibold text-petrol mb-2">
                  Anything else we should know? <span className="text-stone font-normal">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="e.g. I'd like the same hygienist each visit, mornings before work are best…"
                  className="w-full bg-white border border-petrol/20 rounded-2xl px-4 py-3 text-petrol placeholder:text-stone/50 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/30 transition-colors resize-none"
                />
              </div>
              {form.email !== '' && !emailValid && (
                <p className="mt-4 text-sm text-red-700" role="alert">
                  That email doesn&apos;t look right — check for typos.
                </p>
              )}
              {form.phone !== '' && !phoneValid && (
                <p className="mt-2 text-sm text-red-700" role="alert">
                  We need a 10-digit phone number to call with appointment times.
                </p>
              )}
            </motion.div>
          )}

          {/* ── STEP 5 · REVIEW ── */}
          {step === 4 && (
            <motion.div key="review" variants={slide} initial="enter" animate="center" exit="exit">
              <h2 className="font-display text-3xl text-petrol mb-2">One last look.</h2>
              <p className="text-stone text-sm mb-7">
                Use Back to change anything — nothing is sent until you submit.
              </p>
              <dl className="bg-powder/30 rounded-2xl divide-y divide-petrol/10">
                {[
                  ['Patient', `${form.patientType} · ${form.patientFor}`],
                  ['Reason', form.reason],
                  ['Last visit', form.lastVisit],
                  ...(form.concerns.length > 0 ? ([['Flagged for us', form.concerns.join(', ')]] as [string, string][]) : []),
                  ['Insurance', form.insurance],
                  ['Availability', `${form.days.join(', ')} · ${form.timeOfDay}`],
                  ['Timing', form.urgency],
                  ['Contact', `${form.name} · ${form.phone}`],
                  ['Email', form.email],
                  ...(form.notes ? ([['Notes', form.notes]] as [string, string][]) : []),
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[130px_1fr] gap-4 px-6 py-3.5">
                    <dt className="text-xs uppercase tracking-[0.15em] text-stone pt-0.5">{k}</dt>
                    <dd className="text-sm text-petrol font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs text-stone mt-5">
                Submitting requests an appointment — the front desk confirms the
                exact time with you by phone before anything is booked.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* footer nav */}
      <div className="flex items-center justify-between border-t border-petrol/10 px-6 md:px-10 py-5 bg-porcelain/60">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className={`text-sm font-semibold px-4 py-3 rounded-full transition-colors ${
            step === 0 ? 'text-stone/40 cursor-not-allowed' : 'text-petrol hover:bg-powder/50 cursor-pointer'
          }`}
        >
          ← Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => stepValid && setStep((s) => s + 1)}
            disabled={!stepValid}
            className={`inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-colors ${
              stepValid
                ? 'bg-petrol text-porcelain hover:bg-petrolDeep cursor-pointer'
                : 'bg-petrol/10 text-stone/50 cursor-not-allowed'
            }`}
          >
            Continue <ArrowRightIcon className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmed(true)}
            className="inline-flex items-center gap-2 bg-sage text-petrolDeep text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-petrol hover:text-porcelain transition-colors cursor-pointer"
          >
            <CheckIcon className="w-4 h-4" /> Send my request
          </button>
        )}
      </div>
    </div>
  )
}
