import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from '@/components/LayoutWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Büyük Aytaç Travel | Çerkezköy Tur, Tekirdağ, Çorlu Tur ve Seyahat",
    template: "%s | Büyük Aytaç Travel"
  },
  description: "Çerkezköy tur ve seyahat için en iyi seçenekler! Tekirdağ, Çorlu, Trakya bölgesinden günübirlik ve konaklamalı turlar. TÜRSAB üyesi güvenilir tur operatörünüz.",
  keywords: [
    "çerkezköy tur",
    "çerkezköy seyahat",
    "çerkezköy tur operatörü",
    "tekirdağ tur",
    "tekirdağ seyahat",
    "çorlu tur",
    "çorlu seyahat",
    "trakya turları",
    "günübirlik tur çerkezköy",
    "hafta sonu tur çerkezköy",
    "yurtiçi turlar",
    "yurtdışı turlar",
    "tur acentesi çerkezköy",
    "TÜRSAB üyesi tur",
    "büyük aytaç travel"
  ].join(", "),
  authors: [{ name: "Büyük Aytaç Travel" }],
  creator: "Büyük Aytaç Travel",
  publisher: "Büyük Aytaç Travel",
  category: "Travel",
  classification: "Seyahat ve Turizm",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.buyukaytactravel.com'),
  alternates: {
    canonical: '/',
    languages: {
      'tr': '/',
    },
  },
  openGraph: {
    title: "Büyük Aytaç Travel | Çerkezköy Tur ve Seyahat",
    description: "Çerkezköy, Tekirdağ ve Çorlu'dan en iyi turlar. Günübirlik ve konaklamalı tur seçenekleri. TÜRSAB üyesi güvenilir tur operatörünüz.",
    url: "https://www.buyukaytactravel.com",
    siteName: 'Büyük Aytaç Travel',
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: '/images/LOGO.png',
        width: 1200,
        height: 630,
        alt: 'Büyük Aytaç Travel - Çerkezköy Tur Operatörü Logo',
        type: 'image/png',
      },
      {
        url: '/images/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Büyük Aytaç Travel Tur Deneyimleri',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Büyük Aytaç Travel | Çerkezköy Tur",
    description: "Çerkezköy, Tekirdağ ve Çorlu'dan en iyi turlar. TÜRSAB üyesi güvenilir tur operatörünüz.",
    images: ['/images/LOGO.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'travel',
  other: {
    'geo.region': 'TR-59',
    'geo.placename': 'Çerkezköy',
    'ICBM': '41.2833, 28.0000',
  },
  verification: {
    google: 'your-google-search-console-verification-code-here', // Google Search Console doğrulama kodunuzu buraya ekleyin
    yandex: 'your-yandex-verification-code-here', // Yandex Webmaster doğrulama kodu
    yahoo: 'your-yahoo-verification-code-here', // Yahoo doğrulama kodu
  },
  applicationName: 'Büyük Aytaç Travel',
  referrer: 'origin-when-cross-origin',
  other: {
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes',
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
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `
        }} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
