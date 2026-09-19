import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';
import Reservation from '@/models/Reservation';
import Review from '@/models/Review';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Giriş yapmalısınız' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const tourSlug = typeof body.tourSlug === 'string' ? body.tourSlug.trim() : '';
    const rating = Number(body.rating);
    const comment = typeof body.comment === 'string' ? body.comment.trim() : '';

    if (!tourSlug || !comment || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: 'Tur, puan ve yorum gerekli' },
        { status: 400 }
      );
    }

    await dbConnect();
    const tour = await Tour.findOne({ slug: tourSlug, isActive: true });
    if (!tour) {
      return NextResponse.json(
        { success: false, message: 'Tur bulunamadı' },
        { status: 404 }
      );
    }

    const eligible = await Reservation.findOne({
      userId: session.user.id,
      $or: [{ tourId: tour._id }, { tourSlug }],
      status: { $in: ['confirmed', 'completed'] },
    });

    if (!eligible) {
      return NextResponse.json(
        {
          success: false,
          message: 'Yorum için onaylanmış veya tamamlanmış rezervasyon gerekli',
        },
        { status: 403 }
      );
    }

    await Review.findOneAndUpdate(
      { userId: session.user.id, tourId: tour._id },
      {
        userId: session.user.id,
        tourId: tour._id,
        rating,
        comment,
        status: 'pending',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Review POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Yorum kaydedilemedi' },
      { status: 500 }
    );
  }
}
