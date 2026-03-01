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

// Ormanya turu oluştur
async function createOrmanyaTour() {
  try {
    await connectDB();

    const tour = {
      title: "ORMANYA TURU - Derince Harikalar Sahili, Hobbit Evleri, Maşukiye, Sapanca",
      slug: "ormanya-turu-derince-harikalar-sahili-hobbit-evleri-masukiye-sapanca",
      description: `# ORMANYA TUR PROGRAMI

Sabah saatlerinde belirtilen noktalardan hareketle Silivri ve İstanbul'u takiben, İlk olarak Doğalhane dinlenme tesislerinde mola veriyoruz. Mola sonrası İzmit'i takiben, Derince Harikalar Sahili'ne varıyoruz. Türkiye'nin ilk çizgi film temalı parkı olan bu sahilde dileyen misafirlerimiz kafelerde kahvaltı alabilir.

Bir sonraki durağımız olan Ormanya Tabiat Parkı'na doğru yola çıkıyoruz. 4 bin dönüm alandan oluşan Doğal Yaşam Parkı Ormanya, 53 farklı türden 467 hayvanı ve bitki türünü içinde barındırıyor. Ala geyikler, ceylanlar, karacalar gibi birçok tür park içerisindeki doğal yaşam alanlarında nesillerini sürdürüyor.

Günümüze ''Yüzüklerin Efendisi'' ve ''Hobbitler'' filmiyle tanımamıza vesile olan kahramanların kaldıkları evlerin bulunduğu alanı gezerek filmlerde izlediğiniz kahramanları akıllarınıza geleceğini, eğlenceli dakikalar geçirebileceğinizi ve unutulmaz anılar biriktirip fotoğraflayacağınıza eminiz.

Buradaki serbest zamanımızın ardından Maşukiye'ye hareket ediyoruz. Maşukiye'de şelale kenarında bol oksijenli doğasında rehberimizin keyifli anlatımının ardından kısa bir fotoğraf ve alışveriş molası veriyoruz. Dileyen misafirlerimiz ile şelaleye kadar yürüyüş yapıyoruz. Köy pazarında alışveriş, atv ve zipline yapılabilir. Ardından öğle yemeği(ekstra)molası veriyoruz.

Öğle yemeğimizin sonrasında Sapanca'ya hareket ediyoruz. Sapanca gölü hakkında rehberimizin gerekli anlatımların ardından, göl kenarında kordon boyunca bulunan kafelerde tüm günün yorgunluğunu atabilmeniz için çayınızı ve kahvenizi keyifle yudumlamanız için serbest zaman bırakıyoruz.

Serbest zamanımızın ardından Çerkezköy'e doğru hareket ediyoruz. Siz değerli misafirlerimizi aldığımız noktalara bırakarak, bir başka Büyük Aytaç Travel organizasyonunda yeniden görüşmek üzere vedalaşıyoruz.`,
      
      shortDescription: "Derince Harikalar Sahili, Ormanya Hobbit Evleri, Maşukiye Şelalesi ve Sapanca Gölü'nü kapsayan muhteşem günübirlik tur. Film setlerini andıran Hobbit evlerinde unutulmaz anılar biriktirin.",
      
      image: "/images/tours/ormanya-turu-14-eylul-2025.jpg",
      price: 1000,
      originalPrice: 1200,
      duration: "1 Gün",
      departureDate: new Date('2025-09-14T07:00:00.000Z'),
      returnDate: new Date('2025-09-14T20:00:00.000Z'),
      departureLocation: "Çerkezköy",
      destination: "Derince, Ormanya, Maşukiye, Sapanca",
      category: "Günübirlik Turlar",
      type: "daily",
      isActive: true,
      isFeatured: true,
      maxParticipants: 50,
      currentParticipants: 0,
      
      itinerary: [
        "07:00 - Çerkezköy'den hareket",
        "08:30 - Doğalhane dinlenme tesislerinde mola",
        "10:00 - Derince Harikalar Sahili (Türkiye'nin ilk çizgi film temalı parkı)",
        "11:30 - Ormanya Tabiat Parkı (Hobbit Evleri, 467 hayvan türü)",
        "14:00 - Maşukiye Şelalesi (ATV, Zipline, Köy pazarı)",
        "16:00 - Sapanca Gölü (Kordon boyu kafeler, serbest zaman)",
        "20:00 - Çerkezköy'e dönüş"
      ],
      
      includes: [
        "Konforlu araç ile ulaşım",
        "Profesyonel rehberlik hizmeti",
        "TÜRSAB üyesi tur operatörü garantisi",
        "Seyahat sigortası",
        "Tüm park giriş ücretleri"
      ],
      
      excludes: [
        "Öğle yemeği (ekstra ücret)",
        "Kişisel harcamalar",
        "ATV ve Zipline aktiviteleri (ekstra ücret)",
        "Bahşişler"
      ],
      
      requirements: [
        "Rezervasyon için en az 3 gün önceden haber verilmesi",
        "Konforlu ayakkabı ve mevsimlik kıyafet",
        "Fotoğraf makinesi önerilir",
        "Su ve atıştırmalık getirilebilir"
      ],
      
      highlights: [
        "Türkiye'nin ilk çizgi film temalı parkı",
        "4 bin dönüm Ormanya Tabiat Parkı",
        "Yüzüklerin Efendisi temalı Hobbit Evleri",
        "467 farklı hayvan türü",
        "Maşukiye Şelalesi doğal güzelliği",
        "Sapanca Gölü manzarası",
        "ATV ve Zipline aktivite seçenekleri"
      ],
      
      contactPhone: "0530 060 95 59",
      contactEmail: "info@buyukaytactravel.com",
      tursabNumber: "17674",
      
      metaDescription: "Ormanya Turu: Derince Harikalar Sahili, Hobbit Evleri, Maşukiye Şelalesi ve Sapanca Gölü. 14 Eylül 2025 Pazar günü Çerkezköy'den hareket. TÜRSAB üyesi ile güvenli seyahat.",
      keywords: ["ormanya turu", "derince harikalar sahili", "hobbit evleri", "maşukiye şelalesi", "sapanca gölü", "çerkezköy turları", "günübirlik tur", "doğa turu", "tabiat parkı"],
      focusKeyword: "ormanya turu"
    };

    const newTour = await Tour.create(tour);
    console.log(`✅ Ormanya turu başarıyla oluşturuldu: "${newTour.title}"`);
    console.log(`📅 Tarih: 14 Eylül 2025 Pazar`);
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

createOrmanyaTour(); 