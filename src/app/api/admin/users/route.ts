import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  await dbConnect();
  const users = await User.find({})
    .select('email firstName lastName phone role isActive createdAt')
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();

  return NextResponse.json({
    success: true,
    users: users.map((u) => ({
      ...u,
      _id: String(u._id),
      isActive: u.isActive !== false,
    })),
  });
}
