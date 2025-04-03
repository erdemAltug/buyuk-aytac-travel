'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-[100vh] w-full bg-navy-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-banner.jpg"
          alt="Hero Banner"
          fill
          className="object-cover object-center brightness-75"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/50"></div>
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Yeni Yerler, Yeni Maceralar
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl font-light">
            Profesyonel rehberler eşliğinde, güvenli ve konforlu bir şekilde yeni yerler keşfedin.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/tours"
              className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Tüm Turlarımız
            </Link>
            
            <Link 
              href="/tours/domestic"
              className="px-6 py-3 rounded-full bg-white text-blue-800 font-medium hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Yurtiçi Turlar
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
    </div>
  );
} 