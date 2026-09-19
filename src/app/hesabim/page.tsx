import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Hesabım',
  robots: { index: false, follow: false },
};

const links = [
  { href: '/hesabim/seyahatlerim', title: 'Seyahatlerim', desc: 'Rezervasyon ve tur taleplerin' },
  { href: '/hesabim/favorilerim', title: 'Favorilerim', desc: 'İstek listendeki turlar' },
  { href: '/hesabim/ayarlar', title: 'Ayarlar', desc: 'Hesap bilgilerin' },
  { href: '/hesabim/bildirimler', title: 'Bildirimler', desc: 'Rezervasyon ve kampanya uyarıları' },
  { href: '/tour-calendar', title: 'Tur takvimi', desc: 'Tüm tur tarihleri' },
  { href: '/tours/last-minute', title: 'Son dakika', desc: 'Kampanya ve fırsat turları' },
];

export default async function HesabimPage() {
  const session = await auth();
  if (!session?.user) redirect('/giris?callbackUrl=/hesabim');

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900">Hesabım</h1>
        <p className="mt-2 text-slate-600">
          Merhaba, {session.user.firstName} {session.user.lastName}
        </p>
        <p className="text-sm text-slate-500">{session.user.email}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
            >
              <h2 className="font-semibold text-slate-900">{link.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{link.desc}</p>
            </Link>
          ))}
        </div>

        {session.user.role === 'admin' && (
          <a
            href="/admin"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Admin Paneline Git
          </a>
        )}
      </div>
    </main>
  );
}
