'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Form için alanlar
interface GroupTourForm {
  name: string;
  email: string;
  phone: string;
  groupSize: string;
  destination: string;
  tourType: string;
  startDate: string;
  duration: string;
  accommodation: string;
  transportation: string;
  specialRequests: string;
}

// Başlangıç form değerleri
const initialFormState: GroupTourForm = {
  name: '',
  email: '',
  phone: '',
  groupSize: '',
  destination: '',
  tourType: 'standard',
  startDate: '',
  duration: '3',
  accommodation: 'hotel',
  transportation: 'bus',
  specialRequests: '',
};

export default function GroupTourPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<GroupTourForm>(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form değişikliklerini işle
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Formu gönder
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Gerçek API çağrısı
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `ÖZEL GRUP TURU TALEBİ:
Kişi Sayısı: ${formData.groupSize}
Destinasyon: ${formData.destination}
Tur Tipi: ${formData.tourType}
Tarih: ${formData.startDate}
Süre: ${formData.duration} gün
Konaklama: ${formData.accommodation}
Ulaşım: ${formData.transportation}
Özel İstekler: ${formData.specialRequests || 'Belirtilmemiş'}`
        }),
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Form gönderilirken bir hata oluştu');
      }
      
      // Başarılı durumu göster
      setSuccess(true);
      setFormData(initialFormState);
      
      // Kullanıcıyı ana sayfaya yönlendir
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } catch (err) {
      console.error('Form gönderme hatası:', err);
      setError('Form gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Özel Grup Turu Talebi</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Arkadaşlarınız, aileniz veya çalışma arkadaşlarınızla özel bir tur için teklif alın. Formu doldurun, size özel tur teklifimizi hemen gönderelim.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sol taraf - Form */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Talebiniz Alındı!</h2>
                <p className="text-gray-600 mb-4">
                  Özel grup turu talebiniz başarıyla gönderildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
                <p className="text-sm text-gray-500">
                  Birkaç saniye içinde ana sayfaya yönlendirileceksiniz...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Özel Tur Talep Formu</h2>
                
                {/* Kişisel Bilgiler */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">İletişim Bilgileriniz</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700 mb-1">
                        Kişi Sayısı *
                      </label>
                      <input
                        type="number"
                        id="groupSize"
                        name="groupSize"
                        value={formData.groupSize}
                        onChange={handleChange}
                        min="5"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Tur Detayları */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Tur Detayları</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                        Hedef Destinasyon *
                      </label>
                      <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Örn: Kapadokya, İstanbul, vs."
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="tourType" className="block text-sm font-medium text-gray-700 mb-1">
                        Tur Tipi
                      </label>
                      <select
                        id="tourType"
                        name="tourType"
                        value={formData.tourType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="standard">Standart Tur</option>
                        <option value="premium">Premium Tur</option>
                        <option value="custom">Tamamen Özel Tur</option>
                        <option value="educational">Eğitim/Okul Turu</option>
                        <option value="corporate">Kurumsal Etkinlik</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Planlanan Tarih *
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                        Süre (Gün)
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="1">1 Gün (Günübirlik)</option>
                        <option value="2">2 Gün 1 Gece</option>
                        <option value="3">3 Gün 2 Gece</option>
                        <option value="4">4 Gün 3 Gece</option>
                        <option value="5">5 Gün 4 Gece</option>
                        <option value="7">7 Gün 6 Gece</option>
                        <option value="10">10 Gün ve Üzeri</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700 mb-1">
                        Konaklama Tercihi
                      </label>
                      <select
                        id="accommodation"
                        name="accommodation"
                        value={formData.accommodation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="hotel">Otel</option>
                        <option value="boutique">Butik Otel</option>
                        <option value="apart">Apart/Pansiyon</option>
                        <option value="villa">Villa/Köy Evi</option>
                        <option value="camping">Kamp/Çadır</option>
                        <option value="none">Konaklama İstemiyorum</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="transportation" className="block text-sm font-medium text-gray-700 mb-1">
                        Ulaşım Tercihi
                      </label>
                      <select
                        id="transportation"
                        name="transportation"
                        value={formData.transportation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      >
                        <option value="bus">Otobüs</option>
                        <option value="minibus">Minibüs</option>
                        <option value="luxury">Lüks VIP Araç</option>
                        <option value="plane">Uçak + Transfer</option>
                        <option value="custom">Kendi Aracımız</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Özel İstekler */}
                <div className="mb-6">
                  <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
                    Özel İstekler ve Notlar
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Özel istekleriniz, sorularınız veya eklemek istediğiniz detaylar..."
                  ></textarea>
                </div>
                
                {/* Hata mesajı */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                    {error}
                  </div>
                )}
                
                {/* Gönder Butonu */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg ${
                      submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gönderiliyor...
                      </span>
                    ) : (
                      'Teklif İste'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
          
          {/* Sağ taraf - Bilgi ve Avantajlar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grup Turu Avantajları */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Grup Turu Avantajları</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-2 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Kişi başı daha uygun fiyatlar</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Özel rehber ve araç tahsisi</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">İsteğe göre özelleştirilebilen program</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Gruba özel etkinlikler ve sürprizler</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Esnek tarih ve konaklama seçenekleri</span>
                </li>
              </ul>
            </div>
            
            {/* Özel Grup Turu Görseli */}
            <div className="relative rounded-lg overflow-hidden h-64 shadow-md">
              <Image
                src="/images/group-tour.jpg"
                alt="Grup Turu"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold text-lg">Unutulmaz Grup Deneyimleri</h3>
                  <p className="text-sm">Özel anlarınızı birlikte yaşayın</p>
                </div>
              </div>
            </div>
            
            {/* İletişim Bilgileri */}
            <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Detaylı Bilgi</h3>
              <p className="text-blue-700 mb-4">
                Grup turu ile ilgili detaylı bilgi almak için doğrudan iletişime geçebilirsiniz:
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-blue-800">0530 060 95 59</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-blue-800">info@buyukaytactravel.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 