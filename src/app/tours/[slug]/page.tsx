'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTourBySlug } from '@/services/tourService';
import { submitContactForm } from '@/services/contactService';
import { ITour } from '@/models/Tour';
import PriceCalculator from '@/components/PriceCalculator';

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
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
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
        
        {/* Sosyal Medya Paylaşım Butonları */}
        <div className="flex justify-end items-center space-x-3 mb-8">
          <span className="text-gray-600 text-sm">Paylaş:</span>
          
          {/* Facebook */}
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.buyukaytactravel.com/tours/${tour.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
            aria-label="Facebook'ta paylaş"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          
          {/* WhatsApp */}
          <a 
            href={`https://wa.me/?text=${encodeURIComponent(`${tour.name} - Büyük Aytaç Travel\nhttps://www.buyukaytactravel.com/tours/${tour.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-800"
            aria-label="WhatsApp'ta paylaş"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          
          {/* Email */}
          <a 
            href={`mailto:?subject=${encodeURIComponent(`${tour.name} - Büyük Aytaç Travel`)}&body=${encodeURIComponent(`${tour.name} turunu incelemek için tıklayın: https://www.buyukaytactravel.com/tours/${tour.slug}`)}`}
            className="text-red-600 hover:text-red-800"
            aria-label="Email ile paylaş"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </a>
        </div>
        
        {/* Tur Detayları Sekmeler */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex whitespace-nowrap">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tur Hakkında
              </button>
              <button
                onClick={() => setActiveTab('program')}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium ${
                  activeTab === 'program'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Program
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium ${
                  activeTab === 'services'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dahil Hizmetler
              </button>
              <button
                onClick={() => setActiveTab('terms')}
                className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium ${
                  activeTab === 'terms'
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sözleşme Şartları
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
            
            {/* Sözleşme Şartları */}
            {activeTab === 'terms' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sözleşme Şartları</h2>
                <div className="bg-blue-100 border-l-4 border-blue-600 p-4 my-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold text-blue-800 mb-3">BÜYÜK AYTAÇ TRAVEL TUR SATIŞ BİLGİLENDİRME VE İPTAL İADE KOŞULLARI</h3>
                  <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                    <li>Ön ödeme tutarı kayıt tarihinde rezervasyon bedelinin minimum %50&apos;sidir. Günübirlik turlarda turun hareket tarihinden 7 gün önce, konaklamalı turlarda 15 gün önce kalan tur bedelinin tamamlanması gerekir.</li>
                    <li>İptaller GÜNÜBİRLİK TURLARDA son 7 gün öncesine kadar yapılmaktadır.</li>
                    <li>İptaller KONAKLAMALI TURLARDA son 15 gün öncesine kadar yapılmaktadır.</li>
                    <li>Hava muhalefeti nedeni ile olabilecek değişikliklerden, acentemiz sorumlu değildir ve Acente programda değişiklik hakkına sahiptir.</li>
                    <li>Rezervasyon esnasında kesinlikle koltuk numarası sözü ve garantisi verilemez. Araçlarda bulunan 3 ve 4 numaralı koltuk rehber ve yardımcısına aittir.</li>
                    <li>Rehberimiz gezilecek bölgenin yoğunluğu, hava muhalefeti nedeniyle tur programında değişiklik yapabilir. Bu durumda tur programında yazılan ama gezilemeyen yerlerden BÜYÜK AYTAÇ TRAVEL sorumlu değildir. Rehberimizin tur sırasında verdiği saatlere misafirlerimizin uymaması sonucunda, tur programında yazdığı halde gezilemeyen yerlerden BÜYÜK AYTAÇ TRAVEL sorumlu değildir.</li>
                    <li>Tur öncesi ve tur esnasında hava muhalefeti nedeniyle ve mücbir sebepler ile yapılamayan turlarda BÜYÜK AYTAÇ TRAVEL&apos;in sorumluluğu yoktur.</li>
                    <li>Tur esnasında program yoğunluğundan dolayı bankamatik, döviz bürosu vs. bulmak her zaman mümkün olmadığından dolayı hazırlıklı gelinmelidir.</li>
                    <li>Mola yerlerimiz; yoğunluk, tadilat vb. gibi mücbir sebeplerden ötürü mevki ve hizmet standartları açısından benzer yerlerle değiştirilebilir.</li>
                    <li>Kullanılmayan ulaşım, konaklama, çevre gezileri vb. haklar iade edilmez başka bir tur programında kullanılmak üzere ödeme hakkı saklı tutulur.</li>
                    <li>Kişilerin tura katılımlarındaki sağlık sorunları, hamilelik durumu, sürekli kullanımda bulundukları ilaçlar ile ilgili raporları yanlarında bulundurmaları gerekmektedir. Bu gibi sebeplerle ayrıcalık talep etmeleri halinde rapor bildirmeleri gerekmektedir.</li>
                    <li>BÜYÜK AYTAÇ TRAVEL konaklamalı turlarda otel değişikliği hakkını saklı tutar.</li>
                  </ol>
                  <p className="text-gray-700 mt-4 font-bold">
                    SATIN ALMIŞ OLDUĞUNUZ TUR SONRASI YUKARIDAKİ KOŞULLARI KABUL ETMİŞ SAYILIRSINIZ. BİLGİLERİNİZE SUNARIZ.
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Daha fazla bilgi için <Link href="/terms" className="text-blue-600 hover:underline font-medium">Kullanım Şartları</Link> sayfamızı ziyaret edebilirsiniz.
                </p>
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
                {/* Fiyat Hesaplama Bileşeni */}
                <PriceCalculator tour={tour} />
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