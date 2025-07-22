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

// Blogları kontrol et
async function checkBlogs() {
  try {
    await connectDB();

    console.log('\n=== BLOG KONTROLÜ ===\n');

    // Tüm blogları getir
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    console.log(`Toplam blog sayısı: ${blogs.length}\n`);

    // SEO kritik blogları kontrol et
    const criticalSlugs = [
      'cerkezkoyden-en-iyi-10-gunubirlik-tur-rotasi',
      '2025-turkiyenin-en-guzel-25-destinasyonu',
      '2025-en-populer-yurtdisi-tur-destinasyonlari',
      'son-dakika-tur-firsatlari-nasil-yakalanir',
      'cocuklu-aileler-icin-mukemmel-tur-rehberi'
    ];

    console.log('=== SEO KRİTİK BLOGLAR ===\n');
    
    for (const slug of criticalSlugs) {
      const blog = blogs.find(b => b.slug === slug);
      if (blog) {
        console.log(`✅ ${blog.title}`);
        console.log(`   Slug: ${blog.slug}`);
        console.log(`   Kategoriler: ${blog.categories?.join(', ') || 'Yok'}`);
        console.log(`   Focus Keyword: ${blog.focusKeyword || 'Yok'}`);
        console.log(`   Meta Description: ${blog.metaDescription ? 'Var' : 'Yok'}`);
        console.log(`   Published: ${blog.isPublished ? 'Evet' : 'Hayır'}`);
        console.log(`   Created: ${blog.createdAt.toLocaleDateString('tr-TR')}`);
        console.log('');
      } else {
        console.log(`❌ BULUNAMADI: ${slug}\n`);
      }
    }

    console.log('=== KATEGORILER ===\n');
    const allCategories = [...new Set(blogs.flatMap(b => b.categories || []))];
    console.log('Mevcut kategoriler:');
    allCategories.forEach(cat => console.log(`  - ${cat}`));

    console.log('\n=== ANAHTAR KELİMELER ===\n');
    const allKeywords = [...new Set(blogs.flatMap(b => b.keywords || []))];
    console.log(`Toplam anahtar kelime sayısı: ${allKeywords.length}`);
    
    // En popüler anahtar kelimeler
    const keywordCount = {};
    blogs.forEach(blog => {
      if (blog.keywords) {
        blog.keywords.forEach(keyword => {
          keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
        });
      }
    });
    
    const sortedKeywords = Object.entries(keywordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
    
    console.log('Top 10 anahtar kelime:');
    sortedKeywords.forEach(([keyword, count]) => {
      console.log(`  ${keyword} (${count} blog)`);
    });

  } catch (error) {
    console.error('Blog kontrolü hatası:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n=== MongoDB bağlantısı kapatıldı ===');
  }
}

checkBlogs(); 