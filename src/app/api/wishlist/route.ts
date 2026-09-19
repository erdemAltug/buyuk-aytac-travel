import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Tour from '@/models/Tour';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: true, inWishlist: false });
    }

    const tourSlug = req.nextUrl.searchParams.get('tourSlug');
    const tourIdParam = req.nextUrl.searchParams.get('tourId');

    await dbConnect();
    let tourId = tourIdParam;
    if (!tourId && tourSlug) {
      const tour = await Tour.findOne({ slug: tourSlug }).select('_id');
      tourId = tour?._id?.toString();
    }
    if (!tourId) {
      return NextResponse.json({ success: false, message: 'Tur gerekli' }, { status: 400 });
    }

    const user = await User.findById(session.user.id).select('wishlist').lean();
    const inWishlist = (user?.wishlist || []).some((id) => String(id) === String(tourId));
    return NextResponse.json({ success: true, inWishlist });
  } catch (error) {
    console.error('Wishlist GET error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Giriş gerekli' }, { status: 401 });
    }

    const { tourId, tourSlug, action } = await req.json();
    await dbConnect();

    let id = tourId as string | undefined;
    if (!id && tourSlug) {
      const tour = await Tour.findOne({ slug: tourSlug }).select('_id');
      id = tour?._id?.toString();
    }
    if (!id) {
      return NextResponse.json({ success: false, message: 'Tur gerekli' }, { status: 400 });
    }

    if (action === 'remove') {
      await User.findByIdAndUpdate(session.user.id, { $pull: { wishlist: id } });
    } else {
      await User.findByIdAndUpdate(session.user.id, { $addToSet: { wishlist: id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Wishlist error:', error);
    return NextResponse.json({ success: false, message: 'İşlem başarısız' }, { status: 500 });
  }
}
