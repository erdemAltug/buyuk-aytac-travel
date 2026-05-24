'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { ITour } from '@/types/tour';
import { formatDateLong } from '@/lib/formatDate';
import { filterUpcomingTours } from '@/lib/tourUpcoming';
import TourCard from './TourCard';

const TOUR_GRID_CLASS =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr';

type FeaturedToursProps = {
  initialTours?: ITour[];
};

export default function FeaturedTours({ initialTours = [] }: FeaturedToursProps) {
  const [tours, setTours] = useState<ITour[]>(() => filterUpcomingTours(initialTours).slice(0, 4));
  const [loading, setLoading] = useState(initialTours.length === 0);

  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await fetch('/api/tours?isActive=true&isFeatured=true&limit=20');
        if (!response.ok) return;

        const data = await response.json();
        const list: ITour[] = data.tours || data || [];
        setTours(filterUpcomingTours(list).slice(0, 4));
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return '';
    return formatDateLong(dateString);
  };

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8 mx-auto" />
            <div className={TOUR_GRID_CLASS}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-h-[420px] rounded-xl bg-white" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tours.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Öne Çıkan Turlarımız</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            En yakın tarihlerde gerçekleşecek turlarımızı keşfedin.
            {tours[0]?.startDate && (
              <span className="text-blue-600 font-medium">
                {' '}
                Bir sonraki tur: {formatDate(tours[0].startDate)}
              </span>
            )}
          </p>
        </div>

        <div className={TOUR_GRID_CLASS}>
          {tours.map((tour, index) => (
            <TourCard
              key={tour.slug || tour._id?.toString()}
              tour={tour}
              priority={index < 2}
              showWhatsApp={false}
              dateOnImage
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Tüm Turları Gör
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
