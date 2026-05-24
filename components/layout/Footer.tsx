import Link from 'next/link'
import { NAV_LINKS } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16 md:py-20">
      <div className="container-studio">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          <div>
            <p className="text-2xl font-black text-white mb-3">STUDIO</p>
            <p className="text-neutral-400 text-sm max-w-xs leading-relaxed">
              Honest agency work. Student driven. Morris County made.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-white transition-colors duration-150 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-neutral-500 text-sm">© 2026 STUDIO. Morris County, NJ.</p>
          <a
            href="mailto:hello@studio.com"
            className="text-sm text-neutral-400 hover:text-white transition-colors duration-150"
          >
            hello@studio.com
          </a>
        </div>
      </div>
    </footer>
  )
}
