'use client';

import { useState, useEffect } from 'react';
import { getTours } from '@/services/tourService';
import { ITour, TourType } from '@/models/Tour';
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

export default function InternationalToursPage() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Sadece yurtdışı ve aktif turları getir
        const data = await getTours({ isActive: true });
        // Client tarafında TourType.INTERNATIONAL türündeki turları filtrele
        const internationalTours = data.filter(tour => tour.tourType === TourType.INTERNATIONAL);
        setTours(internationalTours);
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Yurtdışı Turlarımız</h1>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Yurtdışı Turlarımız</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Şu anda gösterilecek yurtdışı tur bulunmuyor.
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Yurtdışı Turlarımız</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dünyanın eşsiz yerlerini keşfedeceğiniz özel olarak hazırlanmış yurtdışı turlarımız
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour._id?.toString()} tour={tour} />
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Vize Hizmetleri</h2>
          <p className="mb-6">
            Yurtdışı turlarımızda vize işlemleriniz için destek sağlıyoruz. Gerekli evraklar ve prosedürler hakkında bilgi almak için bizimle iletişime geçin.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium rounded-lg px-5 py-2.5 transition-colors"
          >
            Vize Bilgisi Al
          </Link>
        </div>
      </div>
    </main>
  );
} 