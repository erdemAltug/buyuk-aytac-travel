/**
 * Ormanya Maşukiye Turu — 23 Ağustos 2026 Seed Script
 * Kullanım: npx tsx scripts/add-ormanya-masukiye-tour.ts
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

const ormanyaTour = {
  name: 'Ormanya Maşukiye Turu - 23 Ağustos 2026',
  description: `Belirlenen duraklardan siz değerli misafirlerimizi alarak araç içi ikramlarımız eşliğinde doğa ve eğlence dolu bir gün için yola çıkıyoruz.

İlk durağımız Kocaeli'nin en sevilen doğal yaşam alanlarından Ormanya Tabiat Parkı. Yürüyüş parkurları, orman içi yollar ve fotoğraf molaları eşliğinde yeşilin içinde serbest zaman geçiriyoruz. Dileyen misafirlerimiz park içindeki hayvanat bahçesi ve doğa yürüyüşü alanlarını gezebilir.

Ardından Max Fun Eğlence Parkı'na geçiyoruz. Dileyen misafirlerimiz lunapark ve macera aktivitelerine katılabilir (ekstra). Serbest zamanın ardından Sapanca'ya hareket ediyoruz. Sapanca Gölü kenarında kısa bir mola veriyor, göl manzarasında fotoğraf çekiyoruz.

Turumuzun son durağı Maşukiye. Şelale ve dere kenarındaki restoran bölgesinde öğle yemeği için serbest zaman veriyoruz (ekstra). Cam teras, yürüyüş ve alışveriş molasının ardından belirlenen saatte toplanarak Çerkezköy'e dönüş yolculuğuna geçiyoruz.

Siz değerli misafirlerimizi aldığımız noktalara bırakırken bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda yeniden görüşmek üzere vedalaşıyoruz.

Tur programında bölge yoğunluğu, trafik ve hava koşulları sebebiyle sıralama değişikliği olabilir.`,
  image: '/images/ormanya-23-agustos.jpeg',
  slug: 'ormanya-masukiye-turu-23-agustos-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1350,
  destination: 'Ormanya Tabiat Parkı, Max Fun Eğlence Parkı, Sapanca, Maşukiye',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-08-23'),
  endDate: new Date('2026-08-23'),
  includedServices: [
    'Konforlu ulaşım ve araç içi ikramlar',
    'Profesyonel kokartlı rehberlik hizmeti',
    'Programda belirtilen tüm çevre gezileri',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Max Fun eğlence parkı aktiviteleri',
    'Tüm yemek öğünleri',
    'Müze ve ören yeri girişleri',
    'Kişisel harcamalar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Ormanya – Max Fun – Sapanca – Maşukiye',
      description:
        "Çerkezköy'den hareket. Ormanya Tabiat Parkı gezisi ve serbest zaman. Max Fun Eğlence Parkı (aktiviteler ekstra). Sapanca Gölü molası. Maşukiye şelale ve öğle yemeği (serbest). Dönüş.",
    },
  ],
  viewCount: 0,
};

async function addOrmanyaTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: ormanyaTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, ormanyaTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(ormanyaTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 23 Ağustos 2026 Pazar');
    console.log('- Fiyat:', ormanyaTour.price, 'TL');
    console.log('- Tür: Günübirlik / Yurtiçi / Öne çıkan');
    console.log('- URL: /tours/' + ormanyaTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addOrmanyaTour();
