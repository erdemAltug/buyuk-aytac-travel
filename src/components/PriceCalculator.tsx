'use client';

// Yalnızca fiyat hesaplar. Rezervasyon, sayfadaki ReservationButton (/api/reservation) ile yapılır;
// buradaki eski "Rezervasyon Yap" formu talebi hiçbir yere göndermiyordu, kaldırıldı.

import { useState, useEffect } from 'react';
import { ITour } from '@/models/Tour';

// Fiyat hesaplama için arayüz
interface PriceCalculatorProps {
  tour: ITour;
}

export default function PriceCalculator({ tour }: PriceCalculatorProps) {
  // Hesaplama için state tanımları
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [selectedAdditionalServices] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Fiyat hesaplama fonksiyonu
  useEffect(() => {
    const calculatePrice = () => {
      // Baz fiyat (kişi başı)
      const basePrice = tour.price;
      
      const adultTotalPrice = basePrice * adultCount;
      const childTotalPrice = basePrice * childCount;
      
      // Ek hizmetlerin toplam fiyatı
      const additionalServicesTotal = tour.additionalServices 
        ? selectedAdditionalServices.reduce((total, serviceId) => {
            const service = tour.additionalServices?.find(s => s.name === serviceId);
            return total + (service ? service.price : 0);
          }, 0)
        : 0;
      
      // 4+ kişi için grup indirimi
      let groupDiscount = 0;
      if ((adultCount + childCount) >= 4) {
        groupDiscount = 0.05; // %5 indirim
      }
      
      // Toplam tutar hesaplanması
      const subtotal = adultTotalPrice + childTotalPrice;
      const discountAmount = subtotal * groupDiscount;
      const finalTotal = subtotal - discountAmount + additionalServicesTotal;
      
      setTotalPrice(finalTotal);
    };
    
    calculatePrice();
  }, [adultCount, childCount, selectedAdditionalServices, tour.price, tour.additionalServices]);

  // Yetişkin sayısı değişikliği
  const handleAdultCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAdultCount(parseInt(e.target.value));
  };

  // Çocuk sayısı değişikliği
  const handleChildCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChildCount(parseInt(e.target.value));
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Başlık */}
        <h3 className="text-xl font-bold text-gray-900">Fiyat Hesaplama</h3>
        
        {/* Kişi Sayısı Seçimi */}
        <div className="space-y-4">
          <div>
            <label htmlFor="adultCount" className="block text-sm font-medium text-gray-700 mb-2">
              Yetişkin Sayısı
            </label>
            <select
              id="adultCount"
              value={adultCount}
              onChange={handleAdultCountChange}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white shadow-sm transition-all duration-200 hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')] bg-[position:right_1rem_center] bg-no-repeat pr-10"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={`adult-${num}`} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="childCount" className="block text-sm font-medium text-gray-700 mb-2">
              Çocuk Sayısı (0-12 yaş)
            </label>
            <select
              id="childCount"
              value={childCount}
              onChange={handleChildCountChange}
              className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white shadow-sm transition-all duration-200 hover:border-gray-400 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzZCNzI4MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')] bg-[position:right_1rem_center] bg-no-repeat pr-10"
            >
              {[0, 1, 2, 3, 4, 5].map(num => (
                <option key={`child-${num}`} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Fiyat Özeti */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Kişi Başı Fiyat:</span>
              <span className="font-semibold text-lg text-blue-600">₺{tour.price.toLocaleString('tr-TR')}</span>
            </div>
            
            {adultCount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{adultCount} Yetişkin:</span>
                <span className="font-semibold text-blue-600">₺{(adultCount * tour.price).toLocaleString('tr-TR')}</span>
              </div>
            )}
            
            {childCount > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{childCount} Çocuk:</span>
                <span className="font-semibold text-blue-600">₺{Math.round(childCount * tour.price * 0.7).toLocaleString('tr-TR')}</span>
              </div>
            )}
            
            {(adultCount + childCount) >= 4 && (
              <div className="flex justify-between items-center text-green-700">
                <span className="text-sm">Grup İndirimi (5%):</span>
                <span className="font-semibold">-₺{Math.round(((adultCount * tour.price) + (childCount * tour.price * 0.7)) * 0.05).toLocaleString('tr-TR')}</span>
              </div>
            )}
            
            <div className="border-t border-gray-300 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Toplam Tutar:</span>
                <span className="text-2xl font-bold text-blue-600">₺{Math.round(totalPrice).toLocaleString('tr-TR')}</span>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            * Fiyat hesaplaması tahminidir. Kesin fiyat için lütfen bizimle iletişime geçiniz.
          </p>
        </div>
        
      </div>
      
    </div>
  );
} 