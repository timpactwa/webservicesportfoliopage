import { cn } from '@/lib/utils'

interface UseCaseCardProps {
  title: string
  description: string
  className?: string
}

export default function UseCaseCard({ title, description, className }: UseCaseCardProps) {
  return (
    <div
      style={{
        transition: 'box-shadow 300ms ease, border-color 300ms ease',
      }}
      className={cn(
        'group relative rounded-card border border-hairline bg-surface p-8 md:p-10 hover:shadow-card-hover hover:border-accent/30',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-card opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), oklch(0.60 0.13 190 / 0.12), transparent 60%)',
        }}
      />
      <div className="relative">
        <h3 className="mb-3 text-2xl font-semibold text-graphite">{title}</h3>
        <p className="text-base leading-relaxed text-graphite-soft">{description}</p>
      </div>
    </div>
  )
}
