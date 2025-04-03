'use client';

import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour } from '@/models/Tour';

function TourCard({ tour }: { tour: ITour }) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
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
          <div className="flex justify-between items-center mb-3">
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
          <button
            onClick={openModal}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
          >
            Rezervasyon Yap
          </button>
        </div>
      </div>

      {/* Rezervasyon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden">
            <div className="flex justify-between items-center border-b px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Rezervasyon: {tour.name}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-6 py-4">
              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Tur:</span> {tour.name}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Süre:</span> {tour.duration}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Fiyat:</span> {tour.price.toLocaleString('tr-TR')} ₺
                </p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="E-posta adresiniz"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Telefon numaranız"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Tarih
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-1">
                    Kişi Sayısı
                  </label>
                  <select
                    id="people"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">1 Kişi</option>
                    <option value="2">2 Kişi</option>
                    <option value="3">3 Kişi</option>
                    <option value="4">4 Kişi</option>
                    <option value="5">5 Kişi</option>
                    <option value="6+">6+ Kişi</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Notlar
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Eklemek istediğiniz notlar..."
                  ></textarea>
                </div>
              </form>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
              <button 
                onClick={() => {
                  // Burada form verilerini işleyebilirsiniz
                  alert('Rezervasyon talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.');
                  closeModal();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
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
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
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
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
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
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
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