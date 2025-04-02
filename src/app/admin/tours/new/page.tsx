'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

// Örnek destinasyonlar (gerçek uygulamada API'den gelecek)
const demoDestinations = [
  { id: 'istanbul', name: 'İstanbul' },
  { id: 'cappadocia', name: 'Kapadokya' },
  { id: 'antalya', name: 'Antalya' },
  { id: 'pamukkale', name: 'Pamukkale' },
  { id: 'izmir', name: 'İzmir' },
  { id: 'bodrum', name: 'Bodrum' },
];

export default function AddNewTour() {
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    destinationId: '',
    duration: '',
    price: '',
    image: null as File | null,
    imagePreview: '',
    status: 'active',
  });
  
  const router = useRouter();
  
  // Check if admin is logged in
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      if (!isLoggedIn) {
        router.push('/admin/login');
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ 
        ...prev, 
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Form validation
    if (!formData.name || !formData.description || !formData.destinationId || !formData.duration || !formData.price) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      setSubmitting(false);
      return;
    }
    
    // Demo: Gerçek uygulamada burada API çağrısı yapılacak
    setTimeout(() => {
      console.log('Tur eklendi:', formData);
      setSubmitting(false);
      
      // Turlar sayfasına yönlendir
      router.push('/admin/tours');
    }, 1000);
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
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Yeni Tur Ekle</h1>
              <p className="text-gray-600">Sisteme yeni bir tur paketi ekleyin</p>
            </div>
            <Link 
              href="/admin/tours"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Turlar Listesine Dön
            </Link>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Tur Adı <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Açıklama <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="destinationId" className="block text-sm font-medium text-gray-700">
                      Destinasyon <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="destinationId"
                      name="destinationId"
                      value={formData.destinationId}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">-- Destinasyon Seçin --</option>
                      {demoDestinations.map(dest => (
                        <option key={dest.id} value={dest.id}>{dest.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Süre <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="örn: 3 Gün"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Fiyat <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="örn: ₺3,500"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Durum
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Pasif</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tur Resmi
                    </label>
                    <div className="mt-1 flex items-center">
                      <div 
                        className="h-32 w-32 border-2 border-gray-300 border-dashed rounded-md flex justify-center items-center relative"
                      >
                        {formData.imagePreview ? (
                          <div className="h-full w-full relative">
                            <img 
                              src={formData.imagePreview} 
                              alt="Preview" 
                              className="h-full w-full object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: '' }))}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-sm"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <svg 
                              className="mx-auto h-12 w-12 text-gray-400" 
                              stroke="currentColor" 
                              fill="none" 
                              viewBox="0 0 48 48" 
                              aria-hidden="true"
                            >
                              <path 
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                                strokeWidth={2} 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm cursor-pointer">
                          <span>Resim Yükle</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF formatları desteklenir</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t pt-6 flex justify-end">
                <Link
                  href="/admin/tours"
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  İptal
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
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