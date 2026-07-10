import Link from 'next/link'
import { NAV_LINKS, SERVICE_TOWNS } from '@/lib/data'
import Logo from '@/components/ui/Logo'

const serviceLinks = [
  { label: 'Web Design', href: '/services/web-design' },
  { label: 'Local SEO', href: '/services/local-seo' },
  { label: 'AI Automation', href: '/services/ai-automation' },
  { label: 'Instant Estimate', href: '/estimate' },
]

const resourceLinks = [
  { label: 'Guides', href: '/guides' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Our Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Book a Free Call', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-graphite-light text-white py-16 md:py-20">
      <div className="container-studio">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] mb-12">
          <div>
            <Logo variant="light" className="mb-3 text-xl" />
            <p className="text-white/55 text-sm max-w-xs leading-relaxed">
              Honest agency work. Founder-led. Morris County made.
            </p>
            <p className="mt-4 text-white/55 text-sm max-w-xs leading-relaxed">
              Serving{' '}
              <Link href="/service-areas" className="underline decoration-white/20 underline-offset-2 hover:text-white/70 transition-colors">
                {SERVICE_TOWNS.join(', ')}
              </Link>
              , and the rest of Morris County, NJ.
            </p>
          </div>

          <nav aria-label="Site">
            <p className="eyebrow mb-4 text-[10px] text-white/55">Site</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="eyebrow mb-4 text-[10px] text-white/55">Services</p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <p className="eyebrow mb-4 text-[10px] text-white/55">Resources</p>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/55 text-sm">© 2026 Render. Morris County, NJ.</p>
          <a
            href="mailto:support@renderlocalwebsites.com"
            className="text-sm text-white/60 hover:text-white transition-colors duration-150"
          >
            support@renderlocalwebsites.com
          </a>
        </div>
      </div>
    </footer>
  )
}
