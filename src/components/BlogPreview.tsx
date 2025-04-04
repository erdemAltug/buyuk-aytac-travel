'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLatestBlogs } from '@/services/blogService';
import { IBlog } from '@/models/Blog';

export default function BlogPreview() {
  const [latestBlogs, setLatestBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const blogs = await getLatestBlogs(3);
        setLatestBlogs(blogs);
        setLoading(false);
      } catch (err) {
        console.error('Blog yazılarını getirme hatası:', err);
        setError('Blog yazıları yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Blog</h2>
            <p className="mt-4 text-lg text-gray-600">Seyahat tavsiyeleri ve gezi rehberleri</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(item => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null; // Ana sayfada hata göstermek yerine bileşeni gizle
  }

  if (latestBlogs.length === 0) {
    return null; // Blog yazısı yoksa bileşeni gösterme
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Blog</h2>
          <p className="mt-4 text-lg text-gray-600">Seyahat tavsiyeleri ve gezi rehberleri</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map(blog => (
            <article key={blog._id?.toString()} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/blog/${blog.slug}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{formatDate(blog.publishDate)}</p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{blog.title}</h3>
                  <p className="text-gray-600 line-clamp-2 mb-4">{blog.summary}</p>
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
        
        <div className="text-center mt-12">
          <Link href="/blog" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Tüm Blog Yazılarını Gör
          </Link>
        </div>
      </div>
    </section>
  );
} 