import type { Metadata } from 'next'
import { Fraunces, Figtree } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
})

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
})

export const metadata: Metadata = {
  title: { default: 'Marlowe Dental Studio — Denville, NJ', template: '%s | Marlowe Dental Studio' },
  description:
    'Boutique family dentistry in Denville, NJ. Unhurried visits, honest pricing, and care that starts by listening. Now welcoming new patients.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body className="font-body bg-porcelain text-petrol antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
