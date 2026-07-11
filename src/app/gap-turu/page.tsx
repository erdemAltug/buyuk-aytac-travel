import { Suspense } from 'react';
import { Metadata } from 'next';
import { ITour } from '@/models/Tour';
import { getToursByDB } from '@/lib/tours';
import ToursContent from '@/app/tours/components/ToursContent';

// SEO için metadata - GAP Turu - Çerkezköy Odaklı
export const metadata: Metadata = {
  title: 'GAP Turu 2026 | Çerkezköyden Kalkan GAP Turları | Büyük Aytaç Travel',
  description: 'Büyük Aytaç Travel ile GAP turları. Gaziantep, Şanlıurfa, Mardin, Diyarbakır turları. Çerkezköy, Çorlu ve Kapaklıdan kalkan GAP turları. Güneydoğu Anadolu kültür ve lezzet turları.',
  keywords: 'GAP turu, güneydoğu turları, gaziantep turu, şanlıurfa turu, mardin turu, diyarbakır turu, doğu anadolu turları, çerkezköy GAP turu, çorlu GAP, kapaklı GAP, tekirdağ GAP, 2026 gap turları',
  openGraph: {
    title: 'GAP Turu 2026 | Büyük Aytaç Travel - Çerkezköy',
    description: 'Çerkezköy ve çevresinden kalkan GAP turları ile Gaziantep, Şanlıurfa, Mardin ve Diyarbakırı keşfedin.',
    url: 'https://www.buyukaytactravel.com/gap-turu',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/gap-turu.jpeg',
        width: 1200,
        height: 630,
        alt: 'GAP Turu - Güneydoğu Anadolu - Büyük Aytaç Travel',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/gap-turu',
  },
};

// Server component olarak sayfa
export default async function GAPTuruPage() {
  // Server-side'da GAP turlarını getir
  let tours: ITour[] = [];
  let error = null;

  try {
    // Tüm aktif turları getir ve destination'a göre filtrele
    const allTours = await getToursByDB({ isActive: true });
    
    // GAP destinasyonlarını filtrele
    const gapDestinations = ['GAP', 'Gaziantep', 'Şanlıurfa', 'Sanliurfa', 'Mardin', 'Diyarbakır', 'Diyarbakir', 'Doğu Anadolu', 'Dogu Anadolu', 'Güneydoğu', 'Guneydogu', 'Nemrut', 'Adıyaman', 'Adiyaman', 'Kahramanmaraş', 'Kahramanmaras'];
    
    tours = allTours.filter((tour: ITour) => {
      const tourDestination = tour.destination?.toLowerCase() || '';
      const tourName = tour.name?.toLowerCase() || '';
      const tourTags = (tour as any).tags?.map((t: string) => t.toLowerCase()) || [];
      
      return gapDestinations.some(dest => 
        tourDestination.includes(dest.toLowerCase()) ||
        tourName.includes(dest.toLowerCase()) ||
        tourTags.some((tag: string) => tag.includes(dest.toLowerCase()))
      );
    });
  } catch (err) {
    console.error('GAP turlarını getirme hatası:', err);
    error = 'Turlar yüklenirken bir hata oluştu.';
  }

  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">GAP Turu</h1>
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
    '@id': 'https://www.buyukaytactravel.com/gap-turu',
    'name': 'GAP Turu - Çerkezköy',
    'description': 'Çerkezköy ve çevresinden kalkan GAP bölgesi turları - Gaziantep, Şanlıurfa, Mardin, Diyarbakır',
    'provider': {
      '@type': 'Organization',
      'name': 'Büyük Aytaç Travel - Çerkezköy Tur Acentesi',
      'url': 'https://www.buyukaytactravel.com',
    },
    'area': {
      '@type': 'Place',
      'name': 'Güneydoğu Anadolu Bölgesi',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'TR',
        'addressLocality': 'Gaziantep, Şanlıurfa, Mardin, Diyarbakır'
      }
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'GAP Tur Paketleri - Çerkezköy Çıkışlı',
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
        'name': 'GAP Turu - Çerkezköy',
        'item': 'https://www.buyukaytactravel.com/gap-turu'
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
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-orange-900/60 z-10" />
            <img 
              src="/images/gap-turu.jpeg" 
              alt="GAP Turu - Güneydoğu Anadolu - Büyük Aytaç Travel Çerkezköy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">GAP Turu</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
                  Çerkezköyden kalkan turlarla tarih ve lezzet dolu Güneydoğu
                </p>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">GAP Turu Nedir? - Çerkezköy Tur Acentesi</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <p className="mb-4">
                  <strong>Büyük Aytaç Travel</strong> olarak Çerkezköy, Çorlu, Kapaklı ve Tekirdağ 
                  bölgesinden kalkan özel GAP turlarımızla sizleri buluşturuyoruz. 
                  <strong>GAP (Güneydoğu Anadolu Projesi)</strong> bölgesi, Türkiye'nin en zengin tarihi 
                  ve kültürel mirasa sahip topraklarından biridir. 
                </p>
                <p className="mb-4">
                  Gaziantep'in nefis kebapları, Şanlıurfa'nın tarihi mekanları, 
                  Mardin'in taş sokakları ve Diyarbakır'ın eşsiz surları ile 
                  tarih ve kültür dolu bir yolculuğa çıkın.
                </p>
                <p>
                  Çerkezköy ve çevre illerden kalkan konforlu araçlarımızle GAP bölgesinin 
                  tüm güzelliklerini keşfetmeye hazır mısınız?
                </p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-3">Çerkezköyden Kalkan GAP Turu Avantajları</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    Çerkezköy, Çorlu, Kapaklı transfer
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    Uzman rehber eşliğinde rehberli tur
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    Konforlu ulaşım ve otel konaklaması
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    Yöresel lezzetler dahil
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    Tarihi mekanlar ve müze girişleri
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    Seyahat sigortası
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mb-8">
            <a href="/tours?destination=Gaziantep" className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-200 transition-colors">
              Gaziantep Turu
            </a>
            <a href="/tours?destination=Şanlıurfa" className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-200 transition-colors">
              Şanlıurfa Turu
            </a>
            <a href="/tours?destination=Mardin" className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-200 transition-colors">
              Mardin Turu
            </a>
            <a href="/tours?destination=Diyarbakır" className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-200 transition-colors">
              Diyarbakır Turu
            </a>
            <a href="/tours?destination=Nemrut" className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-200 transition-colors">
              Nemrut Turu
            </a>
          </div>

          {/* Tours */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Çerkezköyden Kalkan GAP Turu Fırsatları</h2>
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
                <p className="text-gray-600 mb-4">Şu anda aktif GAP turu bulunmamaktadır.</p>
                <p className="text-sm text-gray-500">Yakın tarihte yeni GAP turları eklenecektir. Bizi takip etmeye devam edin!</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">GAP Turu Hakkında Sorularınız mı Var?</h3>
            <p className="mb-6">Büyük Aytaç Travel olarak Çerkezköy ve çevresinden kalkan GAP turları hakkında bilgi almak için bizimle iletişime geçin.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-block bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                İletişime Geç
              </a>
              <a 
                href="/tours" 
                className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Tüm Turları Gör
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
