/**
 * Bursa - Misi Köyü - Gölyazı - Mudanya Turu Seed Script
 * Kullanım: npx tsx scripts/add-bursa-misi-golyazi-tour.ts
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

const bursaTour = {
  name: 'BURSA- MİSİ KÖYÜ - GÖLYAZI - MUDANYA TURU',
  description: `Siz değerli misafirlerimizi firmamızın belirlediği noktalardan alarak yola çıkıyoruz. Uludağ eteklerindeki Cumalıkızık Köyüne varıyoruz. Sabah burada alacağımız kahvaltı sonrası rehberimiz eşliğinde Cumalıkızık Köyünü dolaşıyoruz. Serbest zamanımızın ardından Misi köyüne geçiyoruz. Burada köy etrafını gezip keyif kahvelerimizi yudumladıktan sonra Ulubat gölü kenarına kurulmuş bir balıkçı köyü olan Gölyazı'ya hareket ediyoruz, keyifli bir yürüyüşle köy meydanına geçiyoruz. Köy meydanında yer alan Ağlayan Çınarı görüp rehberimizden hikâyesini dinledikten sonra köprü üzerinden yarımadaya geçiyoruz.

Ardından dileyen misafirlerimiz ile Gölyazı Tekne Turu (ekstra) yapıyoruz.

Gölyazı'da doğa ile iç içe Arnavut kaldırımlı dar sokaklarda rehberimiz eşliğinde dolaştıktan sonra serbest zaman veriyor ve ardından belirtilen saatte toplanarak Türk Yunan Savaşı'nın son bulduğu Mudanya Anlaşması ile adı özdeşleşen Mudanya'ya geliyor ve Mudanya Mütareke Evini geziyoruz.

Yolculuğumuzun ardından siz değerli misafirlerimizi aldığımız noktalara bırakarak, bir sonraki Büyük Aytaç Travel organizasyonunda yeniden görüşmek dileğiyle vedalaşıyoruz.

Programa Cumalıkızık'ta kahvaltı dahildir.

Bölge yoğunluğuna göre programda sıralama değişikliği yapılabilir.`,
  image: '/images/bursa-13-june.jpeg',
  slug: 'bursa-misi-koyu-golyazi-mudanya-turu-13-haziran-2026',
  duration: '1 Gün (Günübirlik)',
  price: 200,
  destination: 'Bursa, Cumalıkızık, Gölyazı, Mudanya, Misi Köyü',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-06-13'),
  endDate: new Date('2026-06-13'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde Şehir Turları ve Çevre Gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberler',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
    'Cumalıkızık’ta kahvaltı',
  ],
  excludedServices: [
    'Tüm müze ve ören yerlerine girişler',
    'Tüm kişisel harcamalar',
    'Kahvaltı harici yemek öğünleri',
    'Gölyazı’da tekne turu (ekstra)',
    'Ekstra belirtilen tüm organizasyonlar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Bursa - Cumalıkızık - Misi - Gölyazı - Mudanya',
      description:
        'Çerkezköy hareket. Cumalıkızık kahvaltı ve köy gezisi. Misi Köyü. Gölyazı, Ağlayan Çınar, tekne turu (ekstra). Mudanya Mütareke Evi. Dönüş.',
    },
  ],
  viewCount: 0,
};

async function addBursaTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: bursaTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, bursaTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(bursaTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 13 Haziran 2026 Cumartesi');
    console.log('- Fiyat:', bursaTour.price, 'TL (kahvaltı dahil)');
    console.log('- Öne çıkan: evet');
    console.log('- URL: /tours/' + bursaTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addBursaTour();
