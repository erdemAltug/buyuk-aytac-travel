import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Büyük Aytaç Travel | Çerkezköy, Tekirdağ ve Çorlu'dan Yurtiçi ve Yurtdışı Turlar",
  description: "Çerkezköy, Tekirdağ ve Çorlu'dan günübirlik ve konaklamalı turlar. TÜRSAB üyesi Büyük Aytaç Travel ile güvenli, uygun fiyatlı tur deneyimi.",
  keywords: "çerkezköy tur, tekirdağ tur, çorlu tur, günübirlik turlar, konaklamalı turlar, yurtiçi turlar, yurtdışı turlar, seyahat acentesi, tur operatörü, TÜRSAB üyesi, büyük aytaç travel, trakya turları",
  authors: [{ name: "Büyük Aytaç Travel" }],
  creator: "Büyük Aytaç Travel",
  publisher: "Büyük Aytaç Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.buyukaytactravel.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Büyük Aytaç Travel | Çerkezköy'den En İyi Tur Deneyimi",
    description: "Çerkezköy, Tekirdağ ve Çorlu'dan günübirlik ve konaklamalı turlar. TÜRSAB üyesi Büyük Aytaç Travel ile güvenli, uygun fiyatlı tur deneyimi.",
    url: "https://www.buyukaytactravel.com",
    siteName: 'Büyük Aytaç Travel',
    images: [
      {
        url: '/images/LOGO.png',
        width: 1200,
        height: 630,
        alt: 'Büyük Aytaç Travel - Çerkezköy Tur Operatörü Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Büyük Aytaç Travel | Çerkezköy'den En İyi Tur Deneyimi",
    description: "Çerkezköy, Tekirdağ ve Çorlu'dan günübirlik ve konaklamalı turlar. TÜRSAB üyesi Büyük Aytaç Travel ile güvenli, uygun fiyatlı tur deneyimi.",
    images: ['/images/LOGO.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'travel',
  verification: {
    google: 'xxxxxxxxxxxxxxxxxxxx', // Google Search Console doğrulama kodunuzu buraya ekleyin
  },
  icons: {
    icon: [
      { url: '/images/LOGO.png' },
      { url: '/images/LOGO.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/LOGO.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/LOGO.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/LOGO.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/images/LOGO.png' },
      { url: '/images/LOGO.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/images/LOGO.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Organization schema.org yapılandırılmış verisi
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Büyük Aytaç Travel",
    "url": "https://www.buyukaytactravel.com",
    "logo": "https://www.buyukaytactravel.com/images/LOGO.png",
    "sameAs": [
      "https://www.facebook.com/buyukaytactravel",
      "https://www.instagram.com/buyukaytactravel",
      "https://twitter.com/buyukaytactravel"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "İsmetpaşa Mahallesi, Cumhuriyet Caddesi",
      "addressLocality": "Çerkezköy",
      "addressRegion": "Tekirdağ",
      "postalCode": "59500",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.2861",
      "longitude": "27.9811"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "telephone": "+902828000000",
    "email": "info@buyukaytactravel.com",
    "priceRange": "$$"
  };

  return (
    <html lang="tr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/LOGO.png" />
        <link rel="apple-touch-icon" href="/images/LOGO.png" />
        <link rel="shortcut icon" href="/images/LOGO.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Navbar />
          <div className="fixed top-5 right-16 z-50 lg:right-5">
            <Link 
              href="/admin/login" 
              className="px-3 py-1.5 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full text-xs sm:text-sm font-medium shadow-md hover:bg-white transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>
              Giriş
            </Link>
          </div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
