import { MetadataRoute } from 'next';
import { getToursByDB } from '@/lib/tours';
import { ITour } from '@/models/Tour';
import Blog from '@/models/Blog';
import Destination from '@/models/Destination';
import dbConnect from '@/lib/dbConnect';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    await dbConnect();
    
    // Veritabanından sadece aktif turları getir
    const tours = await getToursByDB({ isActive: true });
    
    // Veritabanından yayınlanmış blog yazılarını getir
    const blogsRaw = await Blog.find({ isPublished: true });
    // Mongoose document'larını object'e çevir
    const blogs = blogsRaw.map(blog => blog.toObject());
    
    // Veritabanından aktif destinasyonları getir
    const destinationsRaw = await Destination.find({ isActive: true });
    // Mongoose document'larını object'e çevir
    const destinations = destinationsRaw.map(dest => dest.toObject());
    
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
    // Sadece mevcut sayfaları ekleyin
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
      {
        url: 'https://www.buyukaytactravel.com/annual-program',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/group-tour',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/tour-calendar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      // Yeni SEO sayfaları
      {
        url: 'https://www.buyukaytactravel.com/gap-turu',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/karadeniz-turu',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/kapadokya-turu',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/populer-turlar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      // Çerkezköy turları
      {
        url: 'https://www.buyukaytactravel.com/cerkezkoy-tur',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
      },
      {
        url: 'https://www.buyukaytactravel.com/cerkezkoy-gunubirlik-turlar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      {
        url: 'https://www.buyukaytactravel.com/cerkezkoy-konakamali-turlar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      // Bölgesel turlar
      {
        url: 'https://www.buyukaytactravel.com/location',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/location/tekirdag',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      // Destinations (English)
      {
        url: 'https://www.buyukaytactravel.com/destinations',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      // Tur kategorileri
      {
        url: 'https://www.buyukaytactravel.com/tours/daily',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours/overnight',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours/domestic',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours/international',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours/last-minute',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
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
      },
      // Çerkezköy turları
      {
        url: 'https://www.buyukaytactravel.com/cerkezkoy-gunubirlik-turlar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/cerkezkoy-konakamali-turlar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      // Bölgesel turlar
      {
        url: 'https://www.buyukaytactravel.com/location',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/location/tekirdag',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      // Tur kategorileri
      {
        url: 'https://www.buyukaytactravel.com/tours/daily',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours/overnight',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours/domestic',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours/international',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/tours/last-minute',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      // Destinations (English)
      {
        url: 'https://www.buyukaytactravel.com/destinations',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      // Popüler turlar
      {
        url: 'https://www.buyukaytactravel.com/populer-turlar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      },
      // Özel tur sayfaları
      {
        url: 'https://www.buyukaytactravel.com/gap-turu',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/karadeniz-turu',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://www.buyukaytactravel.com/kapadokya-turu',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      // Diğer sayfalar
      {
        url: 'https://www.buyukaytactravel.com/annual-program',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/group-tour',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://www.buyukaytactravel.com/tour-calendar',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ];
  }
} 