import Link from 'next/link';
import { getClientTours } from '@/lib/tours';
import { AccommodationType } from '@/types/tour';
import TourCard from '@/components/tours/TourCard';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function DailyToursPage() {
  const tours = await getClientTours({
    isActive: true,
    accommodationType: AccommodationType.DAILY,
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Günübirlik Turlarımız</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Tek günde unutulmaz deneyimler — Çerkezköy, Çorlu ve Tekirdağ çıkışlı
          </p>
        </div>

        {tours.length === 0 ? (
          <p className="py-12 text-center text-gray-600">Şu anda gösterilecek günübirlik tur bulunmuyor.</p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours.map((tour, index) => (
              <TourCard key={tour._id ?? tour.slug} tour={tour} priority={index < 4} />
            ))}
          </div>
        )}

        <TourSeoLinks variant="daily" />

        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
          <h2 className="mb-3 text-2xl font-semibold text-emerald-900">Günübirlik Avantajları</h2>
          <ul className="space-y-2 text-emerald-800">
            <li>Kısa sürede yeni yerler keşfetme</li>
            <li>Konaklama endişesi olmadan rahat seyahat</li>
            <li>Hafta sonu kaçamakları için ideal</li>
          </ul>
          <div className="mt-6">
            <Link
              href="/cerkezkoy-gunubirlik-turlar"
              className="inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
            >
              Çerkezköy Günübirlik Hub →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
