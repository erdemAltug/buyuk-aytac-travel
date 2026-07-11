/**
 * Ayvalık Cunda Turu — çoklu tarih seed script
 * Kullanım: npx tsx scripts/add-ayvalik-cunda-tours.ts
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

const tourDates = [
  { date: '2026-06-28', label: '28 Haziran 2026 Pazar', slugSuffix: '28-haziran-2026' },
  { date: '2026-07-11', label: '11 Temmuz 2026 Cumartesi', slugSuffix: '11-temmuz-2026' },
  { date: '2026-07-19', label: '19 Temmuz 2026 Pazar', slugSuffix: '19-temmuz-2026' },
  { date: '2026-07-25', label: '25 Temmuz 2026 Cumartesi', slugSuffix: '25-temmuz-2026' },
  { date: '2026-08-01', label: '1 Ağustos 2026 Cumartesi', slugSuffix: '1-agustos-2026' },
  { date: '2026-08-16', label: '16 Ağustos 2026 Pazar', slugSuffix: '16-agustos-2026' },
  { date: '2026-08-30', label: '30 Ağustos 2026 Pazar', slugSuffix: '30-agustos-2026' },
];

const baseTour = {
  name: 'Ayvalık Cunda Turu',
  description: 'Sanat Köy - Şeytan Sofrası - Ayvalık - Cunda Adası',
  image: '/images/Ayvalık-cunda.jpeg',
  duration: '1 Gün (Günübirlik)',
  price: 1750,
  destination: 'Ayvalık, Cunda Adası, Sanat Köy, Şeytan Sofrası',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
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
      title: 'Ayvalık – Cunda – Sanat Köy – Şeytan Sofrası',
      description:
        "Çerkezköy'den hareket. Sanat Köy gezisi. Şeytan Sofrası manzara noktası. Ayvalık keşfi. Cunda Adası turu. Dönüş.",
    },
  ],
  viewCount: 0,
};

async function addAyvalikCundaTours() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    let added = 0;
    let updated = 0;

    for (const { date, label, slugSuffix } of tourDates) {
      const slug = `ayvalik-cunda-turu-${slugSuffix}`;
      const tourData = {
        ...baseTour,
        slug,
        startDate: new Date(date),
        endDate: new Date(date),
      };

      const existingTour = await Tour.findOne({ slug });

      if (existingTour) {
        Object.assign(existingTour, tourData);
        await existingTour.save();
        updated++;
        console.log(`🔄 Güncellendi: ${label} → /tours/${slug}`);
      } else {
        const newTour = new Tour(tourData);
        await newTour.save();
        added++;
        console.log(`✅ Eklendi: ${label} → /tours/${slug}`);
      }
    }

    console.log('\n📊 Özet:');
    console.log(`- Yeni eklenen: ${added}`);
    console.log(`- Güncellenen: ${updated}`);
    console.log(`- Toplam tarih: ${tourDates.length}`);
    console.log('- Fiyat: 1.750 TL');
    console.log('- Tür: Günübirlik / Yurtiçi / Öne çıkan');
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addAyvalikCundaTours();
