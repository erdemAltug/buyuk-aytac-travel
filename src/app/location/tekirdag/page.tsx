'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTours } from '@/services/tourService';
import { ITour } from '@/models/Tour';

export default function TekirgagToursPage() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await getTours({ isActive: true });
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

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-3 text-gray-600">Turlar yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 p-4 rounded-md border border-red-200 inline-block mx-auto">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
          >
            Yeniden dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="max-w-7xl mx-auto">
          {/* Location-specific header section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-12 text-white shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Tekirdağ&apos;dan Başlayan Turlar</h1>
            <p className="text-xl mb-6 max-w-3xl">
              Tekirdağ&apos;dan kalkan günübirlik ve konaklamalı turlarımız ile Türkiye&apos;nin ve dünyanın en güzel yerlerini keşfedin. Büyük Aytaç Travel olarak sizlere unutulmaz bir seyahat deneyimi sunuyoruz.
            </p>
            <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Tekirdağ&apos;dan Tur Avantajları</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Tekirdağ merkez ve ilçelerden kolay ulaşım</li>
                <li>Konforlu otobüslerle güvenli yolculuk</li>
                <li>Tekirdağ&apos;dan tüm yurtiçi ve yurtdışı turlara katılım fırsatı</li>
                <li>Deneyimli rehberler eşliğinde zengin tur programları</li>
                <li>Uygun fiyat garantisi</li>
              </ul>
            </div>
          </div>

          {/* Tour listings */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tekirdağ&apos;dan Başlayan Popüler Turlarımız</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour._id?.toString()} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image 
                    src={tour.image || '/images/placeholder-tour.jpg'} 
                    alt={tour.name} 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1 m-2 text-sm font-medium rounded">
                    {tour.tourType === 'domestic' ? 'Yurtiçi' : 'Yurtdışı'} • {tour.duration} {parseInt(tour.duration) > 1 ? 'Gün' : 'Gün'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tour.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">{tour.price.toLocaleString('tr-TR')} ₺</span>
                    <Link 
                      href={`/tours/${tour.slug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                    >
                      Detaylar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional SEO content */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tekirdağ Bölgesi Tur Bilgileri</h2>
            <p className="text-gray-700 mb-4">
              Büyük Aytaç Travel olarak, Tekirdağ&apos;ın tüm ilçelerinden (Çerkezköy, Çorlu, Kapaklı, Saray, Malkara, 
              Hayrabolu, Şarköy, Marmara Ereğlisi) gezilerimize katılım imkanı sağlıyoruz. Tekirdağ, konumu itibariyle 
              hem İstanbul&apos;a hem de Avrupa&apos;ya yakınlığıyla birçok tur seçeneği için ideal bir başlangıç noktasıdır.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Tekirdağ Merkezden Ulaşım</h3>
                <p className="text-gray-700 mb-1">
                  Tekirdağ&apos;ın merkez ve ilçelerinden düzenlediğimiz turlar için ana güzergahlardan yolcu alımı yapılmaktadır.
                </p>
                <p className="text-gray-700">
                  <strong>Kalkış Noktaları:</strong> Tekirdağ Merkez, Çerkezköy, Çorlu ve diğer ilçelerden belirlenmiş toplanma noktalarından hareket edilmektedir.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Tur Rezervasyon Bilgileri</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Tekirdağ&apos;dan katılacağınız turlar için en az 3 gün önceden rezervasyon yapılması tavsiye edilir.</li>
                  <li>Tekirdağ merkez ve ilçelerinden servis güzergahları için ofisimizle iletişime geçiniz.</li>
                  <li>Özel gruplar için Tekirdağ&apos;dan özel tur organizasyonları düzenliyoruz.</li>
                </ul>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Tekirdağ&apos;dan En Çok Tercih Edilen Turlar</h2>
            <p className="text-gray-700 mb-6">
              Tekirdağ&apos;dan düzenlediğimiz turlar arasında en çok tercih edilenler İstanbul kültür turları, 
              Edirne turları, Bulgaristan alışveriş turları, Yunanistan adaları, Batı Karadeniz ve Kapadokya turlarıdır. 
              Tekirdağ&apos;ın coğrafi konumu sayesinde, hem yurtiçi hem de yurtdışı birçok noktaya kolay ulaşım 
              sağlayarak kaliteli ve ekonomik tur seçenekleri sunuyoruz.
            </p>
            
            <div className="mt-6 flex justify-center">
              <Link 
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Rezervasyon ve Bilgi için Bize Ulaşın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 