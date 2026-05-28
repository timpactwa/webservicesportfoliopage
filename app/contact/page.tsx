import type { Metadata } from 'next'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact: Free Consultation',
  description:
    'Get a free consultation with Render. We build fast, modern websites and AI solutions for small businesses in Morris County, NJ. No commitment required.',
  openGraph: {
    title: 'Contact Render: Free Consultation',
    description:
      'Get a free consultation with Render. We build fast, modern websites and AI solutions for small businesses in Morris County, NJ. No commitment required.',
  },
}

export default function ContactPage() {
  return <ContactForm />
}
