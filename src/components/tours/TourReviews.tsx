import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';
import User from '@/models/User';

type TourReviewsProps = {
  tourId: string;
  tourSlug: string;
};

export default async function TourReviews({ tourId, tourSlug }: TourReviewsProps) {
  await dbConnect();
  const reviews = await Review.find({
    tourId,
    status: 'approved',
  })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  const userIds = reviews.map((r) => r.userId).filter(Boolean);
  const users = userIds.length
    ? await User.find({ _id: { $in: userIds } })
        .select('firstName lastName')
        .lean()
    : [];
  const nameById = new Map(
    users.map((u) => [
      String(u._id),
      `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Misafir',
    ])
  );

  if (reviews.length === 0) {
    return (
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Misafir Yorumları</h2>
        <p className="mt-2 text-sm text-slate-600">
          Bu tur için henüz onaylı yorum yok.{' '}
          <a href={`/hesabim/yorumlarim?tour=${tourSlug}`} className="text-blue-600 hover:underline">
            Deneyimini paylaş →
          </a>
        </p>
      </section>
    );
  }

  const avg =
    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Misafir Yorumları</h2>
          <p className="mt-1 text-sm text-slate-600">
            Ortalama {avg.toFixed(1)}★ · {reviews.length} yorum
          </p>
        </div>
        <a
          href={`/hesabim/yorumlarim?tour=${tourSlug}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Yorum yaz →
        </a>
      </div>
      <ul className="mt-6 space-y-4">
        {reviews.map((r) => (
          <li key={String(r._id)} className="border-t border-slate-100 pt-4 first:border-0 first:pt-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-slate-900">
                {nameById.get(String(r.userId)) || 'Misafir'}
              </p>
              <span className="text-sm text-amber-600">{r.rating}★</span>
            </div>
            <p className="mt-1 text-sm text-slate-700">{r.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
