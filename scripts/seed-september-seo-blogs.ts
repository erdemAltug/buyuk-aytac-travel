/**
 * Eylül–Sonbahar 2026 SEO blog yazıları (10 yazı) — upsert by slug
 * Kullanım: npx tsx scripts/seed-september-seo-blogs.ts
 * npm run seed:blogs:september
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Blog from '../src/models/Blog';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI bulunamadı (.env.local)');
  process.exit(1);
}

const septemberBlogs = [
  {
    title: 'Eylül 2026 Çerkezköy Tur Takvimi | Bozcaada, Kaz Dağları, Kapadokya',
    slug: 'eylul-2026-cerkezkoy-tur-takvimi',
    summary:
      'Eylül 2026 Çerkezköy tur tarihleri: Kaz Dağları, Bozcaada, Fener-Balat, Kapadokya konaklamalı. Güncel fiyatlar ve rezervasyon.',
    focusKeyword: 'eylül 2026 çerkezköy turları',
    metaDescription:
      'Eylül 2026 Çerkezköyden kalkan turlar. Kaz Dağları 6 Eyl, Bozcaada 12 Eyl, Fener-Balat 13 Eyl, Kapadokya 26-27 Eyl.',
    keywords: [
      'eylül 2026 turlar',
      'çerkezköy eylül turları',
      'sonbahar turları 2026',
      'kapadokya eylül',
      'bozcaada eylül',
    ],
    image: '/images/bozcada-26.07.jpeg',
    featuredPost: true,
    readingTime: 11,
    content: `
<h2>Eylül 2026: Yazdan Sonbahara Geçiş Turları</h2>
<p><strong>Eylül 2026 Çerkezköy turları</strong>, deniz sezonunun sonu ile kültür ve doğa rotalarının en keyifli dönemini bir araya getirir. Çerkezköy, Çorlu ve Tekirdağ kalkışlı tüm programlarımız <a href="/cerkezkoy-tur">TÜRSAB belgeli</a> Büyük Aytaç Travel güvencesindedir.</p>

<h3>Eylül 2026 Günübirlik Tur Takvimi</h3>
<ul>
  <li><strong>6 Eylül Pazar:</strong> <a href="/tours/canakkale-kaz-daglari-turu-6-eylul-2026">Çanakkale Kaz Dağları Turu</a> — 1.750 TL</li>
  <li><strong>12 Eylül Cumartesi:</strong> <a href="/tours/bozcaada-turu-12-eylul-2026">Bozcaada Turu</a> — 1.750 TL</li>
  <li><strong>13 Eylül Pazar:</strong> <a href="/tours/fener-balat-turu-13-eylul-2026">Fener – Balat Turu</a> — 1.250 TL</li>
</ul>

<h3>Eylül Konaklamalı Vurgu: Kapadokya</h3>
<p><a href="/tours/kapadokya-turu-26-27-eylul-2026"><strong>Kapadokya Turu 26–27 Eylül 2026</strong></a> (2 gün 1 gece, 5.900 TL) sonbaharın en popüler konaklamalı programıdır. Balon sezonu ve serin hava için ideal tarihtir. Detaylı rota için <a href="/kapadokya-turu">Kapadokya turları sayfamıza</a> bakın.</p>

<h3>Neden Eylül?</h3>
<p>Eylül’de Ege’de deniz hâlâ yüzülebilir sıcaklıktadır; İstanbul kültür turları ise yaz kalabalığından daha sakindir. Hafta sonu kaçamakları için <a href="/cerkezkoy-gunubirlik-turlar">günübirlik tur listemizi</a> inceleyebilirsiniz.</p>

<h3>Rezervasyon</h3>
<p>Kontenjanlar sınırlıdır. Erken kayıt için <a href="/contact">iletişim formumuzu</a> doldurun veya WhatsApp / ofis hattımızdan yazın: 0530 060 95 59 · 0539 345 95 59.</p>
<p><a href="/blog/agustos-2026-cerkezkoy-tur-takvimi">Ağustos takvimi</a> · <a href="/annual-program">2026 yıllık program</a> · <a href="/tour-calendar">Tur takvimi</a></p>
`,
  },
  {
    title: 'İznik Kültür Turu Rehberi 2026 | Çini, Ayasofya, Göl Manzarası',
    slug: 'iznik-kultur-turu-rehberi-2026-cerkezkoy',
    summary:
      'Çerkezköyden İznik kültür turu 29 Ağustos 2026. Arkeoloji Müzesi, Yeşil Cami, Ayasofya, Roma Tiyatrosu, İznik Gölü. 1.600 TL günübirlik.',
    focusKeyword: 'iznik turu çerkezköy',
    metaDescription:
      'İznik turu 2026 Çerkezköy çıkışlı. Çini, Ayasofya Camii, İznik Gölü. 29 Ağustos, 1.600 TL günübirlik kültür turu.',
    keywords: [
      'iznik turu',
      'iznik turu 2026',
      'çerkezköy iznik',
      'iznik kültür turu',
      'iznik gölü turu',
    ],
    image: '/images/hero-banner.jpg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>Çerkezköyden İznik: Tarihin ve Gölün Buluşması</h2>
<p><a href="/tours/iznik-kultur-turu-29-agustos-2026"><strong>İznik Kültür Turu</strong></a> (29 Ağustos 2026, 1.600 TL) Bursa’nın kuzeyindeki bu antik kenti tek günde gezmek isteyenler için hazırlanmıştır. Kalkış noktası Çerkezköy’dür; Çorlu ve Tekirdağ’dan da katılım mümkündür.</p>

<h3>Gezilecek Noktalar</h3>
<ul>
  <li><strong>İznik Arkeoloji Müzesi</strong> — bölge tarihi ve eserler</li>
  <li><strong>Yeşil Cami</strong> — erken Osmanlı mimarisi</li>
  <li><strong>Ayasofya Camii</strong> — İznik’in simge yapılarından</li>
  <li><strong>Roma Tiyatrosu</strong> ve sur kalıntıları</li>
  <li><strong>Su Altı Bazilikası</strong> bilgilendirme / göl kenarı</li>
  <li><strong>İznik Gölü</strong> manzara molası</li>
</ul>

<h3>Kimler İçin Uygun?</h3>
<p>Kültür ve tarih meraklıları, aileler ve ilk kez İznik’e gidecekler için idealdir. Yoğun yürüyüş gerektiren bir dağ turu değildir; şehir içi ve göl çevresi ağırlıklıdır.</p>

<h3>Fiyat ve Dahil Olanlar</h3>
<p>1.600 TL kişi başı. Ulaşım, rehberlik ve araç içi ikramlar dahildir. Müze giriş ücretleri ve öğle yemeği programa göre değişebilir; güncel bilgi için ofisimizle iletişime geçin.</p>

<p><a href="/tours/iznik-kultur-turu-29-agustos-2026">Tur detayı ve rezervasyon →</a> · <a href="/blog/eylul-2026-cerkezkoy-tur-takvimi">Eylül takvimi</a> · <a href="/cerkezkoy-gunubirlik-turlar">Diğer günübirlikler</a></p>
`,
  },
  {
    title: 'Fener Balat Turu Rehberi 2026 | Haliç, Renkli Evler, Patrikhane',
    slug: 'fener-balat-turu-rehberi-2026-cerkezkoy',
    summary:
      'Çerkezköyden Fener-Balat turu 13 Eylül 2026. Haliç, Fener Rum Patrikhanesi, Demir Kilise, Fener Rum Lisesi. 1.250 TL günübirlik.',
    focusKeyword: 'fener balat turu çerkezköy',
    metaDescription:
      'Fener Balat turu 2026 Çerkezköy çıkışlı. Haliç, Patrikhane, renkli sokaklar. 13 Eylül Pazar, 1.250 TL.',
    keywords: [
      'fener balat turu',
      'balat turu',
      'çerkezköy istanbul turu',
      'haliç turu',
      'fener rum patrikhanesi',
    ],
    image: '/images/fener-balat-13-eylul.jpeg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>İstanbul’un En Karakterli Mahalleleri: Fener ve Balat</h2>
<p><a href="/tours/fener-balat-turu-13-eylul-2026"><strong>Fener – Balat Turu</strong></a> 13 Eylül 2026 Pazar günü, Çerkezköy çıkışlı günübirlik program olarak düzenlenir. Fiyat 1.250 TL’dir — İstanbul kültür turlarımız içinde en erişilebilir seçeneklerden biridir.</p>

<h3>Programda Neler Var?</h3>
<ul>
  <li>Fener ve Balat sokakları, renkli evler</li>
  <li>Haliç manzarası</li>
  <li>Fener Rum Patrikhanesi dış gezisi</li>
  <li>Demir Kilise (St. Stephen)</li>
  <li>Fener Rum Lisesi (kırmızı okul) fotoğraf molası</li>
</ul>

<h3>Ne Giyilir, Ne Beklenmeli?</h3>
<p>Dar sokaklar ve yokuşlar nedeniyle rahat ayakkabı önerilir. Fotoğraf için sabah–öğle ışığı idealdir. Öğle yemeği için mahalle kafeleri serbest zamanla birleştirilebilir.</p>

<h3>Benzer İstanbul Rotaları</h3>
<p>Tarihi Yarımada’yı tercih ediyorsanız <a href="/tours/tarihi-yarimada-turu-30-agustos-2026">Tarihi Yarımada Turu</a> ve <a href="/blog/tarihi-yarimada-turu-rehberi-2026-cerkezkoy">rehber yazımızı</a> inceleyin. Tüm İstanbul çıkışlı günübirlikler için <a href="/blog/istanbul-gunubirlik-turlari-cerkezkoy-2026">İstanbul turları rehberine</a> bakın.</p>

<p><a href="/tours/fener-balat-turu-13-eylul-2026">Rezervasyon →</a> · <a href="/contact">Ofis iletişimi</a></p>
`,
  },
  {
    title: 'Ormanya Maşukiye Turu 2026 | Sapanca, Max Fun, Doğa',
    slug: 'ormanya-masukiye-turu-rehberi-2026',
    summary:
      'Çerkezköyden Ormanya Maşukiye turu 23 Ağustos 2026. Ormanya Tabiat Parkı, Max Fun, Sapanca, Maşukiye. 1.350 TL günübirlik aile turu.',
    focusKeyword: 'ormanya maşukiye turu',
    metaDescription:
      'Ormanya Maşukiye turu 2026. Sapanca, Max Fun, Çerkezköy çıkışlı. 23 Ağustos, 1.350 TL günübirlik doğa turu.',
    keywords: [
      'ormanya turu',
      'maşukiye turu',
      'sapanca turu',
      'çerkezköy ormanya',
      'aile günübirlik tur',
    ],
    image: '/images/ormanya-23-agustos.jpeg',
    featuredPost: false,
    readingTime: 8,
    content: `
<h2>Doğa ve Eğlence Bir Arada: Ormanya – Maşukiye</h2>
<p><a href="/tours/ormanya-masukiye-turu-23-agustos-2026"><strong>Ormanya Maşukiye Turu</strong></a> 23 Ağustos 2026 tarihinde 1.350 TL kişi başı günübirlik program olarak düzenlenir. Çocuklu aileler ve kısa doğa kaçamakı arayanlar için uygundur.</p>

<h3>Rotadaki Duraklar</h3>
<ul>
  <li><strong>Ormanya Tabiat Parkı</strong> — yürüyüş ve doğa gözlemi</li>
  <li><strong>Max Fun Eğlence Parkı</strong> — aile aktiviteleri</li>
  <li><strong>Sapanca</strong> manzara / mola</li>
  <li><strong>Maşukiye</strong> — şelale ve yeşil alan</li>
</ul>

<h3>Kimler İçin?</h3>
<p>Uzun otobüs yolculuğu istemeyen, tek günde doğa + hafif eğlence isteyen Trakya misafirleri için tasarlanmıştır. Yoğun trekking değildir.</p>

<p>Benzer günübirlikler: <a href="/blog/canakkale-kaz-daglari-turu-rehberi-2026">Kaz Dağları rehberi</a>, <a href="/cerkezkoy-gunubirlik-turlar">tüm günübirlik turlar</a>.</p>
<p><a href="/tours/ormanya-masukiye-turu-23-agustos-2026">Tur detayı →</a> · <a href="/contact">Rezervasyon</a></p>
`,
  },
  {
    title: 'Tarihi Yarımada Turu Rehberi 2026 | Sultanahmet, Ayasofya',
    slug: 'tarihi-yarimada-turu-rehberi-2026-cerkezkoy',
    summary:
      'Çerkezköyden Tarihi Yarımada turu 30 Ağustos 2026. Sultanahmet, Ayasofya, Hipodrom, Yerebatan, Gülhane. 1.250 TL günübirlik.',
    focusKeyword: 'tarihi yarımada turu çerkezköy',
    metaDescription:
      'Tarihi Yarımada turu 2026 Çerkezköy. Sultanahmet, Ayasofya, Yerebatan. 30 Ağustos, 1.250 TL günübirlik İstanbul turu.',
    keywords: [
      'tarihi yarımada turu',
      'sultanahmet turu',
      'ayasofya turu',
      'çerkezköy istanbul turu',
      'yerebatan sarnıcı',
    ],
    image: '/images/istanbul-14-june.jpeg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>İstanbul’un Kalbi: Tarihi Yarımada</h2>
<p><a href="/tours/tarihi-yarimada-turu-30-agustos-2026"><strong>Tarihi Yarımada Turu</strong></a> 30 Ağustos 2026 Pazar, Çerkezköy çıkışlı günübirlik programdır. Fiyat 1.250 TL’dir.</p>

<h3>Klasik Rota</h3>
<ul>
  <li>Sultanahmet Meydanı</li>
  <li>Ayasofya Camii (dış / program dahilinde ziyaret)</li>
  <li>Hipodrom alanı</li>
  <li>Yerebatan Sarnıcı</li>
  <li>Gülhane Parkı</li>
</ul>

<h3>Pratik Bilgiler</h3>
<p>Müze ve camii giriş kuralları dönemsel değişebilir; rehberimiz güncel yönlendirmeyi tura çıkmadan paylaşır. Rahat ayakkabı ve yazın şapka önerilir. Öğle yemeği genelde serbest zamandır.</p>

<h3>Alternatif İstanbul Günübirlikleri</h3>
<p><a href="/tours/fener-balat-turu-13-eylul-2026">Fener-Balat</a> daha mahalle ve sokak odaklıdır; Tarihi Yarımada ise anıtsal yapı turudur. İkisini de <a href="/blog/istanbul-gunubirlik-turlari-cerkezkoy-2026">İstanbul günübirlik rehberinde</a> karşılaştırabilirsiniz.</p>

<p><a href="/tours/tarihi-yarimada-turu-30-agustos-2026">Rezervasyon →</a> · <a href="/blog/eylul-2026-cerkezkoy-tur-takvimi">Eylül takvimi</a></p>
`,
  },
  {
    title: 'Kapadokya Turu Eylül 2026 | 26-27 Eylül Çerkezköy Çıkışlı',
    slug: 'kapadokya-turu-eylul-2026-26-27-rehber',
    summary:
      'Kapadokya 26-27 Eylül 2026 turu: Göreme, Ürgüp, Avanos, Derinkuyu. 2 gün 1 gece, 5.900 TL. Çerkezköy konaklamalı tur.',
    focusKeyword: 'kapadokya turu eylül 2026',
    metaDescription:
      'Kapadokya turu 26-27 Eylül 2026 Çerkezköyden. Göreme, Ürgüp, Avanos. 2 gün 1 gece 5.900 TL. Erken rezervasyon.',
    keywords: [
      'kapadokya turu eylül',
      'kapadokya 26 eylül',
      'çerkezköy kapadokya',
      'göreme turu',
      'konaklamalı kapadokya',
    ],
    image: '/images/kapadokya-26-27-eylul.jpeg',
    featuredPost: true,
    readingTime: 10,
    content: `
<h2>Sonbaharda Kapadokya: 26–27 Eylül 2026</h2>
<p><a href="/tours/kapadokya-turu-26-27-eylul-2026"><strong>Kapadokya Turu</strong></a> 2 gün 1 gece konaklamalı pakettir. Kişi başı 5.900 TL. Çerkezköy kalkışlıdır; balon ve vadiler için Eylül ideal dönemlerden biridir.</p>

<h3>Öne Çıkan Duraklar</h3>
<ul>
  <li>Göreme ve çevresi</li>
  <li>Ürgüp</li>
  <li>Avanos</li>
  <li>Derinkuyu yeraltı şehri</li>
</ul>

<h3>Neden Bu Tarih?</h3>
<p>Yaz sıcağı hafiflemiş, kalabalık azalmaya başlamıştır. Balon uçuşları hava koşullarına bağlıdır; opsiyonel aktiviteler tur öncesi netleştirilir. Genel Kapadokya bilgisi için <a href="/kapadokya-turu">Kapadokya landing sayfamızı</a> ve <a href="/blog/kapadokya-turu-2026-cerkezkoy-rehberi">2026 Kapadokya rehberini</a> okuyun.</p>

<h3>Konaklama ve Ödeme</h3>
<p>Oda tipi ve ön ödeme koşulları tura göre değişir. Güncel kontenjan ve ödeme planı için <a href="/contact">ofisimizle iletişime</a> geçin. Konaklamalı diğer seçenekler: <a href="/cerkezkoy-konakamali-turlar">Çerkezköy konaklamalı turlar</a>.</p>

<p><a href="/tours/kapadokya-turu-26-27-eylul-2026">Tur sayfası →</a> · <a href="/blog/sonbahar-2026-konaklamali-turlar-cerkezkoy">Sonbahar konaklamalı rehber</a></p>
`,
  },
  {
    title: 'Safranbolu Amasra Turu Ekim 2026 | 10-11 Ekim Rehberi',
    slug: 'safranbolu-amasra-turu-ekim-2026-rehber',
    summary:
      'Safranbolu Amasra turu 10-11 Ekim 2026. UNESCO Safranbolu, Amasra limanı. 2 gün 1 gece, 5.750 TL. Çerkezköy çıkışlı.',
    focusKeyword: 'safranbolu amasra turu ekim 2026',
    metaDescription:
      'Safranbolu Amasra turu 10-11 Ekim 2026. Çerkezköyden 2 gün 1 gece, 5.750 TL. UNESCO ve Karadeniz kıyısı.',
    keywords: [
      'safranbolu turu',
      'amasra turu',
      'safranbolu ekim 2026',
      'çerkezköy safranbolu',
      'konaklamalı safranbolu',
    ],
    image: '/images/safranbolu-10-11-ekim.jpeg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>UNESCO + Karadeniz: Safranbolu – Amasra</h2>
<p><a href="/tours/safranbolu-amasra-turu-10-11-ekim-2026"><strong>Safranbolu Amasra Turu</strong></a> 10–11 Ekim 2026 tarihlerinde 2 gün 1 gece olarak düzenlenir. Fiyat 5.750 TL kişi başıdır.</p>

<h3>Program Özeti</h3>
<ul>
  <li>Safranbolu tarihi çarşı ve evleri (UNESCO)</li>
  <li>Amasra liman ve kale çevresi</li>
  <li>Yöresel lezzet molaları</li>
</ul>

<h3>Ekim Avantajı</h3>
<p>Sonbahar renkleri ve daha serin hava kültür gezisini rahatlatır. Yaz yoğunluğu azalmıştır. Benzer konaklamalı içerik için <a href="/blog/safranbolu-amasra-turu-rehberi-2026">genel Safranbolu rehberimize</a> ve <a href="/blog/sonbahar-2026-konaklamali-turlar-cerkezkoy">sonbahar paket listesine</a> bakın.</p>

<p><a href="/tours/safranbolu-amasra-turu-10-11-ekim-2026">Detay ve rezervasyon →</a> · <a href="/karadeniz-turu">Karadeniz turları</a> · <a href="/contact">İletişim</a></p>
`,
  },
  {
    title: 'Şeb-i Arus Konya Turu 2026 | Aralık Mevlana Programı',
    slug: 'seb-i-arus-konya-turu-2026-rehber',
    summary:
      'Şeb-i Arus Konya turu Aralık 2026. Mevlana anma törenleri dönemi, 2 gece konaklamalı paketler. Çerkezköy çıkışlı Konya turu.',
    focusKeyword: 'şeb-i arus konya turu 2026',
    metaDescription:
      'Şeb-i Arus Konya turu 2026. Aralık Mevlana dönemi, Çerkezköyden konaklamalı paket. Tarih ve fiyat için rezervasyon.',
    keywords: [
      'şeb-i arus turu',
      'konya turu 2026',
      'mevlana turu',
      'çerkezköy konya',
      'aralık konya turu',
    ],
    image: '/images/kapadokya.jpeg',
    featuredPost: false,
    readingTime: 8,
    content: `
<h2>Aralık’ta Konya: Şeb-i Arus Dönemi</h2>
<p><strong>Şeb-i Arus</strong>, Mevlana Celaleddin Rumi’nin vuslat yıl dönümü anmalarıyla Konya’nın en özel dönemidir. Büyük Aytaç Travel, Çerkezköy çıkışlı <a href="/tours/seb-i-arus-konya-turu-9-11-aralik-2026">9–11 Aralık</a> ve <a href="/tours/seb-i-arus-konya-turu-11-13-aralik-2026">11–13 Aralık 2026</a> konaklamalı paketler sunar.</p>

<h3>Paket Özeti</h3>
<ul>
  <li>9–11 Aralık 2026 — 6.000 TL</li>
  <li>11–13 Aralık 2026 — 6.300 TL</li>
</ul>
<p>Konaklama, ulaşım ve program detayları tura özeldir; tören biletleri ve ziyaret kuralları dönemsel değişebilir.</p>

<h3>Erken Rezervasyon Neden Önemli?</h3>
<p>Aralık tarihleri hızla dolar. Ön ödeme ve oda tipi için <a href="/contact">ofisimizle</a> iletişime geçin. Diğer kış/sonbahar paketler: <a href="/blog/sonbahar-2026-konaklamali-turlar-cerkezkoy">sonbahar konaklamalı rehber</a>.</p>

<p><a href="/cerkezkoy-konakamali-turlar">Konaklamalı turlar</a> · <a href="/annual-program">Yıllık program</a></p>
`,
  },
  {
    title: 'İstanbul Günübirlik Turları 2026 | Çerkezköy Çıkışlı Rehber',
    slug: 'istanbul-gunubirlik-turlari-cerkezkoy-2026',
    summary:
      'Çerkezköyden İstanbul günübirlik turları: Tarihi Yarımada, Fener-Balat ve kültür rotaları. 2026 fiyat ve tarih karşılaştırması.',
    focusKeyword: 'çerkezköy istanbul günübirlik tur',
    metaDescription:
      'Çerkezköy İstanbul günübirlik turları 2026. Tarihi Yarımada, Fener Balat. Fiyat, program ve rezervasyon rehberi.',
    keywords: [
      'istanbul günübirlik tur',
      'çerkezköy istanbul turu',
      'tarihi yarımada',
      'fener balat turu',
      'trakya istanbul tur',
    ],
    image: '/images/fener-balat-13-eylul.jpeg',
    featuredPost: true,
    readingTime: 10,
    content: `
<h2>Trakya’dan İstanbul’a Tek Günde</h2>
<p>Çerkezköy, Çorlu ve Tekirdağ’dan <strong>İstanbul günübirlik turları</strong>, kısa yolculuk süresiyle hafta sonu kültür kaçamaklarının en pratik yoludur. Büyük Aytaç Travel, anıtsal yarımada ve mahalle odaklı iki ana rotayı öne çıkarır.</p>

<h3>2026 Öne Çıkan İstanbul Turları</h3>
<table>
  <thead><tr><th>Tur</th><th>Tarih</th><th>Fiyat</th></tr></thead>
  <tbody>
    <tr><td><a href="/tours/tarihi-yarimada-turu-30-agustos-2026">Tarihi Yarımada</a></td><td>30 Ağu 2026</td><td>1.250 TL</td></tr>
    <tr><td><a href="/tours/fener-balat-turu-13-eylul-2026">Fener – Balat</a></td><td>13 Eyl 2026</td><td>1.250 TL</td></tr>
  </tbody>
</table>

<h3>Hangisini Seçmeli?</h3>
<ul>
  <li><strong>Tarihi Yarımada:</strong> Ayasofya, Sultanahmet, Yerebatan — ilk kez İstanbul’a gidenler</li>
  <li><strong>Fener-Balat:</strong> sokak, Haliç, Patrikhane — fotoğraf ve mahalle atmosferi</li>
</ul>

<p>Detaylı rehberler: <a href="/blog/tarihi-yarimada-turu-rehberi-2026-cerkezkoy">Tarihi Yarımada rehberi</a>, <a href="/blog/fener-balat-turu-rehberi-2026-cerkezkoy">Fener-Balat rehberi</a>. Tüm günübirlikler: <a href="/cerkezkoy-gunubirlik-turlar">Çerkezköy günübirlik</a>.</p>
<p><a href="/contact">Rezervasyon ve ofis</a> · 0530 060 95 59</p>
`,
  },
  {
    title: 'Sonbahar 2026 Konaklamalı Turlar | Kapadokya, Safranbolu, Konya',
    slug: 'sonbahar-2026-konaklamali-turlar-cerkezkoy',
    summary:
      'Sonbahar 2026 Çerkezköy konaklamalı turlar: Kapadokya Eylül, Safranbolu Amasra Ekim, Şeb-i Arus Konya Aralık. Fiyat ve tarih özeti.',
    focusKeyword: 'sonbahar 2026 konaklamalı turlar',
    metaDescription:
      'Sonbahar 2026 konaklamalı turlar Çerkezköy. Kapadokya, Safranbolu Amasra, Şeb-i Arus Konya. Tarih ve fiyat listesi.',
    keywords: [
      'sonbahar turları 2026',
      'konaklamalı tur çerkezköy',
      'kapadokya sonbahar',
      'safranbolu turu',
      'konya şeb-i arus',
    ],
    image: '/images/kapadokya-26-27-eylul.jpeg',
    featuredPost: true,
    readingTime: 10,
    content: `
<h2>Sonbahar 2026: Konaklamalı Paket Özeti</h2>
<p>Yaz günübirliklerinden sonra sonbahar, <strong>2–3 günlük konaklamalı turlar</strong> için en doğru dönemdir. Çerkezköy çıkışlı paketlerimizi tek listede topladık.</p>

<h3>Takvim ve Fiyatlar</h3>
<ul>
  <li><strong>26–27 Eylül:</strong> <a href="/tours/kapadokya-turu-26-27-eylul-2026">Kapadokya</a> — 5.900 TL · <a href="/blog/kapadokya-turu-eylul-2026-26-27-rehber">Rehber</a></li>
  <li><strong>10–11 Ekim:</strong> <a href="/tours/safranbolu-amasra-turu-10-11-ekim-2026">Safranbolu – Amasra</a> — 5.750 TL · <a href="/blog/safranbolu-amasra-turu-ekim-2026-rehber">Rehber</a></li>
  <li><strong>9–11 / 11–13 Aralık:</strong> <a href="/blog/seb-i-arus-konya-turu-2026-rehber">Şeb-i Arus Konya</a> — 6.000 / 6.300 TL</li>
</ul>

<h3>Nasıl Rezervasyon Yapılır?</h3>
<p>Web formu, ofis veya telefon. Ön ödeme oranı tura göre değişir; güncel bilgi için <a href="/contact">iletişime geçin</a>. Tüm konaklamalı liste: <a href="/cerkezkoy-konakamali-turlar">Çerkezköy konaklamalı turlar</a>.</p>

<p><a href="/blog/eylul-2026-cerkezkoy-tur-takvimi">Eylül günübirlik takvimi</a> · <a href="/faq">SSS</a> · <a href="/annual-program">Yıllık program</a></p>
`,
  },
];

async function seedSeptemberBlogs() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    let created = 0;
    let updated = 0;

    for (const blog of septemberBlogs) {
      const payload = {
        title: blog.title,
        slug: blog.slug,
        content: blog.content.trim(),
        summary: blog.summary,
        image: blog.image,
        author: 'Büyük Aytaç Travel',
        categories: ['Tur Rehberi', 'Çerkezköy', 'SEO', '2026 Turlar', 'Sonbahar'],
        isPublished: true,
        publishDate: new Date(),
        metaDescription: blog.metaDescription,
        keywords: blog.keywords,
        focusKeyword: blog.focusKeyword,
        featuredPost: blog.featuredPost,
        readingTime: blog.readingTime,
      };

      const existing = await Blog.findOne({ slug: blog.slug });
      if (existing) {
        Object.assign(existing, payload);
        await existing.save();
        updated++;
        console.log('🔄 Güncellendi:', blog.slug);
      } else {
        await Blog.create(payload);
        created++;
        console.log('✅ Eklendi:', blog.slug);
      }
    }

    console.log(`\n📊 Özet: ${created} yeni, ${updated} güncellendi (${septemberBlogs.length} yazı)`);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedSeptemberBlogs();
