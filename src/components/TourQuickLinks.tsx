import Link from 'next/link';

const tourLinks = [
  {
    href: '/tours?tourType=domestic',
    label: 'Yurtiçi Turlar',
    description: 'Türkiye genelinde turlar',
    icon: '🏔️',
  },
  {
    href: '/tours?accommodationType=daily',
    label: 'Günübirlik Turlar',
    description: 'Tek günde keşif',
    icon: '🚌',
  },
  {
    href: '/tours?accommodationType=with_accommodation',
    label: 'Konaklamalı Turlar',
    description: '2 gün ve üzeri',
    icon: '🏨',
  },
  {
    href: '/tours?tourType=international',
    label: 'Yurtdışı Turlar',
    description: 'Yurt dışı rotalar',
    icon: '✈️',
  },
  {
    href: '/cerkezkoy-tur',
    label: 'Çerkezköy Turları',
    description: 'Çerkezköyden kalkan',
    icon: '📍',
  },
  {
    href: '/cerkezkoy-gunubirlik-turlar',
    label: 'Çerkezköy Günübirlik',
    description: 'Hafta sonu kaçamak',
    icon: '☀️',
  },
  {
    href: '/cerkezkoy-konakamali-turlar',
    label: 'Çerkezköy Konaklamalı',
    description: 'Tatil paketleri',
    icon: '🌙',
  },
  {
    href: '/annual-program',
    label: '2026 Tur Takvimi',
    description: 'Yıllık program',
    icon: '📅',
  },
];

const blogLinks = [
  {
    href: '/blog/haziran-2026-cerkezkoy-tur-takvimi',
    label: 'Haziran 2026 Tur Takvimi',
  },
  {
    href: '/blog/kapadokya-turu-2026-cerkezkoy-rehberi',
    label: 'Kapadokya Tur Rehberi',
  },
  {
    href: '/blog/isparta-gul-hasadi-salda-golu-turu-rehber',
    label: 'Gül Hasadı & Salda',
  },
  {
    href: '/blog/cerkezkoy-tur-fiyatlari-2026-guncel-liste',
    label: '2026 Tur Fiyatları',
  },
  {
    href: '/blog',
    label: 'Tüm Blog Yazıları',
  },
];

export default function TourQuickLinks() {
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-white" aria-labelledby="quick-tour-search-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 id="quick-tour-search-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Hızlı Tur Arama
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Çerkezköy, Tekirdağ ve Çorlu&apos;dan kalkan{' '}
            <Link href="/tours?tourType=domestic" className="text-blue-600 hover:underline font-medium">
              yurtiçi
            </Link>
            ,{' '}
            <Link href="/tours?accommodationType=daily" className="text-blue-600 hover:underline font-medium">
              günübirlik
            </Link>{' '}
            ve{' '}
            <Link href="/tours?accommodationType=with_accommodation" className="text-blue-600 hover:underline font-medium">
              konaklamalı
            </Link>{' '}
            turlara tek tıkla ulaşın.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
          {tourLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center text-center bg-white p-4 md:p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
            >
              <span className="text-2xl md:text-3xl mb-2" aria-hidden="true">
                {item.icon}
              </span>
              <span className="font-semibold text-slate-900 text-sm md:text-base group-hover:text-blue-600 transition-colors">
                {item.label}
              </span>
              <span className="text-xs text-slate-500 mt-1">{item.description}</span>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Çerkezköy Tur Rehberi — Blog
          </h3>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {blogLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
