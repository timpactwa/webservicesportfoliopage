'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** Stagger index — each sibling delays ~90ms more than the last. */
  index?: number
  /** Extra delay in seconds, added on top of the index stagger. */
  delay?: number
  /** Vertical travel in px. */
  y?: number
  as?: 'div' | 'section' | 'li' | 'span'
}

/**
 * One IntersectionObserver for every Reveal on the page rather than one each.
 * The homepage mounts two dozen of these, and an observer per element was a
 * measurable share of the main-thread cost on a slow CPU.
 */
let sharedObserver: IntersectionObserver | null = null
const onReveal = new WeakMap<Element, () => void>()

function observe(el: Element, reveal: () => void) {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          onReveal.get(entry.target)?.()
          onReveal.delete(entry.target)
          sharedObserver?.unobserve(entry.target)
        }
      },
      // Matches the old Framer viewport margin: 60px into view before firing.
      { rootMargin: '0px 0px -60px 0px' }
    )
  }

  onReveal.set(el, reveal)
  sharedObserver.observe(el)

  return () => {
    onReveal.delete(el)
    sharedObserver?.unobserve(el)
  }
}

/**
 * Generic scroll fade-up: opacity 0→1 + translateY, 0.8s, staggered by `index`.
 * The site-wide reveal for cards, paragraphs, and stat blocks. The transition
 * lives in globals.css under prefers-reduced-motion: no-preference, so a
 * reduced-motion visitor sees the final state with no transition at all.
 */
export default function Reveal({
  index = 0,
  delay = 0,
  y = 20,
  as = 'div',
  children,
  className,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const Tag = as as 'div'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Without an observer, or when the visitor asked for less motion, skip the
    // observer entirely and let the element sit in its final state.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.dataset.revealed = 'true'
      return
    }

    return observe(el, () => {
      el.dataset.revealed = 'true'
    })
  }, [])

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={
        {
          '--reveal-y': `${y}px`,
          '--reveal-delay': `${index * 0.09 + delay}s`,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  )
}
