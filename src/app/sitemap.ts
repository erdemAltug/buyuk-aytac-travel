import { MetadataRoute } from 'next';
import { getToursByDB } from '@/lib/tours';
import { ITour } from '@/models/Tour';
import Blog from '@/models/Blog';
import Destination from '@/models/Destination';
import dbConnect from '@/lib/dbConnect';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await dbConnect();
    
    // Veritabanından direkt tur verilerini getir
    const tours = await getToursByDB();
    
    // Veritabanından yayınlanmış blog yazılarını getir
    const blogs = await Blog.find({ isPublished: true }).lean();
    
    // Veritabanından aktif destinasyonları getir
    const destinations = await Destination.find({ isActive: true }).lean();
    
    // Turlar için sitemap entry'leri oluştur
    const tourEntries = tours.map((tour: ITour) => ({
      url: `https://www.buyukaytactravel.com/tours/${tour.slug}`,
      lastModified: tour.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    
    // Blog yazıları için sitemap entry'leri oluştur
    const blogEntries = blogs.map((blog) => ({
      url: `https://www.buyukaytactravel.com/blog/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
    
    // Destinasyonlar için sitemap entry'leri oluştur
    const destinationEntries = destinations.map((destination) => ({
      url: `https://www.buyukaytactravel.com/destinasyonlar/${destination.slug}`,
      lastModified: destination.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    
    // Statik sayfalar için sitemap entry'leri
    const routes = [
      {
        url: 'https://www.buyukaytactravel.com',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: 'https://www.buyukaytactravel.com/blog',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/destinasyonlar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours?tourType=domestic',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours?tourType=international',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours?accommodationType=with_accommodation',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours?accommodationType=daily',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tour-calendar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/group-tour',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/annual-program',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/location',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: 'https://www.buyukaytactravel.com/faq',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: 'https://www.buyukaytactravel.com/terms',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
      {
        url: 'https://www.buyukaytactravel.com/privacy',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      },
    ];
    
    // Tüm sitemap entry'lerini birleştir
    return [...routes, ...tourEntries, ...blogEntries, ...destinationEntries];
  } catch (error) {
    console.error('Sitemap oluşturma hatası:', error);
    // Hata durumunda en azından statik sayfaların sitemap'ini döndür
    return [
      {
        url: 'https://www.buyukaytactravel.com',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: 'https://www.buyukaytactravel.com/blog',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/destinasyonlar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/about',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/contact',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/terms',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      },
      {
        url: 'https://www.buyukaytactravel.com/faq',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }
    ];
  }
} 