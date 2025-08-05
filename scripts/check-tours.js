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
    type: { type: String, required: true },
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

// Turları kontrol et
async function checkTours() {
  try {
    await connectDB();

    console.log('\n=== TURLAR KONTROLÜ ===\n');

    // Tüm aktif turları getir
    const tours = await Tour.find({ isActive: true }).sort({ departureDate: 1 });

    console.log(`Toplam aktif tur sayısı: ${tours.length}\n`);

    if (tours.length === 0) {
      console.log('❌ Hiç aktif tur bulunamadı!');
      return;
    }

    // Son eklenen 5 turu göster
    console.log('📋 SON EKLENEN TURLAR:');
    console.log('─'.repeat(80));
    
    tours.slice(-5).forEach((tour, index) => {
      const date = new Date(tour.departureDate).toLocaleDateString('tr-TR');
      const price = tour.price.toLocaleString('tr-TR');
      const originalPrice = tour.originalPrice ? tour.originalPrice.toLocaleString('tr-TR') : '';
      
      console.log(`${index + 1}. ${tour.title}`);
      console.log(`   📅 Tarih: ${date}`);
      console.log(`   💰 Fiyat: ${price} TL${originalPrice ? ` (${originalPrice} TL)` : ''}`);
      console.log(`   🎯 Slug: ${tour.slug}`);
      console.log(`   📍 Kalkış: ${tour.departureLocation}`);
      console.log(`   🏷️ Kategori: ${tour.category}`);
      console.log(`   ⭐ Öne Çıkan: ${tour.isFeatured ? 'Evet' : 'Hayır'}`);
      console.log(`   👥 Katılımcı: ${tour.currentParticipants}/${tour.maxParticipants || 'Sınırsız'}`);
      console.log('');
    });

    // Kategorilere göre tur sayıları
    const categories = {};
    tours.forEach(tour => {
      categories[tour.category] = (categories[tour.category] || 0) + 1;
    });

    console.log('📊 KATEGORİLERE GÖRE TUR SAYILARI:');
    console.log('─'.repeat(40));
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`${category}: ${count} tur`);
    });

    console.log('\n🎯 ORMANYA TURU KONTROLÜ:');
    console.log('─'.repeat(40));
    
    const ormanyaTour = tours.find(tour => tour.slug.includes('ormanya'));
    if (ormanyaTour) {
      console.log('✅ Ormanya turu bulundu!');
      console.log(`   Başlık: ${ormanyaTour.title}`);
      console.log(`   Tarih: ${new Date(ormanyaTour.departureDate).toLocaleDateString('tr-TR')}`);
      console.log(`   Fiyat: ${ormanyaTour.price.toLocaleString('tr-TR')} TL`);
      console.log(`   Görsel: ${ormanyaTour.image}`);
      console.log(`   Öne Çıkan: ${ormanyaTour.isFeatured ? 'Evet' : 'Hayır'}`);
      console.log(`   Aktif: ${ormanyaTour.isActive ? 'Evet' : 'Hayır'}`);
    } else {
      console.log('❌ Ormanya turu bulunamadı!');
    }

  } catch (error) {
    console.error('Tur kontrol hatası:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB bağlantısı kapatıldı');
  }
}

checkTours(); 