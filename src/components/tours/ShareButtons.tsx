'use client';

import { useState } from 'react';

/** Paylaş: telefonda yerel paylaşım menüsü, masaüstünde WhatsApp / Facebook / bağlantıyı kopyala */
export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* kullanıcı vazgeçti */
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* pano erişimi yok */
    }
  };

  const btn =
    'inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        className={btn}
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp&apos;ta paylaş
      </a>
      <a
        className={`${btn} max-sm:hidden`}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
      <button type="button" onClick={nativeShare} className={btn}>
        {copied ? 'Bağlantı kopyalandı ✓' : 'Paylaş / Kopyala'}
      </button>
    </div>
  );
}
