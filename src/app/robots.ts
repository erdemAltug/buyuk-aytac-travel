import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /api/ engelleme: ana sayfa turlar/blog için /api/tours ve /api/blogs çağırıyor;
      // Googlebot bu istekleri yapamazsa sayfa boş indexlenir.
      disallow: ['/admin/', '/hesabim', '/giris', '/kayit'],
    },
    sitemap: 'https://www.buyukaytactravel.com/sitemap.xml',
  }
} 