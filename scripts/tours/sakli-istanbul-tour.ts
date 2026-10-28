/**
 * Saklı İstanbul Turu Seed Script
 * Kullanım: npm run add:tours -- sakli-istanbul-tour
 */

import { TourType, AccommodationType } from '../../src/models/Tour';

const sakliIstanbulTour = {
  name: 'SAKLI İSTANBUL TURU',
  description: `Sabah 07:00'de Çerkezköy'den hareketle programımıza başlıyoruz.

Şehrin Gürültüsünden Uzak, Huzurun Adresi

İstanbul'un gizli köşelerini keşfetmeye hazır mısınız?
Sarıyer'in saklı güzellikleri, tarih ve doğa ile dolu bir gün sizleri bekliyor!

Turun Öne Çıkan Durakları:

• Sarıyer Börekçisi ile güne enerjik bir başlangıç
• Kuş Gözlem Kulesi'nde panoramik fotoğraf molası
• Garipçe Köyü ve tarihi Garipçe Kalesi
• Rumeli Feneri Köyü'nde Karadeniz'in eşsiz manzarası
• Bentler Tabiat Parkı ve doğa yürüyüşü
• Eğri Kemeri panoramik fotoğraf noktası

Doğa ile iç içe, tarih ve fotoğraf dolu bir gün.

Araç içi ikramlar ve rehberlik hizmeti ile Büyük Aytaç Travel ayrıcalığıyla konforlu bir tur deneyimi sizleri bekliyor.
Çerkezköy'e varış saatimiz ortalama 21:00.`,
  image: '/images/istanbul-14-june.jpeg',
  slug: 'sakli-istanbul-turu',
  duration: '1 Gün (Günübirlik)',
  price: 1250,
  destination: 'Sarıyer, Rumeli Feneri, Garipçe, Bentler Tabiat Parkı',
  departureCity: 'Çerkezköy',
  tourType: TourType.DOMESTIC,
  accommodationType: AccommodationType.DAILY,
  isActive: true,
  isFeatured: true,
  isLastMinute: false,
  startDate: new Date('2026-06-14'),
  endDate: new Date('2026-06-14'),
  includedServices: [
    '46 veya 50 Kişilik Lüks Mercedes Travego veya Tourismo 2+2 Otobüslerle Ulaşım',
    'Araç içi ikramlar',
    'Program dahilinde Şehir Turları ve Çevre Gezileri',
    'Turizm Bakanlığı’ndan Kokartlı Profesyonel Rehberler',
    '1618 Nolu Turizm Kanununa Göre Zorunlu Seyahat Sigortası',
  ],
  excludedServices: [
    'Ekstra Belirtilen Tüm Organizasyonlar',
    'Müze ve Ören Yeri Girişleri',
    'Tüm yemek öğünleri',
  ],
  program: [
    {
      day: '1. Gün',
      title: 'Saklı İstanbul Turu – Sarıyer, Rumeli Feneri, Garipçe',
      description:
        "07:00 Çerkezköy'den hareket. Sarıyer Börekçisi. Kuş Gözlem Kulesi. Garipçe Köyü ve Garipçe Kalesi. Rumeli Feneri Köyü. Bentler Tabiat Parkı doğa yürüyüşü. Eğri Kemeri fotoğraf molası. Ortalama 21:00 Çerkezköy varış.",
    },
  ],
  viewCount: 0,
};

export default [sakliIstanbulTour];
