import ScanlineHeading from '../../components/ui/ScanlineHeading'

export function SectionHeading() {
  return (
    <ScanlineHeading as="h2" className="text-3xl font-black text-charcoal" delay={0}>
      Frequently Asked Questions
    </ScanlineHeading>
  )
}

export function PageHeading() {
  return (
    <ScanlineHeading as="h1" className="text-4xl font-black text-charcoal" delay={0}>
      Founder-led. Agency quality.
    </ScanlineHeading>
  )
}
