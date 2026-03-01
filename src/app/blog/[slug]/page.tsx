import Image from 'next/image';
import Link from 'next/link';
import { IBlog } from '@/models/Blog';
import { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

// Tarihi formatla
const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

// Blog sayfaları için metadata oluşturma
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // API yerine doğrudan veritabanından çeken yaklaşımı kullan
    await import('@/lib/dbConnect').then((module) => module.default());
    const Blog = (await import('@/models/Blog')).default;
    
    const blog = await Blog.findOne({ slug: params.slug }).lean();
    
    if (!blog) {
      return {
        title: 'Blog Yazısı Bulunamadı | Büyük Aytaç Travel',
        description: 'Aradığınız blog yazısı bulunamadı veya kaldırılmış olabilir.',
      };
    }
    
    return {
      title: `${blog.title} | Büyük Aytaç Travel Blog`,
      description: blog.summary || blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      openGraph: {
        title: blog.title,
        description: blog.summary || blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
        type: 'article',
        publishedTime: blog.publishDate?.toString(),
        modifiedTime: blog.updatedAt?.toString(),
        url: `https://www.buyukaytactravel.com/blog/${blog.slug}`,
        images: [
          {
            url: blog.image,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.summary || blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
        images: [blog.image],
      },
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'Blog | Büyük Aytaç Travel',
      description: 'Büyük Aytaç Travel gezi blogları, seyahat yazıları ve tur önerileri',
    };
  }
}

// Blog sayfaları için static params oluşturma
export async function generateStaticParams() {
  try {
    // API yerine doğrudan veritabanından çeken fonksiyonu kullan
    // Mongoose model'inden doğrudan çağırabiliriz
    await import('@/lib/dbConnect').then((module) => module.default());
    const Blog = (await import('@/models/Blog')).default;
    
    // Tüm yayınlanmış blog yazılarını al
    const blogs = await Blog.find({ isPublished: true }).lean();
    
    // Her blog için slug parametresi oluştur
    return blogs.map((blog: IBlog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Static params generation error:', error);
    return [];
  }
}

// Sayfanın yeniden doğrulanma süresi (saniye cinsinden)
export const revalidate = 3600; // Her saat başı yeniden doğrula

// Server-side rendering için async fonksiyon olarak tanımla
export default async function BlogDetail({ params }: { params: { slug: string } }) {
  let blog: IBlog | null = null;
  let error = '';
  
  try {
    // API yerine doğrudan veritabanından çeken yaklaşımı kullan
    await import('@/lib/dbConnect').then((module) => module.default());
    const Blog = (await import('@/models/Blog')).default;
    
    blog = await Blog.findOne({ slug: params.slug }).lean();
    
    // blog içindeki _id'yi string'e çevir
    if (blog) {
      blog._id = (blog._id as unknown as { toString(): string }).toString();
      
      // Date nesnelerini formatlı şekilde çevir
      if (blog.createdAt) blog.createdAt = new Date(blog.createdAt);
      if (blog.updatedAt) blog.updatedAt = new Date(blog.updatedAt);
      if (blog.publishDate) blog.publishDate = new Date(blog.publishDate);
    }
  } catch (err) {
    console.error('Blog detayı getirme hatası:', err);
    error = 'Blog yazısı yüklenirken bir hata oluştu.';
  }

  // Hata durumu
  if (error) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  // Blog bulunamadı
  if (!blog) {
    return (
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Yazı Bulunamadı</h1>
            <p className="text-lg text-gray-600 mb-8">
              Aradığınız blog yazısı bulunamadı veya kaldırılmış olabilir.
            </p>
            <Link href="/blog" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
              Tüm Yazıları Görüntüle
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Blog detay sayfası için yapılandırılmış veri (schema.org)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blog.title,
    'image': blog.image,
    'datePublished': blog.publishDate?.toISOString(),
    'dateModified': blog.updatedAt?.toISOString(),
    'author': {
      '@type': 'Person',
      'name': blog.author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Büyük Aytaç Travel',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.buyukaytactravel.com/images/LOGO.png'
      }
    },
    'description': blog.summary || blog.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.buyukaytactravel.com/blog/${blog.slug}`
    }
  };

  // BreadcrumbList schema for SEO
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Ana Sayfa',
        'item': 'https://www.buyukaytactravel.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://www.buyukaytactravel.com/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': blog.title,
        'item': `https://www.buyukaytactravel.com/blog/${blog.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ekmek Kırıntısı Navigasyonu */}
          <div className="mb-6">
            <Breadcrumb 
              customItems={[
                { name: 'Ana Sayfa', href: '/' },
                { name: 'Blog', href: '/blog' },
                { name: blog.title, href: `/blog/${blog.slug}` }
              ]}
              className="text-gray-600"
            />
          </div>
          
          {/* Blog Başlığı */}
          <div className="text-center mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tüm Yazılar
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{blog.title}</h1>
            <div className="flex justify-center items-center text-gray-600 space-x-4">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(blog.publishDate)}
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {blog.author}
              </span>
            </div>
          </div>
          
          {/* Blog Görseli */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src={blog.image}
                alt={`${blog.title} - Büyük Aytaç Travel Blog Görseli - ${blog.categories?.join(', ')}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                quality={85}
                loading="eager"
              />
            </div>
          </div>
          
          {/* Sosyal Medya Paylaşım Butonları */}
          <div className="flex justify-end items-center space-x-3 mb-8">
            <span className="text-gray-600 text-sm">Paylaş:</span>
            
            {/* Facebook */}
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.buyukaytactravel.com/blog/${blog.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
              aria-label="Facebook'ta paylaş"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            
            {/* Twitter / X */}
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${blog.title} | Büyük Aytaç Travel`)}&url=${encodeURIComponent(`https://www.buyukaytactravel.com/blog/${blog.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-800"
              aria-label="X'de paylaş"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            
            {/* WhatsApp */}
            <a 
              href={`https://wa.me/?text=${encodeURIComponent(`${blog.title} | Büyük Aytaç Travel: https://www.buyukaytactravel.com/blog/${blog.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-700"
              aria-label="WhatsApp'ta paylaş"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
          
          {/* Blog İçeriği */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="prose max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content }} 
                className="text-gray-800"
              />
            </div>
          </div>
          
          {/* Etiketler */}
          {blog.categories && blog.categories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Kategoriler:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.categories.map((category: string, index: number) => (
                  <Link 
                    key={index}
                    href={`/blog?category=${encodeURIComponent(category)}`}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Yazarla İlgili */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Yazar Hakkında</h3>
            <p className="text-gray-700">
              Bu yazı, {blog.author} tarafından {formatDate(blog.publishDate)} tarihinde Büyük Aytaç Travel blog serisi için yazılmıştır.
            </p>
          </div>
          
          {/* İlgili İçerikler - SEO için internal linking */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili İçerikler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* İlgili bloglar için server component yapılacak */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">Benzer Blog Yazıları</h3>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <ul className="space-y-3">
                    {/* Bu kısım server component olarak ayrı implement edilecek */}
                    <li>
                      <Link 
                        href="/blog/solo-seyahat-ipuclari" 
                        className="flex items-start text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        <span className="text-blue-500 mr-2">→</span>
                        <span>Yalnız Seyahat Etmenin İncelikleri: Başlangıç Rehberi</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/blog/seyahat-fotografciligi" 
                        className="flex items-start text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        <span className="text-blue-500 mr-2">→</span>
                        <span>Seyahat Fotoğrafçılığı: Anılarınızı Ölümsüzleştirin</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/blog/avrupa-seyahat-rehberi" 
                        className="flex items-start text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        <span className="text-blue-500 mr-2">→</span>
                        <span>Avrupa Seyahat Rehberi: Gezi Planlama İpuçları</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* İlgili turlar için server component yapılacak */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">Önerilen Turlar</h3>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <ul className="space-y-3">
                    {/* Bu kısım server component olarak ayrı implement edilecek */}
                    <li>
                      <Link 
                        href="/tours/kapadokya-turu" 
                        className="flex items-start text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        <span className="text-blue-500 mr-2">→</span>
                        <span>Kapadokya 3 Gün 2 Gece Konaklamalı Tur</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/tours/istanbul-sehir-turu" 
                        className="flex items-start text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        <span className="text-blue-500 mr-2">→</span>
                        <span>İstanbul Tarihi Yarımada Günübirlik Turu</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/tours/pamukkale-turu" 
                        className="flex items-start text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        <span className="text-blue-500 mr-2">→</span>
                        <span>Pamukkale & Hierapolis 2 Gün 1 Gece Konaklamalı Tur</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 