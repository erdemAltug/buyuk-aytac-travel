import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';

// SEO metadata
export const metadata: Metadata = {
  title: 'Çerkezköy Günübirlik Turlar | Hafta Sonu Turları 2026 | Büyük Aytaç Travel',
  description: 'Çerkezköy günübirlik turlar. İstanbul, Bursa, Safranbolu, Eskişehir ve daha birçok destinasyona günübirlik tur paketleri. Hafta sonu kaçamakları için en uygun fiyatlar.',
  keywords: 'çerkezköy günübirlik tur, çerkezköy hafta sonu turu, günübirlik tur, hafta sonu turları, çerkezköy istanbul tur, çerkezköy bursa tur, çerkezköy safranbolu tur, günübirlik tur fiyatları',
  openGraph: {
    title: 'Çerkezköy Günübirlik Turlar | Büyük Aytaç Travel',
    description: 'Çerkezköy\'den günübirlik turlar. Hafta sonu kaçamakları için en popüler destinasyonlar.',
    url: 'https://www.buyukaytactravel.com/cerkezkoy-gunubirlik-turlar',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/cerkezkoy-gunubirlik-turlar',
  },
};

// Daily tour packages from Çerkezköy
const dailyTours = [
  {
    id: 'istanbul',
    title: 'İstanbul Günübirlik Tur',
    description: 'Sultanahmet, Kapalıçarşı, Boğaz turu ve daha fazlası',
    price: '1.500 TL',
    duration: '1 Gün',
    image: '/images/istanbul-lale.jpeg',
    slug: 'istanbul-turu',
    highlights: ['Sultanahmet Camii', 'Aya Sofya', 'Kapalıçarşı', 'Boğaz Turu']
  },
  {
    id: 'bursa',
    title: 'Bursa Günübirlik Tur',
    description: 'Uludağ teleferik, Cumalıkızık, tarihi çarşılar',
    price: '1.800 TL',
    duration: '1 Gün',
    image: '/images/bursa-19-ekim.jpeg',
    slug: 'bursa-turu',
    highlights: ['Uludağ Teleferik', 'Cumalıkızık', 'Koza Han', 'Ulubatlı Hasan']
  },
  {
    id: 'safranbolu',
    title: 'Safranbolu Günübirlik Tur',
    description: 'Tarihi konaklar, Hızlı Çarşı, Cinci Han',
    price: '1.600 TL',
    duration: '1 Gün',
    image: '/images/safranbolu-10-04-26.jpeg',
    slug: 'safranbolu-turu',
    highlights: ['Hızlı Çarşı', 'Cinci Han', 'Tarihi Konaklar', 'Safran Bahçesi']
  },
  {
    id: 'eskisehir',
    title: 'Eskişehir Günübirlik Tur',
    description: 'Odunpazarı, Sazova Parkı, Bilim Kurdu',
    price: '1.400 TL',
    duration: '1 Gün',
    image: '/images/eskisehir-15-temmuz.jpeg',
    slug: 'eskisehir-turu',
    highlights: ['Odunpazarı Evleri', 'Sazova Parkı', 'Bilim Kurdu', 'Kent Park']
  },
  {
    id: 'canakkale',
    title: 'Çanakkale Günübirlik Tur',
    description: 'Truva, Gelibolu, tarihi şehir',
    price: '1.900 TL',
    duration: '1 Gün',
    image: '/images/canakkale-29-ekim.jpeg',
    slug: 'canakkale-turu',
    highlights: ['Truva Antik Kenti', 'Gelibolu', 'Çanakkale Şehitliği']
  }
];

// Popular destinations for daily tours
const popularDestinations = [
  { name: 'İstanbul', emoji: '🏛️', distance: '70 km' },
  { name: 'Bursa', emoji: '⛷️', distance: '150 km' },
  { name: 'Safranbolu', emoji: '🏘️', distance: '280 km' },
  { name: 'Eskişehir', emoji: '🎓', distance: '120 km' },
  { name: 'Edirne', emoji: '🕌', distance: '180 km' },
  { name: 'Çanakkale', emoji: '⚓', distance: '320 km' }
];

export default function CerkezkoyGunubirlikTurlarPage() {
  // BreadcrumbList schema for SEO
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://www.buyukaytactravel.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Günübirlik Turlar',
        item: 'https://www.buyukaytactravel.com/cerkezkoy-gunubirlik-turlar'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumb />
    <main className="pt-20 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Çerkezköy Günübirlik Turlar
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Çerkezköy, Çorlu ve Tekirdağ'dan kalkan günübirlik turlar. 
            Hafta sonu kaçamakları için en popüler destinasyonlar ve en uygun fiyatlar.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link 
              href="/tours?category=daily"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Tüm Günübirlik Turlar
            </Link>
            <Link 
              href="/contact"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Rezervasyon Yap
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Popüler Günübirlik Destinasyonlar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularDestinations.map((dest) => (
              <div key={dest.name} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">{dest.emoji}</span>
                <h3 className="font-semibold text-gray-900">{dest.name}</h3>
                <p className="text-sm text-gray-500">{dest.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Günübirlik Tur Paketleri
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Çerkezköy'den kalkan günübirlik tur paketlerimiz. 
            Tüm turlarımız profesyonel rehber eşliğinde, ulaşım dahil.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dailyTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={tour.image} 
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights.slice(0, 3).map((highlight) => (
                      <span key={highlight} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-blue-600">{tour.price}</span>
                    <Link 
                      href={`/tours?destination=${tour.slug}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      İncele
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Neden Çerkezköy Günübirlik Turlar?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚐</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Konforlu Ulaşım</h3>
              <p className="text-gray-600 text-sm">Klimalı araçlarla rahat seyahat</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Uzman Rehber</h3>
              <p className="text-gray-600 text-sm">Profesyonel tur rehberleri</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Uygun Fiyat</h3>
              <p className="text-gray-600 text-sm">En iyi fiyat garantisi</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Güvenilir Hizmet</h3>
              <p className="text-gray-600 text-sm">20 yıllık sektör deneyimi</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hemen Rezervasyon Yapın!
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Çerkezköy günübirlik turlarımız hakkında bilgi almak için bizimle iletişime geçin.
            Size özel tur paketi teklifi sunalım.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            İletişime Geç
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
