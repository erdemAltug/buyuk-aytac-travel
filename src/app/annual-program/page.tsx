'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour, TourType, AccommodationType } from '@/models/Tour';

export default function AnnualProgramPage() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [filteredTours, setFilteredTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours({ isActive: true });
        setTours(data);
        setFilteredTours(data);
        setLoading(false);
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Turlar yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === 'all') {
      setFilteredTours(tours);
      return;
    }
    
    if (filter === TourType.DOMESTIC || filter === TourType.INTERNATIONAL) {
      setFilteredTours(tours.filter(tour => tour.tourType === filter));
      return;
    }
    
    if (filter === AccommodationType.WITH_ACCOMMODATION || filter === AccommodationType.DAILY) {
      setFilteredTours(tours.filter(tour => tour.accommodationType === filter));
      return;
    }
  };

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

  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Yıllık Program</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">2025 Yıllık Program</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Büyük Aytaç Travel 2025 yılı tur programları ve takvimi. Keyifli bir tatil deneyimi için erken rezervasyon fırsatlarını kaçırmayın!
          </p>
        </div>

        {/* Filtreler */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => handleFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tüm Turlar
          </button>
          <button
            onClick={() => handleFilter(TourType.DOMESTIC)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeFilter === TourType.DOMESTIC
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Yurtiçi Turlar
          </button>
          <button
            onClick={() => handleFilter(TourType.INTERNATIONAL)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeFilter === TourType.INTERNATIONAL
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Yurtdışı Turlar
          </button>
          <button
            onClick={() => handleFilter(AccommodationType.WITH_ACCOMMODATION)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeFilter === AccommodationType.WITH_ACCOMMODATION
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Konaklamalı Turlar
          </button>
          <button
            onClick={() => handleFilter(AccommodationType.DAILY)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeFilter === AccommodationType.DAILY
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Günübirlik Turlar
          </button>
        </div>

        {/* Tur Listesi */}
        {filteredTours.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Bu kritere uygun tur bulunamadı.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredTours.map((tour) => (
              <div key={tour._id?.toString()} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <div className="h-64 md:h-full w-full relative">
                      <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-image.jpg';
                        }}
                      />
                    </div>
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {tour.tourType === TourType.DOMESTIC ? 'Yurtiçi' : 'Yurtdışı'}
                      </span>
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {tour.accommodationType === AccommodationType.WITH_ACCOMMODATION ? 'Konaklamalı' : 'Günübirlik'}
                      </span>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="md:flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{tour.name}</h2>
                        <p className="text-gray-500 mt-1">
                          {tour.destinationId && typeof tour.destinationId === 'object' && 'name' in tour.destinationId
                            ? tour.destinationId.name as string
                            : ''}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <span className="text-gray-500 text-sm">Başlangıç Fiyatı</span>
                        <p className="text-2xl font-bold text-blue-600">{tour.price.toLocaleString('tr-TR')} ₺</p>
                        <p className="text-gray-500 text-sm">{tour.duration}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-600 line-clamp-3">{tour.description}</p>
                    </div>

                    <div className="mt-6 md:flex justify-between items-center">
                      <div className="mb-4 md:mb-0">
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                          Nisan 2025
                        </span>
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Mayıs 2025
                        </span>
                      </div>
                      <Link
                        href={`/tours/${tour.slug}`}
                        className="w-full md:w-auto inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition-colors"
                      >
                        Detayları Gör
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Yıllık Program Takvimi */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2025 Tur Takvimi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4">İlkbahar Turları (Mart - Mayıs)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-700">Kapadokya Balon Turu</span>
                  <span className="text-gray-500">11-13 Nisan</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">İstanbul Klasik Turu</span>
                  <span className="text-gray-500">25-26 Nisan</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Antalya Kemer Turu</span>
                  <span className="text-gray-500">3-7 Mayıs</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Bodrum Günübirlik Turu</span>
                  <span className="text-gray-500">18 Mayıs</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4">Yaz Turları (Haziran - Ağustos)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-700">Bodrum Konaklamalı Turu</span>
                  <span className="text-gray-500">15-20 Haziran</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Yunanistan Adalar Turu</span>
                  <span className="text-gray-500">5-9 Temmuz</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">İtalya Klasik Turu</span>
                  <span className="text-gray-500">20-27 Temmuz</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Karadeniz Yaylalar Turu</span>
                  <span className="text-gray-500">8-12 Ağustos</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4">Sonbahar/Kış Turları (Eylül - Şubat)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-700">Karadeniz Batum Turu</span>
                  <span className="text-gray-500">10-15 Eylül</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Kapadokya Kış Turu</span>
                  <span className="text-gray-500">5-7 Aralık</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Uludağ Kar Turu</span>
                  <span className="text-gray-500">25-28 Aralık</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-700">Palandöken Kayak Turu</span>
                  <span className="text-gray-500">15-19 Ocak</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Rezervasyon ve Bilgi İçin</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Erken rezervasyon avantajlarından yararlanmak ve detaylı bilgi almak için hemen iletişime geçin
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium rounded-lg px-5 py-2.5 transition-colors"
          >
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </main>
  );
} 