import Link from 'next/link';
import { Metadata } from 'next';
import { getToursByDB } from '@/lib/tours';
import ToursContent from '@/app/tours/components/ToursContent';
import type { ITour } from '@/types/tour';

export const metadata: Metadata = {
  title: 'Ege Turları 2026 | Ayvalık, Gökçeada, Bozcaada, Assos | Çerkezköy | Büyük Aytaç Travel',
  description:
    'Ege turları 2026: Ayvalık Cunda, Gökçeada, Bozcaada, Assos günübirlik geziler. Çerkezköy, Çorlu ve Tekirdağ çıkışlı Ege ada turları.',
  keywords:
    'ege turları, ayvalık turu, gökçeada turu, bozcaada turu, assos turu, çerkezköy ege turu, ada turları 2026, cunda turu',
  openGraph: {
    title: 'Ege Turları 2026 | Büyük Aytaç Travel',
    description: 'Çerkezköyden Ege adaları ve kıyı turları. Ayvalık, Gökçeada, Bozcaada, Assos.',
    url: 'https://www.buyukaytactravel.com/ege-turu',
    type: 'website',
    images: [{ url: 'https://www.buyukaytactravel.com/images/Ayvalık-cunda.jpeg', width: 1200, height: 630, alt: 'Ege Turları' }],
  },
  alternates: { canonical: 'https://www.buyukaytactravel.com/ege-turu' },
};

const EGE_KEYWORDS = [
  'ayvalık', 'cunda', 'gökçeada', 'gokceada', 'bozcaada', 'assos', 'behramkale',
  'ege', 'edremit', 'yeşilyurt', 'adatepe', 'kabatepe', 'geyikli', 'imroz',
  'şeytan sofrası', 'kaz dağları', 'çanakkale',
];

function isEgeTour(tour: ITour): boolean {
  const text = `${tour.name} ${tour.destination} ${tour.description}`.toLowerCase();
  return EGE_KEYWORDS.some((k) => text.includes(k));
}

export default async function EgeTuruPage() {
  let tours: ITour[] = [];

  try {
    const allTours = await getToursByDB({ isActive: true, tourType: 'domestic' });
    tours = allTours.filter(isEgeTour);
  } catch {
    tours = [];
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': 'https://www.buyukaytactravel.com/ege-turu',
    name: 'Ege Turları - Çerkezköy Çıkışlı',
    description: 'Ayvalık, Gökçeada, Bozcaada, Assos ve Çanakkale Ege rotaları.',
    provider: { '@type': 'TravelAgency', name: 'Büyük Aytaç Travel', url: 'https://www.buyukaytactravel.com' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/75 to-cyan-800/55 z-10" />
            <img src="/images/Ayvalık-cunda.jpeg" alt="Ege Turları" className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Ege Turları 2026</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Ada turları · kıyı gezileri · Çerkezköy çıkışlı
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Çerkezköyden Ege Rotları</h2>
            <p className="text-gray-600 mb-4">
              Trakya konumunuz sayesinde <strong>Gökçeada</strong>, <strong>Bozcaada</strong>,{' '}
              <strong>Ayvalık–Cunda</strong> ve <strong>Assos</strong> gibi Ege&apos;nin en popüler
              günübirlik rotalarına tek günde ulaşabilirsiniz.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/blog/ayvalik-cunda-turu-rehberi-2026" className="text-teal-700 hover:underline text-sm">
                Ayvalık rehberi →
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/blog/gokceada-vs-bozcaada-ada-turlari-karsilastirma" className="text-teal-700 hover:underline text-sm">
                Ada karşılaştırması →
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/blog/temmuz-2026-cerkezkoy-tur-takvimi-guncel" className="text-teal-700 hover:underline text-sm">
                Temmuz takvimi →
              </Link>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Güncel Ege Turları</h2>
            {tours.length > 0 ? (
              <ToursContent tours={tours} />
            ) : (
              <p className="text-gray-600">
                Turlar yüklenemedi. <Link href="/tours?accommodationType=daily" className="text-blue-600 hover:underline">Günübirlik turlara göz atın</Link>.
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { href: '/tours/gokceada-turu-12-temmuz-2026', label: 'Gökçeada Turu', price: '1.800 TL' },
              { href: '/tours/bozcaada-turu-26-temmuz-2026', label: 'Bozcaada Turu', price: '1.800 TL' },
              { href: '/tours/ayvalik-cunda-turu-11-temmuz-2026', label: 'Ayvalık Cunda', price: '1.750 TL' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
                <p className="text-teal-600 text-sm mt-1">{item.price} · Detay →</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-flex bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700">
              Rezervasyon &amp; Bilgi
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
