'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogs, getBlogsByCategory } from '@/services/blogService';
import { IBlog } from '@/models/Blog';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Blog kategorileri
  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'travel-tips', name: 'Seyahat Tavsiyeleri' },
    { id: 'destinations', name: 'Destinasyonlar' },
    { id: 'culture', name: 'Kültür ve Tarih' },
    { id: 'food', name: 'Yemek ve Gastronomi' },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        let data;
        
        if (activeCategory === 'all') {
          data = await getBlogs();
        } else {
          data = await getBlogsByCategory(activeCategory);
        }
        
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        console.error('Blog yazılarını getirme hatası:', err);
        setError('Blog yazıları yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
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

  if (loading) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
            <div className="flex justify-center">
              <div className="h-8 w-96 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-56 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
          
          {/* Kategori Filtreleme */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                } transition-colors`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {error && <p className="text-red-500 mb-8">{error}</p>}
          
          {blogs.length === 0 && !loading && !error ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Bu kategoride henüz blog yazısı bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article key={blog._id?.toString()} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="relative h-56 w-full">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span>{formatDate(blog.publishDate)}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.author}</span>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{blog.title}</h2>
                      <p className="text-gray-600 line-clamp-3 mb-4">{blog.summary}</p>
                      <div className="flex items-center text-blue-600 font-medium">
                        Devamını Oku
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 