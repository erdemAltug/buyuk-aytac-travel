import Hero from '@/components/Hero';
import SearchSection from '@/components/SearchSection';
import ToursByType from '@/components/ToursByType';
import { TourType, AccommodationType } from '@/models/Tour';
import Image from 'next/image';
import ContactCTA from '@/components/ContactCTA';

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Search Section */}
      <SearchSection />
      
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">TÜRSAB Üyesi</h2>
              <p className="text-lg text-gray-600 mb-6">
                Büyük Aytaç Seyahat, Türkiye Seyahat Acentaları Birliği (TÜRSAB) üyesi olarak, 
                tüm yasal gereklilikleri karşılayan, güvenilir bir seyahat acentasıdır. 
                TÜRSAB belgeli acentalarla çalışmak, seyahatlerinizin güvence altında olduğu anlamına gelir.
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-gray-700">Profesyonel ve lisanslı tur operatörleri</p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-gray-700">Güvenilir ve şeffaf hizmet</p>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-gray-700">Yasal güvence ve teminat</p>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative h-60 w-60 md:h-72 md:w-72">
                <Image 
                  src="/images/tursab.png"
                  alt="TÜRSAB Logo" 
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ContactCTA />
    </main>
  );
}
