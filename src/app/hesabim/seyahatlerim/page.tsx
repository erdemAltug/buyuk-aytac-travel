import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

export const metadata: Metadata = {
  title: 'Seyahatlerim',
  robots: { index: false, follow: false },
};

const statusLabel: Record<string, string> = {
  new: 'Yeni talep',
  contacted: 'İletişime geçildi',
  confirmed: 'Onaylandı',
  cancelled: 'İptal',
  completed: 'Tamamlandı',
};

export default async function SeyahatlerimPage() {
  const session = await auth();
  if (!session?.user) redirect('/giris?callbackUrl=/hesabim/seyahatlerim');

  await dbConnect();
  const reservations = await Reservation.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/hesabim" className="text-sm text-blue-600 hover:underline">
          ← Hesabım
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Seyahatlerim</h1>
        <p className="mt-1 text-slate-600">Rezervasyon taleplerin ve durumları</p>

        {reservations.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">Henüz rezervasyonun yok.</p>
            <Link href="/tours" className="mt-4 inline-block font-medium text-blue-600 hover:underline">
              Turlara göz at →
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {reservations.map((r) => (
              <li
                key={String(r._id)}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/tours/${r.tourSlug}`}
                      className="font-semibold text-slate-900 hover:text-blue-600"
                    >
                      {r.tourName}
                    </Link>
                    <p className="mt-1 text-sm text-slate-500">
                      {new Date(r.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                    {statusLabel[r.status] || r.status}
                  </span>
                </div>
                {(r.status === 'confirmed' || r.status === 'completed') && (
                  <Link
                    href={`/hesabim/yorumlarim?tour=${r.tourSlug}`}
                    className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
                  >
                    Yorum yaz →
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
