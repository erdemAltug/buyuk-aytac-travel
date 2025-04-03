'use client';

import { useState, useEffect } from 'react';
import { getTours } from '@/services/tourService';
import { ITour, AccommodationType } from '@/models/Tour';
import Link from 'next/link';
import Image from 'next/image';

function TourCard({ tour }: { tour: ITour }) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-56 w-full">
        {!imageError ? (
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Görsel yüklenemedi</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{tour.name}</h3>
        <p className="text-sm text-gray-500 mb-1">
          {tour.destinationId && typeof tour.destinationId === 'object' && 'name' in tour.destinationId ? 
            (tour.destinationId.name as string) : ''}
        </p>
        <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">{tour.price.toLocaleString('tr-TR')} ₺</span>
          <Link 
            href={`/tours/${tour.slug}`} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-3 py-1.5 text-sm transition-colors"
          >
            Detaylar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DailyToursPage() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Sadece aktif turları getir
        const data = await getTours({ isActive: true });
        // Client tarafında AccommodationType.DAILY türündeki turları filtrele
        const dailyTours = data.filter(tour => tour.accommodationType === AccommodationType.DAILY);
        setTours(dailyTours);
        setLoading(false);
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Turları yüklerken bir hata oluştu');
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
            <p className="mt-2 text-gray-600">Turlar yükleniyor...</p>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Günübirlik Turlarımız</h1>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Günübirlik Turlarımız</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Şu anda gösterilecek günübirlik tur bulunmuyor.
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Günübirlik Turlarımız</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tek günde unutulmaz deneyimler yaşayacağınız özel olarak hazırlanmış günübirlik turlarımız
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour._id?.toString()} tour={tour} />
          ))}
        </div>
        
        <div className="mt-12 bg-emerald-50 rounded-lg p-8 border border-emerald-200">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Günübirlik Turların Avantajları</h2>
          <ul className="space-y-3 text-emerald-700">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Kısa sürede yeni yerler keşfetme imkanı</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Ekonomik fiyatlar ve uygun seçenekler</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Konaklama endişesi olmadan rahat seyahat</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Hafta sonu kaçamakları için ideal seçenek</span>
            </li>
          </ul>
          <div className="mt-6 text-center">
            <Link 
              href="/contact" 
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg px-5 py-2.5 transition-colors"
            >
              Daha Fazla Bilgi Al
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 