import Image from 'next/image';
import Link from 'next/link';
import type { ITour } from '@/types/tour';
import { isUpcoming } from '@/lib/tourUi';

type Dest = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  keywords: string[];
  className: string;
};

// Manzara fotoğrafları (afiş değil) kullanılıyor — mozaik temiz dursun
const DESTINATIONS: Dest[] = [
  { title: 'Kapadokya', subtitle: 'Balonlar, peri bacaları', href: '/kapadokya-turu', image: '/images/categories/kapadokya-manzara.jpg', keywords: ['kapadokya', 'göreme', 'ürgüp'], className: 'col-span-2 row-span-2' },
  { title: 'Karadeniz & Batum', subtitle: 'Yaylalar, Uzungöl', href: '/karadeniz-turu', image: '/images/categories/karadeniz-manzara.jpg', keywords: ['karadeniz', 'batum', 'uzungöl', 'trabzon', 'rize'], className: 'col-span-2 sm:col-span-1' },
  { title: 'Ege & Ayvalık', subtitle: 'Cunda, Assos, Alaçatı', href: '/ege-turu', image: '/images/categories/ege-manzara.jpg', keywords: ['ayvalık', 'cunda', 'assos', 'alaçatı', 'izmir', 'ege', 'kaz dağ', 'kazdağ'], className: 'col-span-1' },
  { title: 'Bozcaada & Gökçeada', subtitle: 'Adalar, bağlar', href: '/ege-turu', image: '/images/categories/bozcaada-manzara.jpg', keywords: ['bozcaada', 'gökçeada', 'çanakkale'], className: 'col-span-1' },
  { title: 'İstanbul', subtitle: 'Fener-Balat, Boğaz', href: '/tours?search=istanbul', image: '/images/categories/istanbul-manzara.jpg', keywords: ['istanbul', 'balat', 'boğaz', 'yarımada', 'emirgan'], className: 'col-span-1' },
  { title: 'GAP & Doğu', subtitle: 'Mardin, Göbeklitepe', href: '/gap-turu', image: '/images/categories/gap-manzara.jpg', keywords: ['gap', 'mardin', 'urfa', 'göbekli', 'nemrut'], className: 'col-span-1 sm:col-span-2' },
  { title: 'Balkanlar', subtitle: 'Vizesiz rotalar', href: '/balkan-turlari', image: '/images/categories/balkan-manzara.jpg', keywords: ['balkan', 'saraybosna', 'üsküp', 'ohrid', 'kosova'], className: 'col-span-2' },
];

function countFor(d: Dest, tours: ITour[]) {
  return tours.filter((t) => {
    const hay = `${t.name} ${t.destination}`.toLocaleLowerCase('tr-TR');
    return d.keywords.some((k) => hay.includes(k));
  }).length;
}

/** Popüler rotalar — yaklaşan tur sayısı canlı olarak gösterilir */
export default function DestinationMosaic({ tours }: { tours: ITour[] }) {
  const upcoming = tours.filter((t) => isUpcoming(t));

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sunset-600">Popüler rotalar</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">İlham al, rotanı seç</h2>
          </div>
          <Link href="/destinasyonlar" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Tüm destinasyonlar →
          </Link>
        </div>

        <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4">
          {DESTINATIONS.map((d, i) => {
            const n = countFor(d, upcoming);
            return (
              <Link
                key={d.title}
                href={d.href}
                className={`group relative overflow-hidden rounded-3xl bg-brand-900 ${d.className}`}
              >
                <Image
                  src={d.image}
                  alt={`${d.title} turları`}
                  fill
                  sizes={i === 0 ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 50vw, 25vw'}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                {n > 0 && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-900">
                    {n} yaklaşan tur
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className={`font-display font-bold text-white ${i === 0 ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>
                    {d.title}
                  </p>
                  <p className="text-xs text-white/80 sm:text-sm">{d.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
