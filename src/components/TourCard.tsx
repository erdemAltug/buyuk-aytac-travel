'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ITour } from '@/types/tour';
import { formatDateLong, formatDateShort } from '@/lib/formatDate';
import ReservationModal from './ReservationModal';

type TourCardProps = {
  tour: ITour;
  priority?: boolean;
  showWhatsApp?: boolean;
  dateOnImage?: boolean;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
}

export default function TourCard({
  tour,
  priority = false,
  showWhatsApp = true,
  dateOnImage = false,
}: TourCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = tour.startDate
    ? dateOnImage
      ? formatDateLong(tour.startDate)
      : formatDateShort(tour.startDate)
    : null;

  const displayPrice =
    tour.discountRate && tour.discountRate > 0
      ? tour.price * (1 - tour.discountRate / 100)
      : tour.price;

  return (
    <>
      <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
        <Link
          href={`/tours/${tour.slug}`}
          className="group flex min-h-0 flex-1 flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100">
            {!imageError ? (
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={priority}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-sm text-gray-500">
                Görsel yüklenemedi
              </div>
            )}

            <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-md">
              <span className="line-clamp-1">{tour.duration}</span>
            </div>

            {dateOnImage && formattedDate && (
              <div className="absolute right-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
                {formattedDate}
              </div>
            )}

            {tour.discountRate && tour.discountRate > 0 && (
              <div className="absolute bottom-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                %{tour.discountRate} İndirim
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-4 pb-3">
            <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-semibold leading-snug text-slate-900 sm:min-h-[3.25rem] sm:text-lg group-hover:text-blue-600">
              {tour.name}
            </h3>

            <div className="mt-2 flex min-h-[2.75rem] flex-col justify-center gap-1.5">
              <div className="flex min-h-5 items-start gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="line-clamp-2 text-sm text-slate-500">{tour.destination}</span>
              </div>

              {!dateOnImage && (
                <div className="flex min-h-5 items-center gap-1">
                  {formattedDate ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4 shrink-0 text-slate-400"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span className="text-sm text-slate-500">{formattedDate}</span>
                    </>
                  ) : (
                    <span className="text-sm invisible" aria-hidden="true">
                      —
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Alt bölüm: tüm kartlarda aynı yükseklik */}
        <div className="mt-auto shrink-0 border-t border-slate-100 px-4 pb-4 pt-3">
          <div className="mb-3 min-h-[2.75rem]">
            {tour.discountRate && tour.discountRate > 0 ? (
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-lg font-bold text-red-500">{formatPrice(displayPrice)}</span>
                <span className="text-sm text-gray-400 line-through">{formatPrice(tour.price)}</span>
                <span className="w-full text-xs text-slate-400">kişi başı</span>
              </div>
            ) : (
              <>
                <span className="block text-lg font-bold leading-tight text-blue-700">
                  {tour.price.toLocaleString('tr-TR')} ₺
                </span>
                <span className="text-xs text-slate-400">kişi başı</span>
              </>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex h-10 min-w-0 flex-1 items-center justify-center rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Rezervasyon Yap
            </button>
            {showWhatsApp && (
              <a
                href={`https://wa.me/905393459559?text=Merhaba, ${encodeURIComponent(tour.name)} hakkında bilgi almak istiyorum.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500 text-white transition-colors hover:bg-green-600"
                aria-label="WhatsApp ile bilgi al"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            )}
          </div>
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
