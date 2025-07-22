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
    readingTime: { type: Number, default: 10 },
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
      title: "2025 En Popüler Yurtdışı Tur Destinasyonları | Uygun Fiyatlı Avrupa ve Dünya Turları",
      slug: "2025-en-populer-yurtdisi-tur-destinasyonlari",
      summary: "2025 yılında en çok tercih edilen yurtdışı tur destinasyonları. Avrupa, Asya ve dünya turları için rehber, fiyatlar ve rezervasyon bilgileri.",
      metaDescription: "2025 yurtdışı tur fırsatları. Avrupa turları, Asya gezileri, dünya destinasyonları. Uygun fiyatlı yurtdışı tur rezervasyonu Büyük Aytaç Travel'da.",
      focusKeyword: "yurtdışı tur",
      keywords: [
        "yurtdışı tur",
        "avrupa turu",
        "yurtdışı tatil",
        "yurtdışı seyahat",
        "europa tour",
        "avrupa gezisi",
        "yurtdışı gezi",
        "dünya turu",
        "uygun yurtdışı tur",
        "yurtdışı tur paketleri",
        "yurtdışı tur rezervasyonu",
        "ekonomik yurtdışı tur"
      ],
      categories: ["yurtdışı-turlar", "destinasyon-rehberi", "seyahat-tavsiyeleri"],
      readingTime: 15,
      featuredPost: true,
      content: `# 2025 En Popüler Yurtdışı Tur Destinasyonları

Sınırları aşmak, yeni kültürleri keşfetmek ve unutulmaz deneyimler yaşamak için 2025 yılı harika fırsatlar sunuyor. Büyük Aytaç Travel olarak, 15 yıllık deneyimimizle en popüler yurtdışı destinasyonları ve en uygun tur paketlerini sizler için derledik.

Bu kapsamlı rehberimizde, 2025 yılında en çok tercih edilen yurtdışı destinasyonları, bütçe dostu alternatifler ve pratik seyahat ipuçlarını bulacaksınız.

## 🇪🇺 AVRUPA TURLARI - EN POPÜLERLERİ

### 1. Balkan Turları (Sırbistan, Makedonya, Arnavutluk)
**Ortalama Süre:** 7-10 gün  
**Bütçe Aralığı:** 2.500-3.500 TL/kişi  
**En İyi Zaman:** Mayıs-Ekim

Balkanlar, hem bütçe dostu hem de kültürel açıdan zengin destinasyonlar sunuyor. Belgrad'ın gece hayatı, Üsküp'ün tarihi köprüleri ve Tiran'ın renkli mimarisi ile unutulmaz bir deneyim yaşayabilirsiniz.

**Öne Çıkan Şehirler:**
- **Belgrad (Sırbistan):** Danube nehri, Kalemegdan Kalesi, canlı gece hayatı
- **Üsküp (Makedonya):** Taş Köprü, Ohrid Gölü, Makedon kültürü
- **Tiran (Arnavutluk):** Renkli binalar, Et'hem Bey Camii, Dajti Dağı
- **Sarajevo (Bosna-Hersek):** Osmanlı eserleri, çarşı kültürü, yerel gastronomi

**Balkan Turları Neden Popüler?**
- Türkiye'ye yakınlık (otobüs ile ulaşım)
- Uygun maliyetler
- Zengin tarih ve kültür
- Benzer yemek kültürü
- Vize kolaylığı (bazı ülkeler)

### 2. Yunanistan Turları
**Ortalama Süre:** 5-8 gün  
**Bütçe Aralığı:** 3.000-4.500 TL/kişi  
**En İyi Zaman:** Nisan-Haziran, Eylül-Ekim

Yunanistan, antik tarih tutkunları ve deniz severlerin favorisi. Atina'daki Akropolis'ten Santorini'nin beyaz evlerine kadar eşsiz deneyimler sunuyor.

**Popüler Rotalar:**
- **Klasik Yunanistan:** Atina - Meteora - Delphi - Olympia
- **Adalar Turu:** Mykonos - Santorini - Rodos
- **Kuzey Yunanistan:** Selanik - Kavala - Thassos

### 3. İtalya Turları
**Ortalama Süre:** 8-12 gün  
**Bütçe Aralığı:** 4.500-7.000 TL/kişi  
**En İyi Zaman:** Nisan-Haziran, Eylül-Ekim

Roma'nın tarihi, Floransa'nın sanatı, Venedik'in romantizmi ve Milano'nun modası ile İtalya, Avrupa'nın en çok aranan destinasyonlarından.

**Klasik İtalya Rotası:**
- **Roma:** Kolezyum, Vatikan, Trevi Çeşmesi
- **Floransa:** Uffizi Müzesi, Ponte Vecchio, Duomo
- **Venedik:** San Marco Meydanı, gondol turu, Murano adası
- **Milano:** La Scala Operası, Duomo, moda bölgeleri

## 🌍 ASYA DESTINASYONLARI

### 4. Gürcistan Turları
**Ortalama Süre:** 5-7 gün  
**Bütçe Aralığı:** 2.000-3.000 TL/kişi  
**En İyi Zaman:** Mayıs-Ekim

Gürcistan, son yıllarda Türk turistlerin en çok tercih ettiği destinasyonlardan biri. Tiflis'in renkli balkonları, Batum'un modern mimarisi ve Kazbek Dağı'nın doğal güzellikleri ile büyülüyor.

**Gürcistan Highlights:**
- **Tiflis:** Eski şehir, kükürt hamamları, Narikala Kalesi
- **Batum:** Deniz kıyısı, botanik bahçe, modern mimari
- **Kazbek:** Dağ manzaraları, Gergeti Kilisesi, doğa yürüyüşü
- **Sighnaghi:** Şarap rotası, küçük kasaba atmosferi

### 5. Azerbaycan Turları
**Ortalama Süre:** 4-6 gün  
**Bütçe Aralığı:** 2.500-3.500 TL/kişi  
**En İyi Zaman:** Mart-Haziran, Eylül-Kasım

Bakü'nün futuristik mimarisi, Gobustan'ın kaya resimları ve Ateşgah'ın mistik atmosferi ile Azerbaycan, kültürel zenginlik arayan gezginlerin tercihi.

### 6. Özbekistan Turları (Samarkand, Buhara, Taşkent)
**Ortalama Süre:** 8-10 gün  
**Bütçe Aralığı:** 4.000-5.500 TL/kişi  
**En İyi Zaman:** Mart-Mayıs, Eylül-Kasım

İpek Yolu'nun kalbi Özbekistan, Samarkand'ın Registan Meydanı, Buhara'nın medreseleri ve Hive'nin surlu şehri ile tarih tutkunlarının cenneti.

## 🏰 ORTADOĞU VE ARAP DÜNYASı

### 7. Dubai ve Abu Dhabi Turları
**Ortalama Süre:** 5-7 gün  
**Bütçe Aralığı:** 5.000-8.000 TL/kişi  
**En İyi Zaman:** Kasım-Mart

Dubai'nin gökyüzü çizgisi, lüks alışveriş merkezleri, çöl safaris ve Abu Dhabi'nin Grand Mosque'u ile BAE, modern Arap dünyasının kapısı.

**Dubai Must-Do Aktiviteler:**
- Burj Khalifa manzarası
- Dubai Mall alışverişi
- Çöl safari ve deve turu
- Marina ve JBR plajları
- Geleneksel souq ziyaretleri

### 8. Mısır Turları (Kahire, Luxor, Aswan)
**Ortalama Süre:** 8-10 gün  
**Bütçe Aralığı:** 4.500-6.500 TL/kişi  
**En İyi Zaman:** Ekim-Nisan

Firavunların ülkesi Mısır, Giza Piramitleri, Sfenks, Karnak Tapınağı ve Nil nehri turu ile binlerce yıllık medeniyetin izini sürdürmenizi sağlıyor.

## 🌸 UZAK DOĞU VE EGZOTİK DESTİNASYONLAR

### 9. Japonya Turları (Tokyo, Kyoto, Osaka)
**Ortalama Süre:** 10-12 gün  
**Bütçe Aralığı:** 12.000-18.000 TL/kişi  
**En İyi Zaman:** Mart-Mayıs (kiraz çiçeği), Eylül-Kasım

Japonya, geleneksel kültür ile modern teknolojinin mükemmel harmanı. Tokyo'nun gökdelenleri, Kyoto'nun tapınakları ve Osaka'nın street food kültürü ile eşsiz bir deneyim.

### 10. Tayland Turları (Bangkok, Phuket, Chiang Mai)
**Ortalama Süre:** 10-14 gün  
**Bütçe Aralığı:** 8.000-12.000 TL/kişi  
**En İyi Zaman:** Kasım-Mart

Tayland, tropik cennet plajları, altın tapınaklar, Thai masajı ve street food ile Güneydoğu Asya'nın en popüler destinasyonu.

## 💰 BÜTÇE DOSTU YURTDIŞI DESTİNASYONLARI

### En Ekonomik 5 Yurtdışı Destinasyon:

1. **Gürcistan** - 2.000-3.000 TL
2. **Balkanlar** - 2.500-3.500 TL  
3. **Azerbaycan** - 2.500-3.500 TL
4. **Kuzey Kıbrıs** - 1.800-2.800 TL
5. **Bulgaristan** - 2.200-3.200 TL

### Orta Bütçe Destinasyonları:

1. **Yunanistan** - 3.000-4.500 TL
2. **İtalya** - 4.500-7.000 TL
3. **İspanya** - 4.000-6.000 TL
4. **Mısır** - 4.500-6.500 TL
5. **Özbekistan** - 4.000-5.500 TL

## 📅 2025 YILI ÖZEL FİRSATLARI

### Erken Rezervasyon Kampanyaları

**Ocak-Mart Rezervasyonları:**
- Avrupa turları %20 indirimli
- Asya destinasyonları %15 indirimli
- Grup rezervasyonları (8+ kişi) %25 indirimli

**Son Dakika Fırsatları:**
- Tur öncesi 15 gün: %30 indirim
- Tur öncesi 7 gün: %40 indirim
- WhatsApp listesi üyeleri öncelikli bilgilendirme

### 2025 Trend Destinasyonları

**Yükselen Destinasyonlar:**
1. **Arnavutluk** - Keşfedilmemiş Balkan incisi
2. **Kırgızistan** - Orta Asya'nın doğal güzellikleri
3. **Moldova** - Avrupa'nın en ucuz ülkesi
4. **Bangladeş** - Kültürel zenginlik
5. **Laos** - Güneydoğu Asya'nın saklı cenneti

## 🛂 VİZE VE BELGE REHBERİ

### Vize Gerektirmeyen Ülkeler (Türk Vatandaşları İçin):
- **Gürcistan** - 365 gün vize muafiyeti
- **Azerbaycan** - 90 gün vize muafiyeti
- **Kuzey Kıbrıs** - Vize muafiyeti
- **Bosna-Hersek** - 90 gün vize muafiyeti
- **Sırbistan** - 90 gün vize muafiyeti

### Kolay Vize Alınan Ülkeler:
- **Yunanistan** - Schengen vizesi
- **İtalya** - Schengen vizesi
- **Bulgaristan** - AB vizesi
- **Mısır** - Online vize
- **BAE** - Online vize

### Vize Başvuru İpuçları:
- Başvuruyu en az 30 gün önceden yapın
- Tüm belgelerin onaylı tercümeleri olsun
- Seyahat sigortası mutlaka yaptırın
- Maddi durumu gösteren belgeler hazırlayın

## 🎒 SEYAHAT HAZIRLIGI REHBERİ

### Seyahat Öncesi Kontrol Listesi:

**Belgeler:**
- ✅ Pasaport (en az 6 ay geçerli)
- ✅ Vize (gerekli ise)
- ✅ Seyahat sigortası
- ✅ Otel rezervasyon belgesi
- ✅ Dönüş bileti
- ✅ Sürücü belgesi (gerekli ise)

**Sağlık:**
- ✅ Aşı kartı (gerekli ise)
- ✅ İlaçlar (reçete ile birlikte)
- ✅ Sağlık raporu (gerekli ise)

**Mali:**
- ✅ Euro/Dolar nakit
- ✅ Kredi kartı (chip'li)
- ✅ Banka bildirim formu

### Valiz Hazırlama Ipuçları:

**Essentiellar:**
- Mevsime uygun kıyafetler
- Rahat yürüyüş ayakkabıları
- Elektronik cihaz şarjları
- Universal adaptör
- İlk yardım çantası

**Pro Tips:**
- Kıyafetleri rulo yaparak katla
- Ağır eşyaları valizin altına koy
- Sıvıları leak-proof torbalara koy
- Önemli belgeleri el çantasında taşı

## 🏨 KONAKLAMA SEÇENEKLERİ

### Bütçe Kategorilerine Göre Konaklama:

**Ekonomik (2-3⭐):**
- Temiz, konforlu, merkezi lokasyon
- Kahvaltı dahil
- Ortalama fiyat: 30-50 EUR/gece

**Orta Segment (3-4⭐):**
- Geniş odalar, ekstra hizmetler
- Spa, havuz imkanları
- Ortalama fiyat: 50-80 EUR/gece

**Lüks (4-5⭐):**
- Premium lokasyon ve hizmet
- Concierge hizmet
- Ortalama fiyat: 80-150 EUR/gece

### Lokasyon Seçimi:
- **Şehir Merkezi:** Yakın mesafede her şey
- **Havaalanı Yakını:** Transfer kolaylığı
- **Tarihi Bölge:** Kültürel atmosfer
- **Marina/Sahil:** Deniz manzarası

## 🍽️ YURTDİŞİ GASTRONOMİ REHBERİ

### Mutlaka Denenmesi Gereken Yemekler:

**İtalya:**
- Otantik pizza (Napoli)
- Carbonara pasta (Roma)
- Gelato (her yerde)
- Tiramisu (orijinal tarif)

**Yunanistan:**
- Moussaka
- Souvlaki
- Greek salad
- Baklava (Türk versiyonundan farklı)

**Gürcistan:**
- Khachapuri (peynirli ekmek)
- Khinkali (mantı benzeri)
- Churchkhela (cevizli tatlı)
- Gürcü şarabı

**Balkanlar:**
- Ćevapi (ızgara köfte)
- Pita sa sirom (peynirli börek)
- Rakı/Rakia
- Ajvar (biber ezmesi)

### Yemek Alerjileri ve Diyetler:
- Vegetaryen seçenekleri araştırın
- Alerji bilgilerini yerel dilde yazın
- Helal yemek bulabileceğiniz yerler notun
- Restaurant önerileri için rehberinizden yardım isteyin

## 🚗 YURTDIŞINDA ULAŞIM

### Şehir İçi Ulaşım Seçenekleri:

**Toplu Taşıma:**
- Metro/tramvay (en ekonomik)
- Otobüs (geniş ağ kapsamı)
- Taksi (konforlu ama pahalı)

**Alternatif Ulaşım:**
- Ride-sharing uygulamaları
- Bisiklet kiralama
- Yürüyüş (şehri keşfetmenin en iyi yolu)

**Şehirlerarası:**
- Tren (Avrupa'da popüler)
- Otobüs (ekonomik seçenek)
- İç hat uçaklar (uzak mesafeler)

### Ulaşım Kartları ve Passes:
- Şehir kartları (3-7 günlük)
- Müze kartları (çok müze gezecekseniz)
- Eurail pass (Avrupa tren gezisi)

## 📱 YURTDIŞINDA TEKNOLOJİ VE İLETİŞİM

### Internet ve İletişim:

**Roaming Paketleri:**
- Operatörünüzden yurtdışı paketi alın
- GB limitine dikkat edin
- SMS ve arama ücretlerini öğrenin

**Wi-Fi Seçenekleri:**
- Otel Wi-Fi'ı
- Kafe ve restaurant Wi-Fi'ları
- Havaalanı ücretsiz internet
- Şehir merkezleri ücretsiz Wi-Fi

**Offline Uygulamalar:**
- Google Maps offline
- Google Translate offline
- Currency converter
- Metro haritaları offline

### Faydalı Uygulamalar:
- **Haritalar:** Google Maps, Maps.me
- **Çeviri:** Google Translate, iTranslate
- **Para:** XE Currency, Currency
- **Ulaşım:** Citymapper, Rome2Rio
- **Yemek:** TripAdvisor, Yelp
- **Konaklama:** Booking, Hotels.com

## 💳 MALİ PLANLAMA VE HARCAMALAR

### Günlük Harcama Bütçeleri (Kişi Başı):

**Bütçe Seyahat:**
- Yemek: 20-30 EUR
- Ulaşım: 5-10 EUR
- Aktiviteler: 10-15 EUR
- **Toplam:** 35-55 EUR/gün

**Orta Bütçe:**
- Yemek: 30-50 EUR
- Ulaşım: 10-20 EUR
- Aktiviteler: 20-30 EUR
- **Toplam:** 60-100 EUR/gün

**Konforlu Seyahat:**
- Yemek: 50-80 EUR
- Ulaşım: 20-40 EUR
- Aktiviteler: 30-50 EUR
- **Toplam:** 100-170 EUR/gün

### Para Birimi ve Ödeme:

**Nakit vs Kart:**
- %70 kart, %30 nakit optimal
- Küçük satıcılar için nakit gerekli
- Bahşişler için bozuk para bulundurun

**Güvenlik Ipuçları:**
- Paranızı farklı yerlerde taşıyın
- Kartlarınızı farklı cüzdanlarda tutun
- Acil durum için ekstra kart bırakın
- Kart kayıp/çalıntı numaralarını kaydedin

## 🛡️ GÜVENLİK VE SAĞLIK

### Kişisel Güvenlik:

**Genel Kurallar:**
- Değerli eşyaları gösterişli taşımayın
- Kalabalık yerlerde çantanızı önünüzde tutun
- Gece geç saatlerde yalnız dolaşmayın
- Alkol tüketiminde ölçülü olun

**Belge Güvenliği:**
- Pasaport kopyasını ayrı yerde tutun
- Önemli belgelerin fotoğrafını çekin
- Cloud'a backup yükleyin
- Acil durum numaralarını kaydedin

### Sağlık Önerileri:

**Seyahat Öncesi:**
- Seyahat sigortası yaptırın
- Kronik hastalıklarınız için yeterli ilaç alın
- Aşı takvimizinizi kontrol edin

**Seyahat Sırasında:**
- Bol su için
- Hijyene dikkat edin
- Yerel yemekleri yavaş yavaş deneyin
- Güneş kremi kullanın

## 🎁 ALIŞVERİŞ REHBERİ

### Popüler Alışveriş Ürünleri:

**İtalya:**
- Deri ürünleri (çanta, ayakkabı)
- İtalyan şarapları
- Parmesan peyniri
- Designer markalar

**Yunanistan:**
- Zeytinyağı ve zeytin
- Feta peyniri
- Ouzo (anason likörü)
- El yapımı seramikler

**Gürcistan:**
- Gürcü şarapları
- Churchkhela (cevizli tatlı)
- Çay çeşitleri
- El yapımı halılar

### Alışveriş İpuçları:
- Pazarlık kültürünü öğrenin
- Tax-free shopping imkanlarından yararlanın
- Orijinal ürün sertifikalarını isteyin
- Gümrük limitlerine dikkat edin

## 📞 BÜYÜK AYTAÇ TRAVEL AVANTAJLARI

### Neden Büyük Aytaç Travel?

**15 Yıllık Deneyim:**
- 50.000+ memnun müşteri
- TÜRSAB üyesi güvencesi
- Deneyimli rehber kadrosu
- 7/24 müşteri hizmetleri

**Özel Hizmetler:**
- Çerkezköy'den direkt kalkış
- VIP otobüs filosu
- Esnek ödeme seçenekleri
- Grup indirimleri

**Güvence ve Konfor:**
- Tam kapsamlı sigorta
- Acil durum desteği
- Kaliteli otel seçimleri
- Profesyonel rehberlik

### 2025 Özel Kampanyalar:

**Erken Rezervasyon:**
- Mart öncesi rezervasyonlarda %20 indirim
- Grup rezervasyonlarında %25 indirim
- Çocuk ve öğrenci indirimleri

**Sadakat Programı:**
- 3. tur %10 indirimli
- 5. tur %15 indirimli
- VIP müşterilere özel fırsatlar

## 📞 REZERVASYON VE İLETİŞİM

2025 yılının en güzel yurtdışı destinasyonlarını keşfetmek için bugün rezervasyonunuzu yapın!

**İletişim Bilgileri:**
📞 **0530 060 95 59** (7/24 hizmet)
📱 **WhatsApp:** Anlık bilgi ve rezervasyon
📧 **info@buyukaytactravel.com**
🌐 **www.buyukaytactravel.com**
📍 **Çerkezköy Merkez Ofis** - Randevu ile görüşme

**Online Rezervasyon Avantajları:**
- %5 online rezervasyon indirimi
- Anlık onay sistemi
- Esnek ödeme seçenekleri
- Dijital tur programı

**Hızlı Rezervasyon:**
1. WhatsApp'tan mesaj atın
2. Tercih ettiğiniz destinasyonu belirtin
3. Tarih ve kişi sayısını bildirin
4. Kişiselleştirilmiş teklif alın
5. Rezervasyonunuzu onaylayın

## 🌟 MÜŞTERİ YORUMLARı

> *"Büyük Aytaç Travel ile gittiğimiz Balkan turu harikaydı. Rehberimiz çok bilgiliydi ve organizasyon mükemmeldi."* - **Mehmet B., İstanbul**

> *"İtalya turumuz rüya gibiydi. Her detay düşünülmüş, oteller harikaydı. Kesinlikle tekrar tercih edeceğim."* - **Ayşe K., Ankara**

> *"Gürcistan gezimiz beklentilerimin çok üstündeydi. Çerkezköy'den direkt kalkış çok kolaylık sağladı."* - **Osman D., Tekirdağ**

---

**2025 yılı, seyahat etmek için mükemmel bir yıl!** Yeni kültürler keşfedin, unutulmaz anılar biriktirin ve hayalinizdeki destinasyonlara ulaşın.

**Büyük Aytaç Travel ile yurtdışı hayalleriniz gerçek oluyor!**

*Rezervasyon için hemen bizi arayın: **0530 060 95 59***`,
      
      author: "Büyük Aytaç Travel",
      image: "/images/blogs/yurtdisi-tur-destinasyonlari-2025.jpg",
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