import Link from 'next/link';
import { getClientTours } from '@/lib/tours';
import TourListing from '@/components/tours/TourListing';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function LastMinuteDealsPage() {
  const tours = await getClientTours({ isActive: true, isLastMinute: true });

  return (
    <TourListing
      tours={tours}
      category="last-minute"
      eyebrow="Kontenjan sınırlı"
      title="Son Dakika Fırsatları"
      description="Kalkışı yaklaşan, son koltukları kalan ve indirimli turlar. Kontenjan dolmadan yerinizi ayırtın."
      empty={
        <>
          <p className="font-display text-xl font-semibold text-slate-900">Şu anda aktif son dakika fırsatı yok</p>
          <p className="mt-2 text-slate-600">
            <Link href="/tours" className="font-semibold text-brand-700 hover:underline">
              Tüm turlara göz atın
            </Link>{' '}
            ya da yeni fırsatlardan ilk siz haberdar olun.
          </p>
        </>
      }
    >
      <TourSeoLinks variant="last-minute" />
    </TourListing>
  );
}
