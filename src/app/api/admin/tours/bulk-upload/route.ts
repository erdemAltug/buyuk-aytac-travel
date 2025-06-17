import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import dbConnect from '@/lib/dbConnect';
import Tour from '@/models/Tour';
import Destination from '@/models/Destination';

// Slug oluşturucu fonksiyon
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Tarih parse fonksiyonu
function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  
  // DD/MM/YYYY formatından Date nesnesine çevir
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // JavaScript'te aylar 0-11 arası
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
  }
  
  return null;
}

// Validation fonksiyonu
function validateTourData(row: any, rowIndex: number): string[] {
  const errors: string[] = [];
  
  if (!row['Tur Adı']) {
    errors.push(`Satır ${rowIndex}: Tur Adı zorunludur`);
  }
  
  if (!row['Açıklama']) {
    errors.push(`Satır ${rowIndex}: Açıklama zorunludur`);
  }
  
  if (!row['Fiyat'] || isNaN(Number(row['Fiyat']))) {
    errors.push(`Satır ${rowIndex}: Geçerli bir fiyat girin`);
  }
  
  if (!row['Süre']) {
    errors.push(`Satır ${rowIndex}: Süre zorunludur`);
  }
  
  if (!row['Kalkış Tarihi']) {
    errors.push(`Satır ${rowIndex}: Kalkış Tarihi zorunludur`);
  } else if (!parseDate(row['Kalkış Tarihi'])) {
    errors.push(`Satır ${rowIndex}: Kalkış Tarihi formatı hatalı (GG/AA/YYYY olmalı)`);
  }
  
  if (!row['Bitiş Tarihi']) {
    errors.push(`Satır ${rowIndex}: Bitiş Tarihi zorunludur`);
  } else if (!parseDate(row['Bitiş Tarihi'])) {
    errors.push(`Satır ${rowIndex}: Bitiş Tarihi formatı hatalı (GG/AA/YYYY olmalı)`);
  }
  
  if (!['domestic', 'international'].includes(row['Tur Tipi'])) {
    errors.push(`Satır ${rowIndex}: Tur Tipi 'domestic' veya 'international' olmalı`);
  }
  
  if (!['with_accommodation', 'daily'].includes(row['Konaklama Tipi'])) {
    errors.push(`Satır ${rowIndex}: Konaklama Tipi 'with_accommodation' veya 'daily' olmalı`);
  }
  
  if (!row['Destinasyon']) {
    errors.push(`Satır ${rowIndex}: Destinasyon zorunludur`);
  }
  
  if (!row['Kalkış Noktası']) {
    errors.push(`Satır ${rowIndex}: Kalkış Noktası zorunludur`);
  }
  
  if (!row['Görsel URL']) {
    errors.push(`Satır ${rowIndex}: Görsel URL zorunludur`);
  }
  
  return errors;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Dosya seçilmedi' },
        { status: 400 }
      );
    }
    
    // Dosya tipini kontrol et
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Geçersiz dosya tipi. Excel (.xlsx, .xls) veya CSV dosyası yükleyin' },
        { status: 400 }
      );
    }
    
    // Dosyayı buffer'a çevir
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Excel dosyasını parse et
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // İlk sayfayı al
    const worksheet = workbook.Sheets[sheetName];
    
    // JSON formatına çevir
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    
    if (!rawData || rawData.length === 0) {
      return NextResponse.json(
        { error: 'Excel dosyası boş veya geçersiz format' },
        { status: 400 }
      );
    }
    
    // Validation ve error toplama
    const errors: string[] = [];
    const validTours: any[] = [];
    
    for (let i = 0; i < rawData.length; i++) {
      const row = rawData[i] as any;
      const rowIndex = i + 2; // Excel'de header 1. satır, veri 2. satırdan başlar
      
      // Boş satırları atla
      if (!row['Tur Adı'] && !row['Açıklama']) {
        continue;
      }
      
      const rowErrors = validateTourData(row, rowIndex);
      errors.push(...rowErrors);
      
      if (rowErrors.length === 0) {
        validTours.push(row);
      }
    }
    
    // Eğer validation hatası varsa döndür
    if (errors.length > 0) {
      return NextResponse.json({
        error: 'Validation hataları bulundu',
        errors: errors,
        total: rawData.length,
        success: 0,
        failed: rawData.length
      }, { status: 400 });
    }
    
    // Turları veritabanına ekle
    const results = {
      success: 0,
      failed: 0,
      total: validTours.length,
      errors: [] as string[]
    };
    
    for (const tourData of validTours) {
      try {
        // Slug oluştur ve unique kontrolü yap
        let slug = createSlug(tourData['Tur Adı']);
        const existingTour = await Tour.findOne({ slug });
        
        if (existingTour) {
          // Eğer slug varsa timestamp ekle
          slug = `${slug}-${Date.now()}`;
        }
        
        // Destinasyonu bul veya oluştur
        let destination = await Destination.findOne({ 
          name: tourData['Destinasyon'] 
        });
        
        if (!destination) {
          // Destinasyon yoksa oluştur
          destination = new Destination({
            name: tourData['Destinasyon'],
            slug: createSlug(tourData['Destinasyon']),
            description: `${tourData['Destinasyon']} destinasyonu hakkında bilgiler`,
            shortDescription: `${tourData['Destinasyon']} turları`,
            image: '/images/destinations/default.jpg',
            highlights: ['Doğal güzellikler', 'Kültürel zenginlik'],
            transportation: 'Otobüs ile ulaşım',
            bestTimeToVisit: 'Yıl boyunca',
            isActive: true
          });
          
          await destination.save();
        }
        
        // Tur nesnesini oluştur
        const newTour = new Tour({
          name: tourData['Tur Adı'],
          description: tourData['Açıklama'],
          price: Number(tourData['Fiyat']),
          duration: tourData['Süre'],
          startDate: parseDate(tourData['Kalkış Tarihi']),
          endDate: parseDate(tourData['Bitiş Tarihi']),
          tourType: tourData['Tur Tipi'],
          accommodationType: tourData['Konaklama Tipi'],
          destination: tourData['Destinasyon'],
          destinationRef: destination._id,
          departureCity: tourData['Kalkış Noktası'],
          image: tourData['Görsel URL'],
          maxParticipants: tourData['Maksimum Kişi'] ? Number(tourData['Maksimum Kişi']) : 50,
          minParticipants: tourData['Minimum Kişi'] ? Number(tourData['Minimum Kişi']) : 1,
          isActive: tourData['Aktif'] === 'EVET',
          featured: tourData['Öne Çıkan'] === 'EVET',
          itinerary: tourData['Program'] || '',
          included: tourData['Dahil Olanlar'] ? tourData['Dahil Olanlar'].split(',').map((item: string) => item.trim()) : [],
          excluded: tourData['Dahil Olmayanlar'] ? tourData['Dahil Olmayanlar'].split(',').map((item: string) => item.trim()) : [],
          slug: slug,
          views: 0
        });
        
        await newTour.save();
        results.success++;
        
      } catch (err) {
        console.error(`Tur ekleme hatası (${tourData['Tur Adı']}):`, err);
        results.failed++;
        results.errors.push(`${tourData['Tur Adı']}: Veritabanı hatası`);
      }
    }
    
    return NextResponse.json(results);
    
  } catch (error) {
    console.error('Bulk upload hatası:', error);
    return NextResponse.json(
      { error: 'Dosya işlenirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 