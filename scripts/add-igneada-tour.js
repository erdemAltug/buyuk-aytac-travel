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

// İğneada turu oluştur
async function createIgneadaTour() {
  try {
    await connectDB();

    const tour = {
      title: "İĞNEADA TURU - Dupnisa Mağarası, Longoz Ormanları Milli Parkı, Demirköy",
      slug: "igneada-turu-dupnisa-magarasi-longoz-ormanlari-milli-parki-demirkoy",
      description: `# İĞNEADA TUR PROGRAMI

**DUPNİSA MAĞARASI-LONGOZ ORMANLARI MİLLİ PARKI-İĞNEADA-DEMİRKÖY**

Gezimiz sabah 07:00'da Çerkezköy Köşem Kahveler durağından hareketle başlar. Istranca Dağları'nın eteklerinde Demirköy ilçesinde bulunan Dupnisa Mağarasına ulaşıyoruz.

Sarpdere köyü sınırları içinde köyün 5-6 km güneybatısında yer alan mağara, üç girişe sahip ve toplam uzunluğu 3200 m'dir. El değmemiş sarkık ve dikikleriyle her bölgeden gezginlere, kampçılara ve turizme hizmet veriyor.

Serbest zaman sonrası Istranca Dağlarının denizle buluşan noktası olan İğneada tarafına geçiyoruz. İğneada merkezde öğle yemeği için serbest zaman veriyoruz.

İğneada'daki zamanımız dolduktan sonra Longoz Ormanları Milli Parkında kısa bir yürüyüş yapıyoruz. Bu kısa turumuz sonrası Demirköy'e hareket ediyoruz.

Demirköy'de serbest zaman veriyoruz. Serbest zaman sonrası Çerkezköy'e dönüşe geçiyoruz. Siz değerli misafirlerimizi aldığımız noktalara bırakarak, bir sonraki Büyük Aytaç Travel organizasyonunda görüşmek üzere vedalaşıyoruz.`,
      
      shortDescription: "Istranca Dağları'nın eteklerinde doğal güzellikleri keşfedin. Dupnisa Mağarası, Longoz Ormanları Milli Parkı, İğneada ve Demirköy'ü kapsayan muhteşem günübirlik tur.",
      
      image: "/images/tours/igneada-turu-24-agustos-2025.jpg",
      price: 1000,
      originalPrice: 1200,
      duration: "1 Gün",
      departureDate: new Date('2025-08-24T07:00:00.000Z'),
      returnDate: new Date('2025-08-24T20:00:00.000Z'),
      departureLocation: "Çerkezköy",
      destination: "İğneada, Demirköy, Dupnisa Mağarası",
      category: "Günübirlik Turlar",
      type: "daily",
      isActive: true,
      isFeatured: true,
      maxParticipants: 50,
      currentParticipants: 0,
      
      itinerary: [
        "07:00 - Çerkezköy Köşem Kahveler'den hareket",
        "09:00 - Dupnisa Mağarası (3200m uzunluk)",
        "11:00 - İğneada'ya geçiş",
        "12:00 - İğneada merkez (öğle yemeği serbest zaman)",
        "14:00 - Longoz Ormanları Milli Parkı",
        "15:00 - Milli parkta yürüyüş",
        "16:00 - Demirköy'e hareket",
        "17:00 - Demirköy'de serbest zaman",
        "18:00 - Çerkezköy'e dönüş",
        "20:00 - Çerkezköy'e varış"
      ],
      
      includes: [
        "Konforlu araç ile ulaşım",
        "Profesyonel rehberlik hizmeti",
        "TÜRSAB üyesi tur operatörü garantisi",
        "Seyahat sigortası",
        "Mağara giriş ücreti",
        "Milli park giriş ücreti"
      ],
      
      excludes: [
        "Öğle yemeği",
        "Kişisel harcamalar",
        "Mağara içi fotoğraf ücretleri",
        "Bahşişler"
      ],
      
      requirements: [
        "Rezervasyon için en az 3 gün önceden haber verilmesi",
        "Konforlu ayakkabı (mağara ve orman yürüyüşü için)",
        "Mevsimlik kıyafet",
        "Fotoğraf makinesi önerilir",
        "Su ve atıştırmalık getirilebilir",
        "Mağara için ışık kaynağı önerilir"
      ],
      
      highlights: [
        "Dupnisa Mağarası (3200m uzunluk)",
        "Istranca Dağları manzarası",
        "Longoz Ormanları Milli Parkı",
        "İğneada sahil şeridi",
        "Demirköy tarihi merkezi",
        "Doğa yürüyüşü",
        "Mağara keşfi",
        "Karadeniz manzarası"
      ],
      
      contactPhone: "0530 060 95 59",
      contactEmail: "info@buyukaytactravel.com",
      tursabNumber: "17674",
      
      metaDescription: "İğneada Turu: Dupnisa Mağarası, Longoz Ormanları Milli Parkı, İğneada ve Demirköy. 24 Ağustos 2025 Pazar Çerkezköy'den hareket. Doğa ve mağara keşfi.",
      keywords: ["iğneada turu", "dupnisa mağarası", "longoz ormanları", "demirköy", "istranca dağları", "çerkezköy turları", "günübirlik tur", "doğa turu", "mağara turu"],
      focusKeyword: "iğneada turu"
    };

    const newTour = await Tour.create(tour);
    console.log(`✅ İğneada turu başarıyla oluşturuldu: "${newTour.title}"`);
    console.log(`📅 Tarih: 24 Ağustos 2025 Pazar`);
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

createIgneadaTour(); 