/**
 * Çanakkale Kaz Dağları Turu Seed Script
 * Kullanım: npx tsx scripts/add-kazdaglari-tour.ts
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Tour, { TourType, AccommodationType } from '../src/models/Tour';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI bulunamadı (.env.local)');
  process.exit(1);
}

const kazdaglariTour = {
  name: 'Çanakkale Kaz Dağları Turu',
  description: 'Adatepe Köyü - Yeşilyurt Köyü - Şütüven Şelalesi - Çanakkale Kordon',
  image: '/images/kazdagları-15.07.jpeg',
  slug: 'canakkale-kaz-daglari-turu-15-temmuz-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1750,
  destination: 'Çanakkale, Kaz Dağları, Adatepe, Yeşilyurt, Sütüven Şelalesi',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-07-15'),
  endDate: new Date('2026-07-15'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde şehir turları ve çevre gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberler',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Ekstra belirtilen tüm organizasyonlar',
    'Müze ve ören yeri girişleri',
    'Tüm yemek öğünleri',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Çanakkale Kaz Dağları – Adatepe – Yeşilyurt – Sütüven Şelalesi – Kordon',
      description:
        "Çerkezköy'den hareket. Adatepe Köyü gezisi. Yeşilyurt Köyü keşfi. Sütüven Şelalesi ziyareti. Çanakkale Kordon turu. Dönüş.",
    },
  ],
  viewCount: 0,
};

async function addKazdaglariTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: kazdaglariTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, kazdaglariTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(kazdaglariTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 15 Temmuz 2026 Çarşamba');
    console.log('- Fiyat:', kazdaglariTour.price, 'TL');
    console.log('- Tür: Günübirlik / Yurtiçi / Öne çıkan');
    console.log('- URL: /tours/' + kazdaglariTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addKazdaglariTour();
