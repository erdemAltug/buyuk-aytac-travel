import { Suspense } from 'react';
import { Metadata } from 'next';
import { ITour } from '@/models/Tour';
import { getToursByDB } from '@/lib/tours';
import ToursContent from '@/app/tours/components/ToursContent';
import Link from 'next/link';

// SEO için metadata - Karadeniz Turu - Çerkezköy Odaklı
export const metadata: Metadata = {
  title: 'Karadeniz Turu 2026 | Çerkezköyden Kalkan Karadeniz Turları | Büyük Aytaç Travel',
  description: 'Büyük Aytaç Travel ile Karadeniz turları. Trabzon, Ayder, Rize, Samsun, Amasra turları. Çerkezköy, Çorlu, Kapaklı ve Tekirdağdan kalkan Karadeniz turları. Doğu ve Batı Karadeniz rotaları.',
  keywords: 'karadeniz turu, karadeniz turları, çerkezköy karadeniz turu, çorlu karadeniz turu, kapaklı karadeniz, tekirdağ karadeniz, trabzon turu, ayder turu, rize turu, samsun turu, amȧsra turu, doğu karadeniz, batı karadeniz, 2026 karadeniz turları',
  openGraph: {
    title: 'Karadeniz Turu 2026 | Büyük Aytaç Travel - Çerkezköy',
    description: 'Çerkezköy ve çevresinden kalkan Karadeniz turları. Trabzon, Rize, Ayder ve yaylalar sizi bekliyor.',
    url: 'https://www.buyukaytactravel.com/karadeniz-turu',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/karadeniz-turu.jpeg',
        width: 1200,
        height: 630,
        alt: 'Karadeniz Turu - Doğu Karadeniz - Büyük Aytaç Travel',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/karadeniz-turu',
  },
};

// Server component olarak sayfa
export default async function KaradenizTuruPage() {
  // Server-side'da Karadeniz turlarını getir
  let tours: ITour[] = [];
  let error = null;

  try {
    // Tüm aktif turları getir ve destination'a göre filtrele
    const allTours = await getToursByDB({ isActive: true });
    
    // Karadeniz destinasyonlarını filtrele
    const karadenizDestinations = ['Karadeniz', 'Trabzon', 'Rize', 'Ayder', 'Samsun', 'Amasra', 'Bartın', 'Zonguldak', 'Sinop', 'Ordu', 'Giresun', 'Trabzon', 'Gümüşhane', 'Bayburt', 'Artvin', 'Ardeşen', 'Uzungöl', 'Yusufeli', 'Hopa', 'Sarp'];
    
    tours = allTours.filter((tour: ITour) => {
      const tourDestination = tour.destination?.toLowerCase() || '';
      const tourName = tour.name?.toLowerCase() || '';
      const tourTags = (tour as any).tags?.map((t: string) => t.toLowerCase()) || [];
      
      return karadenizDestinations.some(dest => 
        tourDestination.includes(dest.toLowerCase()) ||
        tourName.includes(dest.toLowerCase()) ||
        tourTags.some((tag: string) => tag.includes(dest.toLowerCase()))
      );
    });
  } catch (err) {
    console.error('Karadeniz turlarını getirme hatası:', err);
    error = 'Turlar yüklenirken bir hata oluştu.';
  }

  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Karadeniz Turu</h1>
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
    '@id': 'https://www.buyukaytactravel.com/karadeniz-turu',
    'name': 'Karadeniz Turu - Çerkezköy',
    'description': 'Çerkezköy ve çevresinden kalkan Karadeniz Bölgesi turları - Trabzon, Rize, Ayder, Samsun, Amasra',
    'provider': {
      '@type': 'Organization',
      'name': 'Büyük Aytaç Travel - Çerkezköy Tur Acentesi',
      'url': 'https://www.buyukaytactravel.com',
    },
    'area': {
      '@type': 'Place',
      'name': 'Karadeniz Bölgesi',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'TR',
        'addressLocality': 'Trabzon, Rize, Samsun, Amasra'
      }
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Karadeniz Tur Paketleri - Çerkezköy Çıkışlı',
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
        'name': 'Karadeniz Turu - Çerkezköy',
        'item': 'https://www.buyukaytactravel.com/karadeniz-turu'
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
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-teal-900/60 z-10" />
            <img 
              src="/images/karadeniz-turu.jpeg" 
              alt="Karadeniz Turu - Doğu Karadeniz - Büyük Aytaç Travel Çerkezköy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Karadeniz Turu</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
                  Çerkezköyden kalkan turlarla Karadenizin eşsiz doğası
                </p>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Karadeniz Turu Deneyimi - Çerkezköy Tur Acentesi</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <p className="mb-4">
                  <strong>Büyük Aytaç Travel</strong> olarak Çerkezköy, Çorlu, Kapaklı ve Tekirdağ 
                  bölgesinden kalkan özel Karadeniz turlarımızla sizleri buluşturuyoruz. 
                  <strong>Karadeniz</strong>, Türkiye'nin en güzel doğal güzelliklerini barındıran 
                  bölgesidir. Trabzon'un tarihi mekanları, Ayder yaylasının sisli tepeleri, 
                  Rize'nin çay bahçeleri ve Amasra'nın büyüleyici kıyıları sizi bekliyor.
                </p>
                <p>
                  Yeşil ile mavinin buluştuğu, yaylalarda dinlenip denizde huzur 
                  bulacağınız unutulmaz bir Karadeniz turu sizi bekliyor.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3">Çerkezköyden Kalkan Karadeniz Turu Avantajları</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Çerkezköy, Çorlu, Kapaklı transfer
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Uzman rehber eşliğinde rehberli tur
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Konforlu ulaşım ve otel konaklaması
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Karadeniz mutfağı lezzetleri
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Yayla turları ve doğa yürüyüşleri
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mb-8">
            <a href="/tours?destination=Trabzon" className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm hover:bg-green-200 transition-colors">
              Trabzon Turu
            </a>
            <a href="/tours?destination=Ayder" className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm hover:bg-green-200 transition-colors">
              Ayder Yaylası
            </a>
            <a href="/tours?destination=Rize" className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm hover:bg-green-200 transition-colors">
              Rize Turu
            </a>
            <a href="/tours?destination=Uzungöl" className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm hover:bg-green-200 transition-colors">
              Uzungöl
            </a>
            <a href="/tours?destination=Samsun" className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm hover:bg-green-200 transition-colors">
              Samsun Turu
            </a>
            <a href="/tours?destination=Amasra" className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm hover:bg-green-200 transition-colors">
              Amasra Turu
            </a>
          </div>

          {/* Tours */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Çerkezköyden Kalkan Karadeniz Turu Fırsatları</h2>
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
                <p className="text-gray-600 mb-4">Şu anda aktif Karadeniz turu bulunmamaktadır.</p>
                <p className="text-sm text-gray-500">Yakın tarihte yeni Karadeniz turları eklenecektir. Bizi takip etmeye devam edin!</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Karadeniz Turu Hakkında Sorularınız mı Var?</h3>
            <p className="mb-6">Büyük Aytaç Travel olarak Çerkezköy ve çevresinden kalkan turlar hakkında bilgi almak için bizimle iletişime geçin.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
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
