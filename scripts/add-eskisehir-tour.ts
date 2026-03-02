/**
 * Eskişehir Turu Seed Script
 * Bu script veritabanına Eskişehir turu ekler
 * 
 * Kullanım: npx tsx scripts/add-eskisehir-tour.ts
 */

import mongoose from 'mongoose';
import Tour, { TourType, AccommodationType } from '../src/models/Tour';

// MongoDB bağlantı string'i - .env dosyasından alınmalı
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://buyukaytactravel:BAT2025@cluster0.mongodb.net/buyuk-aytac-travel?retryWrites=true&w=majority';

const eskisehirTour = {
  name: 'Eskişehir Turu - Odunpazarı ve Sazova Parkı',
  description: `Çerkezköy'den gece yarısı hareket ediyoruz. İstanbul, Adapazarı, Bozüyük'ü takiben UNESCO tarafından 2013 yılında Türk Dünyasının Kültür Başkenti ve Somut Olmayan Kültürel Miras Başkentliği unvanı almış olan Eskişehir'e ulaşıyoruz. Frigyalılar döneminde çok önemli bir yeri olan ve Anadolu'da ilklerin kenti olarak adlandırılan Eskişehir'de unutulmaz bir tur deneyimi sizi bekliyor.

Tur Programı:
• Atlıhan Kapalı Çarşısı - Lületaşı ustalarının elinden nasıl şekillendiğini görme şansı
• Odunpazarı Evleri - 19. YY Osmanlı ahşap mimarisinin en güzel örnekleri
• Kurşunlu Külliyesi - 1525 yılında yaptırılan cami, medrese, kervansaray
• Porsuk Çayı - Şehrin içinden geçen güzel çay
• Yılmaz Büyükerşen Balmumu Heykeller Müzesi - Tarihi karakterler ve ünlü isimlerin heykelleri
• Devrim Arabaları Müzesi - İlk Türk yapımı otomobil
• Sazova Bilim Sanat ve Kültür Parkı - Kalyon Gemisi, Bilim Deney Merkezi, Uzay Evi, Masal Şatosu`,
  image: '/images/eskisehir-15-temmuz.jpeg',
  slug: 'eskisehir-turu-odunpazari-sazova',
  duration: '1 Gün (Günübirlik)',
  price: 2500,
  destination: 'Eskişehir',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isLastMinute: false,
  startDate: new Date('2025-03-15'),
  endDate: new Date('2025-03-15'),
  includedServices: [
    'Otobüs ile ulaşım',
    'Profesyonel rehberlik hizmeti',
    'Sazova Parkı giriş ücreti',
    'Balmumu Heykeller Müzesi giriş ücreti',
    'Devrim Arabaları Müzesi giriş ücreti',
    'Lületaşı Müzesi giriş ücreti',
    'Kurşunlu Külliyesi giriş ücreti',
    'Öğle yemeği (Yöresel Eskişehir lezzetleri)',
    'Seyahat sigortası'
  ],
  excludedServices: [
    'Kişisel harcamalar',
    'Ek içecekler',
    'Masal Şatosu ek aktiviteleri'
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Eskişehir Turu',
      description: 'Çerkezköy\'den gece yarısı hareket. İstanbul, Adapazarı, Bozüyük üzerinden Eskişehir\'e varış. Odunpazarı\'nda kahvaltı. Atlıhan Çarşısı, Kurşunlu Külliyesi, Balmumu Heykeller Müzesi, Devrim Arabaları Müzesi, Sazova Parkı ziyaretleri. Dönüş saat 01:00 civarı.'
    }
  ],
  viewCount: 0
};

async function addEskisehirTour() {
  try {
    console.log('MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    // Aynı slug ile tur var mı kontrol et
    const existingTour = await Tour.findOne({ slug: eskisehirTour.slug });
    
    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut:', existingTour.name);
      console.log('Mevcut tur güncelleniyor...');
      
      Object.assign(existingTour, eskisehirTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      console.log('📝 Yeni tur oluşturuluyor...');
      const newTour = new Tour(eskisehirTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Name:', eskisehirTour.name);
    console.log('- Destination:', eskisehirTour.destination);
    console.log('- Duration:', eskisehirTour.duration);
    console.log('- Price:', eskisehirTour.price, 'TL');
    console.log('- Departure:', eskisehirTour.departureCity);
    console.log('- URL: /tours/', eskisehirTour.slug);

  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addEskisehirTour();
