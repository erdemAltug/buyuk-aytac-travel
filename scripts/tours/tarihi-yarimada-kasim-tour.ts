/**
 * Tarihi Yarımada Turu — 14 Kasım 2026 (ara tatile özel)
 * Kullanım: npm run add:tours -- tarihi-yarimada-kasim-tour
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

const tarihiYarimadaKasimTour = {
  name: 'Tarihi Yarımada Turu - 14 Kasım 2026',
  description: `Ara tatile özel: İstanbul'un kalbinde, imparatorlukların izinde bir gün!

Sabah erken saatlerde Saray, Çerkezköy ve Çorlu'daki belirlenen hareket noktalarından misafirlerimizi alarak İstanbul'a doğru yolculuğumuza başlıyoruz. Tarihi Yarımada'ya ulaşınca gezimize Osmanlı İmparatorluğu'nun yüzyıllar boyunca yönetim merkezi olan Topkapı Sarayı ile başlıyoruz. Sarayın görkemli avlularını, eşsiz koleksiyonlarını ve İstanbul Boğazı'na uzanan manzarasını rehberimizin anlatımları eşliğinde keşfediyoruz.

Ardından Bizans mimarisi ile Osmanlı tarihinin buluştuğu Ayasofya'ya geçiyor, yüzyıllara meydan okuyan mimarisini ve tarih boyunca geçirdiği dönüşümleri yakından tanıyoruz.

Sonrasında Sultanahmet Meydanı'na ulaşıyor, Roma ve Bizans dönemlerinde şehrin sosyal yaşamının merkezi olan Hipodrom Meydanı'nı geziyor ve Dikilitaş başta olmak üzere günümüze ulaşan tarihi eserleri inceliyoruz.

Gezimizin devamında İstanbul'un yer altındaki gizemli dünyasına inerek Yerebatan Sarnıcı'nı ziyaret ediyoruz. Suyun içinden yükselen sütunları, etkileyici ışıklandırması ve ünlü Medusa başlarıyla sarnıcı keşfediyoruz (giriş ücretlidir, Müzekart geçerli değildir).

Programımızın sonunda tarihe tanıklık etmiş yapıların arasından yürüyerek Eminönü Meydanı ve Mısır Çarşısı girişine ulaşıyoruz. Serbest zamanın ardından toplanma noktasında buluşarak dönüş yolculuğumuza başlıyor, bir başka BÜYÜK AYTAÇ TRAVEL organizasyonunda buluşmak üzere vedalaşıyoruz.

Tur programında bölge yoğunluğu, trafik ve hava koşulları sebebiyle sıralama değişikliği olabilir.`,
  image: '/images/tarihi-yarimada-14-kasim.jpeg',
  slug: 'tarihi-yarimada-turu-14-kasim-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1300,
  destination: 'Topkapı Sarayı, Ayasofya, Sultanahmet, Hipodrom, Yerebatan Sarnıcı, Eminönü',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-11-14'),
  endDate: new Date('2026-11-14'),
  includedServices: [
    'Lüks otobüs ile gidiş-dönüş ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde şehir turları ve çevre gezileri',
    "Turizm Bakanlığı'ndan kokartlı profesyonel rehberlik hizmeti",
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Tüm yemek öğünleri',
    'Müze ve ören yeri girişleri (Yerebatan Sarnıcı’nda Müzekart geçerli değildir)',
    'Ekstra belirtilen tüm organizasyonlar',
  ],
  program: [
    {
      day: '1. Gün (Cumartesi)',
      title: 'Topkapı Sarayı – Ayasofya – Sultanahmet – Yerebatan – Eminönü',
      description:
        'Sabah erken hareket. Topkapı Sarayı. Ayasofya. Sultanahmet Meydanı, Hipodrom ve Dikilitaş. Yerebatan Sarnıcı (giriş ücretli). Eminönü Meydanı ve Mısır Çarşısı’nda serbest zaman. Dönüş.',
    },
  ],
  viewCount: 0,
};

export default [tarihiYarimadaKasimTour];
