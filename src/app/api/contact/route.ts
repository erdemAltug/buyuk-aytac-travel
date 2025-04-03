import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Form verilerini kontrol et
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, message: 'Ad, email ve mesaj alanları zorunludur' },
        { status: 400 }
      );
    }
    
    // E-posta göndermek için transporter oluştur
    // Not: Gerçek bir uygulamada bu bilgiler environment variables olarak saklanmalıdır
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // SSL
      auth: {
        user: 'info@buyukaytactravel.com', // Gönderici şirket e-posta adresi
        pass: 'quim etfw yznt ymvx', // Google tarafından oluşturulan uygulama şifresi
      },
    });
    
    // E-posta içeriği
    const mailData = {
      from: `"Büyük Aytaç Travel" <info@buyukaytactravel.com>`,
      to: "info@buyukaytactravel.com", // Mesajın gönderileceği şirket e-posta adresi
      subject: `İletişim Formu: ${body.name}`,
      text: `Ad Soyad: ${body.name}\nE-posta: ${body.email}\nTelefon: ${body.phone || 'Belirtilmemiş'}\n\nMesaj:\n${body.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Büyük Aytaç Travel - Yeni İletişim Formu</h2>
          <p><strong>Ad Soyad:</strong> ${body.name}</p>
          <p><strong>E-posta:</strong> ${body.email}</p>
          <p><strong>Telefon:</strong> ${body.phone || 'Belirtilmemiş'}</p>
          <div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
            <strong>Mesaj:</strong>
            <p style="white-space: pre-line;">${body.message}</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
            Bu mesaj Büyük Aytaç Travel web sitesi üzerinden gönderilmiştir.
          </p>
        </div>
      `
    };
    
    // Geliştirme aşamasında veya production'da e-posta gönderimi
    try {
      // Gmail için güvenli ayarlar (hem geliştirme hem de canlı ortam için)
      // NOT: Gmail hesabınızda "Daha Az Güvenli Uygulamalara İzin Ver" ayarını açmanız 
      // veya Uygulama Şifresi oluşturmanız gerekebilir
      await transporter.sendMail(mailData);
      console.log('E-posta gönderildi:', mailData.to);
    } catch (emailError) {
      console.error('E-posta gönderimi hatası:', emailError);
      // E-posta gönderilemedi, ancak kullanıcıya hata göstermeyelim
    }
    
    // Form başarıyla alındı
    console.log('İletişim formu alındı:', body);
    
    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla alındı!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('İletişim formu hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Mesaj gönderilirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 