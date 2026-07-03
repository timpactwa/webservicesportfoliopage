// Hand-set 24x24 stroke icons (Lucide-style). Keyed by service slug.
type IconProps = { className?: string }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true as const,
}

export function KitchenIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 10h18M3 10v9a1 1 0 001 1h16a1 1 0 001-1v-9M3 10l2-6h14l2 6" />
      <path d="M9 14h6" />
    </svg>
  )
}

export function BathIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3zM6 12V5a2 2 0 012-2h1M7 19l-1 2M17 19l1 2" />
      <path d="M9 6h3" />
    </svg>
  )
}

export function DeckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21V10l3-3 3 3v11M9 21V10l3-3 3 3v11M15 21V10l3-3 3 3v11" />
      <path d="M3 14h18M3 18h18" />
    </svg>
  )
}

export function BasementIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 9l9-6 9 6M5 9v12h14V9" />
      <path d="M5 15h14M9 15v6M15 15v6" />
    </svg>
  )
}

export function AdditionIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21V11l6-4 6 4v10M9 21v-6h4v6" />
      <path d="M15 8V5h6v16h-6" />
    </svg>
  )
}

export function RepairIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14.5 5.5l4 4L7 21H3v-4L14.5 5.5zM12 8l4 4" />
      <path d="M17 3l4 4" />
    </svg>
  )
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12l5 5L20 6" />
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

export const SERVICE_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  kitchen: KitchenIcon,
  bath: BathIcon,
  deck: DeckIcon,
  basement: BasementIcon,
  addition: AdditionIcon,
  repair: RepairIcon,
}
