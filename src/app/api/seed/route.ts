import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';
import Tour from '@/models/Tour';

// Bu API route'u sadece geliştirme aşamasında örnek veriler eklemek için kullanılacak
export async function GET() {
  try {
    await dbConnect();
    
    // Önce mevcut verileri temizle
    await Destination.deleteMany({});
    await Tour.deleteMany({});
    
    // Örnek destinasyonlar ekle
    const destinations = await Destination.insertMany([
      { 
        name: 'İstanbul', 
        slug: 'istanbul',
        description: 'Doğu ve Batının buluştuğu büyülü şehir. Ayasofya, Sultanahmet Camii ve canlı Kapalıçarşıyı keşfedin.',
        image: '/destinations/istanbul.jpg',
        isActive: true,
      },
      { 
        name: 'Kapadokya', 
        slug: 'kapadokya',
        description: 'Dünyada eşi benzeri olmayan peri bacalarını, vadileri ve ünlü sıcak hava balonu deneyimlerini keşfedin.',
        image: '/destinations/kapadokya.jpg',
        isActive: true,
      },
      { 
        name: 'Antalya', 
        slug: 'antalya',
        description: 'Muhteşem plajlarda dinlenin, antik kalıntıları keşfedin ve tarihin deniz tatiliyle mükemmel uyumunu yaşayın.',
        image: '/destinations/antalya.jpg',
        isActive: true,
      },
      { 
        name: 'Pamukkale', 
        slug: 'pamukkale',
        description: 'Göz alıcı beyaz travertenleri ve antik Hierapolis kalıntılarıyla "Pamuk Kalesini" ziyaret edin.',
        image: '/destinations/pamukkale.jpg',
        isActive: true,
      }
    ]);

    // Örnek turlar ekle
    const istanbul = destinations.find(d => d.slug === 'istanbul');
    const kapadokya = destinations.find(d => d.slug === 'kapadokya');
    const antalya = destinations.find(d => d.slug === 'antalya');
    const pamukkale = destinations.find(d => d.slug === 'pamukkale');

    const tours = await Tour.insertMany([
      { 
        name: 'İstanbul Klasik Turu',
        slug: 'istanbul-klasik-turu',
        description: 'İstanbul\'un en önemli tarihi yerlerini keşfedin. Ayasofya, Topkapı Sarayı ve Kapalıçarşı dahil.',
        image: '/tours/istanbul-klasik.jpg',
        duration: 2,
        price: 2500,
        destinationId: istanbul?._id,
        isActive: true,
      },
      {
        name: 'Kapadokya Balon Turu', 
        slug: 'kapadokya-balon-turu',
        description: 'Nefes kesici manzaralar için sıcak hava balonu dahil tam Kapadokya deneyimi.',
        image: '/tours/kapadokya-balon.jpg',
        duration: 3,
        price: 4200,
        destinationId: kapadokya?._id,
        isActive: true,
      },
      {
        name: 'Ege Sahilleri Turu', 
        slug: 'ege-sahilleri-turu',
        description: 'Türkiye\'nin muhteşem Ege kıyısı boyunca antik kentler ve masmavi koylarda unutulmaz bir tatil.',
        image: '/tours/ege-sahilleri.jpg',
        duration: 5,
        price: 5800,
        destinationId: antalya?._id,
        isActive: true,
      },
      {
        name: 'Güneydoğu Lezzetleri', 
        slug: 'guneydogu-lezzetleri',
        description: 'Gaziantep, Şanlıurfa ve Mardin\'de Türkiye\'nin en zengin mutfak kültürünü ve tarihi dokusunu keşfedin.',
        image: '/tours/guneydogu-lezzetleri.jpg',
        duration: 4,
        price: 3900,
        destinationId: istanbul?._id,
        isActive: true,
      },
      {
        name: 'Pamukkale & Hierapolis Turu', 
        slug: 'pamukkale-hierapolis-turu',
        description: 'Beyaz cennet Pamukkale travertenlerini keşfedin ve antik Hierapolis kentinin kalıntılarını ziyaret edin.',
        image: '/tours/pamukkale-hierapolis.jpg',
        duration: 2,
        price: 1800,
        destinationId: pamukkale?._id,
        isActive: true,
      }
    ]);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Örnek veriler başarıyla eklendi',
      data: {
        destinations: destinations.length,
        tours: tours.length
      }
    });
  } catch (error) {
    console.error('Seed Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Örnek veri ekleme işlemi sırasında bir hata oluştu',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 