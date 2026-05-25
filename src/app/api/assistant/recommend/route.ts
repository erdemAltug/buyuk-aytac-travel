import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';
import {
  rankTours,
  rankToursWithAi,
  type WeekendPreferences,
} from '@/lib/tourMatcher';
import type { ITour } from '@/types/tour';

function isValidPrefs(body: unknown): body is WeekendPreferences {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, string>;
  return (
    (b.companion === 'family' || b.companion === 'friends') &&
    (b.concept === 'nature' || b.concept === 'history' || b.concept === 'entertainment') &&
    (b.stay === 'daily' || b.stay === 'overnight')
  );
}

function toPublicTour(tour: Record<string, unknown>): ITour {
  return {
    _id: String(tour._id),
    name: String(tour.name),
    description: String(tour.description),
    image: String(tour.image),
    slug: String(tour.slug),
    duration: String(tour.duration),
    price: Number(tour.price),
    destination: String(tour.destination),
    tourType: tour.tourType as ITour['tourType'],
    accommodationType: tour.accommodationType as ITour['accommodationType'],
    isActive: Boolean(tour.isActive),
    isFeatured: Boolean(tour.isFeatured),
    isLastMinute: Boolean(tour.isLastMinute),
    discountRate: tour.discountRate != null ? Number(tour.discountRate) : undefined,
    startDate: tour.startDate as ITour['startDate'],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isValidPrefs(body)) {
      return NextResponse.json(
        { error: 'Geçersiz tercihler' },
        { status: 400 }
      );
    }

    await dbConnect();

    const now = new Date();
    const toursRaw = await Tour.find({
      isActive: true,
      $or: [{ endDate: { $gte: now } }, { startDate: { $gte: now } }, { endDate: null }],
    })
      .sort({ isFeatured: -1, startDate: 1 })
      .limit(80);

    const tours = toursRaw.map((t) =>
      toPublicTour(t.toObject() as unknown as Record<string, unknown>)
    );

    if (tours.length === 0) {
      return NextResponse.json({ tours: [], source: 'empty' }, { status: 200 });
    }

    const aiPicked = await rankToursWithAi(tours, body, 2);
    const picked = aiPicked ?? rankTours(tours, body, 2);

    return NextResponse.json({
      tours: picked,
      source: aiPicked ? 'ai' : 'matcher',
    });
  } catch (error) {
    console.error('Assistant recommend error:', error);
    return NextResponse.json(
      { error: 'Öneri oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
}
