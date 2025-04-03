import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';
import Tour from '@/models/Tour';
import { TourType, AccommodationType } from '@/models/Tour';

// Bu API route'u sadece geliştirme aşamasında örnek veriler eklemek için kullanılacak
export async function GET() {
  try {
    await dbConnect();
    
    // İlk olarak mevcut tüm verileri temizleyelim
    await Destination.deleteMany({});
    await Tour.deleteMany({});
    
    // Örnek destinasyonlar ekleyelim
    const destinations = await Destination.insertMany([
      { 
        name: 'İstanbul',
        slug: 'istanbul',
        description: 'Asya ve Avrupa kıtaları arasında bir köprü olan İstanbul, tarih boyunca Roma, Bizans ve Osmanlı İmparatorluklarına başkentlik yapmış, eşsiz kültürel ve tarihi mirası ile dünyanın en önemli şehirlerinden biridir.',
        image: '/destinations/istanbul.jpg',
        isActive: true,
      },
      { 
        name: 'Kapadokya',
        slug: 'cappadocia',
        description: 'Eşsiz peri bacaları, yeraltı şehirleri ve sıcak hava balonlarıyla dünyaca ünlü bir destinasyon olan Kapadokya, binlerce yıllık tarihi ve doğal güzellikleriyle büyüleyici bir deneyim sunar.',
        image: '/destinations/cappadocia.jpg',
        isActive: true,
      },
      { 
        name: 'Antalya',
        slug: 'antalya',
        description: 'Türkiye\'nin turizm başkenti olarak bilinen Antalya, muhteşem plajları, tarihi kalıntıları ve lüks tatil köyleriyle hem yerli hem de yabancı turistlerin gözdesi bir destinasyondur.',
        image: '/destinations/antalya.jpg',
        isActive: true,
      },
      { 
        name: 'Pamukkale',
        slug: 'pamukkale',
        description: 'UNESCO Dünya Mirası Listesi\'nde yer alan Pamukkale, bembeyaz travertenleri ve şifalı termal sularıyla doğal bir harikadır. Antik Hierapolis şehri kalıntılarıyla tarihi önemi de büyüktür.',
        image: '/destinations/pamukkale.jpg',
        isActive: true,
      },
    ]);

    const istanbul = destinations.find(d => d.slug === 'istanbul');
    const kapadokya = destinations.find(d => d.slug === 'cappadocia');
    const antalya = destinations.find(d => d.slug === 'antalya');
    const pamukkale = destinations.find(d => d.slug === 'pamukkale');

    const tours = await Tour.insertMany([
      { 
        name: 'İstanbul Klasik Turu',
        slug: 'istanbul-klasik-turu',
        description: 'Ayasofya, Topkapı Sarayı, Sultanahmet Camii ve Kapalıçarşı\'yı içeren klasik İstanbul turu.',
        image: '/tours/istanbul-classic.jpg',
        duration: '1 Gün',
        price: 1200,
        destinationId: istanbul?._id,
        tourType: TourType.DOMESTIC,
        accommodationType: AccommodationType.DAILY,
        isActive: true,
      },
      {
        name: 'Kapadokya Balon Turu', 
        slug: 'kapadokya-balon-turu',
        description: '11-13 Nisan 2025 tarihlerinde gerçekleşecek olan bu özel turumuzda, Kapadokya\'nın eşsiz doğal güzelliklerini, tarihi zenginliklerini ve kültürel mirasını keşfedeceksiniz. Göreme Açık Hava Müzesi, Derinkuyu Yeraltı Şehri, Hayal Vadisi, Üç Güzeller ve daha fazlasını içeren bu turda, balon seyrinden ATV turuna, Türk gecesinden şarap tadımına kadar birçok farklı aktivite seçeneğini deneyimleme şansı bulacaksınız. Profesyonel rehberlik eşliğinde, Kapadokya\'nın büyülü atmosferinde unutulmaz anlar yaşayacaksınız.',
        image: 'https://buyukaytactravel.com/wp-content/uploads/2025/03/WhatsApp-Image-2025-02-28-at-11.24.34.jpeg',
        duration: '3 Gün 2 Gece',
        price: 5000,
        destinationId: kapadokya?._id,
        tourType: TourType.DOMESTIC,
        accommodationType: AccommodationType.WITH_ACCOMMODATION,
        isActive: true,
      },
      {
        name: 'Antalya Kemer Turu', 
        slug: 'antalya-kemer-turu',
        description: 'Antalya\'nın cennet köşesi Kemer\'de deniz, güneş ve doğa ile buluşan unutulmaz bir tatil.',
        image: '/tours/antalya-kemer.jpg',
        duration: '5 Gün 4 Gece',
        price: 4500,
        destinationId: antalya?._id,
        tourType: TourType.DOMESTIC,
        accommodationType: AccommodationType.WITH_ACCOMMODATION,
        isActive: true,
      },
      {
        name: 'Pamukkale & Hierapolis Turu', 
        slug: 'pamukkale-hierapolis-turu',
        description: 'Bembeyaz travertenleri ve antik Hierapolis şehri ile UNESCO Dünya Mirası Listesi\'nde yer alan Pamukkale\'yi keşfedin.',
        image: '/tours/pamukkale.jpg',
        duration: '2 Gün 1 Gece',
        price: 2800,
        destinationId: pamukkale?._id,
        tourType: TourType.DOMESTIC,
        accommodationType: AccommodationType.WITH_ACCOMMODATION,
        isActive: true,
      },
      {
        name: 'Yunanistan Turu', 
        slug: 'yunanistan-turu',
        description: 'Atina, Santorini ve Mikonos\'u kapsayan nefes kesici bir Yunanistan turu. Akdeniz\'in en güzel adalarını ve Antik Yunan tarihini keşfedin.',
        image: '/tours/greece.jpg',
        duration: '7 Gün 6 Gece',
        price: 15000,
        destinationId: istanbul?._id, // Çıkış noktası İstanbul
        tourType: TourType.INTERNATIONAL,
        accommodationType: AccommodationType.WITH_ACCOMMODATION,
        isActive: true,
      },
      {
        name: 'İstanbul Boğaz Turu', 
        slug: 'istanbul-bogaz-turu',
        description: 'İstanbul Boğazı\'nı tekneyle gezerek şehrin en güzel manzaralarını denizden keşfedin. Rumeli Hisarı, Ortaköy Camii ve Dolmabahçe Sarayı gibi önemli eserleri görme şansı yakalayın.',
        image: '/tours/istanbul-bosphorus.jpg',
        duration: 'Yarım Gün',
        price: 800,
        destinationId: istanbul?._id,
        tourType: TourType.DOMESTIC,
        accommodationType: AccommodationType.DAILY,
        isActive: true,
      },
    ]);

    return NextResponse.json({ 
      message: 'Örnek veriler başarıyla eklendi',
      destinationsCount: destinations.length,
      toursCount: tours.length
    }, { status: 200 });
  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: 'Örnek veriler eklenirken bir hata oluştu' }, { status: 500 });
  }
} 