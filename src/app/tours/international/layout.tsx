import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yurtdışı Turlar 2026 | Balkan ve Vizesiz Turlar | Büyük Aytaç Travel',
  description:
    'Çerkezköy çıkışlı yurtdışı turlar. Balkan turları, vizesiz rotalar, Belgrad, Saraybosna, Budva. Trakya çıkışlı avantajı.',
  keywords:
    'yurtdışı tur, balkan turları, vizesiz yurtdışı tur, çerkezköy yurtdışı tur, trakya balkan turu',
  alternates: { canonical: 'https://www.buyukaytactravel.com/tours/international' },
};

export default function InternationalToursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
