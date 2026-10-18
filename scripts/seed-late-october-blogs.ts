import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

/**
 * 18 Ekim 2026 sonrası güncel 3 yazı — upsert by slug
 * Kullanım: npx tsx scripts/seed-late-october-blogs.ts
 */

import mongoose from 'mongoose';
import Blog from '../src/models/Blog';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI bulunamadı (.env.local)');
  process.exit(1);
}

const blogs = [
  {
    title: '29 Ekim 2026 Çerkezköy Cumhuriyet Bayramı Tur Planı',
    slug: '29-ekim-2026-cerkezkoy-cumhuriyet-bayrami-turu',
    summary:
      '29 Ekim 2026 Perşembe. Çerkezköy, Çorlu ve Tekirdağ’dan Cumhuriyet Bayramı kaçamak planı: günübirlik ve konaklamalı seçenekler.',
    focusKeyword: '29 ekim çerkezköy turu',
    metaDescription:
      '29 Ekim 2026 Çerkezköy Cumhuriyet Bayramı tur planı. Perşembe tatilinde günübirlik ve konaklamalı kaçamak. TÜRSAB 17674.',
    keywords: [
      '29 ekim turu',
      'cumhuriyet bayramı turu',
      'çerkezköy bayram turu',
      '29 ekim 2026',
      'hafta sonu turu çerkezköy',
    ],
    image: '/images/eskisehir-21-26.jpeg',
    featuredPost: true,
    readingTime: 7,
    categories: ['Tur Rehberi', 'Çerkezköy', '2026 Turlar', 'Ekim', 'Bayram'],
    content: `
<h2>29 Ekim 2026: Çerkezköy’den Kısa Bayram Kaçamağı</h2>
<p><strong>29 Ekim 2026</strong> Perşembe gününe denk geliyor. Çerkezköy, Çorlu ve Tekirdağ’dan kalkan bir günübirlik ya da bir gecelik program, bayramı şehir dışında geçirmek için yeterli. Organizasyon <a href="/about">TÜRSAB 17674</a> belge numaralı Büyük Aytaç Travel tarafından yapılır.</p>

<h3>Hangi tempo size uyar?</h3>
<ul>
  <li><strong>Tek gün:</strong> Eskişehir, Bursa veya İstanbul kültür rotaları. Sabah dönüş, akşam evdesiniz. <a href="/cerkezkoy-gunubirlik-turlar">Günübirlik turlar</a></li>
  <li><strong>Bir gece:</strong> Safranbolu, Kapadokya veya Batı Karadeniz. Cuma’yı da bağlamak isteyenler için daha rahat. <a href="/cerkezkoy-konakamali-turlar">Konaklamalı turlar</a></li>
  <li><strong>Kendi grubunuz:</strong> Okul, site veya iş yeri için tarih netleştirilir. <a href="/group-tour">Özel grup talebi</a></li>
</ul>

<h3>Bayram haftasında pratik notlar</h3>
<p>Otoyol ve mola tesisleri Perşembe sabahı doludur. Rahat ayakkabı, ince mont ve kimlik yeter. Müze ve ören yeri saatleri resmi tatile göre kısalabilir; hareket saatini rezervasyon onayında netleştirin.</p>
<p>Ekim başındaki kalkışlar için <a href="/blog/ekim-2026-cerkezkoy-tur-takvimi">Ekim tur takvimine</a> bakın. 29 Ekim’e özel kontenjan ofiste açılır; sitede tarihi geçmiş turlar kapatılır.</p>

<h3>Rezervasyon</h3>
<p><a href="/contact">İletişim formu</a>, WhatsApp veya ofis: 0530 060 95 59 · 0539 345 95 59. <a href="/tour-calendar">Tur takvimi</a></p>
`,
  },
  {
    title: 'Kasım 2026 Çerkezköy Tur Planı | Hafta Sonu ve Erken Kış',
    slug: 'kasim-2026-cerkezkoy-tur-plani',
    summary:
      'Kasım 2026’da Çerkezköy çıkışlı tur planı. Hafta sonu kaçamakları ve Aralık Şeb-i Arus için erken kayıt penceresi.',
    focusKeyword: 'kasım 2026 çerkezköy turları',
    metaDescription:
      'Kasım 2026 Çerkezköy tur planı. Hafta sonu kaçamakları ve 9-13 Aralık Şeb-i Arus erken rezervasyonu. Güncel rehber.',
    keywords: [
      'kasım 2026 turlar',
      'çerkezköy kasım turu',
      'sonbahar tur planı',
      'erken rezervasyon konya',
      'çerkezköy hafta sonu',
    ],
    image: '/images/kapadokya-26-27-eylul.jpeg',
    featuredPost: true,
    readingTime: 8,
    categories: ['Tur Rehberi', 'Çerkezköy', '2026 Turlar', 'Kasım', 'Sonbahar'],
    content: `
<h2>Kasım’da Trakya’dan Nereye?</h2>
<p><strong>Kasım 2026 Çerkezköy turları</strong> için en doğru tempo, kalabalık yaz rotaları yerine kısa hafta sonu kaçamakları ve kış programına erken kayıttır. Ekim kalkışlarının özeti <a href="/blog/ekim-2026-cerkezkoy-tur-takvimi">Ekim takviminde</a>.</p>

<h3>Kasım’da öne çıkan üç tercih</h3>
<ul>
  <li><strong>Günübirlik doğa veya kültür:</strong> Hava serinler, orman rotaları sakinleşir. <a href="/tours/daily">Günübirlik liste</a></li>
  <li><strong>Bir gecelik kültür:</strong> Kapadokya ve Safranbolu sonbahar sonu ışığında daha rahat gezilir. <a href="/kapadokya-turu">Kapadokya</a> · <a href="/karadeniz-turu">Karadeniz ve Safranbolu</a></li>
  <li><strong>Aralık’ı şimdiden kilitlemek:</strong> Sıradaki tarihli kalkışlar Konya Şeb-i Arus. <a href="/blog/aralik-2026-seb-i-arus-erken-rezervasyon">Erken rezervasyon notu</a></li>
</ul>

<h3>Neden Kasım’da aramak gerekir?</h3>
<p>Kasım kontenjanı, bayram ve Aralık tören haftasından önce dolar. Otel ve otobüs planı tur bazında değişir; sitede görmediğiniz bir hafta sonu için <a href="/group-tour">grup formu</a> veya ofis yeterlidir. Çorlu ve Tekirdağ binişi rezervasyon sırasında yazılır.</p>

<h3>İletişim</h3>
<p><a href="/contact">Bilgi alın</a> · 0530 060 95 59 · 0539 345 95 59 · <a href="/annual-program">2026 yıllık program</a></p>
`,
  },
  {
    title: 'Aralık 2026 Şeb-i Arus Erken Rezervasyon | Konya 9-13 Aralık',
    slug: 'aralik-2026-seb-i-arus-erken-rezervasyon',
    summary:
      'Şeb-i Arus yaklaşırken Çerkezköy çıkışlı iki tarih: 9-11 Aralık 6.000 TL, 11-13 Aralık 6.300 TL. 2 gün 1 gece.',
    focusKeyword: 'şeb-i arus erken rezervasyon',
    metaDescription:
      'Şeb-i Arus erken rezervasyon. Konya 9-11 Aralık 6.000 TL, 11-13 Aralık 6.300 TL. Çerkezköy çıkışlı 2 gün 1 gece.',
    keywords: [
      'şeb-i arus erken rezervasyon',
      'konya aralık 2026',
      'mevlana turu çerkezköy',
      '9 aralık konya turu',
      '11 aralık konya turu',
    ],
    image: '/images/konya-9-11-aralik.jpeg',
    featuredPost: false,
    readingTime: 7,
    categories: ['Tur Rehberi', 'Çerkezköy', '2026 Turlar', 'Aralık', 'Konya'],
    content: `
<h2>Şeb-i Arus’a yer ayırmak için Kasım geç kalır</h2>
<p>Mevlana’nın Şeb-i Arus törenleri Aralık ortasına denk gelir. Büyük Aytaç Travel’ın Çerkezköy çıkışlı paketleri törenden önceki haftadadır. İki tarih de <strong>2 gün 1 gece</strong> ve yarım pansiyondur. Programın gezilecek yerleri <a href="/blog/seb-i-arus-konya-turu-2026-rehber">Konya rehberinde</a>.</p>

<h3>Güncel tarihler ve fiyatlar</h3>
<ul>
  <li><a href="/tours/seb-i-arus-konya-turu-9-11-aralik-2026"><strong>9–11 Aralık 2026</strong></a> — 6.000 TL</li>
  <li><a href="/tours/seb-i-arus-konya-turu-11-13-aralik-2026"><strong>11–13 Aralık 2026</strong></a> — 6.300 TL</li>
</ul>
<p>9 Aralık çıkışı hafta içi başlar, pazara döner. 11 Aralık çıkışı cuma akşamı ritmine daha yakındır. Sema töreni saati ve kontenjan organizasyona bağlıdır; bilet tur bedeline her yıl aynı şekilde dahil olmayabilir. Onay mesajında netleşir.</p>

<h3>Aralık valizinde ne olsun?</h3>
<p>Konya geceleri sıfırın altına iner. Kalın mont, kaymaz ayakkabı, şal veya bere ve yedek çorap yeter. Müze içinde fotoğraf kuralı döneme göre değişir; rehber söyler.</p>

<h3>Kayıt</h3>
<p>Kontenjan iki otobüsle sınırlıdır. <a href="/contact">Rezervasyon</a> · 0530 060 95 59 · 0539 345 95 59 · belge no TÜRSAB 17674.</p>
`,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log('MongoDB bağlantısı kuruldu');

    let created = 0;
    let updated = 0;

    for (const blog of blogs) {
      const payload = {
        title: blog.title,
        slug: blog.slug,
        content: blog.content.trim(),
        summary: blog.summary,
        image: blog.image,
        author: 'Büyük Aytaç Travel',
        categories: blog.categories,
        isPublished: true,
        publishDate: new Date('2026-10-18'),
        metaDescription: blog.metaDescription,
        keywords: blog.keywords,
        focusKeyword: blog.focusKeyword,
        featuredPost: blog.featuredPost,
        readingTime: blog.readingTime,
      };

      const result = await Blog.updateOne({ slug: blog.slug }, { $set: payload }, { upsert: true });
      if (result.upsertedCount > 0) {
        created += 1;
        console.log('Eklendi:', blog.slug);
      } else {
        updated += 1;
        console.log('Güncellendi:', blog.slug);
      }
    }

    console.log(`Özet: ${created} yeni, ${updated} güncellendi`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
