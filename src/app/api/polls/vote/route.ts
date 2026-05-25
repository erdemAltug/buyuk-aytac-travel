import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import dbConnect from '@/lib/mongodb';
import TourPoll, { TourPollVote } from '@/models/TourPoll';

function voterKey(req: NextRequest, clientId?: string): string {
  if (clientId && typeof clientId === 'string' && clientId.length >= 8) {
    return `cid:${clientId.slice(0, 64)}`;
  }
  const forwarded = req.headers.get('x-forwarded-for') ?? '';
  const ip = forwarded.split(',')[0]?.trim() || 'unknown';
  const ua = req.headers.get('user-agent') ?? '';
  return createHash('sha256').update(`${ip}:${ua}`).digest('hex').slice(0, 32);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pollId, optionId, clientId } = body;

    if (!pollId || !optionId) {
      return NextResponse.json(
        { error: 'pollId ve optionId gerekli' },
        { status: 400 }
      );
    }

    await dbConnect();

    const poll = await TourPoll.findById(pollId);
    if (!poll || !poll.isActive) {
      return NextResponse.json({ error: 'Aktif oylama bulunamadı' }, { status: 404 });
    }

    if (poll.endsAt && new Date(poll.endsAt) < new Date()) {
      return NextResponse.json({ error: 'Oylama süresi doldu' }, { status: 410 });
    }

    const optionIndex = poll.options.findIndex((o) => o.optionId === optionId);
    if (optionIndex < 0) {
      return NextResponse.json({ error: 'Geçersiz seçenek' }, { status: 400 });
    }

    const key = voterKey(req, clientId);

    try {
      await TourPollVote.create({
        pollId: poll._id,
        voterKey: key,
        optionId,
      });
    } catch (err: unknown) {
      const code = (err as { code?: number })?.code;
      if (code === 11000) {
        return NextResponse.json(
          { error: 'Bu oylamaya zaten katıldınız' },
          { status: 409 }
        );
      }
      throw err;
    }

    poll.options[optionIndex].votes = (poll.options[optionIndex].votes || 0) + 1;
    await poll.save();

    const totalVotes = poll.options.reduce((s, o) => s + (o.votes || 0), 0);

    return NextResponse.json({
      success: true,
      options: poll.options,
      totalVotes,
    });
  } catch (error) {
    console.error('Poll vote error:', error);
    return NextResponse.json({ error: 'Oy kaydedilemedi' }, { status: 500 });
  }
}
