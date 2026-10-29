import { Metadata } from 'next';
import Link from 'next/link';
import TourCalendar from '@/components/TourCalendar';

export const metadata: Metadata = {
  title: "Tur Takvimi",
  description: "Büyük Aytaç Travel'in aylık tur takvimi. Hangi tarihlerde hangi turların düzenlendiğini interaktif takvimde görebilirsiniz.",
  keywords: "tur takvimi, tur programı, tur tarihleri, Büyük Aytaç Travel, Çerkezköy tur takvimi",
  alternates: {
    canonical: 'https://www.buyukaytactravel.com/tour-calendar',
  },
};

export default function TourCalendarPage() {
  return (
    <main className="min-h-screen bg-sand-50 pb-20">
      <header className="relative overflow-hidden bg-brand-950 pb-14 pt-32 text-white sm:pt-36">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-600/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Konum" className="text-sm text-white/60">
            <Link href="/" className="hover:text-white">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">Tur Takvimi</span>
          </nav>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-sunset-400">Ay ay kalkışlar</p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Tur Takvimi</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Hangi gün hangi tur var, tek bakışta görün. Tur adına dokunarak detaya geçebilirsiniz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tours" className="inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-brand-900 hover:bg-sand-100">
              Liste görünümü
            </Link>
            <Link href="/tours/daily" className="inline-flex h-11 items-center rounded-full bg-white/10 px-5 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/15">
              Günübirlik
            </Link>
            <Link href="/tours/overnight" className="inline-flex h-11 items-center rounded-full bg-white/10 px-5 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/15">
              Konaklamalı
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <TourCalendar />
        
        <div className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-slate-200 sm:p-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-slate-900">Tur Takvimi Hakkında</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Tur takvimimiz, planlanan tüm turlarımızı görmenizi sağlar. Hangi gün hangi turların olduğunu kolayca takip edebilir, tur detaylarına hızlıca erişebilirsiniz.
            </p>
            <p>
              Sezonluk turlarımız, özel etkinlikler ve kampanyalı dönemler takvim üzerinde gösterilir. Sık sık kontrol etmenizi öneririz, çünkü her ay yeni turlar eklemekteyiz.
            </p>
            <p>
              Rezervasyon yapmak veya tur hakkında detaylı bilgi almak için tur detay sayfasını ziyaret edin veya bizimle doğrudan iletişime geçin.
            </p>
          </div>
          
          <div className="mt-6 rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100">
            <h3 className="font-medium text-blue-800 mb-2">Planlama İpuçları</h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-700">
              <li>Popüler turlarımız hızla dolduğu için, erken rezervasyon yapmanızı öneririz.</li>
              <li>Bayram ve tatil dönemlerinde ek turlar düzenliyoruz, takvimi takip edin.</li>
              <li>Özel grup turları için özel tarihler belirlenebilir, lütfen iletişime geçin.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 