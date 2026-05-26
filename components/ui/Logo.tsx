import Image from 'next/image'

type LogoVariant = 'dark' | 'light' | 'icon'

interface LogoProps {
  variant?: LogoVariant
  className?: string
  priority?: boolean
}

const logoAssets: Record<LogoVariant, { src: string; width: number; height: number }> = {
  dark: {
    src: '/brand/render-logo-dark.svg',
    width: 520,
    height: 128,
  },
  light: {
    src: '/brand/render-logo-light.svg',
    width: 520,
    height: 128,
  },
  icon: {
    src: '/brand/render-icon-transparent.svg',
    width: 128,
    height: 128,
  },
}

export default function Logo({ variant = 'dark', className, priority = false }: LogoProps) {
  const asset = logoAssets[variant]

  return (
    <Image
      src={asset.src}
      alt="Render"
      width={asset.width}
      height={asset.height}
      priority={priority}
      className={className}
    />
  )
}
