import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';
import Reservation from '@/models/Reservation';
import Review from '@/models/Review';

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/admin/login');
  }

  await dbConnect();

  const [activeTours, newReservations, totalReservations, pendingReviews, topTours, topReserved] =
    await Promise.all([
      Tour.countDocuments({ isActive: true }),
      Reservation.countDocuments({ status: 'new' }),
      Reservation.countDocuments({}),
      Review.countDocuments({ status: 'pending' }),
      Tour.find({ isActive: true })
        .sort({ viewCount: -1 })
        .limit(8)
        .select('name slug viewCount price')
        .lean(),
      Reservation.aggregate<{
        _id: string;
        count: number;
        tourName: string;
      }>([
        { $group: { _id: '$tourSlug', count: { $sum: 1 }, tourName: { $first: '$tourName' } } },
        { $sort: { count: -1 } },
        { $limit: 8 },
      ]),
    ]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl">Yönetim Paneli</h1>
        <p className="text-gray-600">
          Merhaba {session.user.firstName} — canlı istatistikler
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Aktif tur', value: activeTours, href: '/admin/tours', color: 'blue' },
          { label: 'Yeni rezervasyon', value: newReservations, href: '/admin/reservations', color: 'amber' },
          { label: 'Toplam rezervasyon', value: totalReservations, href: '/admin/reservations', color: 'slate' },
          { label: 'Bekleyen yorum', value: pendingReviews, href: '/admin/reviews', color: 'violet' },
        ].map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-300"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">En çok görüntülenen</h2>
          <ul className="divide-y divide-slate-100">
            {topTours.map((tour) => (
              <li key={String(tour._id)} className="flex items-center justify-between py-2.5">
                <Link href={`/tours/${tour.slug}`} className="text-sm font-medium text-slate-800 hover:text-blue-600">
                  {tour.name}
                </Link>
                <span className="text-sm text-slate-500">{tour.viewCount || 0} görüntülenme</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">En çok rezervasyon</h2>
          <ul className="divide-y divide-slate-100">
            {topReserved.length === 0 && (
              <li className="py-2.5 text-sm text-slate-500">Henüz rezervasyon yok</li>
            )}
            {topReserved.map((row) => (
              <li key={row._id} className="flex items-center justify-between py-2.5">
                <Link href={`/tours/${row._id}`} className="text-sm font-medium text-slate-800 hover:text-blue-600">
                  {row.tourName || row._id}
                </Link>
                <span className="text-sm text-slate-500">{row.count} rezervasyon</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/tours/new" className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          Yeni Tur
        </Link>
        <Link href="/admin/blogs/new" className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
          Yeni Blog
        </Link>
        <Link href="/admin/reservations" className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50">
          Rezervasyonlar
        </Link>
      </div>
    </>
  );
}
