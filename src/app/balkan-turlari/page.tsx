import Link from 'next/link';
import { Metadata } from 'next';
import { getToursByDB } from '@/lib/tours';
import ToursContent from '@/app/tours/components/ToursContent';
import type { ITour } from '@/types/tour';

export const metadata: Metadata = {
  title: 'Balkan Turları 2026 | Vizesiz Balkan Turu | Çerkezköy Çıkışlı | Büyük Aytaç Travel',
  description:
    'Balkan turları 2026: Belgrad, Saraybosna, Mostar, Budva, Kotor, Ohrid. Vizesiz yurtdışı turlar. Çerkezköy, Tekirdağ ve Trakya çıkışlı Balkan tur paketleri. Ön kayıt ve bilgi.',
  keywords:
    'balkan turları, balkan turları 2026, vizesiz balkan turu, belgrad turu, saraybosna turu, budva turu, dubrovnik turu, trakya çıkışlı balkan, çerkezköy yurtdışı tur, edirne balkan turu, bosna turu, karadağ turu',
  openGraph: {
    title: 'Balkan Turları 2026 | Büyük Aytaç Travel - Çerkezköy',
    description:
      'Vizesiz Balkan turları: Sırbistan, Bosna Hersek, Karadağ, Arnavutluk, Makedonya. Trakya çıkışlı rota avantajı.',
    url: 'https://www.buyukaytactravel.com/balkan-turlari',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Balkan Turları - Büyük Aytaç Travel',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/balkan-turlari',
  },
};

const faqItems = [
  {
    q: 'Balkan turları vizesiz mi?',
    a: 'Sırbistan, Bosna Hersek, Karadağ, Arnavutluk ve Kuzey Makedonya Türk vatandaşlarına vizesiz veya kapıda kolay giriş imkânı sunar. Güncel pasaport kuralları için tur öncesi bizimle iletişime geçin.',
  },
  {
    q: 'Çerkezköyden Balkan turuna nasıl gidilir?',
    a: 'Trakya konumunuz sayesinde Edirne ve Kapıkule hattı üzerinden Balkan sınırına ulaşım avantajlıdır. Programlarımızda Çerkezköy, Çorlu ve Tekirdağ transfer noktaları planlanır.',
  },
  {
    q: 'Balkan turu kaç gün sürer?',
    a: 'Günübirlik sınır turlarından 7–8 gün 6–9 ülke kapsayan konaklamalı paketlere kadar farklı süreler mevcuttur. Talebinize göre özel grup turu da düzenlenir.',
  },
  {
    q: 'Ne zaman Balkan turuna gidilmeli?',
    a: 'Nisan–Haziran ve Eylül–Ekim en ideal dönemlerdir. Yaz aylarında Budva ve Kotor deniz molası ile birleştirilebilir.',
  },
];

export default async function BalkanTurlariPage() {
  let tours: ITour[] = [];

  try {
    const allTours = await getToursByDB({ isActive: true });
    tours = allTours.filter(
      (tour) =>
        tour.tourType === 'international' ||
        /balkan|belgrad|saraybosna|mostar|budva|kotor|ohrid|üsküp|dubrovnik|bosna|karadağ|sırbistan/i.test(
          `${tour.name} ${tour.destination}`
        )
    );
  } catch {
    tours = [];
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': 'https://www.buyukaytactravel.com/balkan-turlari',
    name: 'Balkan Turları - Çerkezköy Çıkışlı',
    description:
      'Vizesiz Balkan turları: Belgrad, Saraybosna, Mostar, Budva, Kotor, Ohrid. Trakya çıkışlı yurtdışı tur paketleri.',
    provider: {
      '@type': 'TravelAgency',
      name: 'Büyük Aytaç Travel',
      url: 'https://www.buyukaytactravel.com',
    },
    touristType: 'International',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.buyukaytactravel.com' },
      { '@type': 'ListItem', position: 2, name: 'Turlar', item: 'https://www.buyukaytactravel.com/tours' },
      { '@type': 'ListItem', position: 3, name: 'Balkan Turları', item: 'https://www.buyukaytactravel.com/balkan-turlari' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-800/60 z-10" />
            <img
              src="/images/hero-banner.jpg"
              alt="Balkan Turları - Büyük Aytaç Travel Çerkezköy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Balkan Turları 2026</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Vizesiz rotalar · Trakya çıkışlı avantaj · Belgrad&apos;dan Ohrid&apos;e
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Balkan Turları Nedir?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div>
                <p className="mb-4">
                  <strong>Büyük Aytaç Travel</strong> olarak Çerkezköy, Çorlu, Kapaklı ve Tekirdağ&apos;dan
                  hareketle <strong>vizesiz Balkan turları</strong> düzenliyoruz. Sırbistan, Bosna Hersek,
                  Karadağ, Arnavutluk ve Kuzey Makedonya tek programda keşfedilebilir.
                </p>
                <p>
                  Trakya&apos;ya yakın konumunuz sayesinde Edirne üzerinden Balkan sınırına ulaşım, İstanbul
                  trafiğine kıyasla daha hızlı ve konforludur.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">Popüler Balkan Durakları</h3>
                <ul className="space-y-2 text-sm">
                  <li>🇷🇸 Belgrad — Kalemegdan, Sava &amp; Tuna</li>
                  <li>🇧🇦 Saraybosna &amp; Mostar — Başçarşı, Mostar Köprüsü</li>
                  <li>🇲🇪 Budva &amp; Kotor — Adriyatik kıyısı</li>
                  <li>🇲🇰 Ohrid &amp; Üsküp — göl manzarası</li>
                  <li>🇭🇷 Dubrovnik — tarihi surlar (programa göre)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {['Belgrad', 'Saraybosna', 'Mostar', 'Budva', 'Kotor', 'Ohrid', 'Üsküp'].map((city) => (
              <span
                key={city}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm"
              >
                {city}
              </span>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 md:p-8 text-white mb-8">
            <h2 className="text-xl font-bold mb-2">2026 Balkan Tur Programları</h2>
            <p className="text-blue-100 mb-4">
              Yeni Balkan tur tarihleri ve fiyatları için ön kayıt listesine eklenin. Kontenjanlar sınırlıdır.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Ön Kayıt &amp; Bilgi
              </Link>
              <Link
                href="/blog/balkan-turlari-2026-rehberi-vizesiz"
                className="inline-flex items-center border border-white/60 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Balkan Tur Rehberi
              </Link>
              <Link
                href="/tours?tourType=international"
                className="inline-flex items-center border border-white/60 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Yurtdışı Turlar
              </Link>
            </div>
          </div>

          {tours.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Güncel Balkan &amp; Yurtdışı Turları</h2>
              <ToursContent tours={tours} />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center mb-12">
              <p className="text-gray-600 mb-4">
                2026 Balkan tur tarihleri çok yakında duyurulacak. Ön kayıt yaptırarak kontenjan açıldığında
                haberdar olun.
              </p>
              <Link href="/contact" className="text-blue-600 font-medium hover:underline">
                İletişime geçin →
              </Link>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sık Sorulan Sorular</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.q} className="border-b border-gray-100 pb-4 last:border-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                  <p className="text-gray-600 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/cerkezkoy-tur" className="text-blue-600 hover:underline mr-4">
              Çerkezköy Turları
            </Link>
            <Link href="/populer-turlar" className="text-blue-600 hover:underline mr-4">
              Popüler Turlar
            </Link>
            <Link href="/blog" className="text-blue-600 hover:underline">
              Tur Blog
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
