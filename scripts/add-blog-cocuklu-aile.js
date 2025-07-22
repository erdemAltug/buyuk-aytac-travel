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
      title: "Çocuklu Aileler İçin Mükemmel Tur Rehberi | Yaş Gruplarına Göre Öneriler",
      slug: "cocuklu-aileler-icin-mukemmel-tur-rehberi",
      summary: "Çocuklu aileler için özel olarak hazırlanmış tur rehberi. Yaş gruplarına göre destinasyon önerileri, pratik ipuçları ve aile dostu konaklama seçenekleri.",
      content: `# Çocuklu Aileler İçin Mükemmel Tur Rehberi

Çocuklu aile olarak tatil planlamak, hem heyecan verici hem de zorlu bir süreç olabilir. Doğru destinasyon seçimi, uygun konaklama ve çocukların yaşına uygun aktiviteler, tatil deneyiminizi mükemmel hale getirebilir. Bu rehberde, çocuklu aileler için en iyi tur seçeneklerini ve pratik ipuçlarını paylaşıyoruz.

## Yaş Gruplarına Göre Tur Önerileri

### 👶 0-3 Yaş: Bebek Dostu Turlar

Bu yaş grubundaki çocuklar için konfor ve hijyen en önemli faktörlerdir.

**Önerilen Destinasyonlar:**
- **İstanbul Şehir Turu:** Kısa mesafeler, müze ziyaretleri
- **Bursa-Cumalıkızık:** Doğal ortam, temiz hava
- **Büyükada Günübirlik:** Fayton turu, sakin atmosfer
- **Kilyos-Şile:** Plaj ve doğa kombinasyonu

**Tur Özellikleri:**
- Maksimum 3-4 saatlik günübirlik turlar
- Bebek arabasına uygun yollar
- Emzirme odaları bulunan mekanlar
- Hijyenik tuvalet imkanları
- Klimalı, konforlu araçlar

**Çantanızda Bulunması Gerekenler:**
- Bebek maması ve su
- Islak mendil, çok miktarda bez
- Değiştirme kıyafetleri
- Bebek güneş kremi
- En sevdiği oyuncakları

### 🧒 4-8 Yaş: Keşif ve Macera

Bu yaştaki çocuklar meraklı ve enerjiktir. Eğitici ve eğlenceli aktiviteler idealdir.

**Önerilen Destinasyonlar:**
- **Kapadokya:** Balon turları (güvenli mesafeden), yer altı şehirleri
- **Pamukkale:** Beyaz travertenler, şifa suları
- **İstanbul Tarih Turu:** Ayasofya, Topkapı Sarayı
- **Çanakkale-Truva:** Tarihi hikayeler, Truva atı

**Aktivite Önerileri:**
- Hayvanat bahçesi ziyaretleri
- Doğa yürüyüşleri (kısa mesafe)
- Interaktif müze turları
- Tekne turları
- Kum kalesi yapma aktiviteleri

**Dikkat Edilecekler:**
- Güvenlik önlemleri (deniz, yükseklik)
- Dinlenme molaları (her 2 saatte bir)
- Hafif ve besleyici atıştırmalıklar
- Eğlenceli oyunlar ve kitaplar

### 👦 9-15 Yaş: Gençlik ve Spor

Ergenlik çağına yaklaşan çocuklar için daha aktif ve macera dolu turlar.

**Önerilen Destinasyonlar:**
- **Antalya:** Su sporları, macera parkları
- **Karadeniz Yaylaları:** Doğa sporları, zipline
- **Fethiye-Ölüdeniz:** Paraşüt sporları (izleyici olarak)
- **Bodrum:** Su sporları, kültürel geziler

**Aktivite Önerileri:**
- Rafting ve kano sporları
- Dağ bisikleti turları
- Arkeoloji atölyeleri
- Fotoğrafçılık gezileri
- Doğa kampları

**Bu Yaş Grubu İçin İpuçları:**
- Kendilerini ilgilendiren aktiviteler seçin
- Sosyal medya paylaşım imkanları sunun
- Arkadaş grubu ile seyahat seçenekleri
- Kendi kararlarını alma özgürlüğü

## En İyi Aile Dostu Destinasyonlar

### 🏖️ Deniz Tatili Seçenekleri

**1. Antalya-Kemer**
- **Neden İdeal:** Çocuk dostu plajlar, water parklar
- **Öne Çıkan Özellikler:** All-inclusive oteller, animasyon
- **Yaş Grubu:** Tüm yaşlar için uygun
- **Ortalama Süre:** 4-7 gün

**2. Bodrum-Gümbet**
- **Neden İdeal:** Sakin koylar, güvenli yüzme alanları
- **Öne Çıkan Özellikler:** Bodrum Kalesi, çocuk müzeleri
- **Yaş Grubu:** 6+ yaş ideal
- **Ortalama Süre:** 3-5 gün

### 🏔️ Doğa ve Kültür Turları

**1. Kapadokya**
- **Çocuk Dostu Aktiviteler:**
  - Balon turları (güvenli mesafeden izleme)
  - Göreme Açık Hava Müzesi
  - Avanos çömlek atölyeleri
  - Peri bacaları keşfi
- **Konaklama:** Aile odaları bulunan boutique oteller
- **Önerilen Süre:** 2-3 gün

**2. Pamukkale**
- **Çocuk Dostu Aktiviteler:**
  - Travertenlerde yürüyüş
  - Antik havuz deneyimi
  - Hierapolis antik kenti
  - Termal su banyoları
- **Sağlık Faydaları:** Çocuklar için güvenli termal sular
- **Önerilen Süre:** 1-2 gün

### 🏛️ Şehir ve Kültür Turları

**1. İstanbul**
- **Çocuk Dostu Mekanlar:**
  - İstanbul Akvaryum
  - Miniatürk
  - Rahmi M. Koç Müzesi
  - Bosphorus tekne turu
- **Ulaşım:** Metro ve tramvay çocuklar için heyecan verici
- **Önerilen Süre:** 2-3 gün

## Konaklama Seçenekleri

### 🏨 Aile Dostu Otel Özellikleri

**Aranması Gereken Özellikler:**
- **Aile odaları:** Bağlantılı veya geniş odalar
- **Çocuk yatağı:** Beşik ve çocuk yatağı hizmeti
- **Güvenlik:** Balkon korkulukları, cam güvenlik filmleri
- **Havuz güvenliği:** Çocuk havuzu, cankurtaran
- **Animasyon:** Çocuk kulübü ve aktiviteler

**Büyük Aytaç Travel Önerisi:**
Partnerlerimiz arasında çocuk dostu sertifikalı oteller bulunmaktadır. Rezervasyon sırasında çocuk yaşlarını belirtmeniz halinde en uygun oda tipini öneriyoruz.

### 🏕️ Alternatif Konaklama

**Tatil Köyleri:**
- All-inclusive sistem
- Çocuk kulüpleri
- Çeşitli aktivite seçenekleri
- Güvenli ortam

**Pansiyon/Butik Oteller:**
- Daha kişisel hizmet
- Yerel kültür deneyimi
- Ev yemekleri
- Ekonomik seçenekler

## Seyahat Planlaması İpuçları

### 📅 En İyi Seyahat Zamanları

**Okul Tatil Dönemleri:**
- **Yarıyıl tatili (Ocak-Şubat):** Kış sporları, şehir turları
- **Bahar tatili (Nisan):** Doğa turları, kültürel geziler  
- **Yaz tatili (Haziran-Ağustos):** Deniz tatili, kamp
- **Güz tatili (Kasım):** Sakin destinasyonlar

**Hava Durumu Faktörleri:**
- Aşırı sıcaktan kaçının (35°C+)
- Yağmurlu sezon kontrolü
- Deniz suyu sıcaklığı (min 22°C)
- UV indeksi takibi

### 🎒 Seyahat Çantası Hazırlığı

**Zorunlu Belgeler:**
- Nüfus cüzdanı/pasaport
- Sağlık raporu (gerektiğinde)
- Alerjiler listesi
- Acil durum iletişim bilgileri

**Sağlık Çantası:**
- Ateş düşürücü şurup
- Antiseptik krem
- Yarabandı
- Güneş kremi (SPF 50+)
- Sivrisinek kovucu
- Termometre

**Eğlence Araçları:**
- Boyama kitapları ve kalemler
- Tablet/telefon (çevrimdışı oyunlar)
- Favori oyuncaklar
- Hikaye kitapları
- Müzik çalar/kulaklık

## Güvenlik ve Sağlık Önerileri

### 🏥 Sağlık Önlemleri

**Seyahat Öncesi:**
- Doktor kontrolü
- Aşı takvimi güncellemesi
- Kullanılan ilaçların yeterli miktarı
- Sigorta kontrolü

**Seyahat Sırasında:**
- Düzenli beslenme saatleri
- Bol su tüketimi
- Güneşten korunma
- Hijyen kurallarına dikkat

### 🔒 Güvenlik Tedbirleri

**Kaybolma Önlemleri:**
- Çocuğa telefon numarası öğretme
- Kimlik bilgisi taşıma
- Parlak renkli kıyafetler
- Grup halinde hareket etme

**Suda Güvenlik:**
- Sürekli gözetim
- Can yeleği kullanımı
- Yüzme bilgisi kontrolü
- Güvenli alan seçimi

## Bütçe Planlama

### 💰 Maliyet Hesaplaması

**Temel Tur Maliyetleri:**
- **Günübirlik turlar:** 200-400 TL/çocuk
- **2-3 günlük turlar:** 800-1500 TL/çocuk
- **1 haftalık turlar:** 2000-4000 TL/çocuk

**Ekstra Masraflar:**
- Çocuk aktiviteleri: %20 ek bütçe
- Özel yemekler: %15 ek bütçe
- Hediyeler ve anılar: %10 ek bütçe
- Sağlık masrafları: %5 ek bütçe

### 🎯 Tasarruf İpuçları

**Erken Rezervasyon:**
- 1 ay öncesi: %15 indirim
- 2 ay öncesi: %25 indirim
- Sezon öncesi: %30 indirim

**Grup İndirimleri:**
- 2 aile (6+ kişi): %10 indirim
- 3 aile (9+ kişi): %15 indirim
- Okul grupları: %20 indirim

## Büyük Aytaç Travel Aile Paketleri

### 🎪 Özel Aile Turları

**"Aile Mutluluğu" Paketi:**
- Çocuk yaşına göre özelleştirilmiş program
- Aile dostu rehber eşliği
- Çocuk menülü restoran seçimi
- Oyun ve aktivite malzemeleri dahil

**"Keşif Ailesi" Paketi:**
- Eğitici museum turları
- Doğa yürüyüşleri
- El sanatları atölyeleri
- Fotoğraf çekim imkanları

### 🚌 Araç İmkanları

**Aile Dostu Araç Özellikleri:**
- Çocuk koltuğu/emniyet kemeri
- Klima/ısıtma sistemi
- Müzik/video sistemi
- Bol bagaj alanı
- Su ve atıştırmalık ikramı

## En Sık Sorulan Sorular

**S: Çocuk indirimi uygulanıyor mu?**
C: Evet! 0-6 yaş %50, 7-12 yaş %30 indirim uygulanır. 13+ yaş tam ücretlidir.

**S: Bebek maması ve biberon ısıtma imkanı var mı?**
C: Tur otobüslerimizde ve partner mekanlarımızda bebek bakım imkanları mevcuttur.

**S: Çocuğum hastalanırsa ne olur?**
C: Acil durum sağlık desteği ve en yakın hastaneye ulaşım sağlanır. Tur iptali durumunda özel koşullar uygulanır.

**S: Tek başıma çocukla tur katılabilir miyim?**
C: Elbette! Tek ebeveyn-çocuk turları için özel destek sağlıyoruz.

## Sonuç ve Rezervasyon

Çocuklu aile olarak tatil yapmak, doğru planlama ile mükemmel anılara dönüşebilir. **Büyük Aytaç Travel** olarak, 15 yıllık deneyimimizle ailelerle çalışıyor ve her yaş grubuna uygun tur seçenekleri sunuyoruz.

### 📞 Hemen Rezervasyon Yapın!

**Çocuklu Aile Uzmanı Danışmanlarımız:**
📞 **0530 060 95 59**  
📱 **WhatsApp:** [wa.me/905300609559](https://wa.me/905300609559)  
🌐 **Website:** [buyukaytactravel.com](/contact)

**Özel Aile Paketleri için "AİLE TURU" yazarak WhatsApp'tan bize ulaşın!**

### 🎁 Özel Fırsatlar

- **İlk Rezervasyon:** %20 indirim
- **Arkadaş Ailesi Getir:** %15 extra indirim  
- **Doğum Günü Sürprizi:** Özel organizasyon
- **Fotoğraf Albümü:** Anı fotoğrafları hediye

Unutmayın: En güzel aile anıları, birlikte yaşanan deneyimlerden doğar! 👨‍👩‍👧‍👦`,
      
      author: "Büyük Aytaç Travel",
      image: "/images/blogs/cocuklu-aile-turlari.jpg",
      categories: ["Aile Turları", "Çocuklu Seyahat", "Seyahat Tavsiyeleri", "Aile Tatili"],
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