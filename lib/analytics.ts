type GtagParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Fire a GA4 event. Safe no-op when analytics isn't loaded, which is the case
 * whenever NEXT_PUBLIC_GA_ID is unset, so call sites never need to guard.
 */
export function track(event: string, params?: GtagParams) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', event, params)
}
