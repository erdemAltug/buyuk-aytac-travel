import Link from 'next/link';

export default function ContactCTA() {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hayalinizdeki Tatil İçin İletişime Geçin
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Büyük Aytaç Travel ile unutulmaz bir tatil deneyimi yaşamak için hemen iletişime geçin.
            Size özel tur seçenekleri ve uygun fiyat garantisi sunuyoruz.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-blue-600 font-medium px-6 py-3 rounded-md shadow-md hover:bg-blue-50 transition-colors duration-300"
          >
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </section>
  );
} 