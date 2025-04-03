import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';

/**
 * Bu API endpoint, tarihli turları kontrol eder ve süresi geçmiş turları otomatik olarak pasif hale getirir.
 * Bir CRON job tarafından günlük olarak çağrılabilir.
 */
export async function GET() {
  try {
    await dbConnect();
    
    const currentDate = new Date();
    
    // Bitiş tarihi geçmiş ve hala aktif olan turları bul
    const expiredTours = await Tour.find({
      endDate: { $lt: currentDate },
      isActive: true
    });
    
    // Süresi geçmiş turları pasif hale getir
    if (expiredTours.length > 0) {
      const updatePromises = expiredTours.map(tour => {
        tour.isActive = false;
        return tour.save();
      });
      
      await Promise.all(updatePromises);
    }
    
    return NextResponse.json({
      message: 'Süresi geçmiş turlar kontrol edildi',
      deactivatedCount: expiredTours.length,
      deactivatedTours: expiredTours.map(t => ({ name: t.name, slug: t.slug, endDate: t.endDate }))
    });
  } catch (error) {
    console.error('Expired tours check error:', error);
    return NextResponse.json(
      { error: 'Süresi geçmiş turlar kontrol edilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 