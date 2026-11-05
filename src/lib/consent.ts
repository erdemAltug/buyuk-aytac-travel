/**
 * Çerez onayı (KVKK). Karar tarayıcıda saklanır; analitik araçları bu karara göre davranır:
 * - karar yok   → PostHog çerezsiz (yalnızca bellek), GA "consent denied" modunda
 * - granted     → PostHog çerez/localStorage kullanır, GA analytics_storage açılır
 * - denied      → PostHog hiç olay göndermez, GA denied kalır
 */

export type Consent = 'granted' | 'denied';

const KEY = 'bat-cookie-consent';
export const CONSENT_EVENT = 'bat:consent-change';
export const OPEN_CONSENT_EVENT = 'bat:open-consent';

type Gtag = (...args: unknown[]) => void;

export function getConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Gizli sekme vb.: karar yalnızca bu sayfa için geçerli olur
  }
  if (value === 'denied') clearAnalyticsStorage();
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.('consent', 'update', { analytics_storage: value === 'granted' ? 'granted' : 'denied' });
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }));
}

/** Önceden kabul edilip sonra reddedilirse PostHog ve GA'nın bıraktığı çerez/kayıtları sil */
function clearAnalyticsStorage() {
  const isAnalytics = (name: string) => name.startsWith('ph_') || name === '_ga' || name.startsWith('_ga_');
  try {
    Object.keys(window.localStorage).filter(isAnalytics).forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // erişim yoksa silinecek bir şey de yoktur
  }
  const host = window.location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  for (const raw of document.cookie.split(';')) {
    const name = raw.split('=')[0].trim();
    if (!isAnalytics(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
    }
  }
}

/** Footer'daki "Çerez tercihleri" bağlantısı için */
export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
