import Link from 'next/link'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <div className="bg-white border border-neutral-200 p-8 md:p-10 hover:shadow-card-hover hover:border-accent/30 transition-all duration-300 group">
      <div className="w-12 h-12 bg-blue-50 flex items-center justify-center text-accent mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-black text-charcoal mb-3">{title}</h3>
      <p className="text-neutral-600 text-base leading-relaxed mb-6">{description}</p>
      <Link href={href} className="text-accent font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
        Learn more <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
