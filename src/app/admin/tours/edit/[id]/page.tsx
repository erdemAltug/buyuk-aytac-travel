'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { getTourBySlug, updateTour } from '@/services/tourService';
import { ITour } from '@/models/Tour';

export default function EditTourPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tour, setTour] = useState<ITour>({} as ITour);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = params; // URL'den tur slug'ını al
  
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      if (!isLoggedIn) {
        router.push('/admin/login');
      } else {
        fetchTour();
      }
    };
    
    checkAuth();
  }, [router, id]);
  
  const fetchTour = async () => {
    try {
      const data = await getTourBySlug(id);
      setTour(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Tur bilgisi getirme hatası:', err);
      setError('Tur bilgilerini yüklerken bir hata oluştu');
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Boolean değerlerin işlenmesi
    if (name === 'isActive' || name === 'isLastMinute') {
      setTour(prev => ({ ...prev, [name]: value === 'true' }) as ITour);
      return;
    }
    
    // Sayısal değerlerin işlenmesi
    if (type === 'number') {
      setTour(prev => ({ ...prev, [name]: value === '' ? null : Number(value) }) as ITour);
      return;
    }
    
    // Diğer alanların işlenmesi
    setTour(prev => ({ ...prev, [name]: value }) as ITour);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Tur güncelleme işlemi
      await updateTour(id, tour);
      router.push('/admin/tours');
    } catch (err) {
      console.error('Tur güncelleme hatası:', err);
      setError('Tur güncellenirken bir hata oluştu');
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
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Tur Düzenle</h2>
              <p className="text-sm text-gray-600">Tur detaylarını güncelleyebilirsiniz</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Tur Adı
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={tour.name || ''}
                    onChange={(e) => handleChange(e)}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black"
                  />
                </div>
                
                <div className="col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={6}
                    value={tour.description || ''}
                    onChange={(e) => handleChange(e)}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black"
                  />
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Süre
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    value={tour.duration || ''}
                    onChange={(e) => handleChange(e)}
                    required
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black"
                  />
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={tour.price || ''}
                    onChange={(e) => handleChange(e)}
                    required
                    min="0"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black"
                  />
                </div>
                
                {/* Wrapping these form elements in a fragment */}
                <>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">
                    Durum
                  </label>
                  <select
                    id="isActive"
                    name="isActive"
                    value={tour.isActive ? "true" : "false"}
                    onChange={(e) => handleChange(e)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Pasif</option>
                  </select>
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="isLastMinute" className="block text-sm font-medium text-gray-700">
                    Son Dakika Fırsatı
                  </label>
                  <select
                    id="isLastMinute"
                    name="isLastMinute"
                    value={tour.isLastMinute ? "true" : "false"}
                    onChange={(e) => handleChange(e)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  >
                    <option value="false">Hayır</option>
                    <option value="true">Evet</option>
                  </select>
                </div>
                
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700">
                    İndirim Oranı (%)
                  </label>
                  <input
                    type="number"
                    name="discountRate"
                    id="discountRate"
                    value={tour.discountRate || ''}
                    onChange={(e) => handleChange(e)}
                    min="0"
                    max="100"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-black"
                  />
                </div>
                </>
              </div>
              
              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => router.push('/admin/tours')}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
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