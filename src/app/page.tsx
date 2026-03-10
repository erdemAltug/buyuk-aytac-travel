import Hero from '@/components/Hero';
import SearchSection from '@/components/SearchSection';
import ToursByType from '@/components/ToursByType';
import { TourType, AccommodationType } from '@/types/tour';
import Image from 'next/image';
import ContactCTA from '@/components/ContactCTA';
import BlogPreview from '@/components/BlogPreview';
import InstagramFeed from '@/components/InstagramFeed';
import FeaturedTours from '@/components/FeaturedTours';
import Link from 'next/link';
import { getFeaturedToursForHome, getLatestBlogsForHome } from '@/lib/homeData';

// SEO için: her zaman sunucuda render et
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Sunucuda veriyi çek: ilk HTML'de turlar ve bloglar olsun (Googlebot JS beklemeden görsün)
  const [initialTours, initialBlogs] = await Promise.all([
    getFeaturedToursForHome().catch(() => []),
    getLatestBlogsForHome().catch(() => []),
  ]);
  // Website için kapsamlı structured data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Büyük Aytaç Travel",
    "alternateName": "Çerkezköy Tur Operatörü",
    "url": "https://www.buyukaytactravel.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.buyukaytactravel.com/tours?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Local Business Schema for Çerkezköy
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Büyük Aytaç Travel",
    "description": "Çerkezköy, Tekirdağ ve Çorlu'dan yurtiçi ve yurtdışı turlar. TÜRSAB üyesi güvenilir tur operatörü.",
    "url": "https://www.buyukaytactravel.com",
    "telephone": "+90-532-123-4567",
    "email": "info@buyukaytactravel.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Çerkezköy",
      "addressLocality": "Tekirdağ",
      "addressRegion": "TR-59",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.2833",
      "longitude": "28.0000"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "₺₺",
    "areaServed": [
      {
        "@type": "City",
        "name": "Çerkezköy"
      },
      {
        "@type": "City",
        "name": "Tekirdağ"
      },
      {
        "@type": "City", 
        "name": "Çorlu"
      },
      {
        "@type": "City",
        "name": "Trakya"
      }
    ],
    "serviceType": [
      "Yurtiçi Turlar",
      "Yurtdışı Turlar",
      "Günübirlik Turlar",
      "Konaklamalı Turlar",
      "Grup Turları"
    ],
    "memberOf": {
      "@type": "ProgramMembership",
      "name": "TÜRSAB",
      "memberNumber": "12345"
    }
  };

  // Service schema for travel services
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Tur ve Seyahat Hizmetleri",
    "provider": {
      "@type": "TravelAgency",
      "name": "Büyük Aytaç Travel"
    },
    "serviceType": [
      "Yurtiçi Turlar",
      "Yurtdışı Turlar", 
      "Günübirlik Turlar",
      "Konaklamalı Turlar",
      "Grup Turları"
    ],
    "areaServed": [
      "Çerkezköy",
      "Tekirdağ",
      "Çorlu",
      "Trakya"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      <div className="bg-white min-h-screen">
        <main>
          <Hero />
          
          {/* Search Section */}
          <SearchSection />
          
          {/* Featured Tours - initialTours ile ilk HTML'de içerik gelir (SEO) */}
          <FeaturedTours initialTours={initialTours} />
          
          {/* Quick Links Section - Internal Linking Enhancement */}
          <section className="py-12 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Popüler Tur Kategorileri</h2>
                <p className="text-gray-600">En çok tercih edilen tur tiplerini keşfedin</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Link 
                  href="/tours?tourType=domestic"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-3xl mb-2">🏔️</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Yurtiçi Turlar</h3>
                  <p className="text-sm text-gray-500 mt-1">Türkiye'yi keşfedin</p>
                </Link>
                <Link 
                  href="/tours?tourType=international"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-3xl mb-2">✈️</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Yurtdışı Turlar</h3>
                  <p className="text-sm text-gray-500 mt-1">Dünyayı keşfedin</p>
                </Link>
                <Link 
                  href="/gap-turu"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-3xl mb-2">🏛️</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">GAP Turu</h3>
                  <p className="text-sm text-gray-500 mt-1">Güneydoğu</p>
                </Link>
                <Link 
                  href="/karadeniz-turu"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-3xl mb-2">🌲</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Karadeniz</h3>
                  <p className="text-sm text-gray-500 mt-1">Yaylalar</p>
                </Link>
                <Link 
                  href="/kapadokya-turu"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-3xl mb-2">🎈</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Kapadokya</h3>
                  <p className="text-sm text-gray-500 mt-1">Peri Bacaları</p>
                </Link>
                <Link 
                  href="/populer-turlar"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-3xl mb-2">🔍</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Tüm Turlar</h3>
                  <p className="text-sm text-gray-500 mt-1">Keşfedin</p>
                </Link>
              </div>
            </div>
          </section>
          
          {/* Yurtiçi Turları */}
          <ToursByType 
            title="Yurtiçi Turlarımız"
            description="Türkiye'nin eşsiz güzelliklerini keşfedeceğiniz özel olarak hazırlanmış yurtiçi turlarımız"
            viewAllLink="/tours?tourType=domestic"
            viewAllText="Tüm Yurtiçi Turları"
            filterParams={{
              isActive: true,
              tourType: TourType.DOMESTIC
            }}
          />
          
          {/* Yurtdışı Turları */}
          <ToursByType 
            title="Yurtdışı Turlarımız"
            description="Dünya'nın en güzel yerlerini keşfedeceğiniz özel olarak hazırlanmış yurtdışı turlarımız"
            viewAllLink="/tours?tourType=international"
            viewAllText="Tüm Yurtdışı Turları"
            filterParams={{
              isActive: true,
              tourType: TourType.INTERNATIONAL
            }}
          />
          
          {/* Günübirlik Turlar */}
          <ToursByType 
            title="Günübirlik Turlarımız"
            description="Kısa zaman dilimlerinde maksimum keyif alabileceğiniz özel günübirlik tur programlarımız"
            viewAllLink="/tours?accommodationType=daily"
            viewAllText="Tüm Günübirlik Turlar"
            filterParams={{
              isActive: true,
              accommodationType: AccommodationType.DAILY
            }}
          />
          
          {/* Konaklamalı Turlar */}
          <ToursByType 
            title="Konaklamalı Turlarımız"
            description="Uzun soluklu, konforlu konaklamalı turlarımızla unutulmaz tatil deneyimleri"
            viewAllLink="/tours?accommodationType=with_accommodation"
            viewAllText="Tüm Konaklamalı Turlar"
            filterParams={{
              isActive: true,
              accommodationType: AccommodationType.WITH_ACCOMMODATION
            }}
          />
          
          {/* 2026 Yıllık Tur Takvimi */}
          <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">2026 Yıllık Tur Programı</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Bu yıl sizler için hazırladığımız tur programları ve takvimi. 
                  Kapadokya, Karadeniz, GAP ve daha birçok destinasyonda unutulmaz tatil deneyimleri sizi bekliyor!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {/* İlkbahar */}
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">İlkbahar 2026</h3>
                    <span className="text-2xl">🌸</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Kapadokya Turu</span>
                      <span className="text-green-600 font-medium">20-22 Mar</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Eskişehir Turu</span>
                      <span className="text-green-600 font-medium">21 Mar</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Bursa Şehir Turu</span>
                      <span className="text-green-600 font-medium">22 Mar</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Adana Festival</span>
                      <span className="text-green-600 font-medium">3-5 Nis</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Safranbolu Turu</span>
                      <span className="text-green-600 font-medium">10-12 Nis</span>
                    </li>
                  </ul>
                </div>
                
                {/* Yaz */}
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Yaz 2026</h3>
                    <span className="text-2xl">☀️</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Karadeniz Turu</span>
                      <span className="text-orange-600 font-medium">Haziran</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">GAP Turu</span>
                      <span className="text-orange-600 font-medium">Temmuz</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Ege Turları</span>
                      <span className="text-orange-600 font-medium">Temmuz-Ağu</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">İstanbul Turları</span>
                      <span className="text-orange-600 font-medium">Yaz Dönemi</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Bodrum Turu</span>
                      <span className="text-orange-600 font-medium">Ağustos</span>
                    </li>
                  </ul>
                </div>
                
                {/* Sonbahar/Kış */}
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Sonbahar/Kış</h3>
                    <span className="text-2xl">🍂</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Kapadokya Balon</span>
                      <span className="text-purple-600 font-medium">Ekim-Kas</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Batum Turu</span>
                      <span className="text-purple-600 font-medium">Eylül</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Konya Şeb-i Arus</span>
                      <span className="text-purple-600 font-medium">Aralık</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Yılbaşı Turları</span>
                      <span className="text-purple-600 font-medium">Aralık</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Uludağ Kayak</span>
                      <span className="text-purple-600 font-medium">Ocak</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <Link 
                  href="/annual-program"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Tam Takvimi İncele
                </Link>
              </div>
            </div>
          </section>
          
          {/* TÜRSAB Üyelik Bölümü */}
          <section className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">TÜRSAB Üyesi Güvencesi</h2>
                  <div className="prose prose-lg max-w-none text-gray-600">
                    <p>
                      <strong>Büyük Aytaç Travel</strong>, <Link href="/about" className="text-blue-600 hover:underline">Türkiye Seyahat Acentaları Birliği (TÜRSAB)</Link> üyesi olarak, 
                      tüm yasal gereklilikleri karşılayan, güvenilir bir seyahat acentasıdır. 
                      TÜRSAB belgeli acentalarla çalışmak, seyahatlerinizin güvence altında olduğu anlamına gelir.
                    </p>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p className="text-gray-700">Profesyonel ve lisanslı tur operatörleri</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p className="text-gray-700">Güvenilir ve şeffaf hizmet</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p className="text-gray-700">Yasal güvence ve teminat</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link 
                      href="/about"
                      className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Hakkımızda Daha Fazla Bilgi
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative h-60 w-60 md:h-72 md:w-72">
                    <Image 
                      src="/images/tursab.png"
                      alt="TÜRSAB - Türkiye Seyahat Acentaları Birliği Üye Belgesi" 
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 240px, 288px"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Blog Önizleme - initialBlogs ile ilk HTML'de içerik gelir (SEO) */}
          <BlogPreview initialBlogs={initialBlogs} />
          
          {/* Instagram Feed */}
          <InstagramFeed />
          
          <ContactCTA />
        </main>
      </div>
    </>
  );
}
