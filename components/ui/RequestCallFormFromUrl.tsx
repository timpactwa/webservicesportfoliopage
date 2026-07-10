'use client'

import { useSearchParams } from 'next/navigation'
import RequestCallForm, { type CallIntent } from './RequestCallForm'

const INTENTS: readonly CallIntent[] = ['mockup', 'ai', 'seo']

function asIntent(value: string | null): CallIntent | null {
  return INTENTS.includes(value as CallIntent) ? (value as CallIntent) : null
}

/**
 * Supplies RequestCallForm's tier and intent from the query string. Split out so
 * that useSearchParams, which forces a Suspense boundary, stays out of the form
 * itself and out of the booking modal.
 */
export default function RequestCallFormFromUrl() {
  const searchParams = useSearchParams()
  return (
    <RequestCallForm tier={searchParams.get('tier')} intent={asIntent(searchParams.get('intent'))} />
  )
}
