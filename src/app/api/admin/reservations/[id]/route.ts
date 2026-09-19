import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, message: 'Yetkisiz' }, { status: 401 });
  }

  const { status, notes } = await req.json();
  await dbConnect();

  const update: Record<string, unknown> = {};
  if (status) update.status = status;
  if (typeof notes === 'string') update.notes = notes;

  await Reservation.findByIdAndUpdate(params.id, update);
  return NextResponse.json({ success: true });
}
