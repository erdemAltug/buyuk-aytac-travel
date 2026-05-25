import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

const GOOGLE_PROFILE_URL =
  process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ||
  'https://share.google/TXmURBEsf6Xgq6tMN';

const AGGREGATE_RATING = 4.9;
const REVIEW_COUNT_LABEL = '300+';

const reviews = [
  {
    id: 1,
    name: 'Mehmet K.',
    date: '2 hafta önce',
    rating: 5,
    text: 'Kapadokya turumuz harikaydı. Çerkezköy\'den kalkış çok rahattı, rehberimiz ilgiliydi. Kesinlikle tekrar tercih edeceğiz.',
  },
  {
    id: 2,
    name: 'Ayşe D.',
    date: '1 ay önce',
    rating: 5,
    text: 'İlk yurtdışı tur deneyimimizdi, her şey planlandığı gibiydi. Fiyat-performans çok iyi, ekibe teşekkürler.',
  },
  {
    id: 3,
    name: 'Osman Y.',
    date: '1 ay önce',
    rating: 5,
    text: 'Günübirlik İstanbul turuna ailecek katıldık. Otobüs konforlu, program dolu dolu geçti. Çocuklar çok mutlu döndü.',
  },
  {
    id: 4,
    name: 'Fatma Ö.',
    date: '2 ay önce',
    rating: 5,
    text: 'Pamukkale turunda otel ve yemekler beklentimizin üzerindeydi. TÜRSAB üyesi olmaları güven verdi.',
  },
  {
    id: 5,
    name: 'Serkan A.',
    date: '2 ay önce',
    rating: 5,
    text: 'Safranbolu turu için rezervasyon süreci hızlıydı. WhatsApp üzerinden anında dönüş aldık, profesyonel ekip.',
  },
  {
    id: 6,
    name: 'Elif T.',
    date: '3 ay önce',
    rating: 4,
    text: 'Karadeniz turu çok güzeldi. Manzaralar muhteşem, tek küçük not kalkış saatinin biraz erken olmasıydı.',
  },
];

function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} yıldız`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}
        />
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function GoogleReviews() {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Büyük Aytaç Travel',
    url: 'https://www.buyukaytactravel.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(AGGREGATE_RATING),
      bestRating: '5',
      reviewCount: REVIEW_COUNT_LABEL.replace(/\D/g, '') || '300',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      datePublished: r.date,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
  };

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GoogleGIcon className="w-8 h-8" />
              <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Google Yorumları
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="mt-2 text-lg text-slate-600 max-w-2xl">
              Çerkezköy ve çevresinden binlerce misafirimiz Google üzerinden deneyimlerini
              paylaşıyor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50 rounded-2xl px-6 py-4 border border-slate-100 shrink-0">
            <div>
              <p className="text-4xl font-bold text-slate-900 leading-none">
                {AGGREGATE_RATING}
              </p>
              <Stars rating={5} />
              <p className="text-sm text-slate-500 mt-1">{REVIEW_COUNT_LABEL} Google yorumu</p>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <GoogleGIcon className="w-5 h-5" />
                Tüm yorumları gör
              </a>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Google&apos;da yorum yaz
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0"
                  aria-hidden
                >
                  {initials(review.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900 truncate">{review.name}</p>
                    <GoogleGIcon className="w-4 h-4 shrink-0 opacity-80" />
                  </div>
                  <p className="text-xs text-slate-500">{review.date}</p>
                </div>
              </div>
              <Stars rating={review.rating} />
              <p className="mt-3 text-sm text-slate-700 leading-relaxed line-clamp-4">
                {review.text}
              </p>
            </article>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-slate-500">
          Yorumlar Google İşletme Profilimizden derlenmiştir.{' '}
          <Link
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline"
          >
            Büyük Aytaç Travel Google profili
          </Link>
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
    </section>
  );
}
