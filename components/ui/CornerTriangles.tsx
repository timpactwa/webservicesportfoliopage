'use client'

import { useEffect, useState } from 'react'

const VB = 120

const CORNERS = [
  { id: 'tl', position: 'left-0 top-0', transform: 'none' },
  { id: 'tr', position: 'right-0 top-0', transform: 'scaleX(-1)' },
  { id: 'bl', position: 'left-0 bottom-0', transform: 'scaleY(-1)' },
  { id: 'br', position: 'right-0 bottom-0', transform: 'scale(-1, -1)' },
] as const

/** Spoke angles across the quarter, degrees. */
const ANGLES = [0, 15, 30, 45, 60, 75, 90]
/** Ring radii. Gaps widen outward, so density piles up near the corner: the tunnel.
    The outermost ring sits at 60% of the box, inside the mask's fade ramp but well
    short of its 88% cutoff, so the outer arcs dim instead of shearing off into
    floating fragments. */
const RADII = [16, 30, 48, 72]
/** How far each arc segment sags toward the corner, as a fraction. The web. */
const SAG = 0.07

const rad = (deg: number) => (deg * Math.PI) / 180
const pt = (r: number, deg: number): [number, number] => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))]
const fmt = (n: number) => +n.toFixed(2)

/**
 * Geometry for one corner, computed once at module load. The other three corners
 * reuse it via the container's flip transforms.
 */
const WEB = (() => {
  // Rings: one path per radius, quadratic segments between adjacent spokes,
  // control point pulled toward the corner so each segment sags like web silk.
  const rings = RADII.map((r, ringIndex) => {
    const points = ANGLES.map((a) => pt(r, a))
    let d = `M ${fmt(points[0][0])} ${fmt(points[0][1])}`
    for (let k = 0; k < points.length - 1; k++) {
      const [x0, y0] = points[k]
      const [x1, y1] = points[k + 1]
      const cx = ((x0 + x1) / 2) * (1 - SAG)
      const cy = ((y0 + y1) / 2) * (1 - SAG)
      d += ` Q ${fmt(cx)} ${fmt(cy)} ${fmt(x1)} ${fmt(y1)}`
    }
    return { d, delay: 150 + ringIndex * 160 }
  })

  // Spokes: straight radials from just outside the corner point to past the
  // outermost ring. They exist to carry the rings; the rings carry the motion.
  const spokes = ANGLES.map((a, i) => {
    const [x0, y0] = pt(RADII[0] * 0.4, a)
    const [x1, y1] = pt(RADII[RADII.length - 1] * 1.05, a)
    return { x0: fmt(x0), y0: fmt(y0), x1: fmt(x1), y1: fmt(y1), delay: i * 60 }
  })

  return { rings, spokes }
})()

/**
 * Four corner webs, one per hero corner: radial spokes and sagging concentric
 * arcs receding into each corner, drawing themselves in and settling from a
 * blur, the same render-in verb the hero copy uses. Replaced the filled
 * triangle mosaic; per Tim, the pattern is outlines only, never filled, and
 * never a straight-line grid.
 *
 * Renders nothing until the window load event, so decoration is never on the
 * critical path. Client-only by construction, so the geometry needs no
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
        @keyframes cornerWebDraw {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes cornerWebSettle {
          from { opacity: 0; filter: blur(5px); }
          to   { opacity: 1; filter: blur(0.5px); }
        }
        .corner-web-line {
          /* Stroke color set here, not as a presentation attribute: var() support
             in SVG presentation attributes is not guaranteed across engines, and
             the failure mode is an invisible web. */
          stroke: oklch(var(--accent-dark));
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: cornerWebDraw 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .corner-web {
          /* Residual half-pixel blur keeps the web soft instead of CAD-crisp. */
          animation: cornerWebSettle 1100ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .corner-web-line { animation: none; stroke-dashoffset: 0; }
          .corner-web { animation: none; opacity: 1; filter: blur(0.5px); }
        }
      `}</style>

      {CORNERS.map((corner) => (
        <div
          key={corner.id}
          className={`absolute ${corner.position}`}
          style={{
            width: 'clamp(140px, 20vw, 300px)',
            height: 'clamp(140px, 20vw, 300px)',
            opacity: 0.35,
            transform: corner.transform,
            // farthest-side, not the default farthest-corner: percentages must
            // resolve against the box side, or the fade zone lands mid-web and
            // shears the outer arcs off into floating fragments.
            WebkitMaskImage: 'radial-gradient(circle farthest-side at 0 0, #000 45%, transparent 88%)',
            maskImage: 'radial-gradient(circle farthest-side at 0 0, #000 45%, transparent 88%)',
          }}
        >
          <svg viewBox={`0 0 ${VB} ${VB}`} preserveAspectRatio="none" className="corner-web h-full w-full">
            {WEB.spokes.map((s, i) => (
              <line
                key={`s${i}`}
                className="corner-web-line"
                x1={s.x0}
                y1={s.y0}
                x2={s.x1}
                y2={s.y1}
                pathLength={1}
                strokeWidth={0.8}
                vectorEffect="non-scaling-stroke"
                style={{ animationDelay: `${s.delay}ms` }}
              />
            ))}
            {WEB.rings.map((ring, i) => (
              <path
                key={`r${i}`}
                className="corner-web-line"
                d={ring.d}
                pathLength={1}
                fill="none"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                style={{ animationDelay: `${ring.delay}ms` }}
              />
            ))}
          </svg>
        </div>
      ))}
    </div>
  )
}
