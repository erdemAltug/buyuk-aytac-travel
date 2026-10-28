import Image from 'next/image';
import Link from 'next/link';
import { notFound, unstable_rethrow } from 'next/navigation';
import { ITour } from '@/models/Tour';
import PriceCalculator from '@/components/PriceCalculator';
import Breadcrumb from '@/components/Breadcrumb';
import ReservationButton from '@/components/ReservationButton';
import FavoriteButton from '@/components/FavoriteButton';
import TourReviews from '@/components/tours/TourReviews';
import TourCard, { WhatsAppIcon } from '@/components/tours/TourCard';
import MobileBookingBar from '@/components/tours/MobileBookingBar';
import ShareButtons from '@/components/tours/ShareButtons';
import RecentlyViewed, { TrackTourView } from '@/components/RecentlyViewed';
import { getRelatedTours } from '@/lib/homeData';
import { daysUntil, finalPrice, formatDateRange, formatTL, isUpcoming, tourWhatsappLink } from '@/lib/tourUi';

// Tur sayfaları için Server Component kullanımı
export async function generateStaticParams() {
  try {
    // API yerine doğrudan veritabanından çeken fonksiyonu kullan
    // lib içindeki fonksiyonları import edip kullanabiliriz
    const { getToursByDB } = await import('@/lib/tours');
    const tours = await getToursByDB({ isActive: true });
    
    // Her tur için slug parametresi oluştur
    return tours.map((tour: ITour) => ({
      slug: tour.slug,
    }));
  } catch (error) {
    console.error('Static params generation error:', error);
    return [];
  }
}

// Sayfanın yeniden doğrulanma süresi (saniye cinsinden)
export const revalidate = 3600; // Her saat başı yeniden doğrula

// Server-side rendering için async fonksiyon olarak tanımla
export default async function TourDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let tour: ITour | null = null;
  let error = '';
  
  try {
    // API yerine doğrudan veritabanından çeken yaklaşımı kullan
    await import('@/lib/dbConnect').then((module) => module.default());
    const Tour = (await import('@/models/Tour')).default;

    const doc = await Tour.findOne({ slug, isActive: true }).lean();

    // İstemci bileşenlerine (PriceCalculator vb.) yalnızca düz veri geçebilir:
    // program/additionalServices içindeki alt belge _id'leri (ObjectId) JSON ile string'e çevrilir.
    tour = doc ? (JSON.parse(JSON.stringify(doc)) as ITour) : null;
    if (tour) {
      
      // Date nesnelerini formatlı şekilde çevir
      if (tour.createdAt) tour.createdAt = new Date(tour.createdAt);
      if (tour.updatedAt) tour.updatedAt = new Date(tour.updatedAt);
      if (tour.startDate) tour.startDate = new Date(tour.startDate);
      if (tour.endDate) tour.endDate = new Date(tour.endDate);
    }
  } catch (err) {
    console.error('Tur detayı getirme hatası:', err);
    error = 'Tur detayı yüklenirken bir hata oluştu.';
  }

  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tur Detayı</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!tour) {
    notFound();
  }

  // Tur sayfası için schema.org yapılandırılmış veri
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    'name': tour.name,
    'description': tour.description,
    'image': tour.image,
    'touristType': tour.tourType === 'domestic' ? 'Domestic' : 'International',
    'offers': {
      '@type': 'Offer',
      'price': tour.discountRate ? Math.round(tour.price * (1 - tour.discountRate / 100)) : tour.price,
      'priceCurrency': 'TRY'
    },
    'location': {
      '@type': 'Place',
      'name': tour.destination,
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': tour.tourType === 'domestic' ? 'TR' : ''
      }
    },
    'itinerary': {
      '@type': 'ItemList',
      'itemListElement': tour.program && tour.program.length > 0 ? 
        tour.program.map((day, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@type': 'TouristAttraction',
            'name': day.title,
            'description': day.description
          }
        })) : []
    },
    'provider': {
      '@type': 'Organization',
      'name': 'Büyük Aytaç Travel',
      'url': 'https://www.buyukaytactravel.com'
    }
  };

  const price = finalPrice(tour);
  const hasDiscount = !!tour.discountRate && tour.discountRate > 0;
  const dateLabel = formatDateRange(tour.startDate, tour.endDate);
  const upcoming = isUpcoming(tour);
  const days = upcoming ? daysUntil(tour.startDate) : null;
  const tourUrl = `https://www.buyukaytactravel.com/tours/${tour.slug}`;
  const typeLabel = tour.tourType === 'domestic' ? 'Yurtiçi' : 'Yurtdışı';
  const stayLabel = tour.accommodationType === 'with_accommodation' ? 'Konaklamalı' : 'Günübirlik';
  const related = await getRelatedTours({
    slug: tour.slug,
    accommodationType: tour.accommodationType,
    tourType: tour.tourType,
  }).catch(() => []);

  const facts = [
    { label: 'Tarih', value: dateLabel ?? 'Tarih için sorun' },
    { label: 'Süre', value: tour.duration },
    { label: 'Kalkış', value: tour.departureCity || 'Çerkezköy' },
    { label: 'Tur tipi', value: `${typeLabel} · ${stayLabel}` },
  ];

  const faqs = [
    {
      q: 'Bu tura nasıl kayıt olabilirim?',
      a: 'Bu sayfadaki "Rezervasyon" butonuyla formu doldurabilir, 0530 060 95 59 veya 0539 345 95 59 numaralı telefondan bize ulaşabilir ya da Çerkezköy ofisimizi ziyaret edebilirsiniz. Ödeme işlemini tamamladıktan sonra rezervasyonunuz onaylanmış olur.',
    },
    {
      q: 'Tur iptal edilirse ücret iadesi yapılıyor mu?',
      a: 'İptal ve iade koşulları tura ve rezervasyon tarihine göre değişiklik gösterebilir. Güncel bilgi için ofisimizle iletişime geçiniz.',
    },
    {
      q: 'Bu tur için yanımıza neler almalıyız?',
      a: 'Rahat yürüyüş ayakkabıları, mevsime uygun kıyafetler, şapka, güneş gözlüğü, güneş kremi, fotoğraf makinesi, şarj aletleri ve kişisel ilaçlarınızı yanınıza almanızı öneririz. Konaklamalı turlarda yeterli kıyafet ve kişisel bakım ürünlerinizi getirmeyi unutmayın.',
    },
    {
      q: `${tour.destination.split(',')[0]} için en uygun seyahat zamanı ne zamandır?`,
      a: 'Genellikle ilkbahar (Nisan-Mayıs) ve sonbahar (Eylül-Ekim) ayları idealdir. Bu dönemlerde hava gezmeye elverişlidir ve yoğunluk yaz aylarına göre daha azdır.',
    },
    {
      q: 'Çocuklar için indirim var mı?',
      a: 'Çocuk indirimleri tura ve yaşa göre değişiklik gösterebilir. Güncel bilgi için ofisimizle iletişime geçiniz.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <TrackTourView
        tour={{
          slug: tour.slug,
          name: tour.name,
          image: tour.image,
          price,
          startDate: tour.startDate ? new Date(tour.startDate).toISOString() : undefined,
          endDate: tour.endDate ? new Date(tour.endDate).toISOString() : undefined,
        }}
      />

      <main className="min-h-screen bg-sand-50 pb-16">
        {/* Başlık bandı */}
        <section className="relative overflow-hidden bg-brand-950 pb-28 pt-28 text-white sm:pt-32">
          <div className="absolute inset-0 opacity-40">
            <Image src={tour.image} alt="" aria-hidden fill sizes="100vw" quality={30} className="scale-110 object-cover blur-3xl" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 to-brand-950" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb
              customItems={[
                { name: 'Ana Sayfa', href: '/' },
                { name: 'Turlar', href: '/tours' },
                { name: tour.tourType === 'domestic' ? 'Yurtiçi Turları' : 'Yurtdışı Turları',
                  href: tour.tourType === 'domestic' ? '/tours?tourType=domestic' : '/tours?tourType=international' },
                { name: tour.name, href: `/tours/${tour.slug}` },
              ]}
              tone="dark"
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {days !== null && (
                <span className="rounded-full bg-sunset-600 px-3 py-1 text-xs font-bold">
                  {days === 0 ? 'Bugün yola çıkıyor' : `Kalkışa ${days} gün`}
                </span>
              )}
              {!upcoming && tour.startDate && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  Bu tarih geçti · benzer tarihler için sorun
                </span>
              )}
              {hasDiscount && (
                <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold">%{tour.discountRate} indirim</span>
              )}
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">{stayLabel}</span>
            </div>
            <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight sm:text-5xl">{tour.name}</h1>
            <p className="mt-3 max-w-3xl text-white/75">{tour.destination}</p>
          </div>
        </section>

        <div className="relative mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* Sol kolon */}
            <div className="min-w-0 space-y-6">
              <div className="overflow-hidden rounded-3xl bg-brand-950 shadow-xl ring-1 ring-black/5">
                <div className="relative aspect-[4/5] w-full sm:aspect-[16/11]">
                  <Image src={tour.image} alt="" aria-hidden fill sizes="(max-width: 1024px) 100vw, 60vw" quality={30} className="scale-110 object-cover opacity-50 blur-2xl" />
                  <Image
                    src={tour.image}
                    alt={`${tour.name} - ${tour.destination} - ${tour.duration} - Büyük Aytaç Travel Turu`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    quality={85}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {facts.map((f) => (
                  <div key={f.label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200/70">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{f.label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{f.value}</p>
                  </div>
                ))}
              </div>

              <ShareButtons title={tour.name} url={tourUrl} />

              <nav className="no-scrollbar sticky top-20 z-20 -mx-4 flex gap-1 overflow-x-auto bg-sand-50/90 px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-2xl sm:bg-white sm:px-2 sm:ring-1 sm:ring-slate-200/70">
                {[
                  ['#description', 'Tur hakkında'],
                  ['#program', 'Program'],
                  ['#services', 'Dahil olanlar'],
                  ['#reviews', 'Yorumlar'],
                  ['#faq', 'Sorular'],
                ].map(([href, label]) => (
                  <a key={href} href={href} className="shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                    {label}
                  </a>
                ))}
              </nav>

              <section id="description" className="scroll-mt-36 rounded-3xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-slate-900">Tur hakkında</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-slate-700">
                  {tour.description.split('\n').filter((p) => p.trim()).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section id="program" className="scroll-mt-36 rounded-3xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-slate-900">Program</h2>
                {tour.program && tour.program.length > 0 ? (
                  <ol className="relative mt-6 space-y-8 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-0.5 before:bg-brand-100">
                    {tour.program.map((day, index) => (
                      <li key={index} className="relative flex gap-5">
                        <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 font-display text-sm font-bold text-white ring-4 ring-white">
                          {index + 1}
                        </span>
                        <div className="min-w-0 pt-1.5">
                          <p className="text-xs font-semibold uppercase tracking-wider text-sunset-600">{day.day}</p>
                          <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">{day.title}</h3>
                          <p className="mt-2 leading-relaxed text-slate-600">{day.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-4 text-slate-600">
                    Bu tur için detaylı program henüz eklenmedi. Bilgi almak için WhatsApp&apos;tan yazabilirsiniz.
                  </p>
                )}
              </section>

              <section id="services" className="scroll-mt-36 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200/70">
                  <h2 className="font-display text-lg font-bold text-slate-900">Fiyata dahil</h2>
                  {tour.includedServices && tour.includedServices.length > 0 ? (
                    <ul className="mt-4 space-y-3">
                      {tour.includedServices.map((service, index) => (
                        <li key={index} className="flex gap-3 text-sm text-slate-700">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">✓</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500">Henüz listelenmedi.</p>
                  )}
                </div>
                <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200/70">
                  <h2 className="font-display text-lg font-bold text-slate-900">Fiyata dahil değil</h2>
                  {tour.excludedServices && tour.excludedServices.length > 0 ? (
                    <ul className="mt-4 space-y-3">
                      {tour.excludedServices.map((service, index) => (
                        <li key={index} className="flex gap-3 text-sm text-slate-700">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">–</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500">Henüz listelenmedi.</p>
                  )}
                </div>
              </section>

              <div id="reviews" className="scroll-mt-36">
                <TourReviews tourId={String(tour._id)} tourSlug={tour.slug} />
              </div>

              <section id="faq" className="scroll-mt-36 rounded-3xl bg-white p-6 ring-1 ring-slate-200/70 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-slate-900">Sık sorulan sorular</h2>
                <div className="mt-4 divide-y divide-slate-100">
                  {faqs.map((f) => (
                    <details key={f.q} className="group py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                        {f.q}
                        <span className="text-xl text-slate-400 transition group-open:rotate-45" aria-hidden>+</span>
                      </summary>
                      <p className="mt-3 text-slate-600">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Sağ kolon — rezervasyon kartı (masaüstünde sabit) */}
            <aside className="max-lg:hidden">
              <div className="sticky top-24 space-y-4">
                <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200/70">
                  <div className="p-6">
                    <p className="text-sm text-slate-500">Kişi başı</p>
                    <p className="mt-1 flex items-baseline gap-2">
                      <span className="font-display text-4xl font-bold text-slate-900">{formatTL(price)}</span>
                      {hasDiscount && <span className="text-lg text-slate-400 line-through">{formatTL(tour.price)}</span>}
                    </p>
                    {dateLabel && (
                      <div className="mt-4 flex items-center justify-between rounded-2xl bg-sand-50 px-4 py-3 text-sm">
                        <span className="text-slate-500">Tarih</span>
                        <span className="font-semibold text-slate-900">{dateLabel}</span>
                      </div>
                    )}
                    <div className="mt-4">
                      <PriceCalculator tour={tour} />
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <div className="min-w-0 flex-1">
                        <ReservationButton tourName={tour.name} tourSlug={tour.slug} />
                      </div>
                      <FavoriteButton tourId={String(tour._id)} tourSlug={tour.slug} />
                    </div>
                    <a
                      href={tourWhatsappLink(tour)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-50 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100"
                    >
                      <WhatsAppIcon className="h-5 w-5" /> WhatsApp&apos;tan sor
                    </a>
                  </div>
                  <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-xs text-slate-500">
                    TÜRSAB 17674 belgeli acente · Rezervasyon talebiniz ücretsizdir, ekibimiz sizi arar.
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <div className="mb-6 flex items-end justify-between">
                <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Bunlar da ilgini çekebilir</h2>
                <Link href="/tours" className="text-sm font-semibold text-brand-700">Tüm turlar →</Link>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((t) => (
                  <TourCard key={t.slug} tour={t} />
                ))}
              </div>
            </section>
          )}
        </div>

        <RecentlyViewed excludeSlug={tour.slug} />
      </main>

      <MobileBookingBar
        name={tour.name}
        slug={tour.slug}
        price={price}
        oldPrice={hasDiscount ? tour.price : undefined}
        dateLabel={dateLabel}
      />
    </>
  );
}

// Tur sayfaları için metadata oluşturma
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    // API yerine doğrudan veritabanından çeken yaklaşımı kullan
    await import('@/lib/dbConnect').then((module) => module.default());
    const Tour = (await import('@/models/Tour')).default;

    const tour = await Tour.findOne({ slug, isActive: true }).lean();

    if (!tour) {
      notFound();
    }

    const title = `${tour.name} | ${tour.destination} | Çerkezköy Tur`;
    const socialTitle = `${title} | Büyük Aytaç Travel`;
    
    // Açıklama tur açıklamasından oluşturulur (kısa tutmak için)
    const description = tour.description.length > 160 
      ? `${tour.description.substring(0, 157)}...` 
      : tour.description;
      
    // Tur tipine ve özelliklerine göre anahtar kelimeleri ayarla - Çerkezköy odaklı
    const keywordString = `${tour.name}, ${tour.destination}, çerkezköy tur, çerkezköy'den tur, ${tour.duration}, ${tour.price} TL, ${tour.accommodationType === 'with_accommodation' ? 'konaklamalı tur' : 'günübirlik gezi'}, ${tour.tourType === 'domestic' ? 'yurtiçi tur' : 'yurtdışı tur'}, trakya turları, büyük aytaç travel`;

    const { toAbsoluteUrl, SITE_URL } = await import('@/lib/seo');
    const ogImage = toAbsoluteUrl(tour.image);
    const canonical = `${SITE_URL}/tours/${tour.slug}`;
    
    return {
      title,
      description,
      keywords: keywordString,
      alternates: { canonical },
      openGraph: {
        title: socialTitle,
        description,
        type: 'article',
        publishedTime: tour.createdAt?.toString(),
        modifiedTime: tour.updatedAt?.toString(),
        url: canonical,
        images: [{ url: ogImage, width: 1200, height: 630, alt: tour.name }],
      },
      twitter: {
        card: 'summary_large_image',
        title: socialTitle,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    unstable_rethrow(error);
    console.error('Metadata generation error:', error);
    return {
      title: 'Tur Detayı',
      description: 'Büyük Aytaç Travel ile unutulmaz tur deneyimleri yaşayın',
    };
  }
} 