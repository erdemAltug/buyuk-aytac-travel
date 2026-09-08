'use client';

import TourCard from '@/components/tours/TourCard';
import type { ITour as ModelTour } from '@/models/Tour';
import type { ITour } from '@/types/tour';

export default function ToursContent({ tours }: { tours: ModelTour[] }) {
  if (tours.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-600">Bu kategoride gösterilecek tur bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tours.map((tour, index) => (
        <TourCard
          key={tour._id?.toString() ?? tour.slug}
          tour={tour as unknown as ITour}
          priority={index < 4}
          showWhatsApp
        />
      ))}
    </div>
  );
}
