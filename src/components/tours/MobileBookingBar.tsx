'use client';

import { useState } from 'react';
import ReservationModal from '@/components/ReservationModal';
import { WhatsAppIcon } from '@/components/tours/TourCard';
import { formatTL, tourWhatsappLink } from '@/lib/tourUi';

/**
 * Mobilde ekranın altına sabitlenen rezervasyon çubuğu.
 * Önceden mobilde "Rezervasyon Yap" butonuna ulaşmak için ~4-5 ekran kaydırmak gerekiyordu.
 */
export default function MobileBookingBar({
  name,
  slug,
  price,
  oldPrice,
  dateLabel,
}: {
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  dateLabel?: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-12px_rgba(15,31,77,0.25)] backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="leading-tight">
              <span className="font-display text-xl font-bold text-slate-900">{formatTL(price)}</span>
              {oldPrice && <span className="ml-1.5 text-xs text-slate-400 line-through">{formatTL(oldPrice)}</span>}
            </p>
            <p className="truncate text-xs text-slate-500">{dateLabel ? `${dateLabel} · kişi başı` : 'kişi başı'}</p>
          </div>
          <a
            href={tourWhatsappLink({ name, slug })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white"
            aria-label="WhatsApp'tan sor"
          >
            <WhatsAppIcon className="h-6 w-6" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="h-12 shrink-0 rounded-xl bg-brand-600 px-5 text-sm font-bold text-white"
          >
            Rezervasyon
          </button>
        </div>
      </div>
      {/* Çubuk içeriğin son satırını örtmesin */}
      <div className="h-24 lg:hidden" aria-hidden />
      <ReservationModal isOpen={open} onClose={() => setOpen(false)} tourName={name} tourSlug={slug} />
    </>
  );
}
