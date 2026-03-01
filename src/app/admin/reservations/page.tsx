'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminReservations() {
  const router = useRouter();
  
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      if (!isLoggedIn) {
        router.push('/admin/login');
      }
    };
    
    checkAuth();
  }, [router]);
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Rezervasyonlar</h1>
          <p className="text-sm text-gray-600">Tur rezervasyonlarını görüntüleyin ve yönetin</p>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6 p-6 md:p-8 text-center">
        <div className="flex flex-col items-center justify-center py-8 md:py-12">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 md:h-16 md:w-16 text-blue-500 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Rezervasyon Sistemi Yakında Aktif Olacak</h2>
          <p className="text-gray-600 max-w-md mb-6 text-sm md:text-base">
            Rezervasyon yönetim sistemi şu anda geliştirme aşamasındadır.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Geliştirme Aşamasında</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">Yakında</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Planlanan Özellikler</h3>
        
        <ul className="space-y-3 text-gray-600 text-sm md:text-base">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Müşteri iletişim bilgileri yönetimi</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Tur bazlı rezervasyon takibi</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Ödeme durumu takibi</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Otomatik e-posta bildirimleri</span>
          </li>
        </ul>
      </div>
    </>
  );
}
