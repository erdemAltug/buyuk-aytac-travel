import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import Reservation from '@/models/Reservation';
import Tour from '@/models/Tour';

async function sendReservationEmail(data: {
  firstName: string;
  lastName: string;
  phone: string;
  tourName: string;
  tourSlug?: string;
}) {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailTo = process.env.EMAIL_TO || 'info@buyukaytactravel.com';
  const emailFrom = process.env.EMAIL_FROM || emailTo;

  if (!smtpUser || !smtpPass) {
    console.warn('SMTP yapılandırılmamış; e-posta atlandı');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: `"Büyük Aytaç Travel" <${emailFrom}>`,
    to: emailTo,
    subject: `Yeni Rezervasyon Talebi - ${data.tourName}`,
    text: `
Yeni Rezervasyon Talebi

Tur: ${data.tourName}
Müşteri: ${data.firstName} ${data.lastName}
Telefon: ${data.phone}
Tarih: ${new Date().toLocaleString('tr-TR')}
${data.tourSlug ? `Tur Linki: https://www.buyukaytactravel.com/tours/${data.tourSlug}` : ''}
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, tourName, tourSlug, email } = body;

    if (!firstName || !lastName || !phone || !tourName) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_INPUT',
            message: 'Lütfen tüm alanları doldurun.',
          },
        },
        { status: 400 }
      );
    }

    await dbConnect();
    const session = await auth();

    let tourId;
    if (tourSlug) {
      const tour = await Tour.findOne({ slug: tourSlug }).select('_id');
      tourId = tour?._id;
    }

    await Reservation.create({
      userId: session?.user?.id || undefined,
      tourId,
      tourSlug: (tourSlug || 'genel').toLowerCase(),
      tourName,
      firstName,
      lastName,
      phone,
      email: email || session?.user?.email || undefined,
      status: 'new',
      source: 'web',
    });

    try {
      await sendReservationEmail({
        firstName,
        lastName,
        phone,
        tourName,
        tourSlug,
      });
    } catch (mailError) {
      console.error('Rezervasyon e-posta hatası (DB kaydı OK):', mailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Rezervasyon talebiniz alındı. En kısa sürede iletişime geçeceğiz.',
    });
  } catch (error) {
    console.error('Rezervasyon hatası:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RESERVATION_ERROR',
          message:
            'Kayıt sırasında bir hata oluştu. Lütfen telefonla iletişime geçin.',
        },
      },
      { status: 500 }
    );
  }
}
