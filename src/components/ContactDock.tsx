'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import WeekendAssistant, { openWeekendAssistant } from '@/components/WeekendAssistant';
import { WhatsAppIcon } from '@/components/tours/TourCard';
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/tourUi';

/**
 * Tek yüzen iletişim butonu.
 * Eskiden sağ altta 3 ayrı buton (asistan, telefon, WhatsApp) vardı; mobilde kartların
 * "Rezervasyon" butonlarının ve paylaş ikonlarının üstüne biniyordu.
 * Şimdi: tek WhatsApp butonu + açılınca seçenekler.
 * Tur detay sayfasında mobilde gizlenir — orada alttaki rezervasyon çubuğu aynı işi görüyor.
 */
export default function ContactDock() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onTourPage = /^\/tours\/[^/]+$/.test(pathname ?? '') && !/^\/tours\/(daily|overnight|domestic|international|last-minute)$/.test(pathname ?? '');

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <WeekendAssistant hideTrigger />

      {open && <button type="button" aria-label="Kapat" className="fixed inset-0 z-40 cursor-default" onClick={() => setOpen(false)} />}

      <div
        className={`fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:right-6 ${
          onTourPage ? 'max-lg:hidden' : ''
        }`}
      >
        {open && (
          <div className="w-72 origin-bottom-right animate-fade-up overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="bg-brand-950 px-5 py-4 text-white">
              <p className="font-display text-lg font-semibold">Size nasıl yardımcı olalım?</p>
              <p className="text-xs text-white/70">Hafta içi 09:00–18:00 · Cumartesi 10:00–16:00</p>
            </div>
            <div className="p-2">
              <a
                href={whatsappLink('Merhaba, tur hakkında bilgi almak istiyorum.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-emerald-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">WhatsApp&apos;tan yaz</span>
                  <span className="text-xs text-slate-500">Genelde birkaç dakikada dönüş</span>
                </span>
              </a>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-brand-50">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">Hemen ara</span>
                  <span className="text-xs text-slate-500">{PHONE_DISPLAY}</span>
                </span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openWeekendAssistant();
                }}
                className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-violet-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-semibold text-slate-900">Bana tur öner</span>
                  <span className="text-xs text-slate-500">3 soruda hafta sonu planı</span>
                </span>
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'İletişim menüsünü kapat' : 'İletişim seçeneklerini aç'}
          className={`flex h-14 min-w-14 items-center justify-center gap-2 rounded-full px-4 font-semibold sm:pr-5 text-white shadow-xl transition ${
            open ? 'bg-slate-900' : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <WhatsAppIcon className="h-6 w-6" />
          )}
          <span className="hidden text-sm sm:inline">{open ? 'Kapat' : 'Bize ulaşın'}</span>
        </button>
      </div>
    </>
  );
}
