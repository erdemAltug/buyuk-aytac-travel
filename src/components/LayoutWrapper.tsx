'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const [showPhonePopup, setShowPhonePopup] = useState(false);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowPhonePopup(false);
    if (showPhonePopup) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showPhonePopup]);

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {/* Admin Login Button - Top Right */}
      <div className="fixed top-5 right-16 z-50 lg:right-5">
        <Link 
          href="/admin/login"
          prefetch={false}
          className="px-3 py-1.5 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full text-xs sm:text-sm font-medium shadow-md hover:bg-white transition-all duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
          </svg>
          Giriş
        </Link>
      </div>

      {/* Floating Buttons Container - Bottom Right */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        
        {/* Phone Button with Popup */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowPhonePopup(!showPhonePopup)}
            className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Hızlı iletişim"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
          </button>

          {/* Quick Action Popup - Opens to the left */}
          {showPhonePopup && (
            <div className="absolute bottom-16 right-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              {/* Header */}
              <div className="bg-blue-600 text-white px-4 py-3">
                <h3 className="font-semibold text-sm">Büyük Aytaç Travel</h3>
                <p className="text-xs text-blue-100">Hızlı iletişim ve tur arama</p>
              </div>
              
              {/* Contact Info */}
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <a href="tel:+905393459559" className="text-sm font-medium text-gray-800 hover:text-blue-600">
                    +90 539 345 95 59
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <a href="mailto:info@buyukaytactravel.com" className="text-sm font-medium text-gray-800 hover:text-blue-600">
                    info@buyukaytactravel.com
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Hızlı Tur Arama</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href="/tours?type=domestic&accommodation=daily"
                    className="text-xs px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-center transition-colors"
                    onClick={() => setShowPhonePopup(false)}
                  >
                    Günübirlik
                  </Link>
                  <Link 
                    href="/tours?type=domestic&accommodation=with_accommodation"
                    className="text-xs px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-center transition-colors"
                    onClick={() => setShowPhonePopup(false)}
                  >
                    Konaklamalı
                  </Link>
                  <Link 
                    href="/tours?type=international"
                    className="text-xs px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-center transition-colors"
                    onClick={() => setShowPhonePopup(false)}
                  >
                    Yurtdışı
                  </Link>
                  <Link 
                    href="/contact"
                    className="text-xs px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-center transition-colors"
                    onClick={() => setShowPhonePopup(false)}
                  >
                    Rezervasyon
                  </Link>
                </div>
              </div>

              {/* Quick Inquiry */}
              <div className="p-3 bg-gray-50">
                <a 
                  href="mailto:info@buyukaytactravel.com?subject=Tur Sorgulama&body=Merhaba, tur hakkında bilgi almak istiyorum."
                  className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  Email Gönder
                </a>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/905393459559"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="WhatsApp ile iletişim"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
      {children}
      <Footer />
    </>
  );
}
