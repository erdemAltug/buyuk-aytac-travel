import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative h-40 w-40 mb-8">
        <Image 
          src="/images/LOGO.png" 
          alt="Büyük Aytaç Travel Logo" 
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 160px"
        />
      </div>
      
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
      
      <p className="text-xl text-gray-600 font-medium">Yükleniyor...</p>
      <p className="text-gray-500 mt-2">Lütfen bekleyin, içerik hazırlanıyor.</p>
    </div>
  );
} 