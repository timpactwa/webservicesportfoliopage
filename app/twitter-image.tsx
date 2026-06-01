// `runtime` must be a literal string assignment in this file — Next.js cannot
// statically recognize it when re-exported, which silently drops the edge runtime
// and breaks the build under @vercel/og on Windows. Re-export the rest.
export const runtime = 'edge'
export { alt, size, contentType, default } from './opengraph-image'
