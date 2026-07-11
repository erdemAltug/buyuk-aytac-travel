import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Son Dakika Turları 2026 | İndirimli Tur Fırsatları | Büyük Aytaç Travel',
  description:
    'Son dakika tur fırsatları. Çerkezköyden kalkan indirimli günübirlik ve konaklamalı turlar. Kontenjanlar sınırlı.',
  keywords: 'son dakika tur, son dakika turlar, indirimli tur, çerkezköy tur fırsatları',
  alternates: { canonical: 'https://www.buyukaytactravel.com/tours/last-minute' },
};

export default function LastMinuteToursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
