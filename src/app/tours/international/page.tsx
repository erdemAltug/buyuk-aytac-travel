import Link from 'next/link';
import { getClientTours } from '@/lib/tours';
import { TourType } from '@/types/tour';
import TourListing from '@/components/tours/TourListing';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function InternationalToursPage() {
  const tours = await getClientTours({
    isActive: true,
    tourType: TourType.INTERNATIONAL,
  });

  return (
    <TourListing
      tours={tours}
      category="international"
      eyebrow="Balkanlar ve Avrupa"
      title="Yurtdışı Turlar"
      description="Balkan ve Avrupa rotaları; Trakya'dan, sınıra en yakın noktadan çıkış avantajıyla."
      empty={
        <>
          <p className="font-display text-xl font-semibold text-slate-900">Yurtdışı kontenjanlar yakında açılıyor</p>
          <p className="mt-2 text-slate-600">
            Ön kayıt bırakabilirsiniz. Rotalar için{' '}
            <Link href="/balkan-turlari" className="font-semibold text-brand-700 hover:underline">
              Balkan turları
            </Link>{' '}
            sayfasına göz atın.
          </p>
        </>
      }
    >
      <TourSeoLinks variant="international" />
    </TourListing>
  );
}
