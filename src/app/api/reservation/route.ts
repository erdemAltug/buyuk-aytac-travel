import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email gönderme fonksiyonu
async function sendReservationEmail(data: {
  firstName: string;
  lastName: string;
  phone: string;
  tourName: string;
  tourSlug?: string;
}) {
  // Environment variable kontrolü - production için
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailTo = process.env.EMAIL_TO || "info@buyukaytactravel.com";
  const emailFrom = process.env.EMAIL_FROM || emailTo;

  // Transporter oluştur
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `"Büyük Aytaç Travel" <${emailFrom}>`,
    to: emailTo,
    subject: `🎫 Yeni Rezervasyon Talebi - ${data.tourName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #2563eb, #4f46e5); padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .info-box { background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-top: 20px; }
          .info-row { display: flex; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
          .info-row:last-child { border-bottom: none; }
          .info-label { font-weight: 600; color: #475569; width: 120px; flex-shrink: 0; }
          .info-value { color: #1e293b; }
          .highlight { background: linear-gradient(135deg, #dbeafe, #e0e7ff); padding: 20px; border-radius: 12px; margin-bottom: 20px; }
          .highlight h3 { margin: 0 0 10px 0; color: #1e40af; }
          .highlight p { margin: 0; color: #1e3a8a; font-size: 18px; font-weight: 600; }
          .footer { background-color: #1e293b; padding: 20px; text-align: center; }
          .footer p { color: #94a3b8; margin: 0; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎫 Yeni Rezervasyon Talebi</h1>
          </div>
          <div class="content">
            <div class="highlight">
              <h3>Tur Adı</h3>
              <p>${data.tourName}</p>
            </div>
            
            <div class="info-box">
              <div class="info-row">
                <span class="info-label">Ad Soyad</span>
                <span class="info-value">${data.firstName} ${data.lastName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Telefon</span>
                <span class="info-value">
                  <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
                </span>
              </div>
              <div class="info-row">
                <span class="info-label">Tur Linki</span>
                <span class="info-value">
                  ${data.tourSlug ? `<a href="https://www.buyukaytactravel.com/tours/${data.tourSlug}" style="color: #2563eb;">Görüntüle</a>` : '-'}
                </span>
              </div>
              <div class="info-row">
                <span class="info-label">Tarih</span>
                <span class="info-value">${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Büyük Aytaç Travel - Çerkezköy'ün Turizm Lideri</p>
            <p>www.buyukaytactravel.com</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Yeni Rezervasyon Talebi

Tur: ${data.tourName}
Müşteri: ${data.firstName} ${data.lastName}
Telefon: ${data.phone}
Tarih: ${new Date().toLocaleString('tr-TR')}
${data.tourSlug ? `Tur Linki: https://www.buyukaytactravel.com/tours/${data.tourSlug}` : ''}
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, tourName, tourSlug } = body;

    // Validation
    if (!firstName || !lastName || !phone || !tourName) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Lütfen tüm alanları doldurun.",
          },
        },
        { status: 400 }
      );
    }

    // Email gönder
    await sendReservationEmail({
      firstName,
      lastName,
      phone,
      tourName,
      tourSlug,
    });

    return NextResponse.json({
      success: true,
      message: "Rezervasyon talebiniz alındı. En kısa sürede iletişime geçeceğiz.",
    });
  } catch (error) {
    console.error("Rezervasyon hatası:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "EMAIL_SEND_ERROR",
          message: "Mesaj gönderilirken bir hata oluştu. Lütfen telefonla iletişime geçin.",
        },
      },
      { status: 500 }
    );
  }
}
