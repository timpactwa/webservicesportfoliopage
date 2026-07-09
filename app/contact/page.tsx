import type { Metadata } from 'next'
import ContactForm from '@/components/sections/ContactForm'

const description =
  'Request a free consultation with Render. Send us a time that works and we will confirm by email. Websites, local SEO, and AI automation for small businesses in Randolph, Denville, Morristown, Parsippany, Madison, and across Morris County, NJ.'

export const metadata: Metadata = {
  title: 'Contact: Request a Free Consultation',
  description,
  openGraph: {
    title: 'Contact Render: Request a Free Consultation',
    description,
  },
}

export default function ContactPage() {
  return <ContactForm />
}
