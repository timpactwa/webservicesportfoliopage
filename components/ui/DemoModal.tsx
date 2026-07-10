'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { useDialog } from './useDialog'

interface DemoModalProps {
  url: string
  title: string
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ url, title, isOpen, onClose }: DemoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useDialog({ isOpen, onClose, initialFocusRef: closeButtonRef })

  const displayUrl = url.replace(/^https?:\/\//, '')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-black/90"
          onClick={onClose}
        >
          {/* Browser chrome */}
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-[#1e1e1e] border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window dots */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>

            {/* URL bar */}
            <div className="flex-1 flex items-center gap-2 bg-[#2c2c2c] rounded px-3 py-1.5 min-w-0">
              <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm text-neutral-300 font-mono truncate">{displayUrl}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1"
                title="Open in new tab"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="hidden sm:inline">Open</span>
              </a>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="flex items-center justify-center w-7 h-7 text-neutral-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                aria-label="Close preview"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* iframe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={url}
              title={title}
              className="w-full h-full border-0"
              allow="fullscreen"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
