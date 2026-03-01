import Image from 'next/image';
import Link from 'next/link';
import { ITour } from '@/models/Tour';
import PriceCalculator from '@/components/PriceCalculator';
import ContactForm from '@/components/ContactForm';
import Breadcrumb from '@/components/Breadcrumb';


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
    
    // params değerini doğrudan kullanmak yerine önce bir değişkene atayalım
    const slug = params.slug;
    tour = await Tour.findOne({ slug }).lean();
    
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

  // Tur sayfası için schema.org yapılandırılmış veri
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    'name': tour.name,
    'description': tour.description,
    'image': tour.image,
    'touristType': tour.tourType === 'domestic' ? 'Domestic' : 'International',
    'offers': {
      '@type': 'Offer',
      'price': tour.discountRate ? Math.round(tour.price * (1 - tour.discountRate / 100)) : tour.price,
      'priceCurrency': 'TRY'
    },
    'location': {
      '@type': 'Place',
      'name': tour.destination,
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': tour.tourType === 'domestic' ? 'TR' : ''
      }
    },
    'itinerary': {
      '@type': 'ItemList',
      'itemListElement': tour.program && tour.program.length > 0 ? 
        tour.program.map((day, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@type': 'TouristAttraction',
            'name': day.title,
            'description': day.description
          }
        })) : []
    },
    'provider': {
      '@type': 'Organization',
      'name': 'Büyük Aytaç Travel',
      'url': 'https://www.buyukaytactravel.com'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ekmek Kırıntısı Navigasyonu */}
          <div className="mb-6">
            <Breadcrumb 
              customItems={[
                { name: 'Ana Sayfa', href: '/' },
                { name: 'Turlar', href: '/tours' },
                { name: tour.tourType === 'domestic' ? 'Yurtiçi Turları' : 'Yurtdışı Turları', 
                  href: tour.tourType === 'domestic' ? '/tours?tourType=domestic' : '/tours?tourType=international' },
                { name: tour.name, href: `/tours/${tour.slug}` }
              ]}
              className="text-gray-600"
            />
          </div>
          
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
                alt={`${tour.name} - ${tour.destination} - ${tour.duration} - Büyük Aytaç Travel Turu`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
                quality={85}
                loading="eager"
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
            
            {/* Twitter / X */}
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${tour.name} - ${tour.destination} | Büyük Aytaç Travel`)}&url=${encodeURIComponent(`https://www.buyukaytactravel.com/tours/${tour.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-800"
              aria-label="X'de paylaş"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
          
          {/* Sık Sorulan Sorular - SEO için önemli */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Sık Sorulan Sorular</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bu tura nasıl kayıt olabilirim?</h3>
                  <p className="text-gray-600">
                    Tura kayıt olmak için web sitemizdeki rezervasyon formunu doldurabilir, +90 212 123 45 67 numaralı telefondan bize ulaşabilir ya da ofisimizi ziyaret edebilirsiniz. Ödeme işlemini tamamladıktan sonra rezervasyonunuz onaylanmış olacaktır.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tur iptal edilirse ücret iadesi yapılıyor mu?</h3>
                  <p className="text-gray-600">
                    Turdan 15 gün öncesine kadar yapılan iptallerde kesinti olmadan iade yapılır. 7-14 gün kala yapılan iptallerde tur bedelinin %30u, 3-6 gün kala yapılan iptallerde %50si, son 48 saat içindeki iptallerde %100ü cezai işlem olarak kesilir.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bu tur için yanımıza neler almalıyız?</h3>
                  <p className="text-gray-600">
                    Rahat yürüyüş ayakkabıları, mevsime uygun kıyafetler, şapka, güneş gözlüğü, güneş kremi, fotoğraf makinesi, şarj aletleri ve kişisel ilaçlarınızı yanınıza almanızı öneririz. Otel konaklamalı turlarda yeterli miktarda kıyafet ve kişisel bakım ürünlerinizi getirmeyi unutmayınız.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tour.destination} için en uygun seyahat zamanı ne zamandır?</h3>
                  <p className="text-gray-600">
                    {tour.destination} için genellikle ilkbahar (Nisan-Mayıs) ve sonbahar (Eylül-Ekim) ayları idealdir. Bu dönemlerde hava sıcaklığı gezmeye elverişlidir ve turist yoğunluğu yaz aylarına göre daha azdır.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Çocuklar için indirim var mı?</h3>
                  <p className="text-gray-600">
                    Evet, 0-6 yaş arası çocuklar için %50, 7-12 yaş arası çocuklar için %30 indirim uygulanmaktadır. Detaylı bilgi için lütfen bizimle iletişime geçiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Benzer Turlar - SEO için internal linking */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benzer Turlar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* İlgili turlar için server component yapılacak */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href="/tours/kapadokya-turu">
                  <div className="relative h-48 w-full">
                    <div className="absolute inset-0 bg-blue-900 opacity-20 z-10"></div>
                    <Image 
                      src={tour.image} 
                      alt="Kapadokya Turu - Büyük Aytaç Travel" 
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-20">
                      <h3 className="text-white font-bold">Kapadokya Turu</h3>
                      <p className="text-white text-sm">3 Gün 2 Gece</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href="/tours/istanbul-sehir-turu">
                  <div className="relative h-48 w-full">
                    <div className="absolute inset-0 bg-blue-900 opacity-20 z-10"></div>
                    <Image 
                      src={tour.image} 
                      alt="İstanbul Şehir Turu - Büyük Aytaç Travel" 
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-20">
                      <h3 className="text-white font-bold">İstanbul Şehir Turu</h3>
                      <p className="text-white text-sm">Günübirlik</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link href="/tours/pamukkale-turu">
                  <div className="relative h-48 w-full">
                    <div className="absolute inset-0 bg-blue-900 opacity-20 z-10"></div>
                    <Image 
                      src={tour.image} 
                      alt="Pamukkale Turu - Büyük Aytaç Travel" 
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-20">
                      <h3 className="text-white font-bold">Pamukkale Turu</h3>
                      <p className="text-white text-sm">2 Gün 1 Gece</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Tur sayfaları için metadata oluşturma
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    // API yerine doğrudan veritabanından çeken yaklaşımı kullan
    await import('@/lib/dbConnect').then((module) => module.default());
    const Tour = (await import('@/models/Tour')).default;
    
    // params değerini doğrudan kullanmak yerine önce bir değişkene atayalım
    const slug = params.slug;
    const tour = await Tour.findOne({ slug }).lean();
    
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