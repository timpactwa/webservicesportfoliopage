'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import BookingModal from '@/components/ui/BookingModal'
import Button from '@/components/ui/Button'
import TriangleReveal from '@/components/ui/TriangleReveal'
import type { CallIntent } from '@/components/ui/RequestCallForm'
import { GUARANTEE } from '@/lib/data'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Hero() {
  const reduce = useReducedMotion()
  const blobsRef = useRef<HTMLDivElement>(null)

  // Ambient parallax: two blurred blobs drift a few px opposite the cursor.
  // Cursor position is cached and the transform writes are coalesced into a
  // single rAF, so a fast mousemove never reads layout or thrashes the main thread.
  useEffect(() => {
    if (reduce) return
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return
    const container = blobsRef.current
    if (!container) return
    const blobs = Array.from(container.querySelectorAll<HTMLElement>('[data-depth]'))
    let vw = window.innerWidth
    let vh = window.innerHeight
    let nx = 0
    let ny = 0
    let raf = 0
    const apply = () => {
      raf = 0
      blobs.forEach((b) => {
        const depth = parseFloat(b.dataset.depth || '10')
        b.style.transform = `translate(${(nx * depth).toFixed(1)}px, ${(ny * depth).toFixed(1)}px)`
      })
    }
    const onMove = (e: MouseEvent) => {
      nx = e.clientX / vw - 0.5
      ny = e.clientY / vh - 0.5
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onResize = () => {
      vw = window.innerWidth
      vh = window.innerHeight
    }
    document.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce])

  const [booking, setBooking] = useState<{ intent: CallIntent | null } | null>(null)

  // Every CTA stays a real link to /contact. Left-clicking opens the modal
  // instead; Ctrl, Cmd, and Shift clicks fall through to the browser so a new
  // tab still works, and a visitor without JS still gets the contact page.
  const openBooking = (intent: CallIntent | null) => (event: React.MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setBooking({ intent })
  }

  // Block-level render-in: blur-to-sharp resolve, matching ResolveText's verb so
  // the whole hero arrives as one top-down pass rather than a set of fades.
  const resolve = (delay: number) =>
    reduce
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 8, filter: 'blur(6px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 0.9, delay, ease: EASE },
        }

  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-center md:pt-40">
        {/* Ambient parallax blobs */}
        <div ref={blobsRef} aria-hidden className="pointer-events-none absolute inset-0">
          <div
            data-depth="14"
            className="absolute left-[8%] top-[10%] h-64 w-64 rounded-full bg-accent-soft opacity-70 blur-[70px]"
          />
          <div
            data-depth="20"
            className="absolute bottom-[14%] right-[10%] h-56 w-56 rounded-full bg-surface opacity-90 blur-[60px]"
          />
        </div>

        {/* Signature render-in mosaic, subtle behind the copy, edges masked so the
            center stays clean and text-readable. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, black 85%)',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, black 85%)',
          }}
        >
          <TriangleReveal tone="a" rows={9} cols={14} label="" />
        </div>

        <motion.p
          {...resolve(0.1)}
          className="eyebrow relative mb-6 text-xs text-accent-dark"
        >
          Web Design &amp; Local SEO · Morris County, NJ
        </motion.p>

        {/* Static, server-rendered headline: this is the LCP element, so it must
            paint on first byte. No entrance animation lives on it (that used to add
            ~3.5s of LCP render delay); the render-in choreography stays on the
            surrounding eyebrow, CTAs, guarantee, and the mosaic behind it. */}
        <h1 className="relative max-w-4xl text-display-xl md:text-display-2xl">
          <span className="block">A Website That Actually</span>
          <span className="block text-accent-dark">Brings You Customers</span>
        </h1>

        <p className="relative mt-7 max-w-xl text-lg leading-relaxed text-graphite-soft">
          Affordable, fixed prices. Live demos you can click right now. Built by two founders in
          Morris County, NJ.
        </p>

        <motion.div {...resolve(0.3)} className="relative mt-9 flex flex-col gap-4 sm:flex-row">
          <Button variant="primary" size="lg" href="/contact" onClick={openBooking(null)}>
            Book a Free Call
          </Button>
        </motion.div>

        <motion.p {...resolve(0.45)} className="relative mt-8 text-sm font-medium text-accent-dark">
          {GUARANTEE.short}
        </motion.p>
      </section>

      <BookingModal
        isOpen={booking !== null}
        onClose={() => setBooking(null)}
        intent={booking?.intent ?? null}
      />
    </>
  )
}
