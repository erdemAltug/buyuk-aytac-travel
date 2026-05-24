/**
 * Safranbolu Turu Seed Script (13-14 Haziran 2026)
 * Kullanım: npx tsx scripts/add-safranbolu-tour.ts
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

const safranboluTour = {
  name: 'SAFRANBOLU TURU',
  description: `1. Gün – ÇERKEZKÖY - SAFRANBOLU

Cuma gece yarısı 00:00'de Çerkezköy'den hareketle İstanbul üzeri Safranbolu'ya doğru yola çıkıyoruz. Sabah saatlerinde yol üzeri tesislerde serbest olarak alacağımız kahvaltının ardından (ekstra) UNESCO tarafından koruma listesine alınan eski bir Bektaşi Köyü olan Yörük Köyüne doğru yola çıkıyoruz. Kasım Sipahioğlu Konağını ziyaret ettikten ve alışveriş için vereceğimiz serbest zamanın ardından tarihi geleneksel Osmanlı Konaklarını panoramik olarak seyredip fotoğraflayacağımız Hıdırlık Tepesine doğru hareket ediyoruz.

Safranbolu'da Kaymakamlar Gezi evini ziyaret ediyoruz. (Dileyen misafirlerimiz konakta bölgeye has çay ve kahve sunumunu tadabilir).

Gezi güzergahında bulunan İzzet Paşa Cami, Demirciler Bakırcılar Çarşısı, Akçasu Kanyonu, Arasta Çarşısı, Köprülü Mehmet Paşa Külliyesi ve Güneş saatini de geziyoruz.

Kazdağlıoğlu Meydanında tarihi kentin meşhur lokum imalatı hakkında bilgi alıyoruz ve kararlaştırdığımız yer ve saatte toplanacak şekilde öğlen yemeği için Serbest Zaman veriyor, ya da toplu yemek yiyeceğimiz lokantamıza geçiyoruz (EKSTRA). Öğleden sonra Dünyada iki örneği bulunan bir tanesi Arizona'daki Tokatlı Kanyonu'ndan sonra muhteşem manzaralı Cam Terasa geçiyoruz. Cam Terasta vereceğimiz Serbest zamanın ardından otelimize yerleşiyoruz. Akşam yemeği otelimizde.

2. Gün – AMASRA

Sabah otelimizde alacağımız kahvaltının ardından Karadeniz'in eşsiz güzelliklerine sahip Fatih Sultan Mehmet tarafından "Çeşm-i Cihan bura mı ola" (Dünya'nın Gözü) diye adlandırılan Amasra'ya doğru yola çıkıyoruz.

Küçük bir adayı bağlayan Kemere Köprüsü, Çekiciler Çarşısını görüp öğlen yemeğimizi alacağımız restorana geçiyoruz. (EKSTRA)

Öğle yemeği molasının ardından Osmanlılar döneminde Bahriye-i Hümayun sonrasında Mızıka Okulu olarak da kullanılan Amasra Müzesi gezisinin ardından kentten ayrılıyor ve Çerkezköy'e doğru yola çıkıyoruz. Yolculuğumuzun ardından, siz değerli misafirlerimizi aldığımız noktalara bırakarak bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda yeniden görüşmek üzere vedalaşıyoruz.

Tur programında bölge yoğunluğu, trafik, hava koşulları sebebiyle sıralama değişikliği olabilir.`,
  image: '/images/safranbolu-14-june.jpeg',
  slug: 'safranbolu-turu-13-14-haziran-2026',
  duration: '2 Gün 1 Gece',
  price: 5300,
  destination: 'Safranbolu, Amasra, Yörük Köyü, Bartın',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.WITH_ACCOMMODATION,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-06-13'),
  endDate: new Date('2026-06-14'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Program dahilinde Şehir Turları ve Çevre Gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberler',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
    'Yarım pansiyon konseptinde 1 Gece otel konaklaması',
  ],
  excludedServices: [
    'Öğle Yemekleri',
    'Ekstra Belirtilen Tüm Organizasyonlar',
    'Müze ve Ören Yeri Girişleri',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Çerkezköy - Safranbolu',
      description:
        "Cuma gece 00:00 Çerkezköy hareket. Yörük Köyü, Kasım Sipahioğlu Konağı, Hıdırlık Tepesi. Kaymakamlar Gezi Evi. İzzet Paşa Cami, Demirciler Çarşısı, Akçasu Kanyonu, Arasta, Cam Teras. Otele yerleşme ve akşam yemeği.",
    },
    {
      day: '2. Gün',
      title: 'Amasra - Dönüş',
      description:
        "Otelde kahvaltı. Amasra, Kemere Köprüsü, Çekiciler Çarşısı. Öğle yemeği (ekstra). Amasra Müzesi. Çerkezköy'e dönüş.",
    },
  ],
  viewCount: 0,
};

async function addSafranboluTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: safranboluTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, safranboluTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(safranboluTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 13-14 Haziran 2026');
    console.log('- Fiyat:', safranboluTour.price, 'TL');
    console.log('- Konaklama: 2 Gün 1 Gece');
    console.log('- Öne çıkan: evet');
    console.log('- URL: /tours/' + safranboluTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addSafranboluTour();
