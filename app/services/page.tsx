import type { Metadata } from 'next'
import ServicesDetail from '@/components/sections/ServicesDetail'

export const metadata: Metadata = {
  title: 'Services | STUDIO',
}

export default function ServicesPage() {
  return <ServicesDetail />
}
