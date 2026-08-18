import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    title: 'Kapadokya Turları',
    href: '/kapadokya-turu',
    image: '/images/kapadokya.jpeg',
  },
  {
    title: 'Balkan Turları',
    href: '/balkan-turlari',
    image: '/images/hero-banner.jpg',
  },
  {
    title: 'GAP & Doğu Anadolu',
    href: '/gap-turu',
    image: '/images/gap-turu.jpeg',
  },
  {
    title: 'Karadeniz & Batum',
    href: '/karadeniz-turu',
    image: '/images/karadeniz-turu.jpeg',
  },
  {
    title: 'Çanakkale & Bozcaada',
    href: '/ege-turu',
    image: '/images/bozcada-26.07.jpeg',
  },
  {
    title: 'Ege & İzmir Turları',
    href: '/ege-turu',
    image: '/images/ayvalik-cunda-12-temmuz.jpeg',
  },
  {
    title: 'İstanbul & Boğaz',
    href: '/tours?destination=İstanbul',
    image: '/images/fener-balat-13-eylul.jpeg',
  },
  {
    title: 'Günübirlik Turlar',
    href: '/tours?accommodationType=daily',
    image: '/images/ormanya-23-agustos.jpeg',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Popüler Tur Rotaları</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Kapadokya&apos;dan Balkanlar&apos;a, Ege adalarından Karadeniz&apos;e en çok tercih edilen rotalar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white sm:text-base">
                {category.title}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/tours"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-sm sm:text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            Tüm Rotaları Gör
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
