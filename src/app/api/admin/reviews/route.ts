import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  await dbConnect();
  const reviews = await Review.find({})
    .populate('tourId', 'name slug')
    .populate('userId', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  return NextResponse.json({
    success: true,
    reviews: reviews.map((r) => ({ ...r, _id: String(r._id) })),
  });
}
