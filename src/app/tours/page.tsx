'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour } from '@/models/Tour';

function TourCard({ tour }: { tour: ITour }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-60 w-full">
        <div className="bg-gray-200 animate-pulse h-full w-full absolute" />
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
        <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1 m-2 text-sm font-semibold rounded">
          {tour.duration} Gün
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{tour.name}</h3>
        <p className="text-gray-600 mb-3 line-clamp-2">{tour.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">{tour.price.toLocaleString('tr-TR')} ₺</span>
          <Link 
            href={`/tours/${tour.slug}`}
            className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
          >
            Detaylar
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ToursPage() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await getTours();
        setTours(data);
        setLoading(false);
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Turlar yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Yükleme durumu
  if (loading) {
    return (
      <main className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Turlarımız</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yükleniyor...
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden h-96">
                <div className="h-60 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <main className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Turlarımız</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  // Veri yoksa yedek içerik göster
  if (tours.length === 0) {
    return (
      <main className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Turlarımız</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Şu anda gösterilecek tur bulunmuyor.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Turlarımız</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Türkiye&apos;nin güzelliklerini keşfedeceğiniz özel olarak hazırlanmış turlarımız
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour._id?.toString()} tour={tour} />
          ))}
        </div>
      </div>
    </main>
  );
} 