'use client'

import { useState } from 'react'
import Button from './Button'
import AiDemoModal from './AiDemoModal'

/**
 * Client island that holds the open/close state for the homepage AI demo modal, so
 * HomeServices can stay a server component and only this trigger ships JS.
 */
export default function SeeItWorkButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
      >
        See it work
      </Button>
      <AiDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
