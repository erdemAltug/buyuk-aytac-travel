import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await dbConnect();

    // Check if SEO blogs already exist
    const existingBlogs = await Blog.countDocuments({
      slug: {
        $in: [
          'cerkezkoy-tur-firmalari-karsilastirma',
          'cerkezkoy-tur-paketleri-2026',
          'cerkezkoyden-en-populer-tur-rotalari',
          'gunubirlik-tur-nedir-kimler-katilmall'
        ]
      }
    });

    if (existingBlogs > 0) {
      return NextResponse.json({
        success: false,
        message: 'SEO blog yazıları zaten mevcut'
      });
    }

    // New SEO-optimized blog posts
    const seoBlogs = [
      {
        title: 'Çerkezköy Tur Firmaları Karşılaştırma',
        slug: 'cerkezkoy-tur-firmalari-karsilastirma',
        content: `
<h2>Çerkezköy Tur Firmaları: Hangi Firmayı Seçmelisiniz?</h2>

<p>Çerkezköy ve çevresinde faaliyet gösteren birçok tur firması bulunmaktadır. Doğru firmayı seçmek, tatil deneyiminizin kalitesini doğrudan etkiler. Bu yazımızda, <strong>Çerkezköy tur firmaları</strong> arasında nasıl seçim yapacağınızı detaylı olarak anlatacağız.</p>

<h3>Neden Büyük Aytaç Travel'ı Tercih Etmelisiniz?</h3>

<p>Büyük Aytaç Travel, Çerkezköy bölgesinin en deneyimli tur firmalarından biridir. 20 yılı aşkın sektör deneyimi ile thousands of mutlu müşteriye hizmet vermektedir. Firmamız, <strong>günübirlik tur</strong> ve <strong>konaklamalı tur</strong> paketlerinde en uygun fiyatları sunmaktadır.</p>

<h3>Tur Firması Seçerken Nelere Dikkat Etmelisiniz?</h3>

<ul>
  <li><strong>Firma Deneyimi:</strong> Sektörde ne kadar süredir faaliyet gösteriyor?</li>
  <li><strong>Müşteri Yorumları:</strong> Önceki müşterilerin deneyimleri nasıl?</li>
  <li><strong>Fiyat Politikası:</strong> Gizli maliyetler var mı?</li>
  <li><strong>Hizmet Kalitesi:</strong> Rehberler profesyonel mi?</li>
  <li><strong>Güvenlik:</strong> Araçlar ve sürücüler güvenli mi?</li>
</ul>

<h3>Çerkezköy Tur Paketleri</h3>

<p>Çerkezköy'den düzenlenen turlar genellikle şu kategorilere ayrılır:</p>

<ul>
  <li><strong>Günübirlik Turlar:</strong> Tek gün içinde başlayıp biten, İstanbul, Bursa, Safranbolu gibi destinasyonlara düzenlenen turlar.</li>
  <li><strong>Konaklamalı Turlar:</strong> 2-7 gece konaklamalı, Kapadokya, Karadeniz, Ege gibi bölgelere düzenlenen turlar.</li>
  <li><strong>Özel Gruplar:</strong> Aile, arkadaş grupları veya kurumsal etkinlikler için özel olarak düzenlenen turlar.</li>
</ul>

<h3>Bütçe Planlaması</h3>

<p>Tur fiyatları belirlerken dikkat edilmesi gereken hususlar:</p>

<ul>
  <li>Kişi başı fiyat ne içeriyor?</li>
  <li>Yemek ve konaklama dahil mi?</li>
  <li>Giriş ücretleri pakete dahil mi?</li>
  <li>Ekstra harcamalar neler olabilir?</li>
</ul>

<h3>Sonuç</h3>

<p><strong>Çerkezköy tur</strong> firmaları arasında seçim yaparken, güvenilirlik, fiyat ve hizmet kalitesi dengesini gözetmelisiniz. Büyük Aytaç Travel olarak, şeffaf fiyat politikamız ve profesyonel hizmet anlayışımızla fark yaratıyoruz. Hemen bizimle iletişime geçerek size özel tur teklifi alın!</p>

<p>Detaylı bilgi ve rezervasyon için: <a href="https://www.buyukaytactravel.com/tours">Turlarımızı inceleyin</a></p>
`,
        summary: 'Çerkezköy tur firmaları karşılaştırması. Doğru tur firması seçimi için dikkat edilmesi gerekenler ve Büyük Aytaç Travel avantajları.',
        image: '/images/blogs/cerkezkoy-tur-firmalari.jpg',
        author: 'Büyük Aytaç Travel',
        categories: ['Seyahat Tavsiyeleri', 'Çerkezköy'],
        tags: ['çerkezköy tur', 'tur firmaları', 'günübirlik tur', 'konaklamalı tur', 'çerkezköy turlar'],
        isPublished: true,
        isFeatured: true,
        seo: {
          metaTitle: 'Çerkezköy Tur Firmaları Karşılaştırma 2026 | Büyük Aytaç Travel',
          metaDescription: 'Çerkezköy tur firmaları karşılaştırması. En iyi Çerkezköy tur firmasını seçmek için dikkat edilmesi gerekenler ve fiyat karşılaştırması.',
          keywords: ['çerkezköy tur firmaları', 'çerkezköy tur', 'günübirlik tur', 'konaklamalı tur', 'çerkezköy tur paketleri']
        }
      },
      {
        title: 'Çerkezköy Tur Paketleri 2026',
        slug: 'cerkezkoy-tur-paketleri-2026',
        content: `
<h2>2026 Yılı Çerkezköy Tur Paketleri</h2>

<p>2026 yılında Çerkezköy'den düzenlenecek tur paketleri hazır! Büyük Aytaç Travel olarak, size en uygun <strong>Çerkezköy tur paketleri 2026</strong> seçeneklerini sunuyoruz. Bu yazımızda 2026 yılının popüler tur paketlerini ve fiyatlarını inceleyeceğiz.</p>

<h3>Günübirlik Tur Paketleri</h3>

<p>Günübirlik turlar, yoğun iş temposinden uzaklaşmak isteyenler için ideal seçeneklerdir. 2026 yılı günübirlik tur paketlerimiz:</p>

<ul>
  <li><strong>İstanbul Turu:</strong> Tarihi yarımada, Sultanahmet, Kapalıçarşı - ₺1.500</li>
  <li><strong>Bursa Turu:</strong> Uludağ teleferik, Cumalıkızık, tarihi çarşı - ₺1.800</li>
  <li><strong>Safranbolu Turu:</strong> Tarihi konaklar, Hızlı Çarşı, Karabük - ₺1.600</li>
  <li><strong>Eskişehir Turu:</strong> Odunpazarı, Sazova Park, Bilim Kurdu - ₺1.400</li>
</ul>

<h3>Konaklamalı Tur Paketleri</h3>

<p>Konaklamalı turlar, daha derin ve rahatlatıcı tatil deneyimleri sunar. 2026 yılı konaklamalı tur paketlerimiz:</p>

<ul>
  <li><strong>Kapadokya 3 Gün 2 Gece:</strong> Balon turu, yeraltı şehirleri, üzüm bağları - ₺8.500</li>
  <li><strong>Karadeniz 4 Gün 3 Gece:</strong> Yaylalar, şelaleler, trabzon, rize - ₺9.900</li>
  <li><strong>Ege Turu 5 Gün 4 Gece:</strong> Efes, Pamukkale, Kuşadası, İzmir - ₺11.500</li>
  <li><strong>GAP Turu 6 Gün 5 Gece:</strong> Göbeklitepe, Nemrut, Şanlıurfa, Gaziantep - ₺14.900</li>
</ul>

<h3>Özel Gruplar İçin Paketler</h3>

<p>Aile piknikleri, okul gezileri ve kurumsal etkinlikler için özel tur paketleri de sunuyoruz. Grup büyüklüğüne göre özel indirimlerimiz mevcuttur.</p>

<h3>2026 Yılı Yenilikleri</h3>

<p>2026 yılında turlarımıza eklediğimiz yeni özellikler:</p>

<ul>
  <li>Online rezervasyon sistemi</li>
  <li>Sanal tur önizleme</li>
  <li>7/24 müşteri desteği</li>
  <li>Esnek iptal politikası</li>
  <li>Seyahat sigortası dahil paketler</li>
</ul>

<h3>Erken Rezervasyon Avantajları</h3>

<p>2026 yılı turlarımızda erken rezervasyon yapan müşterilerimize özel indirimler sunuyoruz:</p>

<ul>
  <li>%15 erken rezervasyon indirimi (60 gün öncesine kadar)</li>
  <li>%10 erken rezervasyon indirimi (30 gün öncesine kadar)</li>
  <li>Grup indirimleri (8+ kişi)</li>
  <li>Çift kişi rezervasyonlarında ikinci kişiye %20 indirim</li>
</ul>

<h3>Nasıl Rezervasyon Yapılır?</h3>

<p>1. İlgilendiğiniz tur paketini seçin</p>
<p>2. Rezervasyon formunu doldurun</p>
<p>3. Onay maili alın</p>
<p>4. Ödemeyi tamamlayın</p>

<p>Hemen şimdi <strong>Çerkezköy tur</strong> paketlerinizi ayırtmak için bizimle iletişime geçin!</p>

<p>Detaylı bilgi: <a href="https://www.buyukaytactravel.com/contact">İletişim</a></p>
`,
        summary: '2026 yılı Çerkezköy tur paketleri. Günübirlik ve konaklamalı tur fiyatları, erken rezervasyon avantajları ve yeni tur programları.',
        image: '/images/blogs/cerkezkoy-tur-paketleri-2026.jpg',
        author: 'Büyük Aytaç Travel',
        categories: ['Tur Paketleri', 'Çerkezköy'],
        tags: ['çerkezköy tur paketleri 2026', 'çerkezköy tur', 'günübirlik tur', 'konaklamalı tur', '2026 tur', 'erken rezervasyon'],
        isPublished: true,
        isFeatured: true,
        seo: {
          metaTitle: 'Çerkezköy Tur Paketleri 2026 | En Uygun Fiyatlar',
          metaDescription: '2026 Çerkezköy tur paketleri. Günübirlik ve konaklamalı turlar, erken rezervasyon avantajları ve özel grup paketleri.',
          keywords: ['çerkezköy tur paketleri 2026', 'çerkezköy tur', 'günübirlik tur fiyatları', 'konaklamalı tur fiyatları', '2026 tur paketleri']
        }
      },
      {
        title: "Çerkezköy'den En Popüler Tur Rotaları",
        slug: 'cerkezkoyden-en-populer-tur-rotalari',
        content: `
<h2>Çerkezköy'den En Popüler Tur Rotaları</h2>

<p>Çerkezköy, Türkiye'nin en gelişmiş sanayi merkezlerinden biri olmasının yanı sıra, çevresinde birçok turistik destinasyona ev sahipliği yapmaktadır. Bu yazımızda, <strong>Çerkezköy'den en popüler tur rotaları</strong>nı detaylı olarak inceleyeceğiz.</p>

<h3>1. İstanbul Turu - Tarihin Başkenti</h3>

<p>Çerkezköy'den sadece 1 saat mesafede olan İstanbul, günübirlik turlar için en popüler destinasyondur.</p>

<ul>
  <li><strong>Süre:</strong> 1 gün</li>
  <li><strong>Mesafe:</strong> 70 km</li>
  <li><strong>Gezilecek Yerler:</strong> Sultanahmet Camii, Aya Sofya, Kapalıçarşı, Topkapi Sarayı, Boğaz turu</li>
  <li><strong>Özellikler:</strong> Tarihi ve kültürel zenginlik, gastronomi deneyimi</li>
</ul>

<h3>2. Bursa Turu - Yeşil Şehir</h3>

<p>Bursa, doğal güzellikleri ve tarihi mekanlarıyla ünlüdür.</p>

<ul>
  <li><strong>Süre:</strong> 1-2 gün</li>
  <li><strong>Mesafe:</strong> 150 km</li>
  <li><strong>Gezilecek Yerler:</strong> Uludağ, Cumalıkızık, Uluabat Gölü, Koza Han, Kapalı Çarşı</li>
  <li><strong>Özellikler:</strong> Kayak, doğa yürüyüşü, tarihi çarşılar</li>
</ul>

<h3>3. Safranbolu Turu - Tarihi Konaklar</h3>

<p>UNESCO Dünya Mirası Listesi'nde yer alan Safranbolu, Osmanlı dönemi mimarisiyle büyüler.</p>

<ul>
  <li><strong>Süre:</strong> 1-2 gün</li>
  <li><strong>Mesafe:</strong> 280 km</li>
  <li><strong>Gezilecek Yerler:</strong> Hızlı Çarşı, Cinci Han, tarihi konaklar, Safran bahçeleri</li>
  <li><strong>Özellikler:</strong> Otantik atmosfer, safran ürünleri</li>
</ul>

<h3>4. Kapadokya Turu - Peri Bacaları Diyarı</h3>

<p>Kapadokya, dünya'nın en benzersiz manzaralarından birine sahiptir.</p>

<ul>
  <li><strong>Süre:</strong> 3 gün 2 gece</li>
  <li><strong>Mesafe:</strong> 550 km</li>
  <li><strong>Gezilecek Yerler:</strong> Balon turu, Derinkuyu yeraltı şehri, Paşabağı, Ürgüp, Avanos</li>
  <li><strong>Özellikler:</strong> Balon turu, yeraltı şehirleri, şarap tadımı</li>
</ul>

<h3>5. Karadeniz Turu - Yeşilin Bin Bir Tonu</h3>

<p>Karadeniz'in eşsiz yaylaları ve doğal güzellikleri sizi bekliyor.</p>

<ul>
  <li><strong>Süre:</strong> 4-5 gün</li>
  <li><strong>Mesafe:</strong> 700 km</li>
  <li><strong>Gezilecek Yerler:</strong> Uzungöl, Ayder Yaylası, Sümela Manastırı, Trabzon, Rize</li>
  <li><strong>Özellikler:</strong> Yayla turizmi, şelaleler, karalahana yemekleri</li>
</ul>

<h3>6. Eskişehir Turu - Gençlik Şehri</h3>

<p>Eskişehir, modern ve kültürel yapısıyla dikkat çekmektedir.</p>

<ul>
  <li><strong>Süre:</strong> 1 gün</li>
  <li><strong>Mesafe:</strong> 120 km</li>
  <li><strong>Gezilecek Yerler:</strong> Odunpazarı evleri, Sazova Parkı, Bilim Kurdu, Kent Park</li>
  <li><strong>Özellikler:</strong> Müze ziyareti, doğa aktiviteleri, gençlik atmosferi</li>
</ul>

<h3>7. Trakya Turu - Gizli Cennetler</h3>

<p>Trakya bölgesi, bilinmeyen güzellikleriyle keşfedilmeyi bekliyor.</p>

<ul>
  <li><strong>Süre:</strong> 2-3 gün</li>
  <li><strong>Mesafe:</strong> 100-200 km</li>
  <li><strong>Gezilecek Yerler:</strong> İğneada, Longoz Ormanları, Edirne Sarayı, Selimiye Camii</li>
  <li><strong>Özellikler:</strong> Doğa, kuş gözlemi, tarihi mekanlar</li>
</ul>

<h3>Tur Seçiminde Dikkat Edilecekler</h3>

<ul>
  <li>Süre ve mesafe</li>
  <li>Mevsim ve hava koşulları</li>
  <li>Bütçe</li>
  <li>İlgi alanları</li>
  <li>Konaklama tercihleri</li>
</ul>

<p><strong>Çerkezköy tur</strong> rotalarımız hakkında daha fazla bilgi almak için tıklayın!</p>
`,
        summary: "Çerkezköy'den düzenlenen en popüler tur rotaları. İstanbul, Bursa, Safranbolu, Kapadokya ve Karadeniz turları için detaylı bilgiler.",
        image: '/images/blogs/cerkezkoy-populer-tur-rotalari.jpg',
        author: 'Büyük Aytaç Travel',
        categories: ['Destinasyonlar', 'Çerkezköy'],
        tags: ['çerkezköy tur rotaları', 'çerkezköy tur', 'popüler turlar', 'günübirlik tur rotaları', 'hafta sonu turları'],
        isPublished: true,
        isFeatured: true,
        seo: {
          metaTitle: "Çerkezköy'den En Popüler Tur Rotaları 2026 | Büyük Aytaç Travel",
          metaDescription: "Çerkezköy'den en popüler tur rotaları. İstanbul, Bursa, Safranbolu, Kapadokya, Karadeniz turları ve rotaları.",
          keywords: ['çerkezköy tur rotaları', 'çerkezköy tur', 'en popüler turlar', 'hafta sonu turları', 'günübirlik tur']
        }
      },
      {
        title: 'Günübirlik Tur Nedir? Kimler Katılmalı?',
        slug: 'gunubirlik-tur-nedir-kimler-katilmall',
        content: `
<h2>Günübirlik Tur Nedir?</h2>

<p><strong>Günübirlik tur</strong>, tek bir gün içinde başlayıp biten, konaklama içermeyen tur türüdür. Genellikle sabah erken saatlerde başlar ve akşam geç saatlerde sona erer. Bu tür turlar, kısa süreli tatil arayanlar için ideal bir seçenektir.</p>

<h3>Günübirlik Tur Özellikleri</h3>

<ul>
  <li><strong>Süre:</strong> 8-14 saat</li>
  <li><strong>Konaklama:</strong> Yok (aynı gün dönüş)</li>
  <li><strong>Ulaşım:</strong> Genellikle otobüs veya minibüs</li>
  <li><strong>Yemek:</strong> Genellikle 1 öğle yemeği dahil</li>
  <li><strong>Rehber:</strong> Profesyonel tur rehberi eşliğinde</li>
</ul>

<h3>Günübirlik Turların Avantajları</h3>

<ul>
  <li><strong>Zaman Tasarrufu:</strong> Hafta sonu veya yoğun iş temposunda bile katılabilirsiniz</li>
  <li><strong>Maliyet:</strong> Konaklamalı turlara göre daha uygun fiyatlı</li>
  <li><strong Esneklik:</strong> Planlama ve rezervasyon kolaylığı</li>
  <li><strong Rahatlık:</strong> Valiz derdi olmadan gezebilirsiniz</li>
  <li><strong>Deneyim:</strong> Kısa sürede çok sayıda yer görebilirsiniz</li>
</ul>

<h3>Kimler Günübirlik Turlara Katılmalı?</h3>

<h4>1. Yoğun İş Hayatı Olanlar</h4>
<p>Günübirlik turlar, uzun tatil planlayamayan ancak gezmek isteyenler için mükemmel bir çözümdür. Hafta sonu bir gününüzü değerlendirerek yeni yerler keşfedebilirsiniz.</p>

<h4>2. Aileler</h4>
<p>Çocuklu aileler için günübirlik turlar idealdir. Çocukların uzun yolculuklarda sıkılması veya yorulması sorun olmadan keyifli bir gün geçirebilirsiniz.</p>

<h4>3. Öğrenciler</h4>
<p>Bütçe kısıtlı olan öğrenciler için uygun fiyatlı günübirlik turlar harika bir seçenektir. Arkadaş gruplarıyla organize olup güzel bir gün geçirebilirsiniz.</p>

<h4>4. Yaşlılar</h4>
<p>Uzun süreli turlara katılması zor olan yaşlılar için günübirlik turlar rahat bir alternatif sunar.</p>

<h4>5. Tarih ve Kültür Meraklıları</h4>
<p>Farklı şehirleri ve kültürel mekanları kısa sürede keşfetmek isteyenler için günübirlik turlar birebirdir.</p>

<h4>6. Yeni Bir Şehirde Yaşayanlar</h4>
<p>Yeni taşındığınız şehri ve çevresini keşfetmek için günübirlik turlar harika bir başlangıç noktasıdır.</p>

<h3>Günübirlik Tur Türleri</h3>

<ul>
  <li><strong>Tarihi Şehir Turları:</strong> İstanbul, Edirne, Safranbolu gibi tarihi şehirler</li>
  <li><strong>Doğa Turları:</strong> Yaylalar, ormanlar, göller</li>
  <li><strong>Deniz ve Plaj Turları:</strong> Kıyı bölgeleri</li>
  <li><strong>Termal ve Spa Turları:</strong> Kaplıca ve termal merkezler</li>
  <li><strong>Gastronomi Turları:</strong> Yöresel lezzet turları</li>
</ul>

<h3>Günübirlik Tura Hazırlık</h3>

<ul>
  <li>Rahat kıyafetler ve ayakkabılar giyin</li>
  <li>Hava durumunu kontrol edin</li>
  <li>Yanınıza az miktarda nakit alın</li>
  <li>Fotoğraf makinesi veya telefon şarjınızı doldurun</li>
  <li>Hafif atıştırmalıklar ve su bulundurun</li>
  <li>Rehberinizi dinleyin ve soru sormaktan çekinmeyin</li>
</ul>

<h3>Çerkezköy'den Günübirlik Turlar</h3>

<p>Büyük Aytaç Travel olarak, Çerkezköy ve çevresinden birçok günübirlik tur düzenliyoruz:</p>

<ul>
  <li>İstanbul günübirlik tur</li>
  <li>Bursa günübirlik tur</li>
  <li>Safranbolu günübirlik tur</li>
  <li>Eskişehir günübirlik tur</li>
  <li>Trakya günübirlik tur</li>
</ul>

<p>Hemen <strong>günübirlik tur</strong> rezervasyonu yaptırmak için bizimle iletişime geçin!</p>

<p>Detaylı bilgi ve rezervasyon: <a href="https://www.buyukaytactravel.com/tours">Turlarımız</a></p>
`,
        summary: 'Günübirlik tur nedir, kimler katılmalı? Günübirlik turların avantajları, türleri ve Çerkezköyden düzenlenen günübirlik tur seçenekleri.',
        image: '/images/blogs/gunubirlik-tur-nedir.jpg',
        author: 'Büyük Aytaç Travel',
        categories: ['Seyahat Tavsiyeleri', 'Tur Rehberi'],
        tags: ['günübirlik tur', 'günübirlik tur nedir', 'kimler katılmalı', 'çerkezköy günübirlik tur', 'hafta sonu turları'],
        isPublished: true,
        isFeatured: true,
        seo: {
          metaTitle: 'Günübirlik Tur Nedir? Kimler Katılmalı? | Büyük Aytaç Travel',
          metaDescription: 'Günübirlik tur nedir, kimler katılmalı? Günübirlik turların avantajları, türleri ve en popüler günübirlik tur rotaları.',
          keywords: ['günübirlik tur', 'günübirlik tur nedir', 'günübirlik tur kimler katılır', 'hafta sonu tur', 'günübirlik tur avantajları']
        }
      }
    ];

    // Insert all SEO blogs
    const insertedBlogs = await Blog.insertMany(seoBlogs);

    return NextResponse.json({
      success: true,
      message: `${insertedBlogs.length} SEO blog yazısı başarıyla eklendi`,
      data: insertedBlogs.map(blog => ({
        title: blog.title,
        slug: blog.slug
      }))
    });

  } catch (error) {
    console.error('SEO blog ekleme hatası:', error);
    return NextResponse.json(
      { success: false, error: 'Blog ekleme sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
