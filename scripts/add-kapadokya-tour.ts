/**
 * Kapadokya Turu Seed Script
 * Kullanım: npx tsx scripts/add-kapadokya-tour.ts
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

const kapadokyaTour = {
  name: 'KAPADOKYA TURU',
  description: `Siz değerli misafirlerimizi firmamızın belirlediği noktalardan alarak yola çıkıyoruz.

CUMARTESİ
Sabah erken saatlerde alacağımız kahvaltının ardından (ekstra) Kapadokya'nın mistik atmosferine adım atmak üzere Göreme Açık Hava Müzesi'ne gidiyoruz. Burada binlerce yıllık tarihi ve benzersiz kaya kiliselerini keşfederek bölgenin büyüleyici geçmişine tanıklık edeceksiniz. Daha sonra eskiden "Rahipler Vadisi" bugün ise Paşabağları olarak adlandırılan bölge kendine özgü peribacaları ile kaplıdır. Sonrasında Kızılırmak üzerine kurulmuş sallanan köprüden yürüyüş yaparak Avanos'ta çömlek atölyelerinde ustaların elinden çıkan geleneksel çömlekleri inceleyerek bölgenin zanaatkarlık geleneğini yakından görüyoruz. Taş atölyeleri sonrası Kızılırmak nehrinin üzerine inşa edilen Sallanan Köprüyü ziyaret ediyoruz. Burada nehir kenarında çay-kahve molası veriyoruz. Sonrasında bölgenin eşsiz onyx taşlarını inceleyip alışveriş yapma fırsatı bulacağımız onyx atölyesi olacak.

Sonrasında büyüleyici kaya oluşumlarının yer aldığı Hayal Vadisi'nde keyifli bir yürüyüş yapıyoruz ve eşsiz doğanın büyüsüne kapılıyoruz. Hayal Vadisi'nden sonra Ürgüp'e doğru yol alırken panoramik olarak bölgenin sembolü Üç Güzelleri görüyor ve bölgenin ünlü şarap mahzenlerini ziyaret etme fırsatı yakalıyoruz. Burada Kapadokya'ya özgü üzümlerden yapılan şaraplar hakkında bilgi alma, şarap alışverişi yapma şansı yakalıyoruz. (Programın tamamlanamaması durumunda şarap fabrikası pazar günü ziyaret edilebilir.) Gün sonunda akşam yemeği ve konaklama için otelimize geçiyoruz. (Dileyen misafirlerimiz ekstra olarak düzenlenecek Türk Gecesine katılabilir.)

PAZAR
Sabah balonların kalkış durumuna göre bölgeden aldığımız haber doğrultusunda balon seyri için sabahın ilk ışıklarıyla seyir tepesine gidiyoruz. Balonların kalkışını izledikten sonra otelimize dönüyor ve otelde alacağımız kahvaltı sonrası Kapadokya'nın doğasıyla bütünleşmiş Güvercinlik Vadisinde eşsiz fotoğraflar çekme fırsatı yakalıyoruz.

Uçhisar kalesinin görkemli manzarasını süsleyen eşsiz eski Kapadokya evleri eşliğinde kahve molası veriyoruz. Dinlenme molamızın ardından bölgenin ünlü kabak çekirdeklerinin tadına bakmak ve diğer yöresel ürünleri deneyimlemek için alışverişe geçiyoruz. Alışverişimizin ardından Uçhisar'da bulunan eski yerleşim alanını ziyaret ederek Derinkuyu Yeraltı Şehri'ni keşfetmek için derinlere iniyoruz, tarihin gizemli koridorlarında zaman yolculuğu yapıyoruz. Burada vereceğimiz vaktin ardından Ihlara Vadisi'nin etkileyici manzarasını ziyaret ediyoruz. Ziyaret sonrası dönüş yolunda yemek molası (ekstra) ardından yolumuza devam ediyor, bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda görüşmek dileğiyle vedalaşıyoruz.

Ören yerleri girişi için Müzekart gerekmektedir. Play Store / App Store üzerinden Müzekart uygulamasını indirerek satın alım yapabilir, girişlerde kullanabilirsiniz.

Tur programında bölge yoğunluğu, trafik, hava koşulları sebebiyle sıralama değişikliği olabilir.`,
  image: '/images/kapadokya-19-21-june.jpeg',
  slug: 'kapadokya-turu-19-21-haziran-2026',
  duration: '2 Gün 1 Gece',
  price: 5900,
  destination: 'Kapadokya, Göreme, Ürgüp, Avanos, Derinkuyu',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.WITH_ACCOMMODATION,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-06-19'),
  endDate: new Date('2026-06-21'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde Şehir Turları ve Çevre Gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberler',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
    'Cumartesi akşam yemeği ve Pazar sabah kahvaltı konseptinde 1 gece otel konaklaması (yarım pansiyon)',
  ],
  excludedServices: [
    'Cumartesi sabah kahvaltısı',
    'Öğle yemekleri',
    'Pazar akşam yemeği',
    'Ekstra belirtilen tüm organizasyonlar (Türk Gecesi vb.)',
    'Müze ve ören yeri girişleri (Müzekart gerekir)',
  ],
  program: [
    {
      day: '1. Gün (Cumartesi)',
      title: 'Göreme - Paşabağları - Avanos - Ürgüp',
      description:
        'Göreme Açık Hava Müzesi, Paşabağları, Avanos çömlek atölyeleri, Sallanan Köprü, Onyx atölyesi, Hayal Vadisi, Üç Güzeller, şarap mahzeni. Akşam yemeği ve otel konaklaması.',
    },
    {
      day: '2. Gün (Pazar)',
      title: 'Balon seyri - Güvercinlik - Derinkuyu - Ihlara - Dönüş',
      description:
        'Balon kalkışı izleme (hava şartlarına bağlı), kahvaltı, Güvercinlik Vadisi, Uçhisar, Derinkuyu Yeraltı Şehri, Ihlara Vadisi. Dönüş yolunda öğle yemeği (ekstra).',
    },
  ],
  viewCount: 0,
};

async function addKapadokyaTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: kapadokyaTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, kapadokyaTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(kapadokyaTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 19-21 Haziran 2026');
    console.log('- Fiyat:', kapadokyaTour.price, 'TL');
    console.log('- Konaklama: 2 Gün 1 Gece (yarım pansiyon)');
    console.log('- Öne çıkan: evet');
    console.log('- URL: /tours/' + kapadokyaTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addKapadokyaTour();
