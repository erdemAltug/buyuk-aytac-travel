'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ITour } from '@/types/tour';
import ReservationButton from './ReservationButton';
import { formatDateLong } from '@/lib/formatDate';

type FeaturedToursProps = {
  /** Sunucudan gelen ilk veri - Googlebot ve ilk açılışta içerik hemen görünür */
  initialTours?: ITour[];
};

export default function FeaturedTours({ initialTours = [] }: FeaturedToursProps) {
  const [tours, setTours] = useState<ITour[]>(initialTours);
  const [loading, setLoading] = useState(initialTours.length === 0);

  useEffect(() => {
    if (initialTours.length > 0) {
      setLoading(false);
      return;
    }
    async function fetchTours() {
      try {
        const response = await fetch('/api/tours?isActive=true&isFeatured=true&limit=10');
        if (response.ok) {
          const data = await response.json();
          const featuredTours = data.tours || data || [];
          
          // Eğer isFeatured turlar varsa onları göster, yoksa yaklaşan turları göster
          if (featuredTours.length > 0) {
            setTours(featuredTours.slice(0, 4));
          } else {
            // Yedek: Yaklaşan turları göster
            const allTours = data.tours || data || [];
            const now = new Date();
            const upcomingTours = allTours
              .filter((tour: ITour) => tour.startDate && new Date(tour.startDate) >= now)
              .sort((a: ITour, b: ITour) => {
                if (!a.startDate || !b.startDate) return 0;
                return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
              })
              .slice(0, 4);
            setTours(upcomingTours.length > 0 ? upcomingTours : allTours.slice(0, 4));
          }
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, [initialTours.length]);

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return '';
    return formatDateLong(dateString);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
  };

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg h-80"></div>
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
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Öne Çıkan Turlarımız
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            En yakın tarihlerde gerçekleşecek turlarımızı keşfedin. 
            {tours[0]?.startDate && (
              <span className="text-blue-600 font-medium">
                {' '}Bir sonraki tur: {formatDate(tours[0].startDate)}
              </span>
            )}
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour, index) => (
            <Link 
              href={`/tours/${tour.slug}`}
              key={tour.slug || tour._id?.toString()}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={tour.image || '/images/hero-banner.jpg'}
                  alt={tour.name}
                  fill
                  className="object-fill group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={index < 2}
                />
                {/* Date Badge */}
                {tour.startDate && (
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {formatDate(tour.startDate)}
                  </div>
                )}
                {/* Discount Badge */}
                {tour.discountRate && tour.discountRate > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    %{tour.discountRate} İndirim
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {tour.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {tour.destination}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    {tour.discountRate && tour.discountRate > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-500">
                          {formatPrice(tour.price * (1 - tour.discountRate / 100))}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(tour.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-blue-600">
                        {formatPrice(tour.price)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {tour.duration}
                  </span>
                </div>
                
                {/* Rezervasyon Butonu - Kartın altında */}
                <div className="mt-4 pt-3 border-t border-gray-100" onClick={(e) => e.preventDefault()}>
                  <ReservationButton 
                    tourName={tour.name} 
                    tourSlug={tour.slug}
                    variant="compact"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
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
