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
  title: "Büyük Aytaç Travel | Çerkezköy'den Yurtiçi ve Yurtdışı Turlar",
  description: "Çerkezköy'den kalkan yurtiçi ve yurtdışı turlar, günübirlik ve konaklamalı tur paketleri. Büyük Aytaç Travel ile güvenli ve uygun fiyatlı tur deneyimi yaşayın.",
  keywords: "tur, seyahat, çerkezköy tur, yurtiçi turlar, yurtdışı turlar, günübirlik turlar, konaklamalı turlar, gezi, tatil, turizm",
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
    title: "Büyük Aytaç Travel | Çerkezköy'den Yurtiçi ve Yurtdışı Turlar",
    description: "Çerkezköy'den kalkan yurtiçi ve yurtdışı turlar, günübirlik ve konaklamalı tur paketleri. Büyük Aytaç Travel ile güvenli ve uygun fiyatlı tur deneyimi yaşayın.",
    url: "https://www.buyukaytactravel.com",
    siteName: 'Büyük Aytaç Travel',
    images: [
      {
        url: '/images/LOGO.png',
        width: 1200,
        height: 630,
        alt: 'Büyük Aytaç Travel Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Büyük Aytaç Travel | Çerkezköy'den Yurtiçi ve Yurtdışı Turlar",
    description: "Çerkezköy'den kalkan yurtiçi ve yurtdışı turlar, günübirlik ve konaklamalı tur paketleri. Büyük Aytaç Travel ile güvenli ve uygun fiyatlı tur deneyimi yaşayın.",
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
    google: 'google-site-verification-code', // Google Search Console doğrulama kodu ekleyin
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
  return (
    <html lang="tr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/LOGO.png" />
        <link rel="apple-touch-icon" href="/images/LOGO.png" />
        <link rel="shortcut icon" href="/images/LOGO.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Navbar />
          <div className="fixed top-5 right-5 z-50">
            <Link 
              href="/admin/login" 
              className="px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full text-sm font-medium shadow-md hover:bg-white transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>
              Giriş Yap
            </Link>
          </div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
