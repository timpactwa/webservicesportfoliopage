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
  const [shouldLoad, setShouldLoad] = useState(false)

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

  // Only mount the iframe once the card is near the viewport. With several of
  // these on one page, loading every external demo site at once is what made
  // the grid feel laggy — each one is a full separate app booting up.
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {shouldLoad && (
        <iframe
          src={url}
          loading="lazy"
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
      )}
    </div>
  )
}
