import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

// Tur görüntüleme sayısını artır
export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const { slug } = params;

    // Turu bul ve görüntüleme sayısını artır
    const tour = await Tour.findOneAndUpdate(
      { slug },
      { $inc: { viewCount: 1 } }, // $inc operatörü ile değeri artır
      { new: true } // Güncellenmiş dokümanı döndür
    );

    if (!tour) {
      return NextResponse.json({ error: 'Tur bulunamadı' }, { status: 404 });
    }

    return NextResponse.json({ success: true, viewCount: tour.viewCount }, { status: 200 });
  } catch (error) {
    console.error('Tur görüntüleme artırma hatası:', error);
    return NextResponse.json(
      { error: 'Tur görüntüleme sayısını artırırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 