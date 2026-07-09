export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://renderlocalwebsites.com'

/**
 * Escape < so a "</script>" sequence inside the data can never close the
 * JSON-LD script tag. Use as: dangerouslySetInnerHTML={jsonLdHtml(data)}
 */
export function jsonLdHtml(data: object): { __html: string } {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function serviceJsonLd(options: {
  name: string
  description: string
  path: string
  serviceType: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    url: `${SITE_URL}${options.path}`,
    serviceType: options.serviceType,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Render',
      url: SITE_URL,
      email: 'renderlocalwebsites@gmail.com',
    },
    areaServed: [
      { '@type': 'City', name: 'Randolph, NJ' },
      { '@type': 'City', name: 'Denville, NJ' },
      { '@type': 'City', name: 'Morristown, NJ' },
      { '@type': 'City', name: 'Parsippany, NJ' },
      { '@type': 'City', name: 'Madison, NJ' },
      { '@type': 'AdministrativeArea', name: 'Morris County, NJ' },
    ],
  }
}

export function articleJsonLd(options: {
  headline: string
  description: string
  path: string
  datePublished: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    url: `${SITE_URL}${options.path}`,
    datePublished: options.datePublished,
    author: [
      { '@type': 'Person', name: 'Tim Pactwa' },
      { '@type': 'Person', name: 'Luke Wilkins' },
    ],
    publisher: { '@type': 'Organization', name: 'Render', url: SITE_URL },
  }
}
