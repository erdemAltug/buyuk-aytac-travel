'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-banner.jpg"
          alt="Çerkezköy'den Yurtiçi ve Yurtdışı Turlar - Büyük Aytaç Travel ile Unutulmaz Seyahat Deneyimleri"
          fill
          className="object-cover object-center brightness-75"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-indigo-900/40"></div>
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            Çerkezköy'den Yeni Yerler, Yeni Maceralar
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl font-light text-white">
            TÜRSAB üyesi Büyük Aytaç Travel ile profesyonel rehberler eşliğinde, güvenli ve konforlu seyahat deneyimi yaşayın.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/tours"
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              aria-label="Büyük Aytaç Travel tüm tur programlarını görüntüle"
            >
              Tüm Turlarımız
            </Link>
            
            <Link 
              href="/tours?tourType=domestic"
              className="px-6 py-3 rounded-full bg-white text-blue-800 font-medium hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              aria-label="Çerkezköy'den kalkan yurtiçi turları incele"
            >
              Yurtiçi Turlar
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-transparent to-transparent"></div>
    </div>
  );
} 