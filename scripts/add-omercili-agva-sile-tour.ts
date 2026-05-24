/**
 * Ömerli - Saklı Göl - Ağva - Şile Turu Seed Script
 * Kullanım: npx tsx scripts/add-omercili-agva-sile-tour.ts
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

const omerciliAgvaSileTour = {
  name: 'ÖMERLİ – SAKLI GÖL- AĞVA-DENİZ FENERİ-GÖKSU NEHRİ-TEKNE TURU-ŞİLE',
  description: `Belirtilen noktalarda buluştuktan sonra İstanbul-Beykoz'u takiben Ömerli köyünde kahvaltı için mola veriyoruz. (ekstra) Kahvaltı sonrası yapay göl olarak olmasına rağmen doğal güzellikleriyle büyüleyen Saklı Göl'e uğruyoruz. Burada vereceğimiz kısa çay kahve molasından sonra Ağva'ya hareket ediyoruz. Yolumuz boyunca ilkbaharda ve sonbaharda ayrı renk cümbüşüne bürünen orman ve ağaç tünellerinden geçerek yemyeşil bir ormana yaslanmış, masmavi Karadeniz'e yüzünü dönmüş, iki nehir arasında kalmış yani bir yanında Yeşilçay, diğer yanında Göksu Deresi ile Ağva bizleri karşılıyor. Doyumsuz güzellikleri ömür boyu bakıp hatırlayabileceğiniz eşsiz hatıraları fotoğraf çekerek, ölümsüzleştirin. Ağva'da, Karadeniz'den geçen gemilere kılavuzluk eden deniz fenerine doğru fotoğraf molaları eşliğinde keyifli bir yürüyüş yapıyoruz. Deniz feneri gezimiz sonrası Ağva merkezde köy ürünleri ve meşhur şile bezi ürünleri alabilmeniz açısından serbest zaman veriyoruz. Dileyen misafirlerimizle ekstra olarak Göksu Nehrinde keyifli bir tekne turu yapıyoruz. (EKSTRA)
Fotoğrafik kareler yakalamanız mümkün, sazlıklar arasındaki kıyılara kurulmuş birbirinden güzel ahşap oteller, villalar ve köy evleri önünde sakince akan suda, yüzen ördekler ve kuş sesleri, ağaç dalları üzerinde güneşlenen su kaplumbağaları, su üstünde süzülen su yılanları ile kendinizi bakir doğanın kucağında hissediyorsunuz. Dileyen misafirlerimiz öğle yemeğinde nehrin kenarında ekstra olarak yemek alabilirler. Turumuzun devamında, altın sarısı kumsalların kıyısından ve yeşillikler içindeki pek çok köyün içinden otobüsümüzle ilerleyerek, adeta ışıldayan bir yeryüzü cenneti olan Şile'ye ulaşıyoruz.
Şile'de Türkiye'nin en büyük, dünyanın da ikinci büyük feneri Karadeniz'deki kıyı emniyetini sağlayan iki fenerden biri olan Şile Fenerini ve balıkçı limanını panoramik olarak görüyoruz ve rehberimizden fener hakkında bilgiler alıyoruz.
Panoramik turumuz ardından vereceğimiz serbest zamanda doyumsuz Karadeniz manzarası izleyip sonrasında alışveriş yapılabilir. Ahşap konaklar ve Şile bezi dükkanlarının olduğu eski sokaklarında kısa bir yürüyüş yapıyoruz. Dileyen misafirlerimiz serbest zamanda engin Karadeniz'e karşı falezlerin üstünde bulunan Kavala parkını ziyaret edebilirler ve buradaki turumuzu tamamlıyoruz. Bu muhteşem doğadaki gezimizi sonlandırdıktan dönüşe geçiyoruz. Siz değerli misafirlerimizi aldığımız noktalara bırakarak, bir sonraki BÜYÜK AYTAÇ TRAVEL turumuzda yeniden görüşmek üzere vedalaşıyoruz.`,
  image: '/images/sile-7-june.jpeg',
  slug: 'omercili-sakli-gol-agva-deniz-feneri-goksu-nehri-tekne-turu-sile',
  duration: '1 Gün (Günübirlik)',
  price: 1300,
  destination: 'Şile, Ağva, Ömerli, Saklı Göl',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-06-07'),
  endDate: new Date('2026-06-07'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde Şehir Turları ve Çevre Gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberler',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Ekstra Belirtilen Tüm Organizasyonlar',
    'Müze ve Ören Yeri Girişleri',
    'Tüm yemek öğünleri',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Ömerli - Saklı Göl - Ağva - Şile Turu',
      description:
        "Çerkezköy'den hareket. Ömerli köyünde kahvaltı (ekstra). Saklı Göl ziyareti. Ağva'ya geçiş. Deniz feneri ziyareti. Köy ürünleri ve Şile bezi alışverişi. Göksu Nehrinde tekne turu (ekstra). Şile'ye ulaşım. Şile Feneri ve balıkçı limanı panoramik turu. Kavala Parkı ziyareti. Dönüş.",
    },
  ],
  viewCount: 0,
};

async function addOmerciliAgvaSileTour() {
  try {
    console.log('MongoDB\'ye bağlanılıyor...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: omerciliAgvaSileTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, omerciliAgvaSileTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(omerciliAgvaSileTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 7 Haziran 2026 Pazar');
    console.log('- Fiyat:', omerciliAgvaSileTour.price, 'TL');
    console.log('- Öne çıkan: evet');
    console.log('- URL: /tours/' + omerciliAgvaSileTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addOmerciliAgvaSileTour();
