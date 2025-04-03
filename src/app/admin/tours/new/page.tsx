'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { getDestinations } from '@/services/destinationService';
import { createTour } from '@/services/tourService';
import { uploadFile } from '@/services/uploadService';
import { IDestination } from '@/models/Destination';
import { ITour, TourType, AccommodationType } from '@/models/Tour';

// Form input sınıflarını güncelle
const inputClass = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-2";
const labelClass = "block text-sm font-medium leading-6 text-gray-900 mb-1";
const buttonClass = "flex justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed";

export default function AddNewTour() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    destinationId: '',
    duration: '',
    price: '',
    image: null as File | null,
    imagePreview: '',
    status: 'active',
    tourType: TourType.DOMESTIC,
    accommodationType: AccommodationType.WITH_ACCOMMODATION
  });
  
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Destinasyonları getirme hatası:', err);
        setError('Destinasyonlar yüklenirken bir hata oluştu');
        setIsLoading(false);
      }
    };
    
    fetchDestinations();
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
    if (!formData.name || !formData.description || !formData.destinationId || !formData.duration || !formData.price) {
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
        destinationId: formData.destinationId,
        duration: formData.duration,
        price: parseFloat(formData.price.replace(/[^\d.]/g, '')), // Fiyatı temizle ve sayıya çevir
        image: uploadResponse.url,
        isActive: formData.status === 'active',
        tourType: formData.tourType,
        accommodationType: formData.accommodationType
      };
      
      // 3. Turu kaydet
      // API string olarak destinationId kabul ediyor, ancak tip kontrolünü geçmek için
      // Partial<ITour> & { destinationId: string } şeklinde belirtiyoruz
      await createTour(tourData as Partial<ITour> & { destinationId: string });
      
      // 4. Başarı durumunda turlar sayfasına yönlendir
      router.push('/admin/tours');
      
    } catch (err) {
      console.error('Tur ekleme hatası:', err);
      setError('Tur eklenirken bir hata oluştu: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
      setSubmitting(false);
    }
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
                <label htmlFor="destinationId" className={labelClass}>Destinasyon</label>
                <select
                  id="destinationId"
                  name="destinationId"
                  value={formData.destinationId}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Seçiniz</option>
                  {destinations.map((destination) => (
                    <option key={destination._id?.toString()} value={destination._id?.toString()}>
                      {destination.name}
                    </option>
                  ))}
                </select>
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