'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour } from '@/models/Tour';

function TourCard({ tour }: { tour: ITour }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56 w-full bg-gray-200">
        {!imageError ? (
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500">Görsel yüklenemedi</span>
          </div>
        )}
        
        {/* İndirim Etiketi */}
        <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full shadow-lg">
          %{tour.discountRate || Math.floor(Math.random() * 20) + 10} İndirim
        </div>
        
        {/* Fiyat */}
        <div className="absolute bottom-4 right-4 bg-white text-blue-700 font-bold px-4 py-2 rounded-full shadow-lg">
          {tour.price.toLocaleString('tr-TR')} ₺
        </div>
        
        {/* Tour Name */}
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold max-w-[70%] line-clamp-1 drop-shadow-lg">
          {tour.name}
        </h3>
      </div>
      
      <div className="p-5">
        <p className="text-gray-600 mb-4 line-clamp-2 h-12">{tour.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500">{tour.destination}</span>
          </div>
          
          <Link 
            href={`/tours/${tour.slug}`}
            className="relative inline-flex items-center group-hover:text-blue-700 font-medium text-sm text-blue-600 transition-colors"
          >
            <span className="mr-6">Detaylar</span>
            <span className="absolute right-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LastMinuteDealsPage() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Sadece son dakika fırsatı olarak işaretlenmiş turları getir
        const data = await getTours({ isActive: true, isLastMinute: true });
        setTours(data);
        setLoading(false);
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Son dakika fırsatlarını yüklerken bir hata oluştu');
        setLoading(false);
      }
    };
    
    fetchTours();
  }, []);
  
  // Loading durumunda göster
  if (loading) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Fırsatlar yükleniyor...</p>
          </div>
        </div>
      </main>
    );
  }
  
  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Son Dakika Fırsatları</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }
  
  // Veri yoksa yedek içerik göster
  if (tours.length === 0) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Son Dakika Fırsatları</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Şu anda aktif son dakika fırsatı bulunmuyor. Lütfen daha sonra tekrar kontrol edin.
            </p>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Son Dakika Fırsatları</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kaçırılmayacak indirimlerle son dakika tur fırsatlarımızı keşfedin. Kontenjanlar sınırlıdır.
          </p>
        </div>
        
        {/* Aciliyet Bildirimi */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-center">
          <div className="mr-4 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-amber-800">Acele Edin!</h3>
            <p className="text-amber-700">Bu fırsatlar çok kısa süreliğine geçerlidir. Kontenjanlar dolmadan rezervasyonunuzu yapın.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour._id?.toString()} tour={tour} />
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-semibold mb-4">Fırsatları Kaçırmamak İçin</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Son dakika fırsatlarından haberdar olmak için sosyal medya hesaplarımızı takip edebilir veya iletişim bilgilerinizi bırakabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-block bg-white text-red-600 hover:bg-red-50 font-medium rounded-lg px-5 py-2.5 transition-colors"
            >
              İletişime Geçin
            </Link>
            <Link 
              href="/tours" 
              className="inline-block bg-transparent text-white border border-white hover:bg-white/10 font-medium rounded-lg px-5 py-2.5 transition-colors"
            >
              Tüm Turları İnceleyin
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 