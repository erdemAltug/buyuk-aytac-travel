import Link from 'next/link';
import { getClientTours } from '@/lib/tours';
import { TourType } from '@/types/tour';
import TourCard from '@/components/tours/TourCard';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function DomesticToursPage() {
  const tours = await getClientTours({
    isActive: true,
    tourType: TourType.DOMESTIC,
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Yurtiçi Turlarımız</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Türkiye&apos;nin güzelliklerini keşfedeceğiniz Çerkezköy çıkışlı yurtiçi turlarımız
          </p>
        </div>

        {tours.length === 0 ? (
          <p className="py-12 text-center text-gray-600">Şu anda gösterilecek yurtiçi tur bulunmuyor.</p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours.map((tour, index) => (
              <TourCard key={tour._id ?? tour.slug} tour={tour} priority={index < 4} />
            ))}
          </div>
        )}

        <TourSeoLinks variant="domestic" />

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="mb-3 text-2xl font-semibold text-gray-900">Özel Turlar</h2>
          <p className="mb-6 text-gray-600">
            İstediğiniz tarihlerde ve lokasyonlarda grubunuza özel program düzenleyebiliriz.
          </p>
          <Link
            href="/group-tour"
            className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
          >
            Özel Grup Turu
          </Link>
        </div>
      </div>
    </main>
  );
}
