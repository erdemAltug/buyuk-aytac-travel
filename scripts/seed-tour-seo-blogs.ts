/**
 * Tur odaklı SEO blog yazıları — upsert by slug
 * Kullanım: npx tsx scripts/seed-tour-seo-blogs.ts
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

const tourBlogs = [
  {
    title: 'Haziran 2026 Çerkezköy Tur Takvimi | Günübirlik ve Konaklamalı',
    slug: 'haziran-2026-cerkezkoy-tur-takvimi',
    summary:
      'Haziran 2026 Çerkezköy tur tarihleri: Kapadokya, Safranbolu, Bursa, Saklı İstanbul, Assos, Isparta gül hasadı ve daha fazlası. Güncel fiyatlar ve programlar.',
    focusKeyword: 'haziran 2026 çerkezköy turları',
    metaDescription:
      'Haziran 2026 Çerkezköyden kalkan turlar takvimi. Kapadokya, Safranbolu, Bursa, İstanbul ve Ege turları. Erken rezervasyon fırsatları.',
    keywords: ['haziran 2026 turlar', 'çerkezköy tur takvimi', 'çerkezköy haziran turları'],
    image: '/images/kapadokya-19-21-june.jpeg',
    featuredPost: true,
    readingTime: 10,
    content: `
<h2>Haziran 2026: Çerkezköyden Kaçırılmayacak Turlar</h2>
<p><strong>Haziran 2026 Çerkezköy turları</strong> ile baharın sonu ve yazın başlangıcını en güzel rotalarda geçirebilirsiniz. <a href="/annual-program">2026 yıllık tur programımızı</a> inceleyerek tüm tarihlere ulaşabilirsiniz.</p>

<h3>Öne Çıkan Haziran Turları</h3>
<ul>
  <li><strong>5-7 Haziran:</strong> <a href="/tours/isparta-gul-hasadi-salda-golu-pamukkale-turu-5-7-haziran-2026">Isparta Gül Hasadı – Salda – Pamukkale</a> (6.000 TL, konaklamalı)</li>
  <li><strong>7 Haziran:</strong> <a href="/tours/omercili-sakli-gol-agva-deniz-feneri-goksu-nehri-tekne-turu-sile">Ömerli – Ağva – Şile</a> (günübirlik)</li>
  <li><strong>13-14 Haziran:</strong> <a href="/tours/safranbolu-turu-13-14-haziran-2026">Safranbolu & Amasra</a> (5.300 TL)</li>
  <li><strong>13 Haziran:</strong> <a href="/tours/bursa-misi-koyu-golyazi-mudanya-turu-13-haziran-2026">Bursa – Gölyazı – Mudanya</a> (kahvaltı dahil)</li>
  <li><strong>14 Haziran:</strong> <a href="/tours/sakli-istanbul-turu">Saklı İstanbul Turu</a></li>
  <li><strong>19-21 Haziran:</strong> <a href="/tours/kapadokya-turu-19-21-haziran-2026">Kapadokya Turu</a> (5.900 TL, balon seyri)</li>
</ul>

<h3>Günübirlik mi Konaklamalı mı?</h3>
<p>Hafta sonu kaçamak için <a href="/tours?accommodationType=daily">günübirlik turlar</a>, 2-3 günlük tatil için <a href="/tours?accommodationType=with_accommodation">konaklamalı paketler</a> idealdir.</p>
<p><a href="/contact">Rezervasyon ve bilgi</a> · <a href="/cerkezkoy-tur">Çerkezköy turları ana sayfa</a></p>
`,
  },
  {
    title: 'Kapadokya Turu 2026 | Balon, Peri Bacaları ve Konaklama Rehberi',
    slug: 'kapadokya-turu-2026-cerkezkoy-rehberi',
    summary:
      'Çerkezköyden Kapadokya turu 19-21 Haziran 2026. Göreme, Derinkuyu, Ihlara Vadisi, balon seyri ve yarım pansiyon konaklama rehberi.',
    focusKeyword: 'kapadokya turu çerkezköy',
    metaDescription:
      'Kapadokya turu 2026 Çerkezköy çıkışlı. 19-21 Haziran, 5.900 TL. Balon seyri, yeraltı şehri ve peri bacaları. Büyük Aytaç Travel.',
    keywords: ['kapadokya turu', 'kapadokya turu 2026', 'çerkezköy kapadokya turu', 'kapadokya konaklamalı tur'],
    image: '/images/kapadokya-19-21-june.jpeg',
    featuredPost: true,
    readingTime: 9,
    content: `
<h2>Çerkezköyden Kapadokya: Rüya Gibi Bir Hafta Sonu</h2>
<p><a href="/tours/kapadokya-turu-19-21-haziran-2026"><strong>Kapadokya turumuz</strong></a> ile Göreme Açık Hava Müzesi, Paşabağları, Avanos çömlek atölyeleri, Hayal Vadisi ve Üç Güzelleri tek programda keşfediyorsunuz.</p>

<h3>2. Gün: Balon ve Yeraltı</h3>
<p>Sabahın ilk ışıklarında sıcak hava balonlarının kalkışını izleme fırsatı (hava şartlarına bağlı), Güvercinlik Vadisi, Uçhisar ve <strong>Derinkuyu Yeraltı Şehri</strong> programın öne çıkan durakları arasında.</p>

<h3>Fiyata Neler Dahil?</h3>
<ul>
  <li>Lüks otobüs ile ulaşım</li>
  <li>1 gece yarım pansiyon otel (cumartesi akşam yemeği + pazar kahvaltı)</li>
  <li>Kokartlı rehber ve seyahat sigortası</li>
</ul>
<p>Müze girişleri için Müzekart önerilir. <a href="/tours/kapadokya-turu-19-21-haziran-2026">Tur detayı ve rezervasyon →</a></p>
`,
  },
  {
    title: 'Safranbolu Amasra Turu | 13-14 Haziran Konaklamalı Gezi',
    slug: 'safranbolu-amasra-turu-rehberi-2026',
    summary:
      'Safranbolu ve Amasra 2 gün 1 gece turu. Yörük Köyü, Cam Teras, Kemere Köprüsü. Çerkezköyden 13-14 Haziran 2026.',
    focusKeyword: 'safranbolu turu çerkezköy',
    metaDescription:
      'Safranbolu Amasra turu 13-14 Haziran 2026, 5.300 TL. UNESCO mirası konaklar, Cam Teras ve Karadeniz. Çerkezköy çıkışlı.',
    keywords: ['safranbolu turu', 'amasra turu', 'safranbolu konaklamalı tur', 'çerkezköy safranbolu'],
    image: '/images/safranbolu-14-june.jpeg',
    featuredPost: false,
    readingTime: 8,
    content: `
<h2>Safranbolu & Amasra: Tarih ve Deniz Bir Arada</h2>
<p><a href="/tours/safranbolu-turu-13-14-haziran-2026">Safranbolu turumuz</a> Cuma gece hareketle başlar; Yörük Köyü, Kaymakamlar Gezi Evi, Cam Teras ve Amasra ile dolu bir hafta sonu sunar.</p>

<h3>Program Özeti</h3>
<p><strong>1. gün:</strong> Safranbolu tarihi çarşılar, lokum, Cam Teras — otelde akşam yemeği.<br>
<strong>2. gün:</strong> Amasra, Kemere Köprüsü, müze — Çerkezköy dönüş.</p>

<p>Benzer rotayı Temmuz ayında <a href="/tours/lavanta-hasadi-salda-golu-pamukkale-turu-4-5-temmuz-2026">lavanta hasadı programımızla</a> da deneyimleyebilirsiniz.</p>
<p><a href="/tours?accommodationType=with_accommodation">Tüm konaklamalı turlar →</a></p>
`,
  },
  {
    title: 'Assos Turu | Behramkale, Athena Tapınağı ve Ağva Çevresi',
    slug: 'assos-turu-cerkezkoy-gunubirlik-rehber',
    summary:
      'Çerkezköyden Assos turu: Yeşilyurt, Adatepe, Assos Antik Kent, Athena Tapınağı. 29 Mayıs 2026 günübirlik program.',
    focusKeyword: 'assos turu',
    metaDescription:
      'Assos turu Çerkezköy çıkışlı. Behramkale, Athena Tapınağı, Ağva ve Göksu. Günübirlik Ege turu. Büyük Aytaç Travel.',
    keywords: ['assos turu', 'behramkale turu', 'çerkezköy assos turu', 'ege günübirlik tur'],
    image: '/images/assos-29-may.jpeg',
    featuredPost: false,
    readingTime: 7,
    content: `
<h2>Assos: Ege’nin Tarih ve Doğa Harikası</h2>
<p><a href="/tours/assos-turu"><strong>Assos turumuz</strong></a> ile Çanakkale Boğazı ve Edremit Körfezi güzergâhında unutulmaz bir gün geçirirsiniz.</p>

<h3>Öne Çıkan Duraklar</h3>
<ul>
  <li>Yeşilyurt Köyü ve tarihi cami</li>
  <li>Adatepe taş evleri ve dondurma molası</li>
  <li>Assos Antik Kent ve Athena Tapınağı manzarası</li>
</ul>
<p>Tekne turu ve öğle yemekleri ekstra hizmetlerdir. <a href="/tours/assos-turu">Assos tur detayı →</a></p>
<p>Yaz dönemi için <a href="/tours/omercili-sakli-gol-agva-deniz-feneri-goksu-nehri-tekne-turu-sile">Şile – Ağva – Ömerli programımıza</a> da göz atın.</p>
`,
  },
  {
    title: 'Saklı İstanbul Turu | Sarıyer, Rumeli Feneri ve Garipçe',
    slug: 'sakli-istanbul-turu-rehberi-cerkezkoy',
    summary:
      'Saklı İstanbul turu: Sarıyer, Rumeli Feneri, Garipçe, Bentler Tabiat Parkı. 14 Haziran 2026 Çerkezköy çıkışlı günübirlik.',
    focusKeyword: 'saklı istanbul turu',
    metaDescription:
      'Saklı İstanbul turu 14 Haziran 2026. Sarıyer, Rumeli Feneri, Garipçe köyü. Çerkezköyden günübirlik İstanbul turu.',
    keywords: ['saklı istanbul turu', 'rumeli feneri turu', 'çerkezköy istanbul turu', 'sarıyer turu'],
    image: '/images/istanbul-14-june.jpeg',
    featuredPost: false,
    readingTime: 6,
    content: `
<h2>İstanbul’un Saklı Güzelliklerini Keşfedin</h2>
<p>Kalabalık turistik noktalar yerine <a href="/tours/sakli-istanbul-turu">Saklı İstanbul turumuz</a> ile doğa ve tarih iç içe bir rota sunuyoruz.</p>

<h3>Rota</h3>
<p>Sarıyer börekçisi ile güne başlangıç, Kuş Gözlem Kulesi, Garipçe Köyü, Rumeli Feneri, Bentler Tabiat Parkı ve Eğri Kemer… Ortalama 21:00’de Çerkezköy’e varış.</p>
<p><a href="/tours?accommodationType=daily">Diğer günübirlik İstanbul ve çevre turları →</a></p>
`,
  },
  {
    title: 'Bursa Gölyazı Mudanya Turu | Kahvaltı Dahil Günübirlik',
    slug: 'bursa-golyazi-mudanya-turu-kahvalti-dahil',
    summary:
      'Bursa Cumalıkızık kahvaltısı dahil tur: Misi Köyü, Gölyazı, Mudanya Mütareke Evi. 13 Haziran 2026 Çerkezköy çıkışlı.',
    focusKeyword: 'bursa turu kahvaltı dahil',
    metaDescription:
      'Bursa Gölyazı Mudanya turu kahvaltı dahil. Cumalıkızık, Ulubat Gölü, Ağlayan Çınar. 13 Haziran 2026 Çerkezköy.',
    keywords: ['bursa turu', 'gölyazı turu', 'cumalıkızık turu', 'çerkezköy bursa turu'],
    image: '/images/bursa-13-june.jpeg',
    featuredPost: false,
    readingTime: 7,
    content: `
<h2>Bursa: Yeşil, Tarih ve Göl Manzaraları</h2>
<p><a href="/tours/bursa-misi-koyu-golyazi-mudanya-turu-13-haziran-2026">Bursa turumuzda</a> <strong>Cumalıkızık’ta kahvaltı dahildir</strong> — Osmanlı köy atmosferinde güne keyifli bir başlangıç.</p>

<h3>Program</h3>
<ul>
  <li>Cumalıkızık köy gezisi</li>
  <li>Misi Köyü ve Gölyazı (Ağlayan Çınar)</li>
  <li>Gölyazı tekne turu (ekstra)</li>
  <li>Mudanya Mütareke Evi</li>
</ul>
<p><a href="/tours/bursa-misi-koyu-golyazi-mudanya-turu-13-haziran-2026">Tur detayı ve rezervasyon →</a></p>
`,
  },
  {
    title: 'Isparta Gül Hasadı ve Salda Gölü Turu | 5-7 Haziran 2026',
    slug: 'isparta-gul-hasadi-salda-golu-turu-rehber',
    summary:
      'Isparta gül hasadı deneyimi, Salda Gölü ve Pamukkale. 5-7 Haziran 2026, 6.000 TL yarım pansiyon. Çerkezköy çıkışlı.',
    focusKeyword: 'isparta gül hasadı turu',
    metaDescription:
      'Isparta gül hasadı turu 5-7 Haziran 2026. Salda Gölü, Pamukkale travertenleri. 6.000 TL konaklamalı. Çerkezköy.',
    keywords: ['isparta gül hasadı', 'salda gölü turu', 'gül hasadı turu', 'pamukkale turu'],
    image: '/images/isparta-5-7-june.jpeg',
    featuredPost: true,
    readingTime: 8,
    content: `
<h2>Gül Kokulu Bir Hafta Sonu: Isparta’dan Pamukkale’ye</h2>
<p><a href="/tours/isparta-gul-hasadi-salda-golu-pamukkale-turu-5-7-haziran-2026"><strong>Isparta Gül Hasadı turumuz</strong></a> ile Güneykent’te kendi güllerinizi toplama deneyimi yaşarsınız.</p>

<h3>1. Gün</h3>
<p>Gül yağı fabrikası, Gül Evi, Salda Gölü (“Türkiye’nin Maldivleri”), Isparta halı-kilim müzesi — Denizli’de konaklama.</p>

<h3>2. Gün</h3>
<p>Pamukkale travertenleri, Hierapolis, Kleopatra Havuzu, Denizli tekstil alışverişi — dönüş.</p>

<p>Temmuz ayında lavanta temalı benzer program: <a href="/tours/lavanta-hasadi-salda-golu-pamukkale-turu-4-5-temmuz-2026">Lavanta Hasadı turu →</a></p>
`,
  },
  {
    title: 'Şile Ağva Ömerli Turu | Karadeniz Günübirlik Doğa Rotası',
    slug: 'sile-agva-omercili-gunubirlik-tur-rehber',
    summary:
      'Ömerli, Saklı Göl, Ağva, Göksu Nehri ve Şile günübirlik turu. 7 Haziran 2026. Çerkezköyden Karadeniz doğa turu.',
    focusKeyword: 'şile ağva turu',
    metaDescription:
      'Şile Ağva Ömerli turu 7 Haziran 2026. Göksu tekne turu, Şile feneri, Ağva. Çerkezköyden günübirlik doğa turu.',
    keywords: ['şile turu', 'ağva turu', 'ömerli turu', 'çerkezköy şile turu', 'karadeniz günübirlik'],
    image: '/images/sile-7-june.jpeg',
    featuredPost: false,
    readingTime: 7,
    content: `
<h2>İstanbul’un Yeşil Sahilleri: Tek Günde Doğa Turu</h2>
<p><a href="/tours/omercili-sakli-gol-agva-deniz-feneri-goksu-nehri-tekne-turu-sile">Ömerli – Ağva – Şile turumuz</a> orman tünelleri, nehir kenarları ve Karadeniz manzarasıyla dolu bir gün sunar.</p>

<h3>Öne Çıkanlar</h3>
<ul>
  <li>Ömerli ve Saklı Göl</li>
  <li>Ağva deniz feneri ve köy pazarı</li>
  <li>Göksu Nehri tekne turu (ekstra)</li>
  <li>Şile Feneri panoramik görünüm</li>
</ul>
<p><a href="/tours?accommodationType=daily">Tüm günübirlik turlar →</a></p>
`,
  },
  {
    title: 'Salda Gölü ve Pamukkale Turu | Lavanta ve Gül Programları',
    slug: 'salda-golu-pamukkale-turu-karsilastirma',
    summary:
      'Salda Gölü ve Pamukkale turları: Isparta gül hasadı (Haziran) ve lavanta hasadı (Temmuz) programları karşılaştırması.',
    focusKeyword: 'salda gölü pamukkale turu',
    metaDescription:
      'Salda Gölü ve Pamukkale birlikte: Isparta gül hasadı ve lavanta turları. Tarihler, fiyatlar ve program farkları.',
    keywords: ['salda gölü turu', 'pamukkale turu', 'lavanta turu', 'salda gölü pamukkale'],
    image: '/images/pamukkale-4-5-july.jpeg',
    featuredPost: false,
    readingTime: 8,
    content: `
<h2>Salda ve Pamukkale: İki Farklı Mevsim, Aynı Büyü</h2>
<p>Türkiye’nin “Maldivleri” <strong>Salda Gölü</strong> ile dünyaca ünlü <strong>Pamukkale travertenleri</strong>ni aynı pakette sunan iki özel programımız var:</p>

<h3>Haziran: Gül Hasadı</h3>
<p><a href="/tours/isparta-gul-hasadi-salda-golu-pamukkale-turu-5-7-haziran-2026">5-7 Haziran 2026 · 6.000 TL</a> — Güneykent gül hasadı deneyimi.</p>

<h3>Temmuz: Lavanta Hasadı</h3>
<p><a href="/tours/lavanta-hasadi-salda-golu-pamukkale-turu-4-5-temmuz-2026">4-5 Temmuz 2026 · 6.000 TL</a> — Kuyucak lavanta köyü ve Sagalassos.</p>

<p>Her iki turda yarım pansiyon konaklama ve kokartlı rehber dahildir. <a href="/contact">Bilgi alın →</a></p>
`,
  },
  {
    title: 'Temmuz 2026 Turları | Lavanta, Kapadokya ve Yaz Rotları',
    slug: 'temmuz-2026-cerkezkoy-turlari',
    summary:
      'Temmuz 2026 Çerkezköy turları: Lavanta hasadı, Salda, Pamukkale ve yaz günübirlik programları. Erken rezervasyon önerileri.',
    focusKeyword: 'temmuz 2026 turlar',
    metaDescription:
      'Temmuz 2026 Çerkezköyden kalkan turlar. Lavanta hasadı Salda Pamukkale 4-5 Temmuz. Yaz tatili tur paketleri.',
    keywords: ['temmuz 2026 turlar', 'lavanta turu temmuz', 'yaz turları çerkezköy'],
    image: '/images/pamukkale-4-5-july.jpeg',
    featuredPost: false,
    readingTime: 7,
    content: `
<h2>Temmuz Ayında Çerkezköyden Nereye Gidilir?</h2>
<p>Yazın ilk haftasında <a href="/tours/lavanta-hasadi-salda-golu-pamukkale-turu-4-5-temmuz-2026">lavanta hasadı turumuz</a> en çok tercih edilen konaklamalı programlardan biridir.</p>

<p>Isparta lavanta tarlaları, Salda Gölü’nün turkuaz suları ve Pamukkale’nin beyaz terasları — hepsi tek pakette.</p>

<p>Günübirlik alternatifler için <a href="/tours?accommodationType=daily">yaz günübirlik turlar</a> ve <a href="/annual-program">yıllık takvim</a> sayfalarımıza bakın.</p>
`,
  },
  {
    title: 'Çerkezköy Tur Fiyatları 2026 | Güncel Liste ve İpuçları',
    slug: 'cerkezkoy-tur-fiyatlari-2026-guncel-liste',
    summary:
      '2026 Çerkezköy tur fiyatları: günübirlik 1.250-1.750 TL, konaklamalı 5.300-6.000 TL aralığı. Güncel turlar ve erken rezervasyon.',
    focusKeyword: 'çerkezköy tur fiyatları 2026',
    metaDescription:
      'Çerkezköy tur fiyatları 2026 güncel. Günübirlik ve konaklamalı tur ücretleri. Kapadokya, Safranbolu, Bursa fiyat listesi.',
    keywords: ['çerkezköy tur fiyatları', 'tur fiyatları 2026', 'günübirlik tur fiyatı'],
    image: '/images/safranbolu-14-june.jpeg',
    featuredPost: false,
    readingTime: 6,
    content: `
<h2>2026 Tur Fiyatları Nasıl Belirlenir?</h2>
<p>Fiyatlar; mesafe, konaklama, yemek dahil hizmetler ve sezon yoğunluğuna göre değişir. Örnek güncel programlar:</p>

<ul>
  <li><a href="/tours/sakli-istanbul-turu">Saklı İstanbul</a> — ekonomik günübirlik</li>
  <li><a href="/tours/assos-turu">Assos</a> — Ege günübirlik</li>
  <li><a href="/tours/safranbolu-turu-13-14-haziran-2026">Safranbolu</a> — 5.300 TL / 2 gün 1 gece</li>
  <li><a href="/tours/kapadokya-turu-19-21-haziran-2026">Kapadokya</a> — 5.900 TL</li>
  <li><a href="/tours/isparta-gul-hasadi-salda-golu-pamukkale-turu-5-7-haziran-2026">Isparta Gül Hasadı</a> — 6.000 TL</li>
</ul>

<p><a href="/tours">Tüm turlar ve güncel fiyatlar →</a> · TÜRSAB belgeli <a href="/cerkezkoy-tur">Büyük Aytaç Travel</a></p>
`,
  },
  {
    title: 'Çerkezköyden Hafta Sonu Kaçamak | 1 Gece 2 Gün Tur Önerileri',
    slug: 'cerkezkoy-hafta-sonu-kacamak-konaklamali-turlar',
    summary:
      'Çerkezköyden hafta sonu kaçamak: Safranbolu, Kapadokya, Isparta-Salda-Pamukkale konaklamalı tur önerileri ve rezervasyon.',
    focusKeyword: 'çerkezköy hafta sonu turu',
    metaDescription:
      'Çerkezköy hafta sonu kaçamak turlar. 1 gece 2 gün Safranbolu, Kapadokya, Salda Pamukkale. Konaklamalı tur paketleri.',
    keywords: ['hafta sonu turu', 'çerkezköy hafta sonu', 'konaklamalı tur', 'kısa tatil çerkezköy'],
    image: '/images/kapadokya-19-21-june.jpeg',
    featuredPost: false,
    readingTime: 7,
    content: `
<h2>Hafta Sonuna Uzaklaşın: Konaklamalı Tur Önerileri</h2>
<p>Çerkezköy’den Cuma veya Cumartesi hareketli <a href="/tours?accommodationType=with_accommodation">konaklamalı turlarımız</a> ile plan yapmadan kaçamak yapabilirsiniz.</p>

<h3>En Popüler 3 Rota</h3>
<ol>
  <li><strong>Tarih:</strong> <a href="/tours/safranbolu-turu-13-14-haziran-2026">Safranbolu – Amasra</a></li>
  <li><strong>Doğa:</strong> <a href="/tours/kapadokya-turu-19-21-haziran-2026">Kapadokya</a></li>
  <li><strong>Gül & Deniz:</strong> <a href="/tours/isparta-gul-hasadi-salda-golu-pamukkale-turu-5-7-haziran-2026">Isparta – Salda – Pamukkale</a></li>
</ol>

<p><a href="/cerkezkoy-konakamali-turlar">Konaklamalı turlar sayfası →</a></p>
`,
  },
];

async function seedTourBlogs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı\n');

    let created = 0;
    let updated = 0;

    for (const blog of tourBlogs) {
      const payload = {
        title: blog.title,
        slug: blog.slug,
        content: blog.content.trim(),
        summary: blog.summary,
        image: blog.image,
        author: 'Büyük Aytaç Travel',
        categories: ['Tur Rehberi', 'Çerkezköy', 'SEO', '2026 Turlar'],
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

    console.log(`\n📊 Özet: ${created} yeni, ${updated} güncellendi (toplam ${tourBlogs.length} yazı)`);
  } catch (error) {
    console.error('❌ Hata:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedTourBlogs();
