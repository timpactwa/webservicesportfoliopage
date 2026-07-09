'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Tracks which homepage section is in the reading zone and returns its id.
 * Active = the last section (in document order) currently intersecting the
 * band defined by rootMargin, or null when nothing qualifies (e.g. scrolled
 * above the first section).
 *
 * Off the homepage this returns null and registers no observers. `ids` must be
 * a stable reference (define it at module scope) so the observer is not torn
 * down and rebuilt on every render.
 */
export function useActiveSection(ids: string[]): string | null {
  const pathname = usePathname()
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    // Only the homepage has these anchored sections.
    if (pathname !== '/') {
      setActiveId(null)
      return
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    // Track each section's current intersection state so we can always resolve
    // the last intersecting id in document order, not just the latest event.
    const intersecting = new Map<string, boolean>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersecting.set(entry.target.id, entry.isIntersecting)
        }
        let next: string | null = null
        for (const id of ids) {
          if (intersecting.get(id)) next = id
        }
        setActiveId(next)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname, ids])

  return activeId
}
