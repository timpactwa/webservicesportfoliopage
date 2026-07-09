import Link from 'next/link'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  /** Replaces the default "Learn more" text link, e.g. with a pill button. */
  cta?: React.ReactNode
}

export default function ServiceCard({ icon, title, description, href, cta }: ServiceCardProps) {
  return (
    <div
      style={{
        transition: 'box-shadow 300ms ease, border-color 300ms ease',
      }}
      className="group relative h-full rounded-card border border-hairline bg-surface p-8 md:p-10 hover:shadow-card-hover hover:border-accent/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), oklch(0.60 0.13 190 / 0.12), transparent 60%)',
        }}
      />
      <div className="relative flex h-full flex-col items-start">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-dark">
          {icon}
        </div>
        <h3 className="mb-3 text-2xl font-semibold text-graphite">{title}</h3>
        <p className="mb-6 text-base leading-relaxed text-graphite-soft">{description}</p>
        <div className="mt-auto">
          {cta ?? (
            <Link
              href={href}
              aria-label={`Learn more about ${title}`}
              className="flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 group-hover:gap-2"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
