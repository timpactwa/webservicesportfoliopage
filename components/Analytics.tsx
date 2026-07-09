import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * GA4 loader. Renders nothing until NEXT_PUBLIC_GA_ID is set, so the site
 * ships zero analytics JS (and zero cookies) until Tim creates the property
 * and pastes the G-XXXX id into the env.
 */
export default function Analytics() {
  if (!GA_ID) return null

  return (
    <>
      {/*
        The gtag.js library waits for window.load. At afterInteractive it lands in
        the middle of hydration and competes with it: on a slow CPU that costs 360ms
        of blocking time and 16 Lighthouse points.

        The shim below still runs at afterInteractive, so window.gtag exists long
        before the library does. Calls made in between queue on dataLayer, and
        gtag.js drains the queue when it arrives, so track() never drops an event.
        Splitting the two is what makes the lazy load safe.
      */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  )
}
