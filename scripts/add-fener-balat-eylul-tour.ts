/**
 * Fener - Balat Turu — 13 Eylül 2026 Seed Script
 * Kullanım: npx tsx scripts/add-fener-balat-eylul-tour.ts
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

const fenerBalatTour = {
  name: 'Fener - Balat Turu - 13 Eylül 2026',
  description: `Fener - Balat'ı yürüyerek keşfetmeye ne dersiniz? Gezelim, görelim, tarihe dokunalım!

Belirlenen duraklardan siz değerli misafirlerimizi alarak Haliç'in iki yakasında tarihin, renkli evlerin ve kültürlerin iç içe geçtiği Fener ve Balat semtlerine doğru yola çıkıyoruz. Turumuz yürüyüş ağırlıklıdır; dar sokaklarda, tarihi sur diplerinde ve fotoğraf molalarında İstanbul'un en otantik mahallelerini rehberimiz eşliğinde keşfederiz.

Gezimize Tarihi Tütün Deposu ile başlıyor, ardından Gül Camii'ni ziyaret ediyoruz. Fener Rum Patrikhanesi ve Demir Kilise (Sveti Stefan Bulgar Kilisesi) duraklarımızın ardından Fener sokaklarında yürüyüşümüze devam ediyoruz. Renkli evleriyle ünlü Balat sokaklarında fotoğraf molası veriyor, Agora Meyhanesi çevresindeki tarihi dokuyu görüyoruz.

Saray Surları, Fener Rum Lisesi'nin kırmızı tuğlalı görkemli binası, Mesnevihane, Azize Maria Kilisesi, Ermeni Kilisesi ve Ferruh Kethüda Camisi turumuzun diğer durakları arasında yer alır. Öğle yemeği için serbest zaman verilir (ekstra). Bol fotoğraf fırsatı eşliğinde keyifli bir günün ardından Çerkezköy'e dönüş yolculuğuna geçiyoruz.

Siz değerli misafirlerimizi aldığımız noktalara bırakırken bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda yeniden görüşmek üzere vedalaşıyoruz.`,
  image: '/images/fener-balat-13-eylul.jpeg',
  slug: 'fener-balat-turu-13-eylul-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1250,
  destination: 'Fener, Balat, Haliç, Fener Rum Patrikhanesi, Demir Kilise, Fener Rum Lisesi',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-09-13'),
  endDate: new Date('2026-09-13'),
  includedServices: [
    'Konforlu ulaşım ve araç içi ikramlar',
    'Profesyonel kokartlı rehberlik hizmeti',
    'Programda belirtilen tüm çevre gezileri',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Müze ve ören yeri giriş ücretleri',
    'Tüm yemek öğünleri',
    'Kişisel harcamalar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Fener – Balat Yürüyüş Turu',
      description:
        "Çerkezköy'den hareket. Tarihi Tütün Deposu, Gül Camii, Fener Rum Patrikhanesi, Demir Kilise. Fener ve Balat sokakları. Agora Meyhanesi çevresi, Saray Surları, Fener Rum Lisesi, Mesnevihane, Azize Maria Kilisesi, Ermeni Kilisesi, Ferruh Kethüda Camisi. Öğle yemeği (serbest). Dönüş.",
    },
  ],
  viewCount: 0,
};

async function addFenerBalatTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: fenerBalatTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, fenerBalatTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(fenerBalatTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 13 Eylül 2026 Pazar');
    console.log('- Fiyat:', fenerBalatTour.price, 'TL');
    console.log('- Tür: Günübirlik / Yurtiçi / Öne çıkan');
    console.log('- URL: /tours/' + fenerBalatTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addFenerBalatTour();
