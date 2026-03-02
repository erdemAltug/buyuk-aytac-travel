import { Metadata } from 'next';
import Link from 'next/link';

// SEO için metadata - Popüler Turlar
export const metadata: Metadata = {
  title: 'Popüler Turlar 2025 | En Çok Tercih Edilen Tur Rotaları | Büyük Aytaç Travel',
  description: 'Büyük Aytaç Travel popüler turları keşfedin. Kapadokya, Karadeniz, GAP, Pamukkale, İstanbul ve daha birçok destinasyon. Çerkezköy\'den kalkan en çok tercih edilen turlar.',
  keywords: 'popüler turlar, en çok tercih edilen turlar, kapadokya turu, karadeniz turu, gap turu, pamukkale turu, istanbul turu, efes turu, çerkezköy turlar, 2025 popüler turlar',
  openGraph: {
    title: 'Popüler Turlar 2025 | Büyük Aytaç Travel',
    description: 'En çok tercih edilen tur rotalarını keşfedin. Türkiye\'nin en güzel destinasyonları sizi bekliyor.',
    url: 'https://www.buyukaytactravel.com/populer-turlar',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Popüler Turlar - Büyük Aytaç Travel',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/populer-turlar',
  },
};

// Popüler tur kategorileri ve etiketleri
const popularTourCategories = [
  {
    id: 'guneydogu',
    name: 'Güneydoğu Anadolu',
    slug: 'gap-turu',
    emoji: '🏛️',
    description: 'Gaziantep, Şanlıurfa, Mardin, Diyarbakır',
    color: 'amber',
    destinations: ['Gaziantep', 'Şanlıurfa', 'Mardin', 'Diyarbakır', 'Nemrut']
  },
  {
    id: 'karadeniz',
    name: 'Karadeniz',
    slug: 'karadeniz-turu',
    emoji: '🌲',
    description: 'Trabzon, Rize, Ayder, Samsun, Amasra',
    color: 'green',
    destinations: ['Trabzon', 'Rize', 'Ayder', 'Uzungöl', 'Samsun', 'Amasra']
  },
  {
    id: 'kapadokya',
    name: 'Kapadokya',
    slug: 'kapadokya-turu',
    emoji: '🎈',
    description: 'Nevşehir, Ürgüp, Avanos, Balon Turu',
    color: 'orange',
    destinations: ['Nevşehir', 'Ürgüp', 'Avanos', 'Balon', 'Yeraltı Şehri']
  },
  {
    id: 'ege',
    name: 'Ege Bölgesi',
    slug: 'ege-turu',
    emoji: '🏖️',
    description: 'İzmir, Muğla, Bodrum, Marmaris, Fethiye',
    color: 'teal',
    destinations: ['İzmir', 'Bodrum', 'Marmaris', 'Fethiye', 'Kuşadası', 'Çeşme']
  },
  {
    id: 'akdeniz',
    name: 'Akdeniz',
    slug: 'akdeniz-turu',
    emoji: '☀️',
    description: 'Antalya, Alanya, Side, Kemer, Kaş',
    color: 'yellow',
    destinations: ['Antalya', 'Alanya', 'Side', 'Kemer', 'Kaş', 'Kumluca']
  },
  {
    id: 'anadolu',
    name: 'Anadolu Tarihi',
    slug: 'anadolu-turu',
    emoji: '🏺',
    description: 'Ankara, Konya, Cappadox, Frigya',
    color: 'red',
    destinations: ['Ankara', 'Konya', 'Cappadox', 'Frigya', 'Sultanhani']
  },
  {
    id: 'marmara',
    name: 'Marmara Bölgesi',
    slug: 'marmara-turu',
    emoji: '🌉',
    description: 'İstanbul, Bursa, Edirne, Çanakkale',
    color: 'blue',
    destinations: ['İstanbul', 'Bursa', 'Edirne', 'Çanakkale', 'Trakya']
  },
  {
    id: 'gunubirlik',
    name: 'Günübirlik Turlar',
    slug: 'tours?accommodationType=daily',
    emoji: '🌅',
    description: 'Kısa süreli turlar, hafta sonu kaçamakları',
    color: 'purple',
    destinations: ['Yalova', 'Abant', 'Sapanca', 'İznik', 'Bilecik']
  }
];

// Bölgesel turlar
const regionalTours = [
  { name: 'Trakya Turu', slug: '/tours?destination=Trakya', description: 'Edirne, Tekirdağ, Kırklareli turları' },
  { name: 'Bursa Turu', slug: '/tours?destination=Bursa', description: 'Uludağ, Cumalıkızık, İznik' },
  { name: 'İstanbul Turu', slug: '/tours?destination=İstanbul', description: 'Tarihi yarımada, Boğaz turları' },
  { name: 'Pamukkale Turu', slug: '/tours?destination=Pamukkale', description: 'Hierapolis, travertenler' },
  { name: 'Efes Turu', slug: '/tours?destination=Efes', description: 'Antik Efes, Meryemana' },
  { name: 'Safranbolu Turu', slug: '/tours?destination=Safranbolu', description: 'Tarihi konaklar, Osmanlı evleri' },
  { name: 'Uludağ Turu', slug: '/tours?destination=Uludağ', description: 'Kayak ve doğa turları' },
  { name: 'Abant Turu', slug: '/tours?destination=Abant', description: 'Göl manzarası, doğa' },
];

// Mevsimsel turlar
const seasonalTours = [
  { name: 'Yaz Tatili Turları', slug: '/tours?tourType=domestic&season=summer', emoji: '🏖️' },
  { name: 'Kış Tatili Turları', slug: '/tours?tourType=domestic&season=winter', emoji: '⛷️' },
  { name: 'Son Dakika Turları', slug: '/tours?isLastMinute=true', emoji: '⚡' },
  { name: 'Yılbaşı Turları', slug: '/tours?tag=yilbasi', emoji: '🎄' },
  {
    name: 'Okul Tatili Turları',
    slug: '/tours?tourType=domestic',
    emoji: '🎒',
  },
];

export default function PopulerTurlarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': 'https://www.buyukaytactravel.com/populer-turlar',
            'name': 'Popüler Turlar',
            'description': 'Büyük Aytaç Travel popüler tur kategorileri ve destinasyonları',
            'url': 'https://www.buyukaytactravel.com/populer-turlar',
            'mainEntity': {
              '@type': 'ItemList',
              'itemListElement': popularTourCategories.map((cat, index) => ({
                '@type': 'ListItem',
                'position': index + 1,
                'name': cat.name,
                'url': `https://www.buyukaytactravel.com/${cat.slug}`,
              })),
            },
          }),
        }}
      />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popüler Turlar
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Türkiye'nin en güzel destinasyonlarını keşfedin. 
              Uzman rehberlerimiz eşliğinde unutulmaz tatil deneyimleri sizi bekliyor.
            </p>
          </div>

          {/* Quick Search Tags */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">🔍 Hızlı Arama</h2>
            <div className="flex flex-wrap gap-2">
              <Link 
                href="/gap-turu" 
                className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm hover:bg-amber-200 transition-colors"
              >
                GAP Turu
              </Link>
              <Link 
                href="/karadeniz-turu" 
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                Karadeniz Turu
              </Link>
              <Link 
                href="/kapadokya-turu" 
                className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm hover:bg-orange-200 transition-colors"
              >
                Kapadokya Turu
              </Link>
              <Link 
                href="/tours?destination=Pamukkale" 
                className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm hover:bg-cyan-200 transition-colors"
              >
                Pamukkale
              </Link>
              <Link 
                href="/tours?destination=Efes" 
                className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm hover:bg-purple-200 transition-colors"
              >
                Efes
              </Link>
              <Link 
                href="/tours?destination=Bursa" 
                className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm hover:bg-yellow-200 transition-colors"
              >
                Bursa
              </Link>
              <Link 
                href="/tours?destination=İstanbul" 
                className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm hover:bg-pink-200 transition-colors"
              >
                İstanbul
              </Link>
              <Link 
                href="/tours?accommodationType=daily" 
                className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm hover:bg-indigo-200 transition-colors"
              >
                Günübirlik
              </Link>
              <Link 
                href="/tours?isLastMinute=true" 
                className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm hover:bg-red-200 transition-colors"
              >
                Son Dakika
              </Link>
              <Link 
                href="/tours?tourType=international" 
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                Yurtdışı
              </Link>
            </div>
          </div>

          {/* Popular Categories Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🏝️ Popüler Tur Kategorileri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularTourCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.slug}`}
                  className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow group`}
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{category.emoji}</span>
                    <h3 className={`font-bold text-lg text-${category.color}-700 group-hover:text-${category.color}-900`}>
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {category.destinations.slice(0, 3).map((dest) => (
                      <span key={dest} className={`text-xs bg-${category.color}-50 text-${category.color}-700 px-2 py-1 rounded`}>
                        {dest}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Regional Tours */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🗺️ Bölgesel Turlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {regionalTours.map((tour) => (
                <Link
                  key={tour.name}
                  href={tour.slug}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow group"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                    {tour.name}
                  </h3>
                  <p className="text-sm text-gray-500">{tour.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Seasonal Tours */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📅 Mevsimsel Turlar</h2>
            <div className="flex flex-wrap gap-4">
              {seasonalTours.map((tour) => (
                <Link
                  key={tour.name}
                  href={tour.slug}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center"
                >
                  <span className="text-3xl mr-3">{tour.emoji}</span>
                  <div>
                    <h3 className="font-bold">{tour.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All Tours Link */}
          <div className="text-center">
            <Link 
              href="/tours" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Tüm Turları Görüntüle →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
