import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';

// 10MB boyut limiti
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    // Form verilerini al
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';

    // Dosya kontrolü
    if (!file) {
      return NextResponse.json({
        success: false,
        message: 'Hiçbir dosya yüklenmedi'
      }, { status: 400 });
    }

    // Dosya boyut kontrolü
    if (file.size > MAX_SIZE) {
      return NextResponse.json({
        success: false,
        message: 'Dosya boyutu çok büyük (maks. 10MB)'
      }, { status: 400 });
    }

    // MIME tip kontrolü (sadece görseller)
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        message: 'Geçersiz dosya formatı. Sadece JPEG, PNG, GIF ve WEBP desteklenir'
      }, { status: 400 });
    }

    // Buffer'a dönüştür
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Rastgele dosya adı oluştur
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 12);
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '');
    const extension = originalName.split('.').pop()?.toLowerCase();
    const fileName = `${timestamp}-${randomString}.${extension}`;

    // Yükleme klasörü oluştur
    const uploadDir = join(process.cwd(), 'public', folder);
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Dosya yolu
    const filePath = join(uploadDir, fileName);
    
    // Dosyayı kaydet
    await writeFile(filePath, buffer);

    // Başarı yanıtı
    return NextResponse.json({
      success: true,
      message: 'Dosya başarıyla yüklendi',
      filePath: `/${folder}/${fileName}`,
      url: `/${folder}/${fileName}`
    });
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    return NextResponse.json({
      success: false,
      message: 'Dosya yüklenirken bir hata oluştu',
      error: (error as Error).message
    }, { status: 500 });
  }
}

// API yapılandırması
export const config = {
  api: {
    bodyParser: false, // Form verilerini manuel olarak işleyeceğiz
    responseLimit: '10mb',
  },
}; 