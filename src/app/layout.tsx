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
  title: "Büyük Aytaç Seyahat - Türkiye'nin En İyi Tur Deneyimleri",
  description: "Büyük Aytaç Seyahat ile Türkiye'nin ve dünyanın güzelliklerini keşfedin. En uygun fiyatlı tur paketleri ve özel seyahat fırsatları.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
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
              Admin Girişi
            </Link>
          </div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
