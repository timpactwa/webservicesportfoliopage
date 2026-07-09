const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

/** Thrown when NEXT_PUBLIC_WEB3FORMS_KEY isn't set. Callers show a "form not connected, email us" message. */
export class Web3FormsNotConfiguredError extends Error {
  constructor() {
    super('NEXT_PUBLIC_WEB3FORMS_KEY is not set')
    this.name = 'Web3FormsNotConfiguredError'
  }
}

/**
 * POST a submission to Web3Forms (delivers as email to the account inbox).
 * Throws Web3FormsNotConfiguredError when no key is configured, or a plain
 * Error when the API rejects the submission.
 */
export async function submitToWeb3Forms(payload: Record<string, unknown>): Promise<void> {
  if (!ACCESS_KEY) throw new Web3FormsNotConfiguredError()

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: ACCESS_KEY, ...payload }),
  })

  const result = await response.json()
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Submission failed')
  }
}
