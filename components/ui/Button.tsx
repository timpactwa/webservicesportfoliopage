'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'secondary-inverse' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  /** Receives the event so a link-styled CTA can preventDefault and open a modal instead. */
  onClick?: (event: React.MouseEvent) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
  /** Signals to assistive tech that this control opens a dialog/menu; forwarded to the rendered element. */
  'aria-haspopup'?: React.AriaAttributes['aria-haspopup']
}

const variants = {
  primary: 'bg-accent-dark text-white hover:bg-accent',
  secondary: 'border-[1.5px] border-graphite text-graphite hover:bg-graphite hover:text-white',
  'secondary-inverse': 'border-[1.5px] border-white text-white hover:bg-white hover:text-graphite',
  ghost: 'text-accent hover:text-accent-dark',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-7 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  className,
  fullWidth,
  'aria-haspopup': ariaHasPopup,
}: ButtonProps) {
  const baseClass = cn(
    'relative inline-flex items-center justify-center rounded-full font-semibold',
    'transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
    variant === 'ghost' && 'rounded-none px-0 py-0',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClass} onClick={onClick} aria-haspopup={ariaHasPopup}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass} aria-haspopup={ariaHasPopup}>
      {children}
    </button>
  )
}
