import { NextRequest, NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);

/**
 * Sadece path değiştir. Host/protocol/port'a dokunma —
 * manuel host yazımı prod domain + :3000 üretiyordu.
 */
function redirectTo(
  req: NextRequest,
  pathname: string,
  search?: Record<string, string>
) {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  url.search = '';
  url.hash = '';

  // https üzerinde yanlışlıkla kalan dev portunu temizle
  if (url.port === '3000') {
    url.port = '';
  }

  if (search) {
    for (const [key, value] of Object.entries(search)) {
      url.searchParams.set(key, value);
    }
  }

  return NextResponse.redirect(url);
}

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isLoggedIn) {
      return redirectTo(req, '/admin/login', { callbackUrl: pathname });
    }
    if (role !== 'admin') {
      return redirectTo(req, '/');
    }
  }

  if (pathname === '/admin/login' && isLoggedIn && role === 'admin') {
    return redirectTo(req, '/admin');
  }

  if (pathname.startsWith('/hesabim') && !isLoggedIn) {
    return redirectTo(req, '/giris', { callbackUrl: pathname });
  }

  if ((pathname === '/giris' || pathname === '/kayit') && isLoggedIn) {
    return redirectTo(req, '/hesabim');
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/hesabim/:path*', '/giris', '/kayit'],
};
