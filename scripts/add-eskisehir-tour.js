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

// Eskişehir turu oluştur
async function createEskisehirTour() {
  try {
    await connectDB();

    const tour = {
      title: "ESKİŞEHİR TURU - Kent Park, Sazova Parkı, Atlıhan Çarşısı, Balmumu Müzesi",
      slug: "eskisehir-turu-kent-park-sazova-parki-atlihan-carsisi-balmumu-muzesi",
      description: `# ESKİŞEHİR TUR PROGRAMI

Çerkezköy'den 01:30'da hareket ediyoruz. İstanbul, Adapazarı, Bozüyük'ü takiben Unesco tarafından 2013 yılında Türk Dünyasının Kültür Başkenti ve Somut Olmayan Kültürel Miras Başkentliği ünvanı almış olan Eskişehir'e ulaşıyoruz.

Frigyalılar döneminde çok önemli bir yeri olan ve Anadolu'da ilklerin kenti olarak adlandırılan Eskişehir'e vardığımız anda öncelikle ilk durağımız Porsuk Çayı oluyor. Çay kenarında alacağımız kahvaltı sonra çay kenarında sabah yürüyüşümüzü yapıyoruz.

Daha sonrasında tarihi Odunpazarı'na geçiyoruz. 19. YY Osmanlı ahşap mimarisinin en güzel örneklerini görebileceğimiz Konakların arasında uzanan Arnavut kaldırımlı sokaklarda yürüyüşümüzü yaptıktan sonrasında 1525 yılında yaptırılan Kurşunlu Camii ve külliyesini gezmeye başlıyoruz.

Cami, Medrese, Kervansaray, Sıbyan Mektebi, Şadırvan ve Lületaşı Müzesini ziyaret ettikten sonra Koruma altına alınmış olan evlerin arasında dolaşarak ve fotoğraf çekerek Beyler sokağından Atlıhan Kapalı Çarşısına geçiyoruz. Lületaşının ustaların ellerinde nasıl şekillendiğini görme şansı buluyoruz.

Ardından Prof. Dr. Yılmaz Büyükerşen'in Eskişehir Büyük Şehir Belediyesine bağışladığı, tarihi karakterler, yerli ve yabancı ünlü isimlerin, Atatürk'ün ve ailesinin, yerli ve yabancı devlet adamlarının, medya mensuplarının ve sporcuların canlı hissi veren heykellerin bulunduğu Yılmaz Büyükerşen Balmumu Heykeller Müzesini dolaşıyoruz.

İlk Türk yapımı otomobil olarak tarihe geçen Devrim Arabaları Müzesi'ni ziyaret ediyoruz. Odunpazarı gezimizi bitirdikten sonra Eskişehir'in en büyük parkı olan Sazova Bilim Sanat ve Kültür parkını gezmeye başlıyoruz.

Sizleri büyüleyecek olan Sazova Bilim Sanat ve Kültür parkında Kalyon Gemisi, Bilim Deney Merkezi ve Uzayevi ve Masal Şatosunu ziyaret edebilirsiniz. Burada geçirecek olduğunuz unutulmaz dakikaların ardından Eskişehir tur programımızı tamamlayıp, Çerkezköy'e dönmek üzere yola çıkıyoruz.

Siz değerli misafirlerimizi aldığımız noktalara bırakarak, bir sonraki BÜYÜK AYTAÇ TRAVEL turumuzda yeniden görüşmek üzere vedalaşıyoruz.

**Not:** Çerkezköy'e dönüş saatimiz değişiklik gösterebilir (gece 01:00 civarı). Tur programı bölge yoğunluğuna göre değişiklik gösterebilir.`,
      
      shortDescription: "Eskişehir'in tarihi ve kültürel zenginliklerini keşfedin. Porsuk Çayı, Odunpazarı evleri, Kurşunlu Külliyesi, Balmumu Müzesi, Devrim Arabaları ve Sazova Parkı'nı kapsayan muhteşem günübirlik tur.",
      
      image: "/images/tours/eskisehir-turu-13-eylul-2025.jpg",
      price: 1600,
      originalPrice: 1800,
      duration: "1 Gün",
      departureDate: new Date('2025-09-13T01:30:00.000Z'),
      returnDate: new Date('2025-09-13T23:00:00.000Z'),
      departureLocation: "Çerkezköy",
      destination: "Eskişehir",
      category: "Günübirlik Turlar",
      type: "daily",
      isActive: true,
      isFeatured: true,
      maxParticipants: 50,
      currentParticipants: 0,
      
      itinerary: [
        "01:30 - Çerkezköy'den hareket",
        "06:00 - Eskişehir'e varış",
        "06:30 - Porsuk Çayı'nda kahvaltı ve sabah yürüyüşü",
        "08:00 - Odunpazarı tarihi evleri gezisi",
        "09:00 - Kurşunlu Camii ve Külliyesi",
        "10:00 - Lületaşı Müzesi",
        "11:00 - Atlıhan Kapalı Çarşısı",
        "12:00 - Yılmaz Büyükerşen Balmumu Heykeller Müzesi",
        "13:00 - Devrim Arabaları Müzesi",
        "14:00 - Sazova Bilim Sanat ve Kültür Parkı",
        "15:00 - Masal Şatosu, Kalyon Gemisi, Bilim Deney Merkezi",
        "18:00 - Çerkezköy'e dönüş",
        "23:00 - Çerkezköy'e varış (yaklaşık)"
      ],
      
      includes: [
        "Konforlu araç ile ulaşım",
        "Profesyonel rehberlik hizmeti",
        "Kahvaltı",
        "TÜRSAB üyesi tur operatörü garantisi",
        "Seyahat sigortası",
        "Tüm müze giriş ücretleri"
      ],
      
      excludes: [
        "Öğle yemeği (ekstra ücret)",
        "Kişisel harcamalar",
        "Lületaşı alışverişi",
        "Bahşişler"
      ],
      
      requirements: [
        "Rezervasyon için en az 3 gün önceden haber verilmesi",
        "Konforlu ayakkabı ve mevsimlik kıyafet",
        "Fotoğraf makinesi önerilir",
        "Su ve atıştırmalık getirilebilir",
        "Gece dönüş olduğu için uyku tulumu önerilir"
      ],
      
      highlights: [
        "UNESCO Türk Dünyası Kültür Başkenti Eskişehir",
        "Porsuk Çayı manzarası",
        "19. YY Osmanlı ahşap mimarisi",
        "Kurşunlu Camii ve Külliyesi (1525)",
        "Lületaşı Müzesi ve ustaları",
        "Atlıhan Kapalı Çarşısı",
        "Balmumu Heykeller Müzesi",
        "Devrim Arabaları Müzesi",
        "Sazova Bilim Sanat ve Kültür Parkı",
        "Masal Şatosu ve Kalyon Gemisi"
      ],
      
      contactPhone: "0530 060 95 59",
      contactEmail: "info@buyukaytactravel.com",
      tursabNumber: "17674",
      
      metaDescription: "Eskişehir Turu: Porsuk Çayı, Odunpazarı evleri, Kurşunlu Külliyesi, Balmumu Müzesi, Devrim Arabaları ve Sazova Parkı. 13 Eylül 2025 Cumartesi Çerkezköy'den hareket. Kahvaltı dahil.",
      keywords: ["eskisehir turu", "porsuk çayı", "odunpazarı", "kurşunlu külliyesi", "balmumu müzesi", "devrim arabaları", "sazova parkı", "çerkezköy turları", "günübirlik tur", "kültür turu"],
      focusKeyword: "eskisehir turu"
    };

    const newTour = await Tour.create(tour);
    console.log(`✅ Eskişehir turu başarıyla oluşturuldu: "${newTour.title}"`);
    console.log(`📅 Tarih: 13 Eylül 2025 Cumartesi`);
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

createEskisehirTour(); 