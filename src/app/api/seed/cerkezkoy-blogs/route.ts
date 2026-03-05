import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';

const cerkezkoyBlogs = [
  {
    title: "Çerkezköy Tur Fiyatları 2026 | Günübirlik ve Konaklamalı Tur Paketleri",
    slug: "cerkezkoy-tur-fiyatlari-2026",
    content: "<h2>Çerkezköy Tur Fiyatları 2026</h2><p>Çerkezköy ve çevresinden düzenlenen turların fiyatları, tur tipine, süresine ve destinasyona göre değişiklik göstermektedir.</p><h3>Günübirlik Tur Fiyatları</h3><p>Günübirlik turlar genellikle 1.500 TL ile 2.500 TL arasında değişmektedir.</p><h3>Konaklamalı Tur Fiyatları</h3><p>Konaklamalı turlar 3 gün 2 gece paketleri için 3.500 TL'den başlamaktadır.</p>",
    excerpt: "Çerkezköy tur fiyatları 2026. Günübirlik ve konaklamalı turlar için en uygun fiyatlar.",
    category: "Seyahat İpuçları",
    tags: ["çerkezköy tur", "tur fiyatları", "2026"],
    isPublished: true,
    author: 'Büyük Aytaç Travel',
    image: '/images/blogs/cerkezkoy-gunubirlik-turlar.jpg',
    isFeatured: true
  },
  {
    title: "Çerkezköy'den En Popüler Günübirlik Turlar 2026",
    slug: "cerkezkoyden-en-populer-gunubirlik-turlar",
    content: "<h2>Çerkezköy'den En Popüler Günübirlik Turlar</h2><p>İstanbul, Bursa, Safranbolu gibi popüler destinasyonlara düzenlenen günübirlik turlarımız.</p>",
    excerpt: "Çerkezköy'den en popüler günübirlik turlar. İstanbul, Bursa, Safranbolu turları.",
    category: "Tur Rehberleri",
    tags: ["çerkezköy günübirlik tur", "günübirlik tur"],
    isPublished: true,
    author: 'Büyük Aytaç Travel',
    image: '/images/blogs/cerkezkoy-gunubirlik-turlar.jpg',
    isFeatured: false
  },
  {
    title: "Çerkezköy Hafta Sonu Kaçamak Destinasyonları 2026",
    slug: "cerkezkoy-hafta-sonu-kacamak",
    content: "<h2>Çerkezköy Hafta Sonu Kaçamak Destinasyonları</h2><p>Kapadokya, Safranbolu, Boğaz turu ve Karadeniz yaylaları.</p>",
    excerpt: "Çerkezköy'den hafta sonu kaçamak destinasyonları.",
    category: "Seyahat İpuçları",
    tags: ["çerkezköy hafta sonu turu", "hafta sonu kaçamak"],
    isPublished: true,
    author: 'Büyük Aytaç Travel',
    image: '/images/blogs/cerkezkoy-gunubirlik-turlar.jpg',
    isFeatured: false
  },
  {
    title: "Çerkezköy Tur Şirketi Nasıl Seçilir? - En İyi Tur Firması Rehberi",
    slug: "cerkezkoy-tur-sirketi-nasil-secilir",
    content: "<h2>Çerkezköy Tur Şirketi Nasıl Seçilir?</h2><p>TÜRSAB üyeliği, yorumlar ve fiyat şeffaflığına dikkat edin.</p>",
    excerpt: "Çerkezköy tur şirketi nasıl seçilir? Kapsamlı rehber.",
    category: "Seyahat İpuçları",
    tags: ["çerkezköy tur şirketi", "tur firması"],
    isPublished: true,
    author: 'Büyük Aytaç Travel',
    image: '/images/blogs/cerkezkoy-gunubirlik-turlar.jpg',
    isFeatured: false
  },
  {
    title: "Çerkezköy Aile Turları - Çocuklu Aileler İçin En İyi Tur Rotaları",
    slug: "cerkezkoy-aile-turlari",
    content: "<h2>Çerkezköy Aile Turları</h2><p>Çocuklu aileler için özel tur paketlerimiz.</p>",
    excerpt: "Çerkezköy aile turları. Çocuklu aileler için en iyi turlar.",
    category: "Tur Rehberleri",
    tags: ["çerkezköy aile turu", "çocuklu aile turları"],
    isPublished: true,
    author: 'Büyük Aytaç Travel',
    image: '/images/blogs/cocuklu-aile-turlari.jpg',
    isFeatured: false
  },
  {
    title: "Trakya Bölgesi Gezilecek Yerler - Çerkezköy Tur Rotaları",
    slug: "trakya-bolgesi-gezilecek-yerler",
    content: "<h2>Trakya Bölgesi Gezilecek Yerler</h2><p>Edirne, Tekirdağ, Kırklareli ve daha fazlası.</p>",
    excerpt: "Trakya bölgesi gezilecek yerler ve tur önerileri.",
    category: "Destinasyonlar",
    tags: ["trakya turları", "çerkezköy"],
    isPublished: true,
    author: 'Büyük Aytaç Travel',
    image: '/images/blogs/trakya-blgesinin-gizli-cennettleri-yerel-rehberin-.jpg',
    isFeatured: false
  },
  {
    title: "Çerkezköy Tur Operatörü - Güvenilir ve Profesyonel Hizmet",
    slug: "cerkezkoy-tur-operatoru",
    content: "<h2>Çerkezköy Tur Operatörü</h2><p>Büyük Aytaç Travel - 20 yılı aşkın deneyim.</p>",
    excerpt: "Çerkezköy tur operatörü Büyük Aytaç Travel.",
    category: "Kurumsal",
    tags: ["çerkezköy tur operatörü", "tur acentesi"],
    isPublished: true,
    author: 'Büyük Aytaç Travel',
    image: '/images/blogs/cerkezkoy-gunubirlik-turlar.jpg',
    isFeatured: false
  },
  {
    title: "Çerkezköy Seyahat Rehberi - Her Şey Dahil Tur Paketleri",
    slug: "cerkezkoy-seyahat-rehberi",
    content: "<h2>Çerkezköy Seyahat Rehberi</h2><p>Çerkezköy'den yapılabilecek turlar ve seyahat ipuçları.</p>",
    excerpt: "Çerkezköy seyahat rehberi ve tur paketleri.",
    category: "Seyahat İpuçları",
    tags: ["çerkezköy seyahat", "tur rehberi"],
    isPublished: true,
    author: 'Büyük Aytaç Travel',
    image: '/images/blogs/cerkezkoy-gunubirlik-turlar.jpg',
    isFeatured: false
  }
];

export async function POST() {
  try {
    await dbConnect();
    
    let imported = 0;
    let failed = 0;
    const errors: string[] = [];
    
    for (const blog of cerkezkoyBlogs) {
      try {
        // Check if blog already exists
        const existing = await Blog.findOne({ slug: blog.slug });
        
        if (existing) {
          // Update existing blog
          await Blog.findOneAndUpdate(
            { slug: blog.slug },
            {
              title: blog.title,
              content: blog.content,
              excerpt: blog.excerpt,
              category: blog.category,
              tags: blog.tags,
              isPublished: blog.isPublished,
              isFeatured: blog.isFeatured || false,
              author: {
                name: blog.author || 'Büyük Aytaç Travel'
              },
              featuredImage: {
                url: blog.image || '/images/blogs/default.jpg',
                alt: blog.title
              }
            }
          );
        } else {
          // Create new blog
          await Blog.create({
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            excerpt: blog.excerpt,
            category: blog.category,
            tags: blog.tags,
            isPublished: blog.isPublished,
            isFeatured: blog.isFeatured || false,
            author: {
              name: blog.author || 'Büyük Aytaç Travel'
            },
            featuredImage: {
              url: blog.image || '/images/blogs/default.jpg',
              alt: blog.title
            },
            publishedAt: new Date()
          });
        }
        imported++;
      } catch (err: any) {
        failed++;
        errors.push(`${blog.title}: ${err.message}`);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `${imported} blog yazısı içe aktarıldı`,
      failed,
      errors: errors.length > 0 ? errors : undefined
    });
  } catch (error: any) {
    console.error('Blog seed error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
