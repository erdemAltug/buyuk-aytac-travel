'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import type { ITour } from '@/types/tour';
import { TourType, AccommodationType } from '@/types/tour';
import TourCard from './TourCard';

const TOUR_GRID_CLASS =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr';

interface ToursByTypeProps {
  title: string;
  description: string;
  viewAllLink: string;
  viewAllText: string;
  filterParams: {
    isActive?: boolean;
    tourType?: TourType;
    accommodationType?: AccommodationType;
  };
}

export default function ToursByType({
  title,
  description,
  viewAllLink,
  viewAllText,
  filterParams,
}: ToursByTypeProps) {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await getTours(filterParams);
        const now = new Date();
        const sortedData = data.sort((a, b) => {
          if (a.startDate && b.startDate) {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            const isPastA = dateA < now;
            const isPastB = dateB < now;
            if (isPastA && !isPastB) return 1;
            if (!isPastA && isPastB) return -1;
            return dateA.getTime() - dateB.getTime();
          }
          if (a.startDate && !b.startDate) {
            const dateA = new Date(a.startDate);
            return dateA < now ? 1 : -1;
          }
          if (!a.startDate && b.startDate) {
            const dateB = new Date(b.startDate);
            return dateB < now ? -1 : 1;
          }
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        setTours(sortedData.slice(0, 12));
        setLoading(false);
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Turlar yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchTours();
  }, [filterParams]);

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Yükleniyor...</p>
          </div>
          <div className={TOUR_GRID_CLASS}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl bg-white shadow-md animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="mt-auto h-10 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!tours || tours.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className={TOUR_GRID_CLASS}>
          {tours.map((tour, index) => (
            <TourCard key={tour._id?.toString() ?? tour.slug} tour={tour} priority={index < 4} showWhatsApp />
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href={viewAllLink}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-sm sm:text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            {viewAllText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
