import Image from 'next/image';
import type { ITour } from '@/types/tour';
import HeroSearch from './HeroSearch';
import NextDepartureCard from './NextDepartureCard';

/**
 * Ana sayfa hero alanı.
 * - Sinematik arka plan (yavaş yakınlaşma)
 * - Tek satırlık arama + hızlı seçim çipleri + "Hafta sonu ne yapsam?" asistanı
 * - Sıradaki kalkış kartı (canlı geri sayım)
 */
export default function HeroNext({
  nextTour,
  upcomingCount,
}: {
  nextTour: ITour | null;
  upcomingCount: number;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-banner.jpg"
          alt="Çerkezköy'den yurtiçi ve yurtdışı turlar - Büyük Aytaç Travel"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="animate-kenburns object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/75 via-brand-950/60 to-brand-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,122,26,0.25),transparent_55%)]" />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 lg:min-h-[92vh] lg:justify-center lg:px-8 lg:pb-16">
        <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 ring-1 ring-white/20 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              TÜRSAB 17674 · Çerkezköy · Çorlu · Tekirdağ kalkışlı
            </p>

            <h1 className="[text-shadow:0_2px_24px_rgba(10,20,48,0.5)] font-display text-[2.6rem] font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Çerkezköy&apos;den yola çık,
              <span className="block text-sunset-400 [text-shadow:0_2px_24px_rgba(10,20,48,0.6)]">
                Türkiye&apos;yi keşfet.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
              Çerkezköy çıkışlı günübirlik ve konaklamalı turlar. Size en yakın duraktan alıyoruz, rehberimiz yanınızda; siz sadece keyfini çıkarın.
            </p>

            <div className="mt-8">
              <HeroSearch />
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:150ms]">
            <NextDepartureCard tour={nextTour} upcomingCount={upcomingCount} />
          </div>
        </div>
      </div>
    </section>
  );
}
