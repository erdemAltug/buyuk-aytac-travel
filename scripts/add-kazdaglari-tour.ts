/**
 * Çanakkale Kaz Dağları Turu Seed Script
 * Kullanım: npx tsx scripts/add-kazdaglari-tour.ts
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

const kazdaglariTour = {
  name: 'Çanakkale Kaz Dağları Turu - 15 Temmuz 2026',
  description: `Belirlenen saat ve duraklardan siz değerli misafirlerimizi alarak Kazdağları'nın eteklerinde yer alan, doğal dokusunu korumuş taş evleriyle otantik bir havasıyla ünlü Yeşilyurt Köyü, bizleri karşılıyor. Köy sokaklarında yapacağımız keyifli yürüyüş sırasında geleneksel mimarinin izlerini sürerken, doğayla iç içe huzurlu bir atmosferde fotoğraf molası veriyoruz. Ziyaretimiz sırasında dileyen misafirlerimiz kahvaltı yapabilir (EKSTRA) köy meydanında kurulan stantlarda el yapımı ürünler, zeytinyağlılar ve doğal hediyelik eşyalarla tanışma fırsatı buluyoruz. Dileyen misafirlerimiz, tarihi köy kahvesinde çay molası vererek bu güzel atmosferin tadını çıkarabilir.

İkinci durağımız olan Adatepe köyüne gidiyoruz. Zeytinin binlerce yıllık serüvenine tanıklık edeceğimiz Zeytinyağı Müzesi ziyaretimizde, bu kadim meyvenin dalından sofraya uzanan yolculuğunu rehber anlatımı eşliğinde öğreniyoruz. Müze içinde yer alan geleneksel taş baskı sistemleri, antika pres makineleri ve geçmişten günümüze zeytinyağı üretiminde kullanılan ekipmanları keşfediyoruz. Adatepe köyü içerisinde serbest zaman veriyoruz.

Buradaki ziyaretimizi tamamlamamızın ardından Akçay'a varıyor ve bizi bekleyen minibüslerimizle Kazdağları Milli Parkı'na çıkıyoruz. Kazdağlarında Sütüven Şelalesi'ni geziyoruz ve orman içi zevkli bir yolculukla, Hasan Boğuldu'ya ulaşıyoruz. Hasan ile Emine'nin hazin öyküsünü rehberimizden dinleyerek, yemyeşil doğası, pınarı, küçük göletleri ve şelalesiyle keyifli bir gezi yapıyoruz. Bu gizli cennette yürüyüş ve bol oksijen size büyük şehir stresini unutturacak.

Ardından Çanakkale merkeze geçip, Çanakkale'nin tarih ve kültür mirasıyla dolu sokaklarına adım atıyoruz. Şehrin kalbinde yer alan ve geçmişin izlerini taşıyan Aynalı Çarşı ilk durağımız olacak. Burada, Osmanlı döneminden günümüze uzanan el işçiliğiyle bezenmiş aynaları, geleneksel dokumaları ve yöresel lezzetleri keşfetme fırsatı bulacaksınız. Çarşının dar sokaklarında ilerlerken, tarihin yankılarını hissedecek ve zaman zaman geçmişle bugün arasında bir yolculuğa çıkacaksınız.

Çanakkale'nin merkezinde rehberimizin vereceği serbest zaman sonrası dileyen misafirlerimiz burada yemek yiyebilir (EKSTRA) belirlenen noktada buluşup dönüş yolculuğuna geçiyoruz. Siz değerli misafirlerimizi aldığımız noktalara bırakırken bir sonraki Büyük Aytaç Travel organizasyonunda buluşmak üzere vedalaşıyoruz.`,
  image: '/images/kazdagları-15.07.jpeg',
  slug: 'canakkale-kaz-daglari-turu-15-temmuz-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1750,
  destination: 'Yeşilyurt, Adatepe, Kaz Dağları, Sütüven Şelalesi, Hasan Boğuldu, Çanakkale, Aynalı Çarşı',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-07-15'),
  endDate: new Date('2026-07-15'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Araç içi ikramlar',
    'Kazdağları Milli Parkı minibüs ücreti',
    'Program dahilinde şehir turları ve çevre gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberlik Hizmeti',
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
      title: 'Çanakkale ve Kaz Dağları – Yeşilyurt, Adatepe, Sütüven, Hasan Boğuldu',
      description:
        "Çerkezköy'den hareket. Yeşilyurt Köyü gezisi. Adatepe Köyü ve Zeytinyağı Müzesi. Kazdağları Milli Parkı, Sütüven Şelalesi ve Hasan Boğuldu. Çanakkale merkez, Aynalı Çarşı. Serbest zaman ve dönüş.",
    },
  ],
  viewCount: 0,
};

async function addKazdaglariTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI as string);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: kazdaglariTour.slug });
    await Tour.deleteOne({ slug: 'canakkale-kaz-daglari-turu' });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, kazdaglariTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(kazdaglariTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 15 Temmuz 2026 Çarşamba');
    console.log('- Fiyat:', kazdaglariTour.price, 'TL');
    console.log('- Tür: Günübirlik / Yurtiçi / Öne çıkan');
    console.log('- URL: /tours/' + kazdaglariTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addKazdaglariTour();
