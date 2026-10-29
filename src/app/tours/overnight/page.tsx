import Link from 'next/link';
import { getClientTours } from '@/lib/tours';
import { AccommodationType } from '@/types/tour';
import TourListing from '@/components/tours/TourListing';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function OvernightToursPage() {
  const tours = await getClientTours({
    isActive: true,
    accommodationType: AccommodationType.WITH_ACCOMMODATION,
  });

  return (
    <TourListing
      tours={tours}
      category="overnight"
      eyebrow="Otel konaklamalı"
      title="Konaklamalı Turlar"
      description="Kapadokya'dan Karadeniz'e, otel ve rehberlik dahil çok günlü programlar. Çerkezköy çıkışlı, ulaşım derdi olmadan."
    >
      <div className="mt-10">
        <Link href="/cerkezkoy-konakamali-turlar" className="text-sm font-semibold text-brand-700 hover:underline">
          Çerkezköy konaklamalı tur rehberi →
        </Link>
      </div>
      <TourSeoLinks variant="overnight" />
    </TourListing>
  );
}
