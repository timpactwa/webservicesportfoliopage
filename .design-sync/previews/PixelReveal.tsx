import PixelReveal from '../../components/ui/PixelReveal'

export function WrappingSection() {
  return (
    <PixelReveal pixelSize={16}>
      <div style={{ padding: 24, background: '#F5F5F5' }}>
        <h3 className="text-2xl font-black text-charcoal mb-2">AI Consulting & Automation</h3>
        <p className="text-neutral-600">Lead follow-up, intake, and busywork, handled.</p>
      </div>
    </PixelReveal>
  )
}
