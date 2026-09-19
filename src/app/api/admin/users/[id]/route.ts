import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import type { UserRole } from '@/models/User';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, message: 'Yetkisiz' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const updates: { role?: UserRole; isActive?: boolean } = {};

  if (body.role === 'user' || body.role === 'admin') {
    updates.role = body.role;
  }
  if (typeof body.isActive === 'boolean') {
    updates.isActive = body.isActive;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { success: false, message: 'Güncellenecek alan yok' },
      { status: 400 }
    );
  }

  // Kendi hesabını pasif / user yapmayı engelle
  if (id === session.user.id) {
    if (updates.role === 'user') {
      return NextResponse.json(
        { success: false, message: 'Kendi admin yetkinizi kaldıramazsınız' },
        { status: 400 }
      );
    }
    if (updates.isActive === false) {
      return NextResponse.json(
        { success: false, message: 'Kendi hesabınızı pasif edemezsiniz' },
        { status: 400 }
      );
    }
  }

  await dbConnect();

  // Son admin'i düşürmeyi engelle
  if (updates.role === 'user') {
    const target = await User.findById(id).select('role');
    if (target?.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin', isActive: { $ne: false } });
      if (adminCount <= 1) {
        return NextResponse.json(
          { success: false, message: 'Sistemde en az bir aktif admin kalmalı' },
          { status: 400 }
        );
      }
    }
  }

  if (updates.isActive === false) {
    const target = await User.findById(id).select('role');
    if (target?.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin', isActive: { $ne: false } });
      if (adminCount <= 1) {
        return NextResponse.json(
          { success: false, message: 'Son aktif admin pasif edilemez' },
          { status: 400 }
        );
      }
    }
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select('email firstName lastName phone role isActive createdAt');

  if (!user) {
    return NextResponse.json({ success: false, message: 'Kullanıcı bulunamadı' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    user: {
      ...user.toObject(),
      _id: String(user._id),
      isActive: user.isActive !== false,
    },
  });
}
