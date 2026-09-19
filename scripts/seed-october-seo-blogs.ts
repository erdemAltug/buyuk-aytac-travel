/**
 * Ekim 2026 SEO blog yazıları (5 yazı) — upsert by slug
 * Kullanım: npx tsx scripts/seed-october-seo-blogs.ts
 * npm run seed:blogs:october
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

const octoberBlogs = [
  {
    title: 'Ekim 2026 Çerkezköy Tur Takvimi | Safranbolu, Yedigöller, Ormanya',
    slug: 'ekim-2026-cerkezkoy-tur-takvimi',
    summary:
      'Ekim 2026 Çerkezköy tur tarihleri: Yedigöller, Fener-Balat, Safranbolu Amasra, Ormanya. Sonbahar fiyatları ve rezervasyon.',
    focusKeyword: 'ekim 2026 çerkezköy turları',
    metaDescription:
      'Ekim 2026 Çerkezköyden kalkan turlar. Yedigöller 7 Ekim, Safranbolu Amasra 10-11 Ekim, Ormanya 11 Ekim. Güncel takvim.',
    keywords: [
      'ekim 2026 turlar',
      'çerkezköy ekim turları',
      'sonbahar tur takvimi',
      'safranbolu ekim 2026',
      'yedigöller turu',
    ],
    image: '/images/safranbolu-10-11-ekim.jpeg',
    featuredPost: true,
    readingTime: 10,
    content: `
<h2>Ekim 2026: Sonbaharın En Güzel Tur Haftaları</h2>
<p><strong>Ekim 2026 Çerkezköy turları</strong>, yaprakların kızıl-sarıya döndüğü, serin ve gezmeye en uygun dönemde doğa ve kültür rotalarını bir araya getirir. Çerkezköy, Çorlu ve Tekirdağ kalkışlı tüm programlar <a href="/about">TÜRSAB üyesi</a> Büyük Aytaç Travel güvencesindedir.</p>

<h3>Ekim 2026 Günübirlik Turlar</h3>
<ul>
  <li><strong>5 Ekim:</strong> <a href="/tours/fener-balat-turu-5-ekim-2026">Fener – Balat Turu</a> — İstanbul’un en karakterli mahalleleri</li>
  <li><strong>7 Ekim:</strong> <a href="/blog/yedigoller-turu-ekim-2026-cerkezkoy">Yedigöller Turu</a> — sonbahar renkleri</li>
  <li><strong>11 Ekim:</strong> <a href="/blog/ormanya-masukiye-ekim-2026-rehber">Ormanya &amp; Maşukiye</a> — doğa ve serbest zaman</li>
  <li><strong>19 Ekim:</strong> Bursa / Mudanya hattı — kültür ve sahil</li>
</ul>

<h3>Ekim Konaklamalı Vurgu: Safranbolu – Amasra</h3>
<p><a href="/tours/safranbolu-amasra-turu-10-11-ekim-2026"><strong>Safranbolu Amasra Turu 10–11 Ekim 2026</strong></a> (2 gün 1 gece) sonbaharın en çok tercih edilen konaklamalı programıdır. UNESCO Safranbolu, Yörük Köyü, Cam Teras ve Amasra sahili aynı pakette. Detay için <a href="/blog/safranbolu-amasra-turu-ekim-2026-rehber">Safranbolu rehberimize</a> bakın.</p>

<h3>Neden Ekim?</h3>
<p>Ekim’de Karadeniz ve Batı Karadeniz ormanları en fotojenik dönemindedir; İstanbul kültür turları yaz yoğunluğundan uzaktır. Hafta sonu kaçamakları için <a href="/cerkezkoy-gunubirlik-turlar">günübirlik listemizi</a> ve <a href="/cerkezkoy-konakamali-turlar">konaklamalı turları</a> inceleyin.</p>

<h3>Rezervasyon</h3>
<p>Kontenjanlar sınırlıdır. <a href="/contact">İletişim formu</a> veya WhatsApp / ofis: 0530 060 95 59 · 0539 345 95 59.</p>
<p><a href="/blog/eylul-2026-cerkezkoy-tur-takvimi">Eylül takvimi</a> · <a href="/tour-calendar">Tur takvimi</a> · <a href="/annual-program">2026 yıllık program</a></p>
`,
  },
  {
    title: 'Ayvalık Cunda Turu Rehberi 2026 | Şeytan Sofrası, Küçükköy, Ada',
    slug: 'ayvalik-cunda-turu-rehberi-2026-cerkezkoy',
    summary:
      'Çerkezköyden Ayvalık Cunda günübirlik turu: Şeytan Sofrası, Küçükköy, Cunda Adası, opsiyonel tekne. Program, fiyat ve ipuçları.',
    focusKeyword: 'ayvalık cunda turu çerkezköy',
    metaDescription:
      'Ayvalık Cunda turu 2026 Çerkezköy çıkışlı. Şeytan Sofrası, Küçükköy, Cunda, tekne opsiyonu. Günübirlik Ege rehberi.',
    keywords: [
      'ayvalık cunda turu',
      'cunda adası turu',
      'çerkezköy ayvalık',
      'şeytan sofrası turu',
      'ayvalık günübirlik',
    ],
    image: '/images/Ayvalık-cunda.jpeg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>Çerkezköyden Ege’ye Tek Günde: Ayvalık ve Cunda</h2>
<p><strong>Ayvalık Cunda turu</strong>, Trakya’dan Ege’ye günübirlik kaçmak isteyenler için en dengeli programlardan biridir. Kalkış Çerkezköy; Çorlu ve Tekirdağ’dan da katılım mümkündür. Tüm organizasyon <a href="/cerkezkoy-tur">Büyük Aytaç Travel</a> güvencesindedir.</p>

<h3>Program Özeti</h3>
<ul>
  <li><strong>Şeytan Sofrası</strong> — manzara ve dilek noktası (giriş ücretli alan olabilir)</li>
  <li><strong>Küçükköy</strong> — sanat köyü, Rum mimarisi, Boşnak böreği molası</li>
  <li><strong>Ayvalık merkez</strong> — tostçular çarşısı, kısa şehir turu</li>
  <li><strong>Cunda Adası</strong> — yüzme / ada lezzetleri, Taksiyarhis Kilisesi, Rahmi Koç Müzesi</li>
  <li><strong>Opsiyonel tekne turu</strong> — Ayvalık’tan biniş, Cunda’da iniş (ekstra, öğle yemekli)</li>
</ul>

<h3>Tekne mi, Ada Serbest Zaman mı?</h3>
<p>Tekne turuna katılmayan misafirler Ayvalık sonrası otobüsle Cunda’ya geçer; yüzme ve merkez gezisi için serbest zaman verilir. Hangisini seçeceğinize kalkış öncesi ofisle netleştirmenizi öneririz.</p>

<h3>Kimler İçin Uygun?</h3>
<p>Aileler, arkadaş grupları ve ilk kez Ayvalık–Cunda görecekler için idealdir. Yoğun dağ yürüyüşü yoktur; gün uzun olduğu için rahat ayakkabı ve ince mont (bahar/sonbahar) yeterlidir.</p>

<p><a href="/tours?destination=Ayvalık">Ayvalık turlarını gör</a> · <a href="/cerkezkoy-gunubirlik-turlar">Günübirlik turlar</a> · <a href="/contact">Rezervasyon</a></p>
`,
  },
  {
    title: 'Çorlu ve Tekirdağ Çıkışlı Turlar 2026 | Çerkezköy Kalkış Rehberi',
    slug: 'corlu-tekirdag-cikisli-turlar-2026',
    summary:
      'Çorlu ve Tekirdağ’dan da katılabileceğiniz Çerkezköy kalkışlı turlar. Günübirlik ve konaklamalı seçenekler, duraklar ve rezervasyon.',
    focusKeyword: 'çorlu tekirdağ turları',
    metaDescription:
      'Çorlu ve Tekirdağ çıkışlı turlar 2026. Çerkezköy kalkışlı günübirlik ve konaklamalı programlara Trakya’dan nasıl katılırısınız?',
    keywords: [
      'çorlu turları',
      'tekirdağ turları',
      'çorlu günübirlik tur',
      'tekirdağ çıkışlı tur',
      'trakya turları 2026',
    ],
    image: '/images/hero-banner.jpg',
    featuredPost: true,
    readingTime: 8,
    content: `
<h2>Trakya’dan Tek Kalkış Noktası: Çerkezköy Merkezli Turlar</h2>
<p>Birçok misafirimiz <strong>Çorlu</strong> ve <strong>Tekirdağ</strong>’dan gelerek Çerkezköy çıkışlı turlara katılır. Büyük Aytaç Travel olarak hedefimiz, Trakya’nın her noktasından kolay ulaşılabilir, şeffaf fiyatlı ve <a href="/about">TÜRSAB belgeli</a> programlar sunmaktır.</p>

<h3>Nasıl Katılırısınız?</h3>
<ol>
  <li>Turu <a href="/tour-calendar">takvimden</a> veya kategori sayfalarından seçin</li>
  <li>Rezervasyonda ikamet / biniş bilginizi iletin (Çorlu, Tekirdağ, Çerkezköy)</li>
  <li>Ofisimiz size en yakın biniş / buluşma bilgisini netleştirir</li>
</ol>
<p>Aktüel biniş noktaları tura göre değişebilir; mutlaka rezervasyon onayıyla teyit edin.</p>

<h3>Popüler Seçenekler</h3>
<ul>
  <li><a href="/cerkezkoy-gunubirlik-turlar">Günübirlik turlar</a> — İstanbul, Ege, doğa rotaları</li>
  <li><a href="/cerkezkoy-konakamali-turlar">Konaklamalı turlar</a> — Kapadokya, Safranbolu, Konya, GAP</li>
  <li><a href="/tours/last-minute">Son dakika fırsatları</a></li>
  <li><a href="/group-tour">Özel grup / okul / firma</a> talepleri</li>
</ul>

<h3>Neden Büyük Aytaç Travel?</h3>
<p>20+ yıllık saha deneyimi, sabit Çerkezköy ofisi, WhatsApp üzerinden hızlı dönüş ve net fiyat politikası. Çorlu–Tekirdağ hattındaki misafirlerimiz için ulaşım planı tur bazında paylaşılır.</p>

<p><a href="/contact">Hemen bilgi al</a> · 0530 060 95 59 · 0539 345 95 59 · <a href="/location/tekirdag">Tekirdağ sayfası</a></p>
`,
  },
  {
    title: 'Yedigöller Turu Ekim 2026 | Sonbahar Renkleri Çerkezköy Çıkışlı',
    slug: 'yedigoller-turu-ekim-2026-cerkezkoy',
    summary:
      'Yedigöller Milli Parkı sonbahar turu. Çerkezköyden günübirlik doğa gezisi, ne giyilir, ne zaman gidilir, rezervasyon notları.',
    focusKeyword: 'yedigöller turu çerkezköy',
    metaDescription:
      'Yedigöller turu Ekim 2026 Çerkezköy çıkışlı. Sonbahar yaprakları, milli park gezisi, günübirlik doğa turu rehberi.',
    keywords: [
      'yedigöller turu',
      'yedigöller milli parkı',
      'yedigöller sonbahar',
      'çerkezköy yedigöller',
      'yedigöller günübirlik',
    ],
    image: '/images/yedigoller-7-ekim.jpeg',
    featuredPost: false,
    readingTime: 8,
    content: `
<h2>Sonbaharda Yedigöller: Doğanın En Güzel Paleti</h2>
<p><strong>Yedigöller turu</strong>, Ekim ayında Bolu’nun efsanevi milli parkını görmek isteyen Çerkezköy ve Trakya misafirleri için vazgeçilmez bir doğa rotasıdır. Göl aynaları, kızıl-sarı orman ve serin hava fotoğraf tutkunlarını cezbeder.</p>

<h3>Turda Sizi Neler Bekler?</h3>
<ul>
  <li>Konforlu araçla Çerkezköy kalkış</li>
  <li>Yedigöller Milli Parkı yürüyüş / seyir noktaları</li>
  <li>Rehber eşliğinde tempo ayarı (zor dağ tırmanışı değildir)</li>
  <li>Serbest zaman ve dönüş yolculuğu</li>
</ul>

<h3>Ne Giyilmeli?</h3>
<p>Katmanlı giyinme şarttır: ince polar + yağmurluk / mont. Kaymaz yürüyüş ayakkabısı, yedek çorap ve su şişesi önerilir. Park içi yollar yağmur sonrası kaygan olabilir.</p>

<h3>Kimler İçin?</h3>
<p>Doğa severler, aileler (çocuk temposuna dikkat) ve şehirden kısa kaçamak isteyenler. Yoğun kondisyon gerektirmez; yine de uzun bir günübirlik temposu vardır.</p>

<p><a href="/blog/ekim-2026-cerkezkoy-tur-takvimi">Ekim takvimi</a> · <a href="/cerkezkoy-gunubirlik-turlar">Günübirlik turlar</a> · <a href="/contact">Rezervasyon</a></p>
`,
  },
  {
    title: 'Ormanya Maşukiye Ekim 2026 | Sapanca Doğa Turu Rehberi',
    slug: 'ormanya-masukiye-ekim-2026-rehber',
    summary:
      'Ormanya ve Maşukiye sonbahar turu Çerkezköy çıkışlı. Sapanca hattı, doğa, serbest zaman ve Ekim 2026 rezervasyon notları.',
    focusKeyword: 'ormanya maşukiye turu ekim',
    metaDescription:
      'Ormanya Maşukiye turu Ekim 2026. Çerkezköyden Sapanca doğa turu, Maşukiye dere kenarı, günübirlik rehber.',
    keywords: [
      'ormanya turu',
      'maşukiye turu',
      'sapanca turu çerkezköy',
      'ormanya ekim 2026',
      'maşukiye günübirlik',
    ],
    image: '/images/ormanya-11-ekim.jpeg',
    featuredPost: false,
    readingTime: 8,
    content: `
<h2>Sapanca Hattında Sonbahar: Ormanya ve Maşukiye</h2>
<p><strong>Ormanya Maşukiye turu</strong>, İstanbul’a yakın doğa rotalarını tek günde görmek isteyen Çerkezköy misafirleri için pratik bir tercihtir. Ekim’de orman dokusu ve serin hava yürüyüşü keyifli kılar.</p>

<h3>Rotada Öne Çıkanlar</h3>
<ul>
  <li><strong>Ormanya</strong> — doğa parkı, açık hava aktiviteleri ve manzara</li>
  <li><strong>Maşukiye</strong> — dere kenarı, kahvaltı / gözleme kültürü, serbest zaman</li>
  <li>Sapanca göl hattı manzaraları (programa göre)</li>
</ul>

<h3>Pratik İpuçları</h3>
<p>Hafta sonu yoğun olabilir; erken rezervasyon kontenjanı garanti eder. Rahat ayakkabı, ince mont ve nakit (küçük işletmeler için) bulundurun. Çocuklu aileler için tempo uygundur.</p>

<h3>Benzer Rotalar</h3>
<p>Daha sakin bir orman deneyimi için <a href="/blog/yedigoller-turu-ekim-2026-cerkezkoy">Yedigöller</a>; kültür ağırlıklı gün için <a href="/blog/fener-balat-turu-rehberi-2026-cerkezkoy">Fener-Balat</a> yazılarımıza bakın.</p>

<p><a href="/blog/ekim-2026-cerkezkoy-tur-takvimi">Ekim 2026 takvimi</a> · <a href="/cerkezkoy-gunubirlik-turlar">Tüm günübirlikler</a> · <a href="/contact">İletişim</a></p>
`,
  },
];

async function seedOctoberBlogs() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    let created = 0;
    let updated = 0;

    for (const blog of octoberBlogs) {
      const payload = {
        title: blog.title,
        slug: blog.slug,
        content: blog.content.trim(),
        summary: blog.summary,
        image: blog.image,
        author: 'Büyük Aytaç Travel',
        categories: ['Tur Rehberi', 'Çerkezköy', 'SEO', '2026 Turlar', 'Ekim', 'Sonbahar'],
        isPublished: true,
        publishDate: new Date(),
        metaDescription: blog.metaDescription,
        keywords: blog.keywords,
        focusKeyword: blog.focusKeyword,
        featuredPost: blog.featuredPost,
        readingTime: blog.readingTime,
      };

      // updateOne upsert → pre('save') slug bozmasın
      const result = await Blog.updateOne(
        { slug: blog.slug },
        { $set: payload },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        created++;
        console.log('✅ Eklendi:', blog.slug);
      } else {
        updated++;
        console.log('🔄 Güncellendi:', blog.slug);
      }
    }

    console.log(
      `\n📊 Özet: ${created} yeni, ${updated} güncellendi (${octoberBlogs.length} yazı)`
    );
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedOctoberBlogs();
