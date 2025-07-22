import Hero from '@/components/Hero';
import SearchSection from '@/components/SearchSection';
import ToursByType from '@/components/ToursByType';
import { TourType, AccommodationType } from '@/models/Tour';
import Image from 'next/image';
import ContactCTA from '@/components/ContactCTA';
import BlogPreview from '@/components/BlogPreview';
import CustomerReviews from '@/components/CustomerReviews';
import Link from 'next/link';

export default function Home() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      
      <div className="bg-white min-h-screen">
        <main>
          <Hero />
          
          {/* Search Section */}
          <SearchSection />
          
          {/* Quick Links Section - Internal Linking Enhancement */}
          <section className="py-12 bg-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Popüler Tur Kategorileri</h2>
                <p className="text-gray-600">En çok tercih edilen tur tiplerini keşfedin</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  href="/tours?accommodationType=daily"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-3xl mb-2">🌅</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Günübirlik</h3>
                  <p className="text-sm text-gray-500 mt-1">Hızlı kaçamaklar</p>
                </Link>
                <Link 
                  href="/tours?accommodationType=with_accommodation"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center group"
                >
                  <div className="text-3xl mb-2">🏨</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Konaklamalı</h3>
                  <p className="text-sm text-gray-500 mt-1">Uzun tatiller</p>
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
          
          {/* Blog Önizleme Bölümü */}
          <BlogPreview />
          
          {/* Müşteri Yorumları - SEO Optimized */}
          <CustomerReviews />
          
          <ContactCTA />
        </main>
      </div>
    </>
  );
}
