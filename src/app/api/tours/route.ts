import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';
import Destination from '@/models/Destination';

// Tüm turları getir
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get('isActive');
    const destinationId = searchParams.get('destinationId');
    const destinationSlug = searchParams.get('destinationSlug');
    const tourType = searchParams.get('tourType');
    const accommodationType = searchParams.get('accommodationType');
    
    await dbConnect();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: { isActive?: boolean; destinationId?: any; tourType?: string; accommodationType?: string } = {};
    
    // İsteğe bağlı filtreler
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }
    
    if (destinationId) {
      query.destinationId = destinationId;
    }
    
    // Tur tipi filtresi (yurtiçi/yurtdışı)
    if (tourType) {
      query.tourType = tourType;
    }
    
    // Konaklama tipi filtresi (konaklamalı/günübirlik)
    if (accommodationType) {
      query.accommodationType = accommodationType;
    }
    
    // Eğer destinasyon slug'ı ile filtreleme yapılacaksa
    if (destinationSlug) {
      const destination = await Destination.findOne({ slug: destinationSlug });
      if (destination) {
        query.destinationId = destination._id;
      } else {
        // Eğer böyle bir destinasyon yoksa boş array dön
        return NextResponse.json([], { status: 200 });
      }
    }
    
    // Turları getir ve destinasyonları populate et
    const tours = await Tour.find(query)
      .populate('destinationId')
      .sort({ createdAt: -1 });
    
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
    if (!body.name || !body.description || !body.image || !body.duration || !body.price || !body.destinationId) {
      return NextResponse.json(
        { error: 'İsim, açıklama, görsel, süre, fiyat ve destinasyon zorunludur' },
        { status: 400 }
      );
    }
    
    // Destinasyon ID'sinin geçerli olup olmadığını kontrol et
    const destination = await Destination.findById(body.destinationId);
    if (!destination) {
      return NextResponse.json(
        { error: 'Geçersiz destinasyon ID' },
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
      destinationId: body.destinationId,
      isActive: body.isActive !== undefined ? body.isActive : true,
    });
    
    await tour.save();
    
    // Kaydedilen turu destinasyon bilgisiyle birlikte getir
    const savedTour = await Tour.findById(tour._id).populate('destinationId');
    
    return NextResponse.json(savedTour, { status: 201 });
  } catch (error) {
    console.error('Tour POST Error:', error);
    return NextResponse.json(
      { error: 'Tur eklerken bir hata oluştu' },
      { status: 500 }
    );
  }
} 