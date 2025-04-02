import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';
import Destination from '@/models/Destination';

type RouteSegmentProps = {
  params: {
    slug: string;
  };
};

// Belirli bir turu getir
export async function GET(
  request: NextRequest,
  props: RouteSegmentProps
) {
  try {
    await dbConnect();
    
    const slug = props.params.slug;
    
    const tour = await Tour.findOne({ slug }).populate('destinationId');
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tur bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(tour);
  } catch (error) {
    console.error('Tour GET Error:', error);
    return NextResponse.json(
      { error: 'Turu getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Turu güncelle
export async function PUT(
  request: NextRequest,
  props: RouteSegmentProps
) {
  try {
    await dbConnect();
    
    const slug = props.params.slug;
    const body = await request.json();
    
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
    
    // Turu bul
    const tour = await Tour.findOne({ slug });
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tur bulunamadı' },
        { status: 404 }
      );
    }
    
    // İsim değiştiyse ve bu isimle başka bir kayıt varsa hata ver
    if (body.name !== tour.name) {
      const newSlug = body.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      
      const existingTour = await Tour.findOne({ slug: newSlug });
      
      if (existingTour && !existingTour._id.equals(tour._id)) {
        return NextResponse.json(
          { error: 'Bu isimle bir tur zaten mevcut' },
          { status: 400 }
        );
      }
    }
    
    // Güncelle
    tour.name = body.name;
    tour.description = body.description;
    tour.image = body.image;
    tour.duration = body.duration;
    tour.price = body.price;
    tour.destinationId = body.destinationId;
    tour.isActive = body.isActive !== undefined ? body.isActive : tour.isActive;
    
    await tour.save();
    
    // Güncellenmiş turu destinasyon bilgisiyle birlikte getir
    const updatedTour = await Tour.findById(tour._id).populate('destinationId');
    
    return NextResponse.json(updatedTour);
  } catch (error) {
    console.error('Tour PUT Error:', error);
    return NextResponse.json(
      { error: 'Turu güncellerken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Turu sil
export async function DELETE(
  request: NextRequest,
  props: RouteSegmentProps
) {
  try {
    await dbConnect();
    
    const slug = props.params.slug;
    
    const tour = await Tour.findOneAndDelete({ slug });
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tur bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Tur başarıyla silindi' }
    );
  } catch (error) {
    console.error('Tour DELETE Error:', error);
    return NextResponse.json(
      { error: 'Turu silerken bir hata oluştu' },
      { status: 500 }
    );
  }
} 