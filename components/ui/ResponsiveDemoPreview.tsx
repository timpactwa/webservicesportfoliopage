'use client'

import { useEffect, useRef, useState } from 'react'

type ResponsiveDemoPreviewProps = {
  url: string
  baseWidth?: number
  baseHeight?: number
  fallbackScale?: number
  className?: string
}

export default function ResponsiveDemoPreview({
  url,
  baseWidth = 1280,
  baseHeight = 900,
  fallbackScale = 0.45,
  className = '',
}: ResponsiveDemoPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(fallbackScale)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScale = () => {
      const width = container.clientWidth
      if (width > 0) {
        setScale(width / baseWidth)
      }
    }

    updateScale()

    const resizeObserver = new ResizeObserver(updateScale)
    resizeObserver.observe(container)

    return () => resizeObserver.disconnect()
  }, [baseWidth])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <iframe
        src={url}
        className="absolute top-0 left-0 border-0 pointer-events-none select-none"
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        scrolling="no"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  )
}
