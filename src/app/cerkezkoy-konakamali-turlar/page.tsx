import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

// SEO metadata
export const metadata: Metadata = {
  title: 'Çerkezköy Konaklamalı Turlar | Tatil Paketleri 2026 | Büyük Aytaç Travel',
  description: 'Çerkezköy konaklamalı turlar. Kapadokya, Karadeniz, Ege, GAP ve daha birçok destinasyona 2-7 günlük konaklamalı tur paketleri. Her şey dahil tatil seçenekleri.',
  keywords: 'çerkezköy konaklamalı tur, çerkezköy tatil paketleri, konaklamalı tur, tatil paketleri, kapadokya tur, karadeniz tur, ege tur, 2026 tatil, çerkezköy tur paketleri',
  openGraph: {
    title: 'Çerkezköy Konaklamalı Turlar | Büyük Aytaç Travel',
    description: 'Çerkezköy\'den konaklamalı tatil turları. En popüler destinasyonlar ve en uygun fiyatlar.',
    url: 'https://www.buyukaytactravel.com/cerkezkoy-konakamali-turlar',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/cerkezkoy-konakamali-turlar',
  },
};

// Overnight tour packages from Çerkezköy
const overnightTours = [
  {
    id: 'kapadokya',
    title: 'Kapadokya 3 Gün 2 Gece',
    description: 'Balon turu, yeraltı şehirleri, Ürgüp, şarap tadımı',
    price: '8.500 TL',
    duration: '3 Gün 2 Gece',
    image: '/images/kapadokya.jpeg',
    slug: 'kapadokya-turu',
    highlights: ['Balon Turu', 'Derinkuyu', 'Paşabağı', 'Ürgüp']
  },
  {
    id: 'karadeniz',
    title: 'Karadeniz 4 Gün 3 Gece',
    description: 'Uzungöl, Ayder, Trabzon, Rize, yayla turları',
    price: '9.900 TL',
    duration: '4 Gün 3 Gece',
    image: '/images/karadeniz-turu.jpeg',
    slug: 'karadeniz-turu',
    highlights: ['Uzungöl', 'Ayder Yaylası', 'Sümela', 'Rize']
  },
  {
    id: 'ege',
    title: 'Ege Turu 5 Gün 4 Gece',
    description: 'Efes, Pamukkale, Kuşadası, İzmir, Çeşme',
    price: '11.500 TL',
    duration: '5 Gün 4 Gece',
    image: '/images/bursa-mudanya-tirilye-26-temmuz.jpeg',
    slug: 'ege-turu',
    highlights: ['Efes', 'Pamukkale', 'Kuşadası', 'İzmir']
  },
  {
    id: 'gap',
    title: 'GAP Turu 6 Gün 5 Gece',
    description: 'Göbeklitepe, Nemrut, Şanlıurfa, Gaziantep',
    price: '14.900 TL',
    duration: '6 Gün 5 Gece',
    image: '/images/gap-turu.jpeg',
    slug: 'gap-turu',
    highlights: ['Göbeklitepe', 'Nemrut Dağı', 'Şanlıurfa', 'Gaziantep']
  },
  {
    id: 'istanbul-2',
    title: 'İstanbul 2 Gün 1 Gece',
    description: 'Tarihi yarımada, Boğaz, Kapalıçarşı, son akşam yemeği',
    price: '3.500 TL',
    duration: '2 Gün 1 Gece',
    image: '/images/istanbul-lale.jpeg',
    slug: 'istanbul-konaklamali',
    highlights: ['Sultanahmet', 'Boğaz Turu', 'Kapalıçarşı', 'Pierre Loti']
  },
  {
    id: 'uludag',
    title: 'Uludağ Kayak Turu 2 Gün 1 Gece',
    description: 'Kayak, snowboard, teleferik, gece hayatı',
    price: '4.500 TL',
    duration: '2 Gün 1 Gece',
    image: '/images/bursa-22-26.jpeg',
    slug: 'uludag-kayak-turu',
    highlights: ['Kayak', 'Teleferik', 'Uludağ', 'Gece Hayatı']
  }
];

// Popular regions for overnight tours
const popularRegions = [
  { name: 'Kapadokya', emoji: '🎈', tours: 'Balon, Yeraltı Şehirleri' },
  { name: 'Karadeniz', emoji: '🌲', tours: 'Yaylalar, Şelaleler' },
  { name: 'Ege', emoji: '🏖️', tours: 'Antik Kentler, Plajlar' },
  { name: 'GAP', emoji: '🏛️', tours: 'Tarih, Gastronomi' },
  { name: 'Marmara', emoji: '🌉', tours: 'İstanbul, Bursa' },
  { name: 'Akdeniz', emoji: '☀️', tours: 'Antalya, Side' }
];

export default function CerkezkoyKonaklamaliTurlarPage() {
  return (
    <main className="pt-20 min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Çerkezköy Konaklamalı Turlar
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Çerkezköy, Çorlu ve Tekirdağ'dan kalkan konaklamalı turlar. 
            Kapadokya, Karadeniz, Ege ve daha birçok destinasyona unutulmaz tatil paketleri.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link 
              href="/tours?category=overnight"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Tüm Konaklamalı Turlar
            </Link>
            <Link 
              href="/contact"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              Rezervasyon Yap
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Regions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Popüler Tatil Bölgeleri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularRegions.map((region) => (
              <div key={region.name} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <span className="text-3xl block mb-2">{region.emoji}</span>
                <h3 className="font-semibold text-gray-900">{region.name}</h3>
                <p className="text-sm text-gray-500">{region.tours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Konaklamalı Tur Paketleri
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Çerkezköy'den kalkan konaklamalı tur paketlerimiz. 
            Otel konaklaması, yemekler, rehberlik ve ulaşım dahil.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {overnightTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image 
                    src={tour.image} 
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights.slice(0, 3).map((highlight) => (
                      <span key={highlight} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-green-600">{tour.price}</span>
                    <Link 
                      href={`/tours?destination=${tour.slug}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
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

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Konaklamalı Turlarımızda Neler Dahil?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <span className="text-4xl block mb-4">🏨</span>
              <h3 className="font-semibold text-gray-900 mb-2">Konaklama</h3>
              <p className="text-gray-600 text-sm">3-5 yıldızlı otellerde konaklama</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <span className="text-4xl block mb-4">🍽️</span>
              <h3 className="font-semibold text-gray-900 mb-2">Yemekler</h3>
              <p className="text-gray-600 text-sm">Tam pansiyon veya yarım pansiyon</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <span className="text-4xl block mb-4">🚐</span>
              <h3 className="font-semibold text-gray-900 mb-2">Ulaşım</h3>
              <p className="text-gray-600 text-sm">Klimalı otobüs ile gidiş-dönüş</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <span className="text-4xl block mb-4">🎯</span>
              <h3 className="font-semibold text-gray-900 mb-2">Rehberlik</h3>
              <p className="text-gray-600 text-sm">Profesyonel tur rehberi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Booking */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Erken Rezervasyon Avantajları!
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            2026 konaklamalı turlarımızda erken rezervasyon yapan müşterilerimize özel indirimler.
            Şimdi rezervasyon yaparak %20'ye varan indirimlerden yararlanın!
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <span className="text-3xl block mb-2">📅</span>
              <h3 className="font-semibold text-white">60 Gün Önce</h3>
              <p className="text-green-100">%15 İndirim</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <span className="text-3xl block mb-2">📅</span>
              <h3 className="font-semibold text-white">30 Gün Önce</h3>
              <p className="text-green-100">%10 İndirim</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <span className="text-3xl block mb-2">👥</span>
              <h3 className="font-semibold text-white">8+ Kişi</h3>
              <p className="text-green-100">%10 Grup İndirimi</p>
            </div>
          </div>
          <Link 
            href="/contact"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Erken Rezervasyon Yap
          </Link>
        </div>
      </section>
    </main>
  );
}
