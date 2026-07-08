import PricingCard from '../../components/ui/PricingCard'

export function Starter() {
  return (
    <PricingCard
      tier="Starter"
      priceRange="$500"
      monthlyRange="$50/mo"
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
      isHighlighted
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
