'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto overflow-hidden max-h-[90vh] relative border border-gray-200">
            <div className="sticky top-0 z-10 flex justify-between items-center border-b border-gray-100 px-6 py-5 bg-white/95 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-900">
                Rezervasyon: {tour.name}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105"
                aria-label="Kapat"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <p className="text-sm text-gray-600">info@buyukaytactravel.com</p>
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

            <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm px-6 py-4 flex flex-col sm:flex-row justify-between gap-3 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="order-2 sm:order-1 w-full sm:w-auto px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium hover:scale-105"
              >
                Kapat
              </button>
              <a
                href="tel:+905300609559"
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center font-medium shadow-md hover:shadow-lg hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
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

export default function ToursContent({ tours }: { tours: ITour[] }) {
  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Bu kategoride gösterilecek tur bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tours.map((tour) => (
        <TourCard key={tour._id?.toString()} tour={tour} />
      ))}
    </div>
  );
} 