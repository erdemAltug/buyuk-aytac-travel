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
      title: "Son Dakika Tur Fırsatları Nasıl Yakalanır? | İç Bilgiler ve İpuçları",
      slug: "son-dakika-tur-firsatlari-nasil-yakalanir",
      summary: "Son dakika tur fırsatlarını yakalamak için profesyonel ipuçları. %50'ye varan indirimlerle tur rezervasyonu yapmanın sırları.",
      content: `# Son Dakika Tur Fırsatları Nasıl Yakalanır?

Son dakika tur rezervasyonları, bütçe dostu tatil yapmak isteyenler için altın değerinde fırsatlar sunar. Tur operatörleri, dolduramadıkları turları son dakikada önemli indirimlerle satarak hem müşteri hem de şirket için kazan-kazan durumu yaratır. Peki bu fırsatları nasıl yakalayabilirsiniz?

## Son Dakika Turlar Neden Uygun Fiyatlı Olur?

### 1. Doluluk Oranı Optimizasyonu
Tur şirketleri, bir turu iptal etmek yerine düşük fiyatla doldurmayı tercih eder. Böylece en azından maliyetlerini karşılayabilir ve müşteri memnuniyeti sağlar.

### 2. Sezonsal Faktörler
- **Düşük sezon başlangıcı:** Yaz sonu, kış başı gibi dönemler
- **Hava durumu belirsizlikleri:** Ani hava değişimleri nedeniyle iptaller
- **Okul açılış zamanları:** Aileli müşterilerin azalması

### 3. Rekabet Koşulları
Aynı destinasyonda birden fazla tur olduğunda, şirketler fiyat rekabetine girer ve son dakika indirimler başlar.

## En İyi Son Dakika Tur Fırsatları Nerede Bulunur?

### Online Platformlar

**1. Tur Şirketlerinin Kendi Websiteleri**
- **Büyük Aytaç Travel:** [buyukaytactravel.com](/tours)
- Direkt rezervasyon indirimleri
- Email abonelik listeleri
- WhatsApp bildirim grupları

**2. Sosyal Medya Takibi**
- **Instagram:** @buyukaytactravel
- **Facebook:** Büyük Aytaç Travel sayfası
- Stories ve post bildirimleri aktif edin
- Canlı yayınlarda anlık fırsatlar

**3. Tur Karşılaştırma Siteleri**
- Fiyat karşılaştırma imkanı
- Anlık stok durumu
- Kullanıcı yorumları

### Geleneksel Yöntemler

**1. Acente Ziyaretleri**
- Çerkezköy ofisimizi ziyaret edin
- Yüz yüze görüşmede özel fırsatlar
- Esnek ödeme seçenekleri

**2. Telefon Takibi**
- **0530 060 95 59** numaramızı arayın
- Günlük fırsat listesi alın
- Rezervasyon önceliği kazanın

## Son Dakika Tur Rezervasyonu İçin Stratejiler

### 1. Esnek Tarih Aralığı Belirleyin

**Hafta İçi vs Hafta Sonu**
- Hafta içi çıkışlar %30 daha ucuz
- Pazartesi-Çarşamba optimum günler
- Cuma-Pazar premium fiyatlar

**Sezon Geçişleri**
- Mayıs sonu - Haziran başı
- Ağustos sonu - Eylül başı
- Ekim - Kasım arası dönemler

### 2. Esnek Destinasyon Seçimi

**Benzer Alternatifler Hazır Tutun**
- Kapadokya yerine Pamukkale
- Antalya yerine İzmir/Çeşme
- Yurtdışı yerine yurtiçi alternatifleri

**Bölgesel Gruplamalar**
- **Ege Bölgesi:** İzmir, Çeşme, Bodrum, Pamukkale
- **Akdeniz:** Antalya, Kaş, Kas, Olympos
- **Karadeniz:** Trabzon, Uzungöl, Ayder

### 3. Hızlı Karar Verme Yetisi

**Önceden Hazırlık**
- Pasaport/kimlik kontrolleri
- Bütçe planlaması yapın
- Çalışma izinlerini önceden alın

**5 Dakika Kuralı**
- Beğendiğiniz fırsatı 5 dakika içinde değerlendirin
- Son dakika turlar çok hızlı tükenir
- Kararsızlık büyük kayıplara neden olur

## Hangi Destinasyonlarda En Çok Fırsat Çıkar?

### Yurtiçi Destinasyonlar

**1. Kapadokya Turları**
- **En iyi fırsat zamanı:** Mart-Nisan, Ekim-Kasım
- **Ortalama indirim:** %25-40
- **Son dakika tanımı:** 1 hafta öncesi

**2. Pamukkale Turları**
- **En iyi fırsat zamanı:** Kış ayları
- **Ortalama indirim:** %30-50
- **Son dakika tanımı:** 3-5 gün öncesi

**3. İstanbul Şehir Turları**
- **En iyi fırsat zamanı:** Şubat-Mart
- **Ortalama indirim:** %20-35
- **Son dakika tanımı:** 2-3 gün öncesi

### Yurtdışı Destinasyonlar

**1. Balkan Turları**
- **En iyi fırsat zamanı:** Ekim-Kasım
- **Ortalama indirim:** %35-60
- **Son dakika tanımı:** 1-2 hafta öncesi

**2. Avrupa Şehir Turları**
- **En iyi fırsat zamanı:** Kış ayları
- **Ortalama indirim:** %40-70
- **Son dakika tanımı:** 10-15 gün öncesi

**3. Güney Kıbrıs**
- **En iyi fırsat zamanı:** Ocak-Mart
- **Ortalama indirim:** %30-50
- **Son dakika tanımı:** 1 hafta öncesi

## Son Dakika Tur Rezervasyonunda Dikkat Edilecekler

### ✅ Yapılması Gerekenler

**1. Şirket Güvenilirliği Kontolü**
- TÜRSAB üyelik belgesi kontrolü
- Online yorumları okuyun
- Referans müşterileri arayın

**2. Tur Detaylarını İnceleyik**
- Dahil olan/olmayan hizmetler
- Konaklama standardı
- Ulaşım araçları
- Rehber durumu

**3. İptal/Değişiklik Koşulları**
- İptal politikasını okuyun
- Değişiklik ücretlerini öğrenin
- Sigorta seçeneklerini değerlendirin

### ❌ Yapılmaması Gerekenler

**1. Acele Karar Verme**
- Detayları okumadan rezervasyon yapmayın
- Sadece fiyata bakıp karar vermeyin
- Karşılaştırma yapmadan rezerve etmeyin

**2. Belge Kontrolü Atlamak**
- Pasaport geçerlilik süreleri
- Vize gereklilikleri
- Sağlık sertifikaları

**3. Gizli Maliyetleri Görmezden Gelmek**
- Transfer ücretleri
- Şehir vergileri
- Ekstra aktivite ücretleri

## Büyük Aytaç Travel Son Dakika Avantajları

### Özel Fırsat Sistemi

**WhatsApp Bildirimi**
- Anlık fırsat mesajları
- Özel indirim kodları
- Sınırlı sayıda fırsatlar

**Email Aboneliği**
- Haftalık fırsat bültenleri
- Erken rezervasyon indirimleri
- Sadık müşteri kampanyaları

### Esnek Ödeme Seçenekleri

**Taksit İmkanları**
- 3-6 ay vade farksız taksit
- Kredi kartı ile güvenli ödeme
- Kapıda ödeme seçeneği

**Grup İndirimleri**
- 4+ kişi %10 indirim
- 8+ kişi %20 indirim
- 12+ kişi %25 indirim

## En Sık Sorulan Sorular

**S: Son dakika turları güvenli mi?**
C: TÜRSAB üyesi şirketlerden aldığınız turlar tamamen güvenlidir. Büyük Aytaç Travel olarak tüm turlarımız sigortalıdır.

**S: Son dakika turda oda değişikliği yapılabilir mi?**
C: Müsaitlik durumuna göre oda yükseltme imkanı bulunmaktadır. Ek ücret karşılığında single oda, suit oda seçenekleri sunulabilir.

**S: İptal etme durumunda paramım iade edilir mi?**
C: İptal koşullarımız standart tour koşullarıyla aynıdır. Tur başlangıcından 15 gün öncesine kadar %100 iade, sonrasında kademeli ücret kesintisi uygulanır.

**S: Havayolu bileti dahil mi?**
C: Tur paketine göre değişmektedir. Detaylar tur açıklamasında net olarak belirtilmektedir.

## Sonuç ve Öneriler

Son dakika tur fırsatları, doğru strateji ve zamanlamayla harika tatil deneyimleri yaşamanızı sağlar. Anahtar nokta, esnek olmak ve hızlı karar verebilmektir.

**Büyük Aytaç Travel** olarak, Çerkezköy ve çevresinden en iyi son dakika tur fırsatlarını sunuyoruz. Deneyimli ekibimiz ve TÜRSAB üyeliğimizle güvenli, kaliteli ve uygun fiyatlı tatil alternatifleri sağlıyoruz.

### Hemen İletişime Geçin!

📞 **0530 060 95 59**  
📱 **WhatsApp:** [wa.me/905300609559](https://wa.me/905300609559)  
🌐 **Website:** [buyukaytactravel.com](/contact)  
📧 **Email:** info@buyukaytactravel.com

💡 **İpucu:** WhatsApp hattımızdan "SON DAKİKA" yazarak güncel fırsatlarımızı anında öğrenebilirsiniz!`,
      
      author: "Büyük Aytaç Travel",
      image: "/images/blogs/son-dakika-tur-firsatlari.jpg",
      categories: ["Son Dakika Turlar", "Seyahat Tavsiyeleri", "Fırsat Turları", "Bütçe Dostu Tatil"],
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