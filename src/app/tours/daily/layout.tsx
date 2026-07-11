import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Günübirlik Turlar 2026 | Çerkezköyden Günübirlik Geziler | Büyük Aytaç Travel',
  description:
    'Çerkezköy günübirlik turlar 2026. Gökçeada, Bozcaada, Ayvalık, Bursa, İstanbul, Assos ve Kaz Dağları günübirlik geziler. Erken rezervasyon.',
  keywords:
    'günübirlik tur, çerkezköy günübirlik tur, günübirlik turlar 2026, ada turları, trakya günübirlik',
  alternates: { canonical: 'https://www.buyukaytactravel.com/tours/daily' },
};

export default function DailyToursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
