/**
 * Gökçeada Turu Seed Script
 * Kullanım: npx tsx scripts/add-gokceada-tour.ts
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

const gokceadaTour = {
  name: 'Gökçeada Turu',
  description: 'Gökçeada Turu - Tepeköy - Zeytinliköy - Kefaloz Plajı',
  image: '/images/gokceada-12.07.jpeg',
  slug: 'gokceada-turu-12-temmuz-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1800,
  destination: 'Gökçeada, Tepeköy, Zeytinliköy, Kefaloz Plajı',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-07-12'),
  endDate: new Date('2026-07-12'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Lezzetli yemek molası',
    'Program dahilinde şehir turları ve çevre gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberler',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Ekstra belirtilen tüm organizasyonlar',
    'Müze ve ören yeri girişleri',
    'Kişisel harcamalar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Gökçeada – Tepeköy – Zeytinliköy – Kefaloz Plajı',
      description:
        "Çerkezköy'den hareket. Gökçeada'ya ulaşım. Tepeköy gezisi. Zeytinliköy keşfi. Kefaloz Plajı'nda serbest zaman. Dönüş.",
    },
  ],
  viewCount: 0,
};

async function addGokceadaTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: gokceadaTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, gokceadaTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(gokceadaTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 12 Temmuz 2026 Pazar');
    console.log('- Fiyat:', gokceadaTour.price, 'TL');
    console.log('- Tür: Günübirlik / Yurtiçi / Öne çıkan');
    console.log('- URL: /tours/' + gokceadaTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addGokceadaTour();
