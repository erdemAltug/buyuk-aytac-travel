import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import AyarlarForm from './AyarlarForm';

export const metadata: Metadata = {
  title: 'Ayarlar',
  robots: { index: false, follow: false },
};

export default async function AyarlarPage() {
  const session = await auth();
  if (!session?.user) redirect('/giris?callbackUrl=/hesabim/ayarlar');

  await dbConnect();
  const user = await User.findById(session.user.id)
    .select('firstName lastName email phone gender passwordHash')
    .lean();

  if (!user) redirect('/giris?callbackUrl=/hesabim/ayarlar');

  const gender =
    user.gender === 'female' ||
    user.gender === 'male' ||
    user.gender === 'unspecified'
      ? user.gender
      : '';

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <Link href="/hesabim" className="text-sm text-blue-600 hover:underline">
          ← Hesabım
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Ayarlar</h1>
        <p className="mt-1 text-sm text-slate-600">Hesap bilgilerin</p>

        <AyarlarForm
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          email={user.email || ''}
          phone={user.phone || ''}
          gender={gender}
          hasPassword={Boolean(user.passwordHash)}
        />
      </div>
    </main>
  );
}
