import Link from 'next/link';
import { getClientTours } from '@/lib/tours';
import { AccommodationType } from '@/types/tour';
import TourListing from '@/components/tours/TourListing';
import TourSeoLinks from '@/components/tours/TourSeoLinks';

export const revalidate = 3600;

export default async function DailyToursPage() {
  const tours = await getClientTours({
    isActive: true,
    accommodationType: AccommodationType.DAILY,
  });

  return (
    <TourListing
      tours={tours}
      category="daily"
      eyebrow="Tek günde dönüş"
      title="Günübirlik Turlar"
      description="Sabah Çerkezköy, Çorlu ve Saray'dan yola çıkın, akşam evinizde olun. Hafta sonu kaçamakları için konaklama derdi olmayan programlar."
    >
      <Highlights
        title="Neden günübirlik?"
        items={[
          ['Kısa sürede yeni yerler', 'Bir günde birden fazla durak, planlanmış rota.'],
          ['Konaklama derdi yok', 'Bavul yok, otel yok; sadece küçük bir çanta.'],
          ['Hafta sonuna uygun', 'Çoğu program cumartesi ve pazar kalkışlı.'],
        ]}
        link={{ href: '/cerkezkoy-gunubirlik-turlar', label: 'Çerkezköy günübirlik tur rehberi' }}
      />
      <TourSeoLinks variant="daily" />
    </TourListing>
  );
}

function Highlights({ title, items, link }: { title: string; items: [string, string][]; link: { href: string; label: string } }) {
  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-bold text-slate-900">{title}</h2>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map(([t, d]) => (
          <div key={t} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <dt className="font-semibold text-slate-900">{t}</dt>
            <dd className="mt-2 text-sm text-slate-600">{d}</dd>
          </div>
        ))}
      </dl>
      <Link href={link.href} className="mt-6 inline-block text-sm font-semibold text-brand-700 hover:underline">
        {link.label} →
      </Link>
    </section>
  );
}
