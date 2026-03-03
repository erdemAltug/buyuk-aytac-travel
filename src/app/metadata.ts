import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Büyük Aytaç Travel | Çerkezköy Tur, Günübirlik ve Konaklamalı Turlar',
  description: 'Çerkezköy\'nin en güvenilir tur acentesi Büyük Aytaç Travel. Çerkezköy, Çorlu ve Tekirdağ\'dan günübirlik turlar, konaklamalı turlar, yurtiçi ve yurtdışı turlar. TÜRSAB üyesi, 20 yıllık deneyim.',
  keywords: 'çerkezköy tur, çerkezköy tur firmaları, çerkezköy günübirlik tur, çerkezköy konaklamalı tur, çerkezköy tur paketleri, günübirlik tur, konaklamalı tur, yurtiçi tur, yurtdışı tur, çorlu tur, tekirdag tur, trakya tur',
  openGraph: {
    title: 'Büyük Aytaç Travel | Çerkezköy Tur, Günübirlik ve Konaklamalı Turlar',
    description: 'Çerkezköy\'nin en güvenilir tur acentesi. Günübirlik turlar, konaklamalı turlar, yurtiçi ve yurtdışı turlar.',
    url: 'https://www.buyukaytactravel.com',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/hero-banner.jpg',
        width: 1920,
        height: 1080,
        alt: 'Büyük Aytaç Travel - Çerkezköy Tur Acentesi',
      },
    ],
    siteName: 'Büyük Aytaç Travel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Büyük Aytaç Travel | Çerkezköy Tur Acentesi',
    description: 'Çerkezköy\'nin en güvenilir tur acentesi. Günübirlik ve konaklamalı turlar.',
    images: ['https://www.buyukaytactravel.com/images/hero-banner.jpg'],
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com',
    languages: {
      'tr-TR': 'https://www.buyukaytactravel.com',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
