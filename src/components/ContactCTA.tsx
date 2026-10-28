import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_TEL, whatsappLink } from '@/lib/tourUi';

export default function ContactCTA() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-sunset-500 via-sunset-600 to-rose-600 px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-2xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-5xl">Aklındaki rotayı yaz, gerisini biz planlayalım.</h2>
            <p className="mt-4 max-w-xl text-white/85">
              Tarih, kişi sayısı, bütçe… Ne biliyorsan yaz. Sana uygun turu ya da gruba özel programı birlikte çıkaralım.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={whatsappLink('Merhaba, bir tur planlamak istiyorum.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-white px-6 font-semibold text-slate-900 shadow-lg transition hover:bg-sand-100"
            >
              WhatsApp&apos;tan yaz
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-black/20 px-6 font-semibold text-white ring-1 ring-white/30 transition hover:bg-black/30"
            >
              {PHONE_DISPLAY}
            </a>
            <Link href="/contact" className="text-center text-sm text-white/80 underline-offset-4 hover:underline">
              İletişim formu ve ofis adresi
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
