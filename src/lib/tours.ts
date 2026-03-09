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
  isLastMinute?: boolean;
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
      
      if (params.isLastMinute !== undefined) {
        filter.isLastMinute = params.isLastMinute;
      }
    }
    
    // Turları al (lean() kullanarak plain object olarak al, Mongoose document değil)
    const tours = await Tour.find(filter).lean();
    
    // Lean query zaten plain object döndürür, _id'yi string yap
    return tours.map(tour => ({
      ...tour,
      _id: tour._id.toString(),
    })) as ITour[];
  } catch (error) {
    console.error('Veritabanından turları getirme hatası:', error);
    return []; // Hata durumunda boş dizi döndür
  }
} 