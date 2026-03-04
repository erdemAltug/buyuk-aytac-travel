import { NextResponse } from 'next/server';

export async function GET() {
  // Basit bir hata oluştur - Sentry otomatik yakalasın
  throw new Error('🧪 Client Test Hatası - Senty test ediliyor!');
}
