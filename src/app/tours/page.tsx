import { Suspense } from 'react';
import { Metadata } from 'next';
import { ITour } from '@/models/Tour';
import { getToursByDB } from '@/lib/tours';
import ToursContent from './components/ToursContent';
import TourSeoLinks, { type TourSeoVariant } from '@/components/tours/TourSeoLinks';
import Link from 'next/link';
import { sortForDisplay } from '@/lib/tourUi';

/** Türkçe karakterleri sadeleştirip küçük harfe çevir: "Kapadokya" ~ "KAPADOKYA" ~ "kapadokya" */
function norm(text: string): string {
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
    .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// SEO için metadata
export const metadata: Metadata = {
  title: 'Çerkezköy Turları 2026 | Günübirlik, Konaklamalı, Yurtiçi ve Yurtdışı Turlar',
  description: 'Çerkezköy tur fırsatları burada! Günübirlik turlar, konaklamalı tatil paketleri, yurtiçi ve yurtdışı turlar. Çerkezköy, Çorlu ve Tekirdağdan kalkan turlar. Kapadokya, Karadeniz, İstanbul, Bursa turları. En uygun fiyatlar ve profesyonel rehberlik.',
  keywords: 'çerkezköy tur, çerkezköy turlar, günübirlik tur, konaklamalı tur, yurtiçi turlar, yurtdışı turlar, çerkezköy günübirlik tur, çerkezköy konaklamalı tur, çorlu tur, tekirdag tur, trakya tur, 2026 tur paketleri, kapadokya tur, karadeniz tur, istanbul tur, bursa tur',
  openGraph: {
    title: 'Çerkezköy Turları | Büyük Aytaç Travel',
    description: 'Çerkezköy\'den günübirlik ve konaklamalı turlar. En popüler destinasyonlar sizi bekliyor.',
    url: 'https://www.buyukaytactravel.com/tours',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/tours-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Çerkezköy Turları - Büyük Aytaç Travel',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/tours',
  },
};

// Server component olarak sayfa
export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{
    tourType?: string;
    accommodationType?: string;
    destination?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  // URL parametrelerini al (Next 15: searchParams bir Promise)
  const sp = await searchParams;
  const tourType = sp.tourType;
  const accommodationType = sp.accommodationType;
  const destination = sp.destination;
  const search = sp.search?.trim();
  const minPrice = sp.minPrice ? Number(sp.minPrice) : undefined;
  const maxPrice = sp.maxPrice ? Number(sp.maxPrice) : undefined;

  // Başlığı belirle
  let filterTitle = 'Tüm Turlarımız';
  let filterDescription = 'Türkiye\'nin güzelliklerini keşfedeceğiniz özel olarak hazırlanmış turlarımız. Çerkezköy\'nin en güvenilir tur acentesi Büyük Aytaç Travel ile hayallerinizi gerçekleştirin.';
  let seoVariant: TourSeoVariant = 'all';
  
  if (search) {
    filterTitle = `"${search}" için turlar`;
    filterDescription = `Çerkezköy kalkışlı ${search} turları ve benzer rotalar.`;
  } else if (destination) {
    filterTitle = `${destination} Turları`;
    filterDescription = `${destination} ve çevresini keşfedebileceğiniz özel turlarımız. Çerkezköy'den kalkan güvenli ve konforlu turlar.`;
  } else if (tourType === 'domestic') {
    filterTitle = 'Yurtiçi Turlarımız';
    filterDescription = 'Türkiye\'nin eşsiz güzelliklerini keşfedeceğiniz özel olarak hazırlanmış yurtiçi turlarımız. Çerkezköy\'den kalkan turlarımızla ülkemizin dört bir yanını keşfedin.';
    seoVariant = 'domestic';
  } else if (tourType === 'international') {
    filterTitle = 'Yurtdışı Turlarımız';
    filterDescription = 'Dünya\'nın en güzel destinasyonlarını keşfedeceğiniz yurtdışı turlarımız. Vizeli ve vizesiz tur seçenekleriyle hayallerinizi gerçekleştirin.';
    seoVariant = 'international';
  } else if (accommodationType === 'with_accommodation') {
    filterTitle = 'Konaklamalı Turlarımız';
    filterDescription = 'Konforlu otel konaklamaları eşliğinde gerçekleştirdiğimiz konaklamalı turlarımız. Her detayı düşünülmüş programlarla unutulmaz tatiller.';
    seoVariant = 'overnight';
  } else if (accommodationType === 'daily') {
    filterTitle = 'Günübirlik Turlarımız';
    filterDescription = 'Çerkezköy ve çevresinden kalkan günübirlik turlarımız. Hafta sonu kaçamakları için ideal tur programları.';
    seoVariant = 'daily';
  }

  // Server-side'da turları getir
  let tours: ITour[] = [];
  let error = null;

  try {
    // Veritabanından turları getir
    const allTours = await getToursByDB();
    
    // Filtreleme
    // Not: önceden destination tam eşleşme isteniyordu; kayıtlardaki destination alanı
    // "Konya, Mevlana Müzesi, Sille…" gibi uzun olduğu için aramalar hep boş dönüyordu.
    const terms = [search, destination].filter(Boolean).map((t) => norm(t as string));
    tours = allTours.filter((tour: ITour) => {
      if (!tour.isActive) return false;

      if (terms.length) {
        const haystack = norm(`${tour.name} ${tour.destination} ${tour.departureCity ?? ''}`);
        if (!terms.every((t) => t.split(/\s+/).every((w) => haystack.includes(w)))) return false;
      }
      if (tourType && tour.tourType !== tourType) return false;
      if (accommodationType && tour.accommodationType !== accommodationType) return false;
      if (minPrice !== undefined && !Number.isNaN(minPrice) && tour.price < minPrice) return false;
      if (maxPrice !== undefined && !Number.isNaN(maxPrice) && tour.price > maxPrice) return false;

      return true;
    });
    tours = sortForDisplay(tours);
  } catch (err) {
    console.error('Turları getirme hatası:', err);
    error = 'Turlar yüklenirken bir hata oluştu.';
  }

  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{filterTitle}</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  // Schema.org yapılandırılmış veri
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': 'https://www.buyukaytactravel.com/tours',
    'name': filterTitle,
    'description': `Büyük Aytaç Travel ${filterTitle}`,
    'provider': {
      '@type': 'Organization',
      'name': 'Büyük Aytaç Travel',
      'url': 'https://www.buyukaytactravel.com',
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': filterTitle,
      'itemListElement': tours.map((tour) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'TouristTrip',
          'name': tour.name,
          'description': tour.description,
          'image': tour.image,
          'url': `https://www.buyukaytactravel.com/tours/${tour.slug}`,
        },
        'price': tour.price,
        'priceCurrency': 'TRY',
      })),
    },
  };

  // BreadcrumbList schema for SEO
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Ana Sayfa',
        'item': 'https://www.buyukaytactravel.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Turlar',
        'item': 'https://www.buyukaytactravel.com/tours'
      },
      ...(tourType ? [{
        '@type': 'ListItem',
        'position': 3,
        'name': tourType === 'domestic' ? 'Yurtiçi Turlar' : 'Yurtdışı Turlar',
        'item': `https://www.buyukaytactravel.com/tours?tourType=${tourType}`
      }] : [])
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{filterTitle}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {filterDescription}
            </p>
            <nav className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-blue-700" aria-label="Tur kategorileri">
              <Link href="/tours?tourType=domestic" className="hover:underline">Yurtiçi</Link>
              <span className="text-slate-300">·</span>
              <Link href="/tours?tourType=international" className="hover:underline">Yurtdışı</Link>
              <span className="text-slate-300">·</span>
              <Link href="/tours/daily" className="hover:underline">Günübirlik</Link>
              <span className="text-slate-300">·</span>
              <Link href="/tours/overnight" className="hover:underline">Konaklamalı</Link>
              <span className="text-slate-300">·</span>
              <Link href="/cerkezkoy-tur" className="hover:underline">Çerkezköy Turları</Link>
              <span className="text-slate-300">·</span>
              <Link href="/blog" className="hover:underline">Blog</Link>
            </nav>
          </div>

          {/* Client component'e turları geçir */}
          <Suspense 
            fallback={
              <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
                    <div className="aspect-square bg-gray-200 animate-pulse" />
                    <div className="space-y-3 p-4">
                      <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
                      <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />
                      <div className="h-10 rounded bg-gray-200 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <ToursContent tours={tours} />
          </Suspense>

          <TourSeoLinks variant={seoVariant} />
        </div>
      </main>
    </>
  );
} 