import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const metadata: Metadata = {
  title: 'Ayarlar',
  robots: { index: false, follow: false },
};

export default async function AyarlarPage() {
  const session = await auth();
  if (!session?.user) redirect('/giris?callbackUrl=/hesabim/ayarlar');

  await dbConnect();
  const user = await User.findById(session.user.id)
    .select('firstName lastName email phone')
    .lean();

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <Link href="/hesabim" className="text-sm text-blue-600 hover:underline">
          ← Hesabım
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Ayarlar</h1>
        <p className="mt-1 text-sm text-slate-600">Hesap bilgilerin</p>

        <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Ad soyad</p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">E-posta</p>
            <p className="mt-1 text-sm font-medium text-slate-900">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Telefon</p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {user?.phone || 'Henüz eklenmedi'}
            </p>
          </div>
          <p className="border-t border-slate-100 pt-4 text-sm text-slate-500">
            Profil düzenleme ve şifre değiştirme yakında eklenecek. Değişiklik için ofisimizle
            iletişime geçebilirsin.
          </p>
          <a
            href="https://wa.me/905393459559?text=Merhaba,%20hesap%20bilgilerimi%20g%C3%BCncellemek%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            WhatsApp ile güncelle
          </a>
        </div>
      </div>
    </main>
  );
}
