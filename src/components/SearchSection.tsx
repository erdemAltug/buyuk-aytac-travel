'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TourType, AccommodationType } from '@/models/Tour';

export default function SearchSection() {
  const router = useRouter();
  
  const [searchParams, setSearchParams] = useState({
    destination: '',
    tourType: '',
    accommodationType: '',
    priceRange: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string
    const queryParams = new URLSearchParams();
    
    if (searchParams.destination) {
      queryParams.append('destination', searchParams.destination);
    }
    
    if (searchParams.tourType) {
      queryParams.append('tourType', searchParams.tourType);
    }
    
    if (searchParams.accommodationType) {
      queryParams.append('accommodationType', searchParams.accommodationType);
    }
    
    if (searchParams.priceRange) {
      const [min, max] = searchParams.priceRange.split('-');
      if (min) queryParams.append('minPrice', min);
      if (max) queryParams.append('maxPrice', max);
    }
    
    // Navigate to tours page with search params
    router.push(`/tours?${queryParams.toString()}`);
  };
  
  return (
    <div className="py-12 mt-10 mb-12 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-blue-600 rounded-xl shadow-xl overflow-hidden">
          <div className="px-6 py-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-1">Hayalinizdeki Turu Bulun</h2>
            <p className="text-blue-100 text-sm">İhtiyaçlarınıza uygun turu hemen arayın</p>
          </div>
          
          <div className="bg-white px-6 py-6 rounded-b-xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                    Nereye Gitmek İstiyorsunuz?
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      placeholder="Örn: Kapadokya, İzmir, Alaçatı..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchParams.destination}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="tourType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tur Tipi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <select
                      id="tourType"
                      name="tourType"
                      className="w-full pl-10 pr-8 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      value={searchParams.tourType}
                      onChange={handleChange}
                    >
                      <option value="">Hepsi</option>
                      <option value={TourType.DOMESTIC}>Yurtiçi</option>
                      <option value={TourType.INTERNATIONAL}>Yurtdışı</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="accommodationType" className="block text-sm font-medium text-gray-700 mb-1">
                    Konaklama
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <select
                      id="accommodationType"
                      name="accommodationType"
                      className="w-full pl-10 pr-8 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      value={searchParams.accommodationType}
                      onChange={handleChange}
                    >
                      <option value="">Hepsi</option>
                      <option value={AccommodationType.WITH_ACCOMMODATION}>Konaklamalı</option>
                      <option value={AccommodationType.DAILY}>Günübirlik</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                    Fiyat Aralığı
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <select
                      id="priceRange"
                      name="priceRange"
                      className="w-full pl-10 pr-8 py-2 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      value={searchParams.priceRange}
                      onChange={handleChange}
                    >
                      <option value="">Tüm Fiyatlar</option>
                      <option value="0-5000">0₺ - 5.000₺</option>
                      <option value="5000-10000">5.000₺ - 10.000₺</option>
                      <option value="10000-20000">10.000₺ - 20.000₺</option>
                      <option value="20000-">20.000₺ ve üzeri</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                  Tur Ara
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 