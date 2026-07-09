import Link from 'next/link'
import ServiceCard from '@/components/ui/ServiceCard'
import UseCaseCard from '@/components/ui/UseCaseCard'
import Reveal from '@/components/ui/Reveal'
import { AI_USE_CASES } from '@/lib/data'

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

export default function HomeServices() {
  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-32 bg-bg">
      <div className="container-studio">
        <Reveal className="mb-14">
          <p className="eyebrow mb-4 text-xs text-accent-dark">What we do</p>
          <h2 className="text-display-xl text-graphite">
            Websites first. Automation where it pays.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal index={0} className="h-full">
            <ServiceCard
              icon={<WebIcon />}
              title="Web Design & Development"
              description="Custom-built websites that load fast, rank in local search, and turn visitors into customers."
              href="/services/web-design"
            />
          </Reveal>
          <Reveal index={1} className="h-full">
            <ServiceCard
              icon={<AIIcon />}
              title="AI Consulting & Automation"
              description="The follow-ups, intake forms, and after-hours questions you don't have time for, answered automatically."
              href="/services/ai-automation"
            />
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal className="mb-8">
            <p className="eyebrow text-xs text-accent-dark">AI in practice</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AI_USE_CASES.slice(0, 3).map((useCase, index) => (
              <Reveal key={useCase.title} index={index} className="h-full">
                <UseCaseCard title={useCase.title} description={useCase.description} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-8">
            <Link
              href="/services/ai-automation"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2"
            >
              See all six AI use cases <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
