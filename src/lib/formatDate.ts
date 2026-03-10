/**
 * Hydration uyumu için sabit timezone ile tarih formatlama.
 * Sunucu (UTC) ve istemci (yerel) farklı çıktı üretmesin diye Europe/Istanbul zorlanıyor.
 */

const TZ = 'Europe/Istanbul';

/** Örn: "20 Mart 2026" */
export function formatDateLong(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return date.toLocaleDateString('tr-TR', {
    timeZone: TZ,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Örn: "20 Mar Cum" (haftanın günü kısa, gün, ay kısa) */
export function formatDateShort(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return date.toLocaleDateString('tr-TR', {
    timeZone: TZ,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
}

/** Copyright için yıl — sunucu/istemci aynı olsun diye sabit timezone */
export function getCurrentYear(): number {
  const y = new Date().toLocaleDateString('en-CA', { timeZone: TZ, year: 'numeric' });
  return Number(y);
}
