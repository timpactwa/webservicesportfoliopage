// Hand-set 24x24 stroke icons (Lucide-style), keyed by service slug.
type IconProps = { className?: string }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true as const,
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function ToothIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M7.5 3C5 3 3.5 5 3.5 7.5c0 2 .8 3 1.3 4.7.6 1.9.7 4.6 1.5 7 .3 1 1.7 1 2 0 .5-1.7.7-3.6 1.5-5 .5-.9 1.9-.9 2.4 0 .8 1.4 1 3.3 1.5 5 .3 1 1.7 1 2 0 .8-2.4.9-5.1 1.5-7 .5-1.7 1.3-2.7 1.3-4.7C18.5 5 17 3 14.5 3c-1.2 0-2 .6-2.5 1-.5-.4-1.3-1-2.5-1h-2z" />
    </svg>
  )
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
    </svg>
  )
}

export function FamilyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="8" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.25" />
      <path d="M3 21v-2a5 5 0 015-5h.5a5 5 0 014.5 2.8M14 21v-1.5a4 4 0 013-3.87" />
    </svg>
  )
}

export function PhoneRingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 4h4l1.5 4-2 1.5a12 12 0 006 6L16 13.5l4 1.5v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
      <path d="M15 5a5 5 0 014 4" />
    </svg>
  )
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 19C5 9 12 4 20 4c0 8-5 15-15 15z" />
      <path d="M5 19c3-5 7-9 11-11" />
    </svg>
  )
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M13 6l6 6-6 6M5 12h14" />
    </svg>
  )
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  )
}

export const SERVICE_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  preventive: ShieldIcon,
  restorative: ToothIcon,
  cosmetic: SparkleIcon,
  family: FamilyIcon,
  emergency: PhoneRingIcon,
  anxiety: LeafIcon,
}
