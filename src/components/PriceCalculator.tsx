'use client';

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
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [pricePerPerson, setPricePerPerson] = useState<number>(tour.price);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: ''
  });

  // Ek hizmet seçiminin değişmesi
  const handleAdditionalServiceChange = (serviceId: string) => {
    setSelectedAdditionalServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  // Fiyat hesaplama fonksiyonu
  useEffect(() => {
    const calculatePrice = () => {
      // Baz fiyat (kişi başı)
      const basePrice = tour.price;
      
      // Çocuklar için %30 indirim
      const adultTotalPrice = basePrice * adultCount;
      const childTotalPrice = basePrice * childCount * 0.7;
      
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
      
      // Kişi başı fiyat hesaplanması (ek hizmetler hariç)
      const newPricePerPerson = (adultCount + childCount) > 0 ? (subtotal - discountAmount) / (adultCount + childCount) : tour.price;
      
      setTotalPrice(finalTotal);
      setPricePerPerson(newPricePerPerson);
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

  // Modal açma/kapama
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Rezervasyon formu değişikliği
  const handleReservationFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReservationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Rezervasyon gönderimi
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Burada rezervasyon verisini API'ye gönderecek kodu ekleyebilirsiniz
    const reservationData = {
      tourId: tour._id,
      tourName: tour.name,
      adults: adultCount,
      children: childCount,
      additionalServices: selectedAdditionalServices,
      totalPrice: totalPrice,
      ...reservationForm
    };
    
    console.log('Rezervasyon verileri:', reservationData);
    
    // Form gönderildikten sonra modalı kapat
    alert('Rezervasyon talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiyat Hesaplama</h3>
      
      <div className="space-y-4">
        {/* Kişi Sayısı Seçimi */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="adultCount" className="block text-sm font-medium text-gray-700 mb-1">
              Yetişkin Sayısı
            </label>
            <select
              id="adultCount"
              value={adultCount}
              onChange={handleAdultCountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={`adult-${num}`} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="childCount" className="block text-sm font-medium text-gray-700 mb-1">
              Çocuk Sayısı (0-12 yaş)
            </label>
            <select
              id="childCount"
              value={childCount}
              onChange={handleChildCountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              {[0, 1, 2, 3, 4, 5].map(num => (
                <option key={`child-${num}`} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Fiyat Özeti */}
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Kişi Başı Fiyat:</span>
            <span className="font-medium text-blue-600">₺{Math.round(pricePerPerson).toLocaleString('tr-TR')}</span>
          </div>
          
          {adultCount > 0 && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{adultCount} Yetişkin:</span>
              <span className="font-medium text-blue-600">₺{(adultCount * tour.price).toLocaleString('tr-TR')}</span>
            </div>
          )}
          
          {childCount > 0 && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{childCount} Çocuk (0-12 yaş):</span>
              <span className="font-medium text-blue-600">₺{Math.round(childCount * tour.price * 0.7).toLocaleString('tr-TR')}</span>
            </div>
          )}
          
          {/* Ek Hizmetler */}
          {tour.additionalServices && tour.additionalServices.length > 0 && (
            <div className="mt-4 mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Ek Hizmetler:</p>
              <div className="space-y-2">
                {tour.additionalServices.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`service-${index}`}
                      checked={selectedAdditionalServices.includes(service.name)}
                      onChange={() => handleAdditionalServiceChange(service.name)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`service-${index}`} className="ml-2 text-sm text-gray-700 flex justify-between w-full">
                      <span>{service.name}</span>
                      <span className="font-medium text-blue-600">₺{service.price.toLocaleString('tr-TR')}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedAdditionalServices.length > 0 && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Ek Hizmetler:</span>
              <span className="font-medium text-blue-600">
                ₺{tour.additionalServices
                  ? selectedAdditionalServices.reduce((total, serviceId) => {
                      const service = tour.additionalServices?.find(s => s.name === serviceId);
                      return total + (service ? service.price : 0);
                    }, 0).toLocaleString('tr-TR')
                  : 0}
              </span>
            </div>
          )}
          
          {(adultCount + childCount) >= 4 && (
            <div className="flex justify-between items-center mb-2 text-green-700">
              <span className="text-sm">Grup İndirimi (5%):</span>
              <span className="font-medium">-₺{Math.round(((adultCount * tour.price) + (childCount * tour.price * 0.7)) * 0.05).toLocaleString('tr-TR')}</span>
            </div>
          )}
          
          <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
            <span className="font-medium text-gray-900">Toplam Tutar:</span>
            <span className="text-xl font-bold text-blue-600">₺{Math.round(totalPrice).toLocaleString('tr-TR')}</span>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            * Fiyat hesaplaması tahminidir. Kesin fiyat için lütfen bizimle iletişime geçiniz.
          </p>
        </div>
        
        {/* Rezervasyon Yap Butonu */}
        <button
          onClick={toggleModal}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Rezervasyon Yap
        </button>
      </div>
      
      {/* Rezervasyon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Rezervasyon Formu</h3>
                <button 
                  onClick={toggleModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">{tour.name}</span> turuna {adultCount} yetişkin
                  {childCount > 0 ? ` ve ${childCount} çocuk ` : ' '}
                  için rezervasyon yapıyorsunuz.
                </p>
                <p className="text-sm font-semibold text-blue-600">
                  Toplam Tutar: ₺{Math.round(totalPrice).toLocaleString('tr-TR')}
                </p>
              </div>
              
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={reservationForm.name}
                    onChange={handleReservationFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={reservationForm.email}
                    onChange={handleReservationFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={reservationForm.phone}
                    onChange={handleReservationFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Tercih Ettiğiniz Tarih
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={reservationForm.date}
                    onChange={handleReservationFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Ekstra Notlar
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={reservationForm.notes}
                    onChange={handleReservationFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Rezervasyon Talebini Gönder
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    * Rezervasyon talebiniz alındıktan sonra, onay için sizinle iletişime geçeceğiz.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 