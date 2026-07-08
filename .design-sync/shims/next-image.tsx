// Stand-in for next/image in the design-sync bundle — no image optimizer
// exists outside the real Next.js app, so previews use a plain img.
import React from 'react'

interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  fill?: boolean
  priority?: boolean
}

export default function Image({ src, alt, fill, priority, style, ...rest }: ImageProps) {
  const fillStyle: React.CSSProperties | undefined = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : undefined
  return <img src={src} alt={alt} style={{ ...fillStyle, ...style }} {...rest} />
}
