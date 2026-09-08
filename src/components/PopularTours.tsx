'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import type { ITour } from '@/types/tour';
import TourCard from '@/components/tours/TourCard';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export default function PopularTours() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours({ isActive: true });
        setTours(data.slice(0, 12));
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Turlar yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Popüler Turlarımız</h2>
          <p className="text-lg text-gray-600">Yükleniyor...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Popüler Turlarımız</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Popüler Turlarımız</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Çerkezköy çıkışlı en çok tercih edilen tur programları
          </p>
        </div>

        {tours.length === 0 ? (
          <p className="text-center text-gray-600">Gösterilecek tur bulunmuyor.</p>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours.map((tour, index) => (
              <TourCard key={tour._id?.toString() ?? tour.slug} tour={tour} priority={index < 4} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/tours"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Tüm Turları Gör
          </Link>
        </div>

        <TourSeoLinks variant="all" />
      </div>
    </section>
  );
}
