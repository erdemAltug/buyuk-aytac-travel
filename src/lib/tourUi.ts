/**
 * Tur arayüzü yardımcıları — sunucu ve istemci bileşenlerinde güvenle kullanılabilir.
 */
import type { ITour } from '@/types/tour';

const TZ = 'Europe/Istanbul';

export const WHATSAPP_NUMBER = '905393459559';
export const PHONE_DISPLAY = '0539 345 95 59';
export const PHONE_TEL = '+905393459559';

export function finalPrice(tour: Pick<ITour, 'price' | 'discountRate'>): number {
  return tour.discountRate && tour.discountRate > 0
    ? Math.round(tour.price * (1 - tour.discountRate / 100))
    : tour.price;
}

export function formatTL(value: number): string {
  return `${Math.round(value).toLocaleString('tr-TR')} ₺`;
}

export function toDate(value?: Date | string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Takvim rozetinde kullanılacak parçalar: { day: "09", month: "Ara", weekday: "Çar" } */
export function dateParts(value?: Date | string | null) {
  const d = toDate(value);
  if (!d) return null;
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString('tr-TR', { timeZone: TZ, ...opts });
  return {
    day: fmt({ day: '2-digit' }),
    month: fmt({ month: 'short' }).replace('.', ''),
    weekday: fmt({ weekday: 'short' }),
    year: fmt({ year: 'numeric' }),
  };
}

/** "9–11 Aralık" / "29 Ağustos Cmt" gibi okunabilir tarih aralığı */
export function formatDateRange(start?: Date | string | null, end?: Date | string | null): string | null {
  const s = toDate(start);
  if (!s) return null;
  const e = toDate(end);
  const opt = (o: Intl.DateTimeFormatOptions) => s.toLocaleDateString('tr-TR', { timeZone: TZ, ...o });
  if (!e || e.toDateString() === s.toDateString()) {
    return `${opt({ day: 'numeric', month: 'long' })} ${opt({ weekday: 'short' })}`;
  }
  const sameMonth =
    s.toLocaleDateString('tr-TR', { timeZone: TZ, month: 'numeric' }) ===
    e.toLocaleDateString('tr-TR', { timeZone: TZ, month: 'numeric' });
  if (sameMonth) {
    return `${opt({ day: 'numeric' })}–${e.toLocaleDateString('tr-TR', { timeZone: TZ, day: 'numeric', month: 'long' })}`;
  }
  return `${opt({ day: 'numeric', month: 'short' })} – ${e.toLocaleDateString('tr-TR', { timeZone: TZ, day: 'numeric', month: 'short' })}`;
}

/** Ay filtresi için anahtar: "2026-12" */
export function monthKey(value?: Date | string | null): string | null {
  const d = toDate(value);
  if (!d) return null;
  const y = d.toLocaleDateString('en-CA', { timeZone: TZ, year: 'numeric' });
  const m = d.toLocaleDateString('en-CA', { timeZone: TZ, month: '2-digit' });
  return `${y}-${m}`;
}

export function monthLabel(key: string): string {
  const [y, m] = key.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1, 15));
  return d.toLocaleDateString('tr-TR', { timeZone: 'UTC', month: 'long' });
}

export function isUpcoming(tour: Pick<ITour, 'startDate' | 'endDate'>, now = new Date()): boolean {
  const end = toDate(tour.endDate);
  const start = toDate(tour.startDate);
  if (end && end >= now) return true;
  if (start && start >= now) return true;
  return false;
}

/** Yaklaşan turlar önce (tarihe göre), sonra tarihsiz, en son geçmiş turlar (yeniden eskiye) */
export function sortForDisplay<T extends Pick<ITour, 'startDate' | 'endDate'>>(tours: T[], now = new Date()): T[] {
  const rank = (t: T) => (isUpcoming(t, now) ? 0 : toDate(t.startDate) ? 2 : 1);
  return [...tours].sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    if (ra !== rb) return ra - rb;
    const ta = toDate(a.startDate)?.getTime() ?? 0;
    const tb = toDate(b.startDate)?.getTime() ?? 0;
    return ra === 2 ? tb - ta : ta - tb;
  });
}

/** Turun başlangıcına kalan gün (bugün = 0). Geçmişse null. */
export function daysUntil(value?: Date | string | null, now = new Date()): number | null {
  const d = toDate(value);
  if (!d) return null;
  const diff = d.getTime() - now.getTime();
  if (diff < -86_400_000) return null;
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

/** Tur adındaki tarih ekini at: "Assos Turu - 12 Eylül 2026" → "Assos Turu" */
export function shortTourName(name: string): string {
  const cleaned = name
    .replace(/\s*[-–—]\s*\d{1,2}([-–]\d{1,2})?\s+[A-Za-zÇĞİÖŞÜçğıöşü]+(\s+\d{4})?.*$/u, '')
    .trim();
  const base = cleaned.length >= 4 ? cleaned : name;
  // TAMAMI BÜYÜK HARF başlıkları okunur hale getir
  if (base === base.toLocaleUpperCase('tr-TR') && /[A-ZÇĞİÖŞÜ]{4,}/u.test(base)) {
    return base
      .toLocaleLowerCase('tr-TR')
      .split(' ')
      .map((w) => (w ? w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1) : w))
      .join(' ');
  }
  return base;
}

/**
 * Aynı programın farklı tarihli kayıtlarını (ör. 9–11 ve 11–13 Aralık Konya) tek kartta topla.
 * Girdi sıralı olmalı (sortForDisplay); her grubun ilk turu gösterilir, kalanlar `others` olur.
 */
export function groupDepartures<T extends Pick<ITour, 'name'>>(tours: T[]): { tour: T; others: T[] }[] {
  const groups = new Map<string, { tour: T; others: T[] }>();
  for (const t of tours) {
    const key = shortTourName(t.name).toLocaleLowerCase('tr-TR');
    const g = groups.get(key);
    if (g) g.others.push(t);
    else groups.set(key, { tour: t, others: [] });
  }
  return [...groups.values()];
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function tourWhatsappLink(tour: Pick<ITour, 'name' | 'slug'>): string {
  return whatsappLink(
    `Merhaba, "${tour.name}" turu hakkında bilgi almak istiyorum. https://www.buyukaytactravel.com/tours/${tour.slug}`
  );
}

export function isDaily(tour: Pick<ITour, 'accommodationType'>): boolean {
  return tour.accommodationType === 'daily';
}
