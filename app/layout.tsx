import type { Metadata } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MobileCtaBar from '@/components/layout/MobileCtaBar'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-inter-tight',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://renderlocalwebsites.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Render | Web Design & AI Consulting, Morris County, NJ',
    template: '%s | Render',
  },
  description:
    'Render builds fast, modern websites and practical AI tools for local businesses in Morris County, NJ. Founder-led. Agency quality. Honest pricing.',
  openGraph: {
    type: 'website',
    siteName: 'Render',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Render | Web Design & AI Consulting, Morris County, NJ',
    description:
      'Render builds fast, modern websites and practical AI tools for local businesses in Morris County, NJ. Founder-led. Agency quality. Honest pricing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Render | Web Design & AI Consulting, Morris County, NJ',
    description:
      'Render builds fast, modern websites and practical AI tools for local businesses in Morris County, NJ. Founder-led. Agency quality. Honest pricing.',
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
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'NJ',
  },
  serviceType: ['Web Design', 'Search Engine Optimization', 'AI Automation'],
  priceRange: '$$',
  founder: [
    { '@type': 'Person', name: 'Tim Pactwa' },
    { '@type': 'Person', name: 'Luke Wilkins' },
  ],
  sameAs: ['https://linkedin.com/in/timpactwa', 'https://www.linkedin.com/in/lukewilkins2/'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://api.web3forms.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          // Escape < so a "</script>" sequence in the data can never close the tag
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Reserves scroll space so the fixed mobile bar never covers the footer.
            Matches the footer background so it reads as part of it. */}
        <div aria-hidden className="h-[72px] bg-graphite md:hidden" />
        <MobileCtaBar />
      </body>
    </html>
  )
}
