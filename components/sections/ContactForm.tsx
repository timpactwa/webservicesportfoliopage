'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  businessName: string
  email: string
  phone: string
  serviceInterest: string
  message: string
}

interface FormErrors {
  name?: string
  businessName?: string
  email?: string
  phone?: string
  serviceInterest?: string
  message?: string
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name || data.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!data.businessName || data.businessName.trim().length < 2) errors.businessName = 'Please enter your business name.'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email address.'
  if (data.phone && !/^[\d\s\-\(\)\+\.]{7,20}$/.test(data.phone)) errors.phone = 'Please enter a valid phone number.'
  if (!data.serviceInterest) errors.serviceInterest = 'Please select a service.'
  if (!data.message || data.message.trim().length < 10) errors.message = 'Please tell us a bit about your project (at least 10 characters).'
  return errors
}

const inputBase = 'w-full px-4 py-3 border bg-white text-charcoal text-base font-medium rounded-none outline-none transition-all duration-150 focus:ring-2 focus:ring-offset-0 placeholder:text-neutral-400'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    // TODO: Replace with real form endpoint (e.g. Resend, Formspree)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const fieldClass = (field: keyof FormErrors) =>
    cn(inputBase, errors[field] ? 'border-red-400 focus:ring-red-400' : 'border-neutral-300 focus:ring-accent')

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container-studio">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-display-xl font-black text-charcoal mb-6">Let&apos;s Talk.</h1>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              Tell us about your business and what you&apos;re looking for. We&apos;ll get back to you within 24 hours.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-neutral-700 font-medium">
                  We offer a free 20-minute intro call — no pressure, no commitment.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@studio.com" className="text-neutral-700 font-medium hover:text-accent transition-colors">
                  hello@studio.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-neutral-700 font-medium">Morris County, NJ</p>
              </div>
            </div>
          </div>

          <div>
            {isSuccess ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-accent flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black text-charcoal mb-3">Message sent!</h2>
                <p className="text-neutral-600 mb-8">Thanks! We&apos;ll be in touch within 24 hours.</p>
                <Button variant="secondary" href="/">Back to Home</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2">Your Name</label>
                  <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Jane Smith" className={fieldClass('name')} />
                  {errors.name && <p className="mt-1 text-sm text-red-600 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-sm font-bold text-charcoal mb-2">Business Name</label>
                  <input id="businessName" name="businessName" type="text" value={formData.businessName} onChange={handleChange} placeholder="Smith Landscaping Co." className={fieldClass('businessName')} />
                  {errors.businessName && <p className="mt-1 text-sm text-red-600 font-medium">{errors.businessName}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-charcoal mb-2">Email Address</label>
                  <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@smithlandscaping.com" className={fieldClass('email')} />
                  {errors.email && <p className="mt-1 text-sm text-red-600 font-medium">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-charcoal mb-2">Phone Number <span className="text-neutral-400 font-normal">(optional)</span></label>
                  <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="(973) 555-0100" className={fieldClass('phone')} />
                  {errors.phone && <p className="mt-1 text-sm text-red-600 font-medium">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="serviceInterest" className="block text-sm font-bold text-charcoal mb-2">I&apos;m interested in...</label>
                  <select id="serviceInterest" name="serviceInterest" value={formData.serviceInterest} onChange={handleChange} className={fieldClass('serviceInterest')}>
                    <option value="" disabled>Select a service</option>
                    <option value="web">Web Design & Development</option>
                    <option value="ai">AI Consulting & Automation</option>
                    <option value="both">Both Services</option>
                  </select>
                  {errors.serviceInterest && <p className="mt-1 text-sm text-red-600 font-medium">{errors.serviceInterest}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-charcoal mb-2">Tell us about your project</label>
                  <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="We're a 10-year-old landscaping company in Morristown. We have an outdated website and want to modernize it..." className={fieldClass('message')} />
                  {errors.message && <p className="mt-1 text-sm text-red-600 font-medium">{errors.message}</p>}
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message →'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
