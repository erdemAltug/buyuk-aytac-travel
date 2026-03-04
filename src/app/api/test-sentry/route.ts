import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  try {
    // Test hatası oluştur
    const testError = new Error('🧪 Sentry Test Hatası - Bu bir test mesajıdır!');
    
    // Sentry'ye hata gönder
    const eventId = Sentry.captureException(testError);
    
    // Hata gönderildikten sonra Sentry'ye flush et
    await Sentry.flush(2000);
    
    // Response döndür
    return NextResponse.json({
      success: true,
      message: 'Test hatası Sentry\'ye gönderildi!',
      eventId: eventId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Hata oluşursa bunu da gönder
    Sentry.captureException(error);
    await Sentry.flush(2000);
    
    return NextResponse.json({
      success: false,
      message: 'Hata oluştu',
      error: String(error)
    }, { status: 500 });
  }
}
