import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import Reservation from '@/models/Reservation';
import YorumForm from './YorumForm';

export const metadata: Metadata = {
  title: 'Yorumlarım',
  robots: { index: false, follow: false },
};

const statusLabel: Record<string, string> = {
  pending: 'Onay bekliyor',
  approved: 'Yayında',
  rejected: 'Reddedildi',
};

export default async function YorumlarimPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }> | { tour?: string };
}) {
  const session = await auth();
  if (!session?.user) redirect('/giris?callbackUrl=/hesabim/yorumlarim');

  const sp = await Promise.resolve(searchParams);

  await dbConnect();
  const [reviews, eligible] = await Promise.all([
    Review.find({ userId: session.user.id })
      .populate('tourId', 'name slug')
      .sort({ createdAt: -1 })
      .lean(),
    Reservation.find({
      userId: session.user.id,
      status: { $in: ['confirmed', 'completed'] },
    })
      .select('tourSlug tourName')
      .lean(),
  ]);

  const tourOptions = Array.from(
    new Map(
      eligible
        .filter((r) => r.tourSlug)
        .map((r) => [r.tourSlug, { slug: r.tourSlug, name: r.tourName || r.tourSlug }])
    ).values()
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/hesabim" className="text-sm text-blue-600 hover:underline">
          ← Hesabım
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Yorumlarım</h1>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Yeni yorum</h2>
          <p className="mt-1 text-sm text-slate-600">
            Onaylanmış veya tamamlanmış turların için yorum yazabilirsin.
          </p>
          <YorumForm defaultTourSlug={sp.tour} tourOptions={tourOptions} />
        </div>

        <ul className="mt-8 space-y-3">
          {reviews.map((review) => {
            const tour = review.tourId as unknown as {
              name?: string;
              slug?: string;
            } | null;
            return (
              <li
                key={String(review._id)}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="flex justify-between gap-2">
                  <p className="font-medium text-slate-900">{tour?.name || 'Tur'}</p>
                  <span className="text-xs text-slate-500">
                    {statusLabel[review.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-amber-600">
                  {'★'.repeat(review.rating)}
                </p>
                <p className="mt-2 text-sm text-slate-700">{review.comment}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
