import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Geçerli bir e-posta girin' },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ email }).select('_id firstName isActive').lean();

    if (user && user.isActive === false) {
      return NextResponse.json({
        success: true,
        exists: true,
        active: false,
      });
    }

    return NextResponse.json({
      success: true,
      exists: !!user,
      active: true,
      firstName: user?.firstName || null,
    });
  } catch (error) {
    console.error('check-email error:', error);
    return NextResponse.json(
      { success: false, message: 'Kontrol başarısız' },
      { status: 500 }
    );
  }
}
