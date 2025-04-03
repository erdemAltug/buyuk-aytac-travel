import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

type RouteSegmentProps = {
  params: {
    slug: string;
  };
};

// Tur detaylarını getir
export async function GET(req: NextRequest, { params }: RouteSegmentProps) {
  try {
    await dbConnect();
    
    const tour = await Tour.findOne({ slug: params.slug });
    
    if (!tour) {
      return NextResponse.json({ error: 'Tur bulunamadı' }, { status: 404 });
    }
    
    return NextResponse.json(tour, { status: 200 });
  } catch (error) {
    console.error('Tour GET Error:', error);
    return NextResponse.json(
      { error: 'Tur detaylarını getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Turu güncelle
export async function PUT(req: NextRequest, { params }: RouteSegmentProps) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Önce turu bul
    const tour = await Tour.findOne({ slug: params.slug });
    
    if (!tour) {
      return NextResponse.json({ error: 'Tur bulunamadı' }, { status: 404 });
    }
    
    // İzin verilen alanları güncelle
    if (body.name) tour.name = body.name;
    if (body.description) tour.description = body.description;
    if (body.image) tour.image = body.image;
    if (body.duration) tour.duration = body.duration;
    if (body.price) tour.price = body.price;
    if (body.destination) tour.destination = body.destination;
    if (body.tourType) tour.tourType = body.tourType;
    if (body.accommodationType) tour.accommodationType = body.accommodationType;
    if (body.startDate) tour.startDate = body.startDate;
    if (body.endDate) tour.endDate = body.endDate;
    if (body.isActive !== undefined) tour.isActive = body.isActive;
    
    await tour.save();
    
    return NextResponse.json(tour, { status: 200 });
  } catch (error) {
    console.error('Tour PUT Error:', error);
    return NextResponse.json(
      { error: 'Turu güncellerken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Turu sil
export async function DELETE(req: NextRequest, { params }: RouteSegmentProps) {
  try {
    await dbConnect();
    
    const tour = await Tour.findOne({ slug: params.slug });
    
    if (!tour) {
      return NextResponse.json({ error: 'Tur bulunamadı' }, { status: 404 });
    }
    
    await tour.deleteOne();
    
    return NextResponse.json({ message: 'Tur başarıyla silindi' }, { status: 200 });
  } catch (error) {
    console.error('Tour DELETE Error:', error);
    return NextResponse.json(
      { error: 'Turu silerken bir hata oluştu' },
      { status: 500 }
    );
  }
} 