import Image from 'next/image';
import Link from 'next/link';
import { IBlog } from '@/models/Blog';
import { Metadata } from 'next';

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

  return (
    <main className="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
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
          
          {/* Twitter */}
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${blog.title} | Büyük Aytaç Travel`)}&url=${encodeURIComponent(`https://www.buyukaytactravel.com/blog/${blog.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600"
            aria-label="Twitter'da paylaş"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
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
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M21.105 4.696c1.616 1.642 2.438 3.79 2.442 5.933.005 7.15-7.764 12.272-13.436 9.306-.359-.189-.718-.378-1.076-.568-1.586.625-5.191 1.941-5.986 1.574-.736-.338.141-4.225.582-5.932-.382-.38-.764-.761-1.146-1.142-4.915-5.212-.485-14.218 7.74-14.264 2.139-.012 4.556.704 6.072 2.256 1.485 1.471 2.501 3.267 2.868 5.029.367 1.762.094 3.575-.782 5.125 1.922-1.976 2.92-4.795 2.717-7.608-.203-2.813-1.597-5.409-3.818-7.1-2.22-1.691-5.067-2.367-7.82-1.846S.932 9.053.286 11.746c-.646 2.694-.04 5.546 1.659 7.82 1.698 2.275 4.295 3.668 7.107 3.811-.586-1.412-.554-3.001.088-4.39.642-1.388 1.841-2.447 3.334-2.936 1.492-.49 3.124-.332 4.522.437 1.398.77 2.45 2.076 2.91 3.607-.105.087-.21.174-.315.261-.105.087-.21.174-.315.261-2.263 1.577-4.454 1.585-6.407.744-.964-.393-1.82-.925-2.657-1.462-.6.278-1.22.531-1.864.752.693.61 1.433 1.181 2.243 1.638 2.434 1.363 5.225 1.412 8.132-.131 2.475-1.31 4.317-3.329 5.315-5.829 1.075-2.695.833-5.664-.693-8.33z" clipRule="evenodd" />
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
      </div>
    </main>
  );
} 