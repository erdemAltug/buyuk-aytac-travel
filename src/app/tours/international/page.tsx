import Link from 'next/link';
import { getClientTours } from '@/lib/tours';
import { TourType } from '@/types/tour';
import TourCard from '@/components/tours/TourCard';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function InternationalToursPage() {
  const tours = await getClientTours({
    isActive: true,
    tourType: TourType.INTERNATIONAL,
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Yurtdışı Turlarımız</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Balkan ve Avrupa rotaları — Trakya / Çerkezköy çıkış avantajı
          </p>
        </div>

        {tours.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-gray-600">
              Güncel yurtdışı kontenjanlar için ön kayıt bırakabilirsiniz. Detaylı bilgi:{' '}
              <Link href="/balkan-turlari" className="font-medium text-blue-700 hover:underline">
                Balkan turları
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours.map((tour, index) => (
              <TourCard key={tour._id ?? tour.slug} tour={tour} priority={index < 4} />
            ))}
          </div>
        )}

        <TourSeoLinks variant="international" />
      </div>
    </main>
  );
}
