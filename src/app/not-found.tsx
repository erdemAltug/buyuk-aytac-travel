import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="relative h-64 w-64 mx-auto mb-8">
          <Image 
            src="/images/LOGO.png" 
            alt="Büyük Aytaç Travel Logo" 
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 256px"
          />
        </div>
        
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sayfa Bulunamadı</h2>
        
        <p className="text-lg text-gray-600 mb-10">
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
        </p>
        
        <div className="space-y-4">
          <Link href="/" className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors mx-auto max-w-xs">
            Ana Sayfaya Dön
          </Link>
          
          <Link href="/tours" className="block text-blue-600 hover:text-blue-800 font-medium">
            Turlarımızı Keşfedin
          </Link>
          
          <Link href="/contact" className="block text-blue-600 hover:text-blue-800 font-medium">
            Bizimle İletişime Geçin
          </Link>
        </div>
      </div>
    </div>
  );
} 