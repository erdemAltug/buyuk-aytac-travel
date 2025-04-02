import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';

type RouteSegmentProps = {
  params: {
    slug: string;
  };
};

// Belirli bir destinasyonu getir
export async function GET(
  request: NextRequest,
  props: RouteSegmentProps
) {
  try {
    await dbConnect();
    
    const slug = props.params.slug;
    
    const destination = await Destination.findOne({ slug });
    
    if (!destination) {
      return NextResponse.json(
        { error: 'Destinasyon bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(destination);
  } catch (error) {
    console.error('Destination GET Error:', error);
    return NextResponse.json(
      { error: 'Destinasyonu getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Destinasyonu güncelle
export async function PUT(
  request: NextRequest,
  props: RouteSegmentProps
) {
  try {
    await dbConnect();
    
    const slug = props.params.slug;
    const body = await request.json();
    
    // Gerekli alanları kontrol et
    if (!body.name || !body.description || !body.image) {
      return NextResponse.json(
        { error: 'İsim, açıklama ve görsel zorunludur' },
        { status: 400 }
      );
    }
    
    // Destinasyonu bul
    const destination = await Destination.findOne({ slug });
    
    if (!destination) {
      return NextResponse.json(
        { error: 'Destinasyon bulunamadı' },
        { status: 404 }
      );
    }
    
    // İsim değiştiyse ve bu isimle başka bir kayıt varsa hata ver
    if (body.name !== destination.name) {
      const newSlug = body.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      
      const existingDestination = await Destination.findOne({ slug: newSlug });
      
      if (existingDestination && !existingDestination._id.equals(destination._id)) {
        return NextResponse.json(
          { error: 'Bu isimle bir destinasyon zaten mevcut' },
          { status: 400 }
        );
      }
    }
    
    // Güncelle
    destination.name = body.name;
    destination.description = body.description;
    destination.image = body.image;
    destination.isActive = body.isActive !== undefined ? body.isActive : destination.isActive;
    
    await destination.save();
    
    return NextResponse.json(destination);
  } catch (error) {
    console.error('Destination PUT Error:', error);
    return NextResponse.json(
      { error: 'Destinasyonu güncellerken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Destinasyonu sil
export async function DELETE(
  request: NextRequest,
  props: RouteSegmentProps
) {
  try {
    await dbConnect();
    
    const slug = props.params.slug;
    
    const destination = await Destination.findOneAndDelete({ slug });
    
    if (!destination) {
      return NextResponse.json(
        { error: 'Destinasyon bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Destinasyon başarıyla silindi' }
    );
  } catch (error) {
    console.error('Destination DELETE Error:', error);
    return NextResponse.json(
      { error: 'Destinasyonu silerken bir hata oluştu' },
      { status: 500 }
    );
  }
} 