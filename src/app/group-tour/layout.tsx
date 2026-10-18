import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Özel Grup Turu Talebi',
  description:
    'Çerkezköy çıkışlı özel grup turu talebi. Tarih, destinasyon ve grup büyüklüğüne göre yurtiçi ve yurtdışı program.',
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/group-tour',
  },
};

export default function GroupTourLayout({ children }: { children: React.ReactNode }) {
  return children;
}
