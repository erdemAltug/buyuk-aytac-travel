'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-[100vh] w-full bg-navy-900 text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url("https://buyukaytactravel.com/wp-content/uploads/2024/12/bintur_header.jpg")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>
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
            <Link href="/tours" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition duration-300 inline-flex items-center transform hover:scale-105">
              Tüm Turlarımız
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="/tours/domestic" className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full inline-flex items-center transition duration-300 transform hover:scale-105">
              Yurtiçi Turlar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
    </div>
  );
} 