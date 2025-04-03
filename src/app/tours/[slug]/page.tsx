'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTourBySlug } from '@/services/tourService';
import { ITour } from '@/models/Tour';
import Link from 'next/link';

export default function TourDetail({ params }: { params: { slug: string } }) {
  const [tour, setTour] = useState<ITour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const data = await getTourBySlug(params.slug);
        setTour(data);
        setLoading(false);
      } catch (err) {
        console.error('Tur detayı getirme hatası:', err);
        setError('Tur detayı yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchTour();
  }, [params.slug]);

  // Yükleme durumu
  if (loading) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-1/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4 mx-auto"></div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-gray-200 animate-pulse"></div>
            <div className="p-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
            </div>
          </div>
        </div>
      </main>
    );
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

  // Örnek program (gerçekte API'den gelecek)
  const sampleProgram = [
    {
      day: "11 Nisan 2025, Cuma - 1. Gün",
      title: "Hareket Günü",
      description: "Siz değerli misafirlerimizi firmamızın belirlediği noktalardan alarak yola çıkıyoruz."
    },
    {
      day: "12 Nisan 2025, Cumartesi - 2. Gün",
      title: "Kapadokya Keşif Günü",
      description: "Sabah erken saatlerde alacağımız kahvaltının ardından (ekstra) Hava koşullarına göre balonlar kalktığı takdirde sabah erken saatlerde Kapadokya'nın mistik atmosferiyle tanışmak üzere Aşk Vadisi'nde gerçekleşecek muhteşem bir balon seyrine katılıyoruz. (ekstra)\n\nKapadokya'nın mistik atmosferine adım atmak üzere Göreme Açık Hava Müzesi'ne gidiyoruz. Burada binlerce yıllık tarihi ve benzersiz kaya kiliselerini keşfederek bölgenin büyüleyici geçmişine tanıklık edeceksiniz. Daha sonra adrenalini yüksek bir macera için dileyen misafirlerimizle ATV'lere binip, Kapadokya'nın eşsiz doğasında unutulmaz bir gezintiye çıkabilir veya Kapadokya'nın ismini aldığı güzel atlarıyla huzurlu bir vadi gezisi yapabilirsiniz. (ekstra)\n\nSonrasında Kızılırmak üzerine kurulmuş sallanan köprüden yürüyüş yaparak Avanos'ta çömlek atölyelerinde ustaların elinden çıkan geleneksel çömlekleri inceleyerek bölgenin zanaatkarlık geleneğini yakından görüyoruz. Bölgenin eşsiz Onyx taşlarını inceleyip alışveriş yapma fırsatı bulacağımız Onyx atölyesi olacak.\n\nSonrasında büyüleyici kaya oluşumlarının yer aldığı Hayal Vadisi'nde keyifli bir yürüyüş yapıyoruz ve eşsiz doğanın büyüsüne kapılıyoruz. Hayal vadisinden sonra Ürgüp'e doğru yol alırken, panoramik olarak bölgenin sembolü Üç Güzelleri görüyor ve bölgenin ünlü şarap mahzenlerini ziyaret etme fırsatı yakalıyoruz. Burada Kapadokya'ya özgü üzümlerden yapılan şaraplar hakkında bilgi alma, şarap alışverişi yapma şansı yakalıyoruz.\n\nArdından, Kapadokya'nın doğasıyla bütünleşmiş Güvercinlik Vadisinde eşsiz fotoğraflar çekme fırsatı yakalıyoruz.\n\nGünün sonunda, Ortahisar kalesinin görkemli manzarasını süsleyen eşsiz eski Kapadokya evleri eşliğinde kahve molası vererek, otelimize doğru harekete geçiyoruz. Akşam yemeği ve konaklama otelimizde. (Dileyen misafirlerimiz ekstra olarak düzenlenecek Türk Gecesine katılabilir.)"
    },
    {
      day: "13 Nisan 2025, Pazar - 3. Gün",
      title: "Yeraltı Şehirleri ve İnanç Merkezleri",
      description: "Otelde alınan kahvaltının ardından Uçhisar'da bulunan eski yerleşim alanını ziyaret ederek, Derinkuyu Yeraltı Şehri'ni keşfetmek için derinlere iniyoruz, tarihin gizemli koridorlarında zaman yolculuğu yapıyoruz. Burada vereceğimiz vaktin ardından volkanik bir oluşum olan Narlıgöl'ün etkileyici manzarası eşliğinde mola veriyoruz. Ardından Ihlara Vadisi'nde bulunan Cam Teras'tan muhteşem bir manzara eşliğinde dinlenme molası veriyoruz.\n\nSonrasında 13.yy'da tek bir kayadan oyularak yapılmış olan döneminin en büyük eğitim merkezi olan Selime Katedrali'ni ziyaret ediyoruz, bu benzersiz kaya kilisesinin içindeki tarihi freskleri ve mimari detayları keşfetme fırsatı buluyoruz. Programımızın bitişiyle birlikte geri dönüş yolumuza devam ediyor, bir sonraki Büyük Aytaç Travel organizasyonunda görüşmek dileğiyle vedalaşıyoruz."
    }
  ];

  // Dahil olan hizmetler (gerçekte API'den gelecek)
  const includedServices = [
    "Profesyonel rehberlik hizmeti",
    "2 gece otel konaklaması (3* veya butik otel)",
    "Programda belirtilen tüm geziler ve transferler",
    "Otelde 2 sabah kahvaltısı ve 1 akşam yemeği",
    "Seyahat sigortası",
    "Müze ve ören yeri giriş ücretleri"
  ];

  // Dahil olmayan hizmetler (gerçekte API'den gelecek)
  const excludedServices = [
    "Programda 'ekstra' olarak belirtilen tüm aktiviteler",
    "Kapadokya balon turu (150-180€/kişi)",
    "ATV turu (35-40€/kişi)",
    "At turu (25-30€/kişi)",
    "Türk Gecesi (40-50€/kişi)",
    "Kişisel harcamalar",
    "Öğle yemekleri",
    "Programda belirtilmeyen öğünler"
  ];

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
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            {!imageError ? (
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                onError={() => setImageError(true)}
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Görsel yüklenemedi</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Tur Detayları Sekmeler */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tur Hakkında
              </button>
              <button
                onClick={() => setActiveTab('program')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'program'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Program
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'services'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dahil Hizmetler
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* Tur Açıklaması */}
            {activeTab === 'description' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tur Hakkında</h2>
                <div className="prose max-w-none text-gray-600">
                  <p className="whitespace-pre-line">{tour.description}</p>
                </div>
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Fiyat Bilgisi</h3>
                  <p className="text-gray-700">Kişi başı fiyat: <span className="text-2xl font-bold text-blue-600">{tour.price.toLocaleString('tr-TR')} ₺</span></p>
                  <p className="text-sm text-gray-500 mt-1">* Fiyatlar oda tipi ve sezona göre değişiklik gösterebilir.</p>
                </div>
              </div>
            )}
            
            {/* Program */}
            {activeTab === 'program' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tur Programı</h2>
                <div className="space-y-6">
                  {sampleProgram.map((day, index) => (
                    <div key={index} className="border-l-4 border-blue-400 pl-4">
                      <h3 className="text-lg font-medium text-gray-900">{day.day}: {day.title}</h3>
                      <p className="mt-1 text-gray-600">{day.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Not:</span> Program, hava durumu ve diğer şartlara bağlı olarak değişiklik gösterebilir.
                  </p>
                </div>
              </div>
            )}
            
            {/* Dahil Hizmetler */}
            {activeTab === 'services' && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dahil Olan Hizmetler</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
                  {includedServices.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dahil Olmayan Hizmetler</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {excludedServices.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Rezervasyon Formu */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Rezervasyon Bilgileri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">İletişim Bilgileri</h3>
                <p className="mb-1 text-gray-600">
                  <span className="font-semibold">Telefon:</span> 0530 060 95 59 / 0539 345 95 59
                </p>
                <p className="mb-1 text-gray-600">
                  <span className="font-semibold">Email:</span> buyukaytac59@gmail.com
                </p>
                <p className="mb-4 text-gray-600">
                  <span className="font-semibold">Adres:</span> Gazi Mustafa Kemalpaşa, Tokuşlar Sk. Güneşler İş Merkezi No:7 Kat:1 Daire:1, 59500 Çerkezköy/Tekirdağ
                </p>
                
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ödeme Şartları</h3>
                <p className="text-gray-600 mb-4">
                0530 060 95 59 / 0539 345 95 59 numaralarından veya ofisimizden ödeme yapabilirsiniz.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">İletişim Formu</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ad Soyad"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Telefon"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mesaj
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Mesajınız..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Bilgi İsteyin
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 