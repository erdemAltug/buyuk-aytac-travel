'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { createTour } from '@/services/tourService';
import { uploadFile } from '@/services/uploadService';
import { TourType, AccommodationType } from '@/models/Tour';

// Form input sınıflarını güncelle
const inputClass = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2";
const labelClass = "block text-sm font-medium leading-6 text-gray-900 mb-1";
const buttonClass = "flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed";

export default function AddNewTour() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    destination: '',
    duration: '',
    price: '',
    image: null as File | null,
    imagePreview: '',
    status: 'active',
    tourType: TourType.DOMESTIC,
    accommodationType: AccommodationType.WITH_ACCOMMODATION,
    startDate: '',
    endDate: '',
    program: [{ day: '', title: '', description: '' }],
    includedServices: [''],
    excludedServices: [''],
  });
  
  useEffect(() => {
    // Artık destinasyon verileri çekmeye gerek yok
    setIsLoading(false);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    // Form validation
    if (!formData.name || !formData.description || !formData.destination || !formData.duration || !formData.price) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      setSubmitting(false);
      return;
    }
    
    if (!formData.image) {
      alert('Lütfen bir resim yükleyin');
      setSubmitting(false);
      return;
    }
    
    try {
      // 1. Önce resmi yükle
      const uploadResponse = await uploadFile(formData.image, 'tours');
      
      if (!uploadResponse.success || !uploadResponse.url) {
        throw new Error(uploadResponse.message || 'Resim yükleme hatası');
      }
      
      // 2. Tur verilerini hazırla
      const tourData = {
        name: formData.name,
        description: formData.description,
        destination: formData.destination,
        duration: formData.duration,
        price: parseFloat(formData.price.replace(/[^\d.]/g, '')), // Fiyatı temizle ve sayıya çevir
        image: uploadResponse.url,
        isActive: formData.status === 'active',
        tourType: formData.tourType,
        accommodationType: formData.accommodationType,
        startDate: formData.startDate ? new Date(formData.startDate) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        program: formData.program.filter(item => item.day && item.title && item.description),
        includedServices: formData.includedServices.filter(item => item.trim() !== ''),
        excludedServices: formData.excludedServices.filter(item => item.trim() !== ''),
      };
      
      // 3. Turu kaydet
      await createTour(tourData);
      
      // 4. Başarı durumunda turlar sayfasına yönlendir
      router.push('/admin/tours');
      
    } catch (err) {
      console.error('Tur ekleme hatası:', err);
      setError('Tur eklenirken bir hata oluştu: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
      setSubmitting(false);
    }
  };
  
  // Program günü ekleme fonksiyonu
  const handleAddProgramDay = () => {
    setFormData(prev => ({
      ...prev,
      program: [...prev.program, { day: '', title: '', description: '' }]
    }));
  };

  // Program günü çıkarma fonksiyonu
  const handleRemoveProgramDay = (index: number) => {
    setFormData(prev => ({
      ...prev,
      program: prev.program.filter((_, i) => i !== index)
    }));
  };

  // Program güncelleme fonksiyonu
  const handleProgramChange = (index: number, field: string, value: string) => {
    const updatedProgram = [...formData.program];
    updatedProgram[index] = { ...updatedProgram[index], [field]: value };
    
    setFormData(prev => ({
      ...prev,
      program: updatedProgram
    }));
  };

  // Dahil olan hizmetleri ekleme fonksiyonu
  const handleAddIncludedService = () => {
    setFormData(prev => ({
      ...prev,
      includedServices: [...prev.includedServices, '']
    }));
  };

  // Dahil olan hizmet çıkarma fonksiyonu
  const handleRemoveIncludedService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      includedServices: prev.includedServices.filter((_, i) => i !== index)
    }));
  };

  // Dahil olan hizmet güncelleme fonksiyonu
  const handleIncludedServiceChange = (index: number, value: string) => {
    const updatedServices = [...formData.includedServices];
    updatedServices[index] = value;
    
    setFormData(prev => ({
      ...prev,
      includedServices: updatedServices
    }));
  };

  // Dahil olmayan hizmetleri ekleme fonksiyonu
  const handleAddExcludedService = () => {
    setFormData(prev => ({
      ...prev,
      excludedServices: [...prev.excludedServices, '']
    }));
  };

  // Dahil olmayan hizmet çıkarma fonksiyonu
  const handleRemoveExcludedService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      excludedServices: prev.excludedServices.filter((_, i) => i !== index)
    }));
  };

  // Dahil olmayan hizmet güncelleme fonksiyonu
  const handleExcludedServiceChange = (index: number, value: string) => {
    const updatedServices = [...formData.excludedServices];
    updatedServices[index] = value;
    
    setFormData(prev => ({
      ...prev,
      excludedServices: updatedServices
    }));
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Yeni Tur Ekle</h1>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Tur Adı */}
              <div className="mb-4">
                <label htmlFor="name" className={labelClass}>Tur Adı</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              
              {/* Destinasyon */}
              <div className="mb-4">
                <label htmlFor="destination" className={labelClass}>Destinasyon</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              
              {/* Tur Süresi */}
              <div className="mb-4">
                <label htmlFor="duration" className={labelClass}>Tur Süresi</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Örn: 3 Gün 2 Gece"
                  className={inputClass}
                  required
                />
              </div>
              
              {/* Tur Tipi */}
              <div className="mb-4">
                <label htmlFor="tourType" className={labelClass}>Tur Tipi</label>
                <select
                  id="tourType"
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value={TourType.DOMESTIC}>Yurt İçi</option>
                  <option value={TourType.INTERNATIONAL}>Yurt Dışı</option>
                </select>
              </div>
              
              {/* Konaklama Tipi */}
              <div className="mb-4">
                <label htmlFor="accommodationType" className={labelClass}>Konaklama Tipi</label>
                <select
                  id="accommodationType"
                  name="accommodationType"
                  value={formData.accommodationType}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value={AccommodationType.WITH_ACCOMMODATION}>Konaklamalı</option>
                  <option value={AccommodationType.DAILY}>Günübirlik</option>
                </select>
              </div>
              
              {/* Fiyat */}
              <div className="mb-4">
                <label htmlFor="price" className={labelClass}>Fiyat (₺)</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="1500"
                  className={inputClass}
                  required
                />
              </div>
              
              {/* Başlangıç Tarihi */}
              <div className="mb-4">
                <label htmlFor="startDate" className={labelClass}>Başlangıç Tarihi</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-gray-500">Tur belirli bir tarihte başlıyorsa doldurun</p>
              </div>
              
              {/* Bitiş Tarihi */}
              <div className="mb-4">
                <label htmlFor="endDate" className={labelClass}>Bitiş Tarihi</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-gray-500">Tur belirli bir tarihte bitiyorsa doldurun. Bu tarih geçtiğinde tur otomatik olarak pasif duruma geçer.</p>
              </div>
              
              {/* Açıklama */}
              <div className="mb-4">
                <label htmlFor="description" className={labelClass}>Açıklama</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className={inputClass}
                  required
                ></textarea>
              </div>
              
              {/* Tur Programı */}
              <div className="mb-6">
                <label className={labelClass}>Tur Programı</label>
                <div className="space-y-4">
                  {formData.program.map((day, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">Gün {index + 1}</h4>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveProgramDay(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label htmlFor={`day-${index}`} className="block text-xs font-medium text-gray-700">Gün Bilgisi</label>
                          <input
                            type="text"
                            id={`day-${index}`}
                            value={day.day}
                            onChange={(e) => handleProgramChange(index, 'day', e.target.value)}
                            placeholder="Örn: 11 Nisan 2025, Cuma - 1. Gün"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor={`title-${index}`} className="block text-xs font-medium text-gray-700">Başlık</label>
                          <input
                            type="text"
                            id={`title-${index}`}
                            value={day.title}
                            onChange={(e) => handleProgramChange(index, 'title', e.target.value)}
                            placeholder="Örn: Hareket Günü"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor={`description-${index}`} className="block text-xs font-medium text-gray-700">Açıklama</label>
                          <textarea
                            id={`description-${index}`}
                            value={day.description}
                            onChange={(e) => handleProgramChange(index, 'description', e.target.value)}
                            rows={3}
                            placeholder="Gün programı açıklaması"
                            className={inputClass}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddProgramDay}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Yeni Gün Ekle
                  </button>
                </div>
              </div>
              
              {/* Dahil Olan Hizmetler */}
              <div className="mb-6">
                <label className={labelClass}>Dahil Olan Hizmetler</label>
                <div className="space-y-2">
                  {formData.includedServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => handleIncludedServiceChange(index, e.target.value)}
                        placeholder="Dahil olan hizmet"
                        className={`${inputClass} flex-grow`}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIncludedService(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddIncludedService}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Dahil Hizmet Ekle
                  </button>
                </div>
              </div>
              
              {/* Dahil Olmayan Hizmetler */}
              <div className="mb-6">
                <label className={labelClass}>Dahil Olmayan Hizmetler</label>
                <div className="space-y-2">
                  {formData.excludedServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => handleExcludedServiceChange(index, e.target.value)}
                        placeholder="Dahil olmayan hizmet"
                        className={`${inputClass} flex-grow`}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveExcludedService(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddExcludedService}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Dahil Olmayan Hizmet Ekle
                  </button>
                </div>
              </div>
              
              {/* Durum */}
              <div className="mb-4">
                <label htmlFor="status" className={labelClass}>Durum</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Pasif</option>
                </select>
              </div>
              
              {/* Resim Yükleme */}
              <div className="mb-6">
                <label htmlFor="image" className={labelClass}>Tur Görseli</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                />
                
                {formData.imagePreview && (
                  <div className="mt-2">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="h-40 rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
              
              {/* Aksiyon Butonları */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="rounded-md px-3 py-1.5 text-sm font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className={buttonClass}
                  disabled={submitting}
                >
                  {submitting ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
} 