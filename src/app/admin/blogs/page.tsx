'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getBlogs, deleteBlog, updateBlog } from '@/services/blogService';
import { IBlog } from '@/models/Blog';
import TourImage from '@/components/admin/TourImage';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function AdminBlogs() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      fetchBlogs();
    }
  }, [router]);
  
  const fetchBlogs = async () => {
    try {
      const data = await getBlogs(undefined, false);
      setBlogs(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Blogları getirme hatası:', err);
      setError('Blogları yüklerken bir hata oluştu');
      setIsLoading(false);
    }
  };
  
  const handleStatusChange = async (blogId: string, isPublished: boolean) => {
    try {
      const blogToUpdate = blogs.find(blog => blog._id?.toString() === blogId);
      if (!blogToUpdate) return;
      
      await updateBlog(blogToUpdate.slug, { isPublished });
      
      setBlogs(blogs.map(blog => 
        blog._id?.toString() === blogId ? { ...blog, isPublished } as IBlog : blog
      ));
    } catch (err) {
      console.error('Durum güncelleme hatası:', err);
      alert('Durum güncellenirken bir hata oluştu');
    }
  };
  
  const handleDeleteBlog = async (blogId: string, slug: string) => {
    if (window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
      try {
        await deleteBlog(slug);
        setBlogs(blogs.filter(blog => blog._id?.toString() !== blogId));
      } catch (err) {
        console.error('Blog silme hatası:', err);
        alert('Blog silinirken bir hata oluştu');
      }
    }
  };
  
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Blog Yazıları</h1>
          <p className="text-sm text-gray-500">Toplam {blogs.length} yazı</p>
        </div>
        <Link 
          href="/admin/blogs/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Yeni Blog</span>
        </Link>
      </div>
      
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Blog ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {filteredBlogs.map((blog) => (
          <div key={blog._id?.toString()} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex gap-3">
              <TourImage
                src={blog.image}
                alt={blog.title}
                className="w-16 h-16 rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{blog.title}</h3>
                <p className="text-sm text-gray-500">{blog.author}</p>
                <p className="text-xs text-gray-400">{formatDate(blog.publishDate)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <select
                value={blog.isPublished ? 'published' : 'draft'}
                onChange={(e) => handleStatusChange(blog._id?.toString() || '', e.target.value === 'published')}
                className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${
                  blog.isPublished
                    ? 'text-green-700 bg-green-100' 
                    : 'text-gray-700 bg-gray-100'
                }`}
              >
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
              </select>
              <div className="flex gap-2">
                <Link
                  href={`/admin/blogs/edit/${blog.slug}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDeleteBlog(blog._id?.toString() || '', blog.slug)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Herhangi bir blog yazısı bulunamadı
          </div>
        )}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border overflow-hidden">
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
              <tr key={blog._id?.toString()} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <TourImage
                      src={blog.image}
                      alt={blog.title}
                      className="h-10 w-10 rounded flex-shrink-0"
                    />
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
                    className={`text-sm font-medium px-2 py-1 rounded-full border-0 ${
                      blog.isPublished
                        ? 'text-green-700 bg-green-100' 
                        : 'text-gray-700 bg-gray-100'
                    }`}
                  >
                    <option value="published">Yayında</option>
                    <option value="draft">Taslak</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blogs/edit/${blog.slug}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteBlog(blog._id?.toString() || '', blog.slug)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredBlogs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                  Herhangi bir blog yazısı bulunamadı
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
