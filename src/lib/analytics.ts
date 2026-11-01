'use client';

import posthog from 'posthog-js';

/**
 * PostHog olay yardımcısı. Gizlilik: özelliklere asla ad, soyad, telefon gibi kişisel veri koyma.
 * PostHog henüz yüklenmediyse (ör. ilk saniyeler, env yok) sessizce atlar.
 */
const pending: [string, Record<string, unknown> | undefined][] = [];

export function track(event: string, props?: Record<string, unknown>) {
  try {
    if (posthog.__loaded) posthog.capture(event, props);
    // PostHog sayfa yüklendikten sonra başlatılıyor; erken olayları sakla (sınırlı)
    else if (pending.length < 20) pending.push([event, props]);
  } catch {
    // analitik hatası sayfayı bozmasın
  }
}

/** PostHog init tamamlanınca bekleyen olayları gönder (PostHogProvider çağırır) */
export function flushPending() {
  while (pending.length) {
    const [event, props] = pending.shift()!;
    posthog.capture(event, props);
  }
}

/** Sayfa türü: kaynak belirtilmeyen tıklamalarda varsayılan "source" */
export function pageType(pathname = typeof window !== 'undefined' ? window.location.pathname : '') {
  if (pathname === '/') return 'home';
  if (/^\/tours\/[^/]+$/.test(pathname) && !/^\/tours\/(daily|overnight|international|domestic|last-minute)$/.test(pathname)) return 'tour_detail';
  if (pathname.startsWith('/tours') || pathname.endsWith('-turu')) return 'listing';
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'other';
}

/**
 * Tüm sayfadaki WhatsApp (wa.me) ve telefon (tel:) linklerini tek yerden yakalar —
 * sunucu bileşenlerindeki linkler de dahil. Kaynak: en yakın [data-track-source], yoksa sayfa türü.
 */
export function installLinkTracking() {
  const handler = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const isWa = href.includes('wa.me/') || href.includes('api.whatsapp.com');
    const isTel = href.startsWith('tel:');
    if (!isWa && !isTel) return;
    const holder = a.closest('[data-track-source]') as HTMLElement | null;
    const slug = a.closest('[data-tour-slug]')?.getAttribute('data-tour-slug') ?? undefined;
    track(isWa ? 'whatsapp_click' : 'phone_click', {
      source: holder?.dataset.trackSource ?? pageType(),
      page_type: pageType(),
      tour_slug: slug,
    });
  };
  document.addEventListener('click', handler, { capture: true });
  return () => document.removeEventListener('click', handler, { capture: true });
}
