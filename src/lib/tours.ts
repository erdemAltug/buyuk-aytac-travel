import dbConnect from '@/lib/mongodb';
import Tour from '@/models/Tour';
import { ITour } from '@/models/Tour';

/**
 * Doğrudan veritabanından turları getirir (API kullanmadan)
 * Sitemap için build sırasında kullanmak üzere
 */
export async function getToursByDB(params?: { 
  isActive?: boolean;
  destination?: string;
  tourType?: string;
  accommodationType?: string;
}): Promise<ITour[]> {
  try {
    await dbConnect();
    
    // Filtre parametrelerini oluştur
    const filter: Record<string, boolean | string> = {};
    
    if (params) {
      if (params.isActive !== undefined) {
        filter.isActive = params.isActive;
      }
      
      if (params.destination) {
        filter.destination = params.destination;
      }
      
      if (params.tourType) {
        filter.tourType = params.tourType;
      }
      
      if (params.accommodationType) {
        filter.accommodationType = params.accommodationType;
      }
    }
    
    // Turları al
    const tours = await Tour.find(filter).lean();
    
    // Lean objelerini normal objeler olarak döndür ve _id'i string'e çevir
    return tours.map(tour => {
      // Date nesneleri için güvenli dönüşüm
      const createdAt = tour.createdAt ? new Date(tour.createdAt) : undefined;
      const updatedAt = tour.updatedAt ? new Date(tour.updatedAt) : undefined;
      
      return {
        ...tour,
        _id: tour._id.toString(),
        createdAt,
        updatedAt,
      } as ITour;
    });
  } catch (error) {
    console.error('Veritabanından turları getirme hatası:', error);
    return []; // Hata durumunda boş dizi döndür
  }
} 