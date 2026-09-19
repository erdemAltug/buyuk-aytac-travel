import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const { status } = await req.json();
  const { id } = await params;
  await dbConnect();
  await Review.findByIdAndUpdate(id, { status });
  return NextResponse.json({ success: true });
}
