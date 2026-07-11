import Button from '@/components/ui/Button'
import CardChatDemo from '@/components/ui/CardChatDemo'
import DemoIframePreview from '@/components/ui/DemoIframePreview'
import Reveal from '@/components/ui/Reveal'
import ServiceCard from '@/components/ui/ServiceCard'
import { PROJECTS } from '@/lib/data'

const WebIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9" />
  </svg>
)

const AIIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

// The web card embeds a real deployed demo. Any brand except Hartline works; the AI
// card's chat animation is already branded Hartline Builders, so a different brand
// here keeps the two cards from echoing the same name.
const webDemo = PROJECTS.find((p) => p.demoUrl && p.projectName !== 'Hartline Builders')

export default function HomeServices() {
  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-32 bg-bg">
      <div className="container-studio">
        <Reveal className="mb-14">
          <p className="eyebrow mb-4 text-sm text-accent-dark">What we do</p>
          <h2 className="text-display-xl text-graphite">
            Websites first. Automation where it pays.
          </h2>
        </Reveal>

        {/* Both cards carry their media at the BOTTOM, under the Learn more pill: the
            web card its live demo iframe, the AI card its chat animation. Aligned
            rather than checkerboarded, so the two media blocks read as a matched pair.
            items-stretch keeps both cards the same height. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch">
          <Reveal index={0} className="h-full">
            <ServiceCard
              icon={<WebIcon />}
              title="Web Design & Development"
              description="Custom-built websites that load fast, rank in local search, and turn visitors into customers."
              href="/services/web-design"
              cta={
                /* The visible label stays "Learn more". The sr-only span makes the
                   anchor text descriptive for screen readers, for search engines,
                   and for Lighthouse's link-text audit, which reads innerText and
                   ignores aria-label. */
                <Button href="/services/web-design" variant="secondary" size="sm">
                  Learn more<span className="sr-only"> about web design and development</span>
                </Button>
              }
              bottomMedia={
                webDemo?.demoUrl ? (
                  <DemoIframePreview url={webDemo.demoUrl} title={webDemo.projectName} />
                ) : undefined
              }
            />
          </Reveal>

          <Reveal index={1} className="h-full">
            <ServiceCard
              icon={<AIIcon />}
              title="AI Consulting & Automation"
              description="The calls, forms, and questions you can't get to, answered automatically."
              href="/services/ai-automation"
              cta={
                <Button href="/services/ai-automation" variant="primary" size="sm">
                  Learn more<span className="sr-only"> about AI consulting and automation</span>
                </Button>
              }
              bottomMedia={<CardChatDemo />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
