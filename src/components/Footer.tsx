'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { getTours } from '@/services/tourService';
import { ITour } from '@/models/Tour';

interface SocialIcon {
  name: string;
  href: string;
  icon: React.FC<{ className?: string }>;
}

export default function Footer() {
  const [popularTours, setPopularTours] = useState<ITour[]>([]);
  const [toursLoading, setToursLoading] = useState(true);

  useEffect(() => {
    const fetchPopularTours = async () => {
      try {
        // Aktif turları getir ve son 5 tanesini göster
        const tours = await getTours({ isActive: true });
        setPopularTours(tours.slice(0, 5));
        setToursLoading(false);
      } catch (error) {
        console.error('Footer turları yüklenirken hata:', error);
        setToursLoading(false);
      }
    };

    fetchPopularTours();
  }, []);

  const socialLinks: SocialIcon[] = [
    {
      name: 'Facebook',
      href: '#',
      icon: ({ className }) => (
        <svg className={`h-6 w-6 ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: ({ className }) => (
        <svg className={`h-6 w-6 ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: ({ className }) => (
        <svg className={`h-6 w-6 ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: ({ className }) => (
        <svg className={`h-6 w-6 ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    {
      name: 'Ana Sayfa',
      href: '/',
    },
    {
      name: 'Turlar',
      href: '/tours',
    },
    {
      name: 'Hakkımızda',
      href: '/about',
    },
    {
      name: 'İletişim',
      href: '/contact',
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'Büyük Aytaç Seyahat',
              image: 'https://www.buyukaytacseyahat.com/images/LOGO.png',
              '@id': 'https://www.buyukaytacseyahat.com',
              url: 'https://www.buyukaytacseyahat.com',
              telephone: '+905300609559',
              priceRange: '₺₺',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Gazi Mustafa Kemalpaşa, Tokuşlar Sk. Güneşler İş Merkezi No:7 Kat:1 Daire:1',
                addressLocality: 'Çerkezköy',
                addressRegion: 'Tekirdağ',
                postalCode: '59500',
                addressCountry: 'TR'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 41.2861,  // Çerkezköy koordinatları
                longitude: 28.0058
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday'
                  ],
                  opens: '09:00',
                  closes: '18:00'
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '09:00',
                  closes: '13:00'
                }
              ],
              sameAs: [
                'https://www.facebook.com/buyukaytacseyahat',
                'https://www.instagram.com/buyukaytacseyahat'
              ]
            })
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="mb-10 md:mb-0">
            <div className="flex items-center mb-6">
              <div className="relative h-24 w-40 mr-3">
                <Image
                  src="/images/LOGO.png"
                  alt="Büyük Aytaç Seyahat Logo"
                  fill
                  className="object-contain object-center brightness-110"
                />
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Türkiye&apos;nin ve dünyanın en güzel yerlerini keşfetmenize yardımcı oluyoruz.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="mb-10 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRightIcon className="h-4 w-4 mr-2 text-blue-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-10 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Popüler Turlarımız
            </h3>
            <ul className="space-y-3">
              {toursLoading ? (
                <li className="text-gray-400">Yükleniyor...</li>
              ) : popularTours.length > 0 ? (
                popularTours.map((tour) => (
                  <li key={tour._id?.toString()}>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                    >
                      <ChevronRightIcon className="h-4 w-4 mr-2 text-blue-400" />
                      {tour.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Henüz tur bulunmuyor</li>
              )}
            </ul>
          </div>
          
          <div className="mb-10 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 text-white">
              İletişim
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <span className="text-white mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="text-white">Gazi Mustafa Kemalpaşa, Tokuşlar Sk. Güneşler İş Merkezi No:7 Kat:1 Daire:1, 59500 Çerkezköy/Tekirdağ</span>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span className="text-white">0530 060 95 59 / 0539 345 95 59</span>
              </li>
              <li className="flex items-center">
                <span className="text-white mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="text-white">info@buyukaytac.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Büyük Aytaç Seyahat. Tüm hakları saklıdır.
            </p>
            <a 
              href="https://www.tursab.org.tr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
              title="TÜRSAB - Türkiye Seyahat Acentaları Birliği"
            >
              <Image 
                src="/images/tursab.png" 
                alt="TÜRSAB Logo" 
                width={80} 
                height={40}
                className="object-contain" 
              />
            </a>
          </div>
          <div className="mt-6 md:mt-0">
            <ul className="flex flex-wrap justify-center space-x-6 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Gizlilik Politikası</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">Kullanım Şartları</Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-400 hover:text-white transition-colors duration-300">Yönetici Girişi</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 