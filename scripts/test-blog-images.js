import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

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

// Görsel dosyalarını kontrol et
async function testBlogImages() {
  try {
    await connectDB();

    console.log('\n=== BLOG GÖRSEL KONTROLÜ ===\n');

    // Tüm blogları getir
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    console.log(`Toplam blog sayısı: ${blogs.length}\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const blog of blogs) {
      // Görsel yolunu public klasörüne çevir
      const imagePath = blog.image.replace('/images/', 'public/images/');
      const fullImagePath = path.resolve(imagePath);
      
      // Dosya var mı kontrol et
      if (fs.existsSync(fullImagePath)) {
        const stats = fs.statSync(fullImagePath);
        const fileSizeKB = Math.round(stats.size / 1024);
        
        console.log(`✅ ${blog.title.substring(0, 50)}...`);
        console.log(`   Görsel: ${blog.image} (${fileSizeKB} KB)`);
        console.log(`   Slug: ${blog.slug}`);
        console.log('');
        successCount++;
      } else {
        console.log(`❌ ${blog.title.substring(0, 50)}...`);
        console.log(`   EKSIK GÖRSEL: ${blog.image}`);
        console.log(`   Aranan dosya: ${fullImagePath}`);
        console.log(`   Slug: ${blog.slug}`);
        console.log('');
        errorCount++;
      }
    }

    console.log(`\n=== ÖZET ===`);
    console.log(`✅ Görseli Olan: ${successCount} blog`);
    console.log(`❌ Görseli Eksik: ${errorCount} blog`);
    
    if (errorCount === 0) {
      console.log(`\n🎉 TÜM BLOG GÖRSELLERİ HAZIR!`);
    } else {
      console.log(`\n⚠️ ${errorCount} blog görseli eksik, düzeltilmeli.`);
    }

  } catch (error) {
    console.error('Görsel kontrol hatası:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n=== MongoDB bağlantısı kapatıldı ===');
  }
}

testBlogImages(); 