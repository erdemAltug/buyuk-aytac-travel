import { MetadataRoute } from 'next';
import { getToursByDB } from '@/lib/tours';
import { ITour } from '@/models/Tour';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Veritabanından direkt tur verilerini getir (API yerine)
    const tours = await getToursByDB();
    
    // Turlar için sitemap entry'leri oluştur
    const tourEntries = tours.map((tour: ITour) => ({
      url: `https://www.buyukaytacseyahat.com/tours/${tour.slug}`,
      lastModified: tour.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    
    // Statik sayfalar için sitemap entry'leri
    const routes = [
      {
        url: 'https://www.buyukaytacseyahat.com',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/tours',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/tours?tourType=domestic',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/tours?tourType=international',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/tours?accommodationType=with_accommodation',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/tours?accommodationType=daily',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/annual-program',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
    ];
    
    // Tüm sitemap entry'lerini birleştir
    return [...routes, ...tourEntries];
  } catch (error) {
    console.error('Sitemap oluşturma hatası:', error);
    // Hata durumunda en azından statik sayfaların sitemap'ini döndür
    return [
      {
        url: 'https://www.buyukaytacseyahat.com',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/tours',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytacseyahat.com/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    ];
  }
} 