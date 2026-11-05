'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { flushPending, installLinkTracking } from '@/lib/analytics';
import { CONSENT_EVENT, getConsent, type Consent } from '@/lib/consent';
import CookieConsent from '@/components/CookieConsent';

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !posthog.__loaded || posthog.has_opted_out_capturing()) return;
    if (pathname.startsWith('/admin')) return;

    let url = window.origin + pathname;
    const search = searchParams.toString();
    if (search) url += `?${search}`;

    posthog.capture('$pageview', { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => installLinkTracking(), []);

  // Çerez kararı değişince PostHog'u ona uydur (bkz. src/lib/consent.ts)
  useEffect(() => {
    const apply = (e: Event) => {
      const value = (e as CustomEvent<Consent>).detail;
      if (!posthog.__loaded) {
        // Daha önce reddedildiği için hiç başlatılmamıştı; sonradan kabul edilirse yeniden yükle
        if (value === 'granted') window.location.reload();
        return;
      }
      if (value === 'granted') {
        posthog.opt_in_capturing();
        posthog.set_config({ persistence: 'localStorage+cookie' });
      } else {
        posthog.opt_out_capturing();
        posthog.set_config({ persistence: 'memory' });
      }
    };
    window.addEventListener(CONSENT_EVENT, apply);
    return () => window.removeEventListener(CONSENT_EVENT, apply);
  }, []);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!token || !host || posthog.__loaded) return;

    // PostHog kendi <script> etiketini sayfadaki ilk script'in önüne ekliyor. Bu, React sayfayı
    // hidrate etmeden olursa JSON-LD script'leriyle "hydration mismatch" hatası veriyordu.
    // Bu yüzden sayfa tamamen yüklendikten ve tarayıcı boşa çıktıktan sonra başlatıyoruz.
    const start = () => {
      const consent = getConsent();
      if (consent === 'denied') return;
      posthog.init(token, {
        api_host: host,
        person_profiles: 'identified_only',
        capture_pageview: false,
        capture_pageleave: true,
        // Onay yokken çerez/localStorage yazılmaz; ziyaret yalnızca bellekte, anonim sayılır
        persistence: consent === 'granted' ? 'localStorage+cookie' : 'memory',
        loaded: () => {
          posthog.capture('$pageview', { $current_url: window.location.href });
          flushPending();
        },
      });
    };
    const idle = () =>
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(start, { timeout: 3000 })
        : window.setTimeout(start, 1500);

    if (document.readyState === 'complete') {
      idle();
    } else {
      window.addEventListener('load', idle, { once: true });
      return () => window.removeEventListener('load', idle);
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
      <CookieConsent />
    </PHProvider>
  );
}
