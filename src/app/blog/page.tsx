import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogContent from './components/BlogContent';
import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';

// Plain blog object tipi (Document'ı extend etmeyen)
interface BlogData {
  _id?: string;
  title: string;
  content: string;
  image: string;
  slug: string;
  summary: string;
  author: string;
  categories: string[];
  isPublished: boolean;
  views?: number;
  createdAt: Date;
  updatedAt: Date;
  publishDate: Date;
}

// SEO için metadata
export const metadata: Metadata = {
  title: 'Blog | Seyahat Yazıları ve Gezi Rehberleri | Büyük Aytaç Travel',
  description: 'Büyük Aytaç Travel blog sayfası. Seyahat ipuçları, gezi rehberleri, destinasyon önerileri ve Çerkezköy\'den çıkan tur deneyimleri.',
  keywords: 'seyahat blog, gezi yazıları, tur deneyimleri, seyahat rehberi, çerkezköy gezi, tatil önerileri, destinasyon rehberi',
  openGraph: {
    title: 'Blog | Büyük Aytaç Travel',
    description: 'Seyahat ipuçları, gezi rehberleri ve tur deneyimlerini keşfedin.',
    url: 'https://www.buyukaytactravel.com/blog',
    type: 'website',
    images: [
      {
        url: 'https://www.buyukaytactravel.com/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Büyük Aytaç Travel Blog',
      },
    ],
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // URL parametresinden kategoriyi al
  const activeCategory = searchParams.category || 'all';

  // Server-side'da blog yazılarını getir
  let blogs: BlogData[] = [];
  let error = null;

  try {
    await dbConnect();
    
    let query: any = { isPublished: true };
    
    // Kategori filtrelemesi
    if (activeCategory !== 'all') {
      query.categories = activeCategory;
    }
    
    // Blog yazılarını getir ve sırala
    const rawBlogs = await Blog.find(query)
      .sort({ publishDate: -1 })
      .lean();
    
    // _id'leri string'e çevir ve BlogData tipine uygun hale getir
    blogs = rawBlogs.map((blog: any) => ({
      _id: blog._id.toString(),
      title: blog.title,
      content: blog.content,
      image: blog.image,
      slug: blog.slug,
      summary: blog.summary,
      author: blog.author,
      categories: blog.categories || [],
      isPublished: blog.isPublished,
      views: blog.views || 0,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      publishDate: blog.publishDate,
    }));
  } catch (err) {
    console.error('Blog yazılarını getirme hatası:', err);
    error = 'Blog yazıları yüklenirken bir hata oluştu.';
  }

  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  // Schema.org yapılandırılmış veri
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://www.buyukaytactravel.com/blog',
    'name': 'Büyük Aytaç Travel Blog',
    'description': 'Seyahat ipuçları, gezi rehberleri ve tur deneyimleri',
    'url': 'https://www.buyukaytactravel.com/blog',
    'inLanguage': 'tr-TR',
    'publisher': {
      '@type': 'Organization',
      'name': 'Büyük Aytaç Travel',
      'url': 'https://www.buyukaytactravel.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.buyukaytactravel.com/images/LOGO.png'
      }
    },
    'blogPost': blogs.map(blog => ({
      '@type': 'BlogPosting',
      'headline': blog.title,
      'description': blog.summary,
      'url': `https://www.buyukaytactravel.com/blog/${blog.slug}`,
      'datePublished': blog.publishDate,
      'dateModified': blog.updatedAt,
      'author': {
        '@type': 'Person',
        'name': blog.author
      },
      'image': blog.image
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Seyahat tutkunları için hazırladığımız blog yazılarımızda gezi ipuçları, 
              destinasyon rehberleri ve Çerkezköy'den çıkan turlarımızın deneyimlerini bulabilirsiniz.
            </p>
          </div>
          
          {/* Client component'e blog yazılarını ve aktif kategoriyi geçir */}
          <Suspense 
            fallback={
              <div>
                <div className="flex justify-center mb-12">
                  <div className="h-8 w-96 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-56 bg-gray-200 animate-pulse"></div>
                      <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          >
            <BlogContent blogs={blogs as any} activeCategory={activeCategory} />
          </Suspense>
        </div>
      </main>
    </>
  );
} 