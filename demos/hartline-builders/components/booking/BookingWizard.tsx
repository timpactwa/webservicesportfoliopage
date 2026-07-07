'use client'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { SERVICES, COMPANY } from '@/lib/data'
import { SERVICE_ICONS, CheckIcon, ArrowRightIcon } from '@/components/ui/icons'

/* ────────────────────────── types & constants ────────────────────────── */

const STEPS = ['Service', 'Details', 'Schedule', 'Contact', 'Review'] as const

const PROPERTY_TYPES = ['Single family', 'Townhouse', 'Condo', 'Multi-family']
const TIMELINES = ['As soon as possible', 'Next 1–3 months', 'Next 3–6 months', 'Just planning']
const BUDGETS = ['Under $15k', '$15k – $40k', '$40k – $100k', '$100k+', 'Not sure yet']
const TIME_SLOTS = ['8:00 AM', '10:00 AM', '1:00 PM', '3:00 PM']

type Form = {
  service: string
  propertyType: string
  timeline: string
  budget: string
  description: string
  date: string // ISO yyyy-mm-dd
  slot: string
  name: string
  email: string
  phone: string
  address: string
}

const EMPTY: Form = {
  service: '',
  propertyType: '',
  timeline: '',
  budget: '',
  description: '',
  date: '',
  slot: '',
  name: '',
  email: '',
  phone: '',
  address: '',
}

type Day = { iso: string; weekday: string; label: string }

/** Next 14 available days (Mon–Sat). Generated on the client after mount. */
function upcomingDays(): Day[] {
  const days: Day[] = []
  const d = new Date()
  d.setDate(d.getDate() + 1)
  while (days.length < 14) {
    if (d.getDay() !== 0) {
      days.push({
        iso: d.toISOString().slice(0, 10),
        weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
        label: d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' }),
      })
    }
    d.setDate(d.getDate() + 1)
  }
  return days
}

/** Deterministic pseudo-availability so the calendar feels real. */
function slotTaken(iso: string, slot: string): boolean {
  let h = 0
  const s = iso + slot
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997
  return h % 4 === 0
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

const slide = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.2, ease: 'easeIn' } },
}

/* ────────────────────────── field primitives ────────────────────────── */

function ChipGroup({
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
      <legend className="font-mono text-xs uppercase tracking-widest text-graphite mb-3">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={`min-h-[44px] px-4 py-2.5 text-sm font-semibold border transition-colors cursor-pointer ${
                active
                  ? 'bg-prussian text-paper border-prussian'
                  : 'bg-white text-ink border-prussian/25 hover:border-prussian/60'
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

function TextField({
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
      <label htmlFor={id} className="block font-mono text-xs uppercase tracking-widest text-graphite mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-prussian/25 px-4 py-3 text-ink placeholder:text-graphite/50 focus:outline-none focus:border-prussian focus:ring-2 focus:ring-hivis/40 transition-colors"
      />
    </div>
  )
}

/* ────────────────────────── the wizard ────────────────────────── */

export default function BookingWizard() {
  const params = useSearchParams()
  const preselect = params.get('service')

  const [step, setStep] = useState(0)
  const [form, setForm] = useState<Form>(() => ({
    ...EMPTY,
    service: SERVICES.some((s) => s.slug === preselect) ? preselect! : '',
  }))
  const [days, setDays] = useState<Day[]>([])
  const [confirmed, setConfirmed] = useState(false)
  const [orderNo, setOrderNo] = useState('')

  useEffect(() => {
    setDays(upcomingDays())
  }, [])

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const service = SERVICES.find((s) => s.slug === form.service)

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  const phoneValid = form.phone.replace(/\D/g, '').length >= 10

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return form.service !== ''
      case 1:
        return form.propertyType !== '' && form.timeline !== '' && form.budget !== ''
      case 2:
        return form.date !== '' && form.slot !== ''
      case 3:
        return form.name.trim().length > 1 && emailValid && phoneValid && form.address.trim().length > 3
      default:
        return true
    }
  }, [step, form, emailValid, phoneValid])

  const confirm = () => {
    setOrderNo(`HB-${String(Date.now()).slice(-4)}`)
    setConfirmed(true)
  }

  /* ── confirmation screen ── */
  if (confirmed) {
    return (
      <div className="relative bg-white border border-prussian/20 p-10 md:p-14 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.6, rotate: -14 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.15 }}
          className="inline-block border-4 border-prussian text-prussian font-display uppercase font-bold text-3xl md:text-4xl tracking-[0.2em] px-8 py-3 mb-8"
          aria-hidden="true"
        >
          Received
        </motion.div>
        <h2 className="font-display uppercase font-bold text-4xl text-ink mb-3">
          Work order {orderNo} is in.
        </h2>
        <p className="text-graphite max-w-md mx-auto mb-8 leading-relaxed">
          {form.name.split(' ')[0]}, we&apos;ve got your{' '}
          <span className="text-ink font-semibold">{service?.name.toLowerCase()}</span> visit down for{' '}
          <span className="text-ink font-semibold">
            {formatDate(form.date)} at {form.slot}
          </span>
          . A confirmation is headed to {form.email}, and we&apos;ll call the day
          before to confirm.
        </p>
        <div className="max-w-sm mx-auto border border-dashed border-prussian/30 p-5 text-left mb-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-graphite mb-3">
            What happens next
          </p>
          <ol className="space-y-2 text-sm text-ink">
            <li className="flex gap-3"><span className="font-mono text-prussian">1.</span> We walk the project with you (30–45 min)</li>
            <li className="flex gap-3"><span className="font-mono text-prussian">2.</span> Written line-item estimate within 5 business days</li>
            <li className="flex gap-3"><span className="font-mono text-prussian">3.</span> You decide, with no follow-up pressure calls</li>
          </ol>
        </div>
        <p className="font-mono text-xs text-graphite">
          Need to change it? Call{' '}
          <a href={COMPANY.phoneHref} className="text-prussian underline underline-offset-4">
            {COMPANY.phone}
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-prussian/20">
      {/* sheet header / progress */}
      <div className="border-b border-prussian/20 px-6 md:px-10 pt-6 pb-0">
        <div className="flex items-center justify-between mb-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-graphite">
            Estimate request · Form HB-01
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-prussian">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
        <ol className="flex" aria-label="Booking progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex-1">
              <div
                aria-hidden="true"
                className={`h-1 mb-2 transition-colors duration-300 ${
                  i < step ? 'bg-prussian' : i === step ? 'bg-hivis' : 'bg-prussian/15'
                }`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-widest pb-3 ${
                  i === step ? 'block text-ink' : 'hidden sm:block text-graphite'
                }`}
                aria-current={i === step ? 'step' : undefined}
              >
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* step body */}
      <div className="px-6 md:px-10 py-8 min-h-[420px]">
        <AnimatePresence mode="wait">
          {/* ── STEP 1 · SERVICE ── */}
          {step === 0 && (
            <motion.div key="service" variants={slide} initial="enter" animate="center" exit="exit">
              <h2 className="font-display uppercase font-bold text-3xl text-ink mb-2">
                What are we building?
              </h2>
              <p className="text-graphite text-sm mb-7">
                Pick the closest fit. We&apos;ll get the specifics in a minute.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" role="group" aria-label="Service type">
                {SERVICES.map((svc) => {
                  const Icon = SERVICE_ICONS[svc.slug]
                  const active = form.service === svc.slug
                  return (
                    <button
                      key={svc.slug}
                      type="button"
                      aria-pressed={active}
                      onClick={() => set('service', svc.slug)}
                      className={`text-left p-5 border transition-all duration-200 cursor-pointer ${
                        active
                          ? 'border-prussian bg-prussian text-paper shadow-md'
                          : 'border-prussian/25 bg-white text-ink hover:border-prussian/60'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mb-3 ${active ? 'text-hivisBright' : 'text-prussian'}`} />
                      <p className="font-display uppercase font-bold text-lg leading-tight">{svc.name}</p>
                      <p className={`font-mono text-[10px] mt-1.5 ${active ? 'text-paper/70' : 'text-graphite'}`}>
                        {svc.timeline} · from {svc.startingAt}
                      </p>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2 · DETAILS ── */}
          {step === 1 && (
            <motion.div key="details" variants={slide} initial="enter" animate="center" exit="exit" className="space-y-8">
              <div>
                <h2 className="font-display uppercase font-bold text-3xl text-ink mb-2">
                  Tell us about the project.
                </h2>
                <p className="text-graphite text-sm">
                  Rough answers are fine. This just helps us send the right person.
                </p>
              </div>
              <ChipGroup legend="Property type" options={PROPERTY_TYPES} value={form.propertyType} onChange={(v) => set('propertyType', v)} />
              <ChipGroup legend="When do you want to start?" options={TIMELINES} value={form.timeline} onChange={(v) => set('timeline', v)} />
              <ChipGroup legend="Working budget" options={BUDGETS} value={form.budget} onChange={(v) => set('budget', v)} />
              <div>
                <label htmlFor="description" className="block font-mono text-xs uppercase tracking-widest text-graphite mb-2">
                  Anything else? <span className="normal-case tracking-normal text-graphite/60">(optional)</span>
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="e.g. 12x14 kitchen, wall between kitchen and dining might come down…"
                  className="w-full bg-white border border-prussian/25 px-4 py-3 text-ink placeholder:text-graphite/50 focus:outline-none focus:border-prussian focus:ring-2 focus:ring-hivis/40 transition-colors resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* ── STEP 3 · SCHEDULE ── */}
          {step === 2 && (
            <motion.div key="schedule" variants={slide} initial="enter" animate="center" exit="exit">
              <h2 className="font-display uppercase font-bold text-3xl text-ink mb-2">
                Pick a time for the site visit.
              </h2>
              <p className="text-graphite text-sm mb-7">
                Free, on-site, 30–45 minutes. We measure, you talk, nobody sells.
              </p>

              <p className="font-mono text-xs uppercase tracking-widest text-graphite mb-3">Date</p>
              {days.length === 0 ? (
                <div className="h-[76px] mb-8 bg-paper animate-pulse" aria-hidden="true" />
              ) : (
                <div className="flex gap-2 overflow-x-auto pb-2 mb-8" role="group" aria-label="Visit date">
                  {days.map((d) => {
                    const active = form.date === d.iso
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          set('date', d.iso)
                          set('slot', '')
                        }}
                        className={`shrink-0 w-16 py-3 border text-center transition-colors cursor-pointer ${
                          active
                            ? 'bg-prussian text-paper border-prussian'
                            : 'bg-white text-ink border-prussian/25 hover:border-prussian/60'
                        }`}
                      >
                        <span className={`block font-mono text-[10px] uppercase ${active ? 'text-hivisBright' : 'text-graphite'}`}>
                          {d.weekday}
                        </span>
                        <span className="block font-display font-bold text-lg">{d.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              <p className="font-mono text-xs uppercase tracking-widest text-graphite mb-3">
                Time {form.date === '' && <span className="text-graphite/60 normal-case tracking-normal">(pick a date first)</span>}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="group" aria-label="Visit time">
                {TIME_SLOTS.map((slot) => {
                  const taken = form.date !== '' && slotTaken(form.date, slot)
                  const active = form.slot === slot
                  return (
                    <button
                      key={slot}
                      type="button"
                      aria-pressed={active}
                      disabled={form.date === '' || taken}
                      onClick={() => set('slot', slot)}
                      className={`py-3.5 border font-semibold text-sm transition-colors ${
                        active
                          ? 'bg-prussian text-paper border-prussian cursor-pointer'
                          : taken
                            ? 'bg-paper text-graphite/40 border-prussian/10 line-through cursor-not-allowed'
                            : form.date === ''
                              ? 'bg-paper text-graphite/40 border-prussian/10 cursor-not-allowed'
                              : 'bg-white text-ink border-prussian/25 hover:border-prussian/60 cursor-pointer'
                      }`}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ── STEP 4 · CONTACT ── */}
          {step === 3 && (
            <motion.div key="contact" variants={slide} initial="enter" animate="center" exit="exit">
              <h2 className="font-display uppercase font-bold text-3xl text-ink mb-2">
                Where do we show up?
              </h2>
              <p className="text-graphite text-sm mb-7">
                We&apos;ll only use this to confirm the visit. No mailing lists.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                <TextField id="name" label="Full name" value={form.name} onChange={(v) => set('name', v)} placeholder="Sam Rivera" autoComplete="name" />
                <TextField id="phone" label="Phone" type="tel" value={form.phone} onChange={(v) => set('phone', v)} placeholder="(973) 555-0100" autoComplete="tel" />
                <TextField id="email" label="Email" type="email" value={form.email} onChange={(v) => set('email', v)} placeholder="sam@example.com" autoComplete="email" />
                <TextField id="address" label="Project address" value={form.address} onChange={(v) => set('address', v)} placeholder="12 Maple St, Randolph, NJ" autoComplete="street-address" />
              </div>
              {form.email !== '' && !emailValid && (
                <p className="mt-4 text-sm text-red-700" role="alert">
                  That email doesn&apos;t look right. Check for typos.
                </p>
              )}
              {form.phone !== '' && !phoneValid && (
                <p className="mt-2 text-sm text-red-700" role="alert">
                  Phone number needs 10 digits so we can confirm your visit.
                </p>
              )}
            </motion.div>
          )}

          {/* ── STEP 5 · REVIEW ── */}
          {step === 4 && (
            <motion.div key="review" variants={slide} initial="enter" animate="center" exit="exit">
              <h2 className="font-display uppercase font-bold text-3xl text-ink mb-2">
                Read it back.
              </h2>
              <p className="text-graphite text-sm mb-7">
                Everything look right? Use Back to change anything.
              </p>
              <dl className="border border-dashed border-prussian/30 divide-y divide-dashed divide-prussian/20">
                {[
                  ['Service', service?.name ?? ''],
                  ['Property', form.propertyType],
                  ['Start window', form.timeline],
                  ['Budget', form.budget],
                  ['Site visit', `${formatDate(form.date)} · ${form.slot}`],
                  ['Contact', `${form.name} · ${form.phone}`],
                  ['Email', form.email],
                  ['Address', form.address],
                  ...(form.description ? ([['Notes', form.description]] as [string, string][]) : []),
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[130px_1fr] gap-4 px-5 py-3.5">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-graphite pt-0.5">{k}</dt>
                    <dd className="text-sm text-ink font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="font-mono text-[11px] text-graphite mt-5">
                Submitting requests a visit. It doesn&apos;t commit you to anything.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* footer nav */}
      <div className="flex items-center justify-between border-t border-prussian/20 px-6 md:px-10 py-5 bg-paper/60">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className={`font-display uppercase tracking-wider font-bold text-sm px-4 py-3 transition-colors ${
            step === 0 ? 'text-graphite/40 cursor-not-allowed' : 'text-ink hover:text-prussian cursor-pointer'
          }`}
        >
          ← Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => stepValid && setStep((s) => s + 1)}
            disabled={!stepValid}
            className={`inline-flex items-center gap-2 font-display uppercase tracking-wider font-bold text-sm px-7 py-3 transition-colors ${
              stepValid
                ? 'bg-hivis text-ink hover:bg-hivisBright cursor-pointer'
                : 'bg-prussian/10 text-graphite/50 cursor-not-allowed'
            }`}
          >
            Continue <ArrowRightIcon className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={confirm}
            className="inline-flex items-center gap-2 bg-prussian text-paper font-display uppercase tracking-wider font-bold text-sm px-7 py-3 hover:bg-ink transition-colors cursor-pointer"
          >
            <CheckIcon className="w-4 h-4 text-hivisBright" /> Submit work order
          </button>
        )}
      </div>
    </div>
  )
}
