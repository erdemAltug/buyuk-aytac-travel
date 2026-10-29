import { requireAdmin } from '@/lib/requireAdmin';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function DELETE() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  try {
    await dbConnect();
    
    // Get the Tour model
    const Tour = (await import('@/models/Tour')).default;
    
    // Find all inactive tours
    const inactiveTours = await Tour.find({ isActive: false });
    
    if (inactiveTours.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Silinecek pasif tur bulunamadı',
        deletedCount: 0
      });
    }
    
    // Get tour images that will be deleted
    const tourImages = inactiveTours
      .map(t => t.image)
      .filter(img => img && img.startsWith('/images/tours/'));
    
    // Delete all inactive tours
    const result = await Tour.deleteMany({ isActive: false });
    
    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} tur kalıcı olarak silindi`,
      deletedCount: result.deletedCount,
      deletedImages: tourImages
    });
    
  } catch (error) {
    console.error('Error deleting inactive tours:', error);
    return NextResponse.json(
      { success: false, error: 'Turlar silinirken hata oluştu' },
      { status: 500 }
    );
  }
}
