import Link from 'next/link';
import { getClientTours } from '@/lib/tours';
import TourCard from '@/components/tours/TourCard';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function LastMinuteDealsPage() {
  const tours = await getClientTours({ isActive: true, isLastMinute: true });

  return (
    <main className="min-h-screen bg-gray-50 pb-16 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Son Dakika Fırsatları</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Kaçırılmayacak indirimli tur fırsatları. Kontenjanlar sınırlıdır.
          </p>
        </div>

        <div className="mb-8 flex items-center rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="mr-4 text-amber-500" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800">Acele Edin</h3>
            <p className="text-amber-700">Kontenjan dolmadan rezervasyonunuzu yapın.</p>
          </div>
        </div>

        {tours.length === 0 ? (
          <p className="py-12 text-center text-gray-600">
            Şu anda aktif son dakika fırsatı yok.{' '}
            <Link href="/tours" className="text-blue-700 hover:underline">
              Tüm turlara göz atın
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours.map((tour, index) => (
              <TourCard key={tour._id ?? tour.slug} tour={tour} priority={index < 4} />
            ))}
          </div>
        )}

        <TourSeoLinks variant="last-minute" />

        <div className="mt-10 flex flex-col justify-center gap-3 text-center sm:flex-row">
          <Link href="/contact" className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700">
            İletişime Geçin
          </Link>
          <Link href="/tours" className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-medium text-slate-800 hover:bg-slate-50">
            Tüm Turları İnceleyin
          </Link>
        </div>
      </div>
    </main>
  );
}
