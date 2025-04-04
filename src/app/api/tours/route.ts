import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

// Tüm turları getir
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // URL parametrelerini al
    const url = new URL(req.url);
    const params = url.searchParams;
    
    // Filtre parametrelerini oluştur
    const filter: Record<string, boolean | string> = {};
    
    // isActive parametresi
    const isActive = params.get('isActive');
    if (isActive !== null) {
      filter.isActive = isActive === 'true';
    }
    
    // destination parametresi
    const destination = params.get('destination');
    if (destination) {
      filter.destination = destination;
    }
    
    // tourType parametresi
    const tourType = params.get('tourType');
    if (tourType) {
      filter.tourType = tourType;
    }
    
    // accommodationType parametresi
    const accommodationType = params.get('accommodationType');
    if (accommodationType) {
      filter.accommodationType = accommodationType;
    }
    
    // isLastMinute parametresi
    const isLastMinute = params.get('isLastMinute');
    if (isLastMinute !== null) {
      filter.isLastMinute = isLastMinute === 'true';
    }
    
    // Turları al
    const tours = await Tour.find(filter).sort({ createdAt: -1 }).lean();
    
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