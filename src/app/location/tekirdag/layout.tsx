import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tekirdağ'dan Başlayan Turlar",
  description:
    "Tekirdağ, Çerkezköy ve Çorlu çıkışlı günübirlik ve konaklamalı turlar. Trakya'dan kalkan yurtiçi ve yurtdışı programlar.",
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/location/tekirdag',
  },
};

export default function TekirdagLayout({ children }: { children: React.ReactNode }) {
  return children;
}
