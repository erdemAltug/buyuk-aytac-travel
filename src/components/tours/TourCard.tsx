'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ITour } from '@/types/tour';
import ReservationModal from '@/components/ReservationModal';
import FavoriteButton from '@/components/FavoriteButton';
import {
  dateParts,
  daysUntil,
  finalPrice,
  formatTL,
  isDaily,
  isUpcoming,
  shortTourName,
  tourWhatsappLink,
} from '@/lib/tourUi';

type TourCardProps = {
  tour: ITour;
  priority?: boolean;
  showWhatsApp?: boolean;
  /** Eski API ile uyum için tutuluyor; tarih artık her zaman görsel üzerinde rozet olarak gösteriliyor */
  dateOnImage?: boolean;
  /** Aynı programın başka tarihli kalkışları (yalnızca yaklaşanlar sayılır) */
  moreDates?: number;
};

/**
 * Tur kartı.
 * Tur görselleri çoğunlukla içinde yazı olan broşür afişleri. Kırpılınca yazılar kesiliyordu;
 * artık afiş bütün olarak gösteriliyor, arkasında aynı görselin bulanık hali zemin oluyor.
 */
export default function TourCard({ tour, priority = false, showWhatsApp = true, moreDates = 0 }: TourCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parts = dateParts(tour.startDate);
  const upcoming = isUpcoming(tour);
  const days = upcoming ? daysUntil(tour.startDate) : null;
  const price = finalPrice(tour);
  const hasDiscount = !!tour.discountRate && tour.discountRate > 0;
  const title = shortTourName(tour.name);

  return (
    <>
      <article className="group/card relative flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(15,31,77,0.35)]">
        <div className="absolute right-3 top-3 z-20">
          <FavoriteButton tourId={tour._id} tourSlug={tour.slug} size="sm" />
        </div>

        <Link
          href={`/tours/${tour.slug}`}
          className="flex flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-950">
            {!imageError ? (
              <>
                <Image
                  src={tour.image}
                  alt=""
                  aria-hidden
                  fill
                  className="scale-125 object-cover opacity-60 blur-2xl"
                  sizes="(max-width: 640px) 50vw, 20vw"
                  quality={30}
                />
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover/card:scale-[1.03]"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                  priority={priority}
                  onError={() => setImageError(true)}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-700 to-brand-950 p-6 text-center font-display text-lg font-semibold text-white">
                {title}
              </div>
            )}

            {/* Geçmiş tarihli turda takvim rozeti yanıltıcıydı (Eylül turu "yaklaşan" gibi duruyordu) */}
            {parts && upcoming && (
              <div className="absolute left-3 top-3 z-10 flex w-14 flex-col items-center overflow-hidden rounded-2xl bg-white text-center shadow-lg">
                <span className="w-full bg-sunset-600 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {parts.month}
                </span>
                <span className="pt-0.5 font-display text-xl font-bold leading-none text-slate-900">{parts.day}</span>
                <span className="pb-1 text-[10px] font-medium text-slate-500">{parts.weekday}</span>
              </div>
            )}

            <div className="absolute inset-x-3 bottom-3 z-10 flex flex-wrap gap-1.5">
              {days !== null && days <= 21 && (
                <span className="rounded-full bg-sunset-600 px-2.5 py-1 text-[11px] font-bold text-white shadow">
                  {days === 0 ? 'Bugün' : `${days} gün kaldı`}
                </span>
              )}
              {moreDates > 0 && (
                <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-brand-900 shadow">
                  +{moreDates} tarih daha
                </span>
              )}
              {!upcoming && parts && (
                <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-amber-950 shadow">
                  Yeni tarih için sorun
                </span>
              )}
              {hasDiscount && (
                <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white shadow">
                  %{tour.discountRate} indirim
                </span>
              )}
              <span className="rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                {isDaily(tour) ? 'Günübirlik' : 'Konaklamalı'}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col px-4 pb-3 pt-4">
            <h3 className="line-clamp-2 text-[17px] font-semibold leading-snug text-slate-900 transition-colors group-hover/card:text-brand-700">
              {title}
            </h3>
            <p className="mt-1 line-clamp-1 text-sm text-slate-500">{tour.destination}</p>

            <div className="mt-auto flex items-end justify-between gap-3 pt-4">
              <div>
                {hasDiscount && (
                  <span className="block text-xs text-slate-400 line-through">{formatTL(tour.price)}</span>
                )}
                <span className="font-display text-xl font-bold text-slate-900">{formatTL(price)}</span>
                <span className="ml-1 text-xs text-slate-500">/ kişi</span>
              </div>
              {tour.duration && (
                <span className="line-clamp-1 max-w-[50%] text-right text-xs font-medium text-slate-500">
                  {tour.duration}
                </span>
              )}
            </div>
          </div>
        </Link>

        <div className="flex gap-2 px-4 pb-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex h-11 min-w-0 flex-1 items-center justify-center rounded-xl bg-brand-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Rezervasyon
          </button>
          {showWhatsApp && (
            <a
              href={tourWhatsappLink(tour)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white transition-colors hover:bg-emerald-600"
              aria-label={`${title} için WhatsApp'tan bilgi al`}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </article>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tourName={tour.name}
        tourSlug={tour.slug}
      />
    </>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
