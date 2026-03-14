import Image from 'next/image';
import Link from 'next/link';
import { getToursByDB } from '@/lib/tours';
import { ITour } from '@/models/Tour';

export const metadata = {
  title: 'Bölgesel Tur Hizmetleri | Büyük Aytaç Travel',
  description: 'Tekirdağ, Çerkezköy, Çorlu ve çevre ilçelerden kalkan tur hizmetleri. Trakya bölgesinin her noktasından turlarımıza katılabilirsiniz.',
  keywords: 'tekirdağ turları, çerkezköy turları, çorlu turları, bölgesel tur hizmetleri, trakya turları'
};

export default async function LocationPage() {
  let tours: ITour[] = [];
  
  try {
    tours = await getToursByDB({ isActive: true });
  } catch (error) {
    console.error('Turları getirme hatası:', error);
    // Fallback to empty array
    tours = [];
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-12 text-white shadow-lg">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Bölgesel Tur Hizmetlerimiz</h1>
            <p className="text-xl mb-6 max-w-3xl">
              Trakya bölgesinin farklı şehir ve ilçelerinden turlarımıza katılım imkanı sunuyoruz. 
              Size en yakın konumdan hareket ederek, konforlu ve güvenli yolculuklar düzenliyoruz.
            </p>
          </div>

          {/* Service Areas */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Hizmet Verdiğimiz Bölgeler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Tekirdağ */}
              <Link href="/location/tekirdag" className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="relative h-48">
                    <Image 
                      src="/images/locations/tekirdag.jpg" 
                      alt="Tekirdağ Turları" 
                      fill 
                      className="object-cover group-hover:brightness-110 transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white mb-1">Tekirdağ</h3>
                      <p className="text-white text-sm">Merkez, Çerkezköy, Çorlu, Kapaklı</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Tekirdağ ve ilçelerinden turlarımıza katılabilirsiniz. Çerkezköy, Çorlu, Kapaklı, 
                      Saray, Malkara ve diğer ilçelerden belirlenmiş noktalardan toplanma yapılmaktadır.
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-800">
                      <span>Detaylı Bilgi</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Çerkezköy */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image 
                    src="/images/locations/cerkezkoy.jpg" 
                    alt="Çerkezköy Turları" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white mb-1">Çerkezköy</h3>
                    <p className="text-white text-sm">Merkez ve çevre mahalleler</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Çerkezköy merkezden ve çevre mahallelerden turlarımıza katılım. Ana cadde ve 
                    merkezi konumlardan toplanma noktaları ile kolay ulaşım sağlıyoruz.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>Yakında Açılacak</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Diğer Bölgeler */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image 
                    src="/images/locations/trakya.jpg" 
                    alt="Trakya Bölgesi Turları" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white mb-1">Diğer Bölgeler</h3>
                    <p className="text-white text-sm">Edirne, Kırklareli, İstanbul</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Trakya bölgesinin diğer şehirlerinden de özel talep üzerine grup turları düzenliyoruz. 
                    Grup sayısına göre özel transfer imkanları sunuyoruz.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>Bilgi Al</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Tours */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Bölgemizden En Çok Tercih Edilen Turlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.length > 0 ? (
                tours.slice(0, 6).map((tour) => (
                  <div key={tour._id?.toString()} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image 
                        src={tour.image || '/images/placeholder-tour.jpg'} 
                        alt={tour.name} 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1 m-2 text-sm font-medium rounded">
                        {tour.tourType === 'domestic' ? 'Yurtiçi' : 'Yurtdışı'} • {tour.duration} {parseInt(tour.duration) > 1 ? 'Gün' : 'Gün'}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{tour.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-bold">{tour.price.toLocaleString('tr-TR')} ₺</span>
                        <Link 
                          href={`/tours/${tour.slug}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                        >
                          Detaylar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback content when no tours available
                <>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center">
                      <span className="text-blue-600 text-4xl">🏔️</span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Kapadokya Turu</h3>
                      <p className="text-gray-600 text-sm mb-4">Peri bacaları ve balon turları ile unutulmaz bir deneyim</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-bold">750 ₺</span>
                        <Link 
                          href="/tours"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                        >
                          Detaylar
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center">
                      <span className="text-green-600 text-4xl">🌊</span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Karadeniz Turu</h3>
                      <p className="text-gray-600 text-sm mb-4">Doğa harikası Karadeniz bölgesinde yaylalar ve deniz</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-bold">680 ₺</span>
                        <Link 
                          href="/tours"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                        >
                          Detaylar
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center">
                      <span className="text-purple-600 text-4xl">🏛️</span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">İstanbul Kültür Turu</h3>
                      <p className="text-gray-600 text-sm mb-4">Tarihi yarımada ve müzeler ile kültür dolu bir gün</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-bold">450 ₺</span>
                        <Link 
                          href="/tours"
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                        >
                          Detaylar
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/tours"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Tüm Turları Görüntüle
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Bölgenizden Tur Bilgileri</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Toplanma Noktaları</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📍</span>
                    <span><strong>Tekirdağ Merkez:</strong> Hürriyet Meydanı, Belediye Önü</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📍</span>
                    <span><strong>Çerkezköy:</strong> Atatürk Caddesi, Merkez Posta Önü</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📍</span>
                    <span><strong>Çorlu:</strong> İstasyon Meydanı, Belediye Binası Önü</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📍</span>
                    <span><strong>Diğer İlçeler:</strong> Özel toplanma noktaları (Önceden bilgilendirilir)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">Rezervasyon Bilgileri</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>En az 3 gün önceden rezervasyon önerilir</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Grup indirimleri mevcuttur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Esnek ödeme seçenekleri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Tüm bölgelerden güvenli transfer</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md transition-colors mr-4"
              >
                Rezervasyon Yap
              </Link>
              <Link 
                href="tel:+905393459559"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
              >
                Hemen Ara
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 