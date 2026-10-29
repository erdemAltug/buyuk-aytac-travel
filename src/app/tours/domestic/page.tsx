import { getClientTours } from '@/lib/tours';
import { TourType } from '@/types/tour';
import TourListing from '@/components/tours/TourListing';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function DomesticToursPage() {
  const tours = await getClientTours({
    isActive: true,
    tourType: TourType.DOMESTIC,
  });

  return (
    <TourListing
      tours={tours}
      category="domestic"
      eyebrow="Türkiye rotaları"
      title="Yurtiçi Turlar"
      description="Türkiye'nin dört bir yanına Çerkezköy çıkışlı günübirlik ve konaklamalı turlar."
    >
      <TourSeoLinks variant="domestic" />
    </TourListing>
  );
}
