import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return {
      ok: false as const,
      response: NextResponse.json(
        { success: false, message: 'Yetkisiz' },
        { status: 401 }
      ),
    };
  }
  return { ok: true as const, session };
}
