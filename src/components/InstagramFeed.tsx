'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
}

// Mevcut tur resimlerini Instagram gönderileri olarak kullanıyoruz
const posts: InstagramPost[] = [
  {
    id: '1',
    imageUrl: '/images/istanbul-lale.jpeg',
    caption: 'İstanbul Lale Festivali',
    permalink: 'https://instagram.com/buyukaytactravel'
  },
  {
    id: '2',
    imageUrl: '/images/kapadokya.jpeg',
    caption: 'Kapadokya',
    permalink: 'https://instagram.com/buyukaytactravel'
  },
  {
    id: '3',
    imageUrl: '/images/alacati-ot.jpeg',
    caption: 'Alaçatı Ot Festivali',
    permalink: 'https://instagram.com/buyukaytactravel'
  },
  {
    id: '4',
    imageUrl: '/images/ayvalik-cunda-12-temmuz.jpeg',
    caption: 'Ayvalık Cunda',
    permalink: 'https://instagram.com/buyukaytactravel'
  },
  {
    id: '5',
    imageUrl: '/images/bursa-mudanya-tirilye-26-temmuz.jpeg',
    caption: 'Bursa Mudanya',
    permalink: 'https://instagram.com/buyukaytactravel'
  }
];

export default function InstagramFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  return (
    <section className="py-8 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header - küçük */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <h2 className="text-xl font-bold text-gray-900">Instagram</h2>
          <a 
            href="https://instagram.com/buyukaytactravel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 text-sm font-medium"
          >
            @buyukaytactravel
          </a>
        </div>

        {/* Carousel - daha küçük */}
        <div className="relative max-w-2xl mx-auto">
          {/* Main Image - daha küçük aspect */}
          <div className="relative aspect-[4/3] bg-white rounded-xl shadow-md overflow-hidden">
            <Image
              src={posts[currentIndex].imageUrl}
              alt={posts[currentIndex].caption}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
            
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-sm font-medium truncate">
                {posts[currentIndex].caption}
              </p>
            </div>
          </div>

          {/* Navigation - daha küçük oklar */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white/90 rounded-full shadow p-2 hover:bg-white transition-colors"
            aria-label="Önceki"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white/90 rounded-full shadow p-2 hover:bg-white transition-colors"
            aria-label="Sonraki"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnails - daha küçük */}
        <div className="flex justify-center gap-2 mt-3">
          {posts.map((post, index) => (
            <button
              key={post.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-12 h-12 rounded-md overflow-hidden transition-all ${
                index === currentIndex 
                  ? 'ring-2 ring-pink-500 scale-105' 
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <Image
                src={post.imageUrl}
                alt={post.caption}
                fill
                className="object-cover"
                sizes="48px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
