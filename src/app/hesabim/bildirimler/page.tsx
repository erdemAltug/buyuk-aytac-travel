import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Bildirimler',
  robots: { index: false, follow: false },
};

export default async function BildirimlerPage() {
  const session = await auth();
  if (!session?.user) redirect('/giris?callbackUrl=/hesabim/bildirimler');

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <Link href="/hesabim" className="text-sm text-blue-600 hover:underline">
          ← Hesabım
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Bildirimler</h1>
        <p className="mt-1 text-sm text-slate-600">
          Rezervasyon durumu ve kampanya bildirimleri burada görünecek.
        </p>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-800">Henüz bildirimin yok</p>
          <p className="mt-2 text-sm text-slate-500">
            Yeni rezervasyon onayı veya kampanya olduğunda burada listelenecek.
          </p>
          <Link
            href="/tours/last-minute"
            className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Son dakika turlarına bak
          </Link>
        </div>
      </div>
    </main>
  );
}
