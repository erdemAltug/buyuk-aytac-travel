import Image from 'next/image';
import Link from 'next/link';

const valueItems = [
  {
    label: 'Binlerce Seçkin Tur',
    hint: 'Yurtiçi ve günübirlik programlar',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    label: 'On Binlerce Mutlu Misafir',
    hint: 'Çerkezköy ve Trakya çıkışlı',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    label: 'Anında Hızlı Konfirme',
    hint: 'Rezervasyonunuz hızlı onaylanır',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    label: '3D Güvenli Ödeme & Taksit',
    hint: 'TÜRSAB güvencesiyle güvenli ödeme',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function TrustValueBanner() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-blue-600 px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-indigo-400/20" />

          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="flex flex-col items-start gap-4 lg:col-span-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white p-1.5 shadow-md">
                <Image src="/images/LOGO.png" alt="Büyük Aytaç Travel" fill className="object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">En İyi Fiyat Garantisi</h2>
                <p className="mt-2 text-sm text-blue-100 sm:text-base">
                  Çerkezköy çıkışlı turlarda güvenilir acente, net fiyat, hızlı rezervasyon.
                </p>
              </div>
              <Link
                href="/tours"
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition-colors hover:bg-blue-50"
              >
                Turları İncele
                <span className="ml-1.5" aria-hidden>
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
              {valueItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3.5 backdrop-blur-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-blue-600">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold sm:text-base">{item.label}</p>
                    <p className="text-xs text-blue-100">{item.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
