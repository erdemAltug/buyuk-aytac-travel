// SEO Schema utilities for Büyük Aytaç Travel
// Local SEO and structured data for Çerkezköy tourism

// Local Business Schema for Çerkezköy
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Büyük Aytaç Travel",
  "description": "Çerkezköy, Tekirdağ ve Çorlu'dan yurtiçi ve yurtdışı turlar. TÜRSAB üyesi güvenilir tur operatörü. Günübirlik turlar, konaklamalı turlar ve özel grup turları.",
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
      "name": "Kapaklı"
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
    "alternateName": "Türkiye Seyahat Acentaları Birliği"
  },
  "sameAs": [
    "https://www.instagram.com/buyukaytactravel",
    "https://www.facebook.com/buyukaytactravel"
  ],
  "image": "https://www.buyukaytactravel.com/images/LOGO.png"
};

// Website Schema
export const websiteSchema = {
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

// Tourist Information types for Çerkezköy
export const touristInformationCenterSchema = {
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  "name": "Büyük Aytaç Travel - Çerkezköy Tur Bilgi",
  "description": "Çerkezköy'den düzenlenen günübirlik ve konaklamalı turlar hakkında bilgi merkezi",
  "url": "https://www.buyukaytactravel.com",
  "areaServed": {
    "@type": "City",
    "name": "Çerkezköy"
  },
  "serviceType": "Tourist information"
};

// Tour Package Product Schema
export interface TourProduct {
  name: string;
  description: string;
  url: string;
  image: string;
  price?: number;
  priceCurrency?: string;
  duration?: string;
  category?: string;
}

export function createTourProductSchema(tour: TourProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": tour.name,
    "description": tour.description,
    "url": tour.url,
    "image": tour.image,
    "offers": tour.price ? {
      "@type": "Offer",
      "price": tour.price,
      "priceCurrency": tour.priceCurrency || "TRY",
      "availability": "https://schema.org/InStock"
    } : undefined,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "156"
    }
  };
}

// FAQ Schema for SEO
export interface FAQItem {
  question: string;
  answer: string;
}

export function createFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Breadcrumb Schema
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Organization Schema for Local SEO
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Büyük Aytaç Travel",
  "url": "https://www.buyukaytactravel.com",
  "logo": "https://www.buyukaytactravel.com/images/LOGO.png",
  "description": "Çerkezköy'nin lider tur acentesi. 20 yıllık deneyimle günübirlik ve konaklamalı turlar.",
  "areaServed": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Çerkezköy",
      "addressRegion": "Tekirdağ",
      "addressCountry": "TR"
    }
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-532-123-4567",
    "contactType": "customer service",
    "email": "info@buyukaytactravel.com",
    "availableLanguage": ["Turkish"]
  },
  "sameAs": [
    "https://instagram.com/buyukaytactravel",
    "https://facebook.com/buyukaytactravel"
  ]
};

// Event Schema for Tours
export interface TourEvent {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  price?: number;
}

export function createTourEventSchema(event: TourEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Çerkezköy",
        "addressRegion": "Tekirdağ"
      }
    },
    "image": event.image,
    "offers": event.price ? {
      "@type": "Offer",
      "price": event.price,
      "priceCurrency": "TRY",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString()
    } : undefined,
    "organizer": {
      "@type": "Organization",
      "name": "Büyük Aytaç Travel",
      "url": "https://www.buyukaytactravel.com"
    }
  };
}

// HowTo Schema for Tour Preparation
export function createTourPreparationGuide() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Tura Hazırlık Rehberi",
    "description": "Büyük Aytaç Travel turlarına hazırlık için adım adım rehber",
    "step": [
      {
        "@type": "HowToStep",
        "name": "1. Tur Seçimi",
        "text": "İlgilendiğiniz tur paketini seçin ve detayları inceleyin."
      },
      {
        "@type": "HowToStep",
        "name": "2. Rezervasyon",
        "text": "İletişim formu veya telefon ile rezervasyon yapın."
      },
      {
        "@type": "HowToStep",
        "name": "3. Ödeme",
        "text": "Belirtilen banka hesaplarına ödemeyi tamamlayın."
      },
      {
        "@type": "HowToStep",
        "name": "4. Katılım",
        "text": "Belirtilen saat ve buluşma noktasında tura katılın."
      }
    ]
  };
}

// Reviews/Testimonials Schema
export function createReviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "TravelAgency",
      "name": "Büyük Aytaç Travel"
    },
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "156",
    "reviewCount": "142"
  };
}

// JSON-LD helper function
export function generateSchemaScript(schema: object): string {
  return JSON.stringify(schema);
}
