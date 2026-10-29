'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateRange, formatTL, shortTourName } from '@/lib/tourUi';

/**
 * "Son baktıkların": ziyaretçinin incelediği turları tarayıcıda hatırlar (localStorage).
 * Sunucuya hiçbir şey gönderilmez. Liste boşsa bölüm hiç görünmez.
 */

const KEY = 'bat:recent-tours';
const MAX = 8;

export type RecentTour = {
  slug: string;
  name: string;
  image: string;
  price: number;
  startDate?: string;
  endDate?: string;
};

function read(): RecentTour[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as RecentTour[]) : [];
    return Array.isArray(list) ? list.filter((t) => t && t.slug) : [];
  } catch {
    return [];
  }
}

/** Tur detay sayfasına konur; görüntülenen turu listenin başına ekler */
export function TrackTourView({ tour }: { tour: RecentTour }) {
  useEffect(() => {
    try {
      const next = [tour, ...read().filter((t) => t.slug !== tour.slug)].slice(0, MAX);
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* gizli sekme vb. — sessizce geç */
    }
  }, [tour]);
  return null;
}

export default function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const [items, setItems] = useState<RecentTour[]>([]);

  useEffect(() => {
    setItems(read().filter((t) => t.slug !== excludeSlug));
  }, [excludeSlug]);

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-slate-900">Son baktıkların</h2>
          <button
            type="button"
            onClick={() => {
              try {
                window.localStorage.removeItem(KEY);
              } catch {
                /* yok say */
              }
              setItems([]);
            }}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Temizle
          </button>
        </div>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {items.map((t) => (
            <Link
              key={t.slug}
              href={`/tours/${t.slug}`}
              className="flex w-72 shrink-0 items-center gap-3 rounded-2xl bg-sand-50 p-2.5 ring-1 ring-slate-200/70 transition hover:bg-sand-100"
            >
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                <Image src={t.image} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="line-clamp-1 text-sm font-semibold text-slate-900">{shortTourName(t.name)}</p>
                <p className="line-clamp-1 text-xs text-slate-500">{formatDateRange(t.startDate, t.endDate) ?? ' '}</p>
                <p className="text-sm font-bold text-brand-700">{formatTL(t.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
