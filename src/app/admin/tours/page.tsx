'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

// Örnek turlar verisi (gerçek uygulamada API'den gelecek)
const demoTours = [
  {
    id: 'istanbul-klasik',
    name: 'İstanbul Klasik Turu',
    duration: '2 Gün',
    price: '₺2,500',
    description: "İstanbul'un en önemli tarihi yerlerini keşfedin. Ayasofya, Topkapı Sarayı ve Kapalıçarşı dahil.",
    image: '/tours/istanbul-classic.jpg',
    status: 'active',
  },
  {
    id: 'kapadokya-balon',
    name: 'Kapadokya Balon Turu',
    duration: '3 Gün',
    price: '₺4,200',
    description: "Nefes kesici manzaralar için sıcak hava balonu dahil tam Kapadokya deneyimi.",
    image: '/tours/cappadocia-balloon.jpg',
    status: 'active',
  },
  {
    id: 'ege-sahilleri',
    name: 'Ege Sahilleri Turu',
    duration: '5 Gün',
    price: '₺5,800',
    description: "Türkiye'nin muhteşem Ege kıyısı boyunca antik kentler ve masmavi koylarda unutulmaz bir tatil.",
    image: '/tours/aegean-coast.jpg',
    status: 'active',
  },
  {
    id: 'guneydogu-lezzetleri',
    name: 'Güneydoğu Lezzetleri',
    duration: '4 Gün',
    price: '₺3,900',
    description: "Gaziantep, Şanlıurfa ve Mardin'de Türkiye'nin en zengin mutfak kültürünü ve tarihi dokusunu keşfedin.",
    image: '/tours/southeast-flavors.jpg',
    status: 'inactive',
  },
];

export default function AdminTours() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState(demoTours);
  const [searchTerm, setSearchTerm] = useState('');
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
  
  const handleStatusChange = (tourId: string, newStatus: string) => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    setTours(tours.map(tour => 
      tour.id === tourId ? { ...tour, status: newStatus } : tour
    ));
  };
  
  const handleDeleteTour = (tourId: string) => {
    // Gerçek uygulamada burada API çağrısı yapılacak
    if (window.confirm('Bu turu silmek istediğinize emin misiniz?')) {
      setTours(tours.filter(tour => tour.id !== tourId));
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
                  <tr key={tour.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative rounded overflow-hidden">
                          <div className="absolute inset-0 bg-gray-200"></div>
                          {/* Gerçek uygulamada burada <Image> komponenti kullanılacak */}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tour.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-md">{tour.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tour.duration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tour.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={tour.status}
                        onChange={(e) => handleStatusChange(tour.id, e.target.value)}
                        className={`block w-full rounded-md text-sm font-medium px-2 py-1 border ${
                          tour.status === 'active' 
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
                          href={`/admin/tours/edit/${tour.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Düzenle
                        </Link>
                        <button
                          onClick={() => handleDeleteTour(tour.id)}
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