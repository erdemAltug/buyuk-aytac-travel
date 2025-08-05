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

// Ayvalık-Cunda turu oluştur
async function createAyvalikCundaTour() {
  try {
    await connectDB();

    const tour = {
      title: "AYVALIK-CUNDA TURU - Şeytan Sofrası, Taksiyarhis Kilisesi, Rahmi Koç Müzesi",
      slug: "ayvalik-cunda-turu-seytan-sofrasi-taksiyarhis-kilisesi-rahmi-koc-muzesi",
      description: `# AYVALIK-CUNDA TUR PROGRAMI

Belirlenen saat ve duraklardan siz değerli misafirlerimizi alarak Çanakkale 1915 Köprüsünü takiben araç içi ikramlar eşliğinde yolculuğumuza başlıyoruz.

İlk durağımız Şeytan Sofrası olacaktır. Üzerinde Şeytan'ın ayak izi bulunduğuna inanılan, halkın madeni para atarak dilek dilediği eski bir lav birikintisidir. Demir kafes içine alınan ayak izine benzeyen şekil turistlerin özellikle uğradığı yerlerden biridir. Özel olarak işletilmekte, tepede bir restoran bulunmaktadır. Burada vereceğimiz serbest zamanın ardından rotamızı Ayvalık merkeze çeviriyoruz.

Ayvalık programımız sonrası dileyen misafirlerimiz tekne turuna (ekstra) katılabilir. Tekne turuna katılmayan misafirlerimiz yüzme molası için Sarımsaklı plajına gidiyoruz.

Serbest zaman sonrası rotamızı Cunda Adasına çeviriyoruz. Türkiye'nin ilk Boğaz Köprüsünden aracımız ile geçiş yaparak programımıza başlıyoruz. Taksiyarhis Kilisesi ziyaret ediyor ve adanın tadını çıkarmak için siz değerli misafirlerimize serbest zaman veriyoruz.

Rehberimizin belirleyeceği noktada buluşarak dönüş yolculuğuna geçiyor ve siz değerli misafirlerimiz ile bir sonraki BÜYÜK AYTAÇ TRAVEL organizasyonunda buluşmak üzere vedalaşıyoruz.

## ÖNEMLİ NOTLAR:

**Tekne Turu Seçeneği:**
- Dileyen misafirlerimiz (12:00-17:00) tekne turuna katılım sağlayabilirler (EKSTRA)
- Tekne turuna biniş Ayvalık'tan olup inişler Cunda Adası'nda olacaktır
- Tekne turunda koy koy yüzme molaları olacaktır
- Tekne turuna katılım sağlayacak misafirlerimizi aracımız Cunda Adası'ndan alacaktır

**Alternatif Program:**
- Tekne turuna katılmayan misafirlerimiz için; Ayvalık programı sonrası otobüsümüz Sarımsaklı Plajı'na gidip yüzme için serbest zaman verilecek
- Daha sonra Cunda programı sonrası serbest zaman olacaktır`,
      
      shortDescription: "Ayvalık ve Cunda Adası'nın eşsiz güzelliklerini keşfedin. Şeytan Sofrası, Taksiyarhis Kilisesi, Rahmi Koç Müzesi ve Taş Kahve'yi kapsayan muhteşem günübirlik tur. İsteğe bağlı tekne turu seçeneği.",
      
      image: "/images/tours/ayvalik-cunda-turu-23-agustos-2025.jpg",
      price: 1350,
      originalPrice: 1500,
      duration: "1 Gün",
      departureDate: new Date('2025-08-23T06:00:00.000Z'),
      returnDate: new Date('2025-08-23T22:00:00.000Z'),
      departureLocation: "Çerkezköy",
      destination: "Ayvalık, Cunda Adası",
      category: "Günübirlik Turlar",
      type: "daily",
      isActive: true,
      isFeatured: true,
      maxParticipants: 50,
      currentParticipants: 0,
      
      itinerary: [
        "06:00 - Çerkezköy'den hareket",
        "08:30 - Çanakkale 1915 Köprüsü geçişi",
        "10:00 - Şeytan Sofrası (dilek dileyin, manzara)",
        "11:30 - Ayvalık merkez gezisi",
        "12:00 - Tekne turu (ekstra) veya Sarımsaklı Plajı",
        "15:00 - Cunda Adası'na geçiş (Türkiye'nin ilk Boğaz Köprüsü)",
        "15:30 - Taksiyarhis Kilisesi ziyareti",
        "16:00 - Rahmi Koç Müzesi",
        "17:00 - Taş Kahve'de serbest zaman",
        "18:00 - Cunda Adası'ndan dönüş",
        "22:00 - Çerkezköy'e varış"
      ],
      
      includes: [
        "Konforlu araç ile ulaşım",
        "Profesyonel rehberlik hizmeti",
        "Araç içi ikramlar",
        "TÜRSAB üyesi tur operatörü garantisi",
        "Seyahat sigortası",
        "Tüm müze giriş ücretleri"
      ],
      
      excludes: [
        "Tekne turu (ekstra ücret)",
        "Öğle yemeği",
        "Kişisel harcamalar",
        "Plaj aktiviteleri",
        "Bahşişler"
      ],
      
      requirements: [
        "Rezervasyon için en az 3 gün önceden haber verilmesi",
        "Konforlu ayakkabı ve mevsimlik kıyafet",
        "Mayo ve havlu (tekne turu için)",
        "Fotoğraf makinesi önerilir",
        "Su ve atıştırmalık getirilebilir"
      ],
      
      highlights: [
        "Çanakkale 1915 Köprüsü geçişi",
        "Şeytan Sofrası (dilek dileyin)",
        "Ayvalık tarihi merkezi",
        "Türkiye'nin ilk Boğaz Köprüsü",
        "Taksiyarhis Kilisesi",
        "Rahmi Koç Müzesi",
        "Taş Kahve",
        "İsteğe bağlı tekne turu",
        "Sarımsaklı Plajı yüzme molası",
        "Cunda Adası serbest zaman"
      ],
      
      contactPhone: "0530 060 95 59",
      contactEmail: "info@buyukaytactravel.com",
      tursabNumber: "17674",
      
      metaDescription: "Ayvalık-Cunda Turu: Şeytan Sofrası, Taksiyarhis Kilisesi, Rahmi Koç Müzesi ve Taş Kahve. 23 Ağustos 2025 Cumartesi Çerkezköy'den hareket. İsteğe bağlı tekne turu seçeneği.",
      keywords: ["ayvalık turu", "cunda adası", "şeytan sofrası", "taksiyarhis kilisesi", "rahmi koç müzesi", "taş kahve", "çerkezköy turları", "günübirlik tur", "ege turu", "tekne turu"],
      focusKeyword: "ayvalık cunda turu"
    };

    const newTour = await Tour.create(tour);
    console.log(`✅ Ayvalık-Cunda turu başarıyla oluşturuldu: "${newTour.title}"`);
    console.log(`📅 Tarih: 23 Ağustos 2025 Cumartesi`);
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

createAyvalikCundaTour(); 