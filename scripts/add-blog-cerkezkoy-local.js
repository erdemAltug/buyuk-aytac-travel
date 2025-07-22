import mongoose from 'mongoose';

// MongoDB bağlantısı - doğru URI kullan
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:494314Ae@buyuk-aytac-travel.j3jwoww.mongodb.net/?retryWrites=true&w=majority&appName=Buyuk-Aytac-Travel');
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    process.exit(1);
  }
};

// Blog şeması
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    summary: { type: String, required: true },
    author: { type: String, required: true },
    categories: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Model oluştur
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

// Blog oluştur
async function createBlog() {
  try {
    await connectDB();

    const blog = {
      title: "Çerkezköy'den En İyi 10 Günübirlik Tur Rotası | 2025 Rehberi",
      slug: "cerkezkoyden-en-iyi-10-gunubirlik-tur-rotasi",
      summary: "Çerkezköy'den kolay ulaşım imkanı bulunan en güzel günübirlik tur destinasyonları. 1-3 saat mesafedeki tarihi, doğal ve kültürel yerler.",
      content: `# Çerkezköy'den En İyi 10 Günübirlik Tur Rotası

Çerkezköy'ün Trakya'daki stratejik konumu sayesinde, çok sayıda güzel destinasyona kolayca günübirlik tur düzenleyebilirsiniz. İstanbul'dan Edirne'ye, Bursa'dan Kıyıköy'e kadar birçok tarihi ve doğal güzellik sadece birkaç saatlik mesafede. İşte Çerkezköy'den çıkabileceğiniz en güzel günübirlik tur rotaları:

## 1. İstanbul Tarihi Yarımada Turu (2 Saat Mesafe)

**Mesafe:** 110 km - Yaklaşık 2 saat  
**En İyi Ziyaret Zamanı:** Tüm mevsimler  
**Öne Çıkan Yerler:**
- Sultanahmet Camii (Mavi Cami)
- Ayasofya Müzesi
- Topkapı Sarayı
- Kapalıçarşı
- Galata Kulesi

Çerkezköy'den sabah erken saatlerde yola çıkarak İstanbul'da tam bir gün geçirebilirsiniz. Tarihi Yarımada'daki Bizans ve Osmanlı eserlerini görmek, Boğaz manzarasının tadını çıkarmak ve İstanbul mutfağını deneyimlemek için ideal bir rota.

## 2. Edirne Kültür ve Tarih Turu (1.5 Saat Mesafe)

**Mesafe:** 90 km - Yaklaşık 1.5 saat  
**En İyi Ziyaret Zamanı:** İlkbahar ve sonbahar  
**Öne Çıkan Yerler:**
- Selimiye Camii (UNESCO Dünya Mirası)
- Eski Cami
- Edirne Müzesi
- Tunca Nehri Kenarı
- Macedonian Tower

Mimar Sinan'ın şaheseri Selimiye Camii'ni görmek için Edirne mükemmel bir seçim. Ayrıca Edirne'nin meşhur ciğeri ve peynirini tatma fırsatı da bulabilirsiniz.

## 3. Bursa ve Uludağ Turu (3 Saat Mesafe)

**Mesafe:** 180 km - Yaklaşık 3 saat  
**En İyi Ziyaret Zamanı:** Kış (kayak) ve yaz (doğa)  
**Öne Çıkan Yerler:**
- Bursa Ulu Cami
- Cumalıkızık Köyü
- Uludağ Teleferik
- İznik Gölü
- Bursa Çarşıları

Osmanlı'nın ilk başkenti Bursa'yı gezmek ve Uludağ'ın doğal güzelliklerini keşfetmek için harika bir rota. Kış aylarında kayak, yaz aylarında doğa yürüyüşü yapabilirsiniz.

## 4. Çanakkale ve Truva Antik Kenti (2.5 Saat Mesafe)

**Mesafe:** 150 km - Yaklaşık 2.5 saat  
**En İyi Ziyaret Zamanı:** İlkbahar ve sonbahar  
**Öne Çıkan Yerler:**
- Truva Antik Kenti ve Truva Atı
- Çanakkale Şehitler Abidesi
- Gelibolu Yarımadası
- Kilitbahir Kalesi
- Çanakkale Savaşları Müzesi

Tarihe yolculuk yapmak isteyenler için ideal bir destinasyon. Truva'nın efsanevi hikayesini keşfedebilir, Çanakkale'nin önemli tarihini öğrenebilirsiniz.

## 5. Kıyıköy Karadeniz Sahili (1 Saat Mesafe)

**Mesafe:** 60 km - Yaklaşık 1 saat  
**En İyi Ziyaret Zamanı:** Yaz ayları  
**Öne Çıkan Yerler:**
- Kıyıköy Plajı
- Aya Nikola Manastırı
- Kıyıköy Kasabası
- Midye ve balık restoranları
- Karadeniz manzarası

En yakın Karadeniz deneyimi için Kıyıköy harika bir seçim. Temiz hava, sakin plaj ve taze deniz ürünleri ile rahatlatıcı bir gün geçirebilirsiniz.

## 6. Adalar Feribot Turu (2.5 Saat Mesafe)

**Mesafe:** 120 km + feribot - Yaklaşık 3 saat  
**En İyi Ziyaret Zamanı:** İlkbahar ve yaz  
**Öne Çıkan Yerler:**
- Büyükada fayton turu
- Heybeliada doğa yürüyüşü
- Kinaliada sessiz plajlar
- Ada evleri ve mimari
- Deniz manzaralı restoranlar

Şehir gürültüsünden uzaklaşmak için Adalar mükemmel. Faytonla ada turunu dolaşabilir, deniz kenarında balık yiyebilirsiniz.

## 7. Şile ve Ağva Doğa Turu (2 Saat Mesafe)

**Mesafe:** 130 km - Yaklaşık 2 saat  
**En İyi Ziyaret Zamanı:** Yaz ayları  
**Öne Çıkan Yerler:**
- Şile Feneri
- Ağva Nehir ağzı
- Polonezköy Doğa Parkı
- Şile plajları
- Göksu Nehri

Karadeniz'in doğal güzellikleri ile iç içe olmak isteyenler için ideal. Ağva'da tekne turu yapabilir, Şile'de denize girebilirsiniz.

## 8. Tekirdağ Rakoczi Müzesi ve Bağbozumu Turu (30 Dakika Mesafe)

**Mesafe:** 25 km - Yaklaşık 30 dakika  
**En İyi Ziyaret Zamanı:** Sonbahar (bağbozumu)  
**Öne Çıkan Yerler:**
- Rakoczi Müzesi
- Tekirdağ bağları
- Tekirdağ köfte evleri
- Ertuğrul Gazi Türbesi
- Tekirdağ sahil bandı

En yakın destinasyon olarak Tekirdağ, tarihi müzesi ve meşhur köfteleri ile güzel bir günübirlik tur imkanı sunuyor.

## 9. Saray Köyü Plajları (45 Dakika Mesafe)

**Mesafe:** 35 km - Yaklaşık 45 dakika  
**En İyi Ziyaret Zamanı:** Yaz ayları  
**Öne Çıkan Yerler:**
- Saray plajları
- Marmara Denizi kıyısı
- Balık restoranları
- Göçmen kuş gözlem alanları
- Saray Köyü merkezi

Deniz özlemi çekenler için en yakın seçenek. Sakin ve temiz plajları ile aile gezileri için idealdir.

## 10. Vize Kalesi ve Tarih Turu (1 Saat Mesafe)

**Mesafe:** 50 km - Yaklaşık 1 saat  
**En İyi Ziyaret Zamanı:** Tüm mevsimler  
**Öne Çıkan Yerler:**
- Vize Kalesi
- Hagia Sophia Kilisesi
- Vize Müzesi
- Bizans dönemi kalıntıları
- Vize çarşısı

Tarih meraklıları için Bizans döneminden kalma eserleri barındıran Vize, yakın bir kültür turu imkanı sunuyor.

## Tur Planlama İpuçları

### Ulaşım Tavsiyeleri:
- **Özel araç:** En esnek seçenek, istediğiniz saatte dönebilirsiniz
- **Otobüs turları:** Büyük Aytaç Travel ile organized tours
- **Toplu taşıma:** Bütçe dostu ama zaman sınırlı

### Maliyet Hesabı:
- **Yakın destinasyonlar (0-1 saat):** 300-500 TL/kişi
- **Orta mesafe (1-2 saat):** 500-800 TL/kişi  
- **Uzak destinasyonlar (2-3 saat):** 800-1200 TL/kişi

### En İyi Rezervasyon Zamanları:
- **Hafta içi:** %20-30 daha uygun fiyatlar
- **Erken rezervasyon:** 2 hafta öncesi %15 indirim
- **Grup rezervasyonları:** 8+ kişi %25 indirim

## Sonuç

Çerkezköy'den çıkabileceğiniz bu 10 muhteşem günübirlik tur rotası, farklı ilgi alanlarına hitap ediyor. Tarihi yerlerden doğal güzelliklere, kültürel deneyimlerden gastronomi turlarına kadar geniş bir yelpaze sunuluyor.

**Büyük Aytaç Travel** olarak, tüm bu destinasyonlara düzenli turlar düzenliyoruz. Çerkezköy'den konforlu araçlarımızla, deneyimli rehberlerimiz eşliğinde unutulmaz günübirlik deneyimler yaşayabilirsiniz.

Rezervasyon için: **0530 060 95 59** veya [online rezervasyon formumuz](/contact) üzerinden bize ulaşabilirsiniz.`,
      
      author: "Büyük Aytaç Travel",
      image: "/images/blogs/cerkezkoy-gunubirlik-turlar.jpg",
      categories: ["Günübirlik Turlar", "Çerkezköy", "Tekirdağ", "Seyahat Rehberi"],
      isPublished: true,
      publishDate: new Date(),
    };

    const newBlog = await Blog.create(blog);
    console.log(`Blog yazısı başarıyla oluşturuldu: "${newBlog.title}"`);
  } catch (error) {
    if (error.code === 11000) {
      console.log('Bu blog yazısı zaten mevcut (slug duplicate)');
    } else {
      console.error('Blog oluşturma hatası:', error);
    }
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı');
  }
}

createBlog(); 