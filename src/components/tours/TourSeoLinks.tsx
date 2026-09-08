import Link from 'next/link';

export type TourSeoVariant =
  | 'all'
  | 'domestic'
  | 'international'
  | 'daily'
  | 'overnight'
  | 'last-minute';

type SeoLink = { href: string; label: string };

const LINKS: Record<TourSeoVariant, { title: string; intro: string; links: SeoLink[] }> = {
  all: {
    title: 'Popüler Rotalar ve Rehberler',
    intro: 'Çerkezköy çıkışlı tur kategorileri ve güncel rehber yazılarımız.',
    links: [
      { href: '/ege-turu', label: 'Ege Turları' },
      { href: '/kapadokya-turu', label: 'Kapadokya Turları' },
      { href: '/balkan-turlari', label: 'Balkan Turları' },
      { href: '/karadeniz-turu', label: 'Karadeniz Turları' },
      { href: '/gap-turu', label: 'GAP Turları' },
      { href: '/cerkezkoy-tur', label: 'Çerkezköy Turları' },
      { href: '/blog/eylul-2026-cerkezkoy-tur-takvimi', label: 'Eylül 2026 Takvimi' },
      { href: '/blog/sonbahar-2026-konaklamali-turlar-cerkezkoy', label: 'Sonbahar Konaklamalı' },
      { href: '/blog', label: 'Tüm Blog' },
      { href: '/contact', label: 'Rezervasyon' },
    ],
  },
  domestic: {
    title: 'Yurtiçi Tur Rotaları',
    intro: 'Türkiye içi destinasyonlar, günübirlik ve konaklamalı seçenekler.',
    links: [
      { href: '/ege-turu', label: 'Ege & Ada Turları' },
      { href: '/kapadokya-turu', label: 'Kapadokya' },
      { href: '/karadeniz-turu', label: 'Karadeniz' },
      { href: '/gap-turu', label: 'GAP & Doğu' },
      { href: '/tours/daily', label: 'Günübirlik Turlar' },
      { href: '/tours/overnight', label: 'Konaklamalı Turlar' },
      { href: '/cerkezkoy-gunubirlik-turlar', label: 'Çerkezköy Günübirlik' },
      { href: '/blog/istanbul-gunubirlik-turlari-cerkezkoy-2026', label: 'İstanbul Günübirlik Rehberi' },
      { href: '/blog/kapadokya-turu-eylul-2026-26-27-rehber', label: 'Kapadokya Eylül Rehberi' },
      { href: '/blog/ayvalik-cunda-turu-rehberi-2026', label: 'Ayvalık Cunda Rehberi' },
      { href: '/tour-calendar', label: 'Tur Takvimi' },
      { href: '/contact', label: 'İletişim' },
    ],
  },
  international: {
    title: 'Yurtdışı Tur Rehberleri',
    intro: 'Balkan ve Trakya çıkışlı yurtdışı programlar.',
    links: [
      { href: '/balkan-turlari', label: 'Balkan Turları' },
      { href: '/blog/balkan-turlari-2026-rehberi-vizesiz', label: 'Vizesiz Balkan Rehberi' },
      { href: '/blog/trakya-cikisli-yurtdisi-tur-rehberi-2026', label: 'Trakya Yurtdışı Rehberi' },
      { href: '/group-tour', label: 'Özel Grup Turu' },
      { href: '/tours/domestic', label: 'Yurtiçi Turlar' },
      { href: '/contact', label: 'Ön Kayıt' },
    ],
  },
  daily: {
    title: 'Günübirlik Tur Rehberleri',
    intro: 'Tek günlük Çerkezköy çıkışlı programlar ve destinasyon yazıları.',
    links: [
      { href: '/cerkezkoy-gunubirlik-turlar', label: 'Çerkezköy Günübirlik' },
      { href: '/ege-turu', label: 'Ege Turları' },
      { href: '/blog/fener-balat-turu-rehberi-2026-cerkezkoy', label: 'Fener-Balat Rehberi' },
      { href: '/blog/tarihi-yarimada-turu-rehberi-2026-cerkezkoy', label: 'Tarihi Yarımada' },
      { href: '/blog/iznik-kultur-turu-rehberi-2026-cerkezkoy', label: 'İznik Rehberi' },
      { href: '/blog/ormanya-masukiye-turu-rehberi-2026', label: 'Ormanya Maşukiye' },
      { href: '/blog/bozcaada-turu-rehberi-2026-cerkezkoy', label: 'Bozcaada Rehberi' },
      { href: '/blog/eylul-2026-cerkezkoy-tur-takvimi', label: 'Eylül Takvimi' },
      { href: '/tours/overnight', label: 'Konaklamalı Turlar' },
      { href: '/contact', label: 'Rezervasyon' },
    ],
  },
  overnight: {
    title: 'Konaklamalı Tur Rehberleri',
    intro: '2–3 günlük paketler, Kapadokya, Safranbolu ve Konya.',
    links: [
      { href: '/cerkezkoy-konakamali-turlar', label: 'Çerkezköy Konaklamalı' },
      { href: '/kapadokya-turu', label: 'Kapadokya Turları' },
      { href: '/blog/sonbahar-2026-konaklamali-turlar-cerkezkoy', label: 'Sonbahar Konaklamalı' },
      { href: '/blog/kapadokya-turu-eylul-2026-26-27-rehber', label: 'Kapadokya Eylül' },
      { href: '/blog/safranbolu-amasra-turu-ekim-2026-rehber', label: 'Safranbolu Amasra' },
      { href: '/blog/seb-i-arus-konya-turu-2026-rehber', label: 'Şeb-i Arus Konya' },
      { href: '/karadeniz-turu', label: 'Karadeniz' },
      { href: '/tours/daily', label: 'Günübirlik Turlar' },
      { href: '/contact', label: 'Rezervasyon' },
    ],
  },
  'last-minute': {
    title: 'Hızlı Keşif ve Takvim',
    intro: 'Son dakika fırsatları yanında güncel takvim ve popüler rotalar.',
    links: [
      { href: '/tour-calendar', label: 'Tur Takvimi' },
      { href: '/tours/daily', label: 'Günübirlik' },
      { href: '/tours/overnight', label: 'Konaklamalı' },
      { href: '/blog/eylul-2026-cerkezkoy-tur-takvimi', label: 'Eylül 2026 Takvimi' },
      { href: '/populer-turlar', label: 'Popüler Turlar' },
      { href: '/contact', label: 'Hemen Ara' },
    ],
  },
};

export default function TourSeoLinks({ variant = 'all' }: { variant?: TourSeoVariant }) {
  const block = LINKS[variant];

  return (
    <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">{block.title}</h2>
      <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">{block.intro}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {block.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
