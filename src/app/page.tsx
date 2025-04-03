import Hero from '@/components/Hero';
import SearchSection from '@/components/SearchSection';
import ToursByType from '@/components/ToursByType';
import { TourType, AccommodationType } from '@/models/Tour';

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
        viewAllLink="/tours/domestic"
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
        viewAllLink="/tours/international"
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
        viewAllLink="/tours/daily"
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
        viewAllLink="/tours/with-accommodation"
        viewAllText="Tüm Konaklamalı Turlar"
        filterParams={{
          isActive: true,
          accommodationType: AccommodationType.WITH_ACCOMMODATION
        }}
      />
    </main>
  );
}
