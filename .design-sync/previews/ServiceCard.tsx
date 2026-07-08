import ServiceCard from '../../components/ui/ServiceCard'

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

export function WebDesign() {
  return (
    <ServiceCard
      icon={<WebIcon />}
      title="Web Design & Development"
      description="Custom Next.js sites that load fast, rank in local search, and turn visitors into customers."
      href="#"
    />
  )
}

export function AIConsulting() {
  return (
    <ServiceCard
      icon={<AIIcon />}
      title="AI Consulting & Automation"
      description="Lead follow-up, intake, and busywork, handled."
      href="#"
    />
  )
}
