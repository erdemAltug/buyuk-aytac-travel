import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';

// SEO metadata - Optimized for "çerkezköy tur" keyword
export const metadata: Metadata = {
  title: 'Çerkezköy Tur | En Uygun Fiyatlarla Günübirlik ve Konaklamalı Turlar 2026 | Büyük Aytaç Travel',
  description: 'Çerkezköy tur fırsatları! Günübirlik turlar, konaklamalı tatil paketleri, hafta sonu kaçamakları. İstanbul, Bursa, Kapadokya, Karadeniz ve daha birçok destinasyon. Çerkezköy, Çorlu ve Tekirdağdan kalkan turlar. Hemen rezervasyon yapın!',
  keywords: 'çerkezköy tur, çerkezköy tur fiyatları, çerkezköy turlar, çerkezköy tur şirketi, çerkezköy tur operatörü, çerkezköy günübirlik tur, çerkezköy konaklamalı tur, çerkezköy hafta sonu turu, çerkezköy tatil, çorlu tur, tekirdag tur, trakya tur, 2026 çerkezköy turları',
  openGraph: {
    title: 'Çerkezköy Tur | Büyük Aytaç Travel - Çerkezköy nün Tur Operatörü',
    description: 'Çerkezköyden kalkan en uygun fiyatlı turlar. Günübirlik ve konaklamalı seçenekler.',
    url: 'https://www.buyukaytactravel.com/cerkezkoy-tur',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/cerkezkoy-tur',
  },
};

// Hero section data
const heroData = {
  title: 'Çerkezköy Tur Fırsatları',
  subtitle: 'Çerkezköy, Çorlu ve Tekirdağdan kalkan en uygun fiyatlı turlar',
  cta: 'Turları İncele',
};

// Tour categories
const tourCategories = [
  {
    id: 'gunubirlik',
    title: 'Günübirlik Turlar',
    description: 'Bir günlük şehir turları ve hafta sonu kaçamakları',
    emoji: '☀️',
    link: '/cerkezkoy-gunubirlik-turlar',
    features: ['İstanbul, Bursa, Safranbolu', 'Hafta sonu kaçamakları', 'Uygun fiyat', 'Profesyonel rehber'],
    price: '1.400 TL\'den başlayan',
  },
  {
    id: 'konaklamali',
    title: 'Konaklamalı Turlar',
    description: '2-7 günlük tatil paketleriyle unutulmaz deneyimler',
    emoji: '🏨',
    link: '/cerkezkoy-konakamali-turlar',
    features: ['Kapadokya, Karadeniz, Ege', 'Her şey dahil seçenekler', 'Konforlu ulaşım', 'Deneyimli rehber'],
    price: '3.500 TL\'den başlayan',
  },
];

// Featured tours from Çerkezköy
const featuredTours = [
  {
    id: 'kapadokya',
    title: 'Kapadokya Turu',
    description: 'Balon turu, peri bacaları ve kaya oteller - 3 gün 2 gece',
    price: '4.500 TL',
    duration: '3 gün 2 gece',
    image: '/images/kapadokya.jpeg',
    slug: 'kapadokya-turu',
    highlights: ['Balon turu', 'Peri bacaları', 'Kaya otel', 'Yeraltı şehri'],
    isPopular: true,
  },
  {
    id: 'karadeniz',
    title: 'Karadeniz Turu',
    description: 'Trabzon, Rize, Ayder yaylası - 5 gün 4 gece',
    price: '6.900 TL',
    duration: '5 gün 4 gece',
    image: '/images/karadeniz-turu.jpeg',
    slug: 'karadeniz-turu',
    highlights: ['Ayder Yaylası', 'Uzungöl', 'Trabzon', 'Safranbolu'],
    isPopular: true,
  },
  {
    id: 'istanbul',
    title: 'İstanbul Günübirlik',
    description: 'Sultanahmet, Kapalıçarşı, Boğaz turu - 1 gün',
    price: '1.500 TL',
    duration: '1 gün',
    image: '/images/istanbul-lale.jpeg',
    slug: 'istanbul-turu',
    highlights: ['Sultanahmet', 'Aya Sofya', 'Kapalıçarşı', 'Boğaz turu'],
    isPopular: true,
  },
  {
    id: 'bursa',
    title: 'Bursa Günübirlik',
    description: 'Uludağ teleferik, Cumalıkızık - 1 gün',
    price: '1.800 TL',
    duration: '1 gün',
    image: '/images/bursa-19-ekim.jpeg',
    slug: 'bursa-turu',
    highlights: ['Uludağ Teleferik', 'Cumalıkızık', 'Koza Han', 'Ulubatlı Hasan'],
  },
  {
    id: 'gap',
    title: 'GAP Turu',
    description: 'Gaziantep, Şanlıurfa, Mardin - 4 gün 3 gece',
    price: '5.900 TL',
    duration: '4 gün 3 gece',
    image: '/images/gap-turu.jpeg',
    slug: 'gap-turu',
    highlights: ['Gaziantep kebap', 'Şanlıurfa', 'Mardin', 'Nemrut Dağı'],
  },
  {
    id: 'eskisehir',
    title: 'Eskişehir Günübirlik',
    description: 'Odunpazarı, Sazova Parkı - 1 gün',
    price: '1.400 TL',
    duration: '1 gün',
    image: '/images/eskisehir-15-temmuz.jpeg',
    slug: 'eskisehir-turu',
    highlights: ['Odunpazarı', 'Sazova Parkı', 'Bilim Kurdu', 'Kent Park'],
  },
];

// Why choose us
const whyChooseUs = [
  {
    title: '20+ Yıllık Tecrübe',
    description: 'Çerkezköyde turizm sektöründe uzun yılların deneyimi',
    emoji: '⭐',
  },
  {
    title: 'TÜRSAB Üyesi',
    description: 'Güvenilir ve profesyonel turizm hizmeti',
    emoji: '🏆',
  },
  {
    title: 'Uygun Fiyat Garantisi',
    description: 'En uygun fiyatlarla kaliteli tur deneyimi',
    emoji: '💰',
  },
  {
    title: '7/24 Destek',
    description: 'Rezervasyon ve tur sürecinde sürekli iletişim',
    emoji: '📞',
  },
];

// FAQ data for schema
const faqData = [
  {
    question: 'Çerkezköyden hangi turlar düzenleniyor?',
    answer: 'Çerkezköy, Çorlu ve Tekirdağdan İstanbul, Bursa, Safranbolu, Eskişehir günübirlik turları ve Kapadokya, Karadeniz, GAP, Ege gibi konaklamalı turlar düzenliyoruz.',
  },
  {
    question: 'Çerkezköy tur fiyatları ne kadar?',
    answer: 'Günübirlik turlar 1.400 TLden, konaklamalı turlar 3.500 TLden başlamaktadır. Sezona ve tura göre fiyatlar değişiklik gösterebilir.',
  },
  {
    question: 'Çerkezköyden tur kaçta kalkıyor?',
    answer: 'Turlarımız genellikle sabah 06:00-08:00 arasında Çerkezköy merkezden kalkan otobüslerle başlamaktadır. Kesin saatler tur sayfasında belirtilir.',
  },
];

export default function CerkezkoyTurPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb
        customItems={[
          { name: 'Ana Sayfa', href: 'https://www.buyukaytactravel.com' },
          { name: 'Çerkezköy Tur', href: 'https://www.buyukaytactravel.com/cerkezkoy-tur' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {heroData.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {heroData.subtitle}
            </p>
            <Link
              href="#turlar"
              className="inline-block bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              {heroData.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Tour Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Çerkezköyden Tur Seçenekleri
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tourCategories.map((category) => (
              <div
                key={category.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{category.emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <ul className="space-y-2 mb-6">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">{category.price}</span>
                  <Link
                    href={category.link}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    İncele →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section id="turlar" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Çerkezköyden En Popüler Turlar
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Çerkezköy, Çorlu ve Tekirdağdan kalkan turlarımızla unutulmaz tatil deneyimi yaşayın.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                  />
                  {tour.isPopular && (
                    <span className="absolute top-4 left-4 bg-yellow-500 text-blue-900 text-sm font-bold px-3 py-1 rounded-full">
                      Popüler
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{tour.title}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights.slice(0, 3).map((highlight, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{tour.price}</span>
                      <span className="text-gray-500 text-sm ml-2">/kişi</span>
                    </div>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Detay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/tours"
              className="inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Tüm Turları Gör →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Çerkezköyden Neden Bizimle Tur?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Çerkezköy Tur Rezervasyonu Yapın
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Hemen arayın veya WhatsApp üzerinden iletişime geçin. Size özel tur teklifi sunalım!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+905393459559"
              className="bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-400 transition-colors inline-flex items-center justify-center"
            >
              📞 Ara: +90 532 123 45 67
            </a>
            <Link
              href="/contact"
              className="bg-white text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              İletişim →
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Çerkezköy Tur | Büyük Aytaç Travel",
            "description": "Çerkezköy, Çorlu ve Tekirdağdan kalkan en uygun fiyatlı günübirlik ve konaklamalı turlar.",
            "url": "https://www.buyukaytactravel.com/cerkezkoy-tur",
            "mainEntity": {
              "@type": "TravelAgency",
              "name": "Büyük Aytaç Travel",
              "description": "Çerkezköy merkezli tur operatörü",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Çerkezköy",
                "addressRegion": "Tekirdağ"
              }
            }
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }),
        }}
      />
    </div>
  );
}
