import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/dbConnect';
import Destination from '@/models/Destination';
import Tour from '@/models/Tour';

// SEO için metadata
export const metadata: Metadata = {
  title: 'Destinasyonlar | Gezi Rehberleri | Büyük Aytaç Travel',
  description: 'Türkiye ve dünya destinasyonları hakkında detaylı gezi rehberleri. Çerkezköy\'den çıkan turlarla keşfedebileceğiniz harika yerler.',
  keywords: 'destinasyonlar, gezi rehberi, seyahat rehberi, tatil yerleri, gidilecek yerler, çerkezköy turları',
  openGraph: {
    title: 'Destinasyonlar | Büyük Aytaç Travel',
    description: 'Türkiye ve dünya destinasyonları hakkında detaylı gezi rehberleri.',
    url: 'https://www.buyukaytactravel.com/destinasyonlar',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/destinasyonlar-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Destinasyonlar - Büyük Aytaç Travel',
      },
    ],
  },
};

export default async function DestinasyonlarPage() {
  // Veritabanından destinasyonları getir
  await dbConnect();
  
  const destinations = await Destination.find({ isActive: true })
    .sort({ featured: -1, name: 1 })
    .lean();
  
  // Her destinasyon için tur sayısını hesapla
  const destinationsWithTourCount = await Promise.all(
    destinations.map(async (dest) => {
      const tourCount = await Tour.countDocuments({ 
        destination: dest.name,
        isActive: true 
      });
      return {
        ...dest,
        _id: dest._id.toString(),
        tourCount
      };
    })
  );
  
  // Öne çıkan destinasyonu bul (Çerkezköy veya featured: true olan)
  const featuredDestination = destinationsWithTourCount.find(d => d.featured || d.slug === 'cerkezkoy') || destinationsWithTourCount[0];
  const otherDestinations = destinationsWithTourCount.filter(d => d._id !== featuredDestination?._id);

  // Schema.org yapılandırılmış veri
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Türkiye Destinasyonları',
    'description': 'Büyük Aytaç Travel ile keşfedebileceğiniz destinasyonlar',
    'numberOfItems': destinationsWithTourCount.length,
    'itemListElement': destinationsWithTourCount.map((dest, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Place',
        'name': dest.name,
        'description': dest.shortDescription,
        'url': `https://www.buyukaytactravel.com/destinasyonlar/${dest.slug}`,
        'image': `https://www.buyukaytactravel.com${dest.image}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Bölümü */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Destinasyonlar</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Büyük Aytaç Travel ile keşfedebileceğiniz harika destinasyonlar. 
              Çerkezköy'den kalkan turlarımızla Türkiye'nin ve dünyanın en güzel yerlerini keşfedin.
            </p>
          </div>

          {/* Öne Çıkan Destinasyon */}
          {featuredDestination && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featuredDestination.image}
                    alt={featuredDestination.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {featuredDestination.featured && (
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Öne Çıkan</span>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredDestination.name}</h2>
                  <p className="text-gray-600 mb-6">
                    {featuredDestination.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href={`/destinasyonlar/${featuredDestination.slug}`}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
                    >
                      Detaylı Bilgi
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link 
                      href={`/tours?destination=${encodeURIComponent(featuredDestination.name)}`}
                      className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      {featuredDestination.name} Turları
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Diğer Destinasyonlar */}
          {otherDestinations.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popüler Destinasyonlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherDestinations.map((destination) => (
                  <Link 
                    key={destination._id} 
                    href={`/destinasyonlar/${destination.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={destination.image}
                          alt={destination.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold">{destination.name}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-600 mb-3">{destination.shortDescription}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-600">{destination.tourCount} tur mevcut</span>
                          <span className="text-blue-600 group-hover:translate-x-1 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Veri yoksa */}
          {destinationsWithTourCount.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Henüz destinasyon eklenmemiş.</p>
            </div>
          )}

          {/* CTA Bölümü */}
          <div className="bg-blue-50 rounded-lg p-8 mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hayalinizdeki Destinasyona Gidelim!</h2>
            <p className="text-gray-600 mb-6">
              Listede görmediğiniz bir destinasyon mu var? Bize ulaşın, sizin için özel tur programı hazırlayalım.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/tours" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tüm Turları Gör
              </Link>
              <Link 
                href="/contact" 
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 