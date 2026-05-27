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

export const metadata: Metadata = {
  metadataBase: new URL('https://renderlocalwebsites.com'),
  title: 'Render | Web Design & AI Consulting — Morris County, NJ',
  description:
    'Render builds fast, modern websites and AI solutions for local businesses in Morris County, NJ. Student-run. Agency quality. Honest pricing.',
  alternates: {
    canonical: '/',
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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
