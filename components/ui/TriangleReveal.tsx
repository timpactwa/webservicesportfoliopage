'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Mosaic render-in: small opaque triangles assemble into a placeholder "photo",
 * picking up the destination art's own colors as they place, finished with a soft
 * diagonal gloss sweep. React port of design_handoff_render_rebrand/triangle-reveal.js.
 *
 * Splits the frame into an rows×cols grid of right-triangle pairs; each SVG polygon
 * is filled from the sampled art at its centroid, then fades/scales in staggered by
 * distance from the top-left. Replays on scroll-into-view (once) and on click.
 * Only wrap real photography/screenshots with this — never text or UI chrome.
 *
 * No photos supplied yet, so it paints a generated placeholder gradient. When real
 * images arrive, swap paintPlaceholder for sampling the actual <img>/canvas content.
 */

const VB_W = 400
const VB_H = 260
const SVG_NS = 'http://www.w3.org/2000/svg'

type Tone = 'a' | 'b'

const TONES: Record<Tone, { bg0: string; bg1: string; bg2: string; glow: string; gloss: string; label: string }> = {
  a: {
    bg0: '#1c2321', bg1: '#2b3a37', bg2: '#4a6b63',
    glow: 'rgba(154, 214, 200, 0.35)', gloss: 'rgba(255,255,255,0.55)', label: '#cfe8df',
  },
  b: {
    bg0: '#2a2320', bg1: '#4a3a2f', bg2: '#7a8f7a',
    glow: 'rgba(233, 201, 158, 0.30)', gloss: 'rgba(255,244,230,0.55)', label: '#f2e3ce',
  },
}

function paintPlaceholder(ctx: CanvasRenderingContext2D, tone: Tone, label: string) {
  const t = TONES[tone] || TONES.a
  ctx.clearRect(0, 0, VB_W, VB_H)

  const grad = ctx.createLinearGradient(0, 0, VB_W, VB_H)
  grad.addColorStop(0, t.bg0)
  grad.addColorStop(0.55, t.bg1)
  grad.addColorStop(1, t.bg2)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, VB_W, VB_H)

  const rg = ctx.createRadialGradient(VB_W * 0.68, VB_H * 0.34, 10, VB_W * 0.68, VB_H * 0.34, VB_W * 0.6)
  rg.addColorStop(0, t.glow)
  rg.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = rg
  ctx.fillRect(0, 0, VB_W, VB_H)

  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.lineWidth = 1
  for (let x = 0; x <= VB_W; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, VB_H); ctx.stroke()
  }
  for (let y = 0; y <= VB_H; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(VB_W, y); ctx.stroke()
  }

  if (label) {
    ctx.font = '10px "SF Mono", "IBM Plex Mono", monospace'
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.textAlign = 'center'
    ctx.fillText('· ' + label + ' ·', VB_W / 2, VB_H - 14)
  }
}

interface TriangleRevealProps {
  tone?: Tone
  rows?: number
  cols?: number
  label?: string
  className?: string
  /** Show the "click to replay" hint on hover. Off for small thumbnails. */
  hint?: boolean
}

export default function TriangleReveal({
  tone = 'a',
  rows = 8,
  cols = 12,
  label = 'studio work',
  className,
  hint = false,
}: TriangleRevealProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const glossRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const trianglesRef = useRef<{ el: SVGPolygonElement; nx: number; ny: number }[]>([])

  useEffect(() => {
    const svg = svgRef.current
    const gloss = glossRef.current
    const stage = stageRef.current
    if (!svg || !gloss || !stage) return

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // Build the mesh: sample colors from a painted placeholder.
    const canvas = document.createElement('canvas')
    canvas.width = VB_W
    canvas.height = VB_H
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    paintPlaceholder(ctx, tone, label)
    const data = ctx.getImageData(0, 0, VB_W, VB_H).data

    const sample = (x: number, y: number) => {
      x = Math.max(0, Math.min(VB_W - 1, Math.round(x)))
      y = Math.max(0, Math.min(VB_H - 1, Math.round(y)))
      const i = (y * VB_W + x) * 4
      return `rgb(${data[i]}, ${data[i + 1]}, ${data[i + 2]})`
    }

    const cw = VB_W / cols
    const ch = VB_H / rows
    const tris: [number, number][][] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x0 = c * cw, y0 = r * ch, x1 = x0 + cw, y1 = y0 + ch
        const TL: [number, number] = [x0, y0]
        const TR: [number, number] = [x1, y0]
        const BL: [number, number] = [x0, y1]
        const BR: [number, number] = [x1, y1]
        tris.push([TL, TR, BL])
        tris.push([TR, BR, BL])
      }
    }

    while (svg.firstChild) svg.removeChild(svg.firstChild)
    trianglesRef.current = tris.map(([p0, p1, p2]) => {
      const cx = (p0[0] + p1[0] + p2[0]) / 3
      const cy = (p0[1] + p1[1] + p2[1]) / 3
      const poly = document.createElementNS(SVG_NS, 'polygon')
      poly.setAttribute('points', `${p0.join(',')} ${p1.join(',')} ${p2.join(',')}`)
      poly.setAttribute('fill', sample(cx, cy))
      poly.style.transformBox = 'fill-box'
      poly.style.transformOrigin = 'center'
      if (reduced) poly.style.opacity = '1'
      svg.appendChild(poly)
      return { el: poly, nx: cx / VB_W, ny: cy / VB_H }
    })

    const replay = () => {
      const t = TONES[tone] || TONES.a
      stage.style.setProperty('--gloss-color', t.gloss)
      const maxD = 2
      let maxDelay = 0

      trianglesRef.current.forEach(({ el, nx, ny }) => {
        el.getAnimations().forEach((a) => a.cancel())
        if (reduced) {
          el.style.opacity = '1'
          el.style.transform = 'none'
          return
        }
        const d = (nx + ny) / maxD
        const delay = d * 900 + Math.random() * 90
        maxDelay = Math.max(maxDelay, delay)
        el.style.opacity = '0'
        el.animate(
          [
            { opacity: 0, transform: 'translateY(5px) scale(0.82)' },
            { opacity: 1, transform: 'translateY(0) scale(1)' },
          ],
          { duration: 480, delay, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' }
        )
      })

      gloss.getAnimations().forEach((a) => a.cancel())
      if (reduced) { gloss.style.opacity = '0'; return }
      gloss.style.opacity = '0'
      gloss.animate(
        [
          { transform: 'translateX(-40%) rotate(8deg)', opacity: 0 },
          { transform: 'translateX(10%) rotate(8deg)', opacity: 0.9, offset: 0.5 },
          { transform: 'translateX(70%) rotate(8deg)', opacity: 0 },
        ],
        { duration: 900, delay: maxDelay + 120, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' }
      )
    }

    const onClick = () => replay()
    stage.addEventListener('click', onClick)

    let io: IntersectionObserver | null = null
    if (reduced) {
      // nothing to observe — triangles already at final opacity
    } else {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            replay()
            io?.disconnect()
          }
        })
      }, { threshold: 0.35 })
      io.observe(stage)
    }

    return () => {
      stage.removeEventListener('click', onClick)
      io?.disconnect()
    }
  }, [tone, rows, cols, label])

  return (
    <div
      ref={stageRef}
      className={cn('group relative h-full w-full cursor-pointer overflow-hidden', className)}
      style={{ background: '#1c2321' }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 block h-full w-full"
        aria-hidden="true"
      />
      <div
        ref={glossRef}
        className="pointer-events-none absolute"
        style={{
          top: '-20%',
          left: '-60%',
          width: '60%',
          height: '140%',
          background: 'linear-gradient(100deg, transparent, var(--gloss-color, rgba(255,255,255,.55)), transparent)',
          mixBlendMode: 'overlay',
          opacity: 0,
        }}
      />
      {hint && (
        <div className="eyebrow pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/25 px-2 py-1.5 text-[10px] tracking-[0.06em] text-white/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          click to replay
        </div>
      )}
    </div>
  )
}
