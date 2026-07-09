'use client'

import { useEffect, useRef, useState } from 'react'

type Phase = 'start' | 'inbound' | 'typing' | 'reply' | 'sent'

const INBOUND_TEXT = 'Hi! Do you do quotes for a roof leak? Kind of urgent.'
// Reply copy is illustrative, not a real customer transcript. The design source
// has an em dash after "reaching out"; the project bans em dashes in shipped
// copy, so it is replaced with a period per the brief.
const REPLY_TEXT =
  "Thanks for reaching out. I can get a quote started. What's your address, and does tomorrow morning work for a callback?"
const TYPE_MS = 24

/**
 * Animated after-hours inbox widget for the AI Automation hero. Runs a looping
 * state machine (start -> inbound -> typing -> reply -> sent) driven entirely by
 * timers cleaned up on unmount, on every restart, and whenever the reduced-motion
 * preference flips. Under prefers-reduced-motion it renders the final resolved
 * state with no timers. The server render (and first client render) is the final
 * static state, so no-JS visitors see a complete, sensible example.
 */
export default function InboxDemo() {
  const [phase, setPhase] = useState<Phase>('sent')
  const [charCount, setCharCount] = useState(REPLY_TEXT.length)

  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([])
  const typeInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    const clearAll = () => {
      timers.current.forEach((id) => clearTimeout(id))
      timers.current = []
      if (typeInterval.current !== null) {
        clearInterval(typeInterval.current)
        typeInterval.current = null
      }
    }

    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms)
      timers.current.push(id)
    }

    const runCycle = () => {
      setPhase('start')
      setCharCount(0)
      later(() => {
        setPhase('inbound')
        later(() => {
          setPhase('typing')
          later(() => {
            setPhase('reply')
            setCharCount(0)
            let count = 0
            typeInterval.current = setInterval(() => {
              count += 1
              setCharCount(count)
              if (count >= REPLY_TEXT.length) {
                if (typeInterval.current !== null) {
                  clearInterval(typeInterval.current)
                  typeInterval.current = null
                }
                later(() => {
                  setPhase('sent')
                  later(runCycle, 3800)
                }, 300)
              }
            }, TYPE_MS)
          }, 1000)
        }, 900)
      }, 500)
    }

    const start = () => {
      clearAll()
      if (media.matches) {
        setPhase('sent')
        setCharCount(REPLY_TEXT.length)
      } else {
        runCycle()
      }
    }

    start()
    media.addEventListener('change', start)

    return () => {
      media.removeEventListener('change', start)
      clearAll()
    }
  }, [])

  const showInbound = phase !== 'start'
  const showTyping = phase === 'typing'
  const showReply = phase === 'reply' || phase === 'sent'
  const showCaret = phase === 'reply'
  const showSent = phase === 'sent'
  const replyText = showReply ? REPLY_TEXT.slice(0, charCount) : ''

  return (
    <div className="w-full max-w-md rounded-card bg-bg p-[22px] shadow-hero-visual">
      <style>{`
        @keyframes inboxBubbleIn { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes inboxDotPulse { 0%, 80%, 100% { opacity: 0.25; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-3px); } }
        @keyframes inboxCaretBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        .inbox-bubble-in { animation: inboxBubbleIn 380ms ease-out both; }
        .inbox-dot { width: 6px; height: 6px; border-radius: 9999px; background: #fff; animation: inboxDotPulse 1s ease-in-out infinite; }
        .inbox-caret { display: inline-block; margin-left: 1px; animation: inboxCaretBlink 0.9s step-start infinite; }
        @media (prefers-reduced-motion: reduce) {
          .inbox-bubble-in, .inbox-dot, .inbox-caret { animation: none; }
        }
      `}</style>

      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-accent-dark">
          After-hours inquiry · live example
        </p>
        <span className="flex items-center gap-1.5 font-display text-[10px] font-semibold text-graphite-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          AI active
        </span>
      </div>

      <div className="flex min-h-[190px] flex-col justify-end gap-2.5">
        {showInbound && (
          <div className="inbox-bubble-in max-w-[78%] self-start rounded-[14px_14px_14px_4px] border border-hairline bg-white px-3.5 py-[11px]">
            <p className="text-[13px] leading-[1.5] text-graphite">{INBOUND_TEXT}</p>
            <p className="mt-1 text-[10px] text-graphite-soft">9:42 PM</p>
          </div>
        )}

        {showTyping && (
          <div className="inbox-bubble-in flex gap-1 self-end rounded-[14px_14px_4px_14px] bg-accent-dark px-4 py-3">
            <span className="inbox-dot" />
            <span className="inbox-dot" style={{ animationDelay: '0.15s' }} />
            <span className="inbox-dot" style={{ animationDelay: '0.3s' }} />
          </div>
        )}

        {showReply && (
          <div className="inbox-bubble-in max-w-[82%] self-end rounded-[14px_14px_4px_14px] bg-accent-dark px-3.5 py-[11px]">
            <p className="text-[13px] leading-[1.5] text-white">
              {replyText}
              {showCaret && (
                <span className="inbox-caret" aria-hidden="true">
                  {'▌'}
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {showSent && (
        <div className="inbox-bubble-in mt-3.5 flex gap-2.5 border-t border-hairline pt-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-[5px] font-display text-[10.5px] font-semibold text-accent-dark">
            {'✓'} Replied in 8 seconds
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-[5px] font-display text-[10.5px] font-semibold text-graphite-soft">
            {'✓'} Logged to CRM
          </span>
        </div>
      )}
    </div>
  )
}
