import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/dbConnect';
import Destination from '@/models/Destination';
import Tour from '@/models/Tour';

// Dinamik metadata oluşturma
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await dbConnect();
  const destination = await Destination.findOne({ slug: params.slug }).lean();
  
  if (!destination) {
    return {
      title: 'Destinasyon Bulunamadı | Büyük Aytaç Travel',
      description: 'Aradığınız destinasyon bulunamadı.',
    };
  }
  
  return {
    title: `${destination.name} Gezi Rehberi | ${destination.name} Turları | Büyük Aytaç Travel`,
    description: destination.description,
    keywords: destination.seoKeywords?.join(', ') || `${destination.name} turları, ${destination.name} gezi rehberi, ${destination.name} gezilecek yerler`,
    openGraph: {
      title: `${destination.name} Gezi Rehberi | Büyük Aytaç Travel`,
      description: destination.description,
      url: `https://www.buyukaytactravel.com/destinasyonlar/${destination.slug}`,
      type: 'article',
      images: [
        {
          url: destination.image.startsWith('http') ? destination.image : `https://www.buyukaytactravel.com${destination.image}`,
          width: 1200,
          height: 630,
          alt: `${destination.name} - Büyük Aytaç Travel`,
        },
      ],
    },
  };
}

// Static params oluşturma (build time'da tüm destinasyonları oluştur)
export async function generateStaticParams() {
  await dbConnect();
  const destinations = await Destination.find({ isActive: true }).lean();
  
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

// Revalidate every hour
export const revalidate = 3600;

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  await dbConnect();
  
  const destination = await Destination.findOne({ slug: params.slug, isActive: true }).lean();
  
  if (!destination) {
    notFound();
  }
  
  // Bu destinasyon için turları getir
  const tours = await Tour.find({ 
    destination: destination.name,
    isActive: true 
  })
    .select('name slug image price duration')
    .limit(6)
    .lean();

  // Schema.org yapılandırılmış veri
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    'name': destination.name,
    'description': destination.description,
    ...(destination.location && {
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': destination.location.city || '',
        'addressRegion': destination.location.region || '',
        'addressCountry': 'TR',
      },
    }),
    ...(destination.location?.coordinates && {
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': destination.location.coordinates.lat,
        'longitude': destination.location.coordinates.lng,
      },
    }),
    'hasMap': `https://maps.google.com/?q=${destination.name},${destination.location?.city || ''}`,
    'tourBookingPage': `https://www.buyukaytactravel.com/tours?destination=${encodeURIComponent(destination.name)}`,
    ...(destination.highlights && {
      'includesAttraction': destination.highlights.map(highlight => ({
        '@type': 'TouristAttraction',
        'name': highlight,
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        {/* Hero Bölümü */}
        <div className="relative h-96 mb-12">
          <Image
            src={destination.image}
            alt={`${destination.name} Manzara`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
              <p className="text-xl">{destination.shortDescription}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href="/destinasyonlar" className="text-gray-700 hover:text-blue-600">
                    Destinasyonlar
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-500">{destination.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Ana İçerik */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol Kolon - Ana İçerik */}
            <div className="lg:col-span-2">
              {/* Genel Bilgi */}
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{destination.name} Hakkında</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="whitespace-pre-wrap">{destination.description}</p>
                </div>
              </div>

              {/* Öne Çıkan Yerler */}
              {destination.highlights && destination.highlights.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Görülmesi Gereken Yerler</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Yakın Çevre */}
              {destination.nearbyPlaces && destination.nearbyPlaces.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Yakın Çevrede Gezilecek Yerler</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.nearbyPlaces.map((place, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{place.name}</h3>
                          <span className="text-sm text-blue-600">{place.distance}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{place.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ulaşım Bilgileri */}
              {destination.transportation && destination.transportation.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{destination.name}'e Nasıl Gidilir?</h2>
                  <div className="space-y-4">
                    {destination.transportation.map((transport, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {transport.type === 'car' && '🚗 Karayolu ile:'}
                          {transport.type === 'bus' && '🚌 Otobüs ile:'}
                          {transport.type === 'train' && '🚂 Tren ile:'}
                          {transport.type === 'plane' && '✈️ Uçak ile:'}
                        </h3>
                        <p className="text-gray-600">{transport.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sağ Kolon - Yan Bilgiler */}
            <div className="lg:col-span-1">
              {/* Hızlı Bilgiler */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hızlı Bilgiler</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <div>
                      <span className="font-semibold">Konum:</span> {destination.location?.city || 'Bilinmiyor'}, {destination.location?.region || 'Türkiye'}
                    </div>
                  </li>
                  {destination.location && destination.location.coordinates && (
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <a 
                          href={`https://maps.google.com/?q=${destination.location.coordinates.lat},${destination.location.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Haritada Gör
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              {/* Turlar */}
              {tours.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{destination.name} Turları</h3>
                  <div className="space-y-3 mb-4">
                    {tours.slice(0, 3).map((tour) => (
                      <Link 
                        key={tour._id.toString()} 
                        href={`/tours/${tour.slug}`}
                        className="block bg-white rounded p-3 hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-semibold text-gray-900 text-sm">{tour.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-600">{tour.duration}</span>
                          <span className="text-sm font-bold text-blue-600">{tour.price.toLocaleString('tr-TR')} ₺</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link 
                    href={`/tours?destination=${encodeURIComponent(destination.name)}`}
                    className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Tüm {destination.name} Turlarını Gör
                  </Link>
                </div>
              )}

              {/* İletişim */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hemen Rezervasyon Yapın</h3>
                <p className="text-gray-600 mb-4">
                  {destination.name} turlarımız hakkında detaylı bilgi almak için bize ulaşın.
                </p>
                <div className="space-y-2">
                  <a href="tel:+905300609559" className="flex items-center text-gray-700 hover:text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    0530 060 95 59
                  </a>
                  <Link href="/contact" className="flex items-center text-gray-700 hover:text-blue-600">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    İletişim Formu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 