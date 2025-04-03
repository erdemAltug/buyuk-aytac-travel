'use client';

import { useState, useEffect, Fragment, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour } from '@/models/Tour';
import { useSearchParams } from 'next/navigation';

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
          <h3 className="text-xl font-bold text-gray-900 mb-2">{tour.name}</h3>
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
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden max-h-[90vh] relative">
            <div className="sticky top-0 z-10 flex justify-between items-center border-b px-6 py-4 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">
                Rezervasyon: {tour.name}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 p-2.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Kapat"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-4 overflow-y-auto max-h-[60vh] md:max-h-[calc(90vh-120px)]">
              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Tur:</span> {tour.name}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Süre:</span> {tour.duration}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Fiyat:</span> {tour.price.toLocaleString('tr-TR')} ₺
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
                <h4 className="text-blue-800 font-semibold text-lg mb-2">Rezervasyon Bilgilendirmesi</h4>
                <p className="text-blue-700 mb-2">
                  Rezervasyonunuzu yapmak için aşağıdaki yöntemlerden birini tercih edebilirsiniz:
                </p>
                <ul className="text-blue-700 list-disc pl-5 space-y-1">
                  <li>Ofisimize gelerek yüz yüze görüşebilir ve nakit veya kredi kartı ile ödeme yapabilirsiniz.</li>
                  <li>Telefonla arayarak rezervasyon yapabilir ve ödeme seçenekleri hakkında bilgi alabilirsiniz.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Adres</p>
                    <p className="text-sm text-gray-600">Gazi Mustafa Kemalpaşa, Tokuşlar Sk. Güneşler İş Merkezi No:7 Kat:1 Daire:1, 59500 Çerkezköy/Tekirdağ</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Telefon</p>
                    <p className="text-sm text-gray-600">0530 060 95 59 / 0539 345 95 59</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">E-posta</p>
                    <p className="text-sm text-gray-600">buyukaytac59@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Çalışma Saatleri</p>
                    <p className="text-sm text-gray-600">
                      Pazartesi - Cuma: 09:00 - 18:00<br />
                      Cumartesi: 09:00 - 13:00<br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between gap-3 border-t">
              <button
                onClick={closeModal}
                className="order-2 sm:order-1 w-full sm:w-auto px-4 py-2.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Kapat
              </button>
              <a
                href="tel:+905300609559"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Hemen Ara
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// SearchParams'ı kullanacak bir bileşen oluşturuyoruz
function TourList() {
  const [filteredTours, setFilteredTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterTitle, setFilterTitle] = useState('Tüm Turlarımız');

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);

        // URL'den parametreleri al
        const tourType = searchParams.get('tourType');
        const accommodationType = searchParams.get('accommodationType');

        // Filtre parametreleri varsa API çağrısına ekle
        const params: {
          isActive?: boolean;
          tourType?: string;
          accommodationType?: string;
        } = { isActive: true };

        if (tourType) {
          params.tourType = tourType;
        }

        if (accommodationType) {
          params.accommodationType = accommodationType;
        }

        const data = await getTours(params);
        setFilteredTours(data);

        // Başlığı ayarla
        if (tourType === 'domestic') {
          setFilterTitle('Yurtiçi Turlarımız');
        } else if (tourType === 'international') {
          setFilterTitle('Yurtdışı Turlarımız');
        } else if (accommodationType === 'with_accommodation') {
          setFilterTitle('Konaklamalı Turlarımız');
        } else if (accommodationType === 'daily') {
          setFilterTitle('Günübirlik Turlarımız');
        } else {
          setFilterTitle('Tüm Turlarımız');
        }

        setLoading(false);
      } catch (err) {
        console.error('Turları getirme hatası:', err);
        setError('Turlar yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchTours();
  }, [searchParams]);

  // Yükleme durumu
  if (loading) {
    return (
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{filterTitle}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Yükleniyor...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
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
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{filterTitle}</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Veri yoksa yedek içerik göster
  if (filteredTours.length === 0) {
    return (
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{filterTitle}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Bu kategoride gösterilecek tur bulunmuyor.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{filterTitle}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Türkiye&apos;nin güzelliklerini keşfedeceğiniz özel olarak hazırlanmış turlarımız
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map((tour) => (
          <TourCard key={tour._id?.toString()} tour={tour} />
        ))}
      </div>
    </>
  );
}

// Suspense ile sarılmış ana bileşeni döndüren ana sayfa
export default function ToursPage() {
  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Turlar Yükleniyor...</h1>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        }>
          <TourList />
        </Suspense>
      </div>
    </main>
  );
} 