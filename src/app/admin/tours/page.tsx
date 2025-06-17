'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { getTours, deleteTour, updateTour } from '@/services/tourService';
import { ITour } from '@/models/Tour';
import Image from 'next/image';

export default function AdminTours() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState<ITour[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  // Admin girişini kontrol et
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn');
      if (!isLoggedIn) {
        router.push('/admin/login');
      } else {
        fetchTours();
      }
    };
    
    checkAuth();
  }, [router]);
  
  // MongoDB'den turları çek
  const fetchTours = async () => {
    try {
      const data = await getTours();
      setTours(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Turları getirme hatası:', err);
      setError('Turları yüklerken bir hata oluştu');
      setIsLoading(false);
    }
  };
  
  const handleStatusChange = async (tourId: string, isActive: boolean) => {
    try {
      const tourToUpdate = tours.find(tour => tour._id?.toString() === tourId);
      if (!tourToUpdate) return;
      
      // Veritabanında aktiflik durumunu güncelle
      await updateTour(tourToUpdate.slug, { isActive } as Partial<ITour>);
      
      // UI'ı güncelle
      setTours(tours.map(tour => 
        tour._id?.toString() === tourId ? { ...tour, isActive } as ITour : tour
      ));
    } catch (err) {
      console.error('Durum güncelleme hatası:', err);
      alert('Durum güncellenirken bir hata oluştu');
    }
  };
  
  const handleDeleteTour = async (tourId: string, slug: string) => {
    if (window.confirm('Bu turu silmek istediğinize emin misiniz?')) {
      try {
        await deleteTour(slug);
        // UI'dan kaldır
        setTours(tours.filter(tour => tour._id?.toString() !== tourId));
      } catch (err) {
        console.error('Tur silme hatası:', err);
        alert('Tur silinirken bir hata oluştu');
      }
    }
  };
  
  // Arama filtrelemesi
  const filteredTours = tours.filter(tour => 
    tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Turlar</h1>
              <p className="text-gray-600">Turları yönetin, düzenleyin ve yenilerini ekleyin</p>
            </div>
            <div className="flex space-x-3">
              <Link 
                href="/admin/tours/bulk"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Toplu Tur Ekle
              </Link>
              <Link 
                href="/admin/tours/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Yeni Tur Ekle
              </Link>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm"
                    placeholder="Tur ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tur
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Süre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fiyat
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTours.map((tour) => (
                  <tr key={tour._id?.toString()}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative rounded overflow-hidden">
                          <Image
                            src={tour.image}
                            alt={tour.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-image.jpg';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tour.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-md">
                            {tour.description.length > 100 ? `${tour.description.substring(0, 100)}...` : tour.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tour.duration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">₺{tour.price.toLocaleString('tr-TR')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={tour.isActive ? 'active' : 'inactive'}
                        onChange={(e) => handleStatusChange(tour._id?.toString() || '', e.target.value === 'active')}
                        className={`block w-full rounded-md text-sm font-medium px-2 py-1 border ${
                          tour.isActive
                            ? 'text-green-800 bg-green-100 border-green-200' 
                            : 'text-red-800 bg-red-100 border-red-200'
                        }`}
                      >
                        <option value="active">Aktif</option>
                        <option value="inactive">Pasif</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/tours/edit/${tour.slug}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Düzenle
                        </Link>
                        <button
                          onClick={() => handleDeleteTour(tour._id?.toString() || '', tour.slug)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredTours.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      Herhangi bir tur bulunamadı
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
} 