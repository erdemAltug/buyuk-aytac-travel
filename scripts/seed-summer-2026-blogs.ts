/**
 * Yaz 2026 SEO blog yazıları — upsert by slug
 * Kullanım: npx tsx scripts/seed-summer-2026-blogs.ts
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

const summerBlogs = [
  {
    title: 'Temmuz 2026 Çerkezköy Tur Takvimi | Gökçeada, Ayvalık, Bozcaada',
    slug: 'temmuz-2026-cerkezkoy-tur-takvimi-guncel',
    summary:
      'Temmuz 2026 Çerkezköy tur tarihleri: Gökçeada, Kaz Dağları, Ayvalık Cunda ve Bozcaada günübirlik programları. Güncel fiyatlar ve rezervasyon.',
    focusKeyword: 'temmuz 2026 çerkezköy turları',
    metaDescription:
      'Temmuz 2026 Çerkezköyden kalkan turlar takvimi. Gökçeada, Ayvalık, Bozcaada, Kaz Dağları günübirlik turlar. Büyük Aytaç Travel.',
    keywords: ['temmuz 2026 turlar', 'çerkezköy temmuz turları', 'yaz turları 2026', 'ada turları'],
    image: '/images/gokceada-12.07.jpeg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>Temmuz 2026: Çerkezköyden Yaz Turları</h2>
<p><strong>Temmuz 2026 Çerkezköy turları</strong> ile Ege adaları, Kaz Dağları ve Ayvalık rotalarını keşfedin. Tüm programlar <a href="/cerkezkoy-tur">Çerkezköy çıkışlı</a> ve TÜRSAB güvencesi altındadır.</p>

<h3>Temmuz 2026 Tur Tarihleri</h3>
<ul>
  <li><strong>12 Temmuz:</strong> <a href="/tours/gokceada-turu-12-temmuz-2026">Gökçeada Turu</a> — 1.800 TL (deniz ağırlıklı)</li>
  <li><strong>15 Temmuz:</strong> <a href="/tours/canakkale-kaz-daglari-turu-15-temmuz-2026">Çanakkale Kaz Dağları Turu</a> — 1.750 TL</li>
  <li><strong>19 & 25 Temmuz:</strong> <a href="/tours/ayvalik-cunda-turu-19-temmuz-2026">Ayvalık Cunda Turu</a> — 1.750 TL</li>
  <li><strong>26 Temmuz:</strong> <a href="/tours/bozcaada-turu-26-temmuz-2026">Bozcaada Turu</a> — 1.800 TL</li>
  <li><strong>4-5 Temmuz:</strong> <a href="/tours/lavanta-hasadi-salda-golu-pamukkale-turu-4-5-temmuz-2026">Lavanta – Salda – Pamukkale</a> (konaklamalı)</li>
</ul>

<h3>Ağustos Ayvalık Tarihleri</h3>
<p>Ayvalık Cunda turumuz Ağustos'ta da devam ediyor: 1, 16 ve 30 Ağustos. <a href="/tours/ayvalik-cunda-turu-1-agustos-2026">Program detayı →</a></p>

<p><a href="/annual-program">2026 yıllık tur programı</a> · <a href="/contact">Rezervasyon</a></p>
`,
  },
  {
    title: 'Gökçeada Turu Rehberi 2026 | Kaleköy, Zeytinli, Aydıncık Plajı',
    slug: 'gokceada-turu-rehberi-2026-cerkezkoy',
    summary:
      'Çerkezköyden Gökçeada turu 12 Temmuz 2026. Kabatepe feribot, Kaleköy, Zeytinli Köy, Aydıncık plajında deniz molası. 1.800 TL günübirlik.',
    focusKeyword: 'gökçeada turu çerkezköy',
    metaDescription:
      'Gökçeada turu 2026 Çerkezköy çıkışlı. Kaleköy, Zeytinli Köy, Aydıncık plajı. Deniz ağırlıklı günübirlik tur. 1.800 TL.',
    keywords: ['gökçeada turu', 'gökçeada turu 2026', 'çerkezköy gökçeada', 'imroz turu', 'ada turu'],
    image: '/images/gokceada-12.07.jpeg',
    featuredPost: true,
    readingTime: 8,
    content: `
<h2>Çerkezköyden Gökçeada: Ege'nin En Batısı</h2>
<p><a href="/tours/gokceada-turu-12-temmuz-2026"><strong>Gökçeada turumuz</strong></a> deniz molası ağırlıklı günübirlik programdır. Kabatepe limanından feribotla adaya geçilir.</p>

<h3>Program Özeti</h3>
<ul>
  <li>Kaleköy gezisi ve alışveriş molası</li>
  <li>Zeytinli Köy — dibek kahvesi ve sakızlı muhallebi</li>
  <li>Ada merkezi, Kent Müzesi ve kilise</li>
  <li>Aydıncık plajında yaklaşık 3 saat deniz molası</li>
</ul>

<h3>Fiyat ve Dahil Hizmetler</h3>
<p>1.800 TL kişi başı. Feribot geçişi, lüks otobüs ulaşımı, rehberlik ve araç içi ikramlar dahildir. Öğle yemeği ve şezlong kiralama ekstradır.</p>

<p><a href="/tours/gokceada-turu-12-temmuz-2026">Tur detayı ve rezervasyon →</a> · <a href="/blog/gokceada-vs-bozcaada-ada-turlari-karsilastirma">Gökçeada vs Bozcaada karşılaştırması</a></p>
`,
  },
  {
    title: 'Bozcaada Turu 2026 | Kale, Cunda, Ayazma Plajı Rehberi',
    slug: 'bozcaada-turu-rehberi-2026-cerkezkoy',
    summary:
      'Çerkezköyden Bozcaada turu 26 Temmuz 2026. Geyikli feribot, Bozcaada Kalesi, serbest zaman, Ayazma ve Akvaryum Koyu. 1.800 TL.',
    focusKeyword: 'bozcaada turu çerkezköy',
    metaDescription:
      'Bozcaada turu 2026 Çerkezköy çıkışlı. Kale gezisi, Rum mahalleleri, Talay Şarap Fabrikası. 26 Temmuz Pazar, 1.800 TL.',
    keywords: ['bozcaada turu', 'bozcaada turu 2026', 'çerkezköy bozcaada', 'geyikli feribot', 'ada turu'],
    image: '/images/bozcada-26.07.jpeg',
    featuredPost: true,
    readingTime: 8,
    content: `
<h2>Bozcaada: Ege'nin Saklı Cenneti</h2>
<p><a href="/tours/bozcaada-turu-26-temmuz-2026"><strong>Bozcaada turumuz</strong></a> 26 Temmuz 2026 Pazar günü gerçekleşir. Geyikli iskelesinden feribotla adaya yaya geçiş yapılır.</p>

<h3>Gezilecek Yerler</h3>
<ul>
  <li>Bozcaada Kalesi — rehber eşliğinde</li>
  <li>Türk ve Rum mahalleleri</li>
  <li>Talay Şarap Fabrikası (serbest zaman)</li>
  <li>Ayazma Plajı veya Akvaryum Koyu</li>
  <li>Rüzgar gülleri (minibüs transferi misafire ait)</li>
</ul>

<p>1.800 TL · Günübirlik · Yurtiçi. <a href="/tours/bozcaada-turu-26-temmuz-2026">Rezervasyon →</a></p>
`,
  },
  {
    title: 'Ayvalık Cunda Turu Rehberi | Şeytan Sofrası, Sanat Köy, Tekne',
    slug: 'ayvalik-cunda-turu-rehberi-2026',
    summary:
      'Ayvalık Cunda turu 2026: Küçükköy, Şeytan Sofrası, Cunda Adası, Taksiyarhis Kilisesi. Çerkezköy çıkışlı günübirlik, 1.750 TL.',
    focusKeyword: 'ayvalık cunda turu çerkezköy',
    metaDescription:
      'Ayvalık Cunda turu 2026 rehberi. Şeytan Sofrası, Sanat Köy, tekne turu notları. Haziran-Ağustos çoklu tarih, 1.750 TL.',
    keywords: ['ayvalık cunda turu', 'ayvalık turu', 'cunda adası turu', 'şeytan sofrası turu', 'çerkezköy ayvalık'],
    image: '/images/Ayvalık-cunda.jpeg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>Ayvalık – Cunda: Ege'nin İncisi</h2>
<p><strong>Ayvalık Cunda turumuz</strong> 2026 yaz sezonunda 7 farklı tarihte düzenlenmektedir. Tüm programlar <a href="/tours/ayvalik-cunda-turu-28-haziran-2026">1.750 TL günübirlik</a> pakettir.</p>

<h3>2026 Tur Tarihleri</h3>
<p>28 Haziran, 11-19-25 Temmuz, 1-16-30 Ağustos — her biri ayrı kontenjanla.</p>

<h3>Program Highlights</h3>
<ul>
  <li>Şeytan Sofrası manzara noktası</li>
  <li>Küçükköy (Sanat Köy) — Rum mimarisi</li>
  <li>Ayvalık merkez ve Tostçular Çarşısı</li>
  <li>Tekne turu 12:00–17:00 (ekstra, öğle yemekli)</li>
  <li>Cunda Adası, Taksiyarhis Kilisesi, Rahmi Koç Müzesi</li>
</ul>

<p><a href="/tours/ayvalik-cunda-turu-11-temmuz-2026">11 Temmuz turu →</a> · <a href="/contact">Bilgi ve rezervasyon</a></p>
`,
  },
  {
    title: 'Çanakkale Kaz Dağları Turu | Yeşilyurt, Sütüven, Hasan Boğuldu',
    slug: 'canakkale-kaz-daglari-turu-rehberi-2026',
    summary:
      'Kaz Dağları turu 15 Temmuz 2026. Yeşilyurt, Adatepe Zeytinyağı Müzesi, Sütüven Şelalesi, Hasan Boğuldu, Aynalı Çarşı. 1.750 TL.',
    focusKeyword: 'kaz dağları turu çerkezköy',
    metaDescription:
      'Çanakkale Kaz Dağları turu 2026. Yeşilyurt, Adatepe, Sütüven Şelalesi, Hasan Boğuldu, Çanakkale merkez. Çerkezköy çıkışlı 1.750 TL.',
    keywords: ['kaz dağları turu', 'çanakkale turu', 'yeşilyurt köyü turu', 'sütüven şelalesi', 'çerkezköy çanakkale turu'],
    image: '/images/kazdagları-15.07.jpeg',
    featuredPost: false,
    readingTime: 8,
    content: `
<h2>Kaz Dağları: Doğa ve Tarih Bir Arada</h2>
<p><a href="/tours/canakkale-kaz-daglari-turu-15-temmuz-2026"><strong>15 Temmuz 2026 Kaz Dağları turumuz</strong></a> doğa yürüyüşü ve köy gezilerini birleştirir.</p>

<h3>Rota</h3>
<ol>
  <li>Yeşilyurt Köyü — taş evler, kahvaltı (ekstra)</li>
  <li>Adatepe — Zeytinyağı Müzesi</li>
  <li>Kazdağları Milli Parkı — Sütüven Şelalesi, Hasan Boğuldu</li>
  <li>Çanakkale merkez — Aynalı Çarşı</li>
</ol>

<p>Minibüs ücreti ve seyahat sigortası fiyata dahildir. <a href="/tours/canakkale-kaz-daglari-turu-15-temmuz-2026">Detaylı program →</a></p>
`,
  },
  {
    title: 'Gökçeada mı Bozcaada mı? | Ada Turları Karşılaştırması 2026',
    slug: 'gokceada-vs-bozcaada-ada-turlari-karsilastirma',
    summary:
      'Gökçeada ve Bozcaada turlarını karşılaştırın: feribot, plaj, gezilecek yerler, fiyat. Çerkezköyden hangi ada turu size uygun?',
    focusKeyword: 'gökçeada bozcaada tur karşılaştırma',
    metaDescription:
      'Gökçeada vs Bozcaada turu 2026. Feribot, plaj, program ve fiyat karşılaştırması. Çerkezköy çıkışlı ada turları rehberi.',
    keywords: ['gökçeada bozcaada', 'ada turu karşılaştırma', 'gökçeada mı bozcaada mı', 'ege ada turları', 'çerkezköy ada turu'],
    image: '/images/bozcada-26.07.jpeg',
    featuredPost: false,
    readingTime: 7,
    content: `
<h2>İki Ada, İki Farklı Deneyim</h2>
<p>Çerkezköyden ulaşılabilen <strong>Gökçeada</strong> ve <strong>Bozcaada</strong> turları yazın en çok sorulan rotalar arasında. İkisi de günübirlik, fiyatlar 2026 sezonunda 1.800 TL civarındadır.</p>

<h3>Gökçeada Turu</h3>
<ul>
  <li>Kabatepe feribot · Otobüs adaya geçer</li>
  <li>Kaleköy, Zeytinli Köy, ada merkezi</li>
  <li>Aydıncık plajında ~3 saat deniz molası (rehberli)</li>
  <li><a href="/tours/gokceada-turu-12-temmuz-2026">12 Temmuz 2026 →</a></li>
</ul>

<h3>Bozcaada Turu</h3>
<ul>
  <li>Geyikli feribot · Yaya geçiş</li>
  <li>Bozcaada Kalesi, şarap fabrikası, serbest zaman</li>
  <li>Ayazma / Akvaryum veya rüzgar gülleri (kendi imkanınızla)</li>
  <li><a href="/tours/bozcaada-turu-26-temmuz-2026">26 Temmuz 2026 →</a></li>
</ul>

<h3>Hangisini Seçmeli?</h3>
<p><strong>Deniz ve uzun plaj molası</strong> istiyorsanız Gökçeada; <strong>ada sokakları, şarap ve serbest keşif</strong> istiyorsanız Bozcaada idealdir. İkisini de denemek için farklı haftalara rezervasyon yapabilirsiniz.</p>

<p><a href="/tours?accommodationType=daily">Tüm günübirlik turlar →</a> · <a href="/contact">Danışmanlık alın</a></p>
`,
  },
  {
    title: 'Balkan Turları 2026 Rehberi | Vizesiz Rotalar ve Fiyatlar',
    slug: 'balkan-turlari-2026-rehberi-vizesiz',
    summary:
      'Balkan turları 2026: Belgrad, Saraybosna, Budva, Dubrovnik. Vizesiz ülkeler, Trakya çıkışlı rota avantajı. Çerkezköyden yurtdışı tur bilgisi.',
    focusKeyword: 'balkan turları 2026',
    metaDescription:
      'Balkan turları 2026 rehberi. Vizesiz ülkeler, Belgrad, Saraybosna, Budva. Trakya çıkışlı Balkan turu bilgisi. Büyük Aytaç Travel.',
    keywords: ['balkan turları', 'balkan turları 2026', 'vizesiz balkan turu', 'trakya çıkışlı balkan', 'çerkezköy yurtdışı tur'],
    image: '/images/kapadokya-19-21-june.jpeg',
    featuredPost: true,
    readingTime: 10,
    content: `
<h2>Balkan Turları: Vizesiz Avrupa Keşfi</h2>
<p><strong>Balkan turları</strong>, Türk vatandaşları için vizesiz veya kolay giriş imkânı sunan en popüler yurtdışı rotalardan biridir. Sırbistan, Bosna Hersek, Karadağ, Arnavutluk ve Kuzey Makedonya tek programda gezilebilir.</p>

<h3>Öne Çıkan Duraklar</h3>
<ul>
  <li><strong>Belgrad</strong> — Kalemegdan, Nebojsa Kulesi</li>
  <li><strong>Saraybosna & Mostar</strong> — Başçarşı, Mostar Köprüsü</li>
  <li><strong>Budva & Kotor</strong> — Adriyatik kıyısı</li>
  <li><strong>Ohrid & Üsküp</strong> — göl manzarası ve Osmanlı eserleri</li>
</ul>

<h3>Trakya Çıkışlı Avantaj</h3>
<p>Çerkezköy, Tekirdağ ve Edirne'ye yakın konumunuz sayesinde <strong>Edirne üzerinden Balkan sınırına</strong> ulaşım avantajlıdır. İstanbul trafiğine girmeden yurtdışı tur planlayabilirsiniz.</p>

<h3>Ne Zaman Gidilir?</h3>
<p>İlkbahar (Nisan–Haziran) ve sonbahar (Eylül–Ekim) en ideal dönemlerdir. Yaz ayları Budva ve Kotor'da deniz molası ile birleştirilebilir.</p>

<p><a href="/balkan-turlari">Balkan turları sayfamız →</a> · <a href="/contact">Ön kayıt ve bilgi</a> · <a href="/tours?tourType=international">Yurtdışı turlar</a></p>
`,
  },
];

async function seedSummerBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    let created = 0;
    let updated = 0;

    for (const blog of summerBlogs) {
      const payload = {
        title: blog.title,
        slug: blog.slug,
        content: blog.content.trim(),
        summary: blog.summary,
        image: blog.image,
        author: 'Büyük Aytaç Travel',
        categories: ['Tur Rehberi', 'Çerkezköy', 'SEO', '2026 Turlar', 'Yaz Turları'],
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

    console.log(`\n📊 Özet: ${created} yeni, ${updated} güncellendi (toplam ${summerBlogs.length} yazı)`);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedSummerBlogs();
