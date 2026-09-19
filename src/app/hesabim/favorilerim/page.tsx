import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const metadata: Metadata = {
  title: 'Favorilerim',
  robots: { index: false, follow: false },
};

export default async function FavorilerimPage() {
  const session = await auth();
  if (!session?.user) redirect('/giris?callbackUrl=/hesabim/favorilerim');

  await dbConnect();
  const user = await User.findById(session.user.id).populate('wishlist').lean();
  const tours = (user?.wishlist || []) as Array<{
    _id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
  }>;

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Link href="/hesabim" className="text-sm text-blue-600 hover:underline">
          ← Hesabım
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Favorilerim</h1>

        {tours.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">Favori turun yok.</p>
            <Link href="/tours" className="mt-4 inline-block font-medium text-blue-600 hover:underline">
              Turları keşfet →
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <Link
                key={String(tour._id)}
                href={`/tours/${tour.slug}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="relative aspect-video bg-slate-100">
                  {tour.image && (
                    <Image src={tour.image} alt={tour.name} fill className="object-cover" sizes="33vw" />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-slate-900 line-clamp-2">{tour.name}</h2>
                  <p className="mt-1 text-sm font-medium text-blue-700">
                    {tour.price?.toLocaleString('tr-TR')} ₺
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
