/**
 * Assos Turu Seed Script
 * Kullanım: npx tsx scripts/add-assos-tour.ts
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

const assosTour = {
  name: 'ASSOS TURU',
  description: `Siz değerli misafirlerimizin katılımı ile başlayan keyifli yolculuğumuzda, Çanakkale Boğazı'ndan geçerek Edremit Körfezine doğru ilerliyoruz. Yol üzerinde dinlenme tesislerinde alacağımız kahvaltı sonrası (ekstra) güneşin doğuşuyla birlikte bir tarafımızda masmavi deniz, diğer tarafımızda yemyeşil zeytin ağaçları eşliğinde huzurlu bir yolculuk yaparak turumuza başlıyoruz.

Yeşilyurt Köyü – Tarihi Cami ve Köy Gezisi

İlk durağımız, Rumların da bir dönem yaşadığı Yeşilyurt Köyü. Köy meydanında bulunan, Minaresi ile dikkat çeken tarihi Yeşilyurt Camii, Yunan ustalar tarafından inşa edildiği için kiliseyi andıran mimarisiyle oldukça ilgi çekicidir. Rehberimiz eşliğinde köy sokaklarında keyifli bir yürüyüş gerçekleştiriyoruz.

Adatepe Köyü – Taş Evler ve Doğal Doku

Sonraki durağımız, taş evleri ve gölgeli sokaklarıyla geçmişten günümüze taşınmış bir kartpostal görünümünde olan Adatepe Köyü. Köyde ünlü dondurmaların tadına bakarak rehberimizle birlikte bu tarihi yerleşimi keşfediyoruz.

Öğle Yemeği Molası (EKSTRA)

Tarihin denizle buluştuğu eşsiz bir noktada yer alan Assos Antik Kenti'ni rehber eşliğinde keşfe çıkıyoruz. Antik liman kentinin taş sokaklarında ilerlerken, binlerce yıl öncesinin izlerini süreceğimiz bu gezi sırasında rehberimizden bölgenin tarihi, kültürel önemi ve mimarisi hakkında detaylı bilgiler alıyoruz. (Antik kent girişi ücretlidir.)

Zirvede yer alan Athena Tapınağı'na ulaştığımızda ise bizleri Ege'nin masmavi sularına hâkim muhteşem bir manzara karşılıyor. Tarihle doğanın bütünleştiği atmosferde serbest zaman sonrası belirlenen noktada buluşup dönüş yolculuğuna geçiyoruz. Siz değerli misafirlerimizi aldığımız noktalara bırakırken bir sonraki Büyük Aytaç Travel organizasyonunda buluşmak üzere vedalaşıyoruz.`,
  image: '/images/assos-29-may.jpeg',
  slug: 'assos-turu',
  duration: '1 Gün (Günübirlik)',
  price: 1750,
  destination: 'Assos, Behramkale, Yeşilyurt, Adatepe, Athena Tapınağı',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-05-29'),
  endDate: new Date('2026-05-29'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde Şehir Turları ve Çevre Gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberler',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Ekstra Belirtilen Tüm Organizasyonlar (kahvaltı, öğle yemeği vb.)',
    'Müze ve Ören Yeri Girişleri (Assos Antik Kent girişi)',
    'Tüm yemek öğünleri',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Assos Turu – Yeşilyurt, Adatepe, Antik Kent, Athena Tapınağı',
      description:
        "Çerkezköy'den hareket. Çanakkale Boğazı ve Edremit Körfezi güzergâhı. Yeşilyurt Köyü ve tarihi cami gezisi. Adatepe Köyü keşfi. Öğle yemeği (ekstra). Assos Antik Kent rehberli tur. Athena Tapınağı ve manzara. Dönüş.",
    },
  ],
  viewCount: 0,
};

async function addAssosTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: assosTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, assosTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(assosTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 29 Mayıs 2026 (Bayramın 3. günü)');
    console.log('- Fiyat:', assosTour.price, 'TL');
    console.log('- Öne çıkan: evet');
    console.log('- URL: /tours/' + assosTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addAssosTour();
