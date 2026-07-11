/**
 * Ağustos 2026 + ek SEO blog yazıları
 * Kullanım: npx tsx scripts/seed-august-seo-blogs.ts
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

const augustBlogs = [
  {
    title: 'Ağustos 2026 Çerkezköy Tur Takvimi | Ayvalık, Ada Turları',
    slug: 'agustos-2026-cerkezkoy-tur-takvimi',
    summary:
      'Ağustos 2026 Çerkezköy tur tarihleri: Ayvalık Cunda, yaz günübirlik programları. Güncel fiyatlar ve erken rezervasyon.',
    focusKeyword: 'ağustos 2026 çerkezköy turları',
    metaDescription:
      'Ağustos 2026 Çerkezköyden kalkan turlar. Ayvalık Cunda 1, 16, 30 Ağustos. Yaz ada turları ve rezervasyon.',
    keywords: ['ağustos 2026 turlar', 'çerkezköy ağustos turları', 'yaz tatili turları', 'ayvalık ağustos'],
    image: '/images/Ayvalık-cunda.jpeg',
    featuredPost: true,
    readingTime: 8,
    content: `
<h2>Ağustos 2026 Tur Programı</h2>
<p>Yazın son haftalarında <strong>Ayvalık Cunda turumuz</strong> üç farklı tarihte düzenlenmektedir:</p>
<ul>
  <li><strong>1 Ağustos Cumartesi:</strong> <a href="/tours/ayvalik-cunda-turu-1-agustos-2026">Ayvalık Cunda Turu</a></li>
  <li><strong>16 Ağustos Pazar:</strong> <a href="/tours/ayvalik-cunda-turu-16-agustos-2026">Ayvalık Cunda Turu</a></li>
  <li><strong>30 Ağustos Pazar:</strong> <a href="/tours/ayvalik-cunda-turu-30-agustos-2026">Ayvalık Cunda Turu</a></li>
</ul>
<p>Fiyat: 1.750 TL · Günübirlik · Şeytan Sofrası, Sanat Köy, Cunda Adası programı.</p>
<p><a href="/ege-turu">Tüm Ege turları →</a> · <a href="/blog/temmuz-2026-cerkezkoy-tur-takvimi-guncel">Temmuz takvimi</a> · <a href="/contact">Rezervasyon</a></p>
`,
  },
  {
    title: 'Çerkezköyden Ege Turları 2026 | Ayvalık, Ada ve Assos Rotaları',
    slug: 'cerkezkoy-ege-turlari-2026-rehber',
    summary:
      'Çerkezköyden Ege turları: Ayvalık, Gökçeada, Bozcaada, Assos, Kaz Dağları. Mesafe, süre ve program karşılaştırması.',
    focusKeyword: 'çerkezköy ege turları',
    metaDescription:
      'Çerkezköy Ege turları 2026 rehberi. Ayvalık, Gökçeada, Bozcaada, Assos günübirlik rotalar. Fiyat ve program bilgisi.',
    keywords: ['çerkezköy ege turu', 'ege turları', 'ada turları çerkezköy', 'ayvalık çerkezköy', 'assos turu'],
    image: '/images/gokceada-12.07.jpeg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>Trakya'dan Ege'ye: En Popüler Rotalar</h2>
<p>Çerkezköy, Tekirdağ ve Çorlu çıkışlı <a href="/ege-turu"><strong>Ege turlarımız</strong></a> yaz sezonunun en çok tercih edilen programlarıdır.</p>

<h3>Öne Çıkan Ege Turları</h3>
<ul>
  <li><a href="/tours/ayvalik-cunda-turu-28-haziran-2026">Ayvalık – Cunda</a> — 1.750 TL, çoklu tarih</li>
  <li><a href="/tours/gokceada-turu-12-temmuz-2026">Gökçeada</a> — 1.800 TL, deniz molası</li>
  <li><a href="/tours/bozcaada-turu-26-temmuz-2026">Bozcaada</a> — 1.800 TL, ada sokakları</li>
  <li><a href="/tours/canakkale-kaz-daglari-turu-15-temmuz-2026">Kaz Dağları</a> — 1.750 TL, doğa</li>
  <li><a href="/tours/assos-turu">Assos</a> — Ege kıyı köyleri</li>
</ul>

<p><a href="/cerkezkoy-gunubirlik-turlar">Çerkezköy günübirlik turlar</a> · <a href="/blog/gokceada-vs-bozcaada-ada-turlari-karsilastirma">Ada karşılaştırması</a></p>
`,
  },
  {
    title: 'Çerkezköy Yaz Tatili Turları 2026 | Ada ve Deniz Rotları',
    slug: 'cerkezkoy-yaz-tatili-turlari-2026',
    summary:
      'Çerkezköy yaz tatili turları: Gökçeada, Bozcaada, Ayvalık deniz ve ada programları. Aileler ve gruplar için günübirlik öneriler.',
    focusKeyword: 'çerkezköy yaz tatili turu',
    metaDescription:
      'Çerkezköy yaz tatili turları 2026. Ada turları, deniz molası, plaj programları. Gökçeada, Bozcaada, Ayvalık.',
    keywords: ['yaz tatili turu', 'çerkezköy yaz turları', 'deniz turu', 'plaj turu', 'aile turları'],
    image: '/images/bozcada-26.07.jpeg',
    featuredPost: false,
    readingTime: 7,
    content: `
<h2>Yazın En Güzel Kaçamağı: Ada Turları</h2>
<p>Çerkezköyden tek günde Ege adalarına ulaşmak mümkün. <strong>Yaz tatili turlarımız</strong> deniz, tarih ve yöresel lezzetleri bir arada sunar.</p>

<h3>Deniz Ağırlıklı Program</h3>
<p><a href="/blog/gokceada-turu-rehberi-2026-cerkezkoy">Gökçeada turu</a> Aydıncık plajında yaklaşık 3 saat deniz molası içerir — aileler için idealdir.</p>

<h3>Serbest Keşif</h3>
<p><a href="/blog/bozcaada-turu-rehberi-2026-cerkezkoy">Bozcaada</a> ve <a href="/blog/ayvalik-cunda-turu-rehberi-2026">Ayvalık Cunda</a> programlarında gün boyu serbest zaman bulunur.</p>

<p><a href="/tours?accommodationType=daily">Günübirlik turlar</a> · <a href="/annual-program">2026 program</a></p>
`,
  },
  {
    title: 'Trakya Çıkışlı Yurtdışı Tur Rehberi 2026 | Balkan ve Vizesiz Rotalar',
    slug: 'trakya-cikisli-yurtdisi-tur-rehberi-2026',
    summary:
      'Trakya çıkışlı yurtdışı tur avantajı: Edirne hattı, Balkan vizesiz ülkeler, ön kayıt. Çerkezköyden yurtdışı tur planlama rehberi.',
    focusKeyword: 'trakya çıkışlı yurtdışı tur',
    metaDescription:
      'Trakya çıkışlı yurtdışı tur rehberi. Balkan vizesiz rotalar, Edirne avantajı. Çerkezköy yurtdışı tur bilgisi.',
    keywords: ['trakya yurtdışı tur', 'edirne balkan turu', 'vizesiz tur', 'çerkezköy yurtdışı', 'balkan turu trakya'],
    image: '/images/hero-banner.jpg',
    featuredPost: false,
    readingTime: 8,
    content: `
<h2>Neden Trakya Çıkışlı?</h2>
<p>Çerkezköy ve Tekirdağ, <strong>Edirne ve Kapıkule hattına</strong> İstanbul'a kıyasla daha yakındır. Balkan turlarında bu mesafe avantajı yolculuk süresini kısaltır.</p>

<h3>Popüler Yurtdışı Destinasyonlar</h3>
<ul>
  <li>Sırbistan — Belgrad</li>
  <li>Bosna Hersek — Saraybosna, Mostar</li>
  <li>Karadağ — Budva, Kotor</li>
  <li>Kuzey Makedonya — Ohrid, Üsküp</li>
</ul>

<p><a href="/balkan-turlari">Balkan turları sayfası</a> · <a href="/blog/balkan-turlari-2026-rehberi-vizesiz">Detaylı Balkan rehberi</a> · <a href="/contact">Ön kayıt</a></p>
`,
  },
];

async function seedAugustBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    let created = 0;
    let updated = 0;

    for (const blog of augustBlogs) {
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

    console.log(`\n📊 Özet: ${created} yeni, ${updated} güncellendi`);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAugustBlogs();
