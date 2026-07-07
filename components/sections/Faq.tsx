'use client'

import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { FAQ_ITEMS } from '@/lib/data'
import PixelReveal from '@/components/ui/PixelReveal'
import ScanlineHeading from '@/components/ui/ScanlineHeading'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()

  return (
    <PixelReveal pixelSize={16}>
      <section className="py-20 md:py-32 bg-white">
        <div className="container-studio">
          <div className="mb-12 md:mb-14">
            <p className="text-accent font-bold text-sm uppercase tracking-widest mb-4">
              FAQ
            </p>
            <ScanlineHeading as="h2" className="text-display-xl font-black text-charcoal" delay={0.3}>
              Questions, answered.
            </ScanlineHeading>
          </div>

          <div className="max-w-3xl border-t border-neutral-200">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-button-${index}`
              return (
                <div key={item.question} className="border-b border-neutral-200">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <span className="text-lg font-bold text-charcoal group-hover:text-accent transition-colors duration-200">
                        {item.question}
                      </span>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 text-accent transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    className={`grid ${reduceMotion ? '' : 'transition-[grid-template-rows] duration-300 ease-out'}`}
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      aria-hidden={!isOpen}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-neutral-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PixelReveal>
  )
}
