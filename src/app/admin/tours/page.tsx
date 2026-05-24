'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getTours, deleteTour, updateTour } from '@/services/tourService';
import { ITour } from '@/types/tour';
import TourImage from '@/components/admin/TourImage';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function AdminTours() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState<ITour[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
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
      
      await updateTour(tourToUpdate.slug, { isActive } as Partial<ITour>);
      
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
        setTours(tours.filter(tour => tour._id?.toString() !== tourId));
      } catch (err) {
        console.error('Tur silme hatası:', err);
        alert('Tur silinirken bir hata oluştu');
      }
    }
  };
  
  const filteredTours = tours.filter(tour => 
    tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 text-center p-4">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Turlar</h1>
              <p className="text-sm text-gray-500">Toplam {tours.length} tur</p>
            </div>
            <div className="flex gap-2">
              <Link 
                href="/admin/tours/bulk"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Toplu Ekle</span>
              </Link>
              <Link 
                href="/admin/tours/new"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Yeni Tur</span>
              </Link>
            </div>
          </div>
          
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Tur ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Mobile Card View */}
          <div className="grid gap-4 md:hidden">
            {filteredTours.map((tour) => (
              <div key={tour._id?.toString()} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex">
                  <TourImage
                    src={tour.image}
                    alt={tour.name}
                    className="w-24 h-24 flex-shrink-0"
                  />
                  <div className="flex-1 p-3 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{tour.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{tour.duration}</p>
                    <p className="text-sm font-semibold text-blue-600 mt-1">₺{tour.price.toLocaleString('tr-TR')}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-t">
                  <select
                    value={tour.isActive ? 'active' : 'inactive'}
                    onChange={(e) => handleStatusChange(tour._id?.toString() || '', e.target.value === 'active')}
                    className={`text-xs font-medium px-2 py-1 rounded-full border ${
                      tour.isActive
                        ? 'text-green-700 bg-green-100 border-green-200' 
                        : 'text-red-700 bg-red-100 border-red-200'
                    }`}
                  >
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                  </select>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/tours/edit/${tour.slug}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteTour(tour._id?.toString() || '', tour.slug)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredTours.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Herhangi bir tur bulunamadı
              </div>
            )}
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTours.map((tour) => (
                  <tr key={tour._id?.toString()} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <TourImage
                          src={tour.image}
                          alt={tour.name}
                          className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tour.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-md">
                            {tour.description.length > 80 ? `${tour.description.substring(0, 80)}...` : tour.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tour.duration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₺{tour.price.toLocaleString('tr-TR')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={tour.isActive ? 'active' : 'inactive'}
                        onChange={(e) => handleStatusChange(tour._id?.toString() || '', e.target.value === 'active')}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer ${
                          tour.isActive
                            ? 'text-green-700 bg-green-100 border-green-200' 
                            : 'text-red-700 bg-red-100 border-red-200'
                        }`}
                      >
                        <option value="active">Aktif</option>
                        <option value="inactive">Pasif</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/tours/edit/${tour.slug}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDeleteTour(tour._id?.toString() || '', tour.slug)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredTours.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                      Herhangi bir tur bulunamadı
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    </>
  );
}
