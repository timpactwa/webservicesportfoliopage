'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useMagnetic } from '@/hooks/useMagnetic'

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
}: ButtonProps) {
  const isMagnetic = variant === 'primary' && !disabled
  const magnetic = useMagnetic<HTMLAnchorElement & HTMLButtonElement>({ strength: 0.25, max: 8 })

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
      <Link
        href={href}
        ref={isMagnetic ? magnetic.ref : undefined}
        className={baseClass}
        onClick={onClick}
        onMouseMove={isMagnetic ? magnetic.onMouseMove : undefined}
        onMouseLeave={isMagnetic ? magnetic.onMouseLeave : undefined}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      ref={isMagnetic ? magnetic.ref : undefined}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      onMouseMove={isMagnetic ? magnetic.onMouseMove : undefined}
      onMouseLeave={isMagnetic ? magnetic.onMouseLeave : undefined}
    >
      {children}
    </button>
  )
}
