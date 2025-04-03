'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTourBySlug } from '@/services/tourService';
import { submitContactForm } from '@/services/contactService';
import { ITour } from '@/models/Tour';

export default function TourDetail({ params }: { params: { slug: string } }) {
  const [tour, setTour] = useState<ITour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const data = await getTourBySlug(params.slug);
        setTour(data);
        setLoading(false);
      } catch (err) {
        console.error('Tur detayı getirme hatası:', err);
        setError('Tur detayı yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchTour();
  }, [params.slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');
    
    try {
      // Tur bilgisini mesaja ekle
      const tourMessage = `Tur Bilgisi: ${tour?.name}\n\n${formData.message}`;
      const formDataWithTour = {
        ...formData,
        message: tourMessage
      };
      
      const response = await submitContactForm(formDataWithTour);
      
      if (!response.success) {
        throw new Error(response.message || 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
      }
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Bilinmeyen bir hata oluştu.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Yükleme durumu
  if (loading) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-1/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-gray-200 animate-pulse"></div>
            <div className="p-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
            </div>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tur Detayı</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  // Tur bulunamadı
  if (!tour) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tur Bulunamadı</h1>
            <p className="text-lg text-gray-600 mb-8">
              Aradığınız tur bulunamadı veya kaldırılmış olabilir.
            </p>
            <Link href="/tours" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Tüm Turları Görüntüle
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tur Başlığı */}
        <div className="text-center mb-8">
          <Link 
            href="/tours" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tüm Turlar
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{tour.name}</h1>
          <p className="text-lg text-gray-600">
            {tour.destination}
            <span className="mx-2">•</span>
            <span>{tour.duration}</span>
          </p>
        </div>
        
        {/* Tur Görseli */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            {!imageError ? (
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Görsel yüklenemedi</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Tur Detayları Sekmeler */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tur Hakkında
              </button>
              <button
                onClick={() => setActiveTab('program')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'program'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Program
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'services'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dahil Hizmetler
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* Tur Açıklaması */}
            {activeTab === 'description' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tur Hakkında</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="whitespace-pre-line">{tour.description}</p>
                </div>
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Fiyat Bilgisi</h3>
                  <p className="text-gray-700">Kişi başı fiyat: <span className="text-2xl font-bold text-blue-600">{tour.price.toLocaleString('tr-TR')} ₺</span></p>
                  <p className="text-sm text-gray-500 mt-1">* Fiyatlar oda tipi ve sezona göre değişiklik gösterebilir.</p>
                </div>
              </div>
            )}
            
            {/* Program */}
            {activeTab === 'program' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tur Programı</h2>
                <div className="space-y-6">
                  {tour.program && tour.program.length > 0 ? (
                    tour.program.map((day, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4">
                        <h3 className="text-lg font-medium text-gray-900">{day.day}: {day.title}</h3>
                        <p className="mt-1 text-gray-600 whitespace-pre-line">{day.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Program bilgisi henüz eklenmemiştir.</p>
                  )}
                </div>
                <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Not:</span> Program, hava durumu ve diğer şartlara bağlı olarak değişiklik gösterebilir.
                  </p>
                </div>
              </div>
            )}
            
            {/* Dahil Hizmetler */}
            {activeTab === 'services' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dahil Olan Hizmetler</h2>
                {tour.includedServices && tour.includedServices.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
                    {tour.includedServices.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 mb-8">Dahil hizmetler bilgisi henüz eklenmemiştir.</p>
                )}
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dahil Olmayan Hizmetler</h2>
                {tour.excludedServices && tour.excludedServices.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {tour.excludedServices.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">Dahil olmayan hizmetler bilgisi henüz eklenmemiştir.</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Rezervasyon Formu */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Rezervasyon Bilgileri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">İletişim Bilgileri</h3>
                <p className="mb-1 text-gray-600">
                  <span className="font-semibold">Telefon:</span> 0530 060 95 59 / 0539 345 95 59
                </p>
                <p className="mb-1 text-gray-600">
                  <span className="font-semibold">Email:</span> info@buyukaytactravel.com
                </p>
                <p className="mb-4 text-gray-600">
                  <span className="font-semibold">Adres:</span> Gazi Mustafa Kemalpaşa, Tokuşlar Sk. Güneşler İş Merkezi No:7 Kat:1 Daire:1, 59500 Çerkezköy/Tekirdağ
                </p>
                
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ödeme Şartları</h3>
                <p className="text-gray-600 mb-4">
                0530 060 95 59 / 0539 345 95 59 numaralarından veya ofisimizden ödeme yapabilirsiniz.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">İletişim Formu</h3>
                
                {submitted ? (
                  <div className="bg-green-50 p-4 rounded-md border border-green-200 text-green-700 mb-6">
                    <p className="font-medium">Mesajınız başarıyla gönderildi!</p>
                    <p className="mt-1">En kısa sürede sizinle iletişime geçeceğiz.</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {formError && (
                      <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700 mb-4">
                        <p>{formError}</p>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ad Soyad
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        placeholder="Ad Soyad"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        placeholder="Email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        placeholder="Telefon"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mesaj
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        placeholder="Mesajınız..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Gönderiliyor...' : 'Bilgi İsteyin'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 