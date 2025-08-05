import mongoose from 'mongoose';

// MongoDB bağlantısı
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:494314Ae@buyuk-aytac-travel.j3jwoww.mongodb.net/?retryWrites=true&w=majority&appName=Buyuk-Aytac-Travel');
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    process.exit(1);
  }
};

// Tour şeması
const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    duration: { type: String, required: true },
    departureDate: { type: Date, required: true },
    returnDate: { type: Date },
    departureLocation: { type: String, required: true },
    destination: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true }, // 'domestic', 'international', 'daily', 'overnight'
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    maxParticipants: { type: Number },
    currentParticipants: { type: Number, default: 0 },
    itinerary: [{ type: String }],
    includes: [{ type: String }],
    excludes: [{ type: String }],
    requirements: [{ type: String }],
    highlights: [{ type: String }],
    contactPhone: { type: String },
    contactEmail: { type: String },
    tursabNumber: { type: String },
    views: { type: Number, default: 0 },
    bookings: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    metaDescription: { type: String },
    keywords: [{ type: String }],
    focusKeyword: { type: String },
  },
  { timestamps: true }
);

// Model oluştur
const Tour = mongoose.models.Tour || mongoose.model('Tour', tourSchema);

// Safranbolu turu oluştur
async function createSafranboluTour() {
  try {
    await connectDB();

    const tour = {
      title: "SAFRANBOLU TURU - Safran Hasadına Özel 2 Gün 1 Gece Konaklama",
      slug: "safranbolu-turu-safran-hasadina-ozel-2-gun-1-gece-konaklama",
      description: `# SAFRANBOLU TUR PROGRAMI

## 1. GÜN – 11 EKİM – Cumartesi – SAFRANBOLU

**01:00 ÇERKEZKÖY HAREKET**

Sabah saatlerinde yol üzeri tesislerde serbest olarak alacağımız kahvaltının ardından (ekstra) Unesco tarafından koruma listesine alınan eski bir Bektaşi Köyü olan Yörük Köyüne doğru yola çıkıyoruz.

Kasım Sipahioğlu Konağını ziyaret ettikten ve alışveriş için vereceğimiz serbest zamanın ardından tarihi geleneksel Osmanlı Konaklarını panoramik olarak seyredip fotoğraflayacağımız Hıdırlık Tepesine doğru hareket ediyoruz.

Safranbolu'da Kaymakamlar Gezi evini ziyaret ediyoruz. (Dileyen misafirlerimiz konakta bölgeye has çay ve kahve sunumunu tadabilir).

Gezi güzergahında bulunan İzzet Paşa Cami, Demirciler Bakırcılar Çarşısı, Akçasu Kanyonu, Arasta Çarsısı, Köprülü Mehmet Paşa Külliyesi ve Güneş saatini de geziyoruz.

Kazdağlıoğlu Meydanında tarihi kentin meşhur lokum imalatı hakkında bilgi alıyoruz ve kararlaştırdığımız yer ve saatte toplanacak şekilde öğlen yemeği için Serbest Zaman veriyor, ya da toplu yemek yiyeceğimiz lokantamıza geçiyoruz (EKSTRA).

Öğleden sonra Dünyada iki örneği bulunan bir tanesi Arizona'daki Tokatlı Kanyonunundan sonra muhteşem manzaralı Cam Terasa geçiyoruz. Cam Terasta vereceğimiz Serbest zamanın ardından otelimize yerleşiyoruz.

**Akşam yemeği otelimizde. HOTEL AYGÜR SAFRANBOLU**

## 2. GÜN – 12 EKİM 2025 – Pazar - AMASRA – BARTIN

Sabah otelimiz de alacağımız Kahvaltının ardından Karadeniz'in eşsiz güzelliklerine sahip Fatih Sultan Mehmet tarafından "Çeşm-i Cihan buramı ola" (Dünya'nın Gözü) diye adlandırılan Amasra'ya doğru yola çıkıyoruz.

Küçük bir adayı bağlayan Kemere Köprüsü, Çekiciler Çarşısını görüp Öğlen Yemeğimizi alacağımız restorana geçiyoruz. (EKSTRA)

Öğle Yemeği molasının ardından Osmanlılar döneminde Bahriye-i Hümayun sonrasında Mızıka Okulu olarak da kullanılan Amasra Müzesi gezisinin ardından kentten ayrılıyor ve Çerkezköy'e doğru yola çıkıyoruz.

Yolculuğumuzun ardından, siz değerli misafirlerimiz aldığımız noktalara bırakarak bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda yeniden görüşmek üzere vedalaşıyoruz.`,
      
      shortDescription: "Safran hasadına özel 2 gün 1 gece konaklamalı tur. UNESCO korumalı Safranbolu evleri, Yörük Köyü, Cam Teras, Amasra ve Kemere Köprüsü'nü kapsayan muhteşem deneyim.",
      
      image: "/images/tours/safranbolu-turu-10-12-ekim-2025.jpg",
      price: 4400,
      originalPrice: 5000,
      duration: "2 Gün 1 Gece",
      departureDate: new Date('2025-10-11T01:00:00.000Z'),
      returnDate: new Date('2025-10-12T20:00:00.000Z'),
      departureLocation: "Çerkezköy",
      destination: "Safranbolu, Amasra, Bartın",
      category: "Konaklamalı Turlar",
      type: "overnight",
      isActive: true,
      isFeatured: true,
      maxParticipants: 40,
      currentParticipants: 0,
      
      itinerary: [
        "1. GÜN - 11 EKİM (Cumartesi):",
        "01:00 - Çerkezköy'den hareket",
        "06:00 - Yol üzeri kahvaltı (ekstra)",
        "08:00 - Yörük Köyü (UNESCO korumalı)",
        "09:00 - Kasım Sipahioğlu Konağı",
        "10:00 - Hıdırlık Tepesi (panoramik manzara)",
        "11:00 - Kaymakamlar Gezi Evi",
        "12:00 - İzzet Paşa Cami, Demirciler Çarşısı",
        "13:00 - Akçasu Kanyonu, Arasta Çarşısı",
        "14:00 - Köprülü Mehmet Paşa Külliyesi",
        "15:00 - Kazdağlıoğlu Meydanı (lokum imalatı)",
        "16:00 - Cam Teras (dünyada 2 örnek)",
        "18:00 - Otel yerleşme",
        "19:00 - Akşam yemeği (otel)",
        "",
        "2. GÜN - 12 EKİM (Pazar):",
        "07:00 - Otel kahvaltısı",
        "08:00 - Amasra'ya hareket",
        "10:00 - Kemere Köprüsü",
        "11:00 - Çekiciler Çarşısı",
        "12:00 - Öğle yemeği (ekstra)",
        "14:00 - Amasra Müzesi",
        "15:00 - Çerkezköy'e dönüş",
        "20:00 - Çerkezköy'e varış"
      ],
      
      includes: [
        "Konforlu araç ile ulaşım",
        "Profesyonel rehberlik hizmeti",
        "1 gece otel konaklaması (Hotel Aygür Safranbolu)",
        "Otel kahvaltısı ve akşam yemeği",
        "TÜRSAB üyesi tur operatörü garantisi",
        "Seyahat sigortası",
        "Tüm müze giriş ücretleri"
      ],
      
      excludes: [
        "Yol üzeri kahvaltı (ekstra ücret)",
        "Öğle yemekleri (ekstra ücret)",
        "Kişisel harcamalar",
        "Otel ekstra harcamaları",
        "Bahşişler"
      ],
      
      requirements: [
        "Rezervasyon için en az 1 hafta önceden haber verilmesi",
        "Konforlu ayakkabı ve mevsimlik kıyafet",
        "Fotoğraf makinesi önerilir",
        "Su ve atıştırmalık getirilebilir",
        "Otel için kimlik fotokopisi gerekli"
      ],
      
      highlights: [
        "Safran hasadına özel tur",
        "UNESCO korumalı Safranbolu evleri",
        "Yörük Köyü (Bektaşi köyü)",
        "Cam Teras (dünyada 2 örnek)",
        "Kaymakamlar Gezi Evi",
        "Amasra (Dünya'nın Gözü)",
        "Kemere Köprüsü",
        "Amasra Müzesi",
        "Lokum imalatı gösterisi",
        "Karadeniz manzarası"
      ],
      
      contactPhone: "0530 060 95 59",
      contactEmail: "info@buyukaytactravel.com",
      tursabNumber: "17674",
      
      metaDescription: "Safranbolu Turu: Safran hasadına özel 2 gün 1 gece konaklama. UNESCO korumalı evler, Yörük Köyü, Cam Teras, Amasra. 11-12 Ekim 2025 Çerkezköy'den hareket.",
      keywords: ["safranbolu turu", "safran hasadı", "yörük köyü", "cam teras", "amasra", "kemere köprüsü", "çerkezköy turları", "konaklamalı tur", "unesco", "osmanlı evleri"],
      focusKeyword: "safranbolu turu"
    };

    const newTour = await Tour.create(tour);
    console.log(`✅ Safranbolu turu başarıyla oluşturuldu: "${newTour.title}"`);
    console.log(`📅 Tarih: 11-12 Ekim 2025`);
    console.log(`💰 Fiyat: ${newTour.price} TL`);
    console.log(`🎯 Slug: ${newTour.slug}`);
    
  } catch (error) {
    if (error.code === 11000) {
      console.log('⚠️ Bu tur zaten mevcut (slug duplicate)');
    } else {
      console.error('❌ Tur oluşturma hatası:', error);
    }
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB bağlantısı kapatıldı');
  }
}

createSafranboluTour(); 