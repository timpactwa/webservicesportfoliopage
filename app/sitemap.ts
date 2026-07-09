import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://renderlocalwebsites.com'

const routes: { path: string; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/web-design', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/services/local-seo', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/ai-automation', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/estimate', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/work', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/service-areas', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/guides', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/guides/choosing-a-web-designer-morris-county', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/guides/local-seo-checklist', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
