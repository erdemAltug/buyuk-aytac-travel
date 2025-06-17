'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour, TourType, AccommodationType } from '@/models/Tour';

function TourCard({ tour }: { tour: ITour }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // SEO-optimized alt text
  const optimizedAltText = `${tour.name} - ${tour.destination} ${tour.duration} - ${tour.accommodationType === 'daily' ? 'Günübirlik' : 'Konaklamalı'} Tur - Büyük Aytaç Travel`;

  return (
    <article 
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      itemScope 
      itemType="https://schema.org/TouristTrip"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {/* Skeleton loader */}
        <div className="bg-gray-200 animate-pulse h-full w-full absolute" />
        
        {/* Image */}
        {!imageError ? (
          <>
            <Image
              src={tour.image}
              alt={optimizedAltText}
              fill
              className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
              loading="lazy"
              itemProp="image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Görsel yüklenemedi</span>
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          <span itemProp="duration">{tour.duration}</span>
        </div>
        
        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-white text-blue-700 font-bold px-4 py-2 rounded-full shadow-lg" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span itemProp="price">{tour.price.toLocaleString('tr-TR')}</span> 
          <span itemProp="priceCurrency" content="TRY">₺</span>
        </div>
        
        {/* Tour Name */}
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold max-w-[70%] line-clamp-1 drop-shadow-lg" itemProp="name">
          {tour.name}
        </h3>
      </div>
      
      <div className="p-5">
        <p className="text-gray-600 mb-4 line-clamp-2 h-12" itemProp="description">{tour.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500" itemProp="touristType">{tour.destination}</span>
          </div>
          
          <Link 
            href={`/tours/${tour.slug}`}
            className="relative inline-flex items-center group-hover:text-blue-700 font-medium text-sm text-blue-600 transition-colors"
            aria-label={`${tour.name} tur detaylarını görüntüle`}
            itemProp="url"
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
    </article>
  );
}

interface ToursByTypeProps {
  title: string;
  description: string;
  viewAllLink: string;
  viewAllText: string;
  filterParams: {
    isActive?: boolean;
    tourType?: TourType;
    accommodationType?: AccommodationType;
  };
}

export default function ToursByType({ 
  title, 
  description, 
  viewAllLink, 
  viewAllText,
  filterParams 
}: ToursByTypeProps) {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await getTours(filterParams);
        setTours(data.slice(0, 6)); // En fazla 6 tur göster
        setLoading(false);
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Turlar yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchTours();
  }, [filterParams]);

  // Yükleme durumu
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yükleniyor...
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden h-96 animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Veri yoksa gösterme
  if (tours.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour._id?.toString()} tour={tour} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href={viewAllLink} 
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            {viewAllText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 