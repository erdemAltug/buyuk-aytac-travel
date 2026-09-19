import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import User, { type UserGender } from '@/models/User';

const GENDERS: UserGender[] = ['female', 'male', 'unspecified'];
const MIN_PASSWORD_LENGTH = 8;

interface ProfileBody {
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: string;
  currentPassword?: string;
  newPassword?: string;
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Oturum gerekli' },
        { status: 401 }
      );
    }

    const body = (await req.json()) as ProfileBody;
    const firstName =
      typeof body.firstName === 'string' ? body.firstName.trim() : '';
    const lastName =
      typeof body.lastName === 'string' ? body.lastName.trim() : '';
    const phone =
      typeof body.phone === 'string' ? body.phone.trim() : '';
    const genderRaw =
      typeof body.gender === 'string' ? body.gender.trim() : '';
    const currentPassword =
      typeof body.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword =
      typeof body.newPassword === 'string' ? body.newPassword : '';

    const errors: string[] = [];
    if (!firstName) errors.push('Ad gerekli');
    if (!lastName) errors.push('Soyad gerekli');

    let gender: UserGender | undefined;
    if (genderRaw) {
      if (!GENDERS.includes(genderRaw as UserGender)) {
        errors.push('Geçersiz cinsiyet seçimi');
      } else {
        gender = genderRaw as UserGender;
      }
    }

    const wantsPasswordChange = Boolean(newPassword || currentPassword);
    if (wantsPasswordChange) {
      if (!currentPassword) errors.push('Mevcut şifreyi girin');
      if (!newPassword || newPassword.length < MIN_PASSWORD_LENGTH) {
        errors.push(`Yeni şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalı`);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id);
    if (!user || user.isActive === false) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    if (wantsPasswordChange) {
      if (!user.passwordHash) {
        return NextResponse.json(
          {
            success: false,
            errors: [
              'Bu hesap Google ile oluşturuldu. Şifre belirlemek için ofisle iletişime geçin.',
            ],
          },
          { status: 400 }
        );
      }
      const valid = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!valid) {
        return NextResponse.json(
          { success: false, errors: ['Mevcut şifre hatalı'] },
          { status: 400 }
        );
      }
      user.passwordHash = await bcrypt.hash(newPassword, 12);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone || undefined;
    if (gender) {
      user.gender = gender;
    } else {
      user.set('gender', undefined);
    }

    await user.save();

    const saved = await User.findById(user._id)
      .select('firstName lastName email phone gender')
      .lean();

    return NextResponse.json({
      success: true,
      user: {
        firstName: saved?.firstName || firstName,
        lastName: saved?.lastName || lastName,
        email: saved?.email || user.email,
        phone: saved?.phone || '',
        gender: saved?.gender || '',
      },
    });
  } catch (error) {
    console.error('Profil güncelleme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Profil güncellenemedi' },
      { status: 500 }
    );
  }
}
