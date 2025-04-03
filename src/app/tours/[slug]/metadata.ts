import { Metadata } from 'next';
import { getTourBySlug } from '@/services/tourService';

// Metadata generation function for better SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Bu fonksiyon server-side çalışacak ve tur verilerini çekecek
  try {
    const tour = await getTourBySlug(params.slug);
    
    if (!tour) {
      return {
        title: 'Tur Bulunamadı | Büyük Aytaç Travel',
        description: 'Aradığınız tur bulunamadı veya kaldırılmış olabilir.',
      };
    }
    
    // Tur başlığına göre SEO meta verilerini oluştur
    const title = `${tour.name} | ${tour.destination} | Büyük Aytaç Travel Turları`;
    
    // Açıklama tur açıklamasından oluşturulur (kısa tutmak için)
    const description = tour.description.length > 160 
      ? `${tour.description.substring(0, 157)}...` 
      : tour.description;
      
    // Tur tipine ve özelliklerine göre anahtar kelimeleri ayarla
    const keywordString = `${tour.name}, ${tour.destination}, ${tour.duration}, ${tour.price} TL, ${tour.accommodationType === 'with_accommodation' ? 'konaklamalı tur' : 'günübirlik gezi'}, ${tour.tourType === 'domestic' ? 'yurtiçi tur' : 'yurtdışı tur'}, Büyük Aytaç Travel`;
    
    return {
      title,
      description,
      keywords: keywordString,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: tour.createdAt?.toString(),
        modifiedTime: tour.updatedAt?.toString(),
        url: `https://www.buyukaytacseyahat.com/tours/${tour.slug}`,
        images: [
          {
            url: tour.image,
            width: 1200,
            height: 630,
            alt: tour.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [tour.image],
      },
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'Tur Detayı | Büyük Aytaç Travel',
      description: 'Büyük Aytaç Travel ile unutulmaz tur deneyimleri yaşayın',
    };
  }
} 