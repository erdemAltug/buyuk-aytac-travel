/**
 * Çerkezköy SEO blog yazıları — upsert by slug
 * Kullanım: npx tsx scripts/seed-cerkezkoy-seo-blogs.ts
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

const blogs = [
  {
    title: 'Çerkezköyden Kalkan Turlar 2026 | Yurtiçi Tur Rehberi',
    slug: 'cerkezkoyden-kalkan-turlar-2026',
    summary:
      'Çerkezköy, Çorlu ve Tekirdağdan kalkan 2026 yurtiçi turlar. Günübirlik ve konaklamalı seçenekler, popüler rotalar ve rezervasyon ipuçları.',
    focusKeyword: 'çerkezköyden kalkan turlar',
    metaDescription:
      'Çerkezköyden kalkan turlar 2026: İstanbul, Bursa, Safranbolu, Assos ve daha fazlası. Büyük Aytaç Travel ile güvenli yolculuk.',
    keywords: ['çerkezköyden kalkan turlar', 'çerkezköy tur', 'çerkezköy turlar 2026', 'trakya tur'],
    image: '/images/istanbul-14-june.jpeg',
    featuredPost: true,
    readingTime: 8,
    content: `
<h2>Çerkezköyden Kalkan Turlar: 2026 Rehberi</h2>
<p><strong>Çerkezköyden kalkan turlar</strong>, Trakya bölgesinde yaşayan misafirlerimiz için İstanbul, Marmara ve Karadeniz hatlarını tek günde veya konaklamalı olarak keşfetme fırsatı sunar. <a href="/cerkezkoy-tur">Çerkezköy tur</a> sayfamızdan tüm programları inceleyebilir, <a href="/tours?tourType=domestic">yurtiçi turlar</a> listesinden güncel tarihleri görebilirsiniz.</p>

<h3>Çerkezköy Neden İdeal Bir Kalkış Noktası?</h3>
<p>Çerkezköy; İstanbul, Bursa, Safranbolu ve Ege kıyılarına otobüsle kolay ulaşım sağlar. Büyük Aytaç Travel olarak merkez ofisimizden hareket eden turlarımızda TÜRSAB güvencesi, kokartlı rehber ve lüks araç filosu standarttır.</p>

<h3>2026 Öne Çıkan Rotalar</h3>
<ul>
  <li><a href="/tours/sakli-istanbul-turu">Saklı İstanbul Turu</a> — Sarıyer, Rumeli Feneri, Garipçe</li>
  <li><a href="/tours/omercili-sakli-gol-agva-deniz-feneri-goksu-nehri-tekne-turu-sile">Ömerli – Ağva – Şile Turu</a> — günübirlik doğa turu</li>
  <li><a href="/tours/assos-turu">Assos Turu</a> — Behramkale ve Athena Tapınağı</li>
  <li><a href="/tours/safranbolu-turu-13-14-haziran-2026">Safranbolu & Amasra</a> — 2 gün 1 gece konaklamalı</li>
</ul>

<h3>Günübirlik mi, Konaklamalı mı?</h3>
<p>Hafta içi veya hafta sonu kısa kaçamak için <a href="/tours?accommodationType=daily">günübirlik turlar</a> idealdir. Kapadokya, Safranbolu veya Karadeniz gibi uzak destinasyonlar için <a href="/cerkezkoy-konakamali-turlar">konaklamalı turlar</a> tercih edilir.</p>

<p><strong>Rezervasyon:</strong> <a href="/contact">İletişim</a> sayfamızdan veya <a href="/annual-program">2026 tur takviminden</a> size uygun tarihi seçin.</p>
`,
  },
  {
    title: 'Çerkezköy Günübirlik Tur Rehberi | Hafta Sonu Kaçamakları',
    slug: 'cerkezkoy-gunubirlik-tur-rehberi',
    summary:
      'Çerkezköy günübirlik tur seçenekleri, fiyatlar, hazırlık listesi ve en popüler hafta sonu rotaları hakkında kapsamlı rehber.',
    focusKeyword: 'çerkezköy günübirlik tur',
    metaDescription:
      'Çerkezköy günübirlik tur rehberi: İstanbul, Bursa, Şile, Assos ve daha fazlası. Hafta sonu kaçamakları için ipuçları.',
    keywords: ['çerkezköy günübirlik tur', 'günübirlik tur', 'hafta sonu turu çerkezköy'],
    image: '/images/sile-7-june.jpeg',
    featuredPost: true,
    readingTime: 7,
    content: `
<h2>Çerkezköy Günübirlik Tur: Kimler İçin Uygundur?</h2>
<p><strong>Çerkezköy günübirlik tur</strong> paketleri; sabah erken hareket, akşam dönüş konseptiyle çalışır. Yoğun iş temposunda olanlar, aileler ve fotoğraf meraklıları için ekonomik ve pratik bir seçenektir. Tüm <a href="/cerkezkoy-gunubirlik-turlar">Çerkezköy günübirlik turlarımızı</a> buradan filtreleyebilirsiniz.</p>

<h3>Fiyata Genelde Neler Dahildir?</h3>
<ul>
  <li>Lüks otobüs ile ulaşım</li>
  <li>Kokartlı profesyonel rehber</li>
  <li>Zorunlu seyahat sigortası</li>
  <li>Program dahilinde şehir ve çevre gezileri</li>
</ul>
<p>Öğle yemeği, müze girişleri ve ekstra aktiviteler çoğu turda hariç tutulur; detaylar tur sayfasında belirtilir.</p>

<h3>Önerilen Günübirlik Rotalar</h3>
<p><a href="/tours?tourType=domestic&accommodationType=daily">Günübirlik yurtiçi turlar</a> arasında öne çıkanlar:</p>
<ul>
  <li>Bursa şehir ve Cumalıkızık turları</li>
  <li>Eskişehir Odunpazarı ve Sazova programları</li>
  <li>Karadeniz kıyısı: Şile, Ağva, Saklı Göl hattı</li>
  <li>Assos – Yeşilyurt – Adatepe doğa ve tarih turu</li>
</ul>

<h3>Rezervasyon Öncesi İpuçları</h3>
<p>Rahat ayakkabı, mevsime uygun kıyafet ve kimlik belgesi yanınızda olsun. Kontenjan sınırlı turlarda erken <a href="/tours">rezervasyon</a> yapmanızı öneririz.</p>
`,
  },
  {
    title: 'Çerkezköy Konaklamalı Tatil Turları | 2 Gün 1 Gece ve Üzeri',
    slug: 'cerkezkoy-konaklamali-tatil-turlari',
    summary:
      'Çerkezköyden konaklamalı tatil turları: Safranbolu, Kapadokya, Karadeniz. Otel, yarım pansiyon ve program detayları.',
    focusKeyword: 'çerkezköy konaklamalı tur',
    metaDescription:
      'Çerkezköy konaklamalı tur ve tatil paketleri. 2 gün 1 gece Safranbolu, Kapadokya ve Karadeniz turları.',
    keywords: ['çerkezköy konaklamalı tur', 'konaklamalı tur', 'çerkezköy tatil'],
    image: '/images/safranbolu-14-june.jpeg',
    featuredPost: false,
    readingTime: 6,
    content: `
<h2>Çerkezköy Konaklamalı Tur Nedir?</h2>
<p><strong>Çerkezköy konaklamalı tur</strong> paketlerinde bir veya daha fazla gece otelde konaklama, genellikle yarım pansiyon (kahvaltı + akşam yemeği) dahildir. <a href="/tours?accommodationType=with_accommodation">Konaklamalı turlar</a> sayfasından güncel programları inceleyin.</p>

<h3>Popüler Konaklamalı Programlar</h3>
<ul>
  <li><strong>Safranbolu – Amasra:</strong> Tarihi konaklar, Cam Teras, Kemere Köprüsü — <a href="/tours/safranbolu-turu-13-14-haziran-2026">detaylar</a></li>
  <li><strong>Kapadokya:</strong> Balon, peri bacaları, yeraltı şehirleri</li>
  <li><strong>Karadeniz:</strong> Yaylalar, Uzungöl, Ayder</li>
</ul>

<p>Çerkezköy çıkışlı tüm konaklamalı seçenekler için <a href="/cerkezkoy-konakamali-turlar">özel sayfamıza</a> göz atın veya <a href="/annual-program">yıllık takvimi</a> kontrol edin.</p>
`,
  },
  {
    title: 'Çerkezköy Tur Paketleri 2026 Güncel | Fiyat ve Program',
    slug: 'cerkezkoy-tur-paketleri-2026-guncel',
    summary:
      '2026 Çerkezköy tur paketleri güncel fiyat aralıkları, günübirlik ve konaklamalı programlar. TÜRSAB güvenceli rezervasyon.',
    focusKeyword: 'çerkezköy tur paketleri 2026',
    metaDescription:
      'Çerkezköy tur paketleri 2026 güncel listesi. Günübirlik 1.250 TL’den, konaklamalı 5.300 TL’den başlayan programlar.',
    keywords: ['çerkezköy tur paketleri', 'çerkezköy tur fiyatları 2026', 'tur paketi'],
    image: '/images/bursa-22-26.jpeg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>2026 Çerkezköy Tur Paketleri</h2>
<p>Büyük Aytaç Travel <strong>Çerkezköy tur paketleri 2026</strong> programında günübirlik ve konaklamalı seçenekleri bir arada sunuyor. Güncel turlar ve fiyatlar için <a href="/tours">tüm turlar</a> sayfasını ziyaret edin.</p>

<h3>Günübirlik Tur Fiyat Aralığı (2026)</h3>
<p>Destinasyona göre değişmekle birlikte günübirlik turlar yaklaşık <strong>1.250 – 1.750 TL</strong> kişi başı aralığındadır. Örnek programlar:</p>
<ul>
  <li>Saklı İstanbul Turu — 14 Haziran 2026</li>
  <li>Assos Turu — 29 Mayıs 2026</li>
  <li>Ömerli – Ağva – Şile — 7 Haziran 2026</li>
</ul>

<h3>Konaklamalı Tur Fiyat Aralığı</h3>
<p>2 gün 1 gece paketler (ör. Safranbolu & Amasra) <strong>5.300 TL</strong> civarından başlar; uzun süreli Kapadokya ve Karadeniz turları daha yüksek bütçe gerektirir.</p>

<h3>Neden Büyük Aytaç Travel?</h3>
<ul>
  <li>TÜRSAB belgeli acente (Belge No: 17674)</li>
  <li>Çerkezköy merkez ofis — kolay ulaşım</li>
  <li>Mercedes Travego / Tourismo araç filosu</li>
</ul>
<p><a href="/cerkezkoy-tur">Çerkezköy tur ana sayfa</a> · <a href="/contact">Rezervasyon</a></p>
`,
  },
  {
    title: 'İstanbul, Bursa ve Safranbolu: Çerkezköy Çıkışlı Tur Rotası',
    slug: 'istanbul-bursa-safranbolu-cerkezkoy-cikisli',
    summary:
      'Çerkezköyden İstanbul, Bursa ve Safranbolu turları. Mesafe, süre ve her rota için önerilen program türleri.',
    focusKeyword: 'çerkezköy istanbul tur',
    metaDescription:
      'Çerkezköy çıkışlı İstanbul, Bursa ve Safranbolu turları. Günübirlik ve konaklamalı rota karşılaştırması.',
    keywords: ['çerkezköy istanbul tur', 'çerkezköy bursa tur', 'çerkezköy safranbolu tur'],
    image: '/images/eskisehir-21-26.jpeg',
    featuredPost: false,
    readingTime: 7,
    content: `
<h2>Çerkezköyden En Çok Tercih Edilen 3 Rota</h2>

<h3>1. İstanbul ve Çevresi</h3>
<p><a href="/tours/sakli-istanbul-turu">Saklı İstanbul Turu</a> ile Sarıyer, Rumeli Feneri ve doğa parklarını keşfedin. Klasik İstanbul turları için <a href="/tours?tourType=domestic&destination=İstanbul">İstanbul turları</a> filtresini kullanın.</p>

<h3>2. Bursa</h3>
<p>Uludağ, Cumalıkızık ve tarihi çarşılar — <a href="/tours?tourType=domestic">yurtiçi turlar</a> içinde Bursa programlarına göz atın.</p>

<h3>3. Safranbolu & Amasra</h3>
<p>UNESCO mirası Safranbolu konakları ve Karadeniz kıyısı Amasra için <a href="/tours/safranbolu-turu-13-14-haziran-2026">13-14 Haziran 2026 turu</a> rezervasyonu yapılabilir.</p>

<p>Tüm rotalar <a href="/cerkezkoy-tur">Çerkezköy tur</a> sayfasında özetlenmiştir.</p>
`,
  },
  {
    title: 'Çerkezköy Tur Rezervasyonu Nasıl Yapılır? | Adım Adım',
    slug: 'cerkezkoy-tur-rezervasyonu-nasil-yapilir',
    summary:
      'Çerkezköy tur rezervasyonu: online, telefon ve ofisten rezervasyon. Ödeme, iptal ve tur öncesi hazırlık bilgileri.',
    focusKeyword: 'çerkezköy tur rezervasyon',
    metaDescription:
      'Çerkezköy tur rezervasyonu nasıl yapılır? Telefon, WhatsApp ve ofis rezervasyonu. Büyük Aytaç Travel rehberi.',
    keywords: ['çerkezköy tur rezervasyon', 'tur rezervasyonu', 'çerkezköy tur şirketi'],
    image: '/images/assos-29-may.jpeg',
    featuredPost: false,
    readingTime: 5,
    content: `
<h2>Çerkezköy Tur Rezervasyonu: 3 Kolay Yol</h2>
<ol>
  <li><strong>Web sitesi:</strong> <a href="/tours">Turlar</a> sayfasından tur seçin, detay sayfasında rezervasyon butonuna tıklayın.</li>
  <li><strong>Telefon / WhatsApp:</strong> 0539 345 95 59 veya 0532 286 01 59</li>
  <li><strong>Ofis:</strong> Çerkezköy merkez — <a href="/contact">adres ve çalışma saatleri</a></li>
</ol>

<h3>Rezervasyon Öncesi Kontrol Listesi</h3>
<ul>
  <li>Tur tarihi ve kalkış saati</li>
  <li>Fiyata dahil / hariç hizmetler</li>
  <li>Kimlik ve (varsa) öğrenci belgesi</li>
</ul>

<p>Güncel program için <a href="/annual-program">2026 yıllık tur programı</a> ve <a href="/blog">blog</a> yazılarımızı takip edin.</p>
`,
  },
];

async function seedBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı\n');

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
        categories: ['Çerkezköy', 'Tur Rehberi', 'SEO'],
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

seedBlogs();
