import { Suspense } from 'react';
import { Metadata } from 'next';
import { ITour } from '@/models/Tour';
import { getToursByDB } from '@/lib/tours';
import ToursContent from './components/ToursContent';

// SEO için metadata
export const metadata: Metadata = {
  title: 'Turlarımız | Yurtiçi ve Yurtdışı Turlar | Büyük Aytaç Travel',
  description: 'Büyük Aytaç Travel ile unutulmaz yurtiçi ve yurtdışı turları keşfedin. Konaklamalı turlar, günübirlik turlar, kültür turları ve doğa turları. Çerkezköy\'den kalkan turlar.',
  keywords: 'turlar, yurtiçi turlar, yurtdışı turlar, konaklamalı turlar, günübirlik turlar, çerkezköy turlar, tatil turları, kültür turları',
  openGraph: {
    title: 'Turlarımız | Büyük Aytaç Travel',
    description: 'Büyük Aytaç Travel ile unutulmaz yurtiçi ve yurtdışı turları keşfedin.',
    url: 'https://www.buyukaytactravel.com/tours',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/tours-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Büyük Aytaç Travel Turları',
      },
    ],
  },
};

// Server component olarak sayfa
export default async function ToursPage({
  searchParams,
}: {
  searchParams: { tourType?: string; accommodationType?: string; destination?: string };
}) {
  // URL parametrelerini al
  const tourType = searchParams.tourType;
  const accommodationType = searchParams.accommodationType;
  const destination = searchParams.destination;

  // Başlığı belirle
  let filterTitle = 'Tüm Turlarımız';
  let filterDescription = 'Türkiye\'nin güzelliklerini keşfedeceğiniz özel olarak hazırlanmış turlarımız. Çerkezköy\'nin en güvenilir tur acentesi Büyük Aytaç Travel ile hayallerinizi gerçekleştirin.';
  
  if (destination) {
    filterTitle = `${destination} Turları`;
    filterDescription = `${destination} ve çevresini keşfedebileceğiniz özel turlarımız. Çerkezköy'den kalkan güvenli ve konforlu turlar.`;
  } else if (tourType === 'domestic') {
    filterTitle = 'Yurtiçi Turlarımız';
    filterDescription = 'Türkiye\'nin eşsiz güzelliklerini keşfedeceğiniz özel olarak hazırlanmış yurtiçi turlarımız. Çerkezköy\'den kalkan turlarımızla ülkemizin dört bir yanını keşfedin.';
  } else if (tourType === 'international') {
    filterTitle = 'Yurtdışı Turlarımız';
    filterDescription = 'Dünya\'nın en güzel destinasyonlarını keşfedeceğiniz yurtdışı turlarımız. Vizeli ve vizesiz tur seçenekleriyle hayallerinizi gerçekleştirin.';
  } else if (accommodationType === 'with_accommodation') {
    filterTitle = 'Konaklamalı Turlarımız';
    filterDescription = 'Konforlu otel konaklamaları eşliğinde gerçekleştirdiğimiz konaklamalı turlarımız. Her detayı düşünülmüş programlarla unutulmaz tatiller.';
  } else if (accommodationType === 'daily') {
    filterTitle = 'Günübirlik Turlarımız';
    filterDescription = 'Çerkezköy ve çevresinden kalkan günübirlik turlarımız. Hafta sonu kaçamakları için ideal tur programları.';
  }

  // Server-side'da turları getir
  let tours: ITour[] = [];
  let error = null;

  try {
    // Veritabanından turları getir
    const allTours = await getToursByDB();
    
    // Filtreleme
    tours = allTours.filter((tour: ITour) => {
      if (!tour.isActive) return false;
      
      if (destination && tour.destination !== destination) return false;
      if (tourType && tour.tourType !== tourType) return false;
      if (accommodationType && tour.accommodationType !== accommodationType) return false;
      
      return true;
    });
  } catch (err) {
    console.error('Turları getirme hatası:', err);
    error = 'Turlar yüklenirken bir hata oluştu.';
  }

  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{filterTitle}</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  // Schema.org yapılandırılmış veri
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': 'https://www.buyukaytactravel.com/tours',
    'name': filterTitle,
    'description': `Büyük Aytaç Travel ${filterTitle}`,
    'provider': {
      '@type': 'Organization',
      'name': 'Büyük Aytaç Travel',
      'url': 'https://www.buyukaytactravel.com',
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': filterTitle,
      'itemListElement': tours.map((tour) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'TouristTrip',
          'name': tour.name,
          'description': tour.description,
          'image': tour.image,
          'url': `https://www.buyukaytactravel.com/tours/${tour.slug}`,
        },
        'price': tour.price,
        'priceCurrency': 'TRY',
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{filterTitle}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {filterDescription}
            </p>
          </div>

          {/* Client component'e turları geçir */}
          <Suspense 
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden h-96">
                    <div className="h-60 bg-gray-200 animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <ToursContent tours={tours} />
          </Suspense>
        </div>
      </main>
    </>
  );
} 