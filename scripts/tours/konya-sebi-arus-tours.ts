/**
 * Şeb-i Arus Konya Turu — 9-11 ve 11-13 Aralık 2026
 * Kullanım: npm run add:tours -- konya-sebi-arus-tours
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

const description = `Hoşgörünün ve maneviyatın izinde...

Mevlana'nın şehri Konya'da Şeb-i Arus törenlerine tanıklık ediyoruz. Turumuz 2 gün 1 gece, yarım pansiyon konaklama konseptindedir.

1. GÜN AKŞAMI | HAREKET
Siz değerli yolcularımızı belirlenen noktalardan alarak araç içi ikramlar eşliğinde Konya'ya doğru yola çıkıyoruz.

2. GÜN | SİLLE – MEVLANA MÜZESİ – SELÇUKLU ESERLERİ – MERAM – ŞEB-İ ARUS TÖRENİ
Turumuza kahvaltıyla başlıyoruz (ekstra). Ardından Konya'nın eski bir Rum köyü olan Sille'ye gidiyoruz. Kayalara oyulmuş evler ve kiliseler, kaya mezarları, Hacı Ağa Hamamı ve Müzesi, Osmanlı köprüleri, 1500 yıllık Aya Elena Kilisesi ve İnce Minare göreceğimiz eserler arasında.

Sonrasında "Gel, gel, ne olursan ol, gel" sözüyle tanınan Hz. Mevlana Müzesi'ne dervişan kapısından giriyoruz. Hürrem Paşa Türbesi, Hâmûşân kapısı, avludaki türbeler, semahane, mescit ve Mevlana ile aile fertlerinin kabirlerinin bulunduğu ana binayı geziyor, Sultan Selim Camii'ni panoramik olarak görüyoruz. Müzenin hemen karşısındaki Üçler Türbesi ve Şehitler Abidesi'ni ziyaret ediyoruz.

Konya'nın yöresel lezzetleri için öğle yemeği molası veriyoruz (ekstra). Yemek sonrasında Şems-i Tebrizi Türbesi, Alaaddin Keykubat Camii ve Tepesi ile Karatay Medresesi'ni geziyoruz. Meram Bağları'nda tarihi Meram Köprüsü yanındaki çay bahçelerinde çay molası veriyor, Tavus Baba Türbesi'ni ziyaret ediyoruz.

Akşam yemeği ve dinlenmek için otelimize geçiyoruz. Otelde aldığımız akşam yemeğinin ardından Şeb-i Arus törenlerini izlemek için Konya Kültür Merkezi'ne hareket ediyor, sema gösterilerinin ardından otelimize dönüyoruz. Şeb-i Arus tören biletleri fiyata dahil değildir.

3. GÜN | KELEBEKLER VADİSİ – JAPON KYOTO PARKI – AKŞEHİR – NASREDDİN HOCA – DÖNÜŞ
Otelde kahvaltının ardından Avrupa'nın en büyük tropikal kelebek bahçesi olan Kelebekler Vadisi'ne gidiyoruz; 15'ten fazla tür ve 1000'in üzerinde kelebek için tasarlanmış bahçeyi geziyoruz. Ardından Konya ile Kyoto'nun kardeş şehir olmasının anısına kurulan Japon Kyoto Parkı'nı ziyaret ediyoruz.

Öğle yemeği molasının (ekstra) ardından Akşehir'de mizahın efsanevi ismi Nasreddin Hoca'nın türbesini ziyaret ediyor, Gülmece Parkı'nı gezdikten sonra dönüşe geçiyoruz. Siz değerli misafirlerimizi aldığımız noktalara bırakarak bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda görüşmek üzere vedalaşıyoruz.

Bölge yoğunluğu sebebiyle programda gezilecek noktaların sıralamasında değişiklik yapılabilir.`;

const baseTour = {
  description,
  duration: '2 Gün 1 Gece',
  destination: 'Konya, Mevlana Müzesi, Sille, Şeb-i Arus, Meram, Kelebekler Vadisi, Kyoto Parkı, Akşehir',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.WITH_ACCOMMODATION,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  includedServices: [
    '46 veya 50 kişilik lüks Mercedes Travego veya Tourismo 2+2 otobüslerle ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde şehir turları ve çevre gezileri',
    "Turizm Bakanlığı'ndan kokartlı profesyonel rehberler",
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
    '3 veya 4 yıldızlı otelde akşam yemeği ve sabah kahvaltısı dahil 1 gece konaklama',
  ],
  excludedServices: [
    'İlk sabah kahvaltısı',
    'Öğle yemekleri ve dönüş günü akşam yemeği',
    'Şeb-i Arus tören biletleri',
    'Müze ve ören yeri girişleri',
    'Ekstra belirtilen tüm organizasyonlar',
  ],
  program: [
    {
      day: '1. Gün Akşamı',
      title: 'Hareket',
      description: 'Belirlenen noktalardan hareket, araç içi ikramlar eşliğinde Konya’ya yolculuk.',
    },
    {
      day: '2. Gün',
      title: 'Sille – Mevlana Müzesi – Selçuklu Eserleri – Meram – Şeb-i Arus Töreni',
      description:
        'Kahvaltı (ekstra). Sille Köyü, Hacı Ağa Hamamı ve Müzesi, Aya Elena Kilisesi, İnce Minare. Mevlana Müzesi, Sultan Selim Camii (panoramik), Üçler Türbesi ve Şehitler Abidesi. Öğle yemeği (ekstra). Şems-i Tebrizi Türbesi, Alaaddin Camii ve Tepesi, Karatay Medresesi. Meram Bağları ve Köprüsü, Tavus Baba Türbesi. Otelde akşam yemeği. Konya Kültür Merkezi’nde Şeb-i Arus töreni (bilet ekstra).',
    },
    {
      day: '3. Gün',
      title: 'Kelebekler Vadisi – Kyoto Parkı – Akşehir – Dönüş',
      description:
        'Otelde kahvaltı. Konya Tropikal Kelebekler Vadisi. Japon Kyoto Parkı. Öğle yemeği (ekstra). Akşehir’de Nasreddin Hoca Türbesi ve Gülmece Parkı. Dönüş.',
    },
  ],
  viewCount: 0,
};

const tourDates = [
  {
    name: 'Şeb-i Arus Konya Turu - 9-11 Aralık 2026',
    slug: 'seb-i-arus-konya-turu-9-11-aralik-2026',
    price: 6000,
    image: 'https://pub-dc66847235b3473b9931fb4d978b5bfe.r2.dev/tours/konya-9-11-aralik-2026.jpeg',
    startDate: new Date('2026-12-09'),
    endDate: new Date('2026-12-11'),
    label: '9-11 Aralık 2026',
  },
  {
    name: 'Şeb-i Arus Konya Turu - 11-13 Aralık 2026',
    slug: 'seb-i-arus-konya-turu-11-13-aralik-2026',
    price: 6300,
    image: 'https://pub-dc66847235b3473b9931fb4d978b5bfe.r2.dev/tours/konya-11-13-aralik-2026.jpeg',
    startDate: new Date('2026-12-11'),
    endDate: new Date('2026-12-13'),
    label: '11-13 Aralık 2026',
  },
];

export default tourDates.map(({ label: _label, ...rest }) => ({ ...baseTour, ...rest }));
