import type { Variants, Transition } from 'framer-motion'

/** Standard easing used across the site (matches the existing inline cubic-bezier). */
export const EASE = [0.25, 0.46, 0.45, 0.94] as const

/** Reusable duration + ease bundles for one-off transitions. */
export const transitions: Record<'fast' | 'base' | 'slow', Transition> = {
  fast: { duration: 0.3, ease: EASE },
  base: { duration: 0.55, ease: EASE },
  slow: { duration: 0.7, ease: EASE },
}

/** Fade-up reveal for scroll-in content. Pair with `whileInView="visible"`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
}

/** Container that staggers its children's reveals. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
