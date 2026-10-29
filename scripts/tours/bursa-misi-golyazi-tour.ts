/**
 * Bursa - Misi Köyü - Gölyazı - Mudanya Turu Seed Script
 * Kullanım: npm run add:tours -- bursa-misi-golyazi-tour
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

const bursaTour = {
  name: 'BURSA- MİSİ KÖYÜ - GÖLYAZI - MUDANYA TURU',
  description: `Siz değerli misafirlerimizi firmamızın belirlediği noktalardan alarak yola çıkıyoruz. Uludağ eteklerindeki Cumalıkızık Köyüne varıyoruz. Sabah burada alacağımız kahvaltı sonrası rehberimiz eşliğinde Cumalıkızık Köyünü dolaşıyoruz. Serbest zamanımızın ardından Misi köyüne geçiyoruz. Burada köy etrafını gezip keyif kahvelerimizi yudumladıktan sonra Ulubat gölü kenarına kurulmuş bir balıkçı köyü olan Gölyazı'ya hareket ediyoruz, keyifli bir yürüyüşle köy meydanına geçiyoruz. Köy meydanında yer alan Ağlayan Çınarı görüp rehberimizden hikâyesini dinledikten sonra köprü üzerinden yarımadaya geçiyoruz.

Ardından dileyen misafirlerimiz ile Gölyazı Tekne Turu (ekstra) yapıyoruz.

Gölyazı'da doğa ile iç içe Arnavut kaldırımlı dar sokaklarda rehberimiz eşliğinde dolaştıktan sonra serbest zaman veriyor ve ardından belirtilen saatte toplanarak Türk Yunan Savaşı'nın son bulduğu Mudanya Anlaşması ile adı özdeşleşen Mudanya'ya geliyor ve Mudanya Mütareke Evini geziyoruz.

Yolculuğumuzun ardından siz değerli misafirlerimizi aldığımız noktalara bırakarak, bir sonraki Büyük Aytaç Travel organizasyonunda yeniden görüşmek dileğiyle vedalaşıyoruz.

Programa Cumalıkızık'ta kahvaltı dahildir.

Bölge yoğunluğuna göre programda sıralama değişikliği yapılabilir.`,
  image: '/images/bursa-13-june.jpeg',
  slug: 'bursa-misi-koyu-golyazi-mudanya-turu-13-haziran-2026',
  duration: '1 Gün (Günübirlik)',
  price: 200,
  destination: 'Bursa, Cumalıkızık, Gölyazı, Mudanya, Misi Köyü',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-06-13'),
  endDate: new Date('2026-06-13'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde Şehir Turları ve Çevre Gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberler',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
    'Cumalıkızık’ta kahvaltı',
  ],
  excludedServices: [
    'Tüm müze ve ören yerlerine girişler',
    'Tüm kişisel harcamalar',
    'Kahvaltı harici yemek öğünleri',
    'Gölyazı’da tekne turu (ekstra)',
    'Ekstra belirtilen tüm organizasyonlar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Bursa - Cumalıkızık - Misi - Gölyazı - Mudanya',
      description:
        'Çerkezköy hareket. Cumalıkızık kahvaltı ve köy gezisi. Misi Köyü. Gölyazı, Ağlayan Çınar, tekne turu (ekstra). Mudanya Mütareke Evi. Dönüş.',
    },
  ],
  viewCount: 0,
};

export default [bursaTour];
