'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour, TourType, AccommodationType } from '@/types/tour';

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

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">2026 Yıllık Program</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Büyük Aytaç Travel 2026 yılı tur programları ve takvimi. Kapadokya, Karadeniz, GAP, Ege ve daha birçok destinasyonda unutulmaz bir tatil deneyimi için erken rezervasyon fırsatlarını kaçırmayın!
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
              <Link
                key={tour._id?.toString()}
                href={`/tours/${tour.slug}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
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
                          {tour.destinationRef && typeof tour.destinationRef === 'object' && 'name' in tour.destinationRef
                            ? tour.destinationRef.name as string
                            : tour.destination}
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
                          {formatDate(tour.startDate)}
                        </span>
                      </div>
                      <span className="w-full md:w-auto inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-2.5 transition-colors">
                        Detayları Gör
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Yıllık Program Takvimi */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2026 Tur Takvimi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4">İlkbahar Turları (Mart - Mayıs 2026)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-gray-700 font-medium">Kapadokya Turu</span>
                  <span className="text-gray-500 text-sm">20-22 Mart</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-gray-700 font-medium">Eskişehir Turu</span>
                  <span className="text-gray-500 text-sm">21 Mart</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-gray-700 font-medium">Bursa Şehir Turu</span>
                  <span className="text-gray-500 text-sm">22 Mart</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-gray-700 font-medium">Adana Portakal Çiçeği Festivali</span>
                  <span className="text-gray-500 text-sm">3-5 Nisan</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-gray-700 font-medium">Safranbolu & Amasra Turu</span>
                  <span className="text-gray-500 text-sm">10-12 Nisan</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4">Yaz Turları (Haziran - Ağustos 2026)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-gray-700 font-medium">Karadeniz Turu</span>
                  <span className="text-gray-500 text-sm">Haziran</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-gray-700 font-medium">GAP Turu</span>
                  <span className="text-gray-500 text-sm">Temmuz</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-gray-700 font-medium">Ege Turları</span>
                  <span className="text-gray-500 text-sm">Temmuz-Ağustos</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-gray-700 font-medium">İstanbul Turları</span>
                  <span className="text-gray-500 text-sm">Yaz Dönemi</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-700 mb-4">Sonbahar/Kış Turları (Eylül - Şubat)</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="text-gray-700 font-medium">Kapadokya Balon Turu</span>
                  <span className="text-gray-500 text-sm">Ekim-Kasım</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="text-gray-700 font-medium">Karadeniz Batum Turu</span>
                  <span className="text-gray-500 text-sm">Eylül</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="text-gray-700 font-medium">Konya Şeb-i Arus</span>
                  <span className="text-gray-500 text-sm">Aralık</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="text-gray-700 font-medium">Yılbaşı Turları</span>
                  <span className="text-gray-500 text-sm">Aralık</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SEO İçerik Bölümü */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Büyük Aytaç Travel 2026 Tur Takvimi</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              <strong>Büyük Aytaç Travel</strong> olarak 2026 yılında da siz değerli müşterilerimiz için unutulmaz tatil deneyimleri hazırlıyoruz. 
              Çerkezköy merkezli organizasyonlarımız, Türkiye'nin en güzel destinasyonlarını kapsamaktadır.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2026'da Neler Var?</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Kapadokya Turları:</strong> Yıl boyunca düzenlenen Kapadokya turlarımızda balon turu, yeraltı şehri ve peri bacaları sizi bekliyor.</li>
              <li><strong>Karadeniz Turları:</strong> Doğa harikası yaylalar, tarihi mekanlar ve eşsiz Karadeniz mutfağı.</li>
              <li><strong>GAP Turu:</strong> Güneydoğu Anadolu'nun tarihi ve kültürel zenginliklerini keşfedin.</li>
              <li><strong>Festivaller:</strong> Adana Portakal Çiçeği Festivali, Alaçatı Ot Festivali ve daha fazlası.</li>
              <li><strong>Günübirlik Turlar:</strong> Hafta sonu kaçışları için İstanbul, Bursa, Eskişehir turları.</li>
            </ul>
            <p className="mb-4">
              Tüm turlarımız <strong>ücretsiz rezervasyon iptali</strong>, <strong>seyahat sigortası</strong> ve 
              <strong>profesyonel rehberlik</strong> hizmeti içermektedir. Erken rezervasyon avantajlarından yararlanmak için hemen iletişime geçin!
            </p>
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