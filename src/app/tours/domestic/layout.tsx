import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yurtiçi Turlar 2026 | Çerkezköyden Yurtiçi Tur Paketleri | Büyük Aytaç Travel',
  description:
    'Çerkezköy yurtiçi turlar: Kapadokya, Safranbolu, Ege adaları, Karadeniz, GAP ve Marmara rotaları. Günübirlik ve konaklamalı paketler.',
  keywords:
    'yurtiçi tur, çerkezköy yurtiçi tur, yurtiçi turlar 2026, trakya turları, türkiye turları',
  alternates: { canonical: 'https://www.buyukaytactravel.com/tours/domestic' },
};

export default function DomesticToursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
