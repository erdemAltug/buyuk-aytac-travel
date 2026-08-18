/**
 * İznik Kültür Turu — 29 Ağustos 2026 Seed Script
 * Kullanım: npx tsx scripts/add-iznik-tour.ts
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

const iznikTour = {
  name: 'İznik Kültür Turu - 29 Ağustos 2026',
  description: `Saray Kültür Merkezi: 04.00
Çorlu Orion - Eski Kız Meslek Durağı: 04.00
Çerkezköy Köşem Durağı: 05:00
Silivri: 05:45

Sabah 05:00 Çerkezköy hareketle belirlenen buluşma noktalarından siz değerli misafirlerimizi alarak araç içi ikramlarımız eşliğinde konforlu ve keyifli bir tur için yola koyuluyoruz. Yol üzerinde yapacağımız kahvaltı molası sonrasında tarihin ve kültürün eşsiz buluşma noktası olan İznik'te gerçekleştireceğimiz gezimize, bölgenin zengin geçmişine ışık tutan İznik Arkeoloji Müzesi ziyaretiyle başlıyoruz. Müze gezimizin ardından, şehrin görkemli surlarının en önemli girişlerinden biri olan Lefke Kapı'yı görerek İznik'in tarihi dokusunu yakından tanıma fırsatı buluyoruz.

Gezi rotamızın devamında, erken Osmanlı döneminin önemli eserlerinden Yeşil Camii'ni ziyaret ediyor, ardından Türk ve İslam eserlerinin sergilendiği tarihi Nilüfer Hatun İmareti'ni geziyoruz. Daha sonra, günümüzde çini sanatının yaşatıldığı ve el sanatları atölyelerine ev sahipliği yapan Süleyman Paşa Medresesi'ni ziyaret ederek İznik'in sanat ve kültür mirasına yakından tanıklık ediyoruz.

İznik'i dünyaca ünlü yapan çini sanatının izlerini sürmek üzere Çini Kazı Alanı'nı geziyor, ardından tarih boyunca önemli olaylara ev sahipliği yapmış Ayasofya Camii'ni ziyaret ediyoruz. Sonrasında Roma döneminden günümüze ulaşan etkileyici Roma Tiyatrosu'na geçerek antik dönemin izlerini keşfediyoruz.

Öğle yemeği için serbest zaman veriyor, dileyen misafirlerimizle Köfteci Yusuf'ta keyifli bir yemek molası gerçekleştiriyoruz. Yemek sonrası rotamızı İznik Gölü kıyısında bulunan ve dünyanın en önemli su altı arkeolojik keşiflerinden biri olarak kabul edilen Bazilika alanına çeviriyoruz.

Turumuzun son bölümünde ise İznik Gölü'nün eşsiz manzarası eşliğinde serbest zaman veriyoruz. Göl kenarında yürüyüş yapabilir, çay veya kahve eşliğinde günün keyfini çıkarabilir, İznik'in huzurlu atmosferinin tadını doyasıya yaşayabilirsiniz. Burada keyifli yürüyüşlerimiz sonrası tur programımızı tamamlayıp, Çerkezköy'e dönmek üzere yola çıkıyoruz. Siz değerli misafirlerimizi aldığımız noktalara bırakarak, bir sonraki BÜYÜK AYTAÇ TRAVEL turumuzda yeniden görüşmek üzere vedalaşıyoruz.`,
  image: '/images/iznik-29-agustos.jpeg',
  slug: 'iznik-kultur-turu-29-agustos-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1600,
  destination: 'İznik, İznik Arkeoloji Müzesi, Yeşil Cami, Ayasofya Camii, Roma Tiyatrosu, Su Altı Bazilikası, İznik Gölü',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-08-29'),
  endDate: new Date('2026-08-29'),
  includedServices: [
    'Lüks araçlar ile konforlu ulaşım ve araç içi ikramlar',
    'Profesyonel kokartlı rehberlik hizmeti',
    'Programda belirtilen tüm çevre gezileri',
  ],
  excludedServices: [
    'Müze ve ören yeri giriş ücretleri',
    'Gün içindeki tüm yemek öğünleri',
    'Kişisel harcamalar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'İznik Kültür Turu – Müze, Camiler, Göl ve Su Altı Bazilikası',
      description:
        "Çerkezköy, Çorlu, Saray ve Silivri duraklarından hareket. Kahvaltı molası. İznik Arkeoloji Müzesi. Lefke Kapı. Yeşil Camii. Nilüfer Hatun İmareti. Süleyman Paşa Medresesi. Çini Kazı Alanı. Ayasofya Camii. Roma Tiyatrosu. Öğle yemeği (serbest). Su Altı Bazilikası. İznik Gölü kenarında serbest zaman. Dönüş.",
    },
  ],
  viewCount: 0,
};

async function addIznikTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: iznikTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, iznikTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(iznikTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 29 Ağustos 2026 Cumartesi');
    console.log('- Fiyat:', iznikTour.price, 'TL');
    console.log('- Tür: Günübirlik / Yurtiçi / Öne çıkan');
    console.log('- URL: /tours/' + iznikTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addIznikTour();
