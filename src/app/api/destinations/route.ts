import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Destination from '@/models/Destination';

// Tüm destinasyonları getir
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const featured = searchParams.get('featured');
    
    let query: any = {};
    
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }
    
    if (featured !== null) {
      query.featured = featured === 'true';
    }
    
    const destinations = await Destination.find(query).sort({ featured: -1, name: 1 });
    
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Destinasyonları getirme hatası:', error);
    return NextResponse.json(
      { error: 'Destinasyonlar getirilemedi' },
      { status: 500 }
    );
  }
}

// Yeni destinasyon ekle
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const destination = new Destination(body);
    await destination.save();
    
    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    console.error('Destinasyon oluşturma hatası:', error);
    return NextResponse.json(
      { error: 'Destinasyon oluşturulamadı' },
      { status: 500 }
    );
  }
} 