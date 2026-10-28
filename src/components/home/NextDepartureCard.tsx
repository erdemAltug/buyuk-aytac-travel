'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ITour } from '@/types/tour';
import { finalPrice, formatDateRange, formatTL, shortTourName, toDate } from '@/lib/tourUi';

function diffParts(target: Date, now: number) {
  const ms = Math.max(0, target.getTime() - now);
  return {
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms / 3_600_000) % 24),
    m: Math.floor((ms / 60_000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

/**
 * "Sıradaki kalkış" kartı — en yakın turu canlı geri sayımla gösterir.
 * Geri sayım yalnızca tarayıcıda başlar (sunucu/istemci saati farkı hydration hatası vermesin).
 */
export default function NextDepartureCard({
  tour,
  upcomingCount,
}: {
  tour: ITour | null;
  upcomingCount: number;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!tour) {
    return (
      <div className="rounded-3xl bg-white/10 p-6 text-white ring-1 ring-white/20 backdrop-blur-xl">
        <p className="font-display text-xl font-semibold">Yeni turlar yolda!</p>
        <p className="mt-2 text-sm text-white/75">
          Takvimimiz güncelleniyor. Yeni tarihler için WhatsApp&apos;tan haber alabilirsiniz.
        </p>
      </div>
    );
  }

  const start = toDate(tour.startDate);
  const parts = start && now !== null ? diffParts(start, now) : null;

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group block overflow-hidden rounded-3xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-xl transition hover:bg-white/15"
    >
      <div className="flex items-center justify-between px-5 pt-5">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sunset-400">Sıradaki kalkış</span>
        {upcomingCount > 1 && (
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white/85">
            +{upcomingCount - 1} tur daha planlandı
          </span>
        )}
      </div>

      <div className="flex gap-4 p-5">
        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-brand-900">
          <Image src={tour.image} alt={tour.name} fill sizes="96px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 font-display text-lg font-semibold leading-snug">{shortTourName(tour.name)}</p>
          <p className="mt-1 text-sm text-white/70">{formatDateRange(tour.startDate, tour.endDate)}</p>
          <p className="mt-2 text-sm">
            <span className="font-display text-xl font-bold">{formatTL(finalPrice(tour))}</span>
            <span className="text-white/60"> / kişi</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 px-5 pb-5" aria-label="Kalkışa kalan süre">
        {(['d', 'h', 'm', 's'] as const).map((k) => (
          <div key={k} className="rounded-2xl bg-brand-950/50 py-2.5 text-center ring-1 ring-white/10">
            <div className="font-display text-2xl font-bold tabular-nums">
              {parts ? String(parts[k]).padStart(2, '0') : '––'}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-white/60">
              {k === 'd' ? 'gün' : k === 'h' ? 'saat' : k === 'm' ? 'dk' : 'sn'}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-5 py-3.5 text-sm font-semibold">
        <span>Yerini ayırt</span>
        <span className="transition-transform group-hover:translate-x-1" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}
