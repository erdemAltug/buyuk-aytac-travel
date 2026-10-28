/**
 * Ayvalık Cunda Turu — çoklu tarih seed script
 * Kullanım: npm run add:tours -- ayvalik-cunda-tours
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

const tourDates = [
  { date: '2026-06-28', label: '28 Haziran 2026 Pazar', slugSuffix: '28-haziran-2026' },
  { date: '2026-07-11', label: '11 Temmuz 2026 Cumartesi', slugSuffix: '11-temmuz-2026' },
  { date: '2026-07-19', label: '19 Temmuz 2026 Pazar', slugSuffix: '19-temmuz-2026' },
  { date: '2026-07-25', label: '25 Temmuz 2026 Cumartesi', slugSuffix: '25-temmuz-2026' },
  { date: '2026-08-01', label: '1 Ağustos 2026 Cumartesi', slugSuffix: '1-agustos-2026' },
  { date: '2026-08-16', label: '16 Ağustos 2026 Pazar', slugSuffix: '16-agustos-2026' },
  { date: '2026-08-30', label: '30 Ağustos 2026 Pazar', slugSuffix: '30-agustos-2026' },
];

const baseTour = {
  description: `Belirlenen saat ve duraklardan siz değerli misafirlerimizi alarak Çanakkale 1915 Köprüsünü takiben araç içi ikramlar eşliğinde yolculuğumuza başlıyoruz. İlk durağımız Şeytan Sofrası olacaktır. Üzerinde Şeytan'ın ayak izi bulunduğuna inanılan, halkın madeni para atarak dilek dilediği eski bir lav birikintisidir. Demir kafes içine alınan ayak izine benzeyen şekil turistlerin özellikle uğradığı yerlerden biridir. Özel olarak işletilmektedir. (giriş ücreti alınan bölgesi bulunmaktadır) Burada vereceğimiz serbest zamanın ardından rotamızı Ayvalık bölgesinin Sanat köyü olarak bilinen Küçükköy'e çeviriyoruz. Köy eskiden bir Rum köyü olduğundan köydeki tüm evler tipik Rum mimarisi özelliklerini taşıyor. Boşnak göçlerinden dolayı da bölgenin Boşnak böreği oldukça meşhur. Dileyen misafirlerimiz burada verilecek zamanda kahvaltı edebilir. Egenin bu şirin Rum köyünü ziyaretimizden sonra Ayvalık merkeze doğru yolumuza devam ediyoruz. Tostuyla meşhur ilçemizde dileyen misafirlerimiz Tostçular çarşısında kahvaltı edebilir. Kısa Ayvalık merkez turumuzdan sonra tekne turuna katılmak isteyen misafirlerimizi sahilden teknelerine uğurluyoruz. (Ekstra - öğle yemekli)

Tekne turuna katılmayan misafirlerimizle birlikte Türkiye'nin ilk Boğaz Köprüsünden aracımız ile geçiş yaparak Cunda adasına varıyoruz. Adada dileyen misafirlerimiz yüzme molası için sahile geçebilir, dileyen misafirlerimiz de merkezde ada lezzetlerini tadıp öğle yemeklerini alabilir. Akşam üzeri tekneden gelen misafirlerimizle de buluştuktan sonra birlikte Taksiyarhis Kilisesi ve Rahmi Koç müzesini ziyaret ediyor buradaki gezimizi tamamladıktan sonra dönüş yolculuğuna geçiyoruz. Siz değerli misafirlerimiz ile bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda buluşmak üzere vedalaşıyoruz.

NOT: DİLEYEN MİSAFİRLERİMİZ (12:00-17:00) TEKNE TURUNA KATILIM SAĞLAYABİLİRLER (EKSTRA).
NOT: TEKNE TURUNA BİNİŞ AYVALIKTAN OLUP İNİŞLER CUNDA ADASINDA OLACAKTIR. TEKNE TURU EKSTRADIR. ÖĞLE YEMEĞİ: BALIK veya TAVUK ŞİNİTZEL - MAKARNA - SALATA MENÜSÜ ŞEKLİNDEDİR.
NOT: TEKNE TURUNA KATILMAYAN MİSAFİRLERİMİZ İÇİN; AYVALIK PROGRAMI SONRASI OTOBÜSÜMÜZ CUNDA ADASINA GEÇECEKTİR. BURADA YÜZME İÇİN SERBEST ZAMAN OLACAKTIR.`,
  image: '/images/Ayvalık-cunda.jpeg',
  duration: '1 Gün (Günübirlik)',
  price: 1750,
  destination: 'Ayvalık, Cunda Adası, Küçükköy, Şeytan Sofrası, Taksiyarhis Kilisesi, Rahmi Koç Müzesi',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  includedServices: [
    'Lüks araçlar ile konforlu ulaşım ve araç içi ikramlar',
    'Profesyonel kokartlı rehberlik hizmeti',
    'Programda belirtilen tüm çevre gezileri',
  ],
  excludedServices: [
    'Ekstra Belirtilen Tüm Organizasyonlar',
    'Müze ve Ören Yeri Girişleri',
    'Tüm yemek öğünleri',
    'Tur programı bölge yoğunluğuna göre değişiklik gösterebilir',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Ayvalık – Cunda Turu – Şeytan Sofrası, Küçükköy, Tekne Turu',
      description:
        "Çerkezköy'den hareket. Çanakkale 1915 Köprüsü geçişi. Şeytan Sofrası ziyareti. Küçükköy (Sanat Köy) gezisi. Ayvalık merkez turu. Tekne turu (12:00-17:00, ekstra) veya otobüsle Cunda Adası geçişi. Cunda'da yüzme molası veya öğle yemeği. Taksiyarhis Kilisesi ve Rahmi Koç Müzesi ziyareti. Dönüş.",
    },
  ],
  viewCount: 0,
};

export default tourDates.map(({ date, label, slugSuffix }) => ({
  ...baseTour,
  name: `Ayvalık Cunda Turu - ${label.replace(/ (Pazar|Cumartesi)$/, '')}`,
  slug: `ayvalik-cunda-turu-${slugSuffix}`,
  startDate: new Date(date),
  endDate: new Date(date),
}));
