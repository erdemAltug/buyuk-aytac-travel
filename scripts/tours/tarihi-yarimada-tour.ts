/**
 * Tarihi Yarımada Turu — 30 Ağustos 2026 Seed Script
 * Kullanım: npm run add:tours -- tarihi-yarimada-tour
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

const tarihiYarimadaTour = {
  name: 'Tarihi Yarımada Turu - 30 Ağustos 2026',
  description: `Tarihin izinde, İstanbul'un kalbinde tarih, kültür ve eşsiz bir yolculuk!

Belirlenen duraklardan siz değerli misafirlerimizi alarak Sultanahmet bölgesine, Tarihi Yarımada'ya doğru yola çıkıyoruz. Turumuz uzman rehber eşliğinde gerçekleşir; tarihi yapıların hikâyelerini dinlerken bol fotoğraf molası veririz.

Gezimize Sultanahmet Camii (Mavi Cami) dış cephe ve avlu ziyaretiyle başlıyoruz. Ardından Hipodrom Meydanı'nda Theodosius Dikilitaşı ve çevresindeki tarihi anıtları görüyoruz. Ayasofya-i Kebir Camii'ni dışarıdan ziyaret ederek İstanbul'un simge yapısını yakından tanıyoruz.

Yerebatan Sarnıcı isteğe bağlı ziyaret edilir; giriş ücreti ekstradır. Turumuzun son durağında Gülhane Parkı'nda yeşil ve huzurlu bir serbest zaman veriyoruz. Park içinde yürüyüş, çay-kahve molası ve fotoğraf çekimi sonrası belirlenen saatte toplanarak Çerkezköy'e dönüş yolculuğuna geçiyoruz.

Siz değerli misafirlerimizi aldığımız noktalara bırakırken bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda yeniden görüşmek üzere vedalaşıyoruz.

Tur programında bölge yoğunluğu, trafik ve hava koşulları sebebiyle sıralama değişikliği olabilir.`,
  image: '/images/yarımada-30-agustos.jpeg',
  slug: 'tarihi-yarimada-turu-30-agustos-2026',
  duration: '1 Gün (Günübirlik)',
  price: 1250,
  destination: 'Sultanahmet, Ayasofya, Hipodrom, Yerebatan Sarnıcı, Gülhane Parkı',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-08-30'),
  endDate: new Date('2026-08-30'),
  includedServices: [
    'Belirlenen duraklardan konforlu ulaşım',
    'Uzman rehber eşliğinde gezi',
    'Tarihi noktalarda fotoğraf molaları',
    'Gülhane Parkı serbest zaman',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Yerebatan Sarnıcı giriş ücreti',
    'Müze ve ören yeri girişleri',
    'Tüm yemek öğünleri',
    'Kişisel harcamalar',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Tarihi Yarımada – Sultanahmet, Ayasofya, Gülhane',
      description:
        "Çerkezköy'den hareket. Sultanahmet Camii. Hipodrom Meydanı ve Theodosius Dikilitaşı. Ayasofya-i Kebir Camii. Yerebatan Sarnıcı (giriş ücretli, ekstra). Gülhane Parkı serbest zaman. Dönüş.",
    },
  ],
  viewCount: 0,
};

export default [tarihiYarimadaTour];
