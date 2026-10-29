import Image from 'next/image';
import Link from 'next/link';
import type { ITour } from '@/types/tour';
import { isUpcoming, sortForDisplay } from '@/lib/tourUi';

type Dest = {
  title: string;
  subtitle: string;
  href: string;
  keywords: string[];
  className: string;
  image: string;
  alt: string;
};

/*
 * Arka planlar public/images/destinations altındaki gerçek rota fotoğrafları (kaynaklar KAYNAK.md'de).
 * Önceden tur afişleri kullanılıyordu: yazılı afiş kutuya sığmıyor, eşleşen turu olmayan rotalar boş kalıyordu.
 * Not: public/images/categories altındaki "-manzara" görselleri bu rotalara ait değil (Paris, İtalya, Marakeş).
 */
const DESTINATIONS: Dest[] = [
  { title: 'Kapadokya', subtitle: 'Balonlar, peri bacaları', href: '/kapadokya-turu', keywords: ['kapadokya', 'göreme', 'ürgüp'], className: 'col-span-2 row-span-2', image: '/images/destinations/kapadokya.jpg', alt: 'Kapadokya vadisi üzerinde sıcak hava balonları' },
  { title: 'Karadeniz & Batum', subtitle: 'Yaylalar, Uzungöl', href: '/karadeniz-turu', keywords: ['karadeniz', 'batum', 'uzungöl', 'trabzon', 'rize'], className: 'col-span-2 sm:col-span-1', image: '/images/destinations/karadeniz.jpg', alt: 'Uzungöl ve yeşil Karadeniz vadisi' },
  { title: 'Ege & Ayvalık', subtitle: 'Cunda, Assos, Kaz Dağları', href: '/ege-turu', keywords: ['ayvalık', 'cunda', 'assos', 'alaçatı', 'izmir', 'kaz dağ', 'kazdağ'], className: 'col-span-1', image: '/images/destinations/ege.jpg', alt: 'Cunda limanında kırmızı balıkçı teknesi' },
  { title: 'Bozcaada & Gökçeada', subtitle: 'Adalar, bağlar', href: '/ege-turu', keywords: ['bozcaada', 'gökçeada'], className: 'col-span-1', image: '/images/destinations/bozcaada.jpg', alt: 'Bozcaada Kalesi ve deniz' },
  { title: 'İstanbul', subtitle: 'Fener-Balat, Boğaz', href: '/tours?search=istanbul', keywords: ['istanbul', 'balat', 'boğaz', 'yarımada', 'emirgan'], className: 'col-span-1', image: '/images/destinations/istanbul.jpg', alt: 'Gün batımında Süleymaniye ve İstanbul silueti' },
  { title: 'GAP & Doğu', subtitle: 'Mardin, Göbeklitepe', href: '/gap-turu', keywords: ['gap', 'mardin', 'urfa', 'göbekli', 'nemrut'], className: 'col-span-1 sm:col-span-2', image: '/images/destinations/gap.jpg', alt: 'Mardin eski şehir ve minare' },
  { title: 'Balkanlar', subtitle: 'Vizesiz rotalar', href: '/balkan-turlari', keywords: ['balkan', 'saraybosna', 'üsküp', 'ohrid', 'kosova'], className: 'col-span-2', image: '/images/destinations/balkan.jpg', alt: 'Mostar Köprüsü ve Neretva Nehri' },
];

function matches(d: Dest, t: ITour) {
  const hay = `${t.name} ${t.destination}`.toLocaleLowerCase('tr-TR');
  return d.keywords.some((k) => hay.includes(k));
}

/** Popüler rotalar — rota fotoğrafı ve o rotadaki yaklaşan tur sayısı */
export default function DestinationMosaic({ tours }: { tours: ITour[] }) {
  const sorted = sortForDisplay(tours);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sunset-700">Popüler rotalar</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">İlham al, rotanı seç</h2>
          </div>
          <Link href="/destinasyonlar" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Tüm destinasyonlar →
          </Link>
        </div>

        <div className="grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[210px] sm:grid-cols-4 sm:gap-4">
          {DESTINATIONS.map((d, i) => {
            const list = sorted.filter((t) => matches(d, t));
            const upcomingCount = list.filter((t) => isUpcoming(t)).length;
            const big = i === 0;
            return (
              <Link
                key={d.title}
                href={d.href}
                className={`group relative overflow-hidden rounded-3xl bg-brand-900 ${d.className}`}
              >
                <Image
                  src={d.image}
                  alt={d.alt}
                  fill
                  sizes={big ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 50vw, 25vw'}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                {upcomingCount > 0 && (
                  <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow">
                    {upcomingCount} yaklaşan tur
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className={`font-display font-bold text-white ${big ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>
                    {d.title}
                  </p>
                  <p className="text-xs text-white sm:text-sm">{d.subtitle}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
