import type { Metadata } from 'next'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Render — Free Consultation',
}

export default function ContactPage() {
  return <ContactForm />
}
