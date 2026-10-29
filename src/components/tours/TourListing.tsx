'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import type { ITour } from '@/types/tour';
import TourCard, { WhatsAppIcon } from '@/components/tours/TourCard';
import {
  finalPrice,
  groupDepartures,
  isUpcoming,
  monthKey,
  monthLabel,
  sortForDisplay,
  whatsappLink,
} from '@/lib/tourUi';

export type ListingCategory = 'all' | 'domestic' | 'international' | 'daily' | 'overnight' | 'last-minute' | 'search';

const CATEGORIES: { key: ListingCategory; label: string; href: string }[] = [
  { key: 'all', label: 'Tüm turlar', href: '/tours' },
  { key: 'domestic', label: 'Yurtiçi', href: '/tours/domestic' },
  { key: 'international', label: 'Yurtdışı', href: '/tours/international' },
  { key: 'daily', label: 'Günübirlik', href: '/tours/daily' },
  { key: 'overnight', label: 'Konaklamalı', href: '/tours/overnight' },
  { key: 'last-minute', label: 'Son dakika', href: '/tours/last-minute' },
];

type SortKey = 'date' | 'price-asc' | 'price-desc';

type TourListingProps = {
  tours: ITour[];
  category: ListingCategory;
  eyebrow?: string;
  title: string;
  description: string;
  /** Liste boşken gösterilecek içerik (varsayılan: genel mesaj) */
  empty?: ReactNode;
  /** Listenin altına, SEO bağlantılarından önce eklenecek sayfaya özel içerik */
  children?: ReactNode;
};

/**
 * Kategori sayfalarının (yurtiçi, yurtdışı, günübirlik, konaklamalı, son dakika) ortak görünümü.
 * Eskiden her sayfa aynı ızgarayı ayrı ayrı çiziyordu; geçmiş tarihli turlar yaklaşanlarla karışıyor,
 * aynı programın iki tarihi iki ayrı kart oluyordu.
 */
export default function TourListing({ tours, category, eyebrow, title, description, empty, children }: TourListingProps) {
  const [month, setMonth] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('date');
  // Yaklaşan tur azsa geçmiş programlar kapalı kalınca sayfa boş görünüyordu
  const [showPast, setShowPast] = useState(() => tours.filter((t) => isUpcoming(t) || !t.startDate).length < 4);

  const { upcoming, past } = useMemo(() => {
    const sorted = sortForDisplay(tours);
    return {
      upcoming: sorted.filter((t) => isUpcoming(t) || !t.startDate),
      past: sorted.filter((t) => t.startDate && !isUpcoming(t)),
    };
  }, [tours]);

  const months = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of upcoming) {
      const k = monthKey(t.startDate);
      if (k) counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [upcoming]);

  const visible = useMemo(() => {
    let list = month ? upcoming.filter((t) => monthKey(t.startDate) === month) : upcoming;
    if (sort !== 'date') {
      const dir = sort === 'price-asc' ? 1 : -1;
      list = [...list].sort((a, b) => dir * (finalPrice(a) - finalPrice(b)));
    }
    return groupDepartures(list);
  }, [upcoming, month, sort]);

  const pastGroups = useMemo(() => groupDepartures(past), [past]);
  const minPrice = upcoming.length ? Math.min(...upcoming.map(finalPrice)) : null;

  return (
    <main className="min-h-screen bg-sand-50 pb-20">
      <header className="relative overflow-hidden bg-brand-950 pb-14 pt-32 text-white sm:pt-36">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-[360px] w-[360px] rounded-full bg-sunset-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Konum" className="text-sm text-white/60">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            {category === 'all' ? (
              <span className="text-white/90">Turlar</span>
            ) : (
              <>
                <Link href="/tours" className="hover:text-white">Turlar</Link>
                <span className="mx-2">/</span>
                <span className="text-white/90">{title}</span>
              </>
            )}
          </nav>

          {eyebrow && (
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-sunset-400">{eyebrow}</p>
          )}
          <h1 className={`${eyebrow ? 'mt-2' : 'mt-6'} max-w-3xl font-display text-4xl font-bold sm:text-5xl`}>{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{description}</p>

          <dl className="mt-8 flex flex-wrap gap-3 text-sm">
            <div className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
              <dt className="sr-only">Yaklaşan tur</dt>
              <dd><strong className="text-white">{upcoming.length}</strong> <span className="text-white/70">yaklaşan kalkış</span></dd>
            </div>
            {minPrice !== null && (
              <div className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
                <dt className="sr-only">En düşük fiyat</dt>
                <dd>
                  <span className="text-white/70">kişi başı</span>{' '}
                  <strong className="text-white">{minPrice.toLocaleString('tr-TR')} ₺</strong>{' '}
                  <span className="text-white/70">’den başlayan</span>
                </dd>
              </div>
            )}
            <div className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
              <dt className="sr-only">Kalkış</dt>
              <dd className="text-white/70">Çerkezköy · Çorlu · Saray kalkışlı</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* Kategori geçişi: sayfa kaydırılırken üstte kalır */}
      <div className="sticky top-20 z-30 border-b border-slate-200/70 bg-sand-50/90 backdrop-blur">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8" aria-label="Tur kategorileri">
          {CATEGORIES.map((c) => {
            const active = c.key === category;
            return (
              <Link
                key={c.key}
                href={c.href}
                aria-current={active ? 'page' : undefined}
                className={`flex h-10 shrink-0 items-center rounded-full px-4 text-sm font-semibold transition ${
                  active
                    ? 'bg-brand-900 text-white'
                    : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-300'
                }`}
              >
                {c.label}
              </Link>
            );
          })}
          <Link
            href="/tour-calendar"
            className="flex h-10 shrink-0 items-center rounded-full px-4 text-sm font-semibold text-brand-700 hover:bg-white"
          >
            Takvimde gör →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        {upcoming.length > 0 && (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {months.length > 1 ? (
              <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
                <MonthChip active={month === null} onClick={() => setMonth(null)} label="Tüm aylar" />
                {months.map(([key, count]) => (
                  <MonthChip
                    key={key}
                    active={month === key}
                    onClick={() => setMonth(month === key ? null : key)}
                    label={monthLabel(key)}
                    count={count}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">{visible.length} program listeleniyor</p>
            )}

            <label className="flex shrink-0 items-center gap-2 text-sm text-slate-600">
              Sırala
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 rounded-full border-0 bg-white px-4 pr-8 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-500"
              >
                <option value="date">En yakın tarih</option>
                <option value="price-asc">Fiyat: düşükten yükseğe</option>
                <option value="price-desc">Fiyat: yüksekten düşüğe</option>
              </select>
            </label>
          </div>
        )}

        {visible.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map(({ tour, others }, i) => (
              <TourCard
                key={tour._id?.toString() ?? tour.slug}
                tour={tour}
                priority={i < 4}
                moreDates={others.filter((o) => isUpcoming(o)).length}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl bg-white p-10 text-center ring-1 ring-slate-200">
            {empty ?? (
              <>
                <p className="font-display text-xl font-semibold text-slate-900">Bu kategoride yaklaşan tur yok</p>
                <p className="mt-2 text-slate-600">
                  Yeni tarihler sık ekleniyor. WhatsApp’tan yazın, program açılınca ilk size haber verelim.
                </p>
              </>
            )}
            <a
              href={whatsappLink(`Merhaba, ${title} için yeni tarihler açıldığında haber almak istiyorum.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-emerald-500 px-5 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              <WhatsAppIcon className="h-5 w-5" /> Haber ver
            </a>
          </div>
        )}

        {pastGroups.length > 0 && (
          <section className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900">Geçmiş programlar</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Bu turları tekrar düzenliyoruz. Yeni tarih için kartlardan WhatsApp’a yazabilirsiniz.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPast((v) => !v)}
                aria-expanded={showPast}
                className="h-10 rounded-full bg-white px-4 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:ring-slate-300"
              >
                {showPast ? 'Gizle' : `${pastGroups.length} programı göster`}
              </button>
            </div>
            {showPast && (
              <div className="mt-6 grid grid-cols-1 items-stretch gap-6 opacity-90 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {pastGroups.map(({ tour }) => (
                  <TourCard key={tour._id?.toString() ?? tour.slug} tour={tour} />
                ))}
              </div>
            )}
          </section>
        )}

        {children}

        <section className="mt-16 overflow-hidden rounded-3xl bg-brand-900 p-8 text-white sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Aradığınız rota listede yok mu?</h2>
              <p className="mt-2 max-w-xl text-white/70">
                Okul, dernek, şirket ya da arkadaş grubunuz için tarih ve rotayı birlikte planlayalım.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/group-tour"
                className="inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-semibold text-brand-900 hover:bg-sand-100"
              >
                Özel grup turu
              </Link>
              <a
                href={whatsappLink('Merhaba, tur programlarınız hakkında bilgi almak istiyorum.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-500 px-6 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function MonthChip({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-10 shrink-0 rounded-full px-4 text-sm font-semibold capitalize transition ${
        active ? 'bg-sunset-600 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-300'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-1.5 text-xs ${active ? 'text-white/80' : 'text-slate-400'}`}>{count}</span>
      )}
    </button>
  );
}
