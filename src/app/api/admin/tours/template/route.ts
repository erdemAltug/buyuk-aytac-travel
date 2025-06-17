import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET() {
  try {
    // Şablon verisi - Sütun başlıkları ve örnek satır
    const templateData = [
      {
        'Tur Adı': 'Kapadokya Balon Turu',
        'Açıklama': 'Muhteşem Kapadokya manzarası eşliğinde sıcak hava balonu deneyimi',
        'Fiyat': 2500,
        'Süre': '3 Gün 2 Gece',
        'Kalkış Tarihi': '15/06/2025',
        'Bitiş Tarihi': '17/06/2025', 
        'Tur Tipi': 'domestic', // domestic veya international
        'Konaklama Tipi': 'with_accommodation', // with_accommodation veya daily
        'Destinasyon': 'Kapadokya',
        'Kalkış Noktası': 'Çerkezköy',
        'Görsel URL': 'https://example.com/kapadokya.jpg',
        'Maksimum Kişi': 25,
        'Minimum Kişi': 10,
        'Aktif': 'EVET', // EVET veya HAYIR
        'Öne Çıkan': 'HAYIR', // EVET veya HAYIR
        'Program': 'Gün 1: Antalya\'ya hareket\nGün 2: Kapadokya turu\nGün 3: Dönüş',
        'Dahil Olanlar': 'Ulaşım, Konaklama, Kahvaltı, Rehberlik',
        'Dahil Olmayanlar': 'Öğle yemeği, Akşam yemeği, Kişisel harcamalar'
      },
      {
        'Tur Adı': '',
        'Açıklama': '',
        'Fiyat': '',
        'Süre': '',
        'Kalkış Tarihi': '',
        'Bitiş Tarihi': '',
        'Tur Tipi': '',
        'Konaklama Tipi': '',
        'Destinasyon': '',
        'Kalkış Noktası': '',
        'Görsel URL': '',
        'Maksimum Kişi': '',
        'Minimum Kişi': '',
        'Aktif': '',
        'Öne Çıkan': '',
        'Program': '',
        'Dahil Olanlar': '',
        'Dahil Olmayanlar': ''
      }
    ];

    // Excel workbook oluştur
    const workbook = XLSX.utils.book_new();
    
    // Ana veri sayfası
    const mainSheet = XLSX.utils.json_to_sheet(templateData);
    
    // Sütun genişliklerini ayarla
    const columnWidths = [
      { wch: 25 }, // Tur Adı
      { wch: 50 }, // Açıklama  
      { wch: 10 }, // Fiyat
      { wch: 15 }, // Süre
      { wch: 15 }, // Kalkış Tarihi
      { wch: 15 }, // Bitiş Tarihi
      { wch: 20 }, // Tur Tipi
      { wch: 20 }, // Konaklama Tipi
      { wch: 15 }, // Destinasyon
      { wch: 15 }, // Kalkış Noktası
      { wch: 30 }, // Görsel URL
      { wch: 15 }, // Maksimum Kişi
      { wch: 15 }, // Minimum Kişi
      { wch: 10 }, // Aktif
      { wch: 12 }, // Öne Çıkan
      { wch: 50 }, // Program
      { wch: 40 }, // Dahil Olanlar
      { wch: 40 }  // Dahil Olmayanlar
    ];
    
    mainSheet['!cols'] = columnWidths;
    
    // Sayfayı workbook'a ekle
    XLSX.utils.book_append_sheet(workbook, mainSheet, 'Turlar');
    
    // Talimatlar sayfası
    const instructionsData = [
      { 'Alan': 'Tur Adı', 'Açıklama': 'Turun adı (Zorunlu)', 'Örnek': 'Kapadokya Balon Turu' },
      { 'Alan': 'Açıklama', 'Açıklama': 'Tur hakkında detaylı açıklama (Zorunlu)', 'Örnek': 'Muhteşem manzara...' },
      { 'Alan': 'Fiyat', 'Açıklama': 'Tur fiyatı, sadece sayı (Zorunlu)', 'Örnek': '2500' },
      { 'Alan': 'Süre', 'Açıklama': 'Tur süresi (Zorunlu)', 'Örnek': '3 Gün 2 Gece' },
      { 'Alan': 'Kalkış Tarihi', 'Açıklama': 'GG/AA/YYYY formatında (Zorunlu)', 'Örnek': '15/06/2025' },
      { 'Alan': 'Bitiş Tarihi', 'Açıklama': 'GG/AA/YYYY formatında (Zorunlu)', 'Örnek': '17/06/2025' },
      { 'Alan': 'Tur Tipi', 'Açıklama': 'domestic veya international (Zorunlu)', 'Örnek': 'domestic' },
      { 'Alan': 'Konaklama Tipi', 'Açıklama': 'with_accommodation veya daily (Zorunlu)', 'Örnek': 'with_accommodation' },
      { 'Alan': 'Destinasyon', 'Açıklama': 'Hedef destinasyon (Zorunlu)', 'Örnek': 'Kapadokya' },
      { 'Alan': 'Kalkış Noktası', 'Açıklama': 'Kalkış şehri (Zorunlu)', 'Örnek': 'Çerkezköy' },
      { 'Alan': 'Görsel URL', 'Açıklama': 'Tur görseli linki (Zorunlu)', 'Örnek': 'https://example.com/image.jpg' },
      { 'Alan': 'Maksimum Kişi', 'Açıklama': 'Maksimum katılımcı sayısı', 'Örnek': '25' },
      { 'Alan': 'Minimum Kişi', 'Açıklama': 'Minimum katılımcı sayısı', 'Örnek': '10' },
      { 'Alan': 'Aktif', 'Açıklama': 'EVET veya HAYIR', 'Örnek': 'EVET' },
      { 'Alan': 'Öne Çıkan', 'Açıklama': 'EVET veya HAYIR', 'Örnek': 'HAYIR' },
      { 'Alan': 'Program', 'Açıklama': 'Günlük program detayları', 'Örnek': 'Gün 1: Hareket\\nGün 2: Tur...' },
      { 'Alan': 'Dahil Olanlar', 'Açıklama': 'Turda dahil olan hizmetler', 'Örnek': 'Ulaşım, Konaklama...' },
      { 'Alan': 'Dahil Olmayanlar', 'Açıklama': 'Turda dahil olmayan hizmetler', 'Örnek': 'Öğle yemeği...' }
    ];
    
    const instructionsSheet = XLSX.utils.json_to_sheet(instructionsData);
    instructionsSheet['!cols'] = [
      { wch: 20 }, // Alan
      { wch: 50 }, // Açıklama
      { wch: 30 }  // Örnek
    ];
    
    XLSX.utils.book_append_sheet(workbook, instructionsSheet, 'Talimatlar');
    
    // Excel dosyasını buffer'a çevir
    const excelBuffer = XLSX.write(workbook, { 
      type: 'buffer', 
      bookType: 'xlsx' 
    });
    
    // Response headers ayarla
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="tur-sablonu.xlsx"',
        'Content-Length': excelBuffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error('Template oluşturma hatası:', error);
    return NextResponse.json(
      { error: 'Şablon oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
} 