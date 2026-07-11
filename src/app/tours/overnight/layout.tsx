import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konaklamalı Turlar 2026 | 2 Gün 1 Gece Tur Paketleri | Büyük Aytaç Travel',
  description:
    'Çerkezköy konaklamalı turlar: Kapadokya, Safranbolu, Isparta-Salda-Pamukkale ve hafta sonu kaçamak paketleri. Otel dahil turlar.',
  keywords:
    'konaklamalı tur, çerkezköy konaklamalı tur, 2 gün 1 gece tur, hafta sonu turu 2026',
  alternates: { canonical: 'https://www.buyukaytactravel.com/tours/overnight' },
};

export default function OvernightToursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
