import PricingCard from '../../components/ui/PricingCard'

export function Starter() {
  return (
    <PricingCard
      tier="Starter"
      priceRange="$500"
      monthlyRange="$50/mo"
      summary="For a business that needs a clean, professional site online fast."
      note="Founding client pricing, limited to our first clients."
      ctaLabel="Book a Call About Starter"
      ctaHref="#"
      features={[
        '1-3 page website',
        'Mobile-ready responsive build',
        'Contact form',
        'Launch-ready page structure',
        'Basic on-page SEO',
        'Google Analytics setup',
      ]}
    />
  )
}

export function StandardHighlighted() {
  return (
    <PricingCard
      tier="Standard"
      priceRange="$750"
      monthlyRange="$75/mo"
      summary="For a business ready to show up in local search and look like the obvious choice."
      isHighlighted
      badge="Most Chosen"
      note="Founding client pricing, limited to our first clients."
      ctaLabel="Book a Call About Standard"
      ctaHref="#"
      features={[
        '4-6 page website',
        'Service-focused page layouts',
        'Blog or news section',
        'Local SEO setup',
        'Performance optimization',
        'Analytics and conversion tracking',
      ]}
    />
  )
}

export function Premium() {
  return (
    <PricingCard
      tier="Premium"
      priceRange="$2,000"
      monthlyRange="$125/mo"
      summary="For a business that wants bookings and leads running without you chasing them."
      note="Founding client pricing, limited to our first clients."
      ctaLabel="Book a Call About Premium"
      ctaHref="#"
      features={[
        '7+ page custom website',
        'Booking or lead workflow integration',
        'Custom animations or interactive sections',
        'Expanded local SEO structure',
        'Analytics dashboard',
        'Priority launch support',
      ]}
    />
  )
}

export function Custom() {
  return (
    <PricingCard
      tier="Custom"
      priceRange="Let's talk"
      monthlyRange="Scoped with you"
      summary="Multiple locations, online ordering, or AI automation built into the build."
      ctaLabel="Scope My Project"
      ctaHref="#"
      features={[
        'Multi-location or franchise builds',
        'E-commerce and online ordering',
        'AI automation built into the site',
        'Custom integrations with your tools',
        'A fixed number before you commit',
        'Never a vague "contact us for a quote"',
      ]}
    />
  )
}
