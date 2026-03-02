import { Suspense } from 'react';
import { Metadata } from 'next';
import { ITour } from '@/models/Tour';
import { getToursByDB } from '@/lib/tours';
import ToursContent from '@/app/tours/components/ToursContent';
import Link from 'next/link';

// SEO için metadata - Kapadokya Turu - Çerkezköy Odaklı
export const metadata: Metadata = {
  title: 'Kapadokya Turu 2025 | Çerkezköyden Kalkan Kapadokya Turları | Büyük Aytaç Travel',
  description: 'Büyük Aytaç Travel ile Kapadokya turları. Nevşehir, Ürgüp, Avanos turları ve balon turu. Çerkezköy, Çorlu ve Kapaklıdan kalkan Kapadokya turları. Peri bacaları ve kaya oteller.',
  keywords: 'kapadokya turu, kapadokya turları, çerkezköy kapadokya, çorlu kapadokya, kapaklı kapadokya, tekirdağ kapadokya, nevşehir turu, ürgüp turu, avanos turu, balon turu, peri bacası, yeraltı şehri, çerkezköy kapadokya turu, 2025 kapadokya turları, kaya otel',
  openGraph: {
    title: 'Kapadokya Turu 2025 | Büyük Aytaç Travel - Çerkezköy',
    description: 'Çerkezköy ve çevresinden kalkan Kapadokya turları. Balon turu, peri bacaları ve kaya oteller sizi bekliyor.',
    url: 'https://www.buyukaytactravel.com/kapadokya-turu',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/kapadokya.jpeg',
        width: 1200,
        height: 630,
        alt: 'Kapadokya Turu - Peri Bacaları - Büyük Aytaç Travel',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/kapadokya-turu',
  },
};

// Server component olarak sayfa
export default async function KapadokyaTuruPage() {
  // Server-side'da Kapadokya turlarını getir
  let tours: ITour[] = [];
  let error = null;

  try {
    // Tüm aktif turları getir ve destination'a göre filtrele
    const allTours = await getToursByDB({ isActive: true });
    
    // Kapadokya destinasyonlarını filtrele
    const kapadokyaDestinations = ['Kapadokya', 'Nevşehir', 'Nevsehir', 'Ürgüp', 'Urgup', 'Avanos', 'Kayseri', 'Kırşehir', 'Aksaray', 'Niğde', 'Peri Bacaları', 'Balon Turu', 'Yeraltı Şehri', 'Yeralti Sehri', 'Üçhisar', 'Uchisar', 'Greme', 'Paşabağı'];
    
    tours = allTours.filter((tour: ITour) => {
      const tourDestination = tour.destination?.toLowerCase() || '';
      const tourName = tour.name?.toLowerCase() || '';
      const tourTags = (tour as any).tags?.map((t: string) => t.toLowerCase()) || [];
      
      return kapadokyaDestinations.some(dest => 
        tourDestination.includes(dest.toLowerCase()) ||
        tourName.includes(dest.toLowerCase()) ||
        tourTags.some((tag: string) => tag.includes(dest.toLowerCase()))
      );
    });
  } catch (err) {
    console.error('Kapadokya turlarını getirme hatası:', err);
    error = 'Turlar yüklenirken bir hata oluştu.';
  }

  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kapadokya Turu</h1>
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
    '@id': 'https://www.buyukaytactravel.com/kapadokya-turu',
    'name': 'Kapadokya Turu - Çerkezköy',
    'description': 'Çerkezköy ve çevresinden kalkan Kapadokya bölgesi turları - Nevşehir, Ürgüp, Avanos, balon turu',
    'provider': {
      '@type': 'Organization',
      'name': 'Büyük Aytaç Travel - Çerkezköy Tur Acentesi',
      'url': 'https://www.buyukaytactravel.com',
    },
    'area': {
      '@type': 'Place',
      'name': 'Kapadokya',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'TR',
        'addressLocality': 'Nevşehir, Ürgüp, Avanos'
      }
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Kapadokya Tur Paketleri - Çerkezköy Çıkışlı',
      'itemListElement': tours.slice(0, 10).map((tour) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'TouristTrip',
          'name': tour.name,
          'description': tour.description?.substring(0, 150),
          'image': tour.image,
          'url': `https://www.buyukaytactravel.com/tours/${tour.slug}`,
        },
        'price': tour.price,
        'priceCurrency': 'TRY',
      })),
    },
  };

  // BreadcrumbList schema for SEO
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Ana Sayfa',
        'item': 'https://www.buyukaytactravel.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Turlar',
        'item': 'https://www.buyukaytactravel.com/tours'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Kapadokya Turu - Çerkezköy',
        'item': 'https://www.buyukaytactravel.com/kapadokya-turu'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Banner */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-red-900/60 z-10" />
            <img 
              src="/images/kapadokya.jpeg" 
              alt="Kapadokya Turu - Peri Bacaları - Büyük Aytaç Travel Çerkezköy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Kapadokya Turu</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
                  Çerkezköyden kalkan turlarla büyülü peri bacaları dünyası
                </p>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kapadokya Neden Özel? - Çerkezköy Tur Acentesi</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <p className="mb-4">
                  <strong>Büyük Aytaç Travel</strong> olarak Çerkezköy, Çorlu, Kapaklı ve Tekirdağ 
                  bölgesinden kalkan özel Kapadokya turlarımızla sizleri buluşturuyoruz. 
                  <strong>Kapadokya</strong>, dünya üzerinde eşi benzeri olmayan coğrafi oluşumları, 
                  tarihi yeraltı şehirleri ve büyüleyici peri bacaları ile ünlü bir bölgedir.
                </p>
                <p className="mb-4">
                  Sabahın erken saatlerinde sıcak hava balonu ile gökyüzünde 
                  peri bacalarını izlemek, yeraltı şehirlerinde tarih öncesi 
                  dönemlerin izlerini sürmek ve kaya otellerde konaklamak 
                  sizi bekliyor.
                </p>
                <p>
                  Çerkezköy ve çevre illerden kalkan konforlu araçlarımızla 
                  Kapadokya'nın gizemli dünyasını keşfetmeye hazır mısınız?
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-3">Çerkezköyden Kalkan Kapadokya Turu Avantajları</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    Çerkezköy, Çorlu, Kapaklı transfer
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    Sıcak hava balonu turu (opsiyonel)
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    Yeraltı şehirleri ziyareti
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    Kaya otel konaklaması
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    Şarap tadımı ve yöresel lezzetler
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">✓</span>
                    Uzman rehber eşliğinde gezi
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mb-8">
            <a href="/tours?destination=Nevşehir" className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm hover:bg-orange-200 transition-colors">
              Nevşehir Turu
            </a>
            <a href="/tours?destination=Ürgüp" className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm hover:bg-orange-200 transition-colors">
              Ürgüp Turu
            </a>
            <a href="/tours?destination=Avanos" className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm hover:bg-orange-200 transition-colors">
              Avanos Turu
            </a>
            <a href="/tours?destination=Balon" className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm hover:bg-orange-200 transition-colors">
              Balon Turu
            </a>
            <a href="/tours?destination=Yeraltı" className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm hover:bg-orange-200 transition-colors">
              Yeraltı Şehirleri
            </a>
          </div>

          {/* Tours */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Çerkezköyden Kalkan Kapadokya Turu Fırsatları</h2>
            {tours.length > 0 ? (
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
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600 mb-4">Şu anda aktif Kapadokya turu bulunmamaktadır.</p>
                <p className="text-sm text-gray-500">Yakın tarihte yeni Kapadokya turları eklenecektir. Bizi takip etmeye devam edin!</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Kapadokya Turu Hakkında Sorularınız mı Var?</h3>
            <p className="mb-6">Büyük Aytaç Travel olarak Çerkezköy ve çevresinden kalkan Kapadokya turları hakkında bilgi almak için bizimle iletişime geçin.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-block bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                İletişime Geç
              </Link>
              <Link 
                href="/tours" 
                className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Tüm Turları Gör
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
