/**
 * Lavanta Hasadı - Salda Gölü - Pamukkale Turu Seed Script
 * Kullanım: npx tsx scripts/add-pamukkale-lavanta-tour.ts
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

const pamukkaleLavantaTour = {
  name: 'LAVANTA HASADI- SALDA GÖLÜ-PAMUKKALE TURU',
  description: `1. GÜN: ÇERKEZKÖY HAREKET
Saat 21.00'de Çerkezköy Köşem kahveler hareketle başlar. İstanbul, Bilecik ve Afyon üzerinden Isparta'ya varıyoruz.

2. GÜN: KUYUCAK KÖYÜ-LAVANTA BAHÇELERİ - PROF.DR. TURAN YAZGAN ETNOGRAFYA HALI ve KİLİM MÜZESİ-GÜLCÜ İSMAİL EFENDİ HEYKELİ-SÜLEYMAN DEMİREL HEYKELİ-GÜL HEYKELİ-SAGALASSOS ANTİK KENTİ-SALDA GÖLÜ-PAMUKKALE
Bilecik, Afyon üzerinden Isparta'ya hareket ediyoruz. Isparta'nın Lavanta üretimi ile meşhur Keçiborlu ilçesinin Kuyucak (Lavanta) Köyüne gidiyoruz. Program başlangıcında alacağımız kahvaltı sonrası (ekstra) Lavantalar, haziran sonu morarmaya başlıyor ve temmuz ayı çiçekleri patlayınca mosmor oluyor. Bu köyde, doğa ile baş başa, mis gibi kokusuyla sizi büyüleyen lavanta tarlalarını görme ve bol bol fotoğraf çekme şansına sahip olacağız.
Burada oluşturulan reyonlarda köylülerin kendi ürettiği lavanta ürünleri ve diğer köy ürünlerinden alışverişler yapabilirsiniz.
Prof. Dr. Turan Yazgan Etnografya Halı ve Kilim Müzesini geziyoruz. Isparta'ya gülü getiren Gülcü İsmail Efendi Heykelini, Süleyman Demirel Heykelini ve Isparta'nın sembolü Gül Heykelini görerek Isparta merkezde serbest zaman veriyor ve meşhur gül suyu, gül lokumu, gül sabunu alışverişlerimizi yapıyoruz.
Roma İmparatorluğu'nun en önemli şehirlerinden olan Sagalassos Antik Kenti'ni görmek üzere şehir merkezinden ayrılıyoruz. Tarihi bölge sonrası öğle yemeği molası veriyoruz. (ekstra)

Turumuzun devamında, Burdur Gölünün manzarası eşliğinde, Hacılar Köyünden ilerleyerek, sonrasında Yarışlı Gölünü de görerek, Türkiye'nin en derin ve berrak göllerinden biri olan Salda Gölüne varıyoruz. Uzayıp giden beyaz ve temiz kumsalı ile mavinin tüm tonlarını doğal güzelliklerini cömertçe sunması nedeniyle Salda Gölüne Türkiye'nin Maldivleri ünvanı verilmiştir. Şehir gürültüsünden uzak, sessiz ve sakin, huzur verici bu ortamın tertemiz havasını soluyarak fotoğraf molası veriyoruz.
Serbest zaman sonrası Pamukkale'ye doğru yola çıkıyoruz. Akşam yemeği ve konaklama otelimizde.

3. GÜN: PAMUKKALE-SÜTUNLU HAVUZ-APOLLON TAPINAĞI-PLUTONİUM-HİERAPOLİS ANTİK ŞEHRİ-PAMUKKALE TEKSTİL FABRİKASI-ÇERKEZKÖY
Sabah otelde alınan kahvaltı sonrasında otelimizden ayrılıyoruz. Pamukkale'yi gezmeye başlıyoruz. Dünyada benzeri sadece İtalya'da Travertino isimli kasabasında görülebilen, bembeyaz dokusuyla sizleri kendine hayran bırakacak Pamukkale'ye ulaşıyoruz. Burada yürüyüşe izin verilen terasta gezerken Denizli ovasına hakim travertenlerde çekeceğiniz fotoğraflar güzel bir gezinin anıları olacak. Sonrasında antik çağda kutsal havuz olarak bilinen ve suyunun birçok hastalığa iyi geldiği düşünülen sütunlu havuzu görüyoruz. Buradan sonra kısa bir yürüyüşle ulaşacağımız Apollon Tapınağı ve onun yanında yer alan, antik çağda Cehennemin giriş kapısı olarak bilinen Plutonium yani Cin Deliğini görerek anlatımlarımızı yapıyoruz. Daha sonrasında Anadolu'nun tiyatrolarından olan Hierapolis Tiyatrosunu ziyaret ediyoruz. Bu keyifli gezimizin ardından öğle yemeği molası veriyoruz (ekstra).
Ev tekstili denilince akla gelen Denizli tekstil ürünlerini görmek ve alışveriş yapmak için tekstil fabrikasına gidiyoruz. Serbest zamanımızın ardından Çerkezköy'e dönüşe geçiyoruz. Siz değerli misafirlerimizi aldığımız noktalarda bırakarak bir sonraki Büyük Aytaç Travel organizasyonunda görüşmek üzere vedalaşıyoruz.`,
  image: '/images/pamukkale-4-5-july.jpeg',
  slug: 'lavanta-hasadi-salda-golu-pamukkale-turu-4-5-temmuz-2026',
  duration: '2 Gün 1 Gece',
  price: 6000,
  destination: 'Isparta, Salda Gölü, Pamukkale, Kuyucak Lavanta',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.WITH_ACCOMMODATION,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-07-04'),
  endDate: new Date('2026-07-05'),
  includedServices: [
    'Turizm Paketli Travego veya Tourismo Lüks Otobüslerle Ulaşım',
    '1 Gece Otel Konaklaması',
    'Otelde Sabah Kahvaltısı',
    'Otelde Akşam Yemeği',
    'Araç İçi İkramları',
    'Program Dahilindeki Çevre Gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberlik Hizmeti',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Sorumluluk Sigortası',
    'BÜYÜK AYTAÇ TRAVEL Güvencesi',
  ],
  excludedServices: [
    'Müze Kart (müze girişleri için gereklidir)',
    'Müze ve Ören Yeri Giriş Ücretleri',
    'Cumartesi sabah kahvaltısı (ekstra)',
    'Öğle yemekleri',
    'Ekstra belirtilen tüm organizasyonlar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Çerkezköy Hareket - Isparta',
      description:
        "21:00 Çerkezköy Köşem kahveler hareket. İstanbul, Bilecik, Afyon üzerinden Isparta'ya gece yolculuğu.",
    },
    {
      day: '2. Gün',
      title: 'Lavanta - Sagalassos - Salda Gölü - Pamukkale',
      description:
        'Kuyucak lavanta köyü, halı-kilim müzesi, gül heykelleri, Sagalassos Antik Kenti, Salda Gölü. Pamukkale oteline varış, akşam yemeği ve konaklama.',
    },
    {
      day: '3. Gün',
      title: 'Pamukkale - Hierapolis - Dönüş',
      description:
        'Travertenler, sütunlu havuz, Apollon Tapınağı, Plutonium, Hierapolis tiyatrosu. Tekstil fabrikası ziyareti. Çerkezköy dönüş.',
    },
  ],
  viewCount: 0,
};

async function addPamukkaleLavantaTour() {
  try {
    console.log("MongoDB'ye bağlanılıyor...");
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    const existingTour = await Tour.findOne({ slug: pamukkaleLavantaTour.slug });

    if (existingTour) {
      console.log('⚠️ Bu tur zaten mevcut, güncelleniyor:', existingTour.name);
      Object.assign(existingTour, pamukkaleLavantaTour);
      await existingTour.save();
      console.log('✅ Tur başarıyla güncellendi');
    } else {
      const newTour = new Tour(pamukkaleLavantaTour);
      await newTour.save();
      console.log('✅ Tur başarıyla eklendi:', newTour.name);
    }

    console.log('\n📊 Tur Detayları:');
    console.log('- Tarih: 4-5 Temmuz 2026');
    console.log('- Fiyat:', pamukkaleLavantaTour.price, 'TL');
    console.log('- Konaklama: 2 Gün 1 Gece');
    console.log('- Öne çıkan: evet');
    console.log('- URL: /tours/' + pamukkaleLavantaTour.slug);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
    process.exit(0);
  }
}

addPamukkaleLavantaTour();
