import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

// Tüm turları getir
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get('isActive');
    const destination = searchParams.get('destination');
    const tourType = searchParams.get('tourType');
    const accommodationType = searchParams.get('accommodationType');
    
    await dbConnect();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: { isActive?: boolean; destination?: string; tourType?: string; accommodationType?: string } = {};
    
    // İsteğe bağlı filtreler
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }
    
    if (destination) {
      query.destination = destination;
    }
    
    // Tur tipi filtresi (yurtiçi/yurtdışı)
    if (tourType) {
      query.tourType = tourType;
    }
    
    // Konaklama tipi filtresi (konaklamalı/günübirlik)
    if (accommodationType) {
      query.accommodationType = accommodationType;
    }
    
    // Turları getir
    const tours = await Tour.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(tours, { status: 200 });
  } catch (error) {
    console.error('Tours GET Error:', error);
    return NextResponse.json(
      { error: 'Turları getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Yeni tur ekle
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Gerekli alanları kontrol et
    if (!body.name || !body.description || !body.image || !body.duration || !body.price || !body.destination) {
      return NextResponse.json(
        { error: 'İsim, açıklama, görsel, süre, fiyat ve destinasyon zorunludur' },
        { status: 400 }
      );
    }
    
    // Slug otomatik oluşturulacak
    const slug = body.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
    
    // Aynı slug ile başka bir tur var mı kontrol et
    const existingTour = await Tour.findOne({ slug });
    if (existingTour) {
      return NextResponse.json(
        { error: 'Bu isimle bir tur zaten mevcut' },
        { status: 400 }
      );
    }
    
    // Yeni tur oluştur
    const tour = new Tour({
      name: body.name,
      description: body.description,
      image: body.image,
      slug,
      duration: body.duration,
      price: body.price,
      destination: body.destination,
      tourType: body.tourType,
      accommodationType: body.accommodationType,
      startDate: body.startDate,
      endDate: body.endDate,
      isActive: body.isActive !== undefined ? body.isActive : true,
    });
    
    await tour.save();
    
    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    console.error('Tour POST Error:', error);
    return NextResponse.json(
      { error: 'Tur eklerken bir hata oluştu' },
      { status: 500 }
    );
  }
} 