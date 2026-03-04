import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/test-sentry'],
    },
    sitemap: 'https://www.buyukaytactravel.com/sitemap.xml',
  }
} 