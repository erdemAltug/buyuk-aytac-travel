/**
 * Kapadokya Turu — 14-15 Kasım 2026
 * Kullanım: npm run add:tours -- kapadokya-kasim-tour
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

const kapadokyaKasimTour = {
  name: 'Kapadokya Turu - 14-15 Kasım 2026',
  description: `Tarihin, doğanın ve masalların buluştuğu yer: Kapadokya!

Siz değerli misafirlerimizi firmamızın belirlediği noktalardan cuma akşamı alarak gece yolculuğuyla Kapadokya'ya doğru yola çıkıyoruz. Turumuz 1 akşam yemeği ve 1 sabah kahvaltısı dahil, 2 gün 1 gece konaklamalıdır.

CUMARTESİ
Sabah erken saatlerde alacağımız kahvaltının (ekstra) ardından Kapadokya'nın mistik atmosferine adım atmak üzere Göreme Açık Hava Müzesi'ne gidiyoruz. Binlerce yıllık tarihi ve benzersiz kaya kiliselerini keşfediyoruz. Daha sonra eskiden "Rahipler Vadisi", bugün ise Paşabağları olarak adlandırılan, kendine özgü peribacalarıyla kaplı bölgeyi geziyoruz.

Avanos'ta çömlek atölyelerinde ustaların elinden çıkan geleneksel çömlekleri inceliyor, Kızılırmak üzerindeki Sallanan Köprü'yü ziyaret ediyor ve nehir kenarında çay-kahve molası veriyoruz. Ardından bölgenin eşsiz Onyx taşlarını inceleyip alışveriş yapma fırsatı bulacağımız Onyx atölyesine geçiyoruz.

Büyüleyici kaya oluşumlarının yer aldığı Hayal Vadisi'nde keyifli bir yürüyüş yapıyoruz. Ürgüp'e doğru yol alırken bölgenin sembolü Üç Güzeller'i panoramik olarak görüyor, ünlü şarap mahzenlerini ziyaret ederek Kapadokya'ya özgü üzümlerden yapılan şaraplar hakkında bilgi alıyoruz (programın tamamlanamaması durumunda şarap mahzeni pazar günü ziyaret edilebilir). Gün sonunda akşam yemeği ve konaklama için otelimize geçiyoruz. Dileyen misafirlerimiz ekstra olarak düzenlenecek Türk Gecesi'ne katılabilir.

PAZAR
Balonların kalkış durumuna göre bölgeden aldığımız haber doğrultusunda, balon seyri için sabahın ilk ışıklarıyla seyir tepesine gidiyoruz. Balonların kalkışını izledikten sonra otelimize dönüyor, kahvaltı sonrası Güvercinlik Vadisi'nde fotoğraf molası veriyoruz.

Uçhisar Kalesi manzarası ve eski Kapadokya evleri eşliğinde kahve molası veriyor, ardından bölgenin ünlü kabak çekirdeklerini ve yöresel ürünlerini tatmak için alışverişe geçiyoruz. Uçhisar'daki eski yerleşim alanının ardından Derinkuyu Yeraltı Şehri'nin gizemli koridorlarında zaman yolculuğu yapıyor, son olarak Ihlara Vadisi'nin etkileyici manzarasını görüyoruz. Dönüş yolunda yemek molası (ekstra) ardından yolumuza devam ediyor, bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda görüşmek dileğiyle vedalaşıyoruz.

Ören yerleri girişi için Müzekart gerekmektedir. Play Store veya App Store üzerinden Müzekart uygulamasını indirerek satın alım yapabilir, girişlerde kullanabilirsiniz.

Tur programında bölge yoğunluğu, trafik ve hava koşulları sebebiyle sıralama değişikliği olabilir.`,
  image: '/images/kapadokya-14-15-kasim.jpeg',
  slug: 'kapadokya-turu-14-15-kasim-2026',
  duration: '2 Gün 1 Gece',
  price: 6000,
  destination: 'Kapadokya, Göreme, Paşabağları, Avanos, Ürgüp, Uçhisar, Derinkuyu, Ihlara Vadisi',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.WITH_ACCOMMODATION,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-11-14'),
  endDate: new Date('2026-11-15'),
  includedServices: [
    '46 veya 50 kişilik lüks Mercedes Travego veya Tourismo 2+2 otobüslerle ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde şehir turları ve çevre gezileri',
    "Turizm Bakanlığı'ndan kokartlı profesyonel rehberler",
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
    'Cumartesi akşam yemeği ve pazar sabah kahvaltısı dahil 1 gece otel konaklaması',
  ],
  excludedServices: [
    'Cumartesi sabah kahvaltısı',
    'Öğle yemekleri ve pazar akşam yemeği',
    'Balon turu ve Türk Gecesi dahil ekstra belirtilen tüm organizasyonlar',
    'Müze ve ören yeri girişleri (Müzekart gereklidir)',
  ],
  program: [
    {
      day: 'Cuma Akşamı',
      title: 'Hareket',
      description: 'Belirlenen noktalardan hareket ve gece yolculuğu ile Kapadokya’ya varış.',
    },
    {
      day: '1. Gün (Cumartesi)',
      title: 'Göreme – Paşabağları – Avanos – Hayal Vadisi – Ürgüp',
      description:
        'Kahvaltı (ekstra). Göreme Açık Hava Müzesi. Paşabağları peribacaları. Avanos çömlek atölyeleri ve Sallanan Köprü, nehir kenarında çay-kahve molası. Onyx atölyesi. Hayal Vadisi yürüyüşü. Üç Güzeller panoramik. Şarap mahzeni. Otelde akşam yemeği ve konaklama. İsteğe bağlı Türk Gecesi (ekstra).',
    },
    {
      day: '2. Gün (Pazar)',
      title: 'Balon Seyri – Uçhisar – Derinkuyu – Ihlara – Dönüş',
      description:
        'Gün doğumunda seyir tepesinden balon seyri. Otelde kahvaltı. Güvercinlik Vadisi. Uçhisar Kalesi manzarasında kahve molası. Yöresel ürün alışverişi. Derinkuyu Yeraltı Şehri. Ihlara Vadisi. Dönüş yolunda yemek molası (ekstra).',
    },
  ],
  viewCount: 0,
};

export default [kapadokyaKasimTour];
