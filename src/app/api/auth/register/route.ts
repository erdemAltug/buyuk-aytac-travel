import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

interface RegisterBody {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterBody;

    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const firstName =
      typeof body.firstName === 'string' ? body.firstName.trim() : '';
    const lastName =
      typeof body.lastName === 'string' ? body.lastName.trim() : '';
    const phone =
      typeof body.phone === 'string' && body.phone.trim()
        ? body.phone.trim()
        : undefined;

    const errors: string[] = [];

    if (!email || !EMAIL_REGEX.test(email)) {
      errors.push('Geçerli bir e-posta adresi girin');
    }
    if (!password || password.length < MIN_PASSWORD_LENGTH) {
      errors.push(`Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalıdır`);
    }
    if (!firstName) {
      errors.push('Ad gerekli');
    }
    if (!lastName) {
      errors.push('Soyad gerekli');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, errors: ['Bu e-posta adresi zaten kayıtlı'] },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      passwordHash,
      firstName,
      lastName,
      phone,
      role: 'user',
      emailVerified: false,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Kayıt oluşturulurken hata:', error);
    return NextResponse.json(
      { success: false, errors: ['Kayıt sırasında bir hata oluştu'] },
      { status: 500 }
    );
  }
}
