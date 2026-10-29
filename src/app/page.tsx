import ContactCTA from '@/components/ContactCTA';
import BlogPreview from '@/components/BlogPreview';
import InstagramFeed from '@/components/InstagramFeed';
import FutureTourVote from '@/components/FutureTourVote';
import GoogleReviews from '@/components/GoogleReviews';
import HeroNext from '@/components/home/HeroNext';
import TourExplorer from '@/components/home/TourExplorer';
import DestinationMosaic from '@/components/home/DestinationMosaic';
import WhyUs from '@/components/home/WhyUs';
import RecentlyViewed from '@/components/RecentlyViewed';
import { getLatestBlogsForHome, getToursForHomeExplorer } from '@/lib/homeData';
import { isUpcoming, sortForDisplay } from '@/lib/tourUi';

// SEO için: her zaman sunucuda render et
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Sunucuda veriyi çek: ilk HTML'de turlar ve bloglar olsun (Googlebot JS beklemeden görsün)
  const [allTours, initialBlogs] = await Promise.all([
    getToursForHomeExplorer().catch(() => []),
    getLatestBlogsForHome().catch(() => []),
  ]);
  const upcoming = sortForDisplay(allTours.filter((t) => isUpcoming(t)));
  const nextTour = upcoming.find((t) => t.startDate) ?? null;
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
    "telephone": "+90-539-345-95-59",
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
      "memberNumber": "17674"
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

      {/*
        Yeni ana sayfa akışı (docs/TASARIM_SISTEMI.md):
        Hero → Son baktıkların → Tur vitrini → Popüler rotalar → Neden biz → Yorumlar → Oylama → Blog → Instagram → İletişim
        Kaldırılanlar: 4 ayrı tur bölümü (tek vitrine birleşti), elle yazılmış 2026 programı (tarihleri eskiydi),
        tekrar eden güven bantları (WhyUs'ta birleşti), ayrı arama kutusu (hero'ya taşındı).
      */}
      <main className="bg-white">
        <HeroNext nextTour={nextTour} upcomingCount={upcoming.length} />
        <RecentlyViewed />
        <TourExplorer tours={allTours} />
        <DestinationMosaic tours={allTours} />
        <WhyUs />
        <GoogleReviews />
        <FutureTourVote />
        <BlogPreview initialBlogs={initialBlogs} />
        <InstagramFeed />
        <ContactCTA />
      </main>
    </>
  );
}
