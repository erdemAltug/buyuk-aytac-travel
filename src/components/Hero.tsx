import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-[600px] w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div 
        className="absolute inset-0 bg-center bg-cover bg-opacity-40 bg-black"
        style={{
          backgroundImage: 'url("/hero-image.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/50"></div>
      </div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Büyük Aytaç Seyahat ile Dünyayı Keşfedin
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Egzotik plajlardan tarihi mekanlara, size özel hazırlanmış unutulmaz seyahat deneyimleri sunuyoruz.
        </p>
        <div>
          <Link href="/tours" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 inline-flex items-center">
            Turlarımızı Keşfedin
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 