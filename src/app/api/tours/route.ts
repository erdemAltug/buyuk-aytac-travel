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
    const filter: Record<string, any> = {};
    
    // isActive parametresi - varsayılan olarak aktif turları getir
    const isActive = params.get('isActive');
    if (isActive !== null) {
      filter.isActive = isActive === 'true';
    } else {
      // Varsayılan olarak sadece aktif turları getir
      filter.isActive = true;
    }
    
    // destination parametresi
    const destination = params.get('destination');
    if (destination) {
      filter.destination = destination;
    }
    
    // tourType parametresi - case insensitive
    const tourType = params.get('tourType');
    if (tourType) {
      filter.tourType = { $regex: new RegExp(`^${tourType}$`, 'i') };
    }
    
    // accommodationType parametresi - case insensitive
    const accommodationType = params.get('accommodationType');
    if (accommodationType) {
      filter.accommodationType = { $regex: new RegExp(`^${accommodationType}$`, 'i') };
    }
    
    // isLastMinute parametresi
    const isLastMinute = params.get('isLastMinute');
    if (isLastMinute !== null) {
      filter.isLastMinute = isLastMinute === 'true';
    }
    
    // Sıralama parametresi - Varsayılan: en yakın tarihli turlar önce
    const sortParam = params.get('sort');
    const sortOrder = params.get('sortOrder') === 'desc' ? -1 : 1;
    let sortQuery: string | { [key: string]: 1 | -1 } = { startDate: 1 }; // En yakın tarihli turlar önce
    
    if (sortParam && ['createdAt', 'startDate', 'price', 'name'].includes(sortParam)) {
      sortQuery = { [sortParam]: sortOrder };
    }
    
    // Limit parametresi
    const limitParam = params.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 0;
    
    // Turları al
    let query = Tour.find(filter).sort(sortQuery);
    if (limit > 0 && !isNaN(limit)) {
      query = query.limit(limit);
    }
    const tours = await query.lean();
    
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
    
    // Slug otomatik oluşturulacak (model'de pre-save hook var)
    const slug = body.name
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
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
      departureCity: body.departureCity || 'Çerkezköy',
      tourType: body.tourType,
      accommodationType: body.accommodationType,
      startDate: body.startDate,
      endDate: body.endDate,
      isActive: body.isActive !== undefined ? body.isActive : true,
      isLastMinute: body.isLastMinute || false,
      discountRate: body.discountRate,
      program: body.program,
      includedServices: body.includedServices,
      excludedServices: body.excludedServices,
      additionalServices: body.additionalServices,
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