'use client'

import { useEffect, useState } from 'react'

const ROWS = 3
const COLS = 3
/** Square viewBox. The rendered size is set in CSS, so this is unitless. */
const VB = 120

const CORNERS = [
  { id: 'tl', position: 'left-0 top-0', transform: 'none' },
  { id: 'tr', position: 'right-0 top-0', transform: 'scaleX(-1)' },
  { id: 'bl', position: 'left-0 bottom-0', transform: 'scaleY(-1)' },
  { id: 'br', position: 'right-0 bottom-0', transform: 'scale(-1, -1)' },
] as const

/** One mesh, computed once at module load: rows x cols cells, two triangles each. */
const MESH = (() => {
  const cw = VB / COLS
  const ch = VB / ROWS
  const out: { points: string; delay: number; fill: string }[] = []

  // Farthest possible centroid, for normalizing radial distance to 0..1.
  const maxDist = Math.hypot(VB, VB)

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x0 = c * cw
      const y0 = r * ch
      const x1 = x0 + cw
      const y1 = y0 + ch
      const cells: [number, number][][] = [
        [[x0, y0], [x1, y0], [x0, y1]],
        [[x1, y0], [x1, y1], [x0, y1]],
      ]
      cells.forEach((points, i) => {
        // Radial distance of this triangle's centroid from the corner drives
        // both the stagger and the color, so each cluster assembles outward
        // and grades outward. Indexing by (row + col) instead painted every
        // anti-diagonal the same color, which read as straight bars.
        const cx = (points[0][0] + points[1][0] + points[2][0]) / 3
        const cy = (points[0][1] + points[1][1] + points[2][1]) / 3
        const d = Math.hypot(cx, cy) / maxDist
        // Rich accent-dark at the corner grading to accent-soft at the rim,
        // with the two facets of each cell offset a few points apart so the
        // gradient still reads as a triangle mosaic, not a flat wash.
        const facet = i === 0 ? 6 : -6
        const darkShare = Math.max(10, Math.min(96, Math.round(92 - d * 70 + facet)))
        out.push({
          points: points.map((p) => p.join(',')).join(' '),
          delay: d * 700,
          fill: `color-mix(in oklch, oklch(var(--accent-dark)) ${darkShare}%, oklch(var(--accent-soft)))`,
        })
      })
    }
  }
  return out
})()

/**
 * Four subtle triangle clusters, one per hero corner. Replaces the full-bleed
 * TriangleReveal mosaic, which was 252 animated polygons plus a canvas sampling
 * pass, running while the h1 was still resolving in.
 *
 * Renders nothing until the window load event, so decoration is never on the
 * critical path. Client-only by construction, which is also why the mesh needs no
 * hydration-stable randomness: there is no server render to match.
 */
export default function CornerTriangles() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // load may already have fired by the time this effect runs.
    if (document.readyState === 'complete') {
      setReady(true)
      return
    }
    const onLoad = () => setReady(true)
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  if (!ready) return null

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes cornerTriIn {
          from { opacity: 0; transform: translateY(4px) scale(0.82); }
          to   { opacity: 1; transform: none; }
        }
        .corner-tri {
          transform-box: fill-box;
          transform-origin: center;
          animation: cornerTriIn 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .corner-tri { animation: none; }
        }
      `}</style>

      {CORNERS.map((corner) => (
        <div
          key={corner.id}
          className={`absolute ${corner.position}`}
          style={{
            width: 'clamp(120px, 18vw, 260px)',
            height: 'clamp(120px, 18vw, 260px)',
            // The gradient mixes toward accent-soft, which sits near the page
            // background, so the cluster carries a bit more opacity than the
            // flat three-token version needed.
            opacity: 0.18,
            transform: corner.transform,
            WebkitMaskImage: 'linear-gradient(to bottom right, #000, transparent 78%)',
            maskImage: 'linear-gradient(to bottom right, #000, transparent 78%)',
          }}
        >
          <svg viewBox={`0 0 ${VB} ${VB}`} preserveAspectRatio="none" className="h-full w-full">
            {MESH.map((tri, i) => (
              <polygon
                key={i}
                className="corner-tri"
                points={tri.points}
                fill={tri.fill}
                style={{ animationDelay: `${tri.delay}ms` }}
              />
            ))}
          </svg>
        </div>
      ))}
    </div>
  )
}
