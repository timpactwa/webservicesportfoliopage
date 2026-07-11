const isDev = process.env.NODE_ENV === 'development'

// Next.js injects inline scripts for hydration, so script-src needs 'unsafe-inline'.
// Dev mode additionally needs 'unsafe-eval' (source maps) and ws: (hot reload).
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:", // data: covers the bg-grid-pattern SVG token
  "font-src 'self'",
  // contact form submissions + GA4 collection endpoints
  `connect-src 'self' https://api.web3forms.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://cloudflareinsights.com${isDev ? ' ws:' : ''}`,
  'frame-src https://*.vercel.app', // live demo previews
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Explicitly disabled per OWASP guidance: the legacy XSS auditor is
            // removed from modern browsers and could be abused in old ones. CSP
            // above is the real protection.
            key: 'X-XSS-Protection',
            value: '0',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            // Isolates our browsing-context group so a cross-origin popup can't
            // reach back through window.opener. No effect on the demo iframes.
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
