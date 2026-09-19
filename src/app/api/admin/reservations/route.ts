import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, message: 'Yetkisiz' }, { status: 401 });
  }

  await dbConnect();
  const reservations = await Reservation.find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  return NextResponse.json({
    success: true,
    reservations: reservations.map((r) => ({
      ...r,
      _id: String(r._id),
    })),
  });
}
