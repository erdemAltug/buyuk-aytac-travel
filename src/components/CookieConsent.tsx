'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getConsent, OPEN_CONSENT_EVENT, setConsent, type Consent } from '@/lib/consent';

/** Basit çerez onay bandı: karar verilene kadar sol altta durur, footer'dan tekrar açılabilir. */
export default function CookieConsent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Sunucuda karar bilinmiyor; bant yalnızca istemcide, karar yoksa açılır
    if (getConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open || pathname?.startsWith('/admin')) return null;

  const decide = (value: Consent) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Çerez tercihleri"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-slate-200 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm"
    >
      <p className="font-display text-base font-semibold text-slate-900">Çerezler</p>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
        Siteyi geliştirmek için ziyaret istatistiklerini analitik çerezlerle ölçüyoruz. Zorunlu çerezler her zaman açıktır.{' '}
        <Link href="/privacy" className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800">
          Gizlilik Politikası
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => decide('denied')}
          className="h-11 flex-1 rounded-xl bg-slate-100 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          Reddet
        </button>
        <button
          type="button"
          onClick={() => decide('granted')}
          className="h-11 flex-1 rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Kabul et
        </button>
      </div>
    </div>
  );
}
