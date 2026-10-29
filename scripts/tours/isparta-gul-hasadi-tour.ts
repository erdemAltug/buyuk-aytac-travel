/**
 * Isparta Gül Hasadı - Salda Gölü - Pamukkale Turu Seed Script
 * Kullanım: npm run add:tours -- isparta-gul-hasadi-tour
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

const ispartaGulTour = {
  name: 'ISPARTA GÜL HASADI SALDA GÖLÜ PAMUKKALE TURU',
  description: `Tarih: 05 - 07 Haziran 2026 | Süre: 2 Gün 1 Gece | Konsept: Yarım Pansiyon Konaklama

1. GÜN
Güneykent Kasabası: Belirlenen saatlerde belirlenen noktalardan hareket ederek turumuza başlıyoruz. Yol üzerinde alacağımız ekstra kahvaltının ardından sabahın erken saatlerinde Güneykent Kasabası'na varıyoruz. Burada gül bahçelerinde gül toplayan kadınlara eşlik ederek gül hasadı deneyimini yaşıyor ve kendi güllerimizi topluyoruz.

Ardından gül yağı fabrikasına geçerek güllerin nasıl işlendiğini ve gül yağının nasıl elde edildiğini öğreniyoruz. Sonrasında Gül Evi ve Yunus Emre Evi'ni ziyaret ediyoruz. Güneykent'te verilecek serbest zamanda dileyen misafirlerimiz el emeği hediyelik eşyalar, gül yağı, gül reçeli, gül suyu, gül lokumu ve gül şurubu gibi yöresel ürünlerden satın alabilirler.

Türkiye'nin Maldivleri Salda Gölü: Gezimizin devamında Türkiye'nin en berrak ve en derin göllerinden biri olan Salda Gölü'ne gidiyoruz. Burada vereceğimiz fotoğraf molasının ardından Isparta merkeze doğru hareket ediyoruz.

Isparta: Öğle yemeğimizi almak üzere küçük bir mola veriyoruz. Yemek sonrası Mimar Sinan Camii ve Prof. Dr. Turan Yazgan Etnografya Halı ve Kilim Müzesi'ni ziyaret ederek kültürel gezimizi gerçekleştiriyoruz. İlk günkü programımızın bitişi sonrası konaklama için Denizli'ye doğru hareket ediyoruz. Akşam yemeği ve konaklama otelde.

2. GÜN
Pamukkale Travertenleri: Otelde alacağımız kahvaltının ardından bembeyaz görüntüsüyle dünyaca ünlü Pamukkale Travertenleri'nde yürüyüş yapıyor ve eşsiz manzarada fotoğraflarımızı çekiyoruz.

Hierapolis Antik Kenti: Ardından Hierapolis Antik Kenti'ni keşfetmeye başlıyoruz. Antik çağda şifalı sularıyla ünlü olan ve Kleopatra Havuzu (Antik Havuz) olarak bilinen tarihi havuzu görüyoruz. Sonrasında Apollon Tapınağı ve antik çağda yeraltı dünyasına açılan kapı olarak bilinen Plutonium (Cehennem Kapısı) hakkında rehberimizin anlatımlarını dinleyerek gezimize devam ediyoruz.

Denizli'de alışveriş molası: Pamukkale gezimizin ardından Denizli'ye geçiyoruz. Tekstil ürünleriyle ünlü olan Denizli'de vereceğimiz alışveriş molasında dileyen misafirlerimiz tekstil ürünlerinden alışveriş yapabilirler.

Keyifli geçen turumuzun ardından Tekirdağ'a dönüş yolculuğumuza başlıyor ve bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda görüşmek üzere vedalaşıyoruz.

Bölge yoğunluğuna göre tur programında sıralama değişiklik gösterebilir.`,
  image: '/images/isparta-5-7-june.jpeg',
  slug: 'isparta-gul-hasadi-salda-golu-pamukkale-turu-5-7-haziran-2026',
  duration: '2 Gün 1 Gece',
  price: 6000,
  destination: 'Isparta, Güneykent, Salda Gölü, Pamukkale, Denizli',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.WITH_ACCOMMODATION,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-06-05'),
  endDate: new Date('2026-06-07'),
  includedServices: [
    'Lüks araçlar ile konforlu ulaşım ve araç içi ikramlar',
    '1 Gece yarım pansiyon otel konaklaması',
    'Profesyonel kokartlı rehberlik hizmeti',
    'Programda belirtilen tüm çevre gezileri',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Tüm öğle yemekleri ve yemeklerde alınan tüm içecekler',
    'Müze ve ören yeri giriş ücretleri',
    'Tüm şahsi harcamalar ve ekstra organizasyonlar',
    'Yol üzeri kahvaltı (ekstra)',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Güneykent Gül Hasadı - Salda Gölü - Isparta - Denizli',
      description:
        'Gül hasadı deneyimi, gül yağı fabrikası, Gül Evi, Yunus Emre Evi. Salda Gölü fotoğraf molası. Isparta Mimar Sinan Camii ve halı-kilim müzesi. Denizli otelde akşam yemeği ve konaklama.',
    },
    {
      day: '2. Gün',
      title: 'Pamukkale - Hierapolis - Dönüş',
      description:
        'Kahvaltı, Pamukkale travertenleri, Kleopatra Havuzu, Apollon Tapınağı, Plutonium. Denizli tekstil alışveriş molası. Çerkezköy dönüş.',
    },
  ],
  viewCount: 0,
};

export default [ispartaGulTour];
