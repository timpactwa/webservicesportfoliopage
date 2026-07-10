import { FAQ_ITEMS } from '@/lib/data'
import Reveal from '@/components/ui/Reveal'

/**
 * The dense 2-column layout (option 7b) doesn't have room for all 10 FAQ_ITEMS,
 * so this is the highest-value subset: cost, timeline, ownership, the design
 * guarantee, SEO inclusion, and the monthly fee. Matched by question text so
 * the copy itself always stays sourced from lib/data.ts.
 */
const FEATURED_FAQ_QUESTIONS = [
  'How much does a website cost?',
  'How long until my site launches?',
  'Do I own my website?',
  "What if I don't like the design?",
  'Is SEO included?',
  'What does the monthly fee cover?',
]

// Exported so app/page.tsx builds its FAQPage JSON-LD from the same subset. Google
// requires structured data to match content visible on the page.
export const featuredFaqItems = FEATURED_FAQ_QUESTIONS.map((question) => {
  const item = FAQ_ITEMS.find((faq) => faq.question === question)
  if (!item) throw new Error(`Faq is out of sync with FAQ_ITEMS: "${question}"`)
  return item
})

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-32 bg-surface">
      <div className="container-studio">
        {/* No eyebrow. It read "FAQ" directly above a headline reading "FAQ". */}
        <Reveal className="mb-12 md:mb-14">
          <h2 className="text-display-xl text-graphite">FAQ</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featuredFaqItems.map((item, index) => (
            <Reveal key={item.question} index={index} className="rounded-[14px] bg-bg p-[18px]">
              <p className="font-display text-[13px] font-semibold text-graphite">{item.question}</p>
              <p className="mt-1.5 text-xs leading-[1.5] text-graphite-soft">{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
