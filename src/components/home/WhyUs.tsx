import Image from 'next/image';
import Link from 'next/link';

/*
 * Eski ana sayfadaki 3 ayrı güven bölümünü (güven çipleri, "En İyi Fiyat Garantisi" bandı,
 * TÜRSAB bölümü) tek, sade bir bölümde birleştirir. Kalkış noktaları da burada.
 */

const STOPS = [
  { name: 'Çerkezköy', detail: 'Köşem Durağı', time: 'Ana kalkış' },
  { name: 'Çorlu', detail: 'Orion · Eski Kız Meslek Durağı', time: 'Tura göre' },
  { name: 'Saray', detail: 'Kültür Merkezi', time: 'Tura göre' },
  { name: 'Silivri', detail: 'Yol üstü alım', time: 'Tura göre' },
];

const POINTS = [
  { title: 'Kapınıza yakın kalkış', text: 'Çerkezköy, Çorlu, Saray ve Silivri duraklarından alıyoruz. İstanbul otogarına gitmeye gerek yok.' },
  { title: 'Kokartlı rehber', text: 'Her turda profesyonel, kokartlı rehber. Siz sadece manzaranın tadını çıkarın.' },
  { title: 'TÜRSAB güvencesi', text: 'TÜRSAB 17674 belgeli acente. Ödemeniz ve seyahatiniz yasal güvence altında.' },
  { title: 'WhatsApp’tan anında destek', text: 'Tur öncesi ve tur boyunca tek mesajla ulaşabileceğiniz bir ekip.' },
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-sunset-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sunset-400">Neden Büyük Aytaç?</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
            Trakya&apos;nın yol arkadaşı.
          </h2>
          <p className="mt-4 max-w-lg text-white/70">
            Çerkezköy merkezli, Trakya&apos;dan yola çıkan gezginler için kurulmuş bir tur operatörüyüz. Planlamayı biz yaparız, siz yalnızca çantanızı hazırlayın.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-4">
            {POINTS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <dt className="font-display text-base font-semibold">{p.title}</dt>
                <dd className="mt-2 text-sm text-white/65">{p.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-2xl bg-white p-2">
              <Image src="/images/tursab.png" alt="TÜRSAB üye belgesi" fill sizes="64px" className="object-contain p-1.5" />
            </div>
            <p className="text-sm text-white/70">
              <strong className="text-white">TÜRSAB üyesi seyahat acentası</strong> · Belge no 17674.{' '}
              <Link href="/about" className="font-semibold text-white underline underline-offset-4 hover:text-sunset-400">
                Hakkımızda
              </Link>
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
          <p className="font-display text-xl font-semibold">Kalkış noktalarımız</p>
          <p className="mt-1 text-sm text-white/60">Size en yakın duraktan binin. Saatler tura göre tur sayfasında yazar.</p>

          <ol className="relative mt-8 space-y-6 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-0.5 before:bg-gradient-to-b before:from-sunset-400 before:to-brand-400">
            {STOPS.map((s, i) => (
              <li key={s.name} className="relative flex items-start gap-4 pl-0">
                <span
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    i === 0 ? 'bg-sunset-500 text-white' : 'bg-white text-brand-900'
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3 border-b border-white/10 pb-5">
                  <div className="min-w-0">
                    <p className="font-semibold">{s.name}</p>
                    <p className="truncate text-sm text-white/60">{s.detail}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80">{s.time}</span>
                </div>
              </li>
            ))}
          </ol>

          <Link
            href="/group-tour"
            className="mt-8 flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-brand-900 transition hover:bg-sand-100"
          >
            <span>
              <span className="block font-semibold">Kendi grubunuzla mı gideceksiniz?</span>
              <span className="text-sm text-slate-600">Okul, şirket, dernek: size özel rota çıkaralım.</span>
            </span>
            <span aria-hidden className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
