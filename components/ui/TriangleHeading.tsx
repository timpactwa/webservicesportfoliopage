'use client'

import { useEffect, useRef } from 'react'

const SVG_NS = 'http://www.w3.org/2000/svg'
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'

interface TriangleHeadingProps {
  children: React.ReactNode
  as?: HeadingTag
  className?: string
  /** Seconds before the mosaic starts assembling. */
  delay?: number
  /** Approx grid cell edge in px — larger reads bolder/chunkier. */
  cell?: number
  /** ms of stagger per diagonal step across the grid. */
  step?: number
  /** 'inView' plays on scroll-into-view (default); 'mount' plays on load. */
  trigger?: 'inView' | 'mount'
}

/**
 * Triangle render-in heading: a mosaic of teal triangles assembles over the title
 * in scan order (top-left → bottom-right) then dissolves as the real text resolves
 * in behind it — the site "rendering" its titles out of the brand's own triangle
 * mark. Replaces the scanline sweep. Snaps to plain text under prefers-reduced-motion.
 */
export default function TriangleHeading({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
  cell = 26,
  step = 24,
  trigger = 'inView',
}: TriangleHeadingProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const svg = svgRef.current
    const text = textRef.current
    if (!wrap || !svg || !text) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      text.style.opacity = '1'
      return
    }

    let started = false

    const run = () => {
      const w = wrap.offsetWidth
      const h = wrap.offsetHeight
      if (!w || !h) return

      while (svg.firstChild) svg.removeChild(svg.firstChild)
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`)

      const cols = Math.max(1, Math.ceil(w / cell))
      const rows = Math.max(1, Math.ceil(h / cell))
      const cw = w / cols
      const ch = h / rows

      const polys: { el: SVGPolygonElement; scan: number }[] = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = c * cw
          const y0 = r * ch
          const x1 = x0 + cw
          const y1 = y0 + ch
          // Two right triangles per cell.
          const pairs: [number, number][][] = [
            [[x0, y0], [x1, y0], [x0, y1]],
            [[x1, y0], [x1, y1], [x0, y1]],
          ]
          pairs.forEach((pts, k) => {
            const el = document.createElementNS(SVG_NS, 'polygon')
            el.setAttribute('points', pts.map((p) => p.join(',')).join(' '))
            el.setAttribute('fill', (r + c + k) % 4 === 0 ? 'oklch(var(--accent-dark))' : 'oklch(var(--accent))')
            el.style.opacity = '0'
            el.style.transformBox = 'fill-box'
            el.style.transformOrigin = 'center'
            el.style.willChange = 'opacity, transform'
            svg.appendChild(el)
            polys.push({ el, scan: c + r })
          })
        }
      }

      let maxEnd = 0
      const dur = 780
      polys.forEach(({ el, scan }) => {
        const d = delay * 1000 + scan * step + Math.random() * 40
        el.animate(
          [
            { opacity: 0, transform: 'scale(0.55)' },
            { opacity: 1, transform: 'scale(1)', offset: 0.32 },
            { opacity: 1, transform: 'scale(1)', offset: 0.55 },
            { opacity: 0, transform: 'scale(1.06)', offset: 1 },
          ],
          { duration: dur, delay: d, easing: EASE, fill: 'both' }
        )
        maxEnd = Math.max(maxEnd, d + dur)
      })

      // Text emerges as the mosaic begins clearing.
      const textStart = delay * 1000 + (cols + rows) * step * 0.42 + 180
      text.animate(
        [
          { opacity: 0, filter: 'blur(4px)' },
          { opacity: 1, filter: 'blur(0px)' },
        ],
        { duration: 520, delay: textStart, easing: EASE, fill: 'both' }
      )

      window.setTimeout(() => {
        while (svg.firstChild) svg.removeChild(svg.firstChild)
      }, maxEnd + 120)
    }

    if (trigger === 'mount') {
      started = true
      requestAnimationFrame(() => requestAnimationFrame(run))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true
            run()
            io.disconnect()
          }
        })
      },
      { threshold: 0.35 }
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [children, delay, cell, step, trigger])

  return (
    <div ref={wrapRef} className="relative inline-block max-w-full align-top">
      <div ref={textRef} style={{ opacity: 0 }}>
        <Tag className={className}>{children}</Tag>
      </div>
      <svg
        ref={svgRef}
        aria-hidden="true"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      />
    </div>
  )
}
