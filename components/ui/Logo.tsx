import { cn } from '@/lib/utils'

type LogoVariant = 'dark' | 'light' | 'icon'

interface LogoProps {
  variant?: LogoVariant
  className?: string
  /** Kept for API compatibility with prior next/image logo; no-op for inline SVG. */
  priority?: boolean
}

/**
 * Render's compass mark + wordmark. Four triangles around a center point (the same
 * faceted-triangle idea as the mosaic render-in animation), beside a lowercase
 * "render" wordmark in Inter Tight. Fully inline + token-driven, so it scales
 * crisply and recolors with the palette.
 *
 * Size is driven by font-size: pass a text-size class (e.g. `text-xl`) via className;
 * the mark tracks the wordmark via `em` units.
 */
function CompassMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="1.15em"
      height="1.15em"
      className={cn('shrink-0', className)}
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="16,2 30,16 16,16" fill="oklch(var(--accent-dark))" />
      <polygon points="30,16 16,30 16,16" fill="oklch(var(--accent))" />
      <polygon points="16,30 2,16 16,16" fill="oklch(var(--graphite))" />
      <polygon points="2,16 16,2 16,16" fill="oklch(var(--graphite-soft))" />
    </svg>
  )
}

export default function Logo({ variant = 'dark', className }: LogoProps) {
  if (variant === 'icon') {
    return <CompassMark className={cn('text-[1.75rem]', className)} />
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xl leading-none',
        className
      )}
      aria-label="Render"
    >
      <CompassMark />
      <span
        className={cn(
          'font-display font-semibold tracking-tight',
          variant === 'light' ? 'text-white' : 'text-graphite'
        )}
      >
        render
      </span>
    </span>
  )
}
