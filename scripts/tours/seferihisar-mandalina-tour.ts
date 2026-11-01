/**
 * Seferihisar Mandalina Festivali ve İzmir Turu — 28-29 Kasım 2026
 * Kullanım: npm run add:tours -- seferihisar-mandalina-tour
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

// Slug, Tour modelindeki kayıt kancası tarafından addan üretiliyor; buradaki değer onunla aynı olmalı.
// Afişte "6.000 TL yerine 5.750 TL": liste fiyatı + indirim oranı olarak tutuluyor (6000 × 0,9583 ≈ 5.750)
const LIST_PRICE = 6000;
const SALE_PRICE = 5750;

const seferihisarMandalinaTour = {
  name: 'Seferihisar Mandalina Festivali ve İzmir Turu - 28-29 Kasım 2026',
  description: `Mandalina kokuları eşliğinde Ege'de bir hafta sonu!

Alaçatı • Çeşme • Seferihisar • İzmir • Tarihi Asansör • Konak • Saat Kulesi • Eski Foça
2 gün 1 gece, İzmir merkezde yarım pansiyon konaklama.

27 KASIM CUMA | HAREKET
Akşam saatlerinde Vize, Saray, Çerkezköy, Çorlu ve Tekirdağ'daki belirlenen buluşma noktalarından misafirlerimizi alarak yolculuğumuza başlıyoruz. İhtiyaç molaları eşliğinde Ege'ye doğru gece yolculuğumuzu sürdürüyoruz.

28 KASIM CUMARTESİ | ALAÇATI – ÇEŞME – SEFERİHİSAR MANDALİNA FESTİVALİ
Yol üzerinde alacağımız kahvaltının (ekstra) ardından Alaçatı'ya ulaşıyoruz. Taş evleri, renkli kapıları ve kendine özgü sokaklarıyla Alaçatı'yı keşfediyor, serbest zamanda Ege atmosferinin tadını çıkarıyoruz. Ardından Çeşme merkezinde çarşı ve sahil çevresini geziyor, Çeşme Kalesi'ni dışarıdan görüyoruz.

Günün ikinci yarısını Seferihisar Mandalina Festivali'ne ayırıyoruz. Rehberimizin bilgilendirmesinin ardından verilen serbest zamanda mandalina ve yöresel ürün stantlarını gezebilir, üreticilerden alışveriş yapabilir, festivalin o günkü etkinliklerine katılabilirsiniz. Öğle yemeği bu serbest zaman içinde ekstradır. Belirlenen saatte İzmir merkeze hareket ediyor, otelimize yerleşiyoruz. Akşam yemeği ve konaklama İzmir merkezdeki otelimizde.

29 KASIM PAZAR | TARİHİ ASANSÖR – KONAK – SAAT KULESİ – ESKİ FOÇA
Otelde kahvaltının ardından odalarımızı boşaltarak İzmir gezimize başlıyoruz. Dario Moreno Sokağı'ndaki kısa yürüyüşün ardından Tarihi Asansör'e geçiyor, yoğunluk ve işletme koşulları elverirse üst terastan İzmir Körfezi manzarasını izliyoruz. Ardından Konak Meydanı ve Saat Kulesi çevresini geziyoruz.

Günün devamında Ege'nin keyifli sahil kasabalarından Eski Foça'yı keşfediyoruz. Limandaki tekneler, taş evler ve denize açılan sokaklar eşliğinde yürüyüşün ardından öğle yemeği, alışveriş ve dinlenme için serbest zaman veriyoruz (öğle yemeği ve kişisel harcamalar ekstradır). Belirlenen saatte dönüş yolculuğumuza başlıyor, misafirlerimizi aldığımız noktalara bırakarak bir sonraki BÜYÜK AYTAÇ TRAVEL gezisinde buluşmak üzere vedalaşıyoruz.`,
  image: 'https://pub-dc66847235b3473b9931fb4d978b5bfe.r2.dev/tours/seferihisar-mandalina-28-29-kasim.jpeg',
  slug: 'seferihisar-mandalina-festivali-ve-izmir-turu-28-29-kasim-2026',
  duration: '2 Gün 1 Gece',
  price: LIST_PRICE,
  discountRate: Number((((LIST_PRICE - SALE_PRICE) / LIST_PRICE) * 100).toFixed(2)),
  destination: 'Seferihisar Mandalina Festivali, Alaçatı, Çeşme, İzmir, Konak, Saat Kulesi, Eski Foça',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.WITH_ACCOMMODATION,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-11-28'),
  endDate: new Date('2026-11-29'),
  includedServices: [
    'Tur aracıyla gidiş-dönüş ulaşım ve program kapsamındaki transferler',
    'İzmir merkezdeki otelde 1 gece konaklama',
    'Yarım pansiyon: otelde 1 akşam yemeği ve 1 sabah kahvaltısı',
    'Programda belirtilen çevre gezileri',
    'Rehberlik hizmeti',
  ],
  excludedServices: [
    'İlk gün yol üzerinde alınacak sabah kahvaltısı',
    'Öğle yemekleri ve dönüş yolunda alınacak akşam yemeği',
    'Yemeklerde alınacak içecekler ve otel konsepti dışındaki tüketimler',
    'Varsa müze, ören yeri ve ücretli ziyaret noktalarının giriş ücretleri',
    'Festival alanındaki alışverişler ve ücretli etkinlikler',
    'Otelde minibar, oda servisi ve diğer kişisel harcamalar',
    'Program dışında talep edilecek ekstra hizmetler',
  ],
  program: [
    {
      day: '27 Kasım Cuma',
      title: 'Hareket',
      description: 'Akşam saatlerinde Vize, Saray, Çerkezköy, Çorlu ve Tekirdağ’dan hareket. Gece yolculuğu.',
    },
    {
      day: '28 Kasım Cumartesi',
      title: 'Alaçatı – Çeşme – Seferihisar Mandalina Festivali',
      description:
        'Yol üzerinde kahvaltı (ekstra). Alaçatı sokakları ve serbest zaman. Çeşme çarşı, sahil ve Çeşme Kalesi (dışarıdan). Seferihisar Mandalina Festivali’nde serbest zaman. İzmir merkezdeki otelde akşam yemeği ve konaklama.',
    },
    {
      day: '29 Kasım Pazar',
      title: 'Tarihi Asansör – Konak – Saat Kulesi – Eski Foça',
      description:
        'Otelde kahvaltı. Dario Moreno Sokağı ve Tarihi Asansör. Konak Meydanı ve Saat Kulesi. Eski Foça’da yürüyüş, öğle yemeği (ekstra) ve serbest zaman. Dönüş.',
    },
  ],
  viewCount: 0,
};

export default [seferihisarMandalinaTour];
