import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';

// Tüm destinasyonları getir
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get('isActive');
    
    await dbConnect();
    
    const query: { isActive?: boolean } = {};
    
    // İsteğe bağlı filtreler
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }
    
    const destinations = await Destination.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(destinations, { status: 200 });
  } catch (error) {
    console.error('Destinations GET Error:', error);
    return NextResponse.json(
      { error: 'Destinasyonları getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Yeni destinasyon ekle
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    
    // Gerekli alanları kontrol et
    if (!body.name || !body.description || !body.image) {
      return NextResponse.json(
        { error: 'İsim, açıklama ve görsel zorunludur' },
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
    
    // Aynı slug ile başka bir destinasyon var mı kontrol et
    const existingDestination = await Destination.findOne({ slug });
    if (existingDestination) {
      return NextResponse.json(
        { error: 'Bu isimle bir destinasyon zaten mevcut' },
        { status: 400 }
      );
    }
    
    // Yeni destinasyon oluştur
    const destination = new Destination({
      name: body.name,
      description: body.description,
      image: body.image,
      slug,
      isActive: body.isActive !== undefined ? body.isActive : true,
    });
    
    await destination.save();
    
    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    console.error('Destination POST Error:', error);
    return NextResponse.json(
      { error: 'Destinasyon eklerken bir hata oluştu' },
      { status: 500 }
    );
  }
} 