/**
 * Şeb-i Arus Konya Turu — 9-11 ve 11-13 Aralık 2026
 * Kullanım: npm run add:tours -- konya-sebi-arus-tours
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

const description = `Hoşgörünün ve maneviyatın izinde...

Belirlenen duraklardan siz değerli misafirlerimizi alarak Mevlana'nın şehri Konya'ya doğru yola çıkıyoruz. Turumuz 2 gün 1 gece yarım pansiyon konaklama konseptindedir.

1. GÜN
Konya'ya varışımızın ardından Mevlana Müzesi ziyaretiyle manevi yolculuğumuza başlıyoruz. Yeşil Kubbe ve Hz. Mevlana'nın makamı rehber anlatımı eşliğinde gezilir. Ardından Selçuklu mimarisinin önemli eserlerinden İnce Minare, Alaaddin Tepesi ve Karatay Medresesi ziyaret edilir.

Öğleden sonra tarihi Sille Köyü'ne geçiyoruz. Taş evleri, dar sokakları ve Aya Elena Kilisesi ile Sille, Konya'nın en özel duraklarından biridir. Meram Bağları ve Tavus Baba Türbesi ziyaretinin ardından otelimize yerleşiyoruz. Akşam yemeği otelde (yarım pansiyon).

2. GÜN
Kahvaltı sonrası Şeb-i Arus Sema Töreni programına katılım sağlanır (program saatleri ve kontenjan organizasyona bağlıdır). Ardından Konya Tropikal Kelebek Bahçesi, Nasreddin Hoca Türbesi, Gülmece Parkı ve Japon Kyoto Parkı ziyaret edilir. Serbest zaman ve öğle yemeği (ekstra) sonrası Çerkezköy'e dönüş yolculuğuna geçiyoruz.

Siz değerli misafirlerimizi aldığımız noktalara bırakırken bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda yeniden görüşmek üzere vedalaşıyoruz.

Tur programında bölge yoğunluğu, trafik, hava koşulları ve tören saatleri sebebiyle sıralama değişikliği olabilir.`;

const baseTour = {
  description,
  image: '/images/konya-9-11-aralik.jpeg',
  duration: '2 Gün 1 Gece',
  destination: 'Konya, Mevlana Müzesi, Sille, Şeb-i Arus, Kelebek Bahçesi, Kyoto Parkı',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.WITH_ACCOMMODATION,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  includedServices: [
    'Lüks otobüs ile ulaşım',
    'Yarım pansiyon konseptinde 1 gece otel konaklaması',
    'Profesyonel kokartlı rehberlik hizmeti',
    'Programda belirtilen şehir turları ve çevre gezileri',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Öğle yemekleri',
    'Müze ve ören yeri girişleri',
    'Şeb-i Arus töreni ek ücretleri (varsa)',
    'Ekstra belirtilen tüm organizasyonlar',
    'Kişisel harcamalar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Konya – Mevlana, Selçuklu Eserleri, Sille',
      description:
        "Çerkezköy'den hareket. Mevlana Müzesi. İnce Minare, Alaaddin Tepesi, Karatay Medresesi. Sille Köyü ve Aya Elena Kilisesi. Meram Bağları, Tavus Baba Türbesi. Otele yerleşme ve akşam yemeği.",
    },
    {
      day: '2. Gün',
      title: 'Şeb-i Arus – Kelebek Bahçesi – Kyoto Parkı – Dönüş',
      description:
        'Kahvaltı. Şeb-i Arus Sema Töreni. Konya Tropikal Kelebek Bahçesi. Nasreddin Hoca Türbesi, Gülmece Parkı, Japon Kyoto Parkı. Öğle yemeği (ekstra). Çerkezköy dönüşü.',
    },
  ],
  viewCount: 0,
};

const tourDates = [
  {
    name: 'Şeb-i Arus Konya Turu - 9-11 Aralık 2026',
    slug: 'seb-i-arus-konya-turu-9-11-aralik-2026',
    price: 6000,
    startDate: new Date('2026-12-09'),
    endDate: new Date('2026-12-11'),
    label: '9-11 Aralık 2026',
  },
  {
    name: 'Şeb-i Arus Konya Turu - 11-13 Aralık 2026',
    slug: 'seb-i-arus-konya-turu-11-13-aralik-2026',
    price: 6300,
    startDate: new Date('2026-12-11'),
    endDate: new Date('2026-12-13'),
    label: '11-13 Aralık 2026',
  },
];

export default tourDates.map(({ label: _label, ...rest }) => ({ ...baseTour, ...rest }));
