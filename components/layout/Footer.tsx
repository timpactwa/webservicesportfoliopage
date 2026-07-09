import Link from 'next/link'
import { NAV_LINKS, SERVICE_TOWNS } from '@/lib/data'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-graphite text-white py-16 md:py-20">
      <div className="container-studio">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          <div>
            <Logo variant="light" className="mb-3 text-xl" />
            <p className="text-white/50 text-sm max-w-xs leading-relaxed">
              Honest agency work. Founder-led. Morris County made.
            </p>
            <p className="mt-4 text-white/40 text-sm max-w-xs leading-relaxed">
              Serving {SERVICE_TOWNS.join(', ')}, and the rest of Morris County, NJ.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/45 text-sm">© 2026 Render. Morris County, NJ.</p>
          <a
            href="mailto:renderlocalwebsites@gmail.com"
            className="text-sm text-white/60 hover:text-white transition-colors duration-150"
          >
            renderlocalwebsites@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
