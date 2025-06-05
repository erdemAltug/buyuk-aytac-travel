'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IBlog } from '@/models/Blog';
import { useRouter } from 'next/navigation';

// Blog kategorileri
const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'travel-tips', name: 'Seyahat Tavsiyeleri' },
  { id: 'destinations', name: 'Destinasyonlar' },
  { id: 'culture', name: 'Kültür ve Tarih' },
  { id: 'food', name: 'Yemek ve Gastronomi' },
];

// Tarihi formatla
const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

export default function BlogContent({ 
  blogs, 
  activeCategory 
}: { 
  blogs: IBlog[];
  activeCategory: string;
}) {
  const router = useRouter();

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      router.push('/blog');
    } else {
      router.push(`/blog?category=${categoryId}`);
    }
  };

  return (
    <>
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
      
      {blogs.length === 0 ? (
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
    </>
  );
} 