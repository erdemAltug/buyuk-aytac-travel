'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { getBlogs, deleteBlog, updateBlog } from '@/services/blogService';
import { IBlog } from '@/models/Blog';
import Image from 'next/image';

export default function AdminBlogs() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  // Admin girişini kontrol et
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      fetchBlogs();
    }
  }, [router]);
  
  // Tüm blogları getir
  const fetchBlogs = async () => {
    try {
      // Published durumu olmadan tümünü getir
      const data = await getBlogs(undefined, false);
      setBlogs(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Blogları getirme hatası:', err);
      setError('Blogları yüklerken bir hata oluştu');
      setIsLoading(false);
    }
  };
  
  // Blog durumunu değiştir (aktif/pasif)
  const handleStatusChange = async (blogId: string, isPublished: boolean) => {
    try {
      const blogToUpdate = blogs.find(blog => blog._id?.toString() === blogId);
      if (!blogToUpdate) return;
      
      // Veritabanında aktiflik durumunu güncelle
      await updateBlog(blogToUpdate.slug, { isPublished });
      
      // UI'ı güncelle
      setBlogs(blogs.map(blog => 
        blog._id?.toString() === blogId ? { ...blog, isPublished } as IBlog : blog
      ));
    } catch (err) {
      console.error('Durum güncelleme hatası:', err);
      alert('Durum güncellenirken bir hata oluştu');
    }
  };
  
  // Blog sil
  const handleDeleteBlog = async (blogId: string, slug: string) => {
    if (window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
      try {
        await deleteBlog(slug);
        // UI'dan kaldır
        setBlogs(blogs.filter(blog => blog._id?.toString() !== blogId));
      } catch (err) {
        console.error('Blog silme hatası:', err);
        alert('Blog silinirken bir hata oluştu');
      }
    }
  };
  
  // Tarihi formatla
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  // Kategori adını formatla
  const formatCategory = (category: string) => {
    const categories: Record<string, string> = {
      'travel-tips': 'Seyahat Tavsiyeleri',
      'destinations': 'Destinasyonlar',
      'culture': 'Kültür ve Tarih',
      'food': 'Yemek ve Gastronomi'
    };
    
    return categories[category] || category;
  };
  
  // Arama filtrelemesi
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-2xl font-semibold text-gray-800">Blog Yazıları</h1>
              <p className="text-gray-600">Blog yazılarını yönetin, düzenleyin ve yenilerini ekleyin</p>
            </div>
            <Link 
              href="/admin/blogs/new"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Yeni Blog Yazısı Ekle
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
                    placeholder="Blog yazısı ara..."
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
                    Blog Yazısı
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Yazar
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
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
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id?.toString()}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative rounded overflow-hidden">
                          <Image
                            src={blog.image}
                            alt={blog.title}
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
                          <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-md">
                            {blog.summary.length > 100 ? `${blog.summary.substring(0, 100)}...` : blog.summary}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{blog.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(blog.publishDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={blog.isPublished ? 'published' : 'draft'}
                        onChange={(e) => handleStatusChange(blog._id?.toString() || '', e.target.value === 'published')}
                        className={`block w-full rounded-md text-sm font-medium px-2 py-1 border ${
                          blog.isPublished
                            ? 'text-green-800 bg-green-100 border-green-200' 
                            : 'text-gray-800 bg-gray-100 border-gray-200'
                        }`}
                      >
                        <option value="published">Yayında</option>
                        <option value="draft">Taslak</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/blogs/edit/${blog.slug}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Düzenle
                        </Link>
                        <button
                          onClick={() => handleDeleteBlog(blog._id?.toString() || '', blog.slug)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredBlogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      Herhangi bir blog yazısı bulunamadı
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