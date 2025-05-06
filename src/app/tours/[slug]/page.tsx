import Image from 'next/image';
import Link from 'next/link';
import { ITour } from '@/models/Tour';
import PriceCalculator from '@/components/PriceCalculator';
import ContactForm from '@/components/ContactForm';


// Tur sayfaları için Server Component kullanımı
export async function generateStaticParams() {
  try {
    // API yerine doğrudan veritabanından çeken fonksiyonu kullan
    // lib içindeki fonksiyonları import edip kullanabiliriz
    const { getToursByDB } = await import('@/lib/tours');
    const tours = await getToursByDB();
    
    // Her tur için slug parametresi oluştur
    return tours.map((tour: ITour) => ({
      slug: tour.slug,
    }));
  } catch (error) {
    console.error('Static params generation error:', error);
    return [];
  }
}

// Sayfanın yeniden doğrulanma süresi (saniye cinsinden)
export const revalidate = 3600; // Her saat başı yeniden doğrula

// Server-side rendering için async fonksiyon olarak tanımla
export default async function TourDetail({ params }: { params: { slug: string } }) {
  let tour: ITour | null = null;
  let error = '';
  
  try {
    // API yerine doğrudan veritabanından çeken yaklaşımı kullan
    await import('@/lib/dbConnect').then((module) => module.default());
    const Tour = (await import('@/models/Tour')).default;
    
    tour = await Tour.findOne({ slug: params.slug }).lean();
    
    // tour içindeki _id'yi string'e çevir
    if (tour) {
      tour._id = (tour._id as unknown as { toString(): string }).toString();
      
      // Date nesnelerini formatlı şekilde çevir
      if (tour.createdAt) tour.createdAt = new Date(tour.createdAt);
      if (tour.updatedAt) tour.updatedAt = new Date(tour.updatedAt);
      if (tour.startDate) tour.startDate = new Date(tour.startDate);
      if (tour.endDate) tour.endDate = new Date(tour.endDate);
    }
  } catch (err) {
    console.error('Tur detayı getirme hatası:', err);
    error = 'Tur detayı yüklenirken bir hata oluştu.';
  }

  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tur Detayı</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  // Tur bulunamadı
  if (!tour) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tur Bulunamadı</h1>
            <p className="text-lg text-gray-600 mb-8">
              Aradığınız tur bulunamadı veya kaldırılmış olabilir.
            </p>
            <Link href="/tours" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Tüm Turları Görüntüle
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tur Başlığı */}
        <div className="text-center mb-8">
          <Link 
            href="/tours" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tüm Turlar
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{tour.name}</h1>
          <p className="text-lg text-gray-600">
            {tour.destination}
            <span className="mx-2">•</span>
            <span>{tour.duration}</span>
          </p>
        </div>
        
        {/* Tur Görseli */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <Image
              src={tour.image}
              alt={tour.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
        </div>
        
        {/* Sosyal Medya Paylaşım Butonları - Client Component'e taşınmalı */}
        <div className="flex justify-end items-center space-x-3 mb-8">
          <span className="text-gray-600 text-sm">Paylaş:</span>
          
          {/* Facebook */}
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.buyukaytactravel.com/tours/${tour.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
            aria-label="Facebook'ta paylaş"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          
          {/* Twitter */}
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${tour.name} - ${tour.destination} | Büyük Aytaç Travel`)}&url=${encodeURIComponent(`https://www.buyukaytactravel.com/tours/${tour.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
            aria-label="Twitter'da paylaş"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          
          {/* WhatsApp */}
          <a 
            href={`https://wa.me/?text=${encodeURIComponent(`${tour.name} - ${tour.destination} | Büyük Aytaç Travel: https://www.buyukaytactravel.com/tours/${tour.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-700"
            aria-label="WhatsApp'ta paylaş"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M21.105 4.696c1.616 1.642 2.438 3.79 2.442 5.933.005 7.15-7.764 12.272-13.436 9.306-.359-.189-.718-.378-1.076-.568-1.586.625-5.191 1.941-5.986 1.574-.736-.338.141-4.225.582-5.932-.382-.38-.764-.761-1.146-1.142-4.915-5.212-.485-14.218 7.74-14.264 2.139-.012 4.556.704 6.072 2.256 1.485 1.471 2.501 3.267 2.868 5.029.367 1.762.094 3.575-.782 5.125 1.922-1.976 2.92-4.795 2.717-7.608-.203-2.813-1.597-5.409-3.818-7.1-2.22-1.691-5.067-2.367-7.82-1.846S.932 9.053.286 11.746c-.646 2.694-.04 5.546 1.659 7.82 1.698 2.275 4.295 3.668 7.107 3.811-.586-1.412-.554-3.001.088-4.39.642-1.388 1.841-2.447 3.334-2.936 1.492-.49 3.124-.332 4.522.437 1.398.77 2.45 2.076 2.91 3.607-.105.087-.21.174-.315.261-.105.087-.21.174-.315.261-2.263 1.577-4.454 1.585-6.407.744-.964-.393-1.82-.925-2.657-1.462-.6.278-1.22.531-1.864.752.693.61 1.433 1.181 2.243 1.638 2.434 1.363 5.225 1.412 8.132-.131 2.475-1.31 4.317-3.329 5.315-5.829 1.075-2.695.833-5.664-.693-8.33z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        {/* Ana İçerik Alanı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Sol Kolon - Tur Detayları */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              {/* Sekmeler */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <a 
                    href="#description"
                    className="flex-1 py-4 px-1 text-center border-b-2 border-blue-500 font-medium text-blue-600 text-sm"
                  >
                    Tur Hakkında
                  </a>
                  <a 
                    href="#program"
                    className="flex-1 py-4 px-1 text-center border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm"
                  >
                    Program
                  </a>
                  <a 
                    href="#services"
                    className="flex-1 py-4 px-1 text-center border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 text-sm"
                  >
                    Hizmetler
                  </a>
                </nav>
              </div>
              
              {/* Tur Açıklaması */}
              <div className="p-6" id="description">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tur Hakkında</h2>
                <div className="prose max-w-none text-gray-600">
                  {tour.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* Tur Programı */}
              <div className="p-6 border-t border-gray-200" id="program">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tur Programı</h2>
                
                {tour.program && tour.program.length > 0 ? (
                  <div className="space-y-6">
                    {tour.program.map((day, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{day.day}: {day.title}</h3>
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    Bu tur için detaylı program bilgisi henüz eklenmemiştir. Daha fazla bilgi için lütfen bizimle iletişime geçin.
                  </p>
                )}
              </div>
              
              {/* Hizmetler */}
              <div className="p-6 border-t border-gray-200" id="services">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Dahil Olan ve Olmayan Hizmetler</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dahil Olan Hizmetler */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Tur Ücretine Dahil Olanlar
                    </h3>
                    
                    {tour.includedServices && tour.includedServices.length > 0 ? (
                      <ul className="space-y-2">
                        {tour.includedServices.map((service, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-600">{service}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">Dahil olan hizmetler henüz listelenmemiştir.</p>
                    )}
                  </div>
                  
                  {/* Dahil Olmayan Hizmetler */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      Tur Ücretine Dahil Olmayanlar
                    </h3>
                    
                    {tour.excludedServices && tour.excludedServices.length > 0 ? (
                      <ul className="space-y-2">
                        {tour.excludedServices.map((service, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span className="text-gray-600">{service}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">Dahil olmayan hizmetler henüz listelenmemiştir.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sağ Kolon - Fiyat ve İletişim */}
          <div className="lg:col-span-1">
            {/* Fiyat Bilgisi */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Fiyat Bilgisi</h2>
                
                <div className="mb-4">
                  <p className="text-4xl font-bold text-blue-600 mb-1">
                    {tour.discountRate ? (
                      <>
                        <span className="line-through text-gray-400 text-2xl mr-2">
                          {tour.price.toLocaleString()} TL
                        </span>
                        {Math.round(tour.price * (1 - tour.discountRate / 100)).toLocaleString()} TL
                      </>
                    ) : (
                      `${tour.price.toLocaleString()} TL`
                    )}
                  </p>
                  <p className="text-sm text-gray-500">kişi başı</p>
                </div>
                
                {/* Fiyat hesaplayıcı - Client Component */}
                <PriceCalculator tour={tour} />
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Tur Bilgileri</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-gray-600">
                        Süre: {tour.duration}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span className="text-gray-600">
                        Gidilecek Yer: {tour.destination}
                      </span>
                    </li>
                    {tour.startDate && (
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span className="text-gray-600">
                          Başlangıç: {new Date(tour.startDate).toLocaleDateString('tr-TR')}
                        </span>
                      </li>
                    )}
                    {tour.endDate && (
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span className="text-gray-600">
                          Bitiş: {new Date(tour.endDate).toLocaleDateString('tr-TR')}
                        </span>
                      </li>
                    )}
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                      <span className="text-gray-600">
                        Tur Tipi: {tour.tourType === 'domestic' ? 'Yurtiçi' : 'Yurtdışı'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                      </svg>
                      <span className="text-gray-600">
                        Konaklama: {tour.accommodationType === 'with_accommodation' ? 'Konaklamalı' : 'Günübirlik'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* İletişim Formu */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tur Hakkında Bilgi Alın</h2>
                
                {/* Burada client-side iletişim formu komponenti kullanılabilir */}
                <ContactForm tourName={tour.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Tur sayfaları için metadata oluşturma
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    // API yerine doğrudan veritabanından çeken yaklaşımı kullan
    await import('@/lib/dbConnect').then((module) => module.default());
    const Tour = (await import('@/models/Tour')).default;
    
    const tour = await Tour.findOne({ slug: params.slug }).lean();
    
    if (!tour) {
      return {
        title: 'Tur Bulunamadı | Büyük Aytaç Travel',
        description: 'Aradığınız tur bulunamadı veya kaldırılmış olabilir.',
      };
    }
    
    // Tur başlığına göre SEO meta verilerini oluştur
    const title = `${tour.name} | ${tour.destination} | Büyük Aytaç Travel Turları`;
    
    // Açıklama tur açıklamasından oluşturulur (kısa tutmak için)
    const description = tour.description.length > 160 
      ? `${tour.description.substring(0, 157)}...` 
      : tour.description;
      
    // Tur tipine ve özelliklerine göre anahtar kelimeleri ayarla
    const keywordString = `${tour.name}, ${tour.destination}, ${tour.duration}, ${tour.price} TL, ${tour.accommodationType === 'with_accommodation' ? 'konaklamalı tur' : 'günübirlik gezi'}, ${tour.tourType === 'domestic' ? 'yurtiçi tur' : 'yurtdışı tur'}, Büyük Aytaç Travel`;
    
    return {
      title,
      description,
      keywords: keywordString,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: tour.createdAt?.toString(),
        modifiedTime: tour.updatedAt?.toString(),
        url: `https://www.buyukaytacseyahat.com/tours/${tour.slug}`,
        images: [
          {
            url: tour.image,
            width: 1200,
            height: 630,
            alt: tour.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [tour.image],
      },
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'Tur Detayı | Büyük Aytaç Travel',
      description: 'Büyük Aytaç Travel ile unutulmaz tur deneyimleri yaşayın',
    };
  }
} 