'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { ITour } from '@/types/tour';
import TourCard from '@/components/tours/TourCard';
import { isUpcoming, monthKey, monthLabel, sortForDisplay } from '@/lib/tourUi';

type TabKey = 'all' | 'daily' | 'overnight' | 'domestic' | 'international';

const TABS: { key: TabKey; label: string; href: string; test: (t: ITour) => boolean }[] = [
  { key: 'all', label: 'Tümü', href: '/tours', test: () => true },
  { key: 'daily', label: 'Günübirlik', href: '/tours/daily', test: (t) => t.accommodationType === 'daily' },
  { key: 'overnight', label: 'Konaklamalı', href: '/tours/overnight', test: (t) => t.accommodationType === 'with_accommodation' },
  { key: 'domestic', label: 'Yurtiçi', href: '/tours?tourType=domestic', test: (t) => t.tourType === 'domestic' },
  { key: 'international', label: 'Yurtdışı', href: '/tours?tourType=international', test: (t) => t.tourType === 'international' },
];

/**
 * Ana sayfanın tur vitrini: eskiden 4 ayrı bölümde aynı turlar tekrar tekrar gösteriliyordu.
 * Şimdi tek bölüm: kategori sekmeleri + "hangi ay?" şeridi + kaydırılabilir kart şeridi.
 */
export default function TourExplorer({ tours }: { tours: ITour[] }) {
  const [tab, setTab] = useState<TabKey>('all');
  const [month, setMonth] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(() => sortForDisplay(tours), [tours]);

  // Yalnızca yaklaşan turların ayları (en fazla 8)
  const months = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of sorted) {
      if (!isUpcoming(t)) continue;
      const k = monthKey(t.startDate);
      if (k) counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    return [...counts.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(0, 8);
  }, [sorted]);

  const activeTab = TABS.find((t) => t.key === tab) ?? TABS[0];

  const visible = useMemo(() => {
    let list = sorted.filter(activeTab.test);
    if (month) list = list.filter((t) => monthKey(t.startDate) === month);
    return list.slice(0, 16);
  }, [sorted, activeTab, month]);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: 'smooth' });
  };

  const pick = (key: TabKey) => {
    setTab(key);
    railRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

  return (
    <section id="turlar" className="scroll-mt-24 bg-sand-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sunset-600">Tur vitrini</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Nereye gidiyoruz?</h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Yaklaşan kalkışlar önce. Bir kategori ya da ay seç, sana uyan turu bul.
            </p>
          </div>

          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Tur kategorisi">
            {TABS.map((t) => {
              const count = sorted.filter(t.test).length;
              if (t.key !== 'all' && count === 0) return null;
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => pick(t.key)}
                  className={`h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition ${
                    active
                      ? 'bg-brand-900 text-white shadow-lg shadow-brand-900/20'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-slate-300'
                  }`}
                >
                  {t.label}
                  <span className={`ml-2 text-xs ${active ? 'text-white/70' : 'text-slate-400'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {months.length > 1 && (
          <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-slate-500">Hangi ay gitmek istersin?</p>
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <button
                type="button"
                onClick={() => setMonth(null)}
                className={`h-16 w-20 shrink-0 rounded-2xl text-sm font-semibold transition ${
                  month === null ? 'bg-sunset-500 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200'
                }`}
              >
                Tüm
                <span className="block text-xs font-normal opacity-80">aylar</span>
              </button>
              {months.map(([key, count]) => {
                const active = month === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMonth(active ? null : key)}
                    aria-pressed={active}
                    className={`h-16 w-24 shrink-0 rounded-2xl text-sm font-semibold capitalize transition ${
                      active ? 'bg-sunset-500 text-white' : 'bg-white text-slate-800 ring-1 ring-slate-200 hover:ring-slate-300'
                    }`}
                  >
                    {monthLabel(key)}
                    <span className={`block text-xs font-normal ${active ? 'text-white/85' : 'text-slate-500'}`}>
                      {count} tur
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="relative mt-8">
          {visible.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center ring-1 ring-slate-200">
              <p className="font-display text-xl font-semibold text-slate-900">Bu seçimde tur bulunamadı</p>
              <p className="mt-2 text-slate-600">Başka bir ay ya da kategori deneyebilirsin.</p>
            </div>
          ) : (
            <div
              ref={railRef}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 sm:mx-0 sm:gap-5 sm:px-0"
            >
              {visible.map((tour, i) => (
                <div
                  key={tour._id?.toString() ?? tour.slug}
                  className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-3*1.25rem)/4)]"
                >
                  <TourCard tour={tour} priority={i < 2} />
                </div>
              ))}
              <Link
                href={activeTab.href}
                className="flex w-[60%] shrink-0 snap-start flex-col items-center justify-center rounded-3xl bg-brand-900 p-6 text-center text-white transition hover:bg-brand-800 sm:w-[30%] lg:w-[18%]"
              >
                <span className="font-display text-2xl font-bold">Tümünü gör</span>
                <span className="mt-2 text-sm text-white/70">{activeTab.label} turları</span>
                <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-xl" aria-hidden>
                  →
                </span>
              </Link>
            </div>
          )}

          {visible.length > 3 && (
            <div className="pointer-events-none absolute -top-16 right-0 hidden gap-2 lg:flex">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
                aria-label="Önceki turlar"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-900 text-white transition hover:bg-brand-800"
                aria-label="Sonraki turlar"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
