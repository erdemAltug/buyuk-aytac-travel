'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour, TourType } from '@/types/tour';
import TourCard from '@/components/tours/TourCard';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export default function InternationalToursPage() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours({ isActive: true });
        setTours(data.filter((tour) => tour.tourType === TourType.INTERNATIONAL));
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Turları yüklerken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600" />
          <p className="mt-2 text-gray-600">Turlar yükleniyor...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 pb-16 pt-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Yurtdışı Turlarımız</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

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
              <TourCard key={tour._id?.toString() ?? tour.slug} tour={tour} priority={index < 4} />
            ))}
          </div>
        )}

        <TourSeoLinks variant="international" />
      </div>
    </main>
  );
}
