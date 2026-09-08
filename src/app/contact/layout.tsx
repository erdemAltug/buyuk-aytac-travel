import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "İletişim | Büyük Aytaç Travel - Çerkezköy, Tekirdağ ve Çorlu'dan Tur Rezervasyonu",
  description:
    "Büyük Aytaç Travel iletişim bilgileri ve rezervasyon formu. Çerkezköy ofisimize gelerek veya telefonla arayarak Tekirdağ ve çevre ilçelerden tur rezervasyonu yapabilirsiniz.",
  keywords:
    'Büyük Aytaç Travel iletişim, Çerkezköy tur rezervasyon, Çorlu tur rezervasyon, seyahat acentesi telefon, Tekirdağ tur rezervasyon, Çerkezköy tur şirketi adres',
  openGraph: {
    title: "İletişim | Büyük Aytaç Travel",
    description:
      'Çerkezköy ofis iletişimi ve tur rezervasyon formu. 0530 060 95 59 · 0539 345 95 59.',
    url: 'https://www.buyukaytactravel.com/contact',
    siteName: 'Büyük Aytaç Travel',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/LOGO.png',
        width: 1200,
        height: 630,
        alt: 'Büyük Aytaç Travel İletişim',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
