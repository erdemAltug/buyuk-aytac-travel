import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import TourPoll from '@/models/TourPoll';
import { DEFAULT_POLL, enrichPollOptions } from '@/lib/pollDefaults';

export async function GET() {
  try {
    await dbConnect();

    let poll = await TourPoll.findOne({ isActive: true }).sort({ createdAt: -1 });

    if (!poll) {
      poll = await TourPoll.create(DEFAULT_POLL);
    }

    const obj = poll.toObject();
    const totalVotes = obj.options.reduce((s, o) => s + (o.votes || 0), 0);

    return NextResponse.json({
      _id: String(obj._id),
      title: obj.title,
      subtitle: obj.subtitle,
      options: enrichPollOptions(obj.options),
      totalVotes,
      endsAt: obj.endsAt,
    });
  } catch (error) {
    console.error('Poll GET error:', error);
    return NextResponse.json(
      { error: 'Oylama yüklenemedi' },
      { status: 500 }
    );
  }
}
