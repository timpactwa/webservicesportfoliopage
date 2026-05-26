import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'secondary-inverse' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
  'secondary-inverse': 'border-2 border-white text-white hover:bg-white hover:text-charcoal',
  ghost: 'text-accent hover:underline',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
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
}: ButtonProps) {
  const baseClass = cn(
    'inline-flex items-center justify-center font-bold rounded-none transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  if (href) {
    return (
      <Link href={href} className={baseClass} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      {children}
    </button>
  )
}
