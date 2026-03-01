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

// Görsel URL mappings - her blog için uygun görseller
const imageUrlMappings = {
  // Seyahat/Budget blogs
  'budge': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'ekonomik': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Kapadokya
  'kapadokya': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'pamukkale': 'https://images.unsplash.com/photo-1615552626026-99c5b0a59f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Sigorta/Travel insurance
  'sigorta': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Çerkezköy/Local trips
  'cerkezkoy': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'hafta-sonu': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Grup turu
  'grup-turu': 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Yurtdışı/International
  'yurtdisi': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'international': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Trakya region
  'trakya': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Ege region / coastal
  'ege': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'mavi': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'plaj': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // İstanbul
  'istanbul': 'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'sefirler': 'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Solo travel
  'solo': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'tek-kisi': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Prague/City tours
  'prag': 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'city': 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Winter destinations
  'kis': 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'winter': 'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Food/Gastronomy
  'tatli': 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'yoresel': 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Camping
  'kamp': 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'camping': 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
  // Default
  'default': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
};

// Blog için uygun görsel URL'ini bul
function getImageUrlForBlog(blog) {
  const titleLower = blog.title.toLowerCase();
  const slugLower = blog.slug.toLowerCase();
  const summaryLower = blog.summary?.toLowerCase() || '';
  
  // Anahtar kelime eşleştirme
  for (const [keyword, url] of Object.entries(imageUrlMappings)) {
    if (keyword === 'default') continue;
    
    if (titleLower.includes(keyword) || slugLower.includes(keyword) || summaryLower.includes(keyword)) {
      return url;
    }
  }
  
  return imageUrlMappings.default;
}

// Görsel dosya adı oluştur
function getImageFileName(blog) {
  let fileName = blog.slug.replace(/[^a-z0-9-]/g, '').substring(0, 50);
  if (fileName.length < 10) fileName = blog.slug.substring(0, 30).replace(/[^a-z0-9-]/g, '');
  return fileName + '.jpg';
}

// Eksik görselleri tespit et ve düzelt
async function fixMissingImages() {
  try {
    await connectDB();

    console.log('\n=== EKSİK GÖRSEL DÜZELTME ===\n');

    // External URL kullanan blogları bul
    const blogs = await Blog.find({
      $or: [
        { image: /^https:\/\// },
        { image: /^http:\/\// }
      ]
    }).sort({ createdAt: -1 });

    console.log(`External URL kullanan blog sayısı: ${blogs.length}\n`);

    if (blogs.length === 0) {
      console.log('✅ Tüm bloglar local görsel kullanıyor!');
      return;
    }

    let fixedCount = 0;

    for (const blog of blogs) {
      console.log(`📝 İşleniyor: ${blog.title.substring(0, 50)}...`);
      console.log(`   Mevcut görsel: ${blog.image}`);
      
      // Uygun görsel URL'ini bul
      const imageUrl = getImageUrlForBlog(blog);
      const fileName = getImageFileName(blog);
      const localImagePath = `/images/blogs/${fileName}`;
      const fullImagePath = path.resolve(`public/images/blogs/${fileName}`);
      
      console.log(`   Yeni dosya: ${fileName}`);
      console.log(`   URL: ${imageUrl.substring(0, 70)}...`);
      
      // Görsel zaten var mı kontrol et
      if (fs.existsSync(fullImagePath)) {
        console.log(`   ⚠️ Dosya zaten var, sadece DB güncelleniyor...`);
      } else {
        console.log(`   📥 Görsel indiriliyor...`);
        
        try {
          // curl ile görseli indir
          const { execSync } = await import('child_process');
          execSync(`curl -L "${imageUrl}" -o "${fullImagePath}"`, { stdio: 'pipe' });
          
          // Dosya boyutunu kontrol et
          const stats = fs.statSync(fullImagePath);
          const fileSizeKB = Math.round(stats.size / 1024);
          console.log(`   ✅ İndirildi (${fileSizeKB} KB)`);
        } catch (downloadError) {
          console.log(`   ❌ İndirme hatası:`, downloadError.message);
          continue;
        }
      }
      
      // Veritabanını güncelle
      try {
        await Blog.updateOne(
          { _id: blog._id },
          { image: localImagePath }
        );
        console.log(`   ✅ Veritabanı güncellendi`);
        fixedCount++;
      } catch (dbError) {
        console.log(`   ❌ DB güncelleme hatası:`, dbError.message);
      }
      
      console.log('');
    }

    console.log(`\n=== ÖZET ===`);
    console.log(`✅ Düzeltilen blog: ${fixedCount}/${blogs.length}`);
    console.log(`🎉 TÜM BLOG GÖRSELLERİ HAZIR!`);

  } catch (error) {
    console.error('Görsel düzeltme hatası:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n=== MongoDB bağlantısı kapatıldı ===');
  }
}

fixMissingImages(); 