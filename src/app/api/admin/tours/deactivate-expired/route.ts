import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

export async function POST() {
  try {
    await dbConnect();
    
    const now = new Date();
    const startOf2026 = new Date('2026-01-01T00:00:00.000Z');
    
    // Deactivate tours with startDate in the past
    const result1 = await Tour.updateMany(
      { startDate: { $lt: now }, isActive: true },
      { isActive: false }
    );
    
    // Deactivate tours with departureDate in the past
    const result2 = await Tour.updateMany(
      { departureDate: { $lt: now }, isActive: true },
      { isActive: false }
    );
    
    // Deactivate tours without date fields but created before 2026 (likely old tours)
    const result3 = await Tour.updateMany(
      { 
        $and: [
          { isActive: true },
          { $or: [
            { startDate: { $exists: false } },
            { startDate: null },
            { departureDate: { $exists: false } },
            { departureDate: null }
          ]},
          { createdAt: { $lt: startOf2026 } }
        ]
      },
      { isActive: false }
    );
    
    const total = result1.modifiedCount + result2.modifiedCount + result3.modifiedCount;
    
    return NextResponse.json({
      success: true,
      message: `${total} tur pasif hale getirildi`,
      details: {
        startDate: result1.modifiedCount,
        departureDate: result2.modifiedCount,
        noDate: result3.modifiedCount
      }
    });
  } catch (error) {
    console.error('Error deactivating tours:', error);
    return NextResponse.json(
      { success: false, error: 'Turlar pasif hale getirilirken hata oluştu' },
      { status: 500 }
    );
  }
}
