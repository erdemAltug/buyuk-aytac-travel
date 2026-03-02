import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodbukaytac:buyukay+srv://buytac2025@cluster0.mongodb.net/buyuk-aytac-travel?retryWrites=true&w=majority';

export async function DELETE() {
  try {
    await mongoose.connect(MONGODB_URI);
    
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
    
    // Get the IDs for deletion
    const tourIds = inactiveTours.map(t => t._id);
    
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
