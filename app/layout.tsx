import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://renderagency.dev'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Render | Web Design & AI Consulting, Morris County, NJ',
    template: '%s | Render',
  },
  description:
    'Render builds fast, modern websites and AI solutions for local businesses in Morris County, NJ. Student-run. Agency quality. Honest pricing.',
  openGraph: {
    type: 'website',
    siteName: 'Render',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Render | Web Design & AI Consulting, Morris County, NJ',
    description:
      'Render builds fast, modern websites and AI solutions for local businesses in Morris County, NJ. Student-run. Agency quality. Honest pricing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Render | Web Design & AI Consulting, Morris County, NJ',
    description:
      'Render builds fast, modern websites and AI solutions for local businesses in Morris County, NJ. Student-run. Agency quality. Honest pricing.',
  },
  icons: {
    icon: [
      {
        url: '/brand/render-icon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/brand/render-icon.svg',
  },
  alternates: {
    canonical: SITE_URL,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Render',
  description:
    'Web design, local SEO, and AI automation for small businesses in Morris County, NJ.',
  url: SITE_URL,
  email: 'renderlocalwebsites@gmail.com',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Morris County, NJ',
  },
  serviceType: ['Web Design', 'Search Engine Optimization', 'AI Automation'],
  priceRange: '$$',
  founder: [
    { '@type': 'Person', name: 'Tim Pactwa' },
    { '@type': 'Person', name: 'Luke Wilkins' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://calendly.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://calendly.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
