import Button from '../../components/ui/Button'

export function Primary() {
  return (
    <Button variant="primary" size="lg" href="#">
      Book a Call
    </Button>
  )
}

export function SecondaryInverse() {
  return (
    <div style={{ background: '#0F0F0F', padding: 24 }}>
      <Button variant="secondary-inverse" size="lg" href="#">
        View Services
      </Button>
    </div>
  )
}

export function Secondary() {
  return (
    <Button variant="secondary" size="md" href="#">
      Get Started
    </Button>
  )
}

export function Ghost() {
  return (
    <Button variant="ghost" size="md" href="#">
      Learn more
    </Button>
  )
}

export function Disabled() {
  return (
    <Button variant="primary" size="md" disabled>
      Submitting...
    </Button>
  )
}
