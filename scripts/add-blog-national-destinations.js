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
    metaDescription: { type: String },
    keywords: [{ type: String }],
    focusKeyword: { type: String },
    views: { type: Number, default: 0 },
    readingTime: { type: Number, default: 8 },
    featuredPost: { type: Boolean, default: false },
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
      title: "2025 Türkiye'nin En Güzel 25 Destinasyonu | Mutlaka Görülmesi Gereken Yerler",
      slug: "2025-turkiyenin-en-guzel-25-destinasyonu",
      summary: "Türkiye'nin dört bir yanından en güzel 25 destinasyonu. Doğal güzellikler, tarihi yerler ve kültürel zenginlikler rehberi.",
      metaDescription: "2025'te Türkiye'de gezilecek en güzel 25 yer. Doğal güzellikler, tarihi destinasyonlar ve kültürel zenginlikler. Tur rezervasyonu için Büyük Aytaç Travel.",
      focusKeyword: "türkiye gezilecek yerler",
      keywords: [
        "türkiye gezilecek yerler",
        "türkiye tatil yerleri",
        "türkiye destinasyonları",
        "türkiye tur rehberi",
        "türkiye seyahat rehberi",
        "en güzel yerler türkiye",
        "türkiye gezi rehberi",
        "türkiye görülecek yerler",
        "türkiye turizm rehberi",
        "türkiye doğal güzellikler"
      ],
      categories: ["destinasyon-rehberi", "yurtiçi-turlar", "seyahat-tavsiyeleri"],
      readingTime: 12,
      featuredPost: true,
      content: `# 2025 Türkiye'nin En Güzel 25 Destinasyonu

Türkiye, dört mevsimin yaşandığı eşsiz coğrafyası, zengin tarihi ve kültürel mirası ile dünya üzerinde en çok ziyaret edilen ülkeler arasında yer alıyor. Anadolu toprakları üzerinde binlerce yıllık medeniyetlerin izlerini taşıyan ülkemiz, her yıl milyonlarca yerli ve yabancı turisti ağırlıyor.

Bu kapsamlı rehberimizde, 2025 yılında Türkiye'de mutlaka görülmesi gereken en güzel 25 destinasyonu sizler için derledik. Her biri kendine has güzellikleri olan bu yerler, farklı deneyimler ve unutulmaz anılar sunuyor.

## 🏛️ TARİHİ VE KÜLTÜREL DESTİNASYONLAR

### 1. İstanbul - Tarihi Yarımada
**En İyi Ziyaret Zamanı:** Mart-Mayıs, Eylül-Kasım
**Geçirilecek Süre:** 3-5 gün

İstanbul, binlerce yıllık tarihi ile Doğu ve Batı kültürlerinin buluşma noktası. Sultanahmet Camii, Ayasofya, Topkapı Sarayı, Yerebatan Sarnıcı ve Galata Kulesi gibi ikonik yapıları ziyaret edebilirsiniz. Kapalıçarşı'da alışveriş yapabilir, Boğaz turu ile şehri farklı açıdan görebilirsiniz.

**Mutlaka Yapılması Gerekenler:**
- Ayasofya ve Sultanahmet Camii ziyareti
- Topkapı Sarayı ve hazine dairesi turu
- Boğaz turu ve Galata Kulesi manzarası
- Kapalıçarşı ve Mısır Çarşısı alışverişi
- Beyoğlu'nda gastronomi deneyimi

### 2. Kapadokya - Göreme Açık Hava Müzesi
**En İyi Ziyaret Zamanı:** Nisan-Haziran, Eylül-Kasım
**Geçirilecek Süre:** 2-3 gün

Dünya üzerinde eşi benzeri olmayan peri bacaları, yeraltı şehirleri ve balon turları ile ünlü Kapadokya, UNESCO Dünya Mirası listesinde yer alıyor. Göreme Açık Hava Müzesi'ndeki Bizans dönemi kiliseleri, Uçhisar Kalesi ve Derinkuyu Yeraltı Şehri görülmeye değer.

**Özel Deneyimler:**
- Gün doğumunda balon turu
- Kaya otellerde konaklama
- ATV ile vadi turu
- Çömlekçilik workshopu
- Güvercinlik Vadisi yürüyüşü

### 3. Efes Antik Kenti - İzmir
**En İyi Ziyaret Zamanı:** Mart-Mayıs, Ekim-Kasım
**Geçirilecek Süre:** 1 gün

Roma İmparatorluğu'nun en önemli şehirlerinden biri olan Efes, muhteşem Celsus Kütüphanesi, 25.000 kişilik Büyük Tiyatro ve Artemis Tapınağı kalıntıları ile ziyaretçilerini büyülüyor.

### 4. Pamukkale Travertenleri - Denizli
**En İyi Ziyaret Zamanı:** Tüm yıl
**Geçirilecek Süre:** 1-2 gün

Bembeyaz kalsiyum karbonat platolarıyla ünlü Pamukkale, şifalı termal suları ve Hierapolis Antik Kenti ile birlikte görülmesi gereken destinasyonlar arasında.

## 🏔️ DOĞAL GÜZELLİKLER

### 5. Ölüdeniz - Muğla
**En İyi Ziyaret Zamanı:** Mayıs-Ekim
**Geçirilecek Süre:** 3-5 gün

Türkiye'nin en güzel plajlarından biri olan Ölüdeniz, turkuaz rengi denizi ve yamaç paraşütü imkanları ile ünlü. Babadağ'dan yapılan yamaç paraşütü uçuşları unutulmaz deneyimler sunuyor.

### 6. Uzungöl - Trabzon
**En İyi Ziyaret Zamanı:** Haziran-Eylül
**Geçirilecek Süre:** 2-3 gün

Karadeniz'in incisi Uzungöl, yemyeşil doğası, sisli dağları ve göl kenarındaki ahşap evleri ile doğa severlerin favorisi. Çevresindeki yaylalarda doğa yürüyüşü yapabilir, yerel lezzetleri tadabilirsiniz.

### 7. Nemrut Dağı - Adıyaman
**En İyi Ziyaret Zamanı:** Mayıs-Ekim
**Geçirilecek Süre:** 1-2 gün

2.134 metre yükseklikteki Nemrut Dağı zirvesinde bulunan dev heykeller ve gün doğumu manzarası, unutulmaz bir deneyim sunuyor. UNESCO Dünya Mirası listesindeki bu antik tümülüs, tarih ve doğa severlerin mutlaka görmesi gereken yerlerden.

## 🏖️ SAHİL DESTİNASYONLARI

### 8. Antalya - Kaleiçi
**En İyi Ziyaret Zamanı:** Mart-Haziran, Eylül-Kasım
**Geçirilecek Süre:** 4-7 gün

Akdeniz'in incisi Antalya, tarihi Kaleiçi, Düden Şelalesi, antik tiyatrolar ve muhteşem sahilleri ile Türkiye'nin en popüler tatil destinasyonlarından. Konyaaltı ve Lara plajları, dünya çapında ünlü.

### 9. Bodrum - Muğla
**En İyi Ziyaret Zamanı:** Mayıs-Ekim
**Geçirilecek Süre:** 3-5 gün

Ege Denizi'nin en şık tatil merkezi Bodrum, Bodrum Kalesi, antik tiyatro, marina ve gece hayatı ile ünlü. Tekne turları ile çevredeki koyları keşfedebilirsiniz.

### 10. Çeşme - İzmir
**En İyi Ziyaret Zamanı:** Haziran-Eylül
**Geçirilecek Süre:** 3-4 gün

Ege'nin en sevilen tatil merkezlerinden Çeşme, Alaçatı'nın renkli evleri, rüzgar sörfü imkanları ve termal kaynakları ile dikkat çekiyor.

## 🌿 YAYLA VE DOĞA DESTİNASYONLARI

### 11. Ayder Yaylası - Rize
**En İyi Ziyaret Zamanı:** Haziran-Eylül
**Geçirilecek Süre:** 2-3 gün

Karadeniz'in en güzel yaylalarından Ayder, şifalı kaplıcaları, ahşap evleri ve çay bahçeleri ile doğa severlerin cenneti.

### 12. Uludağ - Bursa
**En İyi Ziyaret Zamanı:** Aralık-Mart (kış sporları), Haziran-Eylül (doğa)
**Geçirilecek Süre:** 2-3 gün

Türkiye'nin en eski kayak merkezi Uludağ, kış aylarında kayak imkanları, yaz aylarında doğa yürüyüşü ve piknik alanları sunuyor.

### 13. Abant Gölü - Bolu
**En İyi Ziyaret Zamanı:** Tüm yıl
**Geçirilecek Süre:** 1-2 gün

Doğa içinde huzurlu bir kaçamak için ideal olan Abant Gölü, çevresindeki yürüyüş parkurlararı ve piknik alanları ile aileler için mükemmel.

## 🏛️ ANTIK ŞEHIRLER VE ARKEOLOJİK ALANLAR

### 14. Göbeklitepe - Şanlıurfa
**En İyi Ziyaret Zamanı:** Ekim-Mayıs
**Geçirilecek Süre:** 1 gün

12.000 yıllık geçmişiyle insanlık tarihini yeniden yazan Göbeklitepe, dünyanın bilinen en eski tapınağı olarak kabul ediliyor.

### 15. Troya Antik Kenti - Çanakkale
**En İyi Ziyaret Zamanı:** Mart-Kasım
**Geçirilecek Süre:** 1 gün

Homeros'un İlyada destanıyla ünlü Troya, arkeoloji tutkunları ve tarih severlerin mutlaka görmesi gereken antik kentlerden.

### 16. Hierapolis - Pamukkale
**En İyi Ziyaret Zamanı:** Tüm yıl
**Geçirilecek Süre:** Yarım gün

Pamukkale travertenlerinin hemen yanında bulunan Hierapolis, antik tiyatrosu ve nekropolü ile görülmeye değer.

## 🏔️ KÜLTÜREL VE DOĞAL KARMA DESTİNASYONLAR

### 17. Safranbolu - Karabük
**En İyi Ziyaret Zamanı:** İlkbahar ve sonbahar
**Geçirilecek Süre:** 1-2 gün

Osmanlı döneminden kalma ahşap evleriyle UNESCO Dünya Mirası listesinde yer alan Safranbolu, adını aldığı safran bitkisi ve geleneksel mimarisiyle ünlü.

### 18. Amasya
**En İyi Ziyaret Zamanı:** Mart-Kasım
**Geçirilecek Süre:** 1-2 gün

Yeşilırmak kenarında kurulu Amasya, kaya mezarları, Osmanlı evleri ve tarihi köprüleriyle "Küçük Mısır" olarak anılıyor.

### 19. Mardin
**En İyi Ziyaret Zamanı:** Mart-Mayıs, Eylül-Kasım
**Geçirilecek Süre:** 2-3 gün

Mesopotamya ovalarına hakim tepede kurulu Mardin, taş evleri, medreseleri ve çok kültürlü yapısıyla eşsiz bir atmosfer sunuyor.

## 🌊 GİZLİ CENNETLER

### 20. Butterfly Valley - Muğla
**En İyi Ziyaret Zamanı:** Mayıs-Ekim
**Geçirilecek Süre:** 1-2 gün

Sadece denizden veya yürüyüşle ulaşılabilen Butterfly Valley, 80 farklı kelebek türüne ev sahipliği yapan el değmemiş doğal güzellik.

### 21. Kaş - Antalya
**En İyi Ziyaret Zamanı:** Mayıs-Ekim
**Geçirilecek Süre:** 3-4 gün

Akdeniz'in sakin ve romantik kasabası Kaş, antik tiyatrosu, dalış imkanları ve Yunan adası Meis'e tekne turları ile ünlü.

### 22. Şirince - İzmir
**En İyi Ziyaret Zamanı:** Tüm yıl
**Geçirilecek Süre:** Yarım gün

Şirin Rum köyü Şirince, dar taş sokakları, şarap üretimi ve geleneksel mimarisiyle ziyaretçilerini büyülüyor.

## 🏕️ MACERA VE DOĞA SPORLARI

### 23. Olympos - Antalya
**En İyi Ziyaret Zamanı:** Mart-Kasım
**Geçirilecek Süre:** 2-3 gün

Antik şehir kalıntıları, ağaç evler ve Chimaera alevleri ile ünlü Olympos, doğa severler ve macera tutkunları için ideal.

### 24. Ihlara Vadisi - Aksaray
**En İyi Ziyaret Zamanı:** Mart-Kasım
**Geçirilecek Süre:** 1 gün

14 km uzunluğundaki Ihlara Vadisi, Melendiz Çayı boyunca uzanan yürüyüş parkuru ve kaya kiliselerle tarihi doğa yürüyüşü imkanı sunuyor.

### 25. Sumela Manastırı - Trabzon
**En İyi Ziyaret Zamanı:** Mayıs-Ekim
**Geçirilecek Süre:** Yarım gün

300 metre yükseklikteki kayalık yamaca yapışmış Sumela Manastırı, hem tarihi hem de doğal güzellikleriyle büyüleyici bir deneyim sunuyor.

## TUR PLANLAMA REHBERİ

### Bütçe Planlaması

**Ekonomik Tur Paketleri:**
- 2-3 günlük yakın mesafe turları: 800-1.500 TL/kişi
- 4-5 günlük orta mesafe turları: 1.500-2.500 TL/kişi
- 6-7 günlük kapsamlı turlar: 2.500-4.000 TL/kişi

**Dahil Olan Hizmetler:**
- Konforlu otobüs ulaşımı
- Konaklama (oteller/pansiyonlar)
- Rehber eşliği
- Müze ve antik kent giriş ücretleri
- Sigorta

### En İyi Ziyaret Zamanları

**İlkbahar (Mart-Mayıs):**
- Hava ılıman, kalabalık az
- Doğa yeşil ve çiçekli
- Fiyatlar makul

**Yaz (Haziran-Ağustos):**
- Sahil destinasyonları için ideal
- Yaylalar en güzel dönemi
- Yoğun sezon, rezervasyon şart

**Sonbahar (Eylül-Kasım):**
- En ideal mevsim
- Hava güzel, kalabalık az
- Fotoğrafçılık için mükemmel

**Kış (Aralık-Şubat):**
- Kayak merkezleri aktif
- Termal turlar popüler
- En ekonomik dönem

### Ulaşım Seçenekleri

**Büyük Aytaç Travel Avantajları:**
- VIP otobüslerle konforlu yolculuk
- Çerkezköy merkez çıkış noktası
- Deneyimli şoförler ve rehberler
- Esnek ödeme seçenekleri
- 7/24 müşteri hizmetleri

## Rezervasyon ve İletişim

Türkiye'nin bu eşsiz destinasyonlarını keşfetmek için **Büyük Aytaç Travel** olarak sizlere en iyi hizmeti sunuyoruz. 15 yıllık deneyimimizle, güvenli ve konforlu tur organizasyonları gerçekleştiriyoruz.

**İletişim Bilgileri:**
📞 **0530 060 95 59**
📧 **info@buyukaytactravel.com**
🌐 **www.buyukaytactravel.com**
📍 **Çerkezköy Merkez Ofis**

**Özel Fırsatlar:**
- Erken rezervasyon %15 indirim
- Grup rezervasyonları (8+ kişi) %25 indirim
- Çocuklar için özel fiyatlar
- Esnek iptal koşulları

Bu 25 destinasyon, Türkiye'nin sunduğu sonsuz güzelliklerin sadece bir kısmı. Her biri kendine has karakteri olan bu yerler, unutulmaz anılar biriktirmeniz için sizleri bekliyor.

**Hangi destinasyonu tercih ederseniz edin, unutmayın ki en güzel seyahatler planlı seyahatlerdir. Rezervasyonunuzu bugün yapın, hayalinizdeki Türkiye turuna başlayın!**`,
      
      author: "Büyük Aytaç Travel",
      image: "/images/blogs/turkiye-25-destinasyon.jpg",
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