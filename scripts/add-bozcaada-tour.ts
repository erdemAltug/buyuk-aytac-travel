/**
 * Bozcaada Turu Seed Script
 * Kullanım: npx tsx scripts/add-bozcaada-tour.ts
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

const bozcaadaTour = {
  name: 'Bozcaada Turu - 26 Temmuz 2026',
  description: `Belirtilen noktalarda buluştuktan sonra Tekirdağ, Gelibolu ve Çanakkale'yi takiben Bozcaada'ya gitmek üzere Geyikli feribot iskelesine gidiyoruz.

Bozcaada feribotunu beklerken müsaitlik durumunda sahilde çay, kahve keyfi yapıyoruz. Dileyenler simit, poğaça, tost vs. ile iskeledeki kafede kahvaltı yapabilirler. Adaya otobüs geçişi sağlanamadığı için yaya olarak geçiş sağlayacağız.

Bozcaada'ya yaklaşırken heybetli görüntüsüyle dikkatimizi çeken Bozcaada Kalesi'ni rehberimiz eşliğinde geziyoruz. Ardından Bozcaada'nın şirin sokakları arasında yürümeye başlıyoruz. Ada'nın Türk ve Rum mahallelerinde yapacağımız gezilerimizin ardından gün boyu serbest zaman veriyoruz.

Bu serbest zaman sırasında dileyen misafirlerimiz adaya özgü şarapların yapıldığı Talay Şarap Fabrikasını ziyaret edebilir, alışveriş yapabilirler. Ada sokaklarını gezerken yöresel lezzetleri tadabilir, sevdiklerinize Bozcaada ürünlerinden sakızlı ve bademli kurabiye, çeşit çeşit reçeller (domates, incir, süt, gelincik, üzüm gibi) ve çeşitli hediyelik eşyalar alabilirsiniz.

Denize girmek isteyen misafirlerimiz Ayazma Plajı'na veya Akvaryum Koyu'na gidebilir, muhteşem denizin tadını çıkarabilirler. Dileyen misafirlerimiz ise Rüzgar Güllerine giderek muhteşem fotoğraflar çekip, manzaranın tadını çıkartabilirler. (Ada'ya otobüs geçişi olmadığı için plajlara ve rüzgar güllerine yapılacak minibüs transferleri misafirlerimize aittir.)

Rehberimizin belirleyeceği saatte toplanarak feribot ile adadan ayrılıp Geyikli iskelesinde bizi bekleyen otobüsümüze binerek yolculuğumuz sonrasında siz değerli misafirlerimizi aldığımız noktalara bırakarak, bir başka Büyük Aytaç Travel organizasyonunda yeniden görüşmek üzere vedalaşıyoruz.`,
  image: '/images/bozcada-26.07.jpeg',
  slug: 'bozcaada-turu-26-temmuz-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1800,
  destination: 'Bozcaada, Geyikli, Bozcaada Kalesi, Ayazma Plajı, Akvaryum Koyu, Rüzgar Gülleri',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-07-26'),
  endDate: new Date('2026-07-26'),
  includedServices: [
    'Konforlu ulaşım ve araç içi ikramlar',
    'Geyikli-Bozcaada feribot geçişi',
    'Profesyonel kokartlı rehberlik hizmeti',
    'Programda belirtilen tüm çevre gezileri',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Kahvaltı ve öğle yemeği',
    'Plajlara ve rüzgar güllerine minibüs transferleri',
    'Müze ve ören yeri girişleri',
    'Ekstra belirtilen tüm organizasyonlar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Bozcaada – Kale – Ada Gezisi – Serbest Zaman',
      description:
        "Çerkezköy'den hareket. Geyikli feribot iskelesi. Feribotla Bozcaada'ya geçiş. Bozcaada Kalesi gezisi. Türk ve Rum mahalleleri turu. Gün boyu serbest zaman. Talay Şarap Fabrikası, Ayazma Plajı, Akvaryum Koyu veya Rüzgar Gülleri. Feribot ile dönüş.",
    },
  ],
  viewCount: 0,
};

async function addBozcaadaTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: bozcaadaTour.slug });
    await Tour.deleteOne({ slug: 'bozcaada-turu' });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, bozcaadaTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(bozcaadaTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 26 Temmuz 2026 Pazar');
    console.log('- Fiyat:', bozcaadaTour.price, 'TL');
    console.log('- Tür: Günübirlik / Yurtiçi / Öne çıkan');
    console.log('- URL: /tours/' + bozcaadaTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addBozcaadaTour();
