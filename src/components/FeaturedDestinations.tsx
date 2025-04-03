'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDestinations } from '@/services/destinationService';
import { IDestination } from '@/models/Destination';

function DestinationCard({ destination }: { destination: IDestination }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative h-60 w-full">
        <div className="bg-gray-200 animate-pulse h-full w-full absolute" />
        {!imageError ? (
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Görsel yüklenemedi</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
        <p className="text-gray-600 mb-4">{destination.description}</p>
        <Link 
          href={`/tours/domestic?destination=${destination.slug}`}
          className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
        >
          Keşfet
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        // Sadece aktif destinasyonları getir
        const data = await getDestinations(true);
        setDestinations(data.slice(0, 4)); // En fazla 4 destinasyon göster
        setLoading(false);
      } catch (err) {
        console.error('Destinasyonları getirme hatası:', err);
        setError('Bölgeler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Yükleme durumu
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Bölgelerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yükleniyor...
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden h-80">
                <div className="h-60 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Veri yoksa yedek içerik göster
  if (destinations.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Bölgelerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Şu anda gösterilecek bölge bulunmuyor.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Bölgelerimiz</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Türkiye&apos;nin en nefes kesici bölgelerinden oluşan özenle seçilmiş koleksiyonumuzu keşfedin
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination._id ? destination._id.toString() : destination.slug} destination={destination} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/tours/domestic" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Tüm Yurtiçi Turlarımız
          </Link>
        </div>
      </div>
    </section>
  );
} 