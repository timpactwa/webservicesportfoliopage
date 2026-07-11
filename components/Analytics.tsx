'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * GA4 loader. Renders nothing until NEXT_PUBLIC_GA_ID is set, so the site ships
 * zero analytics JS (and zero cookies) until Tim creates the property and pastes
 * the G-XXXX id into the env.
 *
 * gtag.js is heavy (~160KB over the wire) and its execution shows up as load-time
 * long tasks, so we hold the library back until the visitor first interacts (or a
 * 6s idle fallback fires, so no-interaction sessions still report). The dataLayer
 * shim below still runs at afterInteractive, so window.gtag exists immediately:
 * any track() call made before the library lands queues on dataLayer, and gtag.js
 * drains the queue when it arrives. Splitting the two is what makes the defer safe.
 */
export default function Analytics() {
  const [loadLib, setLoadLib] = useState(false)

  useEffect(() => {
    if (!GA_ID || loadLib) return
    const trigger = () => setLoadLib(true)
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const
    events.forEach((e) => window.addEventListener(e, trigger, { once: true, passive: true }))
    const idle = window.setTimeout(trigger, 6000)
    return () => {
      events.forEach((e) => window.removeEventListener(e, trigger))
      window.clearTimeout(idle)
    }
  }, [loadLib])

  if (!GA_ID) return null

  return (
    <>
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
      {loadLib && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
      )}
    </>
  )
}
