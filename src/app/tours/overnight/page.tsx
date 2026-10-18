import Link from 'next/link';
import { getClientTours } from '@/lib/tours';
import { AccommodationType } from '@/types/tour';
import TourCard from '@/components/tours/TourCard';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function OvernightToursPage() {
  const tours = await getClientTours({
    isActive: true,
    accommodationType: AccommodationType.WITH_ACCOMMODATION,
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Konaklamalı Turlarımız</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Konforlu konaklama ile unutulmaz tatil deneyimleri — Çerkezköy çıkışlı
          </p>
        </div>

        {tours.length === 0 ? (
          <p className="py-12 text-center text-gray-600">Şu anda gösterilecek konaklamalı tur bulunmuyor.</p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours.map((tour, index) => (
              <TourCard key={tour._id ?? tour.slug} tour={tour} priority={index < 4} />
            ))}
          </div>
        )}

        <TourSeoLinks variant="overnight" />

        <div className="mt-10 text-center">
          <Link
            href="/cerkezkoy-konakamali-turlar"
            className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            Çerkezköy Konaklamalı Hub →
          </Link>
        </div>
      </div>
    </main>
  );
}
