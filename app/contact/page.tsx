import type { Metadata } from 'next'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact | STUDIO — Free Consultation',
}

export default function ContactPage() {
  return <ContactForm />
}
