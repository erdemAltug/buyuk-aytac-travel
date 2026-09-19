import { NextRequest, NextResponse } from 'next/server';
import {
  isR2Configured,
  sanitizeUploadFolder,
  uploadBufferToR2,
} from '@/lib/r2';
import { auth } from '@/auth';

const MAX_SIZE = 10 * 1024 * 1024;
const VALID_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Yalnızca admin yükleyebilir' },
        { status: 401 }
      );
    }

    if (!isR2Configured()) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Dosya depolama (R2) yapılandırılmamış. Ortam değişkenlerini kontrol edin.',
        },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = sanitizeUploadFolder(
      (formData.get('folder') as string) || 'uploads'
    );

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Hiçbir dosya yüklenmedi' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: 'Dosya boyutu çok büyük (maks. 10MB)' },
        { status: 400 }
      );
    }

    if (!VALID_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Geçersiz dosya formatı. Sadece JPEG, PNG, GIF ve WEBP desteklenir',
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 12);
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '');
    const extension =
      originalName.split('.').pop()?.toLowerCase() ||
      file.type.split('/')[1] ||
      'jpg';
    const fileName = `${timestamp}-${randomString}.${extension}`;
    const key = `${folder}/${fileName}`;

    const { url, key: storedKey } = await uploadBufferToR2({
      buffer,
      key,
      contentType: file.type,
    });

    return NextResponse.json({
      success: true,
      message: 'Dosya R2\'ye yüklendi',
      filePath: url,
      url,
      key: storedKey,
    });
  } catch (error) {
    console.error('Dosya yükleme hatası:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Dosya yüklenirken bir hata oluştu',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
