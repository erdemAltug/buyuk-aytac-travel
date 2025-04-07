'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hata loglaması yapılabilir
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="relative h-64 w-64 mx-auto mb-8">
          <Image 
            src="/images/LOGO.png" 
            alt="Büyük Aytaç Travel Logo" 
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 256px"
          />
        </div>
        
        <h1 className="text-6xl font-bold text-blue-600 mb-4">500</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sunucu Hatası</h2>
        
        <p className="text-lg text-gray-600 mb-10">
          Üzgünüz, bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyin veya bizimle iletişime geçin.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors mx-auto max-w-xs w-full"
          >
            Tekrar Dene
          </button>
          
          <Link href="/" className="block text-blue-600 hover:text-blue-800 font-medium">
            Ana Sayfaya Dön
          </Link>
          
          <Link href="/contact" className="block text-blue-600 hover:text-blue-800 font-medium">
            Bizimle İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  );
} 